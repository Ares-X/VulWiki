---
cve: "CVE-2025-30733"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Oracle TNS协议漏洞允许攻击者访问系统内存数据"
product: "Oracle Database TNS/TCPS listener"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-30733"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "受影响19/21/23分支；TCPS监听器及相关管理命令配置；无需数据库凭据的范围待核"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-3a2a228e029e591d26176319"
entity_id: "ve-3a2a228e029e591d26176319"
schema_version: "1"
---

# Oracle TNS协议漏洞允许攻击者访问系统内存数据

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响19/21/23分支；TCPS监听器及相关管理命令配置；无需数据库凭据的范围待核
- 证据范围：未初始化内存响应说明，无实际数据包或原始研究链接

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- LOCAL_OS_AUTHENTICATION被描述为限制全部远程监听连接，疑与管理命令认证混淆，需原厂核验
- TCP/TCPS与TLS混用；应明确受影响协议路径
- 称严重但CVSS只写中危无分数，评级来源需分开
- 受影响版本范围用连字符串连三分支，标准化为三条
- 40个公网实例和Windows偏向缺时点/测量来源

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

BaizeSec  白泽安全实验室   2025-05-30 13:10  
  
一、事件概述  
  
近期，网络安全研究人员在Oracle的Transparent Network Substrate（TNS） 协议中发现了一个被确定为CVE-2025-30733的严重漏洞，允许未经身份验证的攻击者从受影响的Oracle数据库服务器远程泄露敏感的系统内存内容。此问题是由于服务器对连接请求的响应中未初始化的内存读取引起的，尤其是通过TCP （TNS over SSL/TLS） 。攻击者可以利用此漏洞检索敏感数据，例如Windows环境变量（例如USERNAME、USERDOMAIN、Path），而无需有效的凭据。Oracle为此漏洞分配了CVSS评分（中），并于2025年4月15日发布了一个补丁，涵盖Oracle数据库版本19.3–19.26、21.3–21.17和23.4–23.7。  
  
该漏洞是研究人员在开发协议分析器期间发现的。使用类似于Oracle自己的lsnrctl工具（DESCRIPTION=（CONNECT_DATA=（COMMAND=version）））的连接字符串，他们观察到TCPS侦听器返回的不仅仅是标准横幅信息。相反，响应包括残余内存数据，其中可能包含有价值的系统信息。泄露的数据通常带有“sdp”或“wss”等前缀，可能与会话描述协议和Web服务安全功能有关。泄露信息的数量和类型取决于最近的内存使用情况，使其在实时环境中不可预测且风险更高。  
  
尽管Oracle的默认配置从10g版开始就限制了外部TNS侦听器的访问，但研究人员仍然发现了大约40个暴露在Internet上的易受攻击的系统，主要是在使用默认端口1521的Windows服务器上。由于配置错误，特别是当LOCAL_OS_AUTHENTICATION参数设置为OFF时，可以访问这些系统。此非默认设置将禁用仅本地访问，从而使远程攻击者能够利用此漏洞。这凸显了微小的配置更改如何损害企业环境中的安全性。  
  
Oracle在其2025年4月的关键补丁更新中迅速做出响应，并发布了补丁，强烈建议立即修复。除了应用补丁之外，组织还应确保正确配置LOCAL_OS_AUTHENTICATION，除非绝对必要，否则应避免将TNS侦听器暴露在Internet上。该事件凸显了三十多年前开发的TNS等传统协议带来的持续风险，并提醒我们，严格的网络分段和减少外部攻击面对于数据库安全至关重要。  
  
二、漏洞编号  
  
CVE-2025-30733漏洞  
  
三、影响的产品范围  
  
Oracle数据库服务器 - 19.3 - 19.26 - 21.3 - 21.17 - 23.4 - 23.7  
  
四、处置建议  
- 请参阅  
Oracle重要补丁更新公告—2025年4月，了解补丁、升级或建议的解决方法信息。  
  
- 确保将  
LOCAL_OS_AUTHENTICATION设置为ON，以限制侦听器仅访问本地连接。  
  
- 审计并最大限度地减少  
Oracle TNS侦听器的公开暴露，尤其是在端口1521上。  
  
- 在防火墙级别限制  
TNS侦听器访问，仅允许受信任的内部IP。  
  
- 使用网络分段将数据库服务器与面向  
Internet的网络隔离开来。  
  
- 定期检查侦听器，  
ORA配置。  
  
- 监控网络流量中是否存在异常的  
TNS协议请求，尤其是那些以TCP侦听器为目标的请求。  
  
- 实施入侵检测系统（  
IDS/IPS）来检测和阻止未经授权的TNS访问尝试。  
  
参考链接：  
  
https://www.oracle.com/security-alerts/cpuapr2025.html  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
