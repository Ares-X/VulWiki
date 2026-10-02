---
cve: "CVE-2026-48282; CVE-2026-48313; CVE-2026-48276"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Adobe ColdFusion 多个漏洞细节已公开，可导致远程代码执行"
product: "Adobe ColdFusion RDS和CKEditor文件管理器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "disputed"
primary_identifiers: "CVE-2026-48282; CVE-2026-48313; CVE-2026-48276"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "48282/RDS读取须启用RDS且禁用RDS认证；CKEditor上传须显式启用；写路径受服务账户权限限制"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8c68d52dcd7e9b8944bee262"
entity_id: "ve-8c68d52dcd7e9b8944bee262"
schema_version: "1"
---

# Adobe ColdFusion 多个漏洞细节已公开，可导致远程代码执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：48282/RDS读取须启用RDS且禁用RDS认证；CKEditor上传须显式启用；写路径受服务账户权限限制
- 证据范围：明确两编号只是补丁比对推测，应保持不确定；所谓完整复现主要截图而非文本请求

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 2025U9/2023U20与修复U10/U21需Adobe官方确认，不能把推测CVE作为确证
- RCE需CFML落在可访问/加载位置，并非任意位置写入即执行
- 元数据只主CVE，多实体关联；厂商产品规则和推广可精简
- 未发现利用、规则预计发布时间应绑定2026-07-03

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 360漏洞研究院
                    360漏洞研究院  360漏洞研究院   2026-07-03 03:26  
  
Adobe ColdFusion 曝出远程开发服务（RDS）无需认证高危路径穿越漏洞（CVE-2026-48282，CVSS 10.0），攻击者在特定配置下无需任何凭据，仅需构造特制 HTTP POST 请求，即可在 ColdFusion 服务当前运行账户权限上下文中实现远程代码执行。攻击者可能据此执行恶意命令、写入后门文件、访问应用可访问的数据，并进一步扩大对服务器的控制范围。  
  
  
**利用前置条件：**  
- 已启用 ColdFusion RDS  
  
- 未启用 RDS 身份验证  
  
目前 **360漏洞挖掘智能体已成功复现该漏洞**  
。本文包含完整影响范围、修复方案、技术原理与复现细节，建议用户立即升级。  
  
  
<table><tbody><tr style="box-sizing: border-box;"><td colspan="4" data-colwidth="100.0000%" width="100.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;background-color: rgb(100, 130, 228);box-sizing: border-box;padding: 0px;"><section style="text-align: center;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞概述</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞名称</span></strong></p></section></td><td colspan="3" data-colwidth="76.0000%" width="76.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">Adobe ColdFusion 路径穿越漏洞</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞编号</span></strong></p></section></td><td colspan="3" data-colwidth="76.0000%" width="76.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">CVE-2026-48282</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">公开时间</span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">2026-06-30</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="color: rgb(0, 0, 0);box-sizing: border-box;"><span leaf="">POC状态</span></span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(100, 130, 228);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">已公开</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞类型</span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">路径穿越</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">EXP状态</span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(100, 130, 228);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">已公开</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="color: rgb(0, 0, 0);box-sizing: border-box;"><span leaf="">利用可能性</span></span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">高</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(0, 0, 0);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">技术细节状态</span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;color: rgb(100, 130, 228);box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">已公开</span></strong></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="24.0000%" width="24.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">CVSS 3.1</span></strong></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">10.0</span></p></section></td><td data-colwidth="28.0000%" width="28.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">在野利用状态</span></strong></p></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未发现</span></p></section></td></tr></tbody></table>  
  
  
**01**  
  
**漏洞影响范围**  
  
  
  
受影响的软件版本：  
  
Adobe ColdFusion 2025 <= Update 9  
  
Adobe ColdFusion 2023 <= Update 20  
  
  
**02**  
  
**修复建议**  
  
  
  
**正式防护方案**  
  
