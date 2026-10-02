---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Microsoft Windows DNS Client / DNSAPI.dll 堆缓冲区溢出远程代码执行新闻"
product: "Microsoft Windows DNS Client / DNSAPI.dll"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-41096"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows11若干版本/Server2022/2025，声称2026-05-12修复"
prerequisites: "需向查询客户端提供恶意DNS响应；具体网络攻击条件未证"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/Windows%20DNS%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%94%BB%E5%87%BB.md"
id: "vw-7f7430c873dea0db07b57465"
entity_id: "ve-7f7430c873dea0db07b57465"
schema_version: "1"
---

# Microsoft Windows DNS Client / DNSAPI.dll 堆缓冲区溢出远程代码执行新闻

## 条目说明

- 对象与具体问题：Microsoft Windows DNS Client / DNSAPI.dll；堆缓冲区溢出RCE新闻
- 版本、配置及部署条件：Windows11若干版本/Server2022/2025，声称2026-05-12修复
- 认证与权限前提：需向查询客户端提供恶意DNS响应；具体网络攻击条件未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错分致远OA，应Windows网络栈；CVE2026-41096正文有但元数据未提取
- 只有二次新闻链接没有MSRC，9.8和静默后台触发/平台范围需权威核验
- 没有各SKU/补丁KB和build范围；属于通告并非完整PoC
- 建议限制解析器是缓解而非修复保证

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

 FreeBuf   2026-05-15 10:32  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
###   
  
  
微软Windows DNS客户端中新披露的一个漏洞可能让攻击者悄无声息地在企业网络中执行恶意代码，暴露出巨大的攻击面。该漏洞被正式编号为CVE-2026-41096，CVSS严重性评分高达9.8分（满分10分）。  
  
  
**Part01**  
### Windows DNS客户端RCE漏洞分析  
  
  
该漏洞的核心是深植于Windows操作系统架构中的堆缓冲区溢出问题，具体影响负责处理网络地址应答的基础组件DNSAPI.dll。几乎所有现代Windows设备都会使用该组件。  
  
  
当浏览器尝试加载网页、虚拟专用网络建立隧道或后台服务检查软件更新时，系统都会发起标准查询。如果易受攻击的设备收到针对这些请求的特殊构造响应，软件就会错误计算内存边界并异常处理网络负载。  
  
  
**Part02**  
### 攻击实现方式  
  
  
根据微软安全更新指南，攻击者可通过利用Windows DNS客户端中的内存损坏漏洞来执行任意代码。威胁行为者可能通过以下途径实现攻击：  
- 被入侵的路由器  
  
- 恶意本地网络服务器  
  
- 被污染的解析器  
  
- 恶意的公共无线连接  
  
攻击者只需目标设备执行其正常的持续后台连接检查即可触发隐藏漏洞。由于漏洞处理发生在客户端而非边缘服务器基础设施，受影响范围包括普通工作站和企业服务器。  
  
  
**Part03**  
### 修复建议  
  
  
微软已在2026年5月12日的补丁星期二发布周期中通过部署累积更新解决了这一严重威胁。官方修复措施消除了缓冲区溢出漏洞，覆盖了广泛部署的环境，包括：  
- Windows 11多个版本  
  
- Windows Server 2022  
  
- Windows Server 2025  
  
网络安全分析师强烈建议立即应用这些特定补丁，优先处理面向互联网的设备以及频繁连接到不可信远程网络的终端。在无法立即部署更新的情况下，建议防御者严格限制仅允许连接到可信解析器的出站连接，并严密监控后台网络服务产生的异常子进程。  
  
  
**参考来源：**  
  
Windows DNS Client Vulnerability Enables Remote Code Execution Attacks  
  
https://cybersecuritynews.com/windows-dns-client-vulnerability/  
  
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651337950&idx=1&sn=12d64571335d50c1b93389447dfb8ef1&scene=21#wechat_redirect)  
  
  
#### 电报讨论  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3ibvNluUKZ6RPy7h2fbYibRbLQDHPFqj89KkFsXBRibx5YTLiaTUfFOy9PKicps3l56iazUPNQrwdhkZ7jA/640?wx_fmt=png&from=appmsg "")  
  
****  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
