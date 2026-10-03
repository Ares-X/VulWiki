---
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20jqueryFileTree.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
title: "泛微e-cology jqueryFileTree.jsp目录遍历/目录列表泄露"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "公开9.0，完整范围未知"
prerequisites: "未明确实际权限要求"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20jqueryFileTree.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-f48e9f3026f49294dcc9a5b4"
entity_id: "ve-f48e9f3026f49294dcc9a5b4"
schema_version: "1"
source_url: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20jqueryFileTree.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
---

# 泛微e-cology jqueryFileTree.jsp目录遍历/目录列表泄露

## 条目说明

- 对象与具体问题：泛微e-cology；jqueryFileTree.jsp目录遍历/目录列表泄露
- 版本、配置及部署条件：公开9.0，完整范围未知
- 认证与权限前提：未明确实际权限要求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 明确目录可见不等于内容可读或遍历整个文件系统，保留限定影响
- 固定commit多来源和误报判断详细；仍缺最小权限和修复版本
- 空cve可改null/ids数组，version文字最好拆observed_versions与affected_range

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的组织架构目录浏览组件接受 `dir` 路径。公开资料通过相对路径返回预期用户文件目录之外的条目，用于确认目录遍历和服务器目录结构泄露。

### 影响范围与前提

公开复现资料标注 E-Cology 9.0；完整受影响版本与补丁范围未知。目录列表可见不代表文件内容可读，也不代表能够遍历整个文件系统。

### 公开验证资料

```http
GET /hrm/hrm_e9/orgChart/js/jquery/plugins/jqueryFileTree/connectors/jqueryFileTree.jsp?dir=/page/resource/userfile/../../ HTTP/1.1
Host: oa.example.com
```

应核对返回项是否为实际目录条目，并确认其已越出预期目录。上游模板同时检查 `index.jsp` 条目及目录操作控件；单个 `[` 字符或页面控件不能证明目录遍历。完整页面截图和请求见公开资料。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20jqueryFileTree.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology-jqueryfiletree-traversal.yaml)
- [公开资料 3](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc10.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
