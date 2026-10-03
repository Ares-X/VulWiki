---
version: "ThinkPHP < 5.1.23"
source: "MrWQ/vulnerability-paper"
product: "ThinkPHP / in数组键注入"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "追洞小组 - ThinkPHP5 SQL 注入漏洞 and 敏感信息泄露"
prerequisites: "来源所述条件，未列明部分仍待核：写ThinkPHP<5.1.23，但payload与Vulhub5.0.9/in数组键相关，缺实际锁定版本"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/1ZkiKqHogWOy0U4rQNnGtQ"
id: "vw-4737f285a6b8dfb1415ebba9"
entity_id: "ve-4737f285a6b8dfb1415ebba9"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：本篇所示是 ThinkPHP/MySQL 的 ids 参数注入与信息泄漏，分析段提到 GIS、Oracle、tolerance 为跨产品串文，不能作为此入口根因。保留原错误段并以本说明界定；两个原语和所需数据库/调试配置应分别核验。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：写ThinkPHP&lt;5.1.23，但payload与Vulhub5.0.9/in数组键相关，缺实际锁定版本

代码与实验材料：ids数组key+updatexml，敏感配置仅图，分析段却完全不同产品条件

来源证据范围：MS08067追洞小组署名和CSDN链接，无官方patch

- **来源与引用处置（1）**：漏洞分析明显串入GIS/Oracle内容；依据：正文说需GIS聚合、Oracle和tolerance键名，与ThinkPHP MySQL updatexml/ids请求无关，疑似Django GIS段落误贴。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **事实待核（2）**：版本范围与实验根因不匹配；依据：&lt;5.1.23像order问题范围，而PoC是in数组key，需核正版本/补丁归属。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（3）**：数据库默认凭据不是通用泄露结果；依据：root/root是实验配置，缺返回字段文字；不能以一次样例概括所有部署。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **事实待核（4）**：分类应归ThinkPHP；依据：独立目录以文章来源命名，不是产品。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 追洞小组 - ThinkPHP5 SQL 注入漏洞 and 敏感信息泄露

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/1ZkiKqHogWOy0U4rQNnGtQ)

****文章来源｜MS08067 WEB 攻防知识星球****

> 本文作者：**叫我啊**（Ms08067 实验室追洞小组成员）

**漏洞复现分析  认准追洞小组  
**

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9Y7Ac6gb6JZVymJwS3gu8cniaUZzJeYAibE3v2VnNlhyC6fSTgtW94Pz51p0TSUl3AtZw0L1bDaAKw/640?wx_fmt=png)

**一、漏洞介绍**  

ThinkPHP 是一个开源的，快速、简单的面向对象的轻量级 PHP 开发框架

**二、影响版本**

```
ThinkPHP < 5.1.23
```

**三、漏洞复现**

采用 vulhub 快速搭建

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9umzdgZcprakicmwHb7pfRV9ibH8hfP1PId6PHSm6wRqg1MPgffGjDF251qBfl2mCUaOrk7JPoOUow/640?wx_fmt=png)

启动后，访问 http://your-ip/index.php?ids[]=1&ids[]=2 ，即可看到用户名被显示了出来，说明环境运行成功。

http://192.168.47.130/index.php?ids[]=1&ids[0,updatexml(0,concat(0x7e,user()),0)]=2

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9umzdgZcprakicmwHb7pfRVwSpm7NQ5S8k49L7aArpf9iaibXuiatSTVm4XTFBAvJ0dV1WicqibgDqb6aQ/640?wx_fmt=png)

可以之间看到存在敏感信息泄露

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9umzdgZcprakicmwHb7pfRVmBqo16mZA0DEEFfPvv0bYosAkTurQ7BG5AsiapIxL9pbW5jWPTm3I9g/640?wx_fmt=png)

可以发现数据库的账号、密码：为 root 、root

**四、漏洞分析**

该漏洞需要开发者使用了 GIS 中聚合查询的功能，用户在 oracle 的数据库且可控 tolerance 查询时的键名，在其位置注入 SQL 语句。

https://blog.csdn.net/qq_41832837/article/details/104066647

**【追洞计划】****顾名思义即追最新的漏洞，包括** **2020&2021 所有 Apache 漏洞 + 主流框架****，将会在星球内部招收感兴趣学员，纳入追洞小组。**

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWaicBSVWEh3E9RUYC1s7ibxjdxL3M2oibOs9FWy7sG0niaz9UunJe6XU5dh0vVa3CObU9YsiaFDNk7IViaWQ/640?wx_fmt=png)

**主讲导师介绍：**

**Taoing**：Ms08067 安全实验室核心成员，现任安恒信息高级安全工程师，擅长 web 渗透测试，应急响应。

**TtssGkf：**Ms08067 实验室核心成员，Defcon86021 议题分享者，擅长领域：渗透测试，漏洞分析，代码审计，安全开发。

**扫描下方二维码加入星球学习**

**加入后会邀请你进入内部微信群，内部微信群永久有效！**

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9Y7Ac6gb6JZVymJwS3gu8cniaUZzJeYAibE3v2VnNlhyC6fSTgtW94Pz51p0TSUl3AtZw0L1bDaAKw/640?wx_fmt=png) ![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9Y7Ac6gb6JZVymJwS3gu8cT2rJYbRzsO9Q3J9rSltBVzts0O7USfFR8iaFOBwKdibX3hZiadoLRJIibA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWaicBVC2S4ujJibsVHZ8Us607qBMpNj25fCmz9hP5T1yA6cjibXXCOibibSwQmeIebKa74v6MXUgNNuia7Uw/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWa9Y7Ac6gb6JZVymJwS3gu8cRey7icGjpsvppvqqhcYo6RXAqJcUwZy3EfeNOkMRS37m0r44MWYIYmg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_jpg/XWPpvP3nWaicjovru6mibAFRpVqK7ApHAwiaEGVqXtvB1YQahibp6eTIiaiap2SZPer1QXsKbNUNbnRbiaR4djJibmXAfQ/640?wx_fmt=jpeg) ![](https://mmbiz.qpic.cn/mmbiz_png/XWPpvP3nWaicJ39cBtzvcja8GibNMw6y6Amq7es7u8A8UcVds7Mpib8Tzu753K7IZ1WdZ66fDianO2evbG0lEAlJkg/640?wx_fmt=png)  

**目前 36000 + 人已关注加入我们  
**![](https://mmbiz.qpic.cn/mmbiz_gif/XWPpvP3nWa9FwrfJTzPRIyROZ2xwWyk6xuUY59uvYPCLokCc6iarKrkOWlEibeRI9DpFmlyNqA2OEuQhyaeYXzrw/640?wx_fmt=gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
