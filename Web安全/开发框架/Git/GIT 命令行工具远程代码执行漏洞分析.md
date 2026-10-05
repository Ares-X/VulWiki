---
cve: "CVE-2020-26233"
product: "Git Credential Manager Core/GitHub CLI integration"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2020-26233"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "GIT 命令行工具远程代码执行漏洞分析"
prerequisites: "来源所述条件，未列明部分仍待核：GCM Core<=2.0.280; discussesgh1.2.1 safeexec bypass; Windows private repo fork/clone; fix absent"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/972fmkQM1YpKhFCeAj-lwg"
id: "vw-8eeb0fbc87fc15a56f1e5c3d"
entity_id: "ve-8eeb0fbc87fc15a56f1e5c3d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：GCM Core&lt;=2.0.280; discussesgh1.2.1 safeexec bypass; Windows private repo fork/clone; fix absent

代码与实验材料：Source path/sink narrative and gh repo fork --clone; actual code screenshots; executable name instruction says exe but restgit.exe

来源证据范围：Official GCM GHSA, Blaze researcher blog, NVD

- **适用与权限边界（1）**：Git command line equated togh and component scopes merged; defaultgitclone not recursively cloning without option。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：Victim fork web action alone not trigger; must runCLIclone; typo executable name and emdash option; no fixes。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# GIT 命令行工具远程代码执行漏洞分析

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/972fmkQM1YpKhFCeAj-lwg)

![](../../.resource/remote/cb1f0e70e157edfb19b6416608a25c2c738ceed81a2b55eae19f0b47b8eee7ec.jpg)

介绍
--

在这篇文章中，我们将会详细介绍漏洞 CVE-2020-26233。这个漏洞将影响 Windows 平台下 GitHub CLI 工具中 Git 凭证管理器核心 v2.0.280 及其之前所有版本的 GIT 命令行工具（也被称为 gh），而且一旦成功利用，攻击者将能够在供应链攻击中使用该漏洞，并攻击全球数百万的软件开发人员。

问题描述
----

在此之前，我们曾讨论过 GitHub 桌面端的远程代码执行问题，但这一次受影响的组件则是 Git 凭证管理器核心。

默认配置下，当 Git 克隆带有子模块的代码库时，它首先克隆代码库的顶层（根目录），然后递归地克隆子模块。但是在这样做时，它会从顶级目录中启动一个新的 Git 进程。

如果一个名为 git.exe 的恶意程序被存放在了代码库根目录下，那么当程序尝试读取配置信息时，Git 凭证管理器核心将调用此二进制文件。克隆过程正常进行，并且没有可见的迹象表明运行了恶意二进制文件而不是原始 git 可执行文件。

自从我们在 2020 年 11 月发布第一份报告以来，Github 创建了一个 SafeExec 库，以减轻 Windows 中二进制文件搜索顺序不一致带来的风险。

简要回顾一下，Windows 首先检查当前文件夹中是否存在给定的二进制文件，只有在找不到该二进制文件时，才会遍历 %PATH% 环境变量中的目录，直到找到目标可执行文件。

在 gh 的 v1.2.1 版本中，引入了一个 safeexec.LookPath 函数，当通过滥用 Windows 路径搜索顺序克隆新存储库时，可以阻止远程代码执行。

![](../../.resource/remote/64e4b5d8db3b9366e82e6a88eec34cf1c9d23ba52af69e854d80f1bc814a7eba.jpg)

在仔细研究之后，我们的安全工程师 Vitor Fernandes 发现了一个绕过方法，这样就可以利用它来实现远程代码执行了。

在漏洞发现过程中，我们发现在 fork 一个新的私有存储库时，仍然可能出现远程代码执行场景。因为在克隆命令执行之后，并不会通过 safeexec.LookPath 函数来调用 “git.exe config credential.namespace”。因此，所以 Windows 将返回到其默认值并搜索 git.exe 文件当前克隆存储库中的二进制文件：

![](../../.resource/remote/6da6655f5c571f802670bdc9babf7557fabd277d4a6ccebafbd1f1aba7166375.jpg)

下面给出的是 src/shared/Microsoft.Git.CredentialManager/CommandContext.cs 中的代码：

![](../../.resource/remote/38db32361c28354a098a14bb936f505f13d1a455b019e115071ff40d9b7a7dac.jpg)

