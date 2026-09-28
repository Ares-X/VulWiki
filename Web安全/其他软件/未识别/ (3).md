---
cve: "CVE-2025-25257"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】Fortinet FortiWeb存在SQL注入漏洞（CVE-2025-25257）  
安恒研究院  安恒信息CERT   2025-07-15 11:20  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/JAzzLj4nXevmL5H6C1I6nWLYOHeic25ZZq3Sju5Xs1LnOckux8PBqG1qYrBly0Nicx4verjADnLorl5g1ImeuTeg/640?wx_fmt=jpeg&from=appmsg&wx_&wx_ "")  
  
<table><tbody><tr style="-webkit-tap-highlight-color:transparent;"><td colspan="4" data-colwidth="100.0000%" width="100.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;background-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;color:rgb(255, 255, 255);box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:center;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">漏洞概述</span></strong></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">漏洞名称</span></strong></p></section></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;"><span leaf="">Fortinet FortiWeb存在SQL注入漏洞（CVE-2025-25257）</span></span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">安恒CERT评级</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;word-break:break-all;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">1级</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CVSS3.1评分</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">9.8</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CVE编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><p><span style="font-size:14px;letter-spacing:0.544px;"><span leaf="">CVE-2025-25257</span></span></p><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CNVD编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未分配</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CNNVD编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;font-size:14px;">未分配</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">安恒CERT编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;font-size:14px;"><span leaf="">DM-202502-000429</span></span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">POC情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">已发现</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">EXP情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">已发现</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">在野利用</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未发现</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">研究情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">已复现</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">危害描述</span></strong></p></section></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section><p><span style="font-size:14px;letter-spacing:0.544px;"><span leaf="">在受影响的版本中，未经身份验证的攻击者可以通过精心设计的HTTP/S请求执行未经授权的SQL命令，对机密性、完整性和可用性造成重大影响。</span></span></p><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section></section></td></tr></tbody></table>  
  
该产品主要使用客户行业分布广泛，漏洞危害性高，建议客户尽快做好自查及防护。  
  
**安恒研究院卫兵实验室已复现此漏洞。**  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JAzzLj4nXetUIhMDy6mWIvk53Wk8uQdMKrlGnRxCpmdbHppVjJbmsDibnNTGib0yVTe4CsOmib3T6nTXKQPI4Y6ng/640?wx_fmt=png&from=appmsg "")  
  
  
  
**漏洞信息**  
  
  
  
  
Fortinet FortiWeb是Fortinet的Web应用程序防火墙，属于Fortinet安全产品线中的  
重要组成部分  
。  
  
  
**漏洞描述**  
  
**漏洞危害等级：**  
严重  
  
**漏洞类型：**  
SQL注入  
  
  
**影响范围**  
  
**影响版本：**  
  
7.0.0 <= FortiWeb <= 7.0.10  
  
7.2.0 <= FortiWeb <= 7.2.10  
  
7.4.0 <= FortiWeb <= 7.4.7  
  
7.6.0 <= FortiWeb <= 7.6.3  
  
**安全版本：**  
  
FortiWeb 7.0.* >= 7.0.11  
  
FortiWeb 7.2.* >= 7.2.11  
  
FortiWeb 7.4.* >= 7.4.8  
  
FortiWeb 7.6.* >= 7.6.4  
  
  
**CVSS向量**  
  
访问途径（AV）：网络  
  
攻击复杂度（AC）：低  
  
所需权限（PR）：无  
  
用户交互（UI）：无  
  
影响范围 （S）：不变  
  
机密性影响 （C）：高  
  
完整性影响 （l）：高  
  
可用性影响 （A）：高  
  
  
  
**修复方案**  
  
  
  
  
**官方修复方案：**  
  
官方已发布修复方案，受影响的用户建议及时升级至对应安全版本。  
  
  
**参考资料**  
  
  
  
  
  
https://fortiguard.fortinet.com/psirt/FG-IR-25-151  
  
  
  
**技术支持**  
  
  
  
  
如有漏洞相关需求支持请联系400-6059-110获取相关能力支撑。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
