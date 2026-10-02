---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d9373f43ea2b74d3431e499b"
entity_id: "ve-d9373f43ea2b74d3431e499b"
schema_version: "1"
title: "高危漏洞打包兜售，Palo Alto、Fortinet、Linux等关键系统在列"
product: "跨产品漏洞包，表格产品映射严重可疑"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "条件多数简化或缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%E6%89%93%E5%8C%85%E5%85%9C%E5%94%AE%EF%BC%8CPalo%20Alto%E3%80%81Fortinet%E3%80%81Linux%E7%AD%89%E5%85%B3%E9%94%AE%E7%B3%BB%E7%BB%9F%E5%9C%A8%E5%88%97.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  高危漏洞打包兜售，Palo Alto、Fortinet、Linux等关键系统在列  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：跨产品漏洞包，表格产品映射严重可疑
- 本文讨论：多个CVE情报引用，非单一PAN-OS漏洞
- 版本、权限与配置前提：条件多数简化或缺失
- 资料类型：暗网售卖情报汇总，非漏洞原研；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 表格CVE-2025-32756写Linux凭据恢复，与Fortinet PSIRT FG-IR-25-254的未认证代码执行不符
- 表格6235写Citrix NetScaler信息泄露，与NVD的ExtremeControl XSS不符
- 33073写Qualcomm需复核；55591范围7.0–7.2.12跨产品分支合写；0108所有型号忽略版本
- 评分格残留access.redhat.com+15等引用拼接垃圾；唯一来源为售卖帖，不能支持技术断言

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 技术表已局部外部对照： https://fortiguard.fortinet.com/psirt/FG-IR-25-254 与 https://nvd.nist.gov/vuln/detail/cve-2025-6235；其余映射、交易真伪和在野状态未核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 网空闲话  网空闲话plus   2025-06-12 10:23  
  
2025年6月12日 13:27:46，威胁行为者“冰雹”在暗网市场Ramp4u上发布贴文，声称正在兜售一套包含多个高危CVE漏洞的“利用包（exploit pack）”，引发业界警惕。威胁行为者也声称可单独出售，具体要看买家能出多少银子。该漏洞包涉及多个主流系统和平台，包括Linux内核、Palo Alto PAN-OS、Fortinet FortiOS、WordPress插件、Apache Tomcat等，并涵盖本地权限提升（LPE）和远程代码执行（RCE）等严重攻击类型。  
  
综合近期披露的漏洞细节，多个CVE（如CVE-2025-0108、CVE-2024-55591和CVE-2025-20188）已被列入CISA KEV（已知被利用漏洞）目录，部分还出现PoC和在野利用痕迹。尤其Fortinet和Palo Alto产品中存在的认证绕过漏洞，以及Tomcat和Roundcube中的远程执行风险，使得该漏洞包一旦被不当获取，将对全球范围内的防火墙、邮件网关与内容管理系统构成重大威胁。  
  
尽管该事件当前被监测平台定级为“低严重性”，但其潜在影响不容忽视。建议各组织立即评估是否存在相关服务和插件暴露，尽快部署厂商补丁，并重点监控暗网通道中与该漏洞包相关的传播和交易活动。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/0KRmt3K30icWxr8tLfoD1kib3XibAA9oQwKel65m6hTXEYDzicWOP2vIFcDY8ARcclF3ejBJUeicmYvZa1pK1iaOTRLQ/640?wx_fmt=png&from=appmsg "")  
  
经整理评估， 这批漏洞中还是有一些重磅级的，CVSS评分9分（有5个）以上。可能对相关设备造成重大危害。  
  
