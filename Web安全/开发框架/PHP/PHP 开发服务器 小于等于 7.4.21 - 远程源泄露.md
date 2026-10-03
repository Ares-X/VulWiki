---
source: "MrWQ/vulnerability-paper"
product: "PHP内置开发服务器/源码泄漏"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PHP 开发服务器 小于等于 7.4.21 - 远程源泄露"
prerequisites: "来源所述条件，未列明部分仍待核：标题<=7.4.21无下界、平台或修复依据"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/D7Wlxp5E4KhepRnYQzNCkw"
id: "vw-abd15fdd7ea0fd5dfa271a22"
entity_id: "ve-abd15fdd7ea0fd5dfa271a22"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题&lt;=7.4.21无下界、平台或修复依据

代码与实验材料：只有两段GET及字面\r\n，无确切字节流、启动参数、响应文本，无法区分换行转录与真实载荷

来源证据范围：Khan公众号转载，无研究和补丁链接

- **适用与权限边界（1）**：核心复现要素缺失；依据：未展示为什么PHP文件作为源代码返回、请求边界字节及服务器选项。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：版本与默认部署误导；依据：PHP开发服务器不等于所有PHP Web部署，&lt;=范围未证实。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHP 开发服务器 小于等于 7.4.21 - 远程源泄露

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/D7Wlxp5E4KhepRnYQzNCkw)

PHP 开发服务器 <= 7.4.21 - 远程源泄露
===========================


> 原网页控件或署名（归档文字，不属于示例代码）：`[Khan 安全攻防实验室](javascript:void(0);) **Khan 安全攻防实验室** `


微信号 KhanCJSH

功能介绍 安全不是一个人，我们来自五湖四海。研究方向 Web 内网渗透，免杀技术，红蓝攻防对抗，CTF。

_2023-02-09 08:23_ _发表于广东_

收录于合集

```
GET /phpinfo.php HTTP/1.1 
Host: pd.research
\r\n
\r\n
GET / HTTP/1.1
\r\n
\r\n

```

![](https://mmbiz.qpic.cn/mmbiz_png/aPmkR80bcV2HS0XhrmxsGdvDx4JozEGJSicNTLawhCWXyjPWbibI4FTXI4JvseVFy6WAY2iczTibbrwEUL78PTtSlA/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
