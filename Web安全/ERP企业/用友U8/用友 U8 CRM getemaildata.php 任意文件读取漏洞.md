---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-crm-getemaildata-fileread.yaml"
title: "用友U8 CRM getemaildata filePath文件读取"
product: "用友U8 CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本明确未知；Windows与进程读权限"
prerequisites: "DontCheckLogin=1"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8B%20U8%20CRM%20getemaildata.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"用友U8CRM\""
id: "vw-6897b74964dcf8850af6e299"
entity_id: "ve-6897b74964dcf8850af6e299"
schema_version: "1"
---

# 用友U8 CRM getemaildata filePath文件读取

## 条目说明

- 对象与具体问题：用友U8 CRM；getemaildata filePath文件读取
- 版本、配置及部署条件：版本明确未知；Windows与进程读权限
- 认证与权限前提：DontCheckLogin=1
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文已纠正上游描述误写上传
- 固定提交和200加文件标记判据清晰；仍缺厂商受影响/固定版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友 U8 CRM 的 `/ajax/getemaildata.php` 接口接受 `filePath` 文件路径。公开读取 PoC 同时设置 `DontCheckLogin=1` 并请求 Windows 的 `win.ini`，用于检查接口是否把服务器文件内容返回给请求方。文件可读范围受进程权限与操作系统影响。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /ajax/getemaildata.php?DontCheckLogin=1&filePath=c:/windows/win.ini HTTP/1.1
Host: example.invalid
```

原始规则匹配 200 状态码及 `bit app support`。核对应确认响应包含该文件的实际内容，排除错误页、请求反射或固定文本。模板描述误写为文件上传，本条目按实际 GET 请求与规则归为文件读取。本文仅核对公开源码，未进行本地复现。

### 修复建议

向用友获取适用修复。在服务端统一校验身份与访问权限，避免通过客户端参数关闭登录检查；对可读取文件使用严格允许列表及路径边界检查。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-crm-getemaildata-fileread.yaml)

### 网络测绘

```text
body="用友U8CRM"
```
