---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache SeaTunnel 漏洞允许未经授权的用户进行反序列化攻击"
product: "Apache SeaTunnel"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-32896"
referenced_identifiers: "CVE-2020-0796"
identifier_role: "primary"
cve: "CVE-2025-32896"
prerequisites: "2.3.1–2.3.10、API-v1作业提交可达、无有效客户端认证；MySQL连接/gadget/出网决定文件读或执行"
source_url: "https://cybersecuritynews.com/apache-seatunnel-vulnerability/"
source_status: "recorded"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-9fea4e147aeb526bf6327f6c"
entity_id: "ve-9fea4e147aeb526bf6327f6c"
schema_version: "1"
---

# Apache SeaTunnel 漏洞允许未经授权的用户进行反序列化攻击

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：2.3.1–2.3.10、API-v1作业提交可达、无有效客户端认证；MySQL连接/gadget/出网决定文件读或执行
- 证据范围：mysql连接串入口及/hazelcast/rest/maps/submit-job已指明，但正文将反序列化过程泛化成直接提交序列化对象，缺实证。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主32896缺frontmatter，0796仅页脚推荐不得误归
- 中等定级与8.2高分需分开注明评分来源
- 2.3.11修复及APIv2/双向TLS建议需官方说明具体默认和迁移条件，升级不一定自动配置鉴权
- 缺MySQL连接器版本、恶意数据库和gadget等前提，不能等同所有未授权请求均RCE
- 多处汉字丢失如纵/作及大量重复泛化风险表述，应规范

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

邑安科技  邑安全   2025-06-20 09:37  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8vqzZByoOEDKbrNqay7Vdic18l56C5JxrUNkkP3OczAca8FLIZBEAsXcypKBOlaEwMWTlXqxuhF9tA/640?wx_fmt=png&from=appmsg "")  
  
Apache SeaTunnel 是广泛使用的分布式数据集成平台，它披露了一个重大的安全漏洞，该漏洞使未经授权的用户能够通过其 RESTful API 接口执行任意文件读取作和反序列化攻击。  
  
该漏洞被跟踪为 CVE-2025-32896，并于 2025 年 4 月 12 日报告，影响了平台的多个版本，并被归类为中等严重性。  
  
Apache SeaTunnel RCE 漏洞  
  
该安全漏洞会影响 Apache SeaTunnel 版本 2.3.1 到 2.3.10，为在生产环境中使用这些版本的组织创造了一个很大的暴露窗口。  
  
该漏洞源于平台的 RESTful API-v1 实现中的访问控制不足，特别是针对 /hazelcast/rest/maps/submit-job 端点。  
  
此终端节点专为作业提交功能而设计，但缺乏适当的身份验证机制，允许恶意行为者在没有有效凭证的情况下利用系统。  
  
安全研究员 Owen Amadeus 发现并报告了此漏洞，强调了未经授权的用户如何绕过安全控制来访问敏感的系统资源。  
  
此漏洞的技术性质涉及纵 MySQL 连接参数，攻击者可以通过 URL 参数注入恶意负载以实现其目标。  
  
这种攻击媒介特别令人担忧，因为它结合了两个关键的安全风险：任意文件访问和反序列化漏洞，这可能导致远程代码执行场景。  
  
利用机制围绕着 SeaTunnel 作业提交过程中对数据库连接字符串的纵。  
  
攻击者可以精心设计 MySQL URL，其中包含触发任意文件读取作和 Java 反序列化攻击的附加参数。易受攻击的端点 /hazelcast/rest/maps/submit-job 在没有适当验证或身份验证检查的情况下处理这些恶意请求。  
  
此攻击的反序列化组件特别危险，因为它可能允许攻击者在目标系统上执行任意代码。  
  
通过作业提交界面提交构建的序列化对象，恶意行为者可能会完全控制受影响的 SeaTunnel 实例。  
  
这种类型的漏洞利用了 Java 的对象序列化机制，在该机制中，不受信任的数据可以绕过传统的安全边界被反序列化为可执行代码。  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="144" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="14330498" msthash="76" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">风险因素</span></span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="3259074" msthash="77" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">详</span></span></strong></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="144" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">受影响的产品</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">Apache SeaTunnel 版本 2.3.1 到 2.3.10</span></span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="144" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">冲击</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">远程代码执行 （RCE）</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="144" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">利用先决条件</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">– 对 SeaTunnel 实例的网络访问 - 启用 API-v1（默认）- 缺少 HTTPS 双向身份验证</span></span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td data-colwidth="144" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVSS 3.1 分数</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section style="margin-top: 8px;margin-bottom: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">8.2 （高）</span></span></section></td></tr></tbody></table>  


修复步骤  
  
Apache SeaTunnel 开发团队已在 2.3.11 版本中解决了此漏洞，并实施了全面的安全改进以防止未经授权的访问。  
  
运行受影响版本的组织应立即升级到最新版本，以降低潜在的安全风险。此修复包括增强的身份验证机制和输入验证过程。  
  
除了版本升级之外，强烈建议管理员实施其他安全措施。  
  
Apache 团队建议启用 RESTful API-v2 功能，其中包括改进的安全控制和身份验证框架。  
  
此外，实施 HTTPS 双向身份验证通过确保客户端和服务器之间的相互证书验证来提供额外的安全层。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/apache-seatunnel-vulnerability/  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1N39PtINn8tD9ic928O6vIrMg4fuib48e1TsRj9K9Cz7RZBD2jjVZcKm1N4QrZ4bwBKZic5crOdItOcdDicPd3yBSg/640?wx_fmt=jpeg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
