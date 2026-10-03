---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-downloadcourseware-lfi.yaml"
title: "宏景HCM/eHR DownLoadCourseware编码url读取"
product: "宏景HCM/eHR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "oauthservlet路径绕过样式，真实鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%AE%8F%E6%99%AF/%E5%AE%8F%E6%99%AFHCM%20DownLoadCourseware%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"HJSOFT-HCM\""
id: "vw-310b1b711c66708aad20abb1"
entity_id: "ve-310b1b711c66708aad20abb1"
schema_version: "1"
source_url: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-downloadcourseware-lfi.yaml"
---

# 宏景HCM/eHR DownLoadCourseware编码url读取

## 条目说明

- 对象与具体问题：宏景HCM/eHR；DownLoadCourseware编码url读取
- 版本、配置及部署条件：未知
- 认证与权限前提：oauthservlet路径绕过样式，真实鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确未证/etc/passwd明文有效，防止错误泛化
- 需要解释编码路由规范化和Windows标记条件，固定模板不是服务器验证
- 修复build缺失

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

公开检测模板记录宏景 HCM 的 `DownLoadCourseware` 接口文件读取问题。检测请求通过 `url` 参数传入编码路径，原先把该参数直接设为 `/etc/passwd` 的写法没有对应来源。

### 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="HJSOFT-HCM"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/DownLoadCourseware?url=VHmj0PAATTP2HJBPAATTPcyRcHb6hPAATTP2HJFPAATTP59XObqwUZaPAATTP2HJBPAATTP6EvXjT HTTP/1.1
```

### 判定与证据边界

上游要求 HTTP 200，且正文包含 `for 16-bit app support`。核对真实文件内容与错误页的差异；不能由此推断 `/etc/passwd` 明文路径有效。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

### 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-downloadcourseware-lfi.yaml)
