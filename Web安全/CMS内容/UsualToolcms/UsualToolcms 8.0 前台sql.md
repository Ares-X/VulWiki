---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0 search"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 前台sql"
prerequisites: "来源所述条件，未列明部分仍待核：UTCMSLanguage Cookie直接进入搜索记录SQL；search key有效"
side_effects: "未执行；本文需注意的操作影响：INSERT/UPDATE搜索统计有数据修改副作用，Cookie注入与前台无需登录需验证"
source_status: "unknown"
id: "vw-40c7d3e325bff78160b258c5"
entity_id: "ve-40c7d3e325bff78160b258c5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：UTCMSLanguage Cookie直接进入搜索记录SQL；search key有效

- **证据待核（1）**：源码清楚language未过滤，但复现仅image占位无payload/响应/来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：sqlcheck调用与展示sqlchecks函数不是同一名，需补外层函数，不能仅此断言key无洞。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：INSERT/UPDATE搜索统计有数据修改副作用，Cookie注入与前台无需登录需验证。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 前台sql

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
