---
cve: "CVE-2024-32002"
identifier_role: "primary"
primary_identifiers: "CVE-2024-32002"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Git 严重漏洞，远程执行代码，Mac 和 Windows 通杀！"
product: "Git 子模块/符号链接"
record_type: "vulnerability"
document_type: "Git漏洞科普与复现说明"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "受影响Git分支；递归子模块克隆，大小写不敏感文件系统及符号链接支持；非所有Windows/macOS配置"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/Git%20%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%EF%BC%8C%E8%BF%9C%E7%A8%8B%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81%EF%BC%8CMac%20%E5%92%8C%20Windows%20%E9%80%9A%E6%9D%80%EF%BC%81.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/IstZ4r2ljR-uZbMC211qEw"
id: "vw-07d8fde522681ba62f053034"
entity_id: "ve-07d8fde522681ba62f053034"
schema_version: "1"
---

# Git 严重漏洞，远程执行代码，Mac 和 Windows 通杀！

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Git 子模块/符号链接
- 文献类型：Git漏洞科普与复现说明
- 版本、权限及部署边界：受影响Git分支；递归子模块克隆，大小写不敏感文件系统及符号链接支持；非所有Windows/macOS配置
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 主产品Git应按开发工具分类，Windows/macOS只是受影响环境；标题通杀和只要clone过宽，正文实际要求--recursive与文件系统/符号链接条件
2. 对hooks、子模块和大小写冲突的科普有价值，但默认.git路径解释未含自定义hooksPath/工作树等情况，应标常见布局
3. 受影响版本以跨分支<=写法重叠，缺各维护分支明确下限/修复版本及Git官方公告
4. 直接邀请执行恶意仓库克隆应改为受控研究说明；链接未固定提交，文中截图证据未经审阅验证
5. 原始研究PoC作者可追溯，缺原始技术公告；删标题党和推广尾部

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/IstZ4r2ljR-uZbMC211qEw>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247500286&idx=1&sn=394d9893064030f695ef9bc7cf2c28c1&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493241&idx=1&sn=25a4f5e770dabb10a8abe96f692d7391&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247495061&idx=1&sn=692ba561fed0f7ae6865f2b8da8fbffd&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247486528&idx=1&sn=3f7b09eb21969fdb16f5b0805ff69fed&scene=21#wechat_redirect>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/IstZ4r2ljR-uZbMC211qEw)

不得了了，家人们！

就在这几天，Git 爆出了一个严重漏洞，编号`CVE-2024-32002`，一个可以远程执行代码的 RCE 漏洞！

攻击者精心准备一个 Git 项目，只要你尝试去 Clone 它，你的电脑就能执行攻击代码沦陷。

比如下面这个 GitHub 上面的项目：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/83aff2b6824ab7b7e02bcbee57ee65f561f5d3d7f576c0b832aa7ce471690070.png)

你可以执行一下下面的命令：

> git clone --recursive git@github.com:amalmurali47/git_rce.git

不出意外的话，你的电脑将会弹出计算器程序：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/c60d52d04d063451184be3dc0f863df01f3e046f09c80731395df61982480fbf.gif)

能让你弹计算器，就能执行其他更危险的操作，比如给你种木马等等。

Git 是我们程序员基本离不开的工具，这波漏洞操作，属实是对程序员定向打击了。

接下来我们来理一理这个漏洞的工作原理是怎么样的。

在介绍攻击原理之前，得先来了解几个东西。

1、Git 钩子
--------

在 Git 里面有一个 HOOK 的机制，就是钩子的意思。不过这个 HOOK 不是咱们二进制安全攻击中的那个 HOOK。

Git 中的钩子是一些脚本，这些脚本在 Git 的特定事件发生时自动执行。钩子允许你在 Git 操作的不同阶段执行自定义操作，如代码格式化、测试运行、通知发送等。

Git 设计 hooks（钩子）的初衷是为了让用户能够在特定的 Git 事件发生时自动执行自定义脚本或操作。这些钩子提供了一种机制，可以在 Git 操作的各个阶段插入用户自定义的逻辑，以便实现更强大的自动化和定制化流程。

Git 钩子分为服务端和客户端钩子，在咱们程序员使用的 Git 客户端中，有下面这几个钩子：

> *   `pre-commit`：在提交之前运行。可以用来检查代码格式、运行单元测试等。
>     
> *   `prepare-commit-msg`：在提交信息编辑器打开之前运行。可以用来自动生成提交消息模板。
>     
> *   `commit-msg`：在提交信息编辑器关闭之后运行。可以用来验证提交消息的格式。
>     
> *   `post-commit`：在提交完成之后运行。可以用来发送通知或执行其他后续任务。
>     
> *   `pre-rebase`：在变基操作之前运行。可以用来检查变基前的状态。
>     
> *   `post-checkout`：在 git checkout 命令执行之后运行。可以用来设置特定文件的状态。
>     
> *   `post-merge`：在合并操作完成之后运行。可以用来重新编译项目或执行其他合并后的任务。
>     

