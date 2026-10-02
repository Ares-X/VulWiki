---
source: "gelusus/wxvl 公众号漏洞文库"
title: "严重的 Telnetd 漏洞允许远程攻击者通过 23 端口执行任意代码"
product: "GNU Inetutils telnetd LINEMODE SLC"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-32746"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2026-32746"
prerequisites: "受影响GNU telnetd服务可达、认证前SLC解析、运行身份决定后果"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-cfe93cbbbd82e6926da06c38"
entity_id: "ve-cfe93cbbbd82e6926da06c38"
schema_version: "1"
---

# 严重的 Telnetd 漏洞允许远程攻击者通过 23 端口执行任意代码

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响GNU telnetd服务可达、认证前SLC解析、运行身份决定后果
- 证据范围：描述内存溢出及root风险，但无技术栈/PoC，不能将所有Telnet/ICS设备泛化为GNU受影响

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 目录严重的Telnetd应规范为GNU Inetutils，与24061不同实体
- 缺影响版本和修复commit；4月1预计发布是2026-03-19历史状态
- 超过90字节IDS阈值无来源/证据，不能作为确证入侵条件
- CVSS/低复杂度与稳定RCE能力未经技术资料支持

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2026-03-19 11:17  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/WibvcdjxgJnvd9hl8l4x0W1bwObK2Jd63wBMFliaORPwOibtnGRqyztp0tiaZyscicDN8TOYvYiaoKkuw3E9z1LKfMicU2JZS0Hpic2ficcpcPib4FKHM/640?wx_fmt=jpeg&from=appmsg "")  
  
GNU Inetutils 中的 telnetd 守护进程存在一个严重的缓冲区溢出漏洞。该漏洞编号为 CVE-2026-32746，允许未经身份验证的远程攻击者在受影响系统上执行任意代码并获取 root 权限。  
  
该漏洞无需用户交互，且利用路径极其简单，因此针对仍在运行遗留基础设施的防御方发出了紧急警告。  
  
根据 Dream Security Research 的分析，问题核心源于 telnetd 守护进程在处理 LINEMODE SLC（Set Local Characters，本地字符设置）选项协商时的实现缺陷。  
  
攻击者可在初始连接握手阶段发送特制构造的数据包，从而触发经典的缓冲区溢出漏洞。  
  
由于该过程发生在任何身份验证提示出现之前，攻击无需任何有效凭证。Dream Security 研究人员已于 2026 年 3 月 11 日向 GNU Inetutils 团队报告了该漏洞。  
  
**Telnetd 漏洞可实现远程攻击**  
  
维护团队已迅速确认该问题并批准修复补丁，但官方版本预计要到 2026 年 4 月 1 日才会发布。  
  
尽管目前尚未在野外发现被利用的情况，但由于攻击复杂度极低，仍需立即采取防御措施。  
  
尽管现代 IT 网络已基本用 SSH 取代 Telnet，但这一明文协议在工业控制系统（ICS）、运营技术（OT）以及政府环境中仍被广泛使用。  
  
许多老旧的可编程逻辑控制器（PLC）和 SCADA 系统仍将 Telnet 作为唯一的远程管理接口。  
  
由于升级这些系统成本高昂且会对业务运行造成干扰，许多组织不得不长期承担相关风险暴露。  
  
由于 telnetd 服务通常通过 inetd 或 xinetd 以 root 权限运行，一旦漏洞被成功利用，将导致主机被完全攻陷。  
  
攻击者可植入持久化后门、窃取敏感的运行数据，或将被攻陷设备作为跳板，进一步对制造生产线、供水系统或电网等关键基础设施发起深入攻击。  
  
在正式补丁尚未发布的情况下，安全团队必须立即采取缓解措施以保护暴露系统。  
  
关闭 telnetd 服务是最有效的防护手段。如果业务上必须保留该服务，网络管理员应在边界防火墙上封锁 23 端口，仅允许受信任主机访问。  
  
此外，以非 root 权限运行 telnetd 也可以在一定程度上降低漏洞利用成功后的影响范围。  
  
Dream Security 研究人员指出，传统的身份验证日志无法记录该攻击，因为漏洞利用发生在初始选项协商阶段。  
  
防御人员需要依赖网络层日志和数据包捕获来识别此类威胁。  
  
建议组织在防火墙上配置规则，记录所有新建的 23 端口连接，并部署入侵检测系统（IDS）特征规则，对携带异常大负载（超过 90 字节）的 LINEMODE SLC 子选项进行告警。  
  
所有日志应集中转发至 SIEM 平台，以防止攻击者在获取 root 权限后清除取证证据。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
