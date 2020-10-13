XDCMS 1.0 sql注入漏洞（一）
===========================

一、漏洞简介
------------

二、漏洞影响
------------

XDCMS 1.0

三、复现过程
------------

注入存在于用户登录页面：`/index.php?m=member&f=login`

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(一)/media/rId24.jpg)

漏洞文件:`/modules/member/index.php`，`lines:112`

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(一)/media/rId25.jpg)

    login_save()`在用户登录界面时调用，URL:`/index.php?m=member&f=login

参数m与f的包含方式为:`/ modules/$m/$c.php`

> index.php -\> system/common.inc.php -\> fun.inc.php -\>
> global.inc.php\[接受m、f参数的值\] -\> 包含modules/\$m/\$c.php

\$username值使用了`safe_html()`进行过滤，且过滤字符均可使用大小写绕过

htmlspecialchars()未设置第二个参数，导致仅对双引号"进行转义，单引号'不会被转义掉，因而存在注入

> 第二个参数详解：
>
> ENT\_COMPAT（默认值）：只转换双引号。
>
> ENT\_QUOTES：两种引号都转换。
>
> ENT\_NOQUOTES：两种引号都不转换。

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(一)/media/rId26.jpg)

但此处注入由于过滤了`.`，无法通过information\_schema来获取表名，需去猜测，较为鸡肋

![](/Users/aresx/Documents/VulWiki/.resource/XDCMS1.0sql注入漏洞(一)/media/rId27.jpg)
