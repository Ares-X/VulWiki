Phpyun v5.0.1 后台getshell
==========================

一、漏洞简介
------------

二、漏洞影响
------------

Phpyun v5.0.1

三、复现过程
------------

安装好本地环境,看了下系统功能,等等测试,最后查看前台index.php源码。

![](/Users/aresx/Documents/VulWiki/.resource/Phpyunv5.0.1后台getshell/media/rId24.png)

后台直接写入被过滤掉了。

![](/Users/aresx/Documents/VulWiki/.resource/Phpyunv5.0.1后台getshell/media/rId25.png)

又去翻了下后台功能,发下有个生成功能,并且没有后缀限制。

![](/Users/aresx/Documents/VulWiki/.resource/Phpyunv5.0.1后台getshell/media/rId26.png)

生存成功,但是发现()被大写,使用经典的include包含,随意找了一个模板下的info.txt文件,写入执行代码。

    <?php include'app/template/info.txt';？>

![](/Users/aresx/Documents/VulWiki/.resource/Phpyunv5.0.1后台getshell/media/rId27.png)

成功执行代码 代码分析：

![](/Users/aresx/Documents/VulWiki/.resource/Phpyunv5.0.1后台getshell/media/rId28.png)

对post的数据没有任何验证,直接代入

![](/Users/aresx/Documents/VulWiki/.resource/Phpyunv5.0.1后台getshell/media/rId29.png)

参考链接
--------

> <https://www.t00ls.net/thread-55040-1-1.html>