那这些钩子脚本是存放在哪里的呢？就是在那个神秘的. git 目录下。

大家可以去看一下自己电脑上，不管是从 GitHub 克隆的项目，还是从公司的 git 服务器克隆的项目，你们的代码目录下，都有一个叫. git 的文件夹，它的目录结构大致是下面这样的：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/f1b1a24df4c94d549a04562e37cd39b8f569bd048820c74d7d2009c0606fccfb.png)

当我们创建一个新的 Git 项目时，执行完`git init`后，git 就会为我们创建一个. git 目录。

而我们刚才说的钩子脚本，就放在. git/hooks 里面，git 默认为我们提供了一些钩子脚本的示例。

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/4cbf596d73683e51f48aaf419b141c6ab20967dff33a54e4e659b67dcc6cd54b.png)

你可以在这里面添加一些自己的脚本程序，这样当你在执行对应的 git 命令操作时，对应的脚本程序就会得到执行。

要注意，.git 目录下的内容，是 git 程序自己在维护，不会受到 Git 项目里的内容的影响。你在上传代码的时候，.git 目录也不会被传到服务器上去。

所以，正常情况下，你从服务器克隆一个项目的时候，只是把项目拉到本地，不用担心执行恶意的 HOOK 脚本，因为. git 目录是你本地的 git 客户端程序创建的，除非你手动去把钩子脚本放到里面去，否则里面是不会有恶意钩子脚本的。

但是，我要说但是了，这一次漏洞的操作就很骚，骚在哪里呢？骚就骚在，它巧妙的利用了一个特性，把攻击脚本给写到. git 目录下面去了！

这是怎么办到的呢？这需要了解另一个 Git 的知识。

2、子模块
-----

子模块是嵌套在一个 Git 仓库中的另一个 Git 仓库，可以让你在一个项目中包含其他项目，比如某个开源项目要依赖于其他的开源项目。

在这种情况下，主项目下面会存在一个. gitmodules 文件，里面会记录该项目包含的其他 Git 项目的信息。

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/700ea4145f80e914813c9dd54b4add24b3a36f74e2617a979445478568a63611.png)

其中，path 指定子模块存放的位置，url 指定子模块的 Git 仓库地址。

我们在执行 git clone 克隆项目的时候，如果指定了一个递归的参数：`--recursive`，就会在拉取主项目之后，然后根据这个文件中的内容，递归的去拉取所依赖的其他子模块，然后放到对应的文件目录位置。

不仅主项目有一个. git 目录来记录项目相关的信息，子模块也有。你去上面这个 path 目录下去看，会发现这里也有一个. git，不过这个. git 不是一个文件夹，而是一个文件，里面记录了这个子模块对应的真正的. git 目录的位置。

这个位置一般在主项目. git 目录下的 modules 文件夹下面。

3、符号链接
------

接下来了解与这个漏洞相关的第三个知识点：符号链接。

在 Git 中，符号链接（symbolic link，简称 symlink）是指向另一个文件或目录的特殊类型的文件。符号链接本身不包含文件的内容，而是包含指向目标文件或目录的路径。当访问符号链接时，系统会自动重定向到其指向的目标。

简单理解的话，这玩意儿有点像快捷方式。

4、漏洞成因
------

好了，了解了上面这些知识背景，接下来，就要说说这个漏洞的成因了。

刚才说过，钩子脚本位于. git 目录中，而这个目录是与项目本身的内容无关的，它的内容是 git 客户端在维护，除非你手动放置脚本程序到 hooks 目录中，否则项目中的内容是不会跑到. git 目录中的。

而这次漏洞就采用了一个骚操作：

攻击者准备一个 Git 项目，在这个 Git 项目中，又依赖一个子项目。当采用`--recursive`参数的时候，递归去拉取对应的子项目，放到对应的位置。

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/700ea4145f80e914813c9dd54b4add24b3a36f74e2617a979445478568a63611.png)

就像上面这样，它指示 git，把 url 中的项目拉下来放到`A/modules/x`目录中。

然后骚操作来了：在这个项目下，有一个名字叫`a`的符号链接，并且让它指向了. git 目录。

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/513342428d25f0fb2be571b917c42b676cb665a6e30c85d45bad5045131cdb61.png)

