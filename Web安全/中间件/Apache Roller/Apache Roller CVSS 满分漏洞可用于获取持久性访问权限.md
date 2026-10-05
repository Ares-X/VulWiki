---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache Roller CVSS 满分漏洞可用于获取持久性访问权限"
product: "Apache Roller"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-24859"
referenced_identifiers: "CVE-2025-30065; CVE-2025-24813"
identifier_role: "primary"
cve: "CVE-2025-24859"
prerequisites: "攻击者已持有有效旧会话，受害者改密码/账号禁用后旧会话未撤销；<=6.1.4"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-9f62519a20138b05c6b05170"
entity_id: "ve-9f62519a20138b05c6b05170"
schema_version: "1"
---

# Apache Roller CVSS 满分漏洞可用于获取持久性访问权限

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：攻击者已持有有效旧会话，受害者改密码/账号禁用后旧会话未撤销；<=6.1.4
- 证据范围：持久访问条件区别于新登录绕过；6.1.5会话管理修复叙述连贯但缺官方直链。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主24859漏frontmatter，Parquet/Tomcat编号仅新闻背景不可误取
- CVSS10未给来源/向量，与需旧会话条件需解释
- 不受限访问不代表自动管理员或OS权限
- 博客软件可按CMS主分类，保留中间件标签；清除推荐阅读/产品广告

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ravie Lakshmanan  代码卫士   2025-04-16 09:37  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**基于 Java 的开源博客服务器软件 Apache Roller 中存在一个严重漏洞（CVE-2025-24859），可导致恶意人员即使在密码更改后也可保留越权访问权限。**  
  
  
![](../../.resource/remote/2069adf134a498822d98b9e340a1ef09614dc268f3618e95dc44e85f5dcda62a.png "")  
  
  
该漏洞的CVSS 评分为10.0分，影响 Roller 6.1.4及之前所有版本。Apache Roller 项目的维护人员在一份安全公告中提到，“Apache 6.1.5之前的版本中存在一个会话管理漏洞，是因为活跃用户会话在密码更改后未正确验证造成的。当用户密码由用户或管理员更改时，现有会话仍然是活跃且可用的。”  
  
成功利用该漏洞可导致攻击者通过老旧会话，仍然保持对该应用的访问权限，即使密码更改后也不例外。如凭据被攻陷，则该漏洞还可导致不受限访问。  
  
该项目已通过执行中心化会话管理的方式，在6.1.5版本中修复该漏洞。如此，即使密码被更改或用户遭禁用，所有活跃会话仍然会得到验证。安全研究员 Haining Meng 发现并报送了该漏洞。  
  
几周前，Apache Parquet Java 库中被指存在一个严重漏洞CVE-2025-30065（CVSS 10.0），如遭成功利用，可导致远程攻击者在可疑实例中执行任意代码。上个月，Apache Tomcat 受一个严重漏洞（CVE-2025-24813，CVSS 9.8）的影响，并在漏洞详情公开不久后即遭活跃利用。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Apache Parquet Java 中存在CVSS满分漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522648&idx=1&sn=8642efdcfe877619e821e6fa74e779b7&scene=21#wechat_redirect)  
  
  
[Apache Ignite 严重漏洞可导致RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522291&idx=2&sn=d8279f609eb439d7d723557c865748fe&scene=21#wechat_redirect)  
  
  
[Apache MINA 存在严重的满分漏洞，可导致RCE](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521918&idx=1&sn=acf8324d4a36ec4e8d37b16375da9e75&scene=21#wechat_redirect)  
  
  
[Apache Traffic Control存在严重的SQL注入漏洞，可在数据库中执行任意命令](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521906&idx=1&sn=9cb8ea9b9dbfb2a32eec80f9973d8cf1&scene=21#wechat_redirect)  
  
  
[Apache Tomcat 漏洞导致服务器易受RCE攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521893&idx=1&sn=867f98595849107577a98fcaf043a177&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2025/04/critical-apache-roller-vulnerability.html  
  
  
  
题图：  
Pixabay   
License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
