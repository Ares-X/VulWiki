---
cve: "CVE-2025-67038"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-8c5ad4e0df5d21a9669cbc65"
entity_id: "ve-8c5ad4e0df5d21a9669cbc65"
schema_version: "1"
title: "Lantronix工业设备高危漏洞遭在野利用，暴露OT设备补丁窗口期风险"
product: "Lantronix EDS5000串口设备服务器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2025-67038"
referenced_identifiers: ""
prerequisites: "声称未认证root命令注入；无固件/接口"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Lantronix/Lantronix%E5%B7%A5%E4%B8%9A%E8%AE%BE%E5%A4%87%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%E9%81%AD%E5%9C%A8%E9%87%8E%E5%88%A9%E7%94%A8%EF%BC%8C%E6%9A%B4%E9%9C%B2OT%E8%AE%BE%E5%A4%87%E8%A1%A5%E4%B8%81%E7%AA%97%E5%8F%A3%E6%9C%9F%E9%A3%8E%E9%99%A9.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Lantronix工业设备高危漏洞遭在野利用，暴露OT设备补丁窗口期风险  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Lantronix EDS5000串口设备服务器
- 本文讨论：CVE-2025-67038
- 版本、权限与配置前提：声称未认证root命令注入；无固件/接口
- 资料类型：工业事件新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- KEV/BRIDGE/Chaya006/蜜罐等大量精确信息无原始链接
- 近两万涉及两厂商多设备不是单CVE确认数量
- 补丁逆向归因为研究者推测，不能当已证明攻击来源；修复无版本

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 在野时间线、固件/入口及归因待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 铸盾安全
                        铸盾安全  河南等级保护测评   2026-06-27 22:24  
  
美国网络安全和基础设施安全局（CISA）近日确认，工业联网设备厂商**Lantronix**  
一项高危漏洞已被攻击者在真实环境中利用，并将其列入**已知被利用漏洞（Known Exploited Vulnerabilities，KEV）目录。该漏洞编号为CVE-2025-67038**  
，影响Lantronix **EDS5000**  
系列串口转IP（Serial-to-IP）设备服务器，攻击者无需身份认证即可通过命令注入漏洞，以Root权限执行任意系统命令，从而完全控制设备。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hfjKPyxBDjoRoX21GTWBIMJibaTSj86mnsNqRyotYDclMqHY2VTtdO7qvUZbYAickHwiaicoLlhgJtrrvJIiccAtHdqOS2HcvbhIsO58YuQs94QM/640?wx_fmt=png&from=appmsg "")  
  
此次事件源于Forescout Vedere Labs今年4月发布的**BRIDGE**  
研究。研究人员共披露了**22个此前未知的安全漏洞**  
，涉及Lantronix和Silex两家厂商的串口转IP设备。其中包括远程代码执行、命令注入、身份认证绕过、权限提升等多种高危漏洞。研究团队同时发现，全球约有**近2万台**  
相关设备直接暴露在互联网，其中大量部署于制造、能源、电力、水务、交通、医疗等关键基础设施环境。  
  
串口转IP设备虽然体积较小，却是工业控制系统（ICS）中的关键通信节点，主要负责将传统串口设备（如PLC、RTU、工业传感器、仪器仪表等）接入现代TCP/IP网络，实现远程监控和管理。由于这些设备通常位于IT网络与OT网络之间，一旦被攻陷，攻击者不仅能够控制设备本身，还可能篡改串口通信数据、伪造工业控制指令，甚至作为跳板进一步横向移动至生产控制网络，对工业生产过程造成影响。  
  
更值得关注的是，Forescout在后续分析中发现，针对CVE-2025-67038的攻击**发生在漏洞补丁发布之后、技术细节公开之前**  
。研究人员部署的蜜罐记录到攻击者成功利用该漏洞，而当时既没有公开的漏洞分析，也没有可利用代码（PoC）。研究团队认为，攻击者极有可能通过逆向分析厂商补丁（Patch Reverse Engineering）快速还原漏洞原理，并开发出利用程序。这意味着，企业即使在漏洞尚未公开披露时，也可能已经面临真实攻击，传统依赖漏洞公告再部署防护的模式正受到挑战。  
  
Forescout还发现，攻击活动不仅针对Lantronix漏洞本身，还伴随着针对基于OpenWrt和LuCI管理界面的自动化暴力破解和侦察扫描。研究人员将这一系列活动命名为**Chaya_006**  
，其攻击脚本具有明显针对性，并非普通互联网漏洞扫描或僵尸网络传播行为，而是专门瞄准工业边缘设备开展持续探测。  
  
安全专家指出，此次事件反映出工业网络攻击模式正在发生变化。过去，攻击者通常首先入侵VPN、防火墙或远程访问系统，再逐步渗透OT网络；如今，部署在网络边缘的串口服务器、工业网关等设备正逐渐成为新的突破口。与此同时，漏洞利用速度不断加快，攻击者已能够在补丁发布后迅速完成逆向分析并实施攻击，大幅压缩企业的修复窗口。  
  
针对相关风险，CISA和Forescout建议用户尽快升级Lantronix发布的最新固件，关闭不必要的互联网访问接口，修改默认账户及弱口令，限制管理界面对公网开放，并通过网络分区、工业DMZ、持续监测及EDR等措施加强OT边缘设备防护，避免边缘设备成为攻击者进入工业控制网络的入口。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