受影响用户请立即升级至以下版本或更高版本：  
  
Adobe ColdFusion 2025 用户请升级至 Update 10  
  
Adobe ColdFusion 2023 用户请升级至 Update 21  
  
  
**03**  
  
**漏洞描述**  
  
  
  
近日，安全研究人员披露了 Adobe ColdFusion 中存在的路径穿越漏洞（CVE-2026-48282）。该漏洞源于系统的远程开发服务（RDS）模块在处理文件操作命令时，缺乏有效的路径规范化与边界校验。当服务器开启 RDS 功能且未启用身份验证时，攻击者可以通过特定的 RPC 协议格式向后端服务发送特制的 FILEIO 写入请求，利用路径穿越序列突破 Web 根目录限制，在系统任意位置写入恶意的 CFML 脚本文件，最终在当前用户上下文中实现任意代码执行，导致系统失控。  
  
  
研究人员同期公开了 ColdFusion RDS FILEIO 任意文件读取漏洞。研究显示，在启用 RDS 且未启用 RDS 身份验证的特定配置下，攻击者可向 FILEIO 接口发送构造的文件读取请求，读取服务器上的任意敏感文件，包括系统配置、应用配置及凭据文件等。根据研究人员的补丁比对推测，可能对应 Adobe 同期修复的 CVE-2026-48313。  
  
  
研究人员还公开了 ColdFusion 内置 CKEditor 文件管理器文件上传路径穿越漏洞。当文件管理器上传功能被显式启用后，未经认证的攻击者可在上传请求的路径参数中插入路径穿越序列，使上传文件突破预期目录限制并写入指定位置。若危险类型文件被写入 Web 可访问目录，可能进一步导致远程代码执行。根据研究人员的补丁比对推测，可能对应 Adobe 同期修复的 CVE-2026-48276。  
  
  
**04**  
  
**漏洞复现**  
  
  
  
360漏洞研究院已成功复现Adobe ColdFusion 路径穿越漏洞（CVE-2026-48282），通过构造特制 HTTP 请求，成功在服务器上触发了远程代码执行。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dZ7ia5iaWFzz9cOanNccMUEQPa5fjStpkS2VWzJg5n5AvDKCJcdTed9oy5AcHAOqWtdWibliavUIxUNu4Ik4IZGPynSPw2iaPEARK3YvL4pBarN8/640?wx_fmt=png&from=appmsg "")  
  
图1 发送 Payload  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dZ7ia5iaWFzzice8zicB5icNqP2zPMVwibplmWCVxe9aoDXdtvqPesjbr40XtUJ4JaF0R5u5ibxPNwnxP3Auh4x6wTCnkQG7dQibzHqD05yJDwCK3Mc/640?wx_fmt=png&from=appmsg "")  
  
图2 CVE-2026-48282 Adobe ColdFusion 路径穿越漏洞复现  
  
  
**05**  
  
**产品侧支持情况**  
  
  
  
**360安全智能体：**  
支持该漏洞攻击的智能分析**。**  
  
**360测绘云 Quake**  
：默认支持该产品的指纹识别。  
  
**360高级持续性威胁预警系统**  
：预计 2026年7月6日发布规则更新包，支持该漏洞利用行为的检测。  
  
**360资产与漏洞检测管理系统**  
：预计 2026年7月6日发布规则更新包，支持该漏洞利用行为的检测。  
**本地安全大脑**  
：默认支持该漏洞的PoC检测。  
  
  
**06**  
  
**时间线**  
  
  
  
2026年7月3日，360漏洞研究院发布本安全风险通告。  
  
  
**07**  
  
参考链接  
  
  
  
https://nvd.nist.gov/vuln/detail/CVE-2026-48282  
  
https://labs.watchtowr.com/its-37oc-and-all-we-can-think-about-is-coldfusion-adobe-coldfusion-security-bulletin-apsb26-68-cve-bonanza/  
  
  
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
