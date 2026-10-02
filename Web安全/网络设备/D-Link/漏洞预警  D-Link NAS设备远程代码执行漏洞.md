---
cve: "CVE-2024-10915"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-6fc88b047ff6cc379940d4d9"
entity_id: "ve-6fc88b047ff6cc379940d4d9"
schema_version: "1"
title: "漏洞预警 | D-Link NAS设备远程代码执行漏洞"
product: "D-Link DNS NAS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-10915"
referenced_identifiers: ""
prerequisites: "与10914文同型号固件；account_mgr.cgi未认证；未指出cmd/参数"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/D-Link/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20D-Link%20NAS%E8%AE%BE%E5%A4%87%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  漏洞预警 | D-Link NAS设备远程代码执行漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：D-Link DNS NAS
- 本文讨论：CVE-2024-10915
- 版本、权限与配置前提：与10914文同型号固件；account_mgr.cgi未认证；未指出cmd/参数
- 资料类型：简短通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与10914文共享端点/版本但编号不同，无参数故不能判断重复或错号
- 声称已发补丁仅给主页，无修复号且未说明EOL
- PoC已公开无链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 10914/10915区别及补丁状态待官方核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

浅安  浅安安全   2024-11-22 23:50  
  
**0x00 漏洞编号**  
- # CVE-2024-10915  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
D-Link NAS设备是一类专门设计用于家庭和小型企业的网络存储设备。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SVL22sXWZReVaj95PAsCUQ05d3XdU3CN5kXZhAwz2DjmftLBG3yia12APCtOg5gvdEtXrr0AvdKRRA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2024-10915**  
  
**漏洞类型：**  
命令注入  
  
  
**影响：**  
  
执行任意代码  
  
**简述：**  
D-Link NAS设备的/cgi-bin/account_mgr.cgi接口处存在命令注入漏洞，未经身份验证的攻击者通过特制的HTTP请求可利用此漏洞执行任意系统命令，写入后门文件，获取服务器权限。  
  
**0x04 影响版本**  
- DNS-320 1.00  
  
- DNS-320LW 1.01.0914.2012  
  
- DNS-325 1.01  
  
- DNS-325 1.02  
  
- DNS-340L 1.08  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.dlink.com.cn/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
