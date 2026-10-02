---
cve: "CVE-2025-63932"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-0378dd3a104428b00f54e294"
entity_id: "ve-0378dd3a104428b00f54e294"
schema_version: "1"
title: "漏洞预警 | D-Link DIR-868L远程代码执行漏洞"
product: "D-Link DIR-868L A1"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-63932"
referenced_identifiers: ""
prerequisites: "FW106KRb01；HNAP SOAPAction未认证命令注入"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/D-Link/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20D-Link%20DIR-868L%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  漏洞预警 | D-Link DIR-868L远程代码执行漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：D-Link DIR-868L A1
- 本文讨论：CVE-2025-63932
- 版本、权限与配置前提：FW106KRb01；HNAP SOAPAction未认证命令注入
- 资料类型：简短通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 称PoC公开但无PoC/研究链接
- 声称厂商发布修复却仅给主页，无固件版本或公告

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE、认证和补丁可用性待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

浅安
                    浅安  浅安安全   2026-01-26 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-63932  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
友讯DIR-868L是友讯D-Link品牌旗下旗舰级双频千兆云路由器。  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/7stTqD182SV90bMc5WoLO2MWk19OYOxbsgnvt73eSeN4Ch58icIbibC5iaEIPb28epc1upxS5xHBkewm3TKDibLnvg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-63932**  
  
**漏洞类型：**  
远程代码执行****  
  
**影响：**  
接管路由器  
  
**简述：**  
D-Link DIR-868L A1固件FW106KRb01.bin的cgibin二进制文件存在未授权远程代码执行漏洞，由于其cgibin提供的HNAP服务未对HTTP SOAPAction头部字段进行过滤，未授权的远程攻击者可通过该漏洞执行任意shell命令。  
  
**0x04 影响版本**  
- D-Link DIR-868L A1  
  
- D-Link dir-868l_firmware fw106krb01  
  
**0x05 POC状态**  
- 已公开  
  
****  
**0x06 修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.dlink.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