因为 Windows 和 Mac 平台的文件和目录名称是大小写不敏感，注意这点很重要，导致在放置子模块到`A/modules/x`的时候，实际上就是放到了`.git/modules/x`目录下去了。

Git 项目内容写到. git 目录下了！事情就出在这里了！.git 目录是 git 程序的私家花园，被项目内容闯了进来！

你可能会问，一定要大小写不一样吗，我直接在. gitmodules 文件里面指定让它写到小写的`a/modules/x`路径下不行吗？

还真不行，我试过了，git 直接报错了：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/f94a3d4c46127a41ed65646ddc2bb9473efbdec748ef48cdff93ee0e06c838dd.png)

看来，git 基本的检查工作还是做了的，只是疏漏了大小写不一样的情况。

继续我们刚刚的分析，.git 目录这个 git 程序的私家花园，被人给闯进来了。

而且关键是它闯进来的位置是在`.git/modules/x`下面，前面说过，这个目录下面，是子模块所属的. git 目录，然后这个闯进来的家伙，还按照. git 目录的结构，里面放置一个 hooks 文件夹，里面放上相关的钩子脚本，等下 git clone 完成的时候，就会去执行这里的脚本程序了。

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/800cc6c75d4f8b11ee41a615bbac4a4da4bf83cac8f30c37fafb666dad70738e.png)

克隆完成之后的整个目录结构变成了这样：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/fe3116f59703a7ba73edfd68f39ec4b39392a6e190b2813c7faaf021fb751248.png)![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/9ba0f35e2b2768fe34bc93f2fe55c6bbc7fbf0c44497daf14d9aa41597d29a5e.jpg)

我用 procmon 抓了一下执行下面这条克隆命令到弹出计算器进程中间的过程

> git clone --recursive git@github.com:amalmurali47/git_rce.git

大家从进程的父子关系树和进程的命令行参数，就能看到这条攻击链路了：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/ef4692fb322e27d1d90c95811f318f0369e1d75e4b253e1fa3bd49290df6dd21.png)

最后总结一下：

1、攻击者精心构造了一个 Git 项目，这个项目依赖一个子项目，并且指定了这个子项目存储的路径为 A。

2、在这个 Git 项目下，有一个名为 a 的符号链接，指向了. git 目录。

3、子项目里面构造了一个 hooks 目录，攻击脚本存放在里面。

4、最后，递归克隆项目的时候，因为目录大小写不敏感的原因，子项目实际上被写到了. git 目录下。

5、相关的克隆动作，触发了`post-checkout`钩子的执行，而现在的 hooks 目录下，被写入了攻击者的恶意钩子脚本，于是就执行了这个恶意脚本。

Windows：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e9a6127749436ee01f0f78144960e56d2bf0e59082f3852bacc4fe6123808cfc.png)

Mac：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e4e3927f5cf132c9d42da996b529b538385195056410f0543a67f8ef6fe2e8ac.png)

以上就是本次漏洞的大致过程了。

本次漏洞受影响的版本有：

> *   v2.45.0
>     
> *   v2.44.0
>     
> *   <=v2.43.3
>     
> *   <=v2.42.1
>     
> *   v2.41.0
>     
> *   <=v2.40.1
>     
> *   <=v2.39.3
>     

赶紧来执行 git --version 看看你的版本有没有在上面的范围里，是的话赶紧升个级吧！

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a2c6826ef9a05493070846fbe664f1741e3ae8f61ecb602936e4353594208570.png)

温馨提示：**陌生人发来的 Git 项目链接，不要随意去克隆，小心被攻击哦~**

我是轩辕，都看到这里了，顺手点个关注再走呗~

最近公众号的推送真的一言难尽，全靠标题党吸眼球，很多干货文章都无法及时推送给大家，希望大家把公众号点个星标，轩辕先谢谢大家啦！

往期推荐
----

*   [程序员赛道太卷，逆向工程师怎么样？](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247500286&idx=1&sn=394d9893064030f695ef9bc7cf2c28c1&scene=21#wechat_redirect)
    
*   [核弹级漏洞！我把 log4j 扒给你看！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493241&idx=1&sn=25a4f5e770dabb10a8abe96f692d7391&scene=21#wechat_redirect)
    
*   [可怕！CPU 暗藏了这些未公开的指令！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247495061&idx=1&sn=692ba561fed0f7ae6865f2b8da8fbffd&scene=21#wechat_redirect)
    
*   [我是 Redis，MySQL 大哥被我害惨了！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247486528&idx=1&sn=3f7b09eb21969fdb16f5b0805ff69fed&scene=21#wechat_redirect)
    
*   [CPU 被挖矿，Redis 竟是内鬼！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493024&idx=1&sn=8b055fdaffb7455ffea23a9915adfca8&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
