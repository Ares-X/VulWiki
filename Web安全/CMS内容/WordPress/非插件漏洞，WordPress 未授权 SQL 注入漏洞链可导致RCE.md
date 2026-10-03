---
cve: "CVE-2026-63030"
source: "gelusus/wxvl 公众号漏洞文库"
product: "WordPress core REST Batch / WP_Query"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-63030; CVE-2026-60137"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "非插件漏洞，WordPress 未授权 SQL 注入漏洞链可导致RCE"
prerequisites: "来源所述条件，未列明部分仍待核：7.0<7.0.2,6.9<6.9.5 both;6.8<6.8.6 only60137; RCErequires crackable adminhash and install capability"
side_effects: "未执行；本文需注意的操作影响：前置条件仅网络可达只覆盖SQLi链，RCE额外需破解密码且无额外认证阻碍/可安装插件"
source_status: "unknown"
id: "vw-af6a14718c5c3159b88c6ed9"
entity_id: "ve-af6a14718c5c3159b88c6ed9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：7.0&lt;7.0.2,6.9&lt;6.9.5 both;6.8&lt;6.8.6 only60137; RCErequires crackable adminhash and install capability

- **结论使用边界（1）**：frontmatter仅63030漏SQLi60137，需双主漏洞。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：明确6.8只受SQLi影响不能误按完整匿名链套所有分支。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：声称本文完整复现细节但只有截图，无Batch请求/参数/回显文本。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（4）**：前置条件仅网络可达只覆盖SQLi链，RCE额外需破解密码且无额外认证阻碍/可安装插件。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（5）**：有两个官方GHSA与发行公告精准来源，可核边界；产品宣传/预计规则时间应历史化。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  非插件漏洞，WordPress 未授权 SQL 注入漏洞链可导致RCE  
 山河学安全   2026-07-19 02:07  
  
WordPress 曝出 REST API 路由混淆与 SQL 注入漏洞（CVE-2026-63030、CVE-2026-60137），攻击者无需身份认证即可通过漏洞链触发数据库查询，实现管理员账户信息泄露。可实现未授权 SQL 注入获取管理员密码哈希，再通过破解管理员密码并利用插件安装功能可实现代码执行。  
  
  
**利用前置条件：**  
- 攻击者能够通过网络访问目标 WordPress 站点  
  
目前 **360漏洞挖掘智能体已成功复现该漏洞**  
。本文包含完整影响范围、修复方案、技术原理与复现细节，建议用户立即升级。  
  
  
<table><tbody><tr style="box-sizing: border-box;"><td colspan="4" data-colwidth="100.0000%" width="100.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;background-color: rgb(100, 130, 228);box-sizing: border-box;padding: 0px;"><section style="text-align: center;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞概述</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞名称</span></strong></p></section></td><td colspan="3" data-colwidth="76.0000%" width="76.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="word-break: break-all;white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">WordPress REST API 路由混淆与 SQL 注入漏洞</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞编号</span></strong></p></section></td><td colspan="3" data-colwidth="76.0000%" width="76.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">CVE-2026-63030 / </span><span style="box-sizing: border-box;"><span leaf="">CVE-2026-60137</span></span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">公开时间</span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">2026-07-18</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="color: rgb(0, 0, 0);box-sizing: border-box;"><span leaf="">POC状态</span></span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(100, 130, 228);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">已公开</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞类型</span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">路由混淆 /</span></p><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">SQL注入</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">EXP状态</span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未公开</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="color: rgb(0, 0, 0);box-sizing: border-box;"><span leaf="">利用可能性</span></span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">高</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(0, 0, 0);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">技术细节状态</span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(100, 130, 228);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">已公开</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">CVSS 3.1</span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span style="box-sizing: border-box;"><span leaf="">7.5 / 9.1</span></span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">在野利用状态</span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未发现</span></p></section></td></tr></tbody></table>  
  
  
**01**  
  
**漏洞影响范围**  
  
  
  
受影响的软件版本：  
  
7.0.0 <= WordPress < 7.0.2  
  
6.9.0 <= WordPress < 6.9.5  
  
6.8.0 <= WordPress < 6.8.6（仅受 CVE-2026-60137 影响）  
  
  
**02**  
  
**修复建议**  
  
  
  
**正式防护方案**  
  
官方已发布安全版本  
  
WordPress 7.0.x 版本升级到 7.0.2 及以上版本  
  
WordPress 6.9.x 版本升级到 6.9.5 及以上版本  
  
WordPress 6.8.x 版本升级到 6.8.6 及以上版本  
  
  
**03**  
  
**漏洞描述**  
  
  
  