我们可以看到，在第 89 行代码处，将创建一个新的进程来搜索 git.exe，而 “Environment.LocateExecutable(‘git.exe’)” 将作为目录路径参数传递给 GitProcess()函数。

下图显示的是 Environment.LocateExecutable() 函数代码：

![](../../.resource/remote/b5f3dfe3f70486b6bd7bd65052137b4bd8e8400c974da5d2ab5275137a4ebc6f.jpg)

/src/shared/Microsoft.Git.CredentialManager/EnvironmentBase.cs

函数 environment.TryLocateExecutable 的代码可以在【阅读原文】找到：

![](../../.resource/remote/910d2185f3c51b0bae66cf8ef861cb40b1e93e25582dcf15ffaa477cd529d219.jpg)

在使用 Windows 的实用工具 where.exe 时，它将会返回所有出现的文件或命令，包括 %PATH% 和当前目录的值。

漏洞利用
----

下面给出的是针对该漏洞的漏洞利用步骤：

> 创建一个新的代码库，或向现有代码库中添加文件；
> 
> 向这个代码库中上传一个 Windows 可执行文件，然后将其重命名为 exe；
> 
> 等待目标用户 fork 这个代码库；
> 
> 然后成功拿到 Shell；

在下面的例子中，我们将 calc.exe 重命名为了 git.exe，并将其上传到目标代码库中：

![](../../.resource/remote/ebfe5e3653396b2c81b16d681f01246148f1536796967ac691c411cb9cc60634.jpg)

Fork 代码库并执行 “gh repo fork REPOSITORY_NAME —clone” 命令之后，目标设备将弹出计算器程序：

![](../../.resource/remote/b1501c0906116420f26966b7193dd9f47791b60eab47dbb45718f7d9324e80a3.jpg)

参考资料
----

> https://github.com/microsoft/Git-Credential-Manager-Core/security/advisories/GHSA-2gq7-ww4j-3m76
> 
> https://blog.blazeinfosec.com/attack-of-the-clones-github-desktop-remote-code-execution
> 
> https://superuser.com/questions/897644/how-does-windows-decide-which-executable-to-run
> 
> https://stackoverflow.com/questions/304319/is-there-an-equivalent-of-which-on-the-windows-command-line
> 
> https://nvd.nist.gov/vuln/detail/CVE-2020-26233﻿

![](../../.resource/remote/33f7cb5f70c2418864a2ab9c5ebdb737b442bc98d5a34c344981f472bf69c466.gif)

![](../../.resource/remote/241a5efdd3cb729f4507509cc08336272b9d313bf6f9b586027d6bbf4e5d3099.png) 交易担保 FreeBuf+ FreeBuf + 小程序：把安全装进口袋 小程序

精彩推荐

  

  

  

  

****![](../../.resource/remote/1347c4eed374fe9bbfe38e3bb4209c6240c5b44ca7dab877fa596499b746684e.jpg)****

[![](../../.resource/remote/c997a9f4986b6f5dd3a7ce30fe4438432a0e69a1510ddadfdcc3490a3c0ca6b7.png)](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247484287&idx=1&sn=16a9b2dc0e205a0e5fe86ae5cae9fe2e&scene=21#wechat_redirect)[![](../../.resource/remote/c4252b3cb8caac64577e3e9712325a5420a41886301aa06c145beb949c573d10.png)](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247484370&idx=1&sn=8b79701a2936e04e390f165344e5fcdc&scene=21#wechat_redirect)

[![](../../.resource/remote/5cbcade7924bfe90c519a14683ad1b9b0792ea1cde8f831c71554b5af0261ce1.png)](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247485424&idx=1&sn=1d4409309a035cb6ffcbdff54cc7ab7b&scene=21#wechat_redirect)

[![](../../.resource/remote/73e115b1fe73b8704c8c7d77bdc9befe5a00ecc76af231f90d82c63d36a1877d.png)](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247485262&idx=1&sn=3038b6d54c1a38213d660ca7b0000562&scene=21#wechat_redirect)

[![](../../.resource/remote/8fba5be2fb9ca42aaae73c8b679dbb8c16cea44f849a771e3588cc6e96fd1b43.png)](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247485242&idx=1&sn=b189e16baeec14f28f55c690598ef020&scene=21#wechat_redirect)

**************![](../../.resource/remote/9e6a809b9fdf5ef44cf7cd86b8e001b4411ee0bfd0f43b726a7d5f1d85e9c9a1.gif)**************

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
