---
source: "gelusus/wxvl 公众号漏洞文库"
product: "GitLab2FA bypass/DoS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-0723; CVE-2025-13927; CVE-2025-13928; CVE-2025-13335; CVE-2026-1102"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "GitLab警告：存在高危双因素认证绕过和拒绝服务漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Fix18.8.2/18.7.2/18.6.4; no affectedranges; Jan29,2026"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d2f57dc242cf14eaa057d699"
entity_id: "ve-d2f57dc242cf14eaa057d699"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Fix18.8.2/18.7.2/18.6.4; no affectedranges; Jan29,2026

代码与实验材料：No PoC; forgeddeviceresponse concept

来源证据范围：BleepingComputer named only

- **凭据与会话边界（1）**：TargetaccountID conflated withcredentialID withinsamearticle; patch/dateconsistency needsprimaryvalidation。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **证据待核（2）**：Exposurefingerprints6000/45000 are not confirmedvulnerableassets; no sourceURL。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  GitLab警告：存在高危双因素认证绕过和拒绝服务漏洞  
Rhinoer
                    Rhinoer  犀牛安全   2026-01-29 16:00  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qvpgicaewUBlibkAjaR8rHFBibnQTUkSKXUbGz8frQyAkpassLFUubiaggfGr0aGHPMdUeVpHsPbaBx6Q8tvyokGIQ/640?wx_fmt=png&from=appmsg "")  
  
GitLab 已修复了一个影响其软件开发平台社区版和企业版的高危双因素身份验证绕过漏洞。  
  
该漏洞编号为CVE-2026-0723，源于 GitLab 身份验证服务中未经检查的返回值弱点，攻击者如果知道目标帐户 ID，就可以绕过双因素身份验证。  
  
该公司解释说：  
GitLab 已经修复了一个问题，该问题可能允许知晓受害者凭证 ID 的个人通过提交伪造的设备响应来绕过双因素身份验证。  
  
GitLab 还修复了影响 GitLab CE/EE 的两个高危漏洞，这两个漏洞可能使未经身份验证的威胁行为者能够通过发送带有格式错误的身份验证数据的精心构造的请求（CVE-2025-13927）和利用 API 端点中不正确的授权验证（CVE-2025-13928）来触发拒绝服务 (DoS) 情况。  
  
此外，它还修复了两个中等严重程度的DoS漏洞，这些漏洞可以通过配置绕过循环检测的畸形Wiki文档（CVE-2025-13335）和发送重复的畸形SSH身份验证请求（CVE-2026-1102）来利用。  
  
为了解决这些安全漏洞，该公司发布了 GitLab 社区版 (CE) 和企业版 (EE) 的 18.8.2、18.7.2 和 18.6.4 版本，并建议管理员尽快升级到最新版本。  
  
GitLab补充道：“这些版本包含重要的漏洞和安全修复，我们强烈建议所有自行管理的GitLab安装立即升级到这些版本之一。GitLab.com已经运行了已打补丁的版本。GitLab Dedicated客户无需采取任何行动。”  
  
互联网安全监管机构 Shadowserver目前正在追踪近 6,000 个暴露在网络上的 GitLab CE 实例，而 Shodan 则发现了超过 45,000 个带有 GitLab 指纹的设备。  
  
2025 年 6 月，GitLab 还修复了高危账户接管和缺少身份验证的安全问题，敦促客户立即升级他们的安装。  
  
GitLab 表示，其 DevSecOps 平台拥有超过 3000 万注册用户，并被超过 50% 的财富 100 强公司使用，其中包括英伟达、空客、T-Mobile、洛克希德·马丁、高盛和瑞银集团。  
  
  
信息来源：BleepingComputer  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
