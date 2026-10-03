---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-springframework-directory-traversal.yaml"
title: "泛微e-cology / ResourceServlet 受限应用配置读取"
product: "泛微e-cology / ResourceServlet"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本/补丁；仅所示产品路径"
prerequisites: "未明确实际认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20ResourceServlet%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-451a8fc29a8c881b649040bb"
entity_id: "ve-451a8fc29a8c881b649040bb"
schema_version: "1"
source_url: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-springframework-directory-traversal.yaml"
---

# 泛微e-cology / ResourceServlet 受限应用配置读取

## 条目说明

- 对象与具体问题：泛微e-cology / ResourceServlet；受限应用配置读取
- 版本、配置及部署条件：未知版本/补丁；仅所示产品路径
- 认证与权限前提：未明确实际认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 不将宿主暴露泛化为所有Spring Framework漏洞
- 正文明确web.xml可读不等于系统文件全可读或文件包含执行；标题目录遍历可更精确为受限文件读取
- 多份固定commit源，可保留并补版本/权限

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 部署中的 `ResourceServlet` 资源入口存在公开记录的受限文件读取问题。公开请求把 `/WEB-INF/web.xml` 作为 `resource`，使通常不应由 Web 直接下载的应用配置内容暴露。

### 影响范围与前提

产品：泛微 E-Cology；精确受影响版本与补丁范围未知。该结论针对所示产品路径，不能外推为所有 Spring Framework 部署均受影响。读取范围取决于资源定位逻辑和进程权限。

### 公开验证资料

```http
GET /weaver/org.springframework.web.servlet.ResourceServlet?resource=/WEB-INF/web.xml HTTP/1.1
Host: oa.example.com
```

应确认响应包含实际 `web.xml` 内容及应用路由结构，例如 `<url-pattern>/weaver/`，并排除登录页、错误页或仅反射参数的响应。该示例证明的是应用配置读取，不证明本地文件包含执行或任意系统文件均可读。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-springframework-directory-traversal.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology-springframework-directory-traversal.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
