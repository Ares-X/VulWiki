---
cve: "CVE-2023-7116"
source: "gelusus/wxvl 公众号漏洞文库"
product: "DataX-Web authenticated command injection"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-7116"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  DataX-Web命令注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：2.1.2; authentication required; /api/log/killJob"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-eeb87e81455531d96b32ea55"
entity_id: "ve-eeb87e81455531d96b32ea55"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：2.1.2; authentication required; /api/log/killJob

代码与实验材料：POC已公开 claim without payload or link

来源证据范围：Project homepage only; no security advisory or disclosed PoC

- **证据待核（1）**：No parameter/sink evidence; public PoC assertion unverifiable。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：No-fixed-release statement needs publication date and current verification。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | DataX-Web命令注入漏洞   
浅安  浅安安全   2024-01-06 08:04  
  
**0x00 漏洞编号**  
- # CVE-2023-7116  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
DataX Web是在DataX之上开发的分布式数据同步工具，提供简单易用的 操作界面，降低用户使用DataX的学习成本，缩短任务配置时间，避免配置过程中出错。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWFYbCV6ahalqIbmBpqPtSenLibKvdjkzULLddByVvPDIcGAnibk4MWcnxa5a1cJR3rQos2jU4FaQLg/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-7116**  
  
**漏洞类型：**  
命令注入****  
  
**影响：**  
  
接管服务器  
  
****  
  
**简述：**  
DataX Web在2.1.2版本中存在命令注入漏洞，经过身份认证的攻击者可以通过访问/api/log/killJob路由构造恶意的请求包，利用命令拼接的方式进行执行任意命令，控制服务器的权限。  
###   
  
**0x04 影响版本**  
- DataX Web 2.1.2  
  
**0x05****POC**  
- 已公开  
  
****  
**0x06****修复建议**  
  
**目前官方暂未发布漏洞修复版本，建议用户关注官网动态****：**  
  
https://github.com/WeiYe-Jing/datax-web  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
