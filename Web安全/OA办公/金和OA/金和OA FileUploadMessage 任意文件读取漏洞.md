---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-c6-fileuploadmessage-fileread.yaml"
title: "金和C6 FileUploadMessage filename读取"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "无业务Cookie但未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20FileUploadMessage%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-e2c049501fe0530cc06ee9cb"
entity_id: "ve-e2c049501fe0530cc06ee9cb"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-c6-fileuploadmessage-fileread.yaml"
---

# 金和C6 FileUploadMessage filename读取

## 条目说明

- 对象与具体问题：金和C6；FileUploadMessage filename读取
- 版本、配置及部署条件：未知
- 认证与权限前提：无业务Cookie但未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定afrog提交与凭据标签判据清楚，不泛化所有文件
- 请求行缺Host但可标片段；尚无代码根因/build
- 敏感配置验证需隔离测试

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

afrog 公开模板记录金和 OA C6 的 `FileUploadMessage.aspx` 文件读取问题，`filename` 指向站点内的数据库连接配置文件。

### 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /C6/JHSoft.WCF/FunctionNew/FileUploadMessage.aspx?filename=../../../C6/JhSoft.Web.Dossier.JG/JhSoft.Web.Dossier.JG/XMLFile/OracleDbConn.xml HTTP/1.1
```

### 判定与证据边界

上游同时要求 HTTP 200、`<DbLoginName>` 和 `<DbLoginPass>`。应确认这些标签属于返回的配置文件，而非错误提示或普通页面；本文不推断所有路径均可读取。证据中的真实凭据应遮蔽。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

### 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-c6-fileuploadmessage-fileread.yaml)
