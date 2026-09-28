Apache SSI 远程命令执行漏洞
===========================

一、漏洞简介
------------

在测试任意文件上传漏洞的时候，目标服务端可能不允许上传php后缀的文件。如果目标服务器开启了SSI与CGI支持，我们可以上传一个shtml文件，并利用\`\`语法执行任意命令。

二、漏洞影响
------------

三、复现过程
------------

正常上传PHP文件是不允许的，我们可以上传一个shell.shtml文件：

    <!--#exec cmd="ls" -->

![](./.resource/ApacheSSI远程命令执行漏洞/media/rId24.png)

成功上传，然后访问shell.shtml，可见命令已成功执行：

![](./.resource/ApacheSSI远程命令执行漏洞/media/rId25.png)

参考链接
--------

> https://vulhub.org/\#/environments/httpd/ssi-rce/
