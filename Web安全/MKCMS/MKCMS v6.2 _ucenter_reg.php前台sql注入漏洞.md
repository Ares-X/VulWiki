MKCMS v6.2 /ucenter/reg.php前台sql注入漏洞
==========================================

一、漏洞简介
------------

二、漏洞影响
------------

MKCMS v6.2

三、复现过程
------------

`/ucenter/reg.php`的`name`参数，存在注入

    /ucenter/reg.php
    <?php 
    ...
    if(isset($_POST['submit'])){
    $username = stripslashes(trim($_POST['name']));
    // 检测用户名是否存在
    $query = mysql_query("select u_id from mkcms_user where u_name='$username'");
      ...

参考链接
--------

> https://xz.aliyun.com/t/7580\#toc-4
