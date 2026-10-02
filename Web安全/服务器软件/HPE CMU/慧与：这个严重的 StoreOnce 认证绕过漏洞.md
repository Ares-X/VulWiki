---
source: "gelusus/wxvl 公众号漏洞文库"
title: "慧与：注意这个严重的 StoreOnce 认证绕过漏洞"
product: "HPE StoreOnce Software/VSA"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-37089; CVE-2025-37090; CVE-2025-37091; CVE-2025-37092; CVE-2025-37093; CVE-2025-37094; CVE-2025-37095; CVE-2025-37096"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2025-37089; CVE-2025-37090; CVE-2025-37091; CVE-2025-37092; CVE-2025-37093; CVE-2025-37094; CVE-2025-37095; CVE-2025-37096"
prerequisites: "文称<4.3.11；部分漏洞需认证，可与37093组合的具体条件须分别记录"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-baa4926e17e399861cdffc88"
entity_id: "ve-baa4926e17e399861cdffc88"
schema_version: "1"
---

# 慧与：注意这个严重的 StoreOnce 认证绕过漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：文称<4.3.11；部分漏洞需认证，可与37093组合的具体条件须分别记录
- 证据范围：清楚列八问题，但只深入认证绕过和两路径遍历，属于多实体通告而非八份复现

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 误归HPE CMU，不同产品应分目录
- 八个主CVE元数据全缺
- 应补HPE公告/ZDI各实体链接和鉴权条件
- 无在野利用为新闻时点非持续现状

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Bill Toulas  代码卫士   2025-06-04 10:41  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**慧与 (HPE) 发布安全通告提醒称，基于磁盘的备份和冗余数据删除解决方案StoreOnce 中存在8个漏洞，其中最严重的是一个认证绕过漏洞CVE-2025-37093（CVSS 评分9.8），其余漏洞是四个RCE漏洞、两个目录遍历漏洞和一个服务器端请求伪造漏洞。**  
  
这些漏洞影响 HPE StoreOnce Software v4.3.11之前的所有版本。而v4.3.11是目前推荐的升级版本。这8个漏洞的编号如下：  
  
- CVE-2025-37089 – 远程代码执行 (RCE)  
  
- CVE-2025-37090 – 服务器端请求伪造  
  
- CVE-2025-37091 – 远程代码执行 (RCE)  
  
- CVE-2025-37092 – 远程代码执行 (RCE)  
  
- CVE-2025-37093 – 认证绕过  
  
- CVE-2025-37094 – 路径遍历任意文件删除  
  
- CVE-2025-37095 – 路径遍历信息泄露  
  
- CVE-2025-37096 – 远程代码执行 (RCE)  
  
  
  
目前这些漏洞的详情并未披露太多。  
  
不过发现这些漏洞的ZDI 表示CVE-2025-37093 位于 machineAccountCheck 方法的实现中，是因为对认证算法的实现不当造成的。尽管该漏洞是唯一一个本次被评级为严重的漏洞，但其它漏洞仍然能造成重大风险。ZDI 解释称，该认证漏洞是解锁其它所有漏洞潜力的关键，因此它们的风险并不孤立。  
  
例如两个中危的路径遍历漏洞CVE-2025-37094和CVE-2025-37095在实际中要比分数所反映的更容易遭利用。ZDI解释称，“该漏洞可使远程攻击者在受影响的HPE StoreOnce VSA 上披露敏感信息。尽管利用该漏洞要求进行认证，但现有的认证机制可被绕过。”  
  
值得注意的是，这些漏洞是在2024年10月发现并报送给慧与公司的，时隔七个月之后仍未发现它们遭活跃利用的迹象。HPE StoreOnce 通常供大型企业、数据中心、云服务提供商以及处理大数据或大型虚拟化环境的组织机构进行备份和恢复。它可与多种备份软件集成如 HPE Data Protector、Veeam、Commvault和Veritas NetBackup等，确保业务的可持续性和有效的备份管理。话虽如此，潜在受影响环境的管理员必须立即采取措施，应用安全更新进行修复。  
  
慧与公司并未在公告中提到这8个漏洞的缓解措施或应变措施，因此推荐升级。  
  
  
****  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[HPE：Aruba Networking 访问点中存在严重的RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521429&idx=1&sn=8d164e84c96d33be487787e9f3024b73&scene=21#wechat_redirect)  
  
  
[HPE 发布严重的 RCE 0day 漏洞，影响服务器管理软件 SIM，无补丁](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499209&idx=2&sn=c481c08557d40e5796397f548beee4fc&scene=21#wechat_redirect)  
  
  
[只要29个字符 “A”，HPE iLO4 服务器认证轻松绕](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247487566&idx=3&sn=402304d9804967f02a7a5c6555dcef8f&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/hewlett-packard-enterprise-warns-of-critical-storeonce-auth-bypass/  
  
  
  
题图：  
Pixabay Licen  
se  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