近日，WordPress 公开披露了核心组件中存在的 REST API 路由混淆漏洞（CVE-2026-63030）以及 SQL 注入漏洞（CVE-2026-60137）。其中，CVE-2026-63030 源于 REST API Batch 接口处理多个子请求时，路由匹配结果与权限校验结果数组不同步，导致攻击者能够绕过部分请求限制，将特殊构造的请求分发到错误处理逻辑。结合 CVE-2026-60137 中的 WP_Query 查询参数 SQL 注入缺陷，攻击者可通过未认证 REST API 请求触发数据库查询，实现布尔型或时间型 SQL 注入，并读取数据库中的用户信息，包括管理员账户密码哈希。公开 PoC 已经验证该攻击路径可以恢复管理员哈希数据。后续攻击者可在离线环境破解管理员密码，并通过 WordPress 管理员插件安装功能部署恶意插件实现代码执行。  
  
  
**04**  
  
**漏洞复现**  
  
  
  
360漏洞研究院已成功复现 WordPress REST API 路由混淆与 SQL 注入漏洞（CVE-2026-63030、CVE-2026-60137），通过 SQL 注入成功读取 wp_users 表数据并获取管理员密码哈希，验证了未授权数据库信息泄露风险。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/dZ7ia5iaWFzz8ydwlia2XpTRfXoUeZXoPMACia4PQZKUicewoBibBr8IAicibnLALM6zx4f9M18rWenZtWj5DmNoy43p70P3wGyQNRxiawc1xX1ZzYjY/640?wx_fmt=png&from=appmsg "")  
  
CVE-2026-63030、CVE-2026-60137  
  
WordPress REST API 路由混淆与 SQL 注入漏洞复现  
  
  
**05**  
  
**产品侧支持情况**  
  
  
  
**360安全智能体：**  
支持该漏洞攻击的智能分析**。**  
  
**360测绘云 Quake**  
：默认支持该产品的指纹识别。  
  
**360高级持续性威胁预警系统**  
：预计 2026年7月20日发布规则更新包，支持该漏洞利用行为的检测。  
  
**360资产与漏洞检测管理系统**  
：预计 2026年7月20日发布规则更新包，支持该漏洞利用行为的检测。  
**本地安全大脑**  
：默认支持该漏洞的PoC检测。  
  
  
**06**  
  
**时间线**  
  
  
  
2026年7月19日，360漏洞研究院发布本安全风险通告。  
  
  
**07**  
  
参考链接  
  
  
  
https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-ff9f-jf42-662q  
  
https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-fpp7-x2x2-2mjf  
  
https://wordpress.org/news/2026/07/wordpress-7-0-2-release/  
  
  
08  
  
更多漏洞情报  
  
  
  
“扫描下方二维码，进入公众号粉丝交流群。更多一手网安资讯、漏洞预警、技术干货和技术交流等您参与！”  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/dZ7ia5iaWFzz8YToicKab1BicPnEdr7jiatvQUVWSMnYTBeG5ibibgxkGAG1rF4pUdpowPcCmokOO5tp4UjjhUsos4Zf4VwE1aM9NTUz3ogfgdwwFw/640?wx_fmt=gif&from=appmsg "")  
  
  
建议您订阅360数字安全-漏洞情报服务，获取更多漏洞情报详情以及处置建议，让您的企业远离漏洞威胁。  
  
  
邮箱：360VRI@360.cn  
  
网址：https://vi.loudongyun.360.net  
  
  
  
“洞”悉网络威胁，守护数字安全  
  
  
**关于我们**  
  
  
360 漏洞研究院，隶属于360数字安全集团。其成员常年入选谷歌、微软、华为等厂商的安全精英排行榜, 并获得谷歌、微软、苹果史上最高漏洞奖励。研究院是中国首个荣膺Pwnie Awards“史诗级成就奖”，并获得多个Pwnie Awards提名的组织。累计发现并协助修复谷歌、苹果、微软、华为、高通等全球顶级厂商CVE漏洞3000多个，收获诸多官方公开致谢。研究院也屡次受邀在BlackHat，Usenix Security，Defcon等极具影响力的工业安全峰会和顶级学术会议上分享研究成果，并多次斩获信创挑战赛、天府杯等顶级黑客大赛总冠军和单项冠军。研究院将凭借其在漏洞挖掘和安全攻防方面的强大技术实力，帮助各大企业厂商不断完善系统安全，为数字安全保驾护航，筑造数字时代的安全堡垒。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）

## KEV 公开验证材料补核（CVE-2026-60137，2026-10-03）

本节补入实际公开请求构造和 SQL 注入结果判据，保留上文原稿及图片。材料支持未经认证的 SQLi 链；本库只作静态阅读，没有运行模块、请求目标或恢复任何真实账户数据。

### 单独漏洞与串链前提

