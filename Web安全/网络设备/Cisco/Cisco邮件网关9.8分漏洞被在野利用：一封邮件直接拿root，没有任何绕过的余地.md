---
cve: "CVE-2026-76461"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-142de29893ace75661a1fd37"
entity_id: "ve-142de29893ace75661a1fd37"
schema_version: "1"
title: "Cisco Secure Email Gateway SQL 注入通告（CVE-2026-76461，待核）"
product: "Cisco Secure Email Gateway AsyncOS"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-76461"
referenced_identifiers: ""
prerequisites: "未认证邮件解析SQL注入；列15.5/16.0/16.5各修复构建"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/Cisco%E9%82%AE%E4%BB%B6%E7%BD%91%E5%85%B39.8%E5%88%86%E6%BC%8F%E6%B4%9E%E8%A2%AB%E5%9C%A8%E9%87%8E%E5%88%A9%E7%94%A8%EF%BC%9A%E4%B8%80%E5%B0%81%E9%82%AE%E4%BB%B6%E7%9B%B4%E6%8E%A5%E6%8B%BFroot%EF%BC%8C%E6%B2%A1%E6%9C%89%E4%BB%BB%E4%BD%95%E7%BB%95%E8%BF%87%E7%9A%84%E4%BD%99%E5%9C%B0.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# Cisco Secure Email Gateway SQL 注入通告（CVE-2026-76461，待核）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cisco Secure Email Gateway AsyncOS
- 本文讨论：CVE-2026-76461
- 版本、权限与配置前提：未认证邮件解析SQL注入；列15.5/16.0/16.5各修复构建
- 资料类型：新闻评论/通告；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 官方断言、在野利用、SQL到root链、云客户影响均无厂商链接支撑
- 标题绝对化且带情绪，不适宜标准漏洞名称
- SQL匹配日志只能作为线索，不能独立证明root利用成功；文章部分承认日志局限
- 邮件网关宜安全设备类别
- 已落实的文本修订：标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本、SQL根因、COPY TO PROGRAM到root与云范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 欢迎关注→
                    欢迎关注→  安全客   2026-09-16 01:57  
  
Cisco Secure Email Gateway存在CVE-2026-76461漏洞，CVSS 9.8分，攻击者发送特制邮件即可在网关上以root权限执行命令，目前已被在野利用，请立即升级到16.5.0-780版本。  
  
  
干安全的都知道，邮件网关是企业的"大门"。所有进出的邮件都要经过它扫一遍，病毒、钓鱼、垃圾邮件全靠它挡着。但9月14日，Cisco自己证实了一个让安全负责人坐不住的消息：Secure Email Gateway存在一个9.8分的严重漏洞，编号CVE-2026-76461，已经在被在野利用。  
  
讽刺的是，这个专门用来挡邮件的设备，自己扛不住一封精心构造的邮件。  
  
  
01  
  
漏洞有多严重：发封邮件就是root  
  
漏洞性质是SQL注入，存在于Cisco AsyncOS软件的邮件解析逻辑里。邮件网关在处理邮件内容时对数据校验不够严格，攻击者可以在邮件里嵌入恶意SQL语句。  
  
  
网关收到这封邮件之后，会把这些SQL语句当合法指令执行，最终在底层操作系统上以root权限运行攻击者的命令。整个过程不需要身份验证，不需要用户交互，甚至不需要目标打开邮件——网关自己解析邮件的时候就中招了。  
  
  
CVSS评分9.8分，差0.2分满分。Cisco在官方公告里写得很清楚：没有变通方案，没有缓解措施，唯一的办法就是升级。  
  
  
02  
  
为什么这个漏洞特别要命  
  
邮件网关在企业网络里的位置很特殊。它是边界设备，直接暴露在互联网上，接收来自任何地方的邮件。同时它又有很高的系统权限，要深度检查邮件内容，要能操作邮件队列，要能和内部的邮件服务器、目录服务通信。  
  
  
一旦被攻破，攻击者拿到的不是普通用户权限，是root。这意味着：  
  
  
他们可以在网关上装后门，长期监听所有进出邮件；可以把网关当跳板往内网渗透；可以拦截或篡改关键邮件，比如合同、发票、密码重置链接；甚至可以利用网关的身份给内部员工发钓鱼邮件——内部邮件的信任度天然就高。  
  
  
邮件网关是安全设备，但一旦被攻破，反而成了攻击者手里最好用的武器。  
  
  
03  
  
哪些版本受影响，怎么升级  
  
