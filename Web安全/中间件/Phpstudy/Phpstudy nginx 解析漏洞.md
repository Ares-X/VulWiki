Phpstudy nginx 解析漏洞
=======================

一、漏洞简介
------------

phpStudy 存在 nginx
解析漏洞，攻击者能够利用上传功能，将包含恶意代码的合法文件类型上传至服务器，从而造成任意代码执行的影响。

该漏洞仅存在于phpStudy Windows版，Linux版不受影响。

二、漏洞影响
------------

phpstudy: \<=8.1.0.7

三、复现过程
------------

![1.jpeg](./.resource/Phpstudynginx解析漏洞/media/rId24.jpg)
