---
source: "https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wo2.go"
title: "泛微e-office do_excel.php固定路径内容写入"
product: "泛微e-office"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；固定excel.php路径，可能覆盖既有文件"
prerequisites: "未明确认证"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Office%20do_excel.php%20%E5%8F%AF%E6%8E%A7%E5%86%85%E5%AE%B9%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-EOffice\""
id: "vw-ee6cae072c4c9163be1e327f"
entity_id: "ve-ee6cae072c4c9163be1e327f"
schema_version: "1"
---

# 泛微e-office do_excel.php固定路径内容写入

## 条目说明

- 对象与具体问题：泛微e-office；do_excel.php固定路径内容写入
- 版本、配置及部署条件：版本未知；固定excel.php路径，可能覆盖既有文件
- 认证与权限前提：未明确认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 精准限定可控内容而非任意路径，明确覆盖副作用和PHP解析前提
- 纯文本两步验证且test过于通用的误报已提示
- 需补权限边界和厂商修复，当前证据不宜提升为已验证RCE

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Office 的费用导出接口 `/general/charge/charge_list/do_excel.php` 接收 `html` 表单字段。公开扫描代码随后从同目录的 `excel.php` 读到该内容，用于验证可控内容被写入固定文件。

### 影响范围与前提

产品：泛微 E-Office；受影响版本与补丁范围未知。该验证使用固定输出文件，可能覆盖已有内容，只适用于允许写入且已确认文件用途的隔离环境。是否可执行 PHP 还取决于服务端解析配置。

### 公开验证资料

公开 `Wo02scancore` 中已有完整的纯文本验证流程：

```http
POST /general/charge/charge_list/do_excel.php HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded

html=test
```

```http
GET /general/charge/charge_list/excel.php HTTP/1.1
Host: oa.example.com
```

应比较写入前后的内容，确认 `test` 来自此次表单且实际持久化。`test` 本身是通用字符串，单独命中可能误报。该请求只证明固定路径的内容写入，不能据此声称任意文件路径可控或已经执行系统命令。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wo2.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
