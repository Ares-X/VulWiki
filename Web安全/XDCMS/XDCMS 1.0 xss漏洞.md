XDCMS 1.0 xss漏洞
=================

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

漏洞文件：`system\modules\xdcms\template.php`，URL：`index.php?m=xdcms&c=template&f=edit&file=footer.html`

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0xss漏洞/media/rId24.jpg)

插入xss平台代码

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0xss漏洞/media/rId25.jpg)

成功接受到信息

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0xss漏洞/media/rId26.jpg)