<table><tbody><tr style="height:14.40pt;"><td data-colwidth="160" width="160" style="height: 14.4pt;"><section style="font-size: 15px;"><span leaf=""><span textstyle="" style="font-weight: bold;">CVE编号</span></span></section></td><td data-colwidth="139" width="139"><section style="font-size: 15px;"><span leaf=""><span textstyle="" style="font-weight: bold;">漏洞类型</span></span></section></td><td data-colwidth="364" width="364"><section style="font-size: 15px;"><span leaf=""><span textstyle="" style="font-weight: bold;">漏洞描述</span></span></section></td><td data-colwidth="199" width="199"><section style="font-size: 15px;"><span leaf=""><span textstyle="" style="font-weight: bold;">影响版本</span></span></section></td><td data-colwidth="200" width="200"><section style="font-size: 15px;"><span leaf=""><span textstyle="" style="font-weight: bold;">CVSS评分</span></span></section></td><td data-colwidth="228" width="228"><section style="font-size: 15px;" data-mpa-action-id="mbt7ceo51d83"><span leaf=""><span textstyle="" style="font-weight: bold;">在野利用</span></span></section></td></tr><tr style="height:72.00pt;"><td data-colwidth="160" width="160" style="height: 72pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑5287</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">SQL注入</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">WordPress “Likes and Dislikes” 插件 post 参数存在未授权 SQL 注入，允许数据窃取</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">≤ 1.0.0</span></section></td><td data-colwidth="200" width="200"><span style="font-size: 13px;"><span leaf="">7.5（High）</span></span><span style="font-size: 13px;"><span leaf="">access.redhat.com+15cvedetails.com+15cvedetails.com+15</span></span><span style="font-size: 13px;"><span leaf="">cisa.gov+1github.com+1</span></span></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">无公开利用报告</span></section></td></tr><tr style="height:43.20pt;"><td data-colwidth="160" width="160" style="height: 43.2pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑20188</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">任意文件上传 + RCE</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">Cisco IOS XE 无线控制器 Out-of-Band 功能含硬编码 JWT，允许任意文件上传及路径遍历，触发 Root 权限执行</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">Catalyst 9800 系列（9800‑CL/嵌入式）启用 OOB Image Download</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">10.0（Critical）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">PoC已释出，CVE收录后确认可利用</span></section></td></tr><tr style="height:43.20pt;"><td data-colwidth="160" width="160" style="height: 43.2pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑49113</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">PHP 反序列化导致 RCE</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">Roundcube Webmail _from 参数未过滤，触发 PHP Object Deserialization，可远程执行代码</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">&lt; 1.5.10, &lt; 1.6.11</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">9.9（Critical）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">已有详实分析，PoC讨论中，但无明确大规模利用</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑32756</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">本地凭证恢复</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">Linux 系统可提取敏感凭证（Johnson Controls 披露）</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">未详细列出</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">暂无评分（待 NVD）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">无已知利用</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2024‑12754</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">本地文件读取</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">AnyDesk ≤ 8.0.9.0 处理背景图漏洞，可读取任意文件泄露敏感信息</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">≤ 8.0.9.0</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">5.5（Medium）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">无公开利用记录</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑24813</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">路径等价 RCE</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">Apache Tomcat 路径验证遗漏，可能导致远程代码执行</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">Tomcat（版本待确认）</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">初评 5.5，预估可能高达 9.8</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">PoC已出现，社区广泛关注</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑33073</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">信息泄露</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">Qualcomm ML IE 参数越界读取，可能泄露敏感信息</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">Qualcomm ML IE</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">无评分</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">暂无报告</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑6235</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">信息泄露</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">Citrix NetScaler Console 存在未授权信息泄露</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">未公开版本</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">9.4（Critical）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">暂无PoC利用</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2024‑55591</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">认证绕过</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">FortiOS/Proxy Node.js WebSocket 验证绕过，获取超级管理员权限</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">FortiOS 7.0‑7.2.12</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">9.8（Critical）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;"><span leaf="">被LockBit、SuperBlack 勒索软件利用</span></section></td></tr><tr style="height:28.80pt;"><td data-colwidth="160" width="160" style="height: 28.8pt;"><section style="font-size: 13px;"><span leaf="">CVE‑2025‑0108</span></section></td><td data-colwidth="139" width="139"><section style="font-size: 13px;"><span leaf="">认证绕过</span></section></td><td data-colwidth="364" width="364"><section style="font-size: 13px;"><span leaf="">PAN‑OS 管理界面绕过，可执行 PHP 脚本修改系统行为</span></section></td><td data-colwidth="199" width="199"><section style="font-size: 13px;"><span leaf="">所有本地PAN‑OS型号</span></section></td><td data-colwidth="200" width="200"><section style="font-size: 13px;"><span leaf="">9.1（Critical） / 8.8（High）</span></section></td><td data-colwidth="228" width="228"><section style="font-size: 13px;" data-mpa-action-id="mbt7c7ed12m5"><span leaf="">已被CISA列入KEV，Confirm 利用报告</span></section></td></tr></tbody></table>  
  
  
参考资源：  
https://ramp4u.io/threads/sell-exploit-pack.3188/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
