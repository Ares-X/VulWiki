---
cve: "CVE-2025-25014"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【风险通告】Elastic Kibana存在原型污染致任意代码执行漏洞（CVE-2025-25014）   
安恒研究院  安恒信息CERT   2025-05-07 09:45  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/JAzzLj4nXevmL5H6C1I6nWLYOHeic25ZZq3Sju5Xs1LnOckux8PBqG1qYrBly0Nicx4verjADnLorl5g1ImeuTeg/640?wx_fmt=jpeg&from=appmsg&wx_&wx_ "")  
  
<table><tbody><tr style="-webkit-tap-highlight-color:transparent;"><td colspan="4" data-colwidth="100.0000%" width="100.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;background-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;color:rgb(255, 255, 255);box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:center;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">漏洞概述</span></strong></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">漏洞名称</span></strong></p></section></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;"><span leaf="">Elastic Kibana存在原型污染致任意代码执行漏洞（CVE-2025-25014）</span></span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">安恒CERT评级</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;word-break:break-all;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">1级</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CVSS3.1评分</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">9.1</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CVE编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><p style="-webkit-tap-highlight-color:transparent;"><span style="-webkit-tap-highlight-color:transparent;font-size:14px;letter-spacing:0.544px;line-height:22.4px;"><span leaf="">CVE-2025-25014</span></span></p><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CNVD编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未分配</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CNNVD编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未分配</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">安恒CERT编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;"><span leaf="">DM-202502-000009</span></span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">POC情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未发现</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">EXP情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未发现</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">在野利用</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未发现</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">研究情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">分析中</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">危害描述</span></strong></p></section></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section><p><span style="font-size:14px;letter-spacing:0.544px;"><span leaf="">攻击者可以利用Kibana中的原型污染漏洞通过针对机器学习和 reporting endpoints构造恶意的HTTP请求，导致任意代码执行。</span></span></p><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section></section></td></tr></tbody></table>  
  
该产  
品主要使用客户行业分布广泛，漏洞危害性高，  
建议客户尽快做好自查及防护。  
  
  
  
**漏洞信息**  
  
  
  
  
Elastic Kibana是Elastic Stack（包括Elasticsearch、Logstash和Kibana）中的关键组件，主要用于数据可视化和实时数据分析。  
  
  
**漏洞描述**  
  
**漏洞危害等级：**  
严重  
  
**漏洞类型：**  
远程代码执行  
  
  
**影响范围**  
  
**影响版本：**  
8.3.0 <= Kibana <= 8.17.5  
  
Kibana 8.18.0  
  
Kibana 9.0.0  
  
**安全版本：**  
Kibana 8.17.6  
  
Kibana 8.18.1  
  
Kibana 9.0.1  
  
  
**CVSS向量**  
  
访问途径（AV）：网络  
  
攻击复杂度（AC）：低  
  
所需权限（PR）：高  
  
用户交互（UI）：无  
  
影响范围 （S）：改变  
  
机密性影响 （C）：高  
  
完整性影响 （l）：高  
  
可用性影响 （A）：高  
  
  
  
**修复方案**  
  
  
  
  
**官方修复方案：**  
  
官方已发布修复方案，受影响的用户建议及时更新至安全版本。  
  
https://github.com/elastic/kibana/releases  
  
**临时修复方案：**  
  
若用户无法即刻升级至安全版本，可在Kibana的配置中进行如下设置：  
  
禁用机器学习：可以通过在kibana.yml文件中添加 xpack.ml.enabled: false 来禁用机器学习功能； self-hosted用户可以通过在kibana.yml文件中添加 xpack.ml.ad.enabled: false 来仅禁用异常检测功能。  
  
禁用Reporting功能：对于 self-hosted和Elastic Cloud部署，可以通过在kibana.yml文件中添加 xpack.reporting.enabled: false 来禁用Reporting功能。  
  
  
**参考资料**  
  
  
  
  
  
[1]  
https://discuss.elastic.co/t/kibana-8-17-6-8-18-1-or-9-0-1-security-update-esa-2025-07/377868  
  
  
  
**技术支持**  
  
  
  
  
如有漏洞相关需求支持请联系400-6059-110获取相关能力支撑。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
