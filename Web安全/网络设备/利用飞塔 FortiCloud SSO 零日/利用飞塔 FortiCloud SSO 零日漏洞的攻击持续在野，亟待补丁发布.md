---
cve: "CVE-2026-24858"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  利用飞塔 FortiCloud SSO 零日漏洞的攻击持续在野，亟待补丁发布  
原创 Lawrence Abrams
                    Lawrence Abrams  暗镜   2026-01-28 00:29  
  
飞塔已确认存在一个新的、正在被积极利用的 FortiCloud 单点登录 (SSO) 身份验证绕过漏洞，编号为 CVE-2026-24858，并表示已通过阻止运行易受攻击固件版本的设备建立 FortiCloud SSO 连接来缓解零日攻击。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/mibm5daOCSt9S9F3EWmsZysfbCfyfpup5y6JPImHvHsUWrhoLQP2Z6Cwqzfw3m9PQicU7QjXQft8OpvU9T7S35jw/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞允许攻击者滥用 FortiCloud SSO 来获取对其他客户注册的 FortiOS、FortiManager 和 FortiAnalyzer 设备的管理权限，即使这些设备已针对先前披露的漏洞进行了完全修补。  
  
此前， Fortinet 客户于 1 月 21 日报告称其 FortiGate 防火墙遭到入侵，攻击者通过 FortiCloud SSO 在运行最新可用固件的设备上创建新的本地管理员帐户。随后，Fortinet 证实了这一消息。  
  
最初人们认为这些攻击是通过绕过CVE-2025-59718的补丁实现的，CVE-2025-59718 是一个之前被利用的严重 FortiCloud SSO 身份验证绕过漏洞，该漏洞已于 2025 年 12 月修复。  
  
Fortinet 管理员报告称，黑客使用电子邮件地址 cloud-init@mail.io 通过 FortiCloud SSO 登录到 FortiGate 设备，然后创建新的本地管理员帐户。  
  
受影响客户分享的日志显示了与 12 月份攻击期间观察到的类似迹象。  
  
1月22日，网络安全公司Arctic Wolf证实了这些攻击，并表示攻击似乎是自动化的，攻击者在几秒钟内就创建新的恶意管理员账户和启用VPN的账户，并窃取了防火墙配置。Arctic Wolf称，此次攻击与去年12月利用CVE-2025-59718漏洞发起的攻击类似。  
## Fortinet确认备用攻击路径  
  
1 月 23 日，Fortinet 证实，攻击者正在利用即使在完全打过补丁的系统中仍然存在的备用身份验证路径。  
  
Fortinet 首席信息安全官 Carl Windsor 表示，该公司观察到一些运行最新固件的设备遭到入侵，这表明一种新的攻击途径正在被利用。  
  
虽然 Fortinet 表示目前只在 FortiCloud SSO 中发现了这种利用漏洞的情况，但它警告说，该问题也适用于其他基于 SAML 的 SSO 实现。  
  
“值得注意的是，虽然目前只观察到 FortiCloud SSO 被利用，但这个问题适用于所有 SAML SSO 实现，” Fortinet 解释道。  
  
当时，Fortinet 建议客户限制对其设备的管理访问权限，并禁用 FortiCloud SSO 作为缓解措施。  
  
该公告指出，Fortinet 已采取措施缓解攻击，同时也在开发补丁程序。  
- **1月22**日，Fortinet停用了被攻击者滥用的FortiCloud帐户。  
- **1月26日**，Fortinet在全球范围内禁用了FortiCloud SSO，以防止进一步滥用。  
- **1 月 27 日**，FortiCloud SSO 访问已恢复，但受到限制，因此运行易受攻击固件的设备无法再通过 SSO 进行身份验证。  
Fortinet 表示，即使受影响的设备上仍然启用 FortiCloud SSO，此服务器端更改也能有效阻止利用，因此在补丁发布之前，客户端无需执行任何操作。  
  
1 月 27 日，Fortinet 还发布了一份正式的 PSIRT 公告，将该漏洞的编号为 CVE-2026-24858，并将其评为严重级别，CVSS 评分为 9.4。  
  
该漏洞为“使用备用路径或通道绕过身份验证”，是由 FortiCloud SSO 中访问控制不当引起的。  
  
根据该公告，如果启用了 FortiCloud 单点登录，拥有 FortiCloud 帐户和已注册设备的攻击者可以对其他客户的设备进行身份验证。  
  
虽然 FortiCloud SSO 默认情况下未启用，但 Fortinet 表示，当设备在 FortiCare 注册时，它将自动启用，除非之后手动禁用。  
  
Fortinet 证实，以下两个恶意 FortiCloud SSO 帐户已在实际环境中利用了该漏洞，这两个帐户已于 1 月 22 日被锁定。  
```
cloud-noc@mail.io
cloud-init@mail.io
```  
  
Fortinet表示，一旦设备遭到入侵，他们会下载客户配置文件并创建以下管理员帐户之一：  
```
audit
backup
itadmin
secadmin
support
backupadmin
deploy
remoteadmin
security
svcadmin
system
```  
  
检测到来自以下 IP 地址的连接：  
```
104.28.244.115
104.28.212.114
104.28.212.115
104.28.195.105
104.28.195.106
104.28.227.106
104.28.227.105
104.28.244.114

Additional IPs observed by a third party, not Fortinet:

37[.]1.209.19
217[.]119.139.50
```  
  
该公司表示，补丁程序仍在开发中，包括针对 FortiOS、FortiManager 和 FortiAnalyzer 的补丁。  
  
在此之前，FortiCloud SSO 会阻止来自易受攻击设备的登录，因此管理员无需禁用该功能即可防止漏洞利用。  
  
然而，Fortinet 表示，这可能会被滥用于其他 SAML SSO 实现，管理员可能需要暂时使用以下命令禁用 SSO 功能：  
```
config system global
    set admin-forticloud-sso-login disable
end
```  
  
Fortinet 还表示，他们仍在调查 FortiWeb 和 FortiSwitch Manager 是否受到该漏洞的影响。  
  
该公司警告称，如果客户在其日志中发现上述入侵迹象，则应将自己的设备视为已完全入侵。  
  
Fortinet 建议检查所有管理员帐户，从已知干净的备份中恢复配置，并轮换所有凭据。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
