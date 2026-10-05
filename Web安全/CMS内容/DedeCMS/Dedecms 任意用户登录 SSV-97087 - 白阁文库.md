---
source: "MrWQ/vulnerability-paper"
product: "DedeCMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "SSV-97087"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Dedecms 任意用户登录 SSV-97087 - 白阁文库"
prerequisites: "来源所述条件，未列明部分仍待核：5.7SP2; member subsystem; numeric-looking username route; last_vid empty; registration/approval conditions omitted"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95SSV-97087/"
id: "vw-a7fd70670d0716834dc627af"
entity_id: "ve-a7fd70670d0716834dc627af"
schema_version: "1"
---

## 核对与使用边界

- 编号说明：保留原文明确使用的 SSV 条目编号作为文章主引用标识，SSV 与 CVE/CNVD 为不同编号体系；来源归属仍未独立核验。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.7SP2; member subsystem; numeric-looking username route; last_vid empty; registration/approval conditions omitted

- **证据待核（1）**：Same content as index73 with external images and site chrome。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（2）**：Signing oracle is keyed md5 prefix, not ordinary ID MD5 as summary could imply。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：Logged-in member named admin does not demonstrate backend admin access。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（4）**：Actual cookie substitutions only screenshots。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Dedecms 任意用户登录 SSV-97087 - 白阁文库

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.bylibrary.cn](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95SSV-97087/)

> 白阁文库是白泽 Sec 团队维护的一个漏洞 POC 和 EXP 披露以及漏洞复现的开源项目，欢迎各位白帽子访问白阁文库并提出宝贵建议。

[](https://github.com/BaizeSec/bylibrary/blob/main/docs/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95SSV-97087.md "编辑此页")

#### 影响版本 [¶](#_1 "Permanent link")

dedecmsV5.7 SP2

#### 漏洞成因 [¶](#_2 "Permanent link")

dedecms 的会员模块的身份认证使用的是客户端 session，在 Cookie 中写入用户 ID 并且附上 ID__ckMd5，用做签名。主页存在逻辑漏洞，导致可以返回指定 uid 的 ID 的 Md5 散列值。原理上可以伪造任意用户登录。

#### 复现 [¶](#_3 "Permanent link")

现在我们的思路就是 先从 `member/index.php` 中获取伪造的 DedeUserID 和它对于的 md5 使用它登录 访问 member/index.php?uid=0000001 并抓包 (注意 cookie 中 last_vid 值应该为空)。 **原图暂未找回**（原引用：` ![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95SSV-97087/f09e67a7e30cf8167f0e1f0e01ae01d9.png) `） 可以看到已经获取到了，拿去当做 DeDeUserID**原图暂未找回**（原引用：` ![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95SSV-97087/a599b95d431c365e3edc7ba540b363a1.png) `） 可以看到，登陆了 admin 用户。

#### 修复意见 [¶](#_4 "Permanent link")

M_ID 被 intval 后还要判断是否与未 intval 之前相同。

* * *

最后更新: 2021-03-24

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
