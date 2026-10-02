---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-sptmforportalthumbnail-lfi.yaml"
title: "泛微e-cology SptmForPortalThumbnail.jsp应用源码下载"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本补丁认证未知；Web应用目录文件"
prerequisites: "未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20SptmForPortalThumbnail.jsp%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-协同办公OA\""
id: "vw-59f35dede3fb958a0070a1c8"
entity_id: "ve-59f35dede3fb958a0070a1c8"
schema_version: "1"
source_url: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-sptmforportalthumbnail-lfi.yaml"
---

# 泛微e-cology SptmForPortalThumbnail.jsp应用源码下载

## 条目说明

- 对象与具体问题：泛微e-cology；SptmForPortalThumbnail.jsp应用源码下载
- 版本、配置及部署条件：版本补丁认证未知；Web应用目录文件
- 认证与权限前提：未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文精准限定应用目录，但标题任意文件容易误读为整个服务器；建议改应用目录文件/源码读取
- 实际JSP结构与响应反射排除明确，固定源完整
- 同属文件读取不能与ResourceServlet或ln.FileDownload合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

泛微 E-Cology 的门户缩略图页面接收 `preview` 参数。公开资料说明该值被用于 Web 根目录下的文件下载，并展示将 JSP 源文件自身作为参数后返回源码的行为，可造成应用源码泄露。

### 影响范围与前提

产品：泛微 E-Cology；具体受影响版本、补丁范围和认证条件未知。公开请求验证 Web 应用目录内文件读取，不足以证明整个服务器任意路径可读。

### 公开验证资料

```http
GET /portal/SptmForPortalThumbnail.jsp?preview=portal/SptmForPortalThumbnail.jsp HTTP/1.1
Host: oa.example.com
```

有效结果应为 JSP 源码内容，包含相互一致的 Java 导入、程序逻辑或 `getServletConfig` 等源码结构。公开模板还检查 `weaver.general.BaseBean` 与 `image/png`；图片响应头、HTTP 200 或单个源码词语不能独立证明源文件下载。

### 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

### 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-sptmforportalthumbnail-lfi.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_SptmForPortalThumbnail-download.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
