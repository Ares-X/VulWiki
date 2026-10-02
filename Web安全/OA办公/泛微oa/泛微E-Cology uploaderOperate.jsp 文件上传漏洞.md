---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/weaveroa/ecology/weaver_ec_UploaderOperate_upload.java"
title: "泛微e-cology uploaderOperate.jsp附件+OfficeServer文件写入链"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "精确版本未知；附件写入、OfficeServer INSERTIMAGE、最终可访问路径"
prerequisites: "公开实现无cookie，实际认证需核"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20uploaderOperate.jsp%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-4956d423fefcf80863fbd989"
entity_id: "ve-4956d423fefcf80863fbd989"
schema_version: "1"
source_url: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/weaveroa/ecology/weaver_ec_UploaderOperate_upload.java"
---

# 泛微e-cology uploaderOperate.jsp附件+OfficeServer文件写入链

## 条目说明

- 对象与具体问题：泛微e-cology；uploaderOperate.jsp附件+OfficeServer文件写入链
- 版本、配置及部署条件：精确版本未知；附件写入、OfficeServer INSERTIMAGE、最终可访问路径
- 认证与权限前提：公开实现无cookie，实际认证需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 纠正E-Office误归类，明确两接口动态fileid链及片段不是完整验证
- 明确上游拼错Fdiledata/无效JSP，采用固定commit的文本验证流程
- 本条应标chain/reference-backed且保留外部依赖；没有文本回读即RCE的扩大

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的计划附件上传入口存在公开记录的文件上传链路。历史公开源码先向 `uploaderOperate.jsp` 提交附件，再取返回的文件标识交给 `/OfficeServer` 的图片插入流程，并访问生成的文件。完整链路涉及两个接口，不能用单次附件上传响应代替验证。

### 影响范围与前提

产品按公开 Java 实现归属为 E-Cology；原候选和部分聚合 YAML 将其误标为 E-Office。精确受影响版本与补丁范围未知。接口可达、附件写入权限、OfficeServer 功能及最终文件访问是该链路的前提；公开代码不携带 Cookie，但实际认证条件仍需核对。

### 公开验证资料

完整实现见固定提交中的 `target_url` 和 `att` 方法。上游的纯文本验证内容是 `Hello R4g`，其流程为：

1. 向 `/workrelate/plan/util/uploaderOperate.jsp` 提交 multipart，字段包括 `secId`、`Filedata`、`plandetailid`，从下载链接提取 `fileid`。
2. 将该标识交给 `/OfficeServer` 的 `INSERTIMAGE` 流程处理。
3. 请求源代码记录的生成文件路径，核对实际保存的文本。

下面只列入口请求头，完整动态参数传递及请求体见公开源码；此片段本身不能验证上传：

```http
POST /workrelate/plan/util/uploaderOperate.jsp HTTP/1.1
Host: oa.example.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarymVk33liI64J7GQaK
```

源码的判断较宽松，部分分支仅检查状态码和内容前缀。确认应排除同名旧文件，证明返回的文件标识属于本次上传，再核对最终路径中的完整文本并清理产物。文本回读不自动证明 JSP 执行。聚合 YAML 中的 `Fdiledata`、无效 JSP 指令以及单请求模式不作为本条依据。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/weaveroa/ecology/weaver_ec_UploaderOperate_upload.java)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/E-Office-uploaderOperate-upload.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
