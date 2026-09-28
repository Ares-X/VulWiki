---
cve: "CVE-2020-17103"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  本该在2020年被修复的Windows提权漏洞，现在竟然还存在  
原创 360漏洞研究院
                    360漏洞研究院  360漏洞研究院   2026-05-18 07:50  
  
Windows 操作系统被曝存在 Cloud Filter 驱动本地权限提升漏洞（CVE-2020-17103，CVSS 7.0），**值得高度警惕的是，这本该在2020年就被修复的漏洞，在最新版系统中竟然依然存在**  
，攻击者在拥有本地普通用户权限的情况下，通过触发驱动中的竞争条件，可直接绕过访问控制并将其权限提升至 SYSTEM 级别。  
  
  
360漏洞研究院已成功复现 Windows Cloud Filter 驱动本地权限提升漏洞（CVE-2020-17103），执行提权代码后，获取 SYSTEM 权限，证明漏洞可实现本地权限提升。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dZ7ia5iaWFzz9eXL9OZXmXyaLtyicUZpRIIODp1ZpEssI2cOc2ObBC8kicibAzM6mXQISZh4np7UT5cRXem7SNiaBEg5JEgPicNbbghu94OuEe9Hms/640?wx_fmt=png&from=appmsg "")  
  
CVE-2020-17103  
  
Windows Cloud Filter 驱动本地权限提升漏洞复现  
  
  
**一、疑似旧漏洞修复失效**  
  
  
本次公开的EXP利用方案，对应的漏洞缺陷，与Google Project Zero研究员James Forshaw在2020年9月向微软上报的访问控制漏洞完全一致。当时微软将其编号为CVE-2020-17103，并宣称已在2020年12月的补丁中予以修复。然而，Chaotic Eclipse 在深度分析该组件时意外地发现，James Forshaw 在 2020 年编写的原始 PoC 代码在当前最新的系统环境中“无需任何修改即可直接运行”。  
  
  
目前，相关利用代码已被公开，攻击者可直接基于现有 PoC 快速完成漏洞复现与利用。  
  
  
因该漏洞相关信息已在互联网上公开传播，为提醒用户及时防范并降低安全风险，特发布本安全风险通告。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dZ7ia5iaWFzzibmNcTGkQL0eic7masGBgOAYlurF8diao4GuVia3pn6ibicMoEibTNiaiaYmws64NIJfrkfA0X8vXiagP08hrvyicVXgA3hz2Z0Ihib5YQngQ/640?wx_fmt=png&from=appmsg "")  
  
已公开POC截图  
  
  
**二、低权限用户可本地提权**  
  
  
该漏洞源于驱动程序 cldflt.sys 中的 HsmOsBlockPlaceholderAccess 函数在处理通过未公开的 CfAbortHydration API 创建注册表项时，未能执行正确的访问权限检查。攻击者利用该驱动滥用机制，通过诱导和触发特定的Race Condition（竞争条件），可以在无需高权限的 .DEFAULT 用户配置单元中创建任意注册表项，从而在系统调用相关流程时实现本地提权，最终获得完整的 SYSTEM shell 权限。  
  
  
**三、影响范围仍待官方确认**  
  
  
目前公开验证成功复现的环境包括最新的Windows 11 Pro（已安装2026年5月最新Patch Tuesday安全更新）以及最新的 Windows Server 2025 服务器系统。不过，Will Dormann 在测试中也提到，该漏洞在最新的 Windows 11 Insider Preview Canary（预览版）环境中未能成功利用，实际的精确受影响版本及最终影响范围仍需等待后续官方安全公告的更新确认。  
  
  
**四、安全建议**  
  
  
- 严禁运行来源不明、未经过安全校验的第三方程序与脚本；  
  
- 政企及个人用户持续关注微软官方安全公告，等待正式漏洞修复补丁；  
  
- 及时对内网终端做本地低权限账号行为管控，降低本地提权攻击风险。  
  
  
  
  
  
“扫描下方二维码，进入公众号粉丝交流群。更多一手网安资讯、漏洞预警、技术干货和技术交流等您参与！”  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/5nNKGRl7pFgrNicMticDTWVCUWbOwRuWcrYSpAlwDRibKNLbe3KialEfR0Y2PlPAvS4MN50asXETicAviaRy1gRicI2Dw/640?wx_fmt=gif&from=appmsg "")  
  
  
参考来源：  
  
**New Windows 'MiniPlasma' zero-day exploit gives SYSTEM access, PoC released**  
  
https://www.bleepingcomputer.com/news/microsoft/new-windows-miniplasma-zero-day-exploit-gives-system-access-poc-released/  
  
**MiniPlasma Zero-Day: PoC Exploit Code and Vulnerability Details Publicly Disclosed for Windows 11**  
  
https://securityonline.info/miniplasma-zero-day-poc-exploit-code-and-vulnerability-details-publicly-disclosed-for-windows-11/  
  
  
  
“洞”悉网络威胁，守护数字安全  
  
  
**关于我们**  
  
  
360 漏洞研究院，隶属于360数字安全集团。其成员常年入选谷歌、微软、华为等厂商的安全精英排行榜, 并获得谷歌、微软、苹果史上最高漏洞奖励。研究院是中国首个荣膺Pwnie Awards“史诗级成就奖”，并获得多个Pwnie Awards提名的组织。累计发现并协助修复谷歌、苹果、微软、华为、高通等全球顶级厂商CVE漏洞3000多个，收获诸多官方公开致谢。研究院也屡次受邀在BlackHat，Usenix Security，Defcon等极具影响力的工业安全峰会和顶级学术会议上分享研究成果，并多次斩获信创挑战赛、天府杯等顶级黑客大赛总冠军和单项冠军。研究院将凭借其在漏洞挖掘和安全攻防方面的强大技术实力，帮助各大企业厂商不断完善系统安全，为数字安全保驾护航，筑造数字时代的安全堡垒。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
