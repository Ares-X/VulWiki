---
source: "gelusus/wxvl 公众号漏洞文库"
title: "PostgreSQL 高危漏洞可导致环境变量被利用"
product: "PostgreSQL PL/Perl"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-10979"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2024-10979"
prerequisites: "低权限数据库用户能使用相关 PL/Perl 功能；影响取决于扩展和环境"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-ac1f3f80c4af344a1425c1ce"
entity_id: "ve-ac1f3f80c4af344a1425c1ce"
schema_version: "1"
---

# PostgreSQL 高危漏洞可导致环境变量被利用

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：低权限数据库用户能使用相关 PL/Perl 功能；影响取决于扩展和环境
- 证据范围：新闻说明影响和六个修复版本，非复现；应保留发表时间，不把当时未披露详情当现状

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主 CVE 缺少 frontmatter
- CREATE EXTENSIONS、CREATE FUNCTION 权限限制表述需用 PostgreSQL 实际权限模型核实
- 大量推广/推荐文章与漏洞正文应分离

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

THN  代码卫士   2024-11-15 17:35  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**网络安全研究员披露了位于开源数据库系统 PostgreSQL 中的一个高危漏洞，它可导致低权限用户修改环境变量，并可能导致代码执行或信息泄露后果。该漏洞的编号是CVE-2024-10979，CVSS评分8.8。**  
  
![](../../.resource/remote/1290abbb8d216a5148d4570aa830d90fad03bad48fb0961c359b7c1a4ce0e930.gif "")  
  
  
环境变量是指用户定义的值，它们可允许程序在运行时动态提取多种信息类型如访问密钥和软件安装路径，而无需进行硬编码。在某些操作系统中，它们会在启动阶段被初始化。  
  
PostgreSQL 在周四发布的安全公告中提到，“对 PostgreSQL PL/Perl 中环境变量的不正确控制可导致低权限数据库用户更改敏感的流程环境变量（如PATH）。它通常可导致任意代码执行后果，即使攻击者缺乏数据库服务器操作系统用户。”  
  
该漏洞已在 PostgreSQL 17.1、16.5、15.9、14.14、13.17和12.21中修复。Varonis 公司的研究员 Tal Peleg 和 Coby Abrams 发现了该漏洞，并表示它可导致“严重的安全问题”，具体取决于攻击场景。这些问题包括但不仅限于通过修改环境变量如PATH执行任意代码，或通过运行恶意查询，从机器上提取有价值信息等。  
  
目前并未发布该漏洞的更多详情，以便用户有足够的时间应用修复方案。建议用户限制扩展白名单。Varonis 公司表示，“例如，仅将 CREATE EXTENSIONS 权限授予特定的扩展，将 shared_preload_libraries 配置参数设置为加载仅要求的扩展，按照最小权限原则，通过限制 CREATE FUNCTION 权限，限制角色创建函数。”  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[已存在数十年的PostgreSQL漏洞影响多家云厂商，企业数据库遭暴露](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513590&idx=2&sn=d39361bd34d64d8416bb282dd8ccf9d6&chksm=ea94849cdde30d8a7154632057b0922178990c360416b3b71086143ba351c833dd86cf3bbc54&scene=21#wechat_redirect)  
  
  
[对象关系数据库管理系统PostgreSQL发布补丁](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485486&idx=3&sn=d59d4568852bde2c4e3289d65426a428&chksm=ea973944dde0b052e67c3a246e32fbd4c9fb89aba466d44c0691641f4b65bcdd34b7b75d4915&scene=21#wechat_redirect)  
  
  
[开源客户端qBittorrent 修复已存在14年的RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521357&idx=2&sn=dc9695c878770ba5390c627bc3e3681a&chksm=ea94a527dde32c31d351cd6dca491aa437fa8431c26df61f85217feb3f68a6a8070a59cfc195&scene=21#wechat_redirect)  
  
  
[NSA 的开源员工培训平台 SkillTree 中存在CSRF漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520038&idx=2&sn=921e2fe11a431d8a458188b65d0a3b9d&chksm=ea94be4cdde3375abbf6e79690d31fd0c1e2f7bdc02b738a8fc06afa426d4a95adedea7492d3&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://thehackernews.com/2024/11/high-severity-flaw-in-postgresql-allows.html  
  
  
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