受影响版本：15.5及更早版本、16.0、16.5。修复版本：15.5.5-014、16.0.4-302、16.5.0-780。Cisco强烈建议直接升到16.5.0-780，不要再停留在15.x或16.0。  
  
  
用Cisco Secure Email Cloud（云端版本）的用户，Cisco说已经直接联系了检测到恶意活动的客户。但云端用户自己也应该主动去确认，别等着别人通知。  
  
  
04  
  
怎么排查：看日志找SQL语句  
  
Cisco给的排查思路：检查邮件网关的mail_logs日志，搜索可疑SQL语句。官方示例命令是用grep搜索"COPY.*TO PROGRAM"这个模式。搜到了结果，说明这台设备很可能被攻击过。  
  
  
但要注意，攻击者拿到root权限之后是可以清理日志、隐藏痕迹的。所以不能只看邮件网关自己的日志，还要交叉检查网络设备、防火墙的日志，看有没有异常外联，比如邮件网关主动向外部IP上传数据，或者从可疑IP下载了什么东西。  
  
用虚拟化部署的用户，还要检查底层虚拟化平台，确认攻击者有没有顺着网关往上爬。  
  
  
05  
  
边界设备的安全债该还了  
  
这几年边界设备被攻破的案例越来越多。VPN、防火墙、邮件网关、SSL加速器，这些本该是保护内网的第一道防线，反而成了攻击者最喜欢的入口。原因不复杂：暴露在互联网上，攻击面大；跑着实时服务，不能随便下线维护；固件更新麻烦，很多企业一拖再拖。  
  
  
邮件网关尤其尴尬。它的功能就是处理邮件，而邮件天然就是不可信的。你不能指望所有发件人都是好人，所以邮件网关必须把每一封邮件都当成潜在的恶意邮件来处理。但现实是，很多邮件网关自己的代码就没有按这个标准来写。  
  
  
安全团队应该趁这个机会重新审视所有边界设备的状态：固件版本是不是最新的，有没有开启不必要的功能，管理接口有没有暴露在互联网上，日志有没有集中收集和分析。这些基础工作平时看着不起眼，关键时候能救命。  
  
![](https://mmecoa.qpic.cn/sz_mmecoa_gif/7icMUAtu929BicOey7hH4zGDEsqp2BibkEghfEZTEeedfg3ZDXLj8aiaNjuficqssNXdQvSzooGqUtQa78bwIW2pMu11kBHyzTy2wGrTfozSZk3Y/640?from=appmsg "")  
  
END  
  
推荐阅读  
  
[AI已经开始自动打你了：Anthropic捅破窗户纸，黑客用Claude实现"检测即重生"](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790476&idx=1&sn=259ec76a2dc788f984e054bb78b54e1f&scene=21#wechat_redirect)  
  
  
2026-09-15  
[](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790476&idx=1&sn=259ec76a2dc788f984e054bb78b54e1f&scene=21#wechat_redirect)  
  
  
[红队两周的活，AI十小时干完：全球首例多智能体勒索攻击实录](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790471&idx=1&sn=51ded8e96316ccb2cc01a411bbfa2544&scene=21#wechat_redirect)  
  
  
2026-09-14  
[](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790471&idx=1&sn=51ded8e96316ccb2cc01a411bbfa2544&scene=21#wechat_redirect)  
  
  
[22万条最私密的照片和病历，就从一个API接口流了出去](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790466&idx=1&sn=8d1be72b1af7a1c1228aa0340836e66c&scene=21#wechat_redirect)  
  
  
2026-09-10  
[](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790466&idx=1&sn=8d1be72b1af7a1c1228aa0340836e66c&scene=21#wechat_redirect)  
  
  
[4200枚比特币只剩200枚：Liquid被掏空背后，"白帽"说法你信吗？](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790461&idx=1&sn=cdca7f302e0d3f4d814f6521d9b91e58&scene=21#wechat_redirect)  
  
  
2026-09-08  
[](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790461&idx=1&sn=cdca7f302e0d3f4d814f6521d9b91e58&scene=21#wechat_redirect)  
  
  
[深夜4小时，ChatGPT、Claude、Grok集体宕机：AI的根基正在动摇](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790456&idx=1&sn=4974fe1988d67755753f24662d7fd61d&scene=21#wechat_redirect)  
  
  
2026-09-07  
[](https://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649790456&idx=1&sn=4974fe1988d67755753f24662d7fd61d&scene=21#wechat_redirect)  
  
  
  
更多AI知识，请关注Aiker World社区  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
