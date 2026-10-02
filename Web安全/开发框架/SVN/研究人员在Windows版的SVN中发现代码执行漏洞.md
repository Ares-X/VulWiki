---
cve: "CVE-2024-45720"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Apache Subversion/Windows命令行"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-45720"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "研究人员在Windows版的SVN中发现代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：修复1.14.4，未列影响起点/其他分支；Windows10/11并非等同所有locale可利用"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fbf8ef31658e39db20325930"
entity_id: "ve-fbf8ef31658e39db20325930"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：修复1.14.4，未列影响起点/其他分支；Windows10/11并非等同所有locale可利用

代码与实验材料：Best-Fit编码导致参数注入概述，无字符/程序调用样例或验证

来源证据范围：声称Apache公告及DEVCORE作者，无具体URL

- **适用与权限边界（1）**：本地调用入口与远程影响边界需说明；依据：攻击者需控制传给svn.exe的参数，常由应用代理调用；不能直接当SVN服务端公网RCE。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：精确编码与修复范围缺失；依据：Best-Fit依系统代码页/参数处理，正文只有Windows泛述和1.14.4安全版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  研究人员在Windows版的SVN中发现代码执行漏洞   
流苏  FreeBuf   2024-10-11 19:47  
  
##   
  
  
Apache Subversion（SVN）是一款广受开发者欢迎的版本控制系统，用于维护源代码、网页和文档。最近，Apache Subversion中发现了一个关键的安全漏洞，CVE-2024-45720（CVSS评分8.2）。该漏洞主要影响Windows平台，可能导致命令行参数注入，从而执行非预期的程序。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR38iaLH1sCCqKO5RW4IzCrBCvqs25icsWhicQvblg2joYhfd79ytzddygWrWeSoZMXo9hxt4jRRZicna5A/640?wx_fmt=jpeg&from=appmsg "")  
  
  
根据Apache Subversion项目的安全公告，该漏洞源于Windows平台上命令行参数的处理方式。具体来说，当命令行参数传递给svn.exe等Subversion可执行文件时，会发生“最佳匹配”字符编码转换。公告解释道：“攻击者如果能够运行Subversion的一个可执行文件（svn.exe等），并使用特制的命令行参数字符串，可以利用字符编码转换过程导致意外的命令行参数解释，从而导致参数注入和其他程序的执行。”  
  
  
这个漏洞因为Windows处理命令行参数的方式与UNIX-like平台不同而变得更加严重。在Windows上，命令行参数作为单个字符串传递给程序，然后程序必须将其解析为单独的参数。在这个过程中，特别是当涉及到某些Unicode字符时，会发生“最佳匹配”字符编码转换，可能导致不可预测的结果，包括执行恶意命令。  
  
  
公告指出：“已知Subversion在Windows 10和11上受到影响；它可能也会影响大多数其他版本的Windows。”  
  
  
尽管这个问题仅限于Windows平台，但Apache Subversion在开发环境中的广泛使用增加了风险，因为许多团队依赖Subversion来管理跨各种项目的版本控制过程。这个漏洞对UNIX-like平台（如Linux和macOS）没有影响，因为这些平台处理命令行参数的方式不同。  
  
  
该漏洞由DEVCORE研究团队的安全研究人员Orange Tsai和Splitline报告，该团队以识别关键软件漏洞而闻名。  
  
  
CVE-2024-45720漏洞已在Subversion 1.14.4中得到修复，强烈建议所有Windows平台的用户升级到这个修复版本。对于那些无法立即升级的用户，公告提供了一个临时缓解措施，即应用Subversion项目提供的补丁。  
  
  
【  
FreeBuf粉丝交流群招新啦！  
  
在这里，拓宽网安边界  
  
甲方安全建设干货；  
  
乙方最新技术理念；  
  
全球最新的网络安全资讯；  
  
群内不定期开启各种抽奖活动；  
  
FreeBuf盲盒、大象公仔......  
  
扫码添加小蜜蜂微信回复「加群」，申请加入群聊  
】  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&retryload=2&tp=webp "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oQ6bDiaGhdyodyXHMOVT6w8DobNKYuiaE7OzFMbpar0icHmzxjMvI2ACxFql4Wbu2CfOZeadq1WicJbib6FqTyxEx6Q/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651302087&idx=1&sn=29d91904d6471c4b09f4e574ba18a9b2&chksm=bd1c3a4c8a6bb35aa4ddffc0f3e2e6dad475257be18f96f5150c4e948b492f32b1911a6ea435&token=21436342&lang=zh_CN&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651302006&idx=1&sn=18f06c456804659378cf23a5c474e775&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
