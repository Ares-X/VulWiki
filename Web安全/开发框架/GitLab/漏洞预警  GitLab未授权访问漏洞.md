---
cve: "CVE-2024-9693"
source: "gelusus/wxvl 公众号漏洞文库"
product: "GitLab/Kubernetes agent 授权绕过"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-9693"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "漏洞预警  GitLab未授权访问漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：16.0至<17.3.7、17.4至<17.4.4、17.5至<17.5.2；低权限账号及特定 agent 配置"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-e1853e9812dfb5be7751d040"
entity_id: "ve-e1853e9812dfb5be7751d040"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：16.0至&lt;17.3.7、17.4至&lt;17.4.4、17.5至&lt;17.5.2；低权限账号及特定 agent 配置

代码与实验材料：公告称当时无公开PoC，无具体利用步骤

来源证据范围：2024-11-21，只有 GitLab 首页，无特定安全公告

- **适用与权限边界（1）**：未授权标题易误解为无需认证；依据：正文明确低权限用户可访问 Kubernetes agent，但没有展开所需配置和角色。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  漏洞预警 | GitLab未授权访问漏洞   
浅安  浅安安全   2024-11-21 00:01  
  
**0x00 漏洞编号**  
- CVE-2024-9693  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
GitLab是一个用于仓库管理系统的开源项目，其使用Git作为代码管理工具，可通过Web界面访问公开或私人项目。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVGBiaficDylnXhWUEY2CkYiavDjgRSHG0ao3eXBzYqlMf7sTtGRGDCeVDTaNKSEibCnSCGvMvU88ZlVA/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2024-9693**  
  
**漏洞类型：**  
未授权访问  
  
**影响：**  
泄露敏感信息  
  
**简述：**  
GitLab中存在未授权访问漏洞，在特定配置下，低权限用户通过该漏洞可未授权访问Kubernetes集群代理，进而导致数据泄露、篡改或服务中断等。  
  
**0x04 影响版本**  
- 16.0 <= GitLab CE/EE < 17.3.7  
  
- 17.4 <= GitLab CE/EE < 17.4.4  
  
- 17.5 <= GitLab CE/EE < 17.5.2  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://about.gitlab.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
