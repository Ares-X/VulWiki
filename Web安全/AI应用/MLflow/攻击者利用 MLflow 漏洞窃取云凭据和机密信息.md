---
source: "gelusus/wxvl 公众号漏洞文库"
title: "攻击者利用 MLflow 漏洞窃取云凭据和机密信息"
product: "MLflow/FUXA"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-59847f11f413fd4d69b6a626"
entity_id: "ve-59847f11f413fd4d69b6a626"
schema_version: "1"
---

# 攻击者利用 MLflow 漏洞窃取云凭据和机密信息

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主CVE64849/25895皆缺metadata
- FUXA部分不属于MLflow
- 后段33831和33821自相矛盾应查证
- 恶意扫描/文件覆盖与RCE利用证据不同
- 版本、利用观察日期需字段
- 缺原始watchTowr/VulnCheck链接
- 长广告与断行影响阅读

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

Ravie Lakshmanan
                    Ravie Lakshmanan  代码卫士   2026-08-19 07:42  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
编译：代码卫士  
  
**影响开源人工智能平台****MLflow****和开源、基于网络的****SCADA/HMI****软件****FUXA****的两个严重漏洞（****CVE-2026-64849****和****CVE-2026-25895****），目前正遭到恶意扫描和利用。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
根据两家公司  
watchTowr  
和  
VulnCheck  
分别发布的报告，两个漏洞如下：  
  
- CVE-2026-64849  
（  
CVSS  
评分：  
9.3  
）是位于  
MLflow  
中的一个未认证服务器端请求伪造漏洞，可导致攻击者访问  
Tracking Server  
（  
mlflow   
服务器）的攻击者向任意内部云元数据端点发出  
HTTP  
请求，并提取敏感数据。（影响版本  
 < 3.15.0  
）  
  
- CVE-2026-25895  
（  
CVSS  
评分：  
9.5  
）是位于  
FUXA  
中的一个关键功能缺少身份验证以及路径遍历漏洞，可导致未认证的远程攻击者向服务器文件系统写入任意文件，并实现远程代码执行。（影响版本  
 <= 1.2.9  
）  
  
  
  
watchTowr  
公司在  
LinkedIn  
上发布的一篇文章中表示：  
“  
攻击者正在利用  
[CVE-2026-64849]  
直接访问云元数据服务，并窃取云凭据和秘密。  
”  
并补充表示在  
2026  
年  
8  
月  
17  
日该漏洞获得编号后的数小时内，就检测到攻击者无差别地扫描互联网上暴露的  
MLflow  
实例。  
  
watchTowr  
公司的首席威胁情报专家  
Yordan Ganchev  
在一份声明中表示：  
“  
该漏洞可导致攻击者利用  
MLflow  
模型注册表  
webhooks  
中的缺陷，通过受影响系统代理请求，并与内部服务交互。该漏洞利用它处理  
web  
重定向的方式，绕过了先前的补丁。我们的全球蜜罐遥测数据表明，攻击者正在滥用该漏洞，针对云托管的  
MLflow  
系统，试图从已知的内部  
IP  
地址和服务中提取凭据和秘密。  
”  
  
建议运行  
MLflow  
的组织机构优先为受影响且暴露的系统打补丁，审查审计日志以查找入侵迹象，并检查敏感凭证是否已暴露。  
  
VulnCheck  
表示，自  
2026  
年  
8  
月  
18  
日起检测到针对  
CVE-2026-25895  
的恶意扫描。该公司已观察到单个  
IP  
地址广泛扫描互联网上易受攻击的  
FUXA  
实例，发现约有  
60  
个  
FUXA  
安装暴露于公共互联网。  
VulnCheck  
研究副总裁  
Caitlin Condon  
在  
LinkedIn  
上发布文章中表示：  
“  
攻击者请求尝试通过  
CVE-2026-25895  
路径遍历，用垃圾数据覆盖  
main.js  
。尚未发现投放任何  
RCE  
有效载荷。  
”  
  
在过去一年中，  
FUXA  
中的另外两个漏洞  
CVE-2026-25939  
和  
CVE-2023-33831  
也遭活跃利用。  
Condon  
表示  
CVE-2023-33821  
的利用活动  
“  
可追溯至  
2025  
年  
11  
月，而最近一次发生在昨天  
”  
。  
  
  
代码卫士试用地址：https://sast.qianxin.com/  
  
开源卫士试用地址：https://oss.qianxin.com/  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[恶意PyPI 包针对 macOS，窃取谷歌云凭据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520240&idx=2&sn=549c4734cb750f652f9105a8e5df0546&scene=21#wechat_redirect)  
  
  
[塔塔电子数据泄露，苹果和特斯拉机密供应链信息遭暴露](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247526473&idx=1&sn=40ae1df01b82f1747285dd3b6f1b6b68&scene=21#wechat_redirect)  
  
  
[GitLab 公开仓库暴露超过1.7万份机密信息](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524561&idx=2&sn=7ed0ade9d82089d6e02e5c90e36d90a4&scene=21#wechat_redirect)  
  
  
[很多福布斯AI 50强公司的 GitHub 仓库泄露机密信息](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524359&idx=1&sn=f18cc055bc4baae64ee46cf0d4b05e0d&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://thehackernews.com/2026/08/attackers-exploit-mlflow-ssrf-flaw-to.html  
  
  
题图：Pixa  
b  
ay Licens  
e  
  
  
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
