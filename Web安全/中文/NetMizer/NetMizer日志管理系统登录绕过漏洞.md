---
source: "wy876 漏洞文库"
---

# NetMizer 日志管理系统登录绕过漏洞

### 一、漏洞描述
NetMizer 日志管理系统存在登录绕过漏洞，通过限制某个请求包的发送获取后台权限

### 二、影响版本
<font style="color:#000000;">NetMizer</font>

### 三、资产测绘
```plain
title="NetMizer 日志管理系统"
```


### 四、漏洞复现
访问页面 main.html 并抓取请求包

```plain
/main.html
```

, Drop掉下面对请求包


直接进入后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hgzz1oo7add2wvv4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
