# Nacos存在serviceSync未授权访问漏洞

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。Nacos存在serviceSync未授权访问漏洞</font>

# <font style="color:rgb(63, 63, 63);">二、影响版本</font>
+ <font style="color:rgb(63, 63, 63);">Nacos</font>

# <font style="color:rgb(63, 63, 63);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ fofa`app="NACOS"`
+ 特征


# 四、漏洞复现
```plain
/nacos/#/serviceSync
```


```plain
/v1/task/list?pageSize=10&pageNum=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yx9zlsgguyq1p5v5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
