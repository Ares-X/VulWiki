---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】泛微 E-cology9 SQL注入漏洞  
 天黑说嘿话   2025-07-10 00:51  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/5nNKGRl7pFgbJxnOxcKdRicA5Vlgv8VdjNEa8tGFyzVgC6Q6dlYR7JSnqNf6hodTZqXAibl0ZqFHlNgZKH8hT2jQ/640?wx_fmt=gif&from=appmsg "")  
  
  
<table><tbody><tr style="box-sizing: border-box;"><td colspan="4" data-colwidth="100.0000%" width="100.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;background-color: rgb(100, 130, 228);box-sizing: border-box;padding: 0px;"><section style="text-align: center;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">漏洞概述</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞名称</span></strong></p></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">泛微 E-cology SQL注入漏洞</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞编号</span></strong></p></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">LDYVUL-2025-00079715</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">公开时间</span></strong></p></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">2025-6-16</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">漏洞类型</span></strong></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">SQL注入</span></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">POC状态</span></strong></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未公开</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="color: rgb(0, 0, 0);box-sizing: border-box;"><span leaf="">利用可能性</span></span></strong></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">高</span></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="color: rgb(0, 0, 0);box-sizing: border-box;"><span leaf="">EXP状态</span></span></strong></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未公开</span></p></section></td></tr><tr style="box-sizing: border-box;"><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">在野利用状态</span></strong></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未发现</span></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;color: rgb(0, 0, 0);padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;"><span leaf="">技术细节状态</span></strong></p></section></td><td data-colwidth="25.0000%" width="25.0000%" style="border-width: 1px;border-color: rgb(100, 130, 228);border-style: solid;box-sizing: border-box;padding: 0px;"><section style="font-size: 12px;padding: 0px 8px;box-sizing: border-box;"><p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">未公开</span></p></section></td></tr></tbody></table>  
  
  
**01**  
  
影响组件  
  
  
  
泛微 E-cology 系统是一款企业级协同管理平台，通过整合信息门户、知识文档、工作流程、人力资源、客户关系、项目管理、财务及资产等核心模块，实现对企业内外部资源的一体化管理。  
  
  
**02**  
  
**漏洞描述**  
  
  
  
近日，泛微 E-cology 发布新补丁，补丁修复了 E-cology 9 中的一处**未授权SQL注入**  
漏洞，该漏洞源于 /js/hrm/getdata.jsp 接口对用户输入参数未进行充分过滤，攻击者可利用该漏洞向数据库中注入任意 SQL 命令，成功的利用该漏洞可**获取系统敏感信息**  
，当数据库为 SQL Server 时可能进一步利用获取目标系统的**代码执行**  
权限。  
  
  
**03**  
  
**漏洞复现******  
  
  
  
360漏洞研究院已复现泛微E-cology9 SQL注入漏洞，通过延时注入的方式（延时10秒）进行了验证。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/5nNKGRl7pFiaBUcHssqY7I58EDJ9Y5iaLQMQJT9ibMvzcDYRUpInLXeBcNZxx5GibdLibTIicOyFGtYb0CiciauAPn1ibug/640?wx_fmt=png&from=appmsg "")  
  
  
**04**  
  
**漏洞影响范围******  
  
  
  
泛微 E-cology 9 < 10.75  
  
  
**05**  
  
**修复建议******  
  
  
  
**正式防护方案**  
  
官方已发布新版本中修复上述漏洞，受影响用户请尽快升级到安全版本：  
  
泛微 E-cology 9 >= 10.75  
  
下载链接：  
  
https://www.weaver.com.cn/cs/securityDownload.html  
  
安装前，请确保备份所有关键数据，并按照官方指南进行操作。安装后，进行全面测试以验证漏洞已被彻底修复，并确保系统其他功能正常运行。  
  
  
**临时防护方案**  
  
1. 在不影响业务的情况下，建议考虑在防护设备中针对以下路径添加漏洞利用关键字拦截规则。 漏洞利用路径: "/js/hrm/getdata.jsp"。  
  
2. 尽量不要将该服务器暴露在公网，或通过防火墙规则限制能够访问该服务器的IP地址为可信IP。  
  
  
**06**  
  
**时间线**  
  
  
  
2025年6月16日：官方发布补丁  
  
2025年6月18日：360漏洞研究院发布安全风险通告  
  
  
**07**  
  
参考链接  
  
  
  
https://www.weaver.com.cn/cs/securityDownload.html  
  
  
**08**  
  
更多漏洞情报  
  
  
  
建议您订阅360数字安全-漏洞情报服务，获取更多漏洞情报详情以及处置建议，让您的企业远离漏洞威胁。  
  
  
邮箱：360VRI@360.cn  
  
网址：https://vi.loudongyun.360.net  
  
  
  
“洞”悉网络威胁，守护数字安全  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/5nNKGRl7pFgbJxnOxcKdRicA5Vlgv8Vdj79uMHokrh6ZZDyK49UF68xwvH2ttJ0eicYjADfDN3rsicht6B4toKg7w/640?wx_fmt=gif&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
