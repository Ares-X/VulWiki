---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-33117;CVE-2025-33121;CVE-2025-36050"
identifier_role: "primary"
primary_identifiers: "CVE-2025-33117;CVE-2025-33121;CVE-2025-36050"
referenced_identifiers: "CVE-2020-0796"
identifier_status: "unknown"
title: "IBM QRadar SIEM 漏洞允许攻击者执行任意命令"
product: "IBM QRadar SIEM服务器"
record_type: "advisory"
document_type: "三漏洞安全更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "33117高权管理员；33121已认证；36050本地访问；文称7.5至UP12IF01受影响、IF02修复"
side_effects: "元数据空；三条不同初始权限/影响必须分实体，标题命令执行不能覆盖后两信息泄露"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/IBM%20QRadar%20SIEM/IBM%20QRadar%20SIEM%20%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E6%89%A7%E8%A1%8C%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://cybersecuritynews.com/ibm-qradar-siem-vulnerability-2/"
id: "vw-5dbc369398608bb5a668fdb3"
entity_id: "ve-5dbc369398608bb5a668fdb3"
schema_version: "1"
---

# IBM QRadar SIEM 漏洞允许攻击者执行任意命令

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：IBM QRadar SIEM服务器
- 文献类型：三漏洞安全更新新闻
- 版本、权限及部署边界：33117高权管理员；33121已认证；36050本地访问；文称7.5至UP12IF01受影响、IF02修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据空；三条不同初始权限/影响必须分实体，标题命令执行不能覆盖后两信息泄露
2. 日志本地访问且PR:N不等不需要任何OS访问能力，应解释应用认证和本地接触区别
3. 声称研究者已证明完整控制却无原研究/验证；只有新闻源，没有IBM安全公告核对三项相同修复范围
4. 没有公布workaround不意味着唯一防御只有升级，版本/访问限制等缓解与根治分开
5. CVE证书/冲击/报道者机器翻译、HTML样式及推荐清理，SIEM管理服务迁Web/安全平台

### 操作风险

元数据空；三条不同初始权限/影响必须分实体，标题命令执行不能覆盖后两信息泄露

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://cybersecuritynews.com/ibm-qradar-siem-vulnerability-2/>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect>

### 归档技术正文

邑安科技  邑安全   2025-06-20 09:37  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8vqzZByoOEDKbrNqay7Vdic1A3a1Z8oGxJX56BuoqxtXrCTUQLrk1wDrFzeqJKVhv3cjcx2IyQvfOQ/640?wx_fmt=png&from=appmsg "")  
  
IBM QRadar SIEM 中存在多个高严重性漏洞，可能允许攻击者执行任意命令并访问敏感数据。  
  
最严重的漏洞被跟踪为 CVE-2025-33117，CVSS 评分为 9.1，使特权用户能够上传可在受影响系统上执行任意命令的恶意文件。  
  
敦促运行 IBM QRadar SIEM 版本 7.5 到 7.5.0 UP12 IF01 的组织立即更新到最新补丁，以防止潜在的安全漏洞。  
  
关键 QRadar 文件路径漏洞 （CVE-2025-33117）  
  
最严重的漏洞 CVE-2025-33117 对企业安全基础设施构成直接威胁。  
  
此缺陷归类为 CWE-73：文件名或路径的外部控制，允许特权用户修改配置文件，从而能够上传恶意自动更新文件。  
  
漏洞的 CVSS 向量 （CVSS：3.1/AV：N/AC：L/PR：H/UI：N/S：C/C：H/I：H/A：H） 表示基于网络的利用，攻击复杂度低，需要高权限，但无需用户交互。  
  
安全研究人员已经证明，具有提升访问权限的攻击者可以利用此漏洞获得完整的系统控制，从而可能危及整个 SIEM 部署。  
  
CVSS 向量中的范围更改 （S：C） 表明，成功利用此漏洞可能会影响易受攻击组件以外的资源，这使得这在 QRadar 管理关键安全数据的企业环境中尤其危险。  
  
发现的其他安全漏洞  
  
CVE-2025-33121 表示 CVSS 评分为 7.1 的 XML 外部实体 （XXE） 注入漏洞，分类为 CWE-611：XML 外部实体引用的不当限制。  
  
这种远程攻击媒介允许经过身份验证的用户通过恶意构建的 XML 数据泄露敏感信息或耗尽内存资源。  
  
第三个漏洞 CVE-2025-36050 涉及本地用户可访问的日志文件中敏感信息的不当存储。  
  
CVSS 评分为 6.2 且分类为 CWE-532：将敏感信息插入日志文件，此漏洞可能会将机密数据暴露给未经授权的本地用户。  
  
CVSS 向量 （CVSS：3.1/AV：L/AC：L/PR：N/UI：N/S：U/C：H/I：N/A：N） 表示本地访问要求，但不需要身份验证。  
  
这些漏洞是由 IBM 的安全道德黑客团队发现的，该团队包括研究人员 John Zuccato、Rodney Ryan、Chris Shepherd、Vince Dragnea、Ben Goodspeed 和 Dawid Bak。  
<table><tbody><tr style="box-sizing: border-box;"><td data-colwidth="96" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="7544134" msthash="76" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE 证书</span></span></strong></td><td data-colwidth="127" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="17242355" msthash="77" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">受影响的产品</span></span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="4085822" msthash="78" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">冲击</span></span></strong></td><td data-colwidth="122" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="17124536" msthash="79" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">利用先决条件</span></span></strong><strong style="box-sizing: border-box;font-weight: bold;"></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><strong msttexthash="8943688" msthash="80" style="box-sizing: border-box;font-weight: bold;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVSS 3.1 分数</span></span></strong></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="96" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2025-33117漏洞</span></span></section></td><td data-colwidth="127" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">IBM QRadar SIEM 7.5 – 7.5.0 UP12 IF01</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">任意命令执行</span></span></section></td><td data-colwidth="122" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">特权用户访问权限（管理员级别）</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">9.1 （严重）</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="96" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2025-33121漏洞</span></span></section></td><td data-colwidth="127" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">IBM QRadar SIEM 7.5 – 7.5.0 UP12 IF01</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">敏感数据泄露</span></span></section></td><td data-colwidth="122" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">经过身份验证的用户访问</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">7.1</span></span><span leaf=""><span textstyle="" style="font-size: 15px;">（高）</span></span></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="96" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">CVE-2025-36050漏洞</span></span></section></td><td data-colwidth="127" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">IBM QRadar SIEM 7.5 – 7.5.0 UP12 IF01</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">未经授权访问敏感信息</span></span></section></td><td data-colwidth="122" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section style="margin-bottom: 8px;margin-top: 8px;"><span leaf=""><span textstyle="" style="font-size: 15px;">本地系统访问 （无身份验证）</span></span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font mstmutation="1" msttexthash="27322204" msthash="95" style="box-sizing: border-box;"><span leaf=""><span textstyle="" style="font-size: 15px;">6.2 （中等）</span></span></font></td></tr></tbody></table>  
IBM 发布了 QRadar 7.5.0 UP12 IF02 作为所有已识别漏洞的最终修复程序。鉴于这些缺陷的严重性质，尤其是任意命令执行能力，组织必须优先考虑此更新。  
  
该安全公告没有提供任何解决方法或缓解措施，因此立即修补是唯一可行的防御策略。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/ibm-qradar-siem-vulnerability-2/  
  
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
