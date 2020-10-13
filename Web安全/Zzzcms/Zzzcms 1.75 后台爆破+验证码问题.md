Zzzcms 1.75 后台爆破+验证码问题
===============================

一、漏洞简介
------------

二、漏洞影响
------------

Zzzcms 1.75

三、复现过程
------------

### 后台寻找

后台寻找方法，该后台大部分admin+三位数字，所以可以采用爆破的方式获取后台地址
该后台地址为admin371

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台爆破+验证码问题/media/rId25.png)

### 验证码问题

-   （一）管理员登录面验证码登录

在 admin371/login.php
19行可以看出get\_cookie(\'adminname\')不为空就可以绕过，如何获得get\_cookie(\'adminname\')的值

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台爆破+验证码问题/media/rId27.png)

在24行可以看出如果存在密码的话会返回cookie中adminpass值，根据返回的adminpass的形式可以推断出adminname的值

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台爆破+验证码问题/media/rId28.png)

可以看到adminpass为zzz920\_adminpass，所以推断adminname为zzz920\_adminname

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台爆破+验证码问题/media/rId29.png)

可以看到已经在无验证码的情况下已经登录成功了

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台爆破+验证码问题/media/rId30.png)

-   （二）验证码不刷新不过期

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台爆破+验证码问题/media/rId31.png)

在inc/zzz\_main.php中582行可以看到从SESSION中取code的值，在inc/imgcode.php中只要不刷新就不会重新生成code，导致验证码不过期

image
