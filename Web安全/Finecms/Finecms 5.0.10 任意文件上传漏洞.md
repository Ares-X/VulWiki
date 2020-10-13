Finecms 5.0.10 任意文件上传漏洞
===============================

一、漏洞简介
------------

二、漏洞影响
------------

Finecms 5.0.10

三、复现过程
------------

用十六进制编辑器写一个有一句话的图片
去网站注册一个账号，然后到上传头像的地方。 抓包，把jepg的改成php发包。

![](/Users/aresx/Documents/VulWiki/.resource/Finecms5.0.10任意文件上传漏洞/media/rId24.png)

可以看到文件已经上传到到`/uploadfile/member/用户ID/0x0.php`

![](/Users/aresx/Documents/VulWiki/.resource/Finecms5.0.10任意文件上传漏洞/media/rId25.png)
