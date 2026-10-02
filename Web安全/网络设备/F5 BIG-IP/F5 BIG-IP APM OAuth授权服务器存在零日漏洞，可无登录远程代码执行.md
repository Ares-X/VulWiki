---
cve: "CVE-2026-94127"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-e94d04bee56f9b0b523094af"
entity_id: "ve-e94d04bee56f9b0b523094af"
schema_version: "1"
title: "F5 BIG-IP APM OAuth授权服务器存在零日漏洞，可无登录远程代码执行"
product: "F5 BIG-IP APM OAuth授权服务器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-94127"
referenced_identifiers: "CVE-2025-53521"
prerequisites: "同虚拟服务器APM策略+OAuth授权服务器；仅客户端/资源角色不受影响；未认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/F5%20BIG-IP/F5%20BIG-IP%20APM%20OAuth%E6%8E%88%E6%9D%83%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AD%98%E5%9C%A8%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E%EF%BC%8C%E5%8F%AF%E6%97%A0%E7%99%BB%E5%BD%95%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  F5 BIG-IP APM OAuth授权服务器存在零日漏洞，可无登录远程代码执行  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：F5 BIG-IP APM OAuth授权服务器
- 本文讨论：CVE-2026-94127
- 版本、权限与配置前提：同虚拟服务器APM策略+OAuth授权服务器；仅客户端/资源角色不受影响；未认证
- 资料类型：事件通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 受影响/热补丁矩阵仅图片，文本不可索引
- 来源只名称，无F5/CISA/CERT-EU直链
- 明确数据面配置条件和补丁不清除入侵，应保留

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 2026-09-23范围更正、具体版本/IOC阈值待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 看雪学苑   2026-09-23 09:59  
  
F5官方披露BIG-IP Access Policy Manager（APM）存在一处高危零日漏洞（CVE-2026-94127），**该漏洞已经观测到在野攻击利用。攻击者无需登录认证，即可在满足特定OAuth配置条件下，对目标BIG-IP设备实现远程代码执行（RCE）。**  
  
  
美国CISA已将该漏洞加入KEV已知被利用漏洞目录，并要求联邦民用机构在9月25日前完成缓解处置。  
  
  
  
漏洞详情  
  
  
  
该漏洞属于堆缓冲区溢出漏洞，CVSS v3.1评分9.8分，CVSS v4.0评分9.3分，风险等级为严重。  
  
  
漏洞触发有严格前置条件：同一虚拟服务器上同时部署APM访问策略与OAuth授权服务器配置，APM作为OAuth授权服务器对外发放访问令牌。  
  
不受影响场景：APM仅作为OAuth客户端、资源服务器，不存在OAuth授权服务器配置，则不受该漏洞影响。  
  
  
攻击者向该虚拟服务器发送特制恶意流量，即可触发漏洞执行任意代码。仅限制BIG-IP管理界面访问无法防护该漏洞，设备硬件形态（Appliance模式）同样会受到影响。  
  
补充说明：F5在9月23日更新CVE记录，明确限定漏洞仅存在于OAuth授权服务器角色。此前CISA、CERT-EU发布的预警描述范围更广，存在信息偏差，排查请以F5最新官方说明为准。  
  
  
  
受影响版本与修复热补丁  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Cpo2XCpI7K1ORQRERwZnoUpnP9ZPJNyd0Gcxc8gHfxKXztCCSPCKItB3MmPUuju2v0SZjvpu9SnVogPQeVSza5HQp44d9CDyqm6fV3dZe8o/640?wx_fmt=png&from=appmsg "")  
  
已经修复过往CVE-2025-53521的系统，依然需要安装本次新hotfix。  
  
  
已停止技术支持的旧版本F5设备，官方未做评估，安全性未知，不代表安全。  
  
  
  
应急处置方案  
  
  
  
1. 优先方案：安装上表对应分支的官方Engineering Hotfix热补丁。  
  
2. 临时缓解：无法立刻部署补丁时，可向F5技术支持提交工单获取iRule临时防护规则，先做防护，保留取证时间。  
  
  
CISA建议：先部署iRule防护，同时开展取证研判，后续尽快安装官方补丁。CERT-EU建议先留存取证数据，再执行补丁更新，并排查入侵痕迹，一旦发现失陷迹象，立即启动应急响应。  
  
  
  
入侵痕迹排查方法  
  
  
  
F5给出可用于自查的可疑指标**，同时出现下述多类日志特征，建议人工深度核查：**  
  
1. APM日志（`/var/log/apm`）：短时间内同一IP大量UserInfo请求失败，报错`The access token is invalid`，单次IP请求≥10次需要重点关注。  
  
2. OAuth状态统计：执行`tmctl global_oauth_stat -s total_requests,total_userinfo_requests,total_failed`，观察`total_failed`失败计数异常上涨。  
  
3. 审计日志：在OAuth报错的相近时间点，审计日志`/var/log/audit`出现异常可疑命令。  
  
4. TMM核心转储文件：单独出现不代表入侵，但伴随上述日志时，需要深入调查；漏洞攻击会造成TMM进程卡死循环，SOD守护进程抛出SIGABRT终止信号。  
  
重要提醒：安装hotfix补丁**无法清除攻击者已经获取的设备权限，**  
若确认设备已遭入侵，必须完整开展应急响应。  
  
  
资讯来源：The Hacker News、F5官方安全公告、CISA KEV、CERT-EU安全预警  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Cpo2XCpI7K1LajIfpic7FHZmADuUcQnjnbs7YdakwiaLEyVkenqCLY6sic92IXoA4skE5j9RnzxicUb1acJXq1shXPibKAicKnbCte55j9pOWpQ9c/640?wx_fmt=jpeg&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Cpo2XCpI7K2dIbfG9qupEmM0bjaehjd6icuJ8MPWvtwTN73PAjpyHmiaX5gVDqqovN9nGdIBwX4icFvO8NNOp9CtnibPOQLoWvLygwuibDcIyI10/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Cpo2XCpI7K0LsoTiacYHSFPQibryBXJuAjZPNUdQgUeP4O8p783AOiaCLUnfh3fKGF3rY866uJKI8fcUAOLTKgy7jKY2jaiaPvJicFickwUIntzLE/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Cpo2XCpI7K1owiceT0ia8Kv98cSLmw2A9Bza11E65PJpd1pKI57LhibqAibvKiaDtNTZsRxBazQiakcxtuGm10LibJnHPWkbuichbJQ4GLXlk3OHvzQ/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
