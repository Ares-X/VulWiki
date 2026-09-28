UsualToolcms 8.0 系统重装漏洞
=============================

一、漏洞简介
------------

无验证, 在安装cms完成后 并不会自动删除文件
又不会生成lock来判断是否安装过了。 导致了可以直接重装过 setup/index.php
安装地址

二、漏洞影响
------------

UsualToolCMS大众版5.0

UsualToolcms 8.0

三、复现过程
------------

    <?php
    $t=$_GET["t"];
    $l=$_GET["l"];
    $dbcontent=file_get_contents("../sql_db.php");
    if($t=="db"){
    $sqlcontent=$_POST["sqlcontent"];
    file_put_contents("../sql_db.php",$sqlcontent);
    echo "<script>alert('数据库设置成功!');window.location.href='?l=sql'</script>";
    }
    if($t=="testdb"){
    $dbhost=$_POST["dbhost"];
    $dbname=$_POST["dbname"];
    $dbuser=$_POST["dbuser"];
    $dbpass=$_POST["dbpass"];
    $mysqli=new mysqli($dbhost,$dbuser,$dbpass,$dbname);
    echo "<script>alert('测试完成!".$mysqli->connect_error."');window.location.href='?l=sqlback'</script>";
    }
    if($t=="sqlback"){
    include('../sql_db.php');
    $sqlcontent=$_POST['sqlcontent'];
    $res=$mysqli -> multi_query($sqlcontent);
    echo "<script>alert('数据库结构规划完成!');window.location.href='?l=setup'</script>";
    }
    if($t=="update"){
    include('../sql_db.php');
    $authcode=$_POST["authcode"];$webname=$_POST["webname"];
    $weblogo=$_POST["weblogo"];
    $weburl=$_POST["weburl"];
    $template=$_POST["template"];
    $webisclose=$_POST["webisclose"];
    $develop=$_POST["develop"];
    $articlelistnum=$_POST["articlelistnum"];
    $indexarticlenum=$_POST["indexarticlenum"];
    $indexarticlerenum=$_POST["indexarticlerenum"];
    $articlehitnum=$_POST["articlehitnum"];
    $goodslistnum=$_POST["goodslistnum"];
    $indexgoodsnum=$_POST["indexgoodsnum"];
    $indexgoodsrenum=$_POST["indexgoodsrenum"];
    $goodshitnum=$_POST["goodshitnum"];
    $article=$_POST["article"];
    $goods=$_POST["goods"];
    $messagebook=$_POST["messagebook"];
    $orders=$_POST["orders"];
    $members=$_POST["members"];
    $usercookname=$_POST["usercookname"];
    $sqls="INSERT INTO `cms_setup` (authcode,webname,weblogo,weburl,template,webisclose,develop,articlelistnum,indexarticlenum, indexarticlerenum,articlehitnum,goodslistnum,indexgoodsnum,indexgoodsrenum,goodshitnum,article,goods,messagebook,orders,members,usercookname,installtime) VALUES ('$authcode','$webname','$weblogo','$weburl','$template','$webisclose','$develop','$articlelistnum','$indexarticlenum','$indexarticlerenum','$articlehitnum','$goodslistnum','$indexgoodsnum','$indexgoodsrenum','$goodshitnum','$article','$goods','$messagebook','$orders','$members','$usercookname',now())";
    if ($mysqli->query($sqls) == TRUE) {
    echo "<script>alert('基础设置完成!');window.location.href='?l=welcome'</script>";
    }else{
    echo "<script>alert('未设置成功!请重填!');window.location.href='?l=setup'</script>";
    }
    }?>

UsualToolcsm需要先设置数据库账号密码才可以安装sql\_db.php文件。

这边是判断数据库连接是否成功，

如果成功执行下一步，

如果不成功反回未设置成功!请重填

p:437-438

成功安装以后反回一个默认账号密码

    echo"<li><span>后台默认账号: </span>usualtool</li>";
    echo"<li><span>后台默认密码: </span>123456</li>";

直接下一步就可以因为sql\_db.php是提前设置好账号密码的

<http://0-sec.org/UsualToolCMS/setup/>

image
