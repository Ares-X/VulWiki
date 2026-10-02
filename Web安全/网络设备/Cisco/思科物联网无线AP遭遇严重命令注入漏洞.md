---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-a71c91b176e43ac2498aceeb"
entity_id: "ve-a71c91b176e43ac2498aceeb"
schema_version: "1"
title: "思科物联网无线AP遭遇严重命令注入漏洞"
product: "Cisco Catalyst IW9165D/E、IW9167E URWB"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-20418"
referenced_identifiers: ""
prerequisites: "URWB模式、Web管理可达；17.14及之前迁移，17.15.1修复"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/%E6%80%9D%E7%A7%91%E7%89%A9%E8%81%94%E7%BD%91%E6%97%A0%E7%BA%BFAP%E9%81%AD%E9%81%87%E4%B8%A5%E9%87%8D%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  思科物联网无线AP遭遇严重命令注入漏洞   

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Catalyst IW9165D/E、IW9167E URWB
- 本文讨论：CVE-2024-20418
- 版本、权限与配置前提：URWB模式、Web管理可达；17.14及之前迁移，17.15.1修复
- 资料类型：新闻通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 可能需要无线接近只是部署推测，不应写成漏洞必要前提
- 无官方公告直链，厂商认证要求未明确转述
- 后半营销内容较多

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 访问向量、权限及版本边界待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 数世咨询   2024-12-20 08:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Y9btpvDIDqpElNdtFsCp3IrxRyPu1CF9rCVE3Ed2GrXp6SDsyafvPLFibfAdiaKCSLBeuMfRWfeeOjsXYX6mYbIQ/640?wx_fmt=png&from=appmsg "")  
  
  
  
思科公司的URWB硬件出现了一个难以忽视的漏洞，攻击者可利用伪造的 HTTP 请求劫持接入点的 Web 界面。  
  
Cisco 称该问题  
CVE-2024-20418  
影响三种产品：Catalyst IW9165D 接入点、Catalyst IW9165E 接入点和无线客户端以及 Catalyst IW9167E 接入点。  
  
不过，思科表示，接入点只有在 URWB 模式下运行易受攻击的软件时才会受到攻击。管理员可以使用 show mpls-config 命令确认 URWB 模式是否正在运行。如果禁用，则设备不受影响。不使用 URWB 的 Cisco 其他无线接入点产品不受影响。  
  
**至于缺陷本身：**  
  
"该漏洞是由于对基于 Web 的管理界面的输入验证不当造成的。攻击者可以通过向受影响系统的基于网络的管理界面发送伪造的 HTTP 请求来利用这个漏洞。  
  
"成功的漏洞利用可使攻击者在受影响设备的底层操作系统上以root权限执行任意命令"。  
  
换句话说，这将是一次彻底的入侵。这类漏洞在常见弱点枚举（CWE）数据库中被列为第 77 个，又称 "命令注入"。  
  
**这一点意义重大，因为就在今年 7 月，**  
**CISA 曾警告**  
**此类漏洞的危险性。**  
  
"CISA 写道："当制造商在构建要在底层操作系统上执行的命令时，未能对用户输入进行适当验证和审查，就会产生操作系统命令注入漏洞。  
  
该组织请求制造商采用  
安全设计  
原则来避免这一问题。  
  
**谁在使用 URWB 接入点？**  
  
URWB 产品线是一个物联网接入点系列，适用于工业或户外环境。2020 年，思科收购了意大利公司 Fluidmesh Networks ，从而获得了 URWB 的基础技术。  
  
URWB 模式允许接入点在通常难以保证的环境中支持高速、可靠、低延迟的无线连接。  
  
在 2021 年一篇关于该技术的博客中，Fluidmesh Network 的联合创始人兼前首席执行官 Umberto Malesci   
列举了几个使用该技术的例子  
，其中包括在法国的动车组上实现 1000 台设备的 IP 摄像头网络，在马耳他实现港口起重机的无线控制，以及作为支持米兰无人驾驶地铁列车的基础设施的一部分。  
  
"想象一下远程监控火车、地铁、公共交通、矿井或港口上的移动资产的情景。如果在查看电子邮件时掉了几个数据包，没有人会注意到。相比之下，远程控制起重机或自动驾驶汽车时丢包会造成严重后果，"Malesci 写道。  
  
这些使用案例的关键性凸显了优先修补该漏洞的重要性。不过，由于这类接入点通常被隔离在专用的物联网网段上，因此尚不清楚攻击者直接瞄准该漏洞有多容易。如果是这样的话，攻击者可能需要无线接近才能利用这个漏洞。  
  
**修补建议**  
  
由于该漏洞的 CVSS 得分最高为 10.0，而且没有可用的解决方法，因此修复该漏洞需要管理员通过思科的更新渠道应用软件补丁。思科表示，使用 17.14 及更早版本软件的企业应更新至修复版本，而使用 17.15 版本的企业应更新至 17.15.1 版本。  
  
建议若组织购买的  
URWB 接入点渠道商没有技术支持能力，请联系 Cisco   
技术中心  
。  
  
截至目前，思科的产品安全事故响应小组（PSIRT）表示，它没有发现任何针对该漏洞的漏洞利用。  
  
* 本文为闫志坤编译，原文地址：https://www.networkworld.com/article/3600993/cisco-iot-wireless-access-points-hit-by-severe-command-injection-flaw.html                        注：图片均来源于网络，无法联系到版权持有者。如有侵权，请与后台联系，做删除处理。  
  
— 【 THE END 】—  
  
🎉 大家期盼很久的#  
**数字安全交流群**  
来了！快来加入我们的粉丝群吧！  
  
🎁 **多种报告，产业趋势、技术趋势**  
  
这里汇聚了行业内的精英，共同探讨最新产业趋势、技术趋势等热门话题。我们还有准备了专属福利，只为回馈最忠实的您！  
  
👉   
扫码立即加入，精彩不容错过！  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Y9btpvDIDqqPJv9p5ibKIhJXQjWHJmSlibSdib80Llfp8mlV0ibf7m47jyaVeGoFeorddtIuxS5liafTJRKHeSdLnaQ/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
😄  
嘻嘻，我们群里见！  
  
  
更多推荐  
****  
  
  
[](http://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247514213&idx=1&sn=fa2d0412dbbce05ec48a9df909b7cfd3&chksm=c144cad8f63343ce0f383fc9d885c2c7ddcb3f3871270abea4c274775307858d350f60db3b54&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247513359&idx=1&sn=2f3bd51b24862de02cca6078688bafeb&chksm=c144c7b2f6334ea415adac810ce4803cdb3cd5e5ba194ff394b7278ebbb48cc830c8d405427a&token=824343009&lang=zh_CN&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247513339&idx=1&sn=759f859d0cf7dd748d3dd83ce49cf4cc&chksm=c144c646f6334f5017581206b0da2af90d539c921614514e3eb40f6c80d846bece0e6b521067&token=824343009&lang=zh_CN&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
