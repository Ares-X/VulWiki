---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-fe-templateoftaohong-manager-path-traversal.yaml"
title: "用友FE协作办公 templateOfTaohong目录遍历列举"
product: "用友FE协作办公"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "管理接口鉴权未核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BFE/%E7%94%A8%E5%8F%8B%20FE%20templateOfTaohong_manager.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
fofa: "\"FE协作\""
fofa_previous_unverified: "\"FE协作\""
id: "vw-802e8f635eefba3b5b25c258"
entity_id: "ve-802e8f635eefba3b5b25c258"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-fe-templateoftaohong-manager-path-traversal.yaml"
fofa_review_note: "同篇原文完整表达式；仅确认出处与基本语法，不证明资产受影响。"
---

# 用友FE协作办公 templateOfTaohong目录遍历列举

## 条目说明

- 对象与具体问题：用友FE协作办公；templateOfTaohong目录遍历列举
- 版本、配置及部署条件：未知
- 认证与权限前提：管理接口鉴权未核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 应OA类别，文已谨慎区分目录列举与文件内容读取
- 固定模板匹配boot.ini与配置段标记需核实际响应形态
- 缺版本/最低权限/服务端根因，但来源和静态边界清楚

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

用友 FE 协作办公平台的 `templateOfTaohong_manager.jsp` 接口接受 `path` 参数。公开 PoC 使用上级目录序列检查目录列举，可能暴露目录结构和文件名；该验证不能单独证明任意文件内容读取。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
GET /system/mediafile/templateOfTaohong_manager.jsp?path=/../../../ HTTP/1.1
Host: example.invalid
```

原始模板同时匹配 200 状态码和 `boot.ini`、`[FE_MESSAGE_PUSH]`、`[OA]`。应确认响应实际列出预期目录外的目录项，排除登录页、错误页和静态文本匹配。本文仅核对公开源码，未进行本地复现。

### 修复建议

向用友获取适用安全更新。将可访问目录限制在固定根目录内，对规范化后的路径进行边界检查，并限制该管理接口访问权限。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-fe-templateoftaohong-manager-path-traversal.yaml)

### 网络测绘

```text
"FE协作"
```
