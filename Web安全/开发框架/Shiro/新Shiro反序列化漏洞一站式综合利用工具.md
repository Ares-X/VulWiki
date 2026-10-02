---
source: "gelusus/wxvl 公众号漏洞文库"
product: "ShiroExploit/FightingLzn9"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "新Shiro反序列化漏洞一站式综合利用工具"
prerequisites: "来源所述条件，未列明部分仍待核：未固定工具版本，称支持高JDK/Tomcat10"
side_effects: "未执行；本文需注意的操作影响：能力保证和无侵入性不成立；有key/gadget不保证所有环境RCE；改配置和内存马属于侵入性改变"
source_status: "unknown"
id: "vw-e2e969c1388b77dad851a1b2"
entity_id: "ve-e2e969c1388b77dad851a1b2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未固定工具版本，称支持高JDK/Tomcat10

代码与实验材料：九功能与多图，无实验组件清单和代码

来源证据范围：FightingLzn9/ShiroExploit直链，出处夜组安全

- **操作与副作用边界（1）**：能力保证和无侵入性不成立；依据：有key/gadget不保证所有环境RCE；改配置和内存马属于侵入性改变。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（2）**：缺危险操作提示及版本校验；依据：炸弹探测、改key和HeaderMaxSize均未说明业务影响，GitHub未锁commit。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  新Shiro反序列化漏洞一站式综合利用工具  
 黑白之道   2026-01-25 01:19  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/3xxicXNlTXLicwgPqvK8QgwnCr09iaSllrsXJLMkThiaHibEntZKkJiaicEd4ibWQxyn3gtAWbyGqtHVb0qqsHFC9jW3oQ/640?wx_fmt=gif "")  
  
## 工具介绍  
  
ShiroExploit，是一款Shiro反序列化漏洞一站式综合利用工具。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5ccT3v8Bn03ZOnwHWNiaANM5cBYn7QaHCYpiaPbaym6N75zl4yONRb54Q/640?wx_fmt=png&from=appmsg&watermark=1 "")  
## 工具功能  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5VhbfAwB2HfwibTgXCahWIYONvPaCNE3pcWhniav1yxxpJ2RNRdzl0QXQ/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
1、区分ShiroAttack2，采用分块传输内存马，每块大小不超过4000。  
  
2、可打JDK高版本的shiro，确保有key、有gadget就能rce。  
  
3、依托JavaChains动态生成gadget，实现多条利用链，如CB、CC、Fastjson、Jackson。  
  
4、通过魔改MemshellParty的内存马模板，使其回显马通信加密，去除一些典型的特征。  
  
5、借助JMG的注入器，加以魔改，实现无侵入性，同一个容器可同时兼容多种类型的内存马。  
  
6、对内存马和注入器类名进行随机化和Lambda化处理，规避内存马主动扫描设备的检测。  
  
7、可以更改目标配置，如改Key、改TomcatHeaderMaxSize。  
  
8、采用URLDNS链和反序列化炸弹的方式来探测指定类实现利用链的探测。  
  
9、缺点是流量相对大一些。  
## 功能演示  
  
JDK18场景下实现命令执行和打入多种内存马。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5eSlnbicS32XibzadGULDib0r23Mw7N33OdKbcCnGLUazgtiaMAXmw8MP8A/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
跑key。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5ccT3v8Bn03ZOnwHWNiaANM5cBYn7QaHCYpiaPbaym6N75zl4yONRb54Q/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
探测利用链。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5dQdASUCB5xemSpk9CCsicvfmhO7hu4yAINuSczaS1icUFqVccSP2icZIw/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
命令执行。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5eicI8Uj6CULiandtlOpM23GuLPYjur5hErDUtweqKic2EK1m1ByD1sPfA/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
打入Godzilla内存马（支持Behinder内存马）。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5GicHUEp8DzNz0YQGv98EIAzyeOoJwrP36UnxDVF1ylvqUG63Xfjl7ibg/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
打入SUO5V2内存马。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5qtjVVALWmHvuy7hANTdTD4sdUYPIickpic2N9ZEia4CrxOZOJ2Xz1icI3g/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
支持Tomcat10及以上的内存马。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/icZ1W9s2Jp2UIRDCPwyvn1Vg58IfWQ0s5sE6Izn96Xd8nBpfXEHTJT4Wty6RxXVX0icCFWJvV2B7VB3VI8Vicicl6g/640?wx_fmt=png&from=appmsg&watermark=1 "")  
  
  
## 工具获取  
  
  
https://github.com/FightingLzn9/ShiroExploit  
  
> **文章来源：夜组安全**  
  
  
  
黑白之道发布、转载的文章中所涉及的技术、思路和工具仅供以安全为目的的学习交流使用，任何人不得将其用于非法用途及盈利等目的，否则后果自行承担！  
  
如侵权请私聊我们删文  
  
  
**END**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
