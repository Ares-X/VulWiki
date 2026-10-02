---
cve: "CVE-2023-40590"
source: "gelusus/wxvl 公众号漏洞文库"
product: "GitPython/Windows 不可信可执行搜索路径"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-40590"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  GitPython代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：文章写GitPython<3.1.4，缺固定版本；该边界需对照所链GHSA核实"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a9962956e738a11b604ce2b8"
entity_id: "ve-a9962956e738a11b604ce2b8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：文章写GitPython&lt;3.1.4，缺固定版本；该边界需对照所链GHSA核实

代码与实验材料：没有实际PoC，所谓PoC是两个不同GHSA公告链接；需要Windows及不可信仓库/可执行搜索路径动作

来源证据范围：引用官方GHSA-2mqj-m65w-jghx、GHSA-wfm5-v35h-vwf4及项目主页

- **事实待核（1）**：版本与编号/公告对应关系有混淆风险；依据：同一40590条目列两个GHSA，只写&lt;3.1.4；没有解释分别对应何漏洞或给分支固定点。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：搜索路径、shell/hooks执行前提不清；依据：git.exe/bash.exe路径问题混在一起，泛称代码执行而未逐项映射。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | GitPython代码执行漏洞   
浅安  浅安安全   2024-01-13 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-40590  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
GitPython是一个与Git库交互的Python库，包括底层命令与高层命令，它可以实现绝大部分的Git读写操作，避免了频繁与Shell交互的畸形代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUnic7IH0FOic1Hr7L5YByMl1lfVia5Q0UZicfKrSFUOAGoUTGFsHdBiaYHXeUkbCsRTBO1WH72ib1zWX6Q/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
  
**CVE-2023-40590**  
  
**漏洞类型：**  
代码执行  
  
**影响：**  
执行任意代码  
  
**简述：**  
GitPython中存在代码执行漏洞，在Windows上，如果GitPython使用shell来运行git，以及当它运行bash.exe来解释hooks时，它会使用不受信任的搜索路径并可能执行在不受信任的搜索路径中找到的程序。如果在Windows上使用这些功能中的任何一个，则可能导致从不受信任的存储库中运行恶意git.exe或bash.exe，从而导致任意代码执行。  
###   
  
**0x04 影响版本**  
- GitPython < 3.1.4  
  
**0x05****POC**  
  
https://github.com/gitpython-developers/GitPython/security/advisories/GHSA-2mqj-m65w-jghx  
  
https://github.com/gitpython-developers/GitPython/security/advisories/GHSA-wfm5-v35h-vwf4  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/gitpython-developers/GitPython  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
