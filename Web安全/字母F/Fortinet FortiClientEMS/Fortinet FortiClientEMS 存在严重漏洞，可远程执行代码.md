---
cve: "CVE-2026-21643"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Fortinet FortiClientEMS 存在严重漏洞，可远程执行代码  
原创 ZM
                    ZM  暗镜   2026-02-10 01:01  
  
Fortinet 发布紧急公告，以解决 FortiClientEMS 的一个严重漏洞，该漏洞编号为 CVE-2026-21643（CVSS 评分为 9.1）。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zdwoicOrrJb1gD7weZOj9Tp5ibib5JyaehN8wiaBOFTECZVqafKp2y1ZXctXPicO9Ne8bicJfcpnX4mibqIiarQrdMMpFPBtNlnCeChfibhfast0Ww8c/640?wx_fmt=png&from=appmsg "")  
  
  
该漏洞是 FortiClientEMS 中 SQL 命令（“SQL 注入”）问题的特殊元素未得到妥善处理。未经身份验证的攻击者可以通过精心构造的 HTTP 请求触发此漏洞，执行未经授权的代码或命令。  
  
该安全公告指出：“FortiClientEMS 中 SQL 命令（‘SQL 注入’）漏洞 [CWE-89] 中使用的特殊元素处理不当，可能允许未经身份验证的攻击者通过精心构造的 HTTP 请求执行未经授权的代码或命令。”  
  
一次成功的攻击可能会让攻击者在目标网络中获得初步立足点，从而实现横向移动或恶意软件部署。  
  
该漏洞是由 Fortinet 产品安全团队的 Gwendal Guégniaud 在内部发现并报告的。  
  
受影响的版本如下：  
  
<table><thead><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><th style="box-sizing: border-box;margin: 0px;padding: 0.5em;text-align: -webkit-match-parent;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">版本</span></font></font></th><th style="box-sizing: border-box;margin: 0px;padding: 0.5em;text-align: -webkit-match-parent;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">做作的</span></font></font></th><th style="box-sizing: border-box;margin: 0px;padding: 0.5em;text-align: -webkit-match-parent;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">解决方案</span></font></font></th></tr></thead><tbody><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">FortiClientEMS 8.0</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">未受影响</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">不适用</span></font></font></td></tr><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">FortiClientEMS 7.4</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">7.4.4</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">升级到 7.4.5 或更高版本</span></font></font></td></tr><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;font: inherit;vertical-align: baseline;"><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">FortiClientEMS 7.2</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">未受影响</span></font></font></td><td style="box-sizing: border-box;margin: 0px;padding: 0.5em;border: 1px solid;font: inherit;vertical-align: baseline;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;margin: 0px;padding: 0px;vertical-align: inherit;"><span leaf="">不适用</span></font></font></td></tr></tbody></table>  
该公司并未透露该漏洞目前是否已被实际利用。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
