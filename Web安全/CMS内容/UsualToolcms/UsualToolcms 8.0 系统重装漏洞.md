---
source: "hatch 补库批 20260928"
product: "UsualToolCMS大众5.0/8.0"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 系统重装漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：setup残留可达，无lock/鉴权，sql_db.php预配置连接可用或可改写"
side_effects: "未执行；本文需注意的操作影响：源码t=db直接写用户sqlcontent到PHP配置可能独立任意代码写入，但全文只称重装，应候选拆分不直接认定"
source_status: "unknown"
id: "vw-63067883bf8fc336c6d58c52"
entity_id: "ve-63067883bf8fc336c6d58c52"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：setup残留可达，无lock/鉴权，sql_db.php预配置连接可用或可改写

- **凭据与会话边界（1）**：标题8.0与正文额外5.0无独立证据；先需DB凭据又说可用已有配置跳过应明确两场景。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **适用与权限边界（2）**：源码t=db直接写用户sqlcontent到PHP配置可能独立任意代码写入，但全文只称重装，应候选拆分不直接认定。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：t=sqlback可multi_query有破坏数据风险，默认usualtool/123456是安装产物不是所有运行实例默认密码。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（4）**：p437-438行引用缺上下文，末image占位/无完整请求和来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 系统重装漏洞

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
