---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "MineAdmin downloadById附件对象访问控制"
product: "MineAdmin"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "v1.x/v2.x泛范围"
prerequisites: "无Cookie示例但对象权限未证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/MineAdmin%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/MineAdmin%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FdownloadById%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
id: "vw-93f532cea0a30231da358573"
entity_id: "ve-93f532cea0a30231da358573"
schema_version: "1"
---

# MineAdmin downloadById附件对象访问控制

## 条目说明

- 对象与具体问题：MineAdmin；downloadById附件对象访问控制
- 版本、配置及部署条件：v1.x/v2.x泛范围
- 认证与权限前提：无Cookie示例但对象权限未证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 自增ID不是漏洞本身，需证明非公开/他人附件可读；能力为附件IDOR非任意OS文件
- Snort规则匹配所有正常downloadById请求，误报高，应加行为/上下文而非宣告攻击
- 只有图无对照/根因/补丁，精确分支待核

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

MineAdmin官网：https://doc.mineadmin.com/

资产测绘语法：body="MineAdmin"

## 影响版本

MineAdmin v1.x
MineAdmin v2.x

## **漏洞描述:** 

MineAdmin后台管理系统基于 Hyperf 框架开发。是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。/system/downloadById?id=处存在任意文件下载漏洞由，于文件 ID 是自增数字，攻击者可通过枚举 ID 批量下载全站附件。

## 漏洞复现

POC/EXP：

```http
GET /system/downloadById?id=3 HTTP/1.1
Host:127.0.0.1
```

![image-20260108155842630](./.resource/MineAdmin企业级后台管理系统downloadById任意文件下载漏洞/media/image-20260108155842630.png)


sonrt规则：

```
alert http any any -> $HOME_NET any (
    msg:"MineAdmin - Arbitrary File Download via downloadById";
    flow:to_server,established;
    http.method; content:"GET";
    http.uri; content:"/system/downloadById";
    http.uri; content:"id=";
    metadata:
        service http,
        affected_product "MineAdmin企业级后台管理系统",
        vulnerability_type "Arbitrary File Download",
        severity "high";
    classtype:web-application-attack;
    sid:1000576;
    rev:1;
    priority:1;
)
```

## 漏洞修复

system/downloadById接口处加强权限校验。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
