---
source: "gelusus/wxvl 公众号漏洞文库"
product: "HappyHackingSpace Gakido HTTP client library"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "GHSA-gcgx-chcp-hxp9; CVE-2026-24489"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
category_recommendation: "Web安全/开发框架"
title: "Gakido CRLF注入漏洞允许攻击者绕过安全控制"
prerequisites: "来源所述条件，未列明部分仍待核：应用把用户可控头值传给受影响库；文章称<0.1.1-1bc6019"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-47d306373b17f1b007170013"
entity_id: "ve-47d306373b17f1b007170013"
schema_version: "1"
---

## 核对与使用边界

- 分类更正：本文实际对象是 HappyHackingSpace Gakido HTTP client library，原 CMS 内容目录不能代替产品归属；只修正字段和分类建议，路径、来源和技术方法继续保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：应用把用户可控头值传给受影响库；文章称&lt;0.1.1-1bc6019

- **事实待核（1）**：HTTP客户端库明显误分类CMS，目录Gakido CRLF也将漏洞类型拼入产品。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：正文主CVE未抽到frontmatter；官方GHSA只有编号无直链。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（3）**：请求头注入到会话固定、缓存投毒、响应操纵需要具体代理/下游行为，新闻未提供链或PoC；严重与中危措辞混用。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Gakido CRLF注入漏洞允许攻击者绕过安全控制  
 网安百色   2026-02-03 10:52  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo7QPKaWfz5BCMDoLpwQI3G1cEibUOQicHBP7hmLe11Zb8ibF6XmG8fLamicObIpcaBCw9sZGaf9KT7fVQ/640?wx_fmt=jpeg&from=appmsg "")  
  
**Gakido库曝出CRLF注入漏洞，攻击者可借此绕过安全控制**  
  
HappyHackingSpace开发的HTTP客户端库Gakido被发现存在一个严重漏洞，该漏洞允许攻击者通过CRLF（回车换行）序列注入任意HTTP头信息。  
  
该漏洞被追踪为CVE-2026-24489（公告编号RO-26-005），影响所有早于0.1.1-1bc6019的版本，严重程度评级为“中危”。  
  
该缺陷使攻击者能够通过精心构造的头注入攻击，绕过服务器端的安全控制、污染缓存以及操纵HTTP响应。  
### 一、 漏洞成因分析  
  
该漏洞存在于Gakido的头处理逻辑中，具体位于gakido/headers.py  
文件的canonicalize_headers()  
函数内。  
  
当应用程序将包含CRLF序列（\r\n）、换行符（\n）或空字节（\x00）的用户可控头值传递给Gakido的请求方法时，这些字符在通过HTTP请求传输前未得到妥善清理。  
  
这种不充分的输入验证允许攻击者在合法请求中注入任意的HTTP头，从根本上破坏了HTTP通信的完整性。  
### 二、 攻击后果与利用场景  
  
利用此漏洞，攻击者可以执行多种攻击向量，对业务造成重大影响：  
- **绕过安全限制**  
：攻击者可通过注入与会话相关的头信息，利用会话固定攻击绕过旨在保护资源的服务器端安全控制。  
- **缓存投毒**  
：通过注入与缓存控制相关的头信息，攻击者可以污染中间缓存。  
- **响应操纵**  
：在代理配置中通过头注入操纵HTTP响应。  
- **添加未授权头**  
：在请求中添加未经授权的头信息。  
该漏洞在应用程序接受未经适当验证的用户输入作为HTTP头的场景下尤为危险。  
### 三、 修复建议  
  
该漏洞于2026年1月25日被报告，并于2026年1月27日公开披露，开发团队准备时间极短。  
  
安全团队已迅速发布了补丁版本0.1.1-1bc6019，可通过项目的GitHub仓库获取。  
  
**建议：**  
1. **立即升级**  
：所有Gakido用户必须立即升级到修补后的版本，以缓解头注入攻击的风险。  
  
1. **优先更新**  
：根据Rosecurify公告，正在生产环境中使用Gakido的组织应优先进行此更新，特别是那些处理敏感HTTP通信或接受用户提供的头值的应用程序。  
  
该漏洞凸显了在HTTP客户端库中进行输入清理的至关重要性，也提醒安全研究人员在使用处理网络通信原语的外部库时应保持谨慎。更多技术细节和完整修复方案可通过官方GitHub公告（GHSA-gcgx-chcp-hxp9）。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
