---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-nccloud-uploadchunk-fileupload.yaml"
title: "用友NCCloud uploadChunk fileGuid路径写入"
product: "用友NCCloud"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "accessTokenNcc条件"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8B%20NC-Cloud%20uploadChunk%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-NC-Cloud\""
id: "vw-076e849956dfa11a755e5849"
entity_id: "ve-076e849956dfa11a755e5849"
schema_version: "1"
---

# 用友NCCloud uploadChunk fileGuid路径写入

## 条目说明

- 对象与具体问题：用友NCCloud；uploadChunk fileGuid路径写入
- 版本、配置及部署条件：未知
- 认证与权限前提：accessTokenNcc条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定来源/令牌遗漏纠正/纯文本jsp不证执行的边界清楚
- 完整multipart留源已说明，仍需令牌适用性/版本/修复/清理

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

用友 NC-Cloud 的 `/ncchr/pm/fb/attachment/uploadChunk` 分片上传接口存在路径约束不足的风险。公开 PoC 通过 `fileGuid` 的上级目录序列，将带 JSP 扩展名的纯文本标记写到 `/nccloud/`，再读取标记确认落地。该验证证明可写入并访问文件，不单独证明 JSP 代码已被执行。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

完整 multipart 请求见文末固定提交的 YAML。原始请求除 `fileGuid`、`chunk`、`chunks` 外，还带有 `accessTokenNcc` 请求头；原条目遗漏了该必要来源条件。模板使用随机文件名和纯文本内容，随后访问 `/nccloud/<模板生成的文件名>.jsp`。

必须核对第二次 GET 的响应包含本次生成的相同标记，不能仅按上传返回 200 判断成功。该 PoC 包含特定令牌条件，其适用性需要结合实际部署核实，本文不宣称无需任何凭证即可上传。本文只核对公开源码，未上传文件或进行本地复现。

### 修复建议

向用友获取适用修复。对规范化后的 fileGuid 路径实施根目录边界检查，验证访问令牌，并限制上传类型及存储目录的脚本执行能力。

### 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-nccloud-uploadchunk-fileupload.yaml)

### 网络测绘

```text
app="用友-NC-Cloud"
```
