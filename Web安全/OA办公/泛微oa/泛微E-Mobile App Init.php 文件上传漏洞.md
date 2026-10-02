---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_mobileAppinit.php%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.yaml"
title: "泛微OA E-Mobile邮件模块（具体宿主待核） App/Init.php邮件附件路径写入"
product: "泛微OA E-Mobile邮件模块（具体宿主待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "精确产品/版本/补丁未知；模块路径与权限依赖"
prerequisites: "公开模板无凭证，需部署核对"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Mobile%20App%20Init.php%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-EMobile\""
id: "vw-9acf733aaacaf7bf6c89961d"
entity_id: "ve-9acf733aaacaf7bf6c89961d"
schema_version: "1"
source_url: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_mobileAppinit.php%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.yaml"
---

# 泛微OA E-Mobile邮件模块（具体宿主待核） App/Init.php邮件附件路径写入

## 条目说明

- 对象与具体问题：泛微OA E-Mobile邮件模块（具体宿主待核）；App/Init.php邮件附件路径写入
- 版本、配置及部署条件：精确产品/版本/补丁未知；模块路径与权限依赖
- 认证与权限前提：公开模板无凭证，需部署核对
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 不隐瞒E-Cology/E-Mobile源混写，只保留可识别模块
- 明确GET Init大小写和完整外部请求依赖，不把回读片段当完整PoC
- 常量计算结果、清理、自我删除与代码执行判断边界说明充分；仍需官方产品确认

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开模板记录 `/E-mobile/App/Init.php` 的邮件附件入口接收 `upload_file` 与 `file_name`，并通过带相对路径的文件名将内容保存至可访问目录。风险涉及附件内容与保存路径控制。

### 影响范围与前提

产品与组件：泛微 OA 的 E-Mobile 邮件模块；精确产品版本及修复范围未知。来源标题与产品描述存在 E-Cology/E-Mobile 混写，本文只保留可定位的模块入口。公开模板未带凭证；认证与文件写入权限需要按部署核对。

### 公开验证资料

完整两步请求见固定版本 YAML。第一步实际是 GET `/E-mobile/App/Init.php`（`Init` 首字母大写），包含 `m=createDo_Email`、Base64 编码的 `upload_file` 和 `file_name`；原稿中的 multipart POST 没有来源支持。

第二步读取源 PoC 写入的文件：

```http
GET /attachment/testa123.php HTTP/1.1
Host: oa.example.com
```

此片段单独执行不能验证上传。源 PoC 写入的 PHP 只计算 `md5(233)` 并尝试删除自身，预期输出为 `e165421110ba03099a1c0393373c5b43`；完整编码内容、提交参数和顺序均见来源。回读到本次预期计算结果才支持代码被处理的结论；仅上传响应或文件名不足以确认。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_mobileAppinit.php%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
