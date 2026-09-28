UsualToolcms 8.0 前台sql
========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 漏洞分析

search.php

    $key=UsualToolCMS::sqlcheck($_GET["key"]);
    $navname="search";
    require_once(dirname(__FILE__).'/'.'mytop.php');
    //搜索记录
    if(!empty($key)):
    $asql="SELECT * FROM `cms_search` WHERE keyword ='$key'";
    $adata=mysqli_query($mysqli,$asql);
    if(mysqli_num_rows($adata)>0):
    $mysqli->query("UPDATE `cms_search` SET `hit`=hit+1 WHERE keyword ='$key' and lang='$language'");
    else:
    $mysqli->query("INSERT INTO `cms_search` (`lang`,`keyword`) VALUES ('$language','$key')");

\$key被sqlcheck函数过滤了，让我们看下这个函数

    function sqlchecks($StrPost){
    $StrPost=str_replace("'","’",$StrPost);
    $StrPost=str_replace('"','“',$StrPost);
    $StrPost=str_replace("(","（",$StrPost);
    $StrPost=str_replace(")","）",$StrPost);
    $StrPost=str_replace("@","#",$StrPost);
    $StrPost=str_replace("/*","",$StrPost);
    $StrPost=str_replace("*/","",$StrPost);
    return $StrPost;
    }

如果没有Url编码的话这里应该是不存在漏洞的了，仔细看上面的代码，数据库操作中还有一个\$language,我们追踪下\$language吧

全局查找，直接找到其定义的地方

conn.php

    if(!empty($_COOKIE['UTCMSLanguage'])):$language=$_COOKIE['UTCMSLanguage'];else:$language=$indexlanguage;endif;

\$language没有经过任何过滤就从Cookie传了进来

这就简单咯

### 复现

image
