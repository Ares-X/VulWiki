---
cve: "CVE-2023-5528"
source: "gelusus/wxvl 公众号漏洞文库"
title: "开发和安全人员看过来！Kubernetes RCE 漏洞允许完全接管 Windows 节点"
product: "Kubernetes kubelet Windows in-tree存储"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-5528"
referenced_identifiers: "CVE-2023-3676"
identifier_role: "primary"
prerequisites: "Windows节点、可创建Pod及相关PV/PVC、适用in-tree卷插件；并非任意网络用户"
source_status: "unknown"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-62eaa7692d6bbbf4a3ab5acd"
entity_id: "ve-62eaa7692d6bbbf4a3ab5acd"
schema_version: "1"
---

# 开发和安全人员看过来！Kubernetes RCE 漏洞允许完全接管 Windows 节点

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Windows节点、可创建Pod及相关PV/PVC、适用in-tree卷插件；并非任意网络用户
- 证据范围：解释cmd符号链接参数到os.Symlink补丁，非PoC；默认全部<1.28.4忽略分支回移

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 缺1.27/1.26等分支修复边界和原始公告
- OPA误写为接收进出节点流量的代理，应说明策略评估/准入
- permanentVolumeClaim应为PersistentVolumeClaim，Go exec.Command大小写
- 建议无Windows也急修与末尾不必急修矛盾，需区分通用更新建议/此CVE实际暴露

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 安全客   2024-03-15 15:01  
  
广泛使用的 Kubernetes 容器管理系统中的一个安全漏洞允许攻击者在 Windows 端点上以系统权限远程执行代码，从而可能导致完全接管Kubernetes 集群内的所有 Windows 节点。  
  
Akamai 安全研究员 Tomer Peled 发现了该漏洞，该漏洞的编号为 CVE-2023-5528，CVSS 评分为 7.2。他在3 月 13 日发布的博客文章中解释说，漏洞利用在于操纵 Kubernetes 卷，该功能旨在支持集群上 pod 之间的数据共享，或将数据持久存储在 pod 的生命周期之外。  
  
根据该缺陷的 GitHub 列表，作为攻击媒介，攻击者需要在 Windows 节点上创建 Pod 和持久卷，这将使他们能够升级到这些节点上的管理员权限。  
  
Peled 告诉 Dark Reading：“利用此漏洞非常容易，因为攻击者只需要修改一个参数并应用 3 个 YAML 文件即可通过 Windows 端点获得 RCE。” 他在帖子中写道，Kubernetes 框架“基本上所有事情都使用 YAML 文件”。  
  
Kubernetes 集群仅在使用 Windows 树内存储插件时才会受到影响；然而，佩莱德在帖子中指出，“开发人员可以使用许多不同的卷类型”，从而创建不同的攻击场景。  
  
运行本地部署和 Azure Kubernetes 服务的 1.28.4 版本之前的 Kubernetes 默认安装容易受到攻击。Kubernetes 团队已收到有关该缺陷的警报，并且有一个补丁可用于修复，强烈推荐使用该补丁。  
  
Peled 写道：“由于问题出在源代码中，因此这种威胁将仍然活跃，并且对它的利用可能会增加——这就是为什么我们强烈建议修补你的集群，即使它没有任何 Windows 节点。”  
  
追随缺陷  
  
Peled 在调查另一个漏洞后发现了该缺陷，该漏洞具有相同的根本原因：不安全的函数调用和 Kubernetes 中缺乏用户输入清理。该缺陷是CVE-2023-3676，这是一个命令注入漏洞，可以通过将恶意 YAML 文件应用到集群来利用。该漏洞的发现导致了另外两个漏洞的发现，这两个漏洞也是由于 YAML 文件中的 subPath 参数缺乏清理而导致的，这会创建带有卷的 pod，并为恶意代码注入提供了机会。  
  
Peled 解释说：“在研究的最后，我们注意到代码中的一个潜在位置看起来可能会导致另一个命令注入漏洞”，该漏洞最终成为 CVE-2023-5528。  
  
“经过多次尝试，我们成功实现了类似的结果：作为 kubelet 服务（系统权限）执行命令，”他写道。  
  
漏洞利用和修补  
  
研究人员执行的概念验证主要针对本地卷，这是 Kubernetes 中的卷类型之一。在创建包含本地卷的 pod 时，kubelet 服务最终将通过命令行调用“exec.command”到达一个函数，从而在节点上的卷位置和 pod 内的位置之间创建符号链接。  
  
与许多终端一样，Windows 的命令提示符 (cmd) 允许依次执行两个或多个命令，以及在同一命令行中执行多个命令。“我们可以控制 cmd 执行中的参数之一，这意味着我们可以使用命令注入，”Peled 解释道。  
  
在本地卷上实现此目的有一些先决条件，包括需要指定或创建持久卷等。然而，一旦创建了该卷，“用户就可以使用 permanentVolumeClaim 请求存储空间，”他写道。“这是可以注射的地方。”  
  
针对该缺陷创建的补丁通过删除 cmd 调用并将其替换为将执行相同操作来创建符号链接的本机 GO 函数来消除注入的机会。“现在，GO ‘os’ 库将只执行符号链接操作，正如最初的预期，”他解释道。  
  
您的系统容易受到攻击吗？  
  
Kubernetes已成为使用最广泛的容器开源系统之一；然而，由于其被利用和访问组织数据的巨大潜力，它也已成为威胁行为者的主要目标。此外，Kubernetes 配置本身通常会创建一个易受攻击的安装，为威胁行为者提供了广泛的攻击面。  
  
“Kubernetes 是一个非常复杂且强大的工具，”Peled 说。“一方面，它的稳健性允许用户根据组织的需求定制体验，但另一方面，从开发人员或用户的角度来看，它很难确保其各个方面的安全。”  
  
事实上，CVE-2023-5528 及其相关缺陷的发现凸显了部署 Kubernetes 的企业“验证 Kubernetes 配置 YAML 的重要性，因为 Kubernetes 本身及其 sidecar 项目的多个代码区域缺乏输入清理，”Peled 写道。  
  
他告诉 Dark Reading，遵循基于角色的访问控制 (RBAC) 等最佳实践并确保集群是最新的也“应该可以缓解大部分已知威胁”。  
  
运行 Kubernetes 的企业环境仅当系统版本早于 1.28.4 并且系统运行 Windows 节点时才容易被利用。如果是这种情况，Akamai 提供了一个命令供管理员运行以确定是否应该对系统进行修补。如果是这样，应优先考虑修补。  
  
“如果你的 Kubernetes 集群没有任何 Windows 节点，你不必急于修补这个特定的漏洞，”Peled 指出。“但无论如何，当你有时间的时候修补它很重要。”  
  
如果无法立即修补，Akamai 还提供开放策略代理 (OPA) 规则来帮助检测和阻止此类行为。OPA 是一个开源代理，允许用户接收进出节点的流量数据，并对接收到的数据采取基于策略的操作。  
  
  
**来**  
  
**领**  
  
**资**  
  
**料**  
  
**【免费领】**  
**网络安全专业入门与进阶学习资料，轻松掌握网络安全技能！**  
  
****![](https://mmbiz.qpic.cn/sz_mmbiz_png/Ok4fxxCpBb59ibIezbic1Dob2DsGBgT7WkA3sJgtXriaUGWIocjCgU8JQth19dEFvC8lSOwlp1ALOVnZltOicA1RkA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
