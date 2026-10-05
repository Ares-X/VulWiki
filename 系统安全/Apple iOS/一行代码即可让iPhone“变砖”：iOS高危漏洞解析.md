---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-24091"
identifier_role: "primary"
primary_identifiers: "CVE-2025-24091"
referenced_identifiers: ""
identifier_status: "unknown"
title: "一行代码即可让iPhone“变砖”：iOS高危漏洞解析"
product: "Apple iOS Darwin notifications"
record_type: "advisory"
document_type: "拒绝服务新闻解读"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意应用被安装并启动/小组件后台执行；称iOS18.3修复"
side_effects: "永久禁用与完整系统恢复可修复自相矛盾，应描述持久重启循环/拒绝服务而非永久硬件损坏"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Apple%20iOS/%E4%B8%80%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%8D%B3%E5%8F%AF%E8%AE%A9iPhone%E2%80%9C%E5%8F%98%E7%A0%96%E2%80%9D%EF%BC%9AiOS%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%E8%A7%A3%E6%9E%90.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e8d8a247a61e5e75c89463d8"
entity_id: "ve-e8d8a247a61e5e75c89463d8"
schema_version: "1"
---

# 一行代码即可让iPhone“变砖”：iOS高危漏洞解析

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple iOS Darwin notifications
- 文献类型：拒绝服务新闻解读
- 版本、权限及部署边界：恶意应用被安装并启动/小组件后台执行；称iOS18.3修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 永久禁用与完整系统恢复可修复自相矛盾，应描述持久重启循环/拒绝服务而非永久硬件损坏
2. 一行代码仅在未查看图片，文本没有代码；VeryEvilNotify无链接，不能标成全文PoC
3. 非远程无条件攻击，需恶意应用及小组件执行；Darwin Nuke只是历史对比
4. 厂商公告/原研究缺失，FreeBuf仅媒体名；授权前缀与修复版本需官方核验；清理征文/卖报告广告

### 操作风险

永久禁用与完整系统恢复可修复自相矛盾，应描述持久重启循环/拒绝服务而非永久硬件损坏

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MzI5NTM4OTQ5Mg==&mid=2247633989&idx=1&sn=cd6647451cec618b20dd28533702603b&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 商密君   2025-05-04 11:45  
  
iOS系统存在一个高危漏洞（CVE-2025-24091），恶意应用仅需执行一行代码即可永久禁用iPhone。该漏洞通过操作系统的Darwin通知机制触发无限重启循环，导致设备"变砖"，必须通过完整系统恢复才能修复。  
  
  
![image](../../Web%E5%AE%89%E5%85%A8/.resource/remote/5276cd540fc4f273d3f19aece9f09d226c2798fb8967ffafbf2651989018fdce.jpg "")  
  
  
**01**  
  
  
  
**Darwin通知系统漏洞分析**  
  
  
该漏洞利用了  
CoreOS  
层的底层消息机制——Darwin通知。与常见的NSNotificationCenter或NSDistributedNotificationCenter不同，Darwin通知属于苹果操作系统的遗留API（  
应用程序接口  
），工作在系统底层。  
  
  
发现该漏洞的安全研究员Guilherme Rambo解释："Darwin通知更为基础，属于CoreOS层组件，为苹果系统进程间提供简单的底层消息交换机制。"  
  
  
漏洞的关键在于：iOS上的任何应用都无需特殊权限即可发送敏感的系统级Darwin通知。最危险的是，这些通知能触发包括"进入恢复模式"在内的强力系统功能。  
  
  
**02**  
  
  
  
**一行代码的攻击实现**  
  
  
攻击代码异常简单，仅需执行以下单行指令即可触发漏洞：  
  
  
![图片](../../Web%E5%AE%89%E5%85%A8/.resource/remote/773610147a66b65b400f8913c5e121e18aaf878077a89a841307140e0f077912.jpg "")  
  
  
执行后设备将强制进入"恢复中"状态。由于实际未进行恢复操作，该过程必然失败并提示用户重启设备。研究人员创建了名为"VeryEvilNotify"的概念验证攻击，将漏洞利用代码植入小组件扩展。  
  
  
研究员指出："iOS会定期在后台唤醒小组件扩展。由于小组件在系统中使用广泛，当安装并启动包含小组件扩展的新应用时，系统会非常积极地执行其小组件扩展。"  
  
  
通过将漏洞代码植入发送通知后反复崩溃的小组件，研究人员构建了持久性攻击——每次重启后都会触发攻击，形成使设备无法使用的无限循环。  
  
  
![图片](../../Web%E5%AE%89%E5%85%A8/.resource/remote/1ecbf1f36c5830837bb4a6316ad6711f2682f97d8fb72ed6c6c6ae4eaaba4260.png "")  
  
  
**03**  
  
  
  
**修复方案**  
  
  
苹果在iOS 18.3中通过实施新的敏感Darwin通知授权机制修复该漏洞，并向研究员支付了7500美元漏洞赏金。  
具体措施包括：  
- 系统通知现在必须包含"com.apple.private.restrict-post."前缀  
  
- 发送进程需持有"com.apple.private.darwin-notification.restrict-post."格式的受限授权  
  
这并非苹果系统首次出现Darwin相关漏洞。此前  
卡巴斯基实验室  
曾发现"Darwin Nuke"漏洞，攻击者可通过特制网络数据包发起远程  
拒绝服务攻击  
。  
  
  
强烈建议所有iPhone用户立即升级至iOS 18.3或更高版本。早期版本设备仍面临攻击风险，攻击可能通过App Store或其他渠道分发的看似无害的应用或小组件实施。  
  
  
该案例凸显了移动操作系统持续面临的安全挑战——即使简单且被忽视的遗留API，若未妥善保护也可能构成重大风险。  
  
  
编辑：陈十九  
  
审核：商密君  
  
**征文启事**  
  
大家好，为了更好地促进同业间学术交流，商密君现开启征文活动，只要你对商用密码、网络安全、数据加密等有自己的独到见解和想法，都可以积极向商密君投稿，商密君一定将您的声音传递给更多的人。  
  
  
[](https://mp.weixin.qq.com/s?__biz=MzI5NTM4OTQ5Mg==&mid=2247633989&idx=1&sn=cd6647451cec618b20dd28533702603b&scene=21#wechat_redirect)  
  
  
点击购买《2023-2024中国商用密码产业发展报告》  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/8b47880946aa17dde18985b61e5ef1968dd79c465776293334023960738ce9c1.jpg "")  
  
来源：  
FreeBuf  
  
注：内容均来源于互联网，版权归作者所有，如有侵权，请联系告知，我们将尽快处理。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2e4c0e2b07e6d2218296c1c7879a1d272336221ffba41d6ff1278cb96ec082f3.jpg "")  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/f42000ef0ad7a28d8fbc66db41a23e5121172315b9b07a1a7dc553d3420b58eb.jpg "")  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e95bab6e8a2e21887ae7bd2f4bf4109d6d4eab2f18fa7c6853fb9da8fa74d1b7.png "")  
  
点分享  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b94311534c431311a6b30af2eb40adb7d08ac2cc847224be0eca88249eaeb004.png "")  
  
点点赞  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/d8f09d4871dad8ed82fb357f065af25d92a2878593cdb206a4e08096012678cc.png "")  
  
点在看  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
