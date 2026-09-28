---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CVSS10分！Pterodactyl Panel远程代码执行漏洞安全风险通告  
应急响应中心  亚信安全   2025-06-26 03:49  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iczzp36h0nbH0ZVtiaicJYib933Zj5hlKa5icoOicK5pd2s0xIfKC7KCjKl3qGtYYmZGFphxLtRZGABA1iamjpdNbLO4g/640?wx_fmt=jpeg "")  
  
  
近日，亚信安全CERT监控到安全社区研究人员发布安全通告，Pterodactyl Panel 存在一个远程代码执行漏洞，编号为 CVE-2025-49132。攻击者可通过对 /locales/locale.json 端点构造包含 locale 和 namespace 参数的恶意请求，在未经身份验证的情况下执行任意代码，进而完全控制面板服务器、读取凭据并窃取敏感数据。  
  
  
**目前官方已发布安全更新，亚信安全CERT建议受影响的客户尽快升级至最新版本。**  
  
  
Pterodactyl Panel 是一个开源的游戏服务器管理面板，采用 PHP + Laravel 构建，通过 Docker/Daemon 统一调度，支持 Minecraft、CS:GO、Rust 等多种游戏服务的快速部署、权限分级管理与资源配额分配。其 Web 界面直观，支持 API 自动化运维，可帮助运维人员便捷地在多节点环境中创建、监控和管理游戏服务器实例。  
  
  
**漏洞编号、类型、等级和评分**  
  
  
  
- CVE-2025-49132  
  
- 远程代码执行漏洞  
  
- 紧急  
  
- CVSS3.0： 10分  
  
  
  
  
**漏洞状态**  
  
  
  
<table><tbody><tr style="box-sizing: border-box;"><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="text-align: justify;padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="text-align: center;white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">细节</span></strong></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">PoC</span></strong></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">EXP</span></strong></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">在野利用</span></strong></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">复现情况</span></strong></p></section></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未公开</span></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">公开</span></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未公开</span></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未发现</span></p></section></section></td><td data-colwidth="20.0000%" width="20.0000%" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未复现</span></p></section></section></td></tr></tbody></table>  
  
  
**受影响版本**  
  
  
  
- Pterodactyl Panel <1.11.11  
  
  
  
  
产品解决方案  
  
  
  
目前亚信安全怒狮引擎已第一时间新增了检测规则，支持CVE-2025-49132漏洞的检测，请及时更新TDA产品的特征库到最新版本。规则编号：106066804，规则名称：翼龙面板远程代码执行漏洞(CVE-2025-49132)。  
  
  
更新方式如下：  
  
  
TDA产品在线更新方法：登录系统-》系统管理-》系统升级-》特征码更新；  
  
TDA产品离线升级PTN包下载链接如下：  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iczzp36h0nbH0ZVtiaicJYib933Zj5hlKa5iciao0kZHv19ribjyMguVE1eX9ydjxtjbYSCCNjwUftxpJYclBicUKzaaqA/640?wx_fmt=png "")  
  
详细下载地址请后台咨询  
  
  
**修复建议**  
  
  
  
目前厂商已发布升级补丁以修复漏洞，补丁获取链接：  
  
  
https://github.com/pterodactyl/panel/releases/tag/v1.11.11  
  
  
**参考链接**  
  
  
  
- https://github.com/pterodactyl/panel/releases/tag/v1.11.11  
  
- https://github.com/advisories/GHSA-24wv-6c99-f843  
  
- https://vulners.com/cve/CVE-2025-49132  
  
  
  
  
本文发布的补丁下载链接均源自各原厂官方网站。尽管我们努力确保官方资源的安全性，但在互联网环境中，文件下载仍存在潜在风险。为保障您的设备安全与数据隐私，敬请您在点击下载前谨慎核实其安全性和可信度。  
  
  
  
  
了解亚信安全，请点击  
**“阅读原文”**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
