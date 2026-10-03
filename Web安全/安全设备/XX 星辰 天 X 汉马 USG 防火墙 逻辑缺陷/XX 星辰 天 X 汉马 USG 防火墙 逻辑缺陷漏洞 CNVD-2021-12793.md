---
cnvd: "CNVD-2021-12793"
source: "MrWQ/vulnerability-paper"
id: "vw-e246f9896c0ef127b8dfb0b1"
entity_id: "ve-e246f9896c0ef127b8dfb0b1"
schema_version: "1"
title: "XX 星辰 天 X 汉马 USG 防火墙 逻辑缺陷漏洞 CNVD-2021-12793"
product: "标题隐去部分厂商的天清汉马USG防火墙（身份待CNVD核）"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2021-12793"
referenced_identifiers: ""
prerequisites: "已登录useradmin/默认密码未改，具体固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/XX%20%E6%98%9F%E8%BE%B0%20%E5%A4%A9%20X%20%E6%B1%89%E9%A9%AC%20USG%20%E9%98%B2%E7%81%AB%E5%A2%99%20%E9%80%BB%E8%BE%91%E7%BC%BA%E9%99%B7/XX%20%E6%98%9F%E8%BE%B0%20%E5%A4%A9%20X%20%E6%B1%89%E9%A9%AC%20USG%20%E9%98%B2%E7%81%AB%E5%A2%99%20%E9%80%BB%E8%BE%91%E7%BC%BA%E9%99%B7%E6%BC%8F%E6%B4%9E%20CNVD-2021-12793.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/un1SdjBpjhzQmgL_tpFeXQ"
source_status: "recorded"
---

# XX 星辰 天 X 汉马 USG 防火墙 逻辑缺陷漏洞 CNVD-2021-12793

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：标题隐去部分厂商的天清汉马USG防火墙（身份待CNVD核）
- 本文讨论：CNVD-2021-12793用户权限修改
- 版本、权限与配置前提：已登录useradmin/默认密码未改，具体固件未知
- 资料类型：默认账户至后台提权截图教程；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 用户管理角色原有权限不明，不能只凭修改权限操作即证明越权
- 真正权限修改控件/请求全在图中，版本产品名部分遮蔽妨碍标准化
- 默认密码与逻辑提权应分两前提，非未认证漏洞

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CNVD产品与权限设计、版本、截图待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/un1SdjBpjhzQmgL_tpFeXQ)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

**XX 星辰 天 X 汉马 USG 防火墙 存在逻辑缺陷漏洞，攻击者通过账号密码可以进入后台后更改任意用户权限升级为管理员**

**二:  漏洞影响🐇**

**XX 星辰 天 X 汉马 USG 防火墙**

**三:  漏洞复现🐋**

**查找产品手册**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4xUiaX4qL4NngEGMU1yO05PkMXqZzlJ8XnylXtPdYibXUAxDEBgfdbwg85XsyZ1Q8H5KphbhgckARA/640?wx_fmt=png)

```
账号：useradmin
密码：venus.user
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4xUiaX4qL4NngEGMU1yO05PVa91rYj754GmGYBzmXVAgAgJ8FYRB8myjicMRIeFkFrUTyZVQsiaZ9gA/640?wx_fmt=png)

**成功登录**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4xUiaX4qL4NngEGMU1yO05PsoR0pEIcP6CSmKc3T34icFYIHSLXzdzCYFOhGN9ItcVLicHl95ezhosw/640?wx_fmt=png)

**登录后台后管理界面点击下面的图标**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4xUiaX4qL4NngEGMU1yO05PTeTtEraFrxvzHWo46Mz37MtljORsgognGB0CeIcQVtlic5fS0tQibqGw/640?wx_fmt=png)

**更改权限为任意用户, 刷新后得到用户权限**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4xUiaX4qL4NngEGMU1yO05PiaLedmAryCKlKicRmR3sDrLUzVym8xA5p2FDDRm0FQUpvMBjMzfYK9wg/640?wx_fmt=png)

 ****四:  感谢列表🦉****

**@小小阳**

 ****五:  关于文库🦉****

******（文库暂时关闭一段时间，敏感问题解决后再次开放~）******

**在线文库：**

**http://wiki.peiqi.tech**

**Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4WtnXiaQtWgfvq4DhHUTibj4kdCIpibz3T8kWS3Tt3RJWPGnvRI4fWu3xSSMIruSyl76vbyXTWDM4icA/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
