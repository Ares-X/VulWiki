---

source: "wy876 漏洞文库"
---

# Zyxel NBG2105身份验证绕过

# 一、漏洞简介
在Zyxel NBG2105 V1.00（AAGU.2）C0设备上，将登录cookie设置为1可提供管理员访问权限。

# 二、影响版本
+ Zyxel NBG2105

# 三、资产测绘
+ fofa`app="ZyXEL-NBG2105"`
+ 特征


# 四、漏洞复现
直接访问如下poc即可绕过身份验证进入后台

```plain
/login_ok.htm
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ofagy15qnxr8eg9f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
