---
source: "https://mrxn.net/jswz/jhsoft-LoginTemplate-DownLoadBgImage-fileread.html"
title: "金和C6 DownLoadBgImage path读取"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知"
prerequisites: "原请求无Cookie但认证未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E9%87%91%E5%92%8COA%20DownLoadBgImage%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金和网络-金和OA\""
id: "vw-eb4659ed60aa914007d50f4c"
entity_id: "ve-eb4659ed60aa914007d50f4c"
schema_version: "1"
---

# 金和C6 DownLoadBgImage path读取

## 条目说明

- 对象与具体问题：金和C6；DownLoadBgImage path读取
- 版本、配置及部署条件：未知
- 认证与权限前提：原请求无Cookie但认证未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 来源/root cause/MapPath分支及敏感证据遮蔽说明清楚
- 仍缺build/完整权限链及本地复现；链接未在本审计访问
- 可作为标准模板，保留未验证边界

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

公开代码分析指出，金和 OA C6 的 `DownLoadBgImage.aspx` 将 `path` 交给文件读取流程。`pathType` 不为 `1` 时先经过 `Server.MapPath`，随后通过文件流写入响应。原始分析给出读取站点配置的 POST 样例。

### 影响版本与前提

金和 OA C6，确切受影响版本与修复版本未知。原文给出的请求未携带登录 Cookie；此项静态观察不能代表所有部署的鉴权状态。

### 网络测绘

```text
app="金和网络-金和OA"
```

### 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
POST /c6/Jhsoft.Web.AddMenu/LoginTemplate/DownLoadBgImage.aspx/ HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

path=/c6/web.config
```

### 判定与证据边界

核对响应是否为目标 `web.config` 的实际配置结构，例如 `<configuration>` 下的配置段。仅出现 XML 声明、HTTP 200 或下载响应头不足以确认读取成功；保存证据时应遮蔽连接字符串等敏感值。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

### 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

### 参考来源

- [公开分析](https://mrxn.net/jswz/jhsoft-LoginTemplate-DownLoadBgImage-fileread.html)
