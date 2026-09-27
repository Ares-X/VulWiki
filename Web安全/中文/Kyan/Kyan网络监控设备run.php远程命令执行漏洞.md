---
fofa: "app.name=="
source: "wy876 漏洞文库"
---

# Kyan 网络监控设备 run.php 远程命令执行漏洞

# 一、漏洞简介
Kyan 网络监控设备 run.php可在身份验证的情况下执行任意命令, 配合账号密码泄露漏洞，存在远程命令执行漏洞，可以获取服务器权限。

# 二、影响版本
+ Kyan 网络监控设备

# 三、资产测绘
+ hunter`app.name=="Kyan 网络监控设备"`
+ 特征


# 四、漏洞复现
1. 通过Kyan 网络监控设备密码泄露漏洞登录系统后台

```plain
/hosts
```


2. 访问`run.php`,即可执行命令

```plain
/run.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/un5hy49hzv7rnell>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
