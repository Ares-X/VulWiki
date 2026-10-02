---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-filedownload-directory-traversal.yaml"
title: "泛微e-cology ln.FileDownload路径越界文件读取"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本认证补丁未知；目标存在且服务可读"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20ln.FileDownload%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-2c8cadabe3f42f372e43db86"
entity_id: "ve-2c8cadabe3f42f372e43db86"
schema_version: "1"
source_url: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-filedownload-directory-traversal.yaml"
---

# 泛微e-cology ln.FileDownload路径越界文件读取

## 条目说明

- 对象与具体问题：泛微e-cology；ln.FileDownload路径越界文件读取
- 版本、配置及部署条件：版本认证补丁未知；目标存在且服务可读
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确目录遍历/内容读取不等于包含执行，响应证据区分配置/错误页
- 固定来源且路径完整；不应与其他FileDownload命名端点混并
- 补实际版本与授权角色证据即可

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的 `ln.FileDownload` 下载接口接收 `fpath`。公开模板通过相对路径读取 `WEB-INF/web.xml`，用于验证下载路径越界与应用配置泄露。

### 影响范围与前提

产品：泛微 E-Cology；具体受影响版本、补丁范围与认证条件未知。目标文件必须存在且可被服务进程读取；公开证据没有证明文件内容会被执行。

### 公开验证资料

```http
GET /weaver/ln.FileDownload?fpath=../ecology/WEB-INF/web.xml HTTP/1.1
Host: oa.example.com
```

确认应基于实际 `web.xml` 结构及其中的应用配置，例如 `<url-pattern>/weaver/`，而不是泛化的 `version` 字符串。排除错误页、登录页和参数反射后，才能认定目标文件内容已泄露。本条使用“目录遍历/文件读取”描述，不把它等同于文件包含执行。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-filedownload-directory-traversal.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology-filedownload-directory-traversal.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