[WPScan CNA](https://github.com/CVEProject/cvelistV5/blob/54d12b277c27b642b6dd41df67fb1244110610f4/cves/2026/60xxx/CVE-2026-60137.json)描述的是 WP_Query 的 author__not_in 未妥善处理不可信输入：单独利用需要插件或主题把不可信值送入该参数，不能仅凭“WordPress 版本受影响”推定所有站点存在匿名入口。

WordPress 的 [60137 公告](https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-fpp7-x2x2-2mjf)与 [63030 公告](https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-ff9f-jf42-662q)确认另一条核心 REST Batch 串链；两个公告都没有给出具体请求体。下述公开模块补齐该缺口：在 6.9.0–6.9.4、7.0.0–7.0.1 中，63030 的路由/校验错位可绕过预期参数清洗，将 author_exclude 送到 author__not_in，无须额外插件或登录。6.8.0–6.8.5 仅属于 SQLi 本体范围，不适用这条双重 Batch 匿名入口。

### 可核读的完整输入来源

[Metasploit 辅助模块固定版本](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/modules/auxiliary/scanner/http/wordpress_wp2shell_sqli.rb#L11-L170)由 dividesbyzer0 编写，并署名 Searchlight Cyber 的发现与公告。模块公开双层 JSON requests 结构、子请求顺序、URL 编码、SQL 拼接和结果读取。下面按来源解释，不把简化摘要冒充可单独运行的完整脚本。

- HTTP 入口为 POST 站点根路径，查询参数 rest_route=/batch/v1，Content-Type 为 application/json
- 两层都使用方法 POST、路径 /// 的解析失败子请求制造索引错位
- 内层将 GET /wp/v2/posts/999999 上的 author_exclude 输入移交给集合 /wp/v2/posts 的 get_items 处理器；该 ID 不要求实际存在
- author_exclude 的完整来源表达式见模块第 110–131 行；外层将这组请求嵌在 POST /wp/v2/posts 的 body，再由 /batch/v1 的处理器接收

完整 inject 方法及其使用的常量、batch_post、编码调用均在同一源文件，未仅凭文件名或“PoC 已公开”标签判断。

### 结果判据与不能推出的结论

路由探针只比较 parse_path_failed、block_cannot_read、rest_batch_not_allowed 三个标记，支持的是 63030 路由错位；不能把它当作 60137 SQLi 成功。

模块随后使用 [TimeBasedBlindMixin](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/lib/msf/core/exploit/sqli/time_based_blind_mixin.rb#L11-L55)分别注入 1=1 与 1=2，并要求前者达到 SqliDelay、后者不达到。其 [MySQL 实现](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/lib/msf/core/exploit/sqli/mysqli/common.rb#L226-L355)把条件放入 IF 条件分支和 SLEEP 中。因此有具体输入与真/假时间对照，区别于仅查看版本或单个 HTTP 状态。[SQLi 基础模块](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/lib/msf/core/exploit/sqli.rb#L9-L28)注册的 SqliDelay 默认值为 1.0 秒，create_sqli 将 inject 请求闭包传给所选 MySQL 类；[基础类](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/lib/msf/core/exploit/sqli/common.rb#L26-L42)保存该闭包，时间判据测量的正是它的调用耗时。网络抖动和慢查询仍可能干扰时序；模块没有提供统计重试保证。

在时间对照成功后，[WordPress SQLi helper](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/lib/msf/core/exploit/remote/http/wordpress/sqli.rb#L85-L200)定位表前缀、读取 user_login/user_pass 并在操作者本地保存凭据和 loot。[配套文档](https://github.com/rapid7/metasploit-framework/blob/5e598d5233bebecef2a44904a286769d83d31d12/documentation/modules/auxiliary/scanner/http/wordpress_wp2shell_sqli.md)给出 6.9.4/MySQL 8.0 环境、保留默认 Hello World 文章的要求，以及 7.0.1 的预期模块输出。其哈希示例本身含占位点号，不是完整抓包或独立恢复数据证明。

原稿图片本轮已看像素：可读到 poc.py 的命令行 SQL、ID/用户名/哈希输出；图片没有该 poc.py 的请求构造或源代码，不能凭它补写缺失脚本。上述完整公开模块提供了独立的技术输入材料。读取哈希也不等于破解成功、安装插件成功或已经 RCE；完整远程代码执行模块未在本节审阅，不把它的链接升级为验证结论。

### 修复与操作影响

[WordPress 7.0.2 发行公告](https://wordpress.org/news/2026/07/wordpress-7-0-2-release/)确认 7.0.2、6.9.5 修复两项，6.8.6 修复 SQLi 本体，7.1 beta2 也包含修复；早于 6.8 的版本不在此次两漏洞范围。

辅助模块的这一调用路径不创建站点文章或用户，但会发送大量请求、使数据库延时、读取密码哈希，并在操作者机器保存敏感结果及扫描记录。不能据“不写目标业务内容”将整个过程称作无副作用。公开通用 helper 中另有创建用户、改权限和写文件函数；本模块没有调用这些函数。

现有 WordPress 合并条目已同时登记 60137 与 63030，继续保留为该链的主入口。本次只追加材料与范围说明，不把两个组成漏洞折叠成同一个漏洞实体，也不另建重复文章。已全文读取两个官方短公告、发行公告、辅助模块及文档、WordPress SQLi helper、MySQL Common、TimeBasedBlind、时间判据 mixin，以及 SQLi 创建器和基础类；没有声称审计全部框架依赖。
