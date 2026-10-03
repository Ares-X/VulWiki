---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-uploadfileblock-fileupload.yaml"
title: "金和JC6 UploadFileBlock上传"
product: "金和JC6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20UploadFileBlock%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-7c4b52ec54a22a2fbef64a86"
entity_id: "ve-7c4b52ec54a22a2fbef64a86"
schema_version: "1"
source_url: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-uploadfileblock-fileupload.yaml"
---

# 金和JC6 UploadFileBlock上传

## 条目说明

- 对象与具体问题：金和JC6；UploadFileBlock上传
- 版本、配置及部署条件：未知
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正确说明纯文本jsp回读只证明落地不证明JSP执行
- 入口不是完整multipart，文已清楚标界限；完整固定源可追溯
- 需上传预期权限/类型策略、清理与版本补充，不泛化目录穿越

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

afrog 公开模板记录金和 OA JC6 的 `UploadFileBlock` 上传问题。模板向 `filename` 表单项提交随机文件名和随机纯文本，随后回读对应路径，验证文件是否落地。公开模板没有使用原新增文中的多级目录穿越路径。

### 影响版本与前提

金和 OA JC6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下仅为上传入口与编码类型；随机边界、文件名和请求体由来源模板给出，不是可单独发送的验证报文。

```http
POST /jc6/JHSoft.WCF/Attachment/UploadFileBlock HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary{{rboundary}}
```

### 判定与证据边界

完整 multipart 数据及变量见来源。第一步要求 HTTP 200 且包含 `fileObj`、`realUrl`；第二步 GET `/jc6/upload/` 下本次随机文件名，要求 HTTP 200 且包含相同随机文本。模板虽使用 `.jsp` 后缀，文件内容仍是纯文本；回读成功只能证明文件写入和可访问，不能证明 JSP 执行或取得服务器权限。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。校验上传权限、文件类型与保存路径，将上传目录与脚本执行目录分离。

### 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-uploadfileblock-fileupload.yaml)
