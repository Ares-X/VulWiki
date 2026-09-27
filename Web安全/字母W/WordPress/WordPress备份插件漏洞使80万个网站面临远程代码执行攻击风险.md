---
cve: "CVE-2026-1357"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  WordPress备份插件漏洞使80万个网站面临远程代码执行攻击风险  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-13 01:02  
  
流行的 WPvivid Backup & Migration 插件存在一个严重漏洞，导致超过 80 万个 WordPress 网站面临通过远程代码执行 (RCE) 攻击完全控制的风险。  
  
该漏洞编号为 CVE-2026-1357，CVSS 评分为 9.8，未经身份验证的攻击者可以将任意文件上传到易受攻击的网站并执行恶意 PHP 代码。  
  
该问题影响 WPvivid Backup 版本 0.9.123 及更早版本，源于插件 RSA 解密过程中的错误处理不当以及缺少文件路径清理。  
  
当插件尝试解密会话密钥失败时，它不会停止执行，而是将 false 值传递给 AES 密码初始化例程。  
  
加密库将此错误值解释为空字节字符串，使攻击者能够使用可预测的空字节密钥加密有效载荷。  
  
同时，从加密有效载荷中提取的文件名没有经过适当的清理，使得目录遍历能够逃逸备份目录并将文件写入公共可访问的位置。  
  
感谢 Lucas Montes (NiRoX) 发现了这个漏洞，并通过 Wordfence 漏洞赏金计划 负责任地报告了该漏洞。  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">场地</font></font></strong></th><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">细节</font></font></strong></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVSS 评分</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">9.8（严重）</font></font></td></tr><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-ID</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-2026-1357</font></font></td></tr><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">受影响版本</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">&lt;= 0.9.123</font></font></td></tr><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">已打补丁版本</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">0.9.124</font></font></td></tr><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">赏金</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">2145.00美元</font></font></td></tr></tbody></table>  
通过滥用 wpvivid_action=send_to_site 参数，未经身份验证的攻击者可以上传任意 PHP 文件，然后直接在浏览器中调用它们，从而导致远程代码执行，并可能导致整个网站被攻陷。  
## WordPress备份插件漏洞  
  
任意文件上传漏洞通常被利用来部署 webshell、植入后门或安装其他恶意软件。  
  
该插件使用设置中生成的密钥对 $key 值进行 RSA 解密。如果值不正确， $key 则此值为 false。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/BicXBAdicJy7O10NHKe8Rxm3YQ1sIic0FDKAcTib68seR80UkIqq3aW5D7dI1jusNRjtrdrU2vvS6MqjSRcXLEOdfIGQ5tKzicgVVOAsicC3eVx44/640?wx_fmt=jpeg "")  
  
然而，对于明确启用了允许其他网站使用生成的密钥发送备份功能的网站所有者来说，这种风险最为严重。该功能默认情况下处于禁用状态，密钥的有效期最长为 24 小时。  
  
研究人员因这项发现获得了 2145 美元的奖励，这凸显了激励计划在加强WordPress 插件安全性方面日益重要的作用。  
  
Wordfence 于 2026 年 1 月 22 日发布了一项防火墙规则，适用于其高级版、关怀版和响应版客户，并计划于 2026 年 2 月 21 日向免费用户提供保护。  
  
$key 供应商通过在 函数中添加对值的空值检查来修复此问题 decrypt_message() 。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/BicXBAdicJy7OIvBef9iahicDk6ryNb05X1UAjAqBHUpOibzDbRFMCCPicqxdwIOd1T7Gh0k8kccb7XPxYFX54hYV5nXo7kWbOCFW7l9Idg4ibmRps/640?wx_fmt=jpeg "")  
  
在 1 月 22 日接到联系后，WPvivid 开发团队于第二天做出回应，并于 2026 年 1 月 28 日发布了完全修复的版本 0.9.124。  
  
该修复程序增加了一项检查，以确保解密失败时立即停止处理，并引入了严格的文件扩展名验证，以便只接受合法的备份格式。  
  
强烈建议所有使用 WPvivid Backup 的 WordPress 网站所有者尽快更新到 0.9.124 或更高版本，以降低这种严重的远程代码执行风险。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
