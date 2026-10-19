---
schema_version: "1"
id: "VW-20261019-DEVSITE-SESSION"
title: "Google DevSite OAuth 会话签名密钥复用与反序列化链"
product: "Google DevSite"
version: "SaaS；研究者报告 2026-08-06，2026-10-07 状态更新为 fixed；无公开软件版本范围"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "原部署将 OAuth flow 放入客户端会话，泄露的 client_secret 又用于会话签名，回调反序列化该对象"
side_effects: "公开证明使用 time.sleep，可能延迟服务端请求；不应对生产服务重放"
source: "Simon Koeck，2026-10-12"
source_url: "https://simonkoeck.com/writeups/google-devsite-flask-session-pickle-rce"
source_status: "recorded"
---

# Google DevSite OAuth 会话签名密钥复用与反序列化链

## 原始研究记录

作者通过 `/oauth2authorize?return_url=%2F` 获取 Flask 会话，解码发现 OAuth flow 的 pickle 字节及 client_secret；同一密钥还能验证会话签名。回调读取攻击者可伪造的 flow 并反序列化，形成代码执行条件。

原文公开了 Cookie 解码、HMAC 校验、flow 键构造与返回 time.sleep 的 `__reduce__` 片段。作者用不同睡眠时间及无 Cookie、签名损坏、缺失 flow 等对照支持判断，未声称运行系统命令。正文端点是 `/oauth2authorize`，不沿用二次文章的 `/oauth2/authorize`。

## 范围与处置

这是特定 SaaS 部署链，不能泛化成 Flask 或 oauth2client 所有版本的漏洞。作者称约一天内热修复，10 月 7 日工单转为 fixed；没有可对应的公开修复版本或 CVE。应分离 OAuth 凭据与签名密钥、轮换泄露值、撤销旧会话，并把 flow 留在服务端，避免跨信任边界反序列化。

## 资料与审阅边界

2026-10-19 完整阅读上述原始研究及内嵌代码，仅作静态分析；未获取会话、访问服务端触发端点或执行示例。原作者本来就用占位符呈现凭据，本文未对来源执行脱敏。网页没有固定源码提交，复用许可证未建立，因此只作独立中文概述，不转载完整代码；具体公开片段及时间线见[原文](https://simonkoeck.com/writeups/google-devsite-flask-session-pickle-rce)。
