---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-paybill-sqi.yaml"
title: "用友时空KSOA PayBill XML name SQL 注入"
product: "用友时空KSOA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "范围未知"
prerequisites: "未说明具体鉴权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E7%94%A8%E5%8F%8B%20%E6%97%B6%E7%A9%BAKSOA%20PayBill%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-时空KSOA\""
category_recommendation: "ERP / 用友 KSOA"
id: "vw-1012683bc5b4b588fa0642f4"
entity_id: "ve-1012683bc5b4b588fa0642f4"
schema_version: "1"
---

# 用友时空KSOA PayBill XML name SQL 注入

## 条目说明

- 对象与具体问题：用友时空KSOA；PayBill XML name SQLi
- 版本、配置及部署条件：范围未知
- 认证与权限前提：未说明具体鉴权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错时空智友目录需迁用友，端点不是同产品关联
- 固定源及r0/r1/r2对照、r3未定义randstr、verified false说明完整
- 单片段不能等可运行模板，文已披露；修复版本仍缺

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友时空 KSOA 的 `/servlet/PayBill` 接口存在 SQL 注入风险。公开 afrog 模板把延时表达式放在 XML 的第二个 `name` 元素中，第四个元素用于响应标记校验。SQL 注入可能影响数据库信息的保密性与完整性；公开检测请求本身不证明系统命令执行权限。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
POST /servlet/PayBill?caculate&_rnd= HTTP/1.1
Host: example.invalid
Content-Type: application/xml

<?xml version="1.0" encoding="UTF-8" ?><root><name>1</name><name>1'WAITFOR DELAY'0:0:5';--+</name><name>1</name><name>600123</name></root>
```

上例对应原始模板 r1，将随机响应标记固定为 `600123` 便于阅读。r0 使用普通值建立基线；r1、r2 分别使用 5 秒、3 秒延时并检查相同标记。模板标注 `verified: false`，且 r3 使用了未定义的 `randstr`，不能把整份模板当作已验证可运行结果。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

### 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-paybill-sqi.yaml)

### 网络测绘

```text
app="用友-时空KSOA"
```
