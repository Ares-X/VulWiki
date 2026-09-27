---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Apache Linkis多个安全漏洞   
安识科技  SecPulse安全脉搏   2023-04-12 13:48  
  
1. **通告信息**  
  
  
  
近日，安识科技  
A-  
Team团队监测到Apache官方发布安全公告，修复了Linkis中的多个安全漏洞，这些漏洞可能导致文件上传、身份验证绕过和远程代码执行。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
漏洞名称：  
Apache Linkis publicsercice模块文件上传漏洞  
  
CVE编号：  
CVE-2023-27602  
  
简述：  
PublicService模块上传文件时，对上传文件的路径以及文件类型缺乏限制，可能导致任意文件上传。  
  
漏洞名称：  
Apache Linkis Mangaer模块Zip Slip漏洞  
  
CVE编号：  
CVE-2023-27603  
  
简述：  
Manager 模块 engineConn 材料上传没有检查 zip 路径，可能导致Zip Slip 漏洞，造成RCE。  
  
漏洞名称：  
Apache Linkis Gateway模块身份验证绕过漏洞  
  
CVE编号：  
CVE-2023-27987  
  
简述：  
由于  
Linkis Gateway部署生成的默认token过于简单，使得很容易获取默认token进行攻击，成功利用该漏洞可能导致身份验证绕过。可升级到Apache Linkis >= 1.3.2，并修改默认token值。  
  
漏洞名称：  
Apache Linkis JDBC EngineConn反序列化漏洞  
  
CVE编号：  
CVE-2023-29215  
  
简述：  
由于缺乏对参数的有效过滤，在  
JDBC EengineConn模块中配置恶意Mysql JDBC参数会触发反序列化漏洞，最终导致远程代码执行。  
  
漏洞名称：  
Apache Linkis DatasourceManager模块反序列化漏洞  
  
CVE编号：  
CVE-2023-29216  
  
简述：  
由于没有对参数进行有效过滤，可使用  
MySQL数据源和恶意参数配置新的数据源以触发反序列化漏洞，最终导致远程代码执行。  
##   
  
3. **漏洞危害**  
  
  
  
这些漏洞可能导致文件上传、身份验证绕过和远程代码执行。  
##   
  
4. **影响版本**  
  
  
  
Apache Linkis版本：<=1.3.1  
##   
  
5. **解决方案**  
  
  
  
目前该漏洞已经修复，受影响用户可升级到以下版本：  
  
Apache Linkis版本：>=1.3.2  
  
下载链接：  
https://github.com/apache/linkis/releases  
##   
  
6. **时间轴**  
  
  
  
【  
-】2023年04月10日 安识科技A-Team团队监测到漏洞公布信息  
  
【  
-】2023年04月11日 安识科技A-Team团队根据漏洞信息分析  
  
【  
-】2023年04月12日 安识科技A-Team团队发布安全通告  
  
  
         
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
