---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/jinhe/jinhe-oa-c6-upload-lfi.yaml"
title: "金和C6 UploadFileDownLoadnew FilePath读取"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20UploadFileDownLoadnew%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-1488ae28a8986ff241031d86"
entity_id: "ve-1488ae28a8986ff241031d86"
schema_version: "1"
source_url: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/jinhe/jinhe-oa-c6-upload-lfi.yaml"
---

# 金和C6 UploadFileDownLoadnew FilePath读取

## 条目说明

- 对象与具体问题：金和C6；UploadFileDownLoadnew FilePath读取
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 固定官方Nuclei来源及三个配置标记明确
- 同OpenFile下载链不是同端点，应独立
- 单配置成功不证明全路径可读，文已区分；缺build/权限根因

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

Nuclei 官方模板记录金和 OA C6 的 `UploadFileDownLoadnew.aspx` 文件读取问题，以 `FilePath` 请求站点中的 `JHFileConfig.ini`。

### 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /c6/JHSoft.Web.CustomQuery/UploadFileDownLoadnew.aspx/?FilePath=../Resource/JHFileConfig.ini HTTP/1.1
```

### 判定与证据边界

上游要求 HTTP 200，并同时匹配 `MaxFolderTotal=1`、`[JHFile]`、`FolderTotal=1`。应确认返回的确是配置文件内容；不从这一固定样例推断所有服务器路径均可读。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

### 参考来源

- [公开检测模板](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/jinhe/jinhe-oa-c6-upload-lfi.yaml)
