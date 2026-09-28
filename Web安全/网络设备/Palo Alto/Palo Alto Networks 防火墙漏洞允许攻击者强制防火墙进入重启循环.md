---
cve: "CVE-2026-0229"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Palo Alto Networks 防火墙漏洞允许攻击者强制防火墙进入重启循环  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-13 02:01  
  
Palo Alto Networks 的 PAN-OS 软件中存在一个严重的拒绝服务 (DoS) 漏洞，未经身份验证的攻击者可以使防火墙陷入无休止的重启循环，从而可能瘫痪企业网络。  
  
该漏洞编号为 CVE-2026-0229，存在于高级 DNS 安全 (ADNS) 功能中。攻击者可以发送恶意构造的数据包来触发系统重启。  
  
反复的攻击会迫使防火墙进入维护模式，停止流量检查，并使组织面临服务中断的风险。云端下一代防火墙 (NGFW) 和 Prisma Access 不受影响。  
  
Palo Alto Networks 在一份安全公告中详细介绍了该问题，并确认当启用 ADNS 并同时启用间谍软件配置文件以阻止、拦截或发出警报流量时，该问题仅影响特定的 PAN-OS 版本。  
## 受影响版本及修复方案  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">产品</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">受影响版本</font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">修复版本</font></font></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 12.1</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">&lt; 12.1.4（特别是 12.1.2–12.1.3）</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">≥ 12.1.4</font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 11.2</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">&lt; 11.2.10 (11.2.0–11.2.9)</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">≥ 11.2.10</font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 11.1</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">PAN-OS 10.2</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all<br/></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">云下一代防火墙</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">Prisma Access</font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">None</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">all</td></tr></tbody></table>  
该公司敦促管理员立即升级存在漏洞的系统。较旧且不受支持的 PAN-OS 版本应迁移到已修复的版本。目前没有变通方法，而且由于漏洞的设计原因，威胁防御签名也无法检测到利用该漏洞的情况。  
  
Palo Alto Networks 报告称，目前尚未发现任何利用此漏洞的案例。尽管如此，安全专家仍警告称，在高流量环境中存在风险。“此类 DoS 漏洞可能会引发严重的连锁反应，尤其是在与其他攻击叠加的情况下。依赖 Palo Alto Networks 进行边界防御的组织必须优先考虑漏洞修补。”  
  
启用 ADNS 的防火墙是抵御基于 DNS 威胁的关键防线，因此，对于拦截恶意域名的企业而言，这种风险尤其令人担忧。管理员应通过 Palo Alto Networks 的支持门户验证配置并扫描未打补丁的系统。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
