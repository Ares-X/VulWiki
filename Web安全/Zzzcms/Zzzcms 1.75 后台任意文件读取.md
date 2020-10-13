Zzzcms 1.75 后台任意文件读取
============================

一、漏洞简介
------------

-   管理员权限

-   后台管理目录

-   后台数据库为mysql

二、漏洞影响
------------

Zzzcms 1.75

三、复现过程
------------

### 任意文件读取（一）

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId25.png)

首先来看防护规则，不允许出现./

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId26.png)

看 safe\_path 只能是upload template runtime路径下的

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId27.png)

所以构造/runtime/..\\config/zzz\_config.php 即可绕过防护

### 任意文件读取（二）

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId29.png)

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId30.png)

首先来看restore函数，mysql数据库，发现path是可控的，看955行，跟进到load\_file函数

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId31.png)

在zzz\_file.php文件中，如果存在该path,则通过file\_get\_contents读取

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId32.png)

然后现在的想法是如何输入出来，跟进到db\_exec()函数

在zzz\_db.php中，看str\_log把sql语句写入到了log中

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId33.png)

在zzz.file.php中，跟进到str\_log文件，看到文件的命名规则，

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId34.png)

文件命名规则为当天时间的时间戳+数据库用户+数据库密码，并且是未授权访问

![](/Users/aresx/Documents/VulWiki/.resource/Zzzcms1.75后台任意文件读取/media/rId35.shtml)
