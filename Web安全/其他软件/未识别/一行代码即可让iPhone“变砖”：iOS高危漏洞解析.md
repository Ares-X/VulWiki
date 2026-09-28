---
cve: "CVE-2025-24091"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  一行代码即可让iPhone“变砖”：iOS高危漏洞解析   
 商密君   2025-05-04 11:45  
  
iOS系统存在一个高危漏洞（CVE-2025-24091），恶意应用仅需执行一行代码即可永久禁用iPhone。该漏洞通过操作系统的Darwin通知机制触发无限重启循环，导致设备"变砖"，必须通过完整系统恢复才能修复。  
  
  
![image](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icbm1QXk9w6O9EM8c0VvZicmhia9IcxLTuqWX9ThtlxCgz4rYNZibwxibS9xyMQVOTxMR7RvexgQ5vpiag/640?wx_fmt=jpeg&from=appmsg&wxfrom=13&tp=wxpic "")  
  
  
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
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icbm1QXk9w6O9EM8c0VvZicmXgUCIwjgt36lEtoGqwMgWp0PRgqvr4nZJ8t4pHSbgFicyicfaaKx46YA/640?wx_fmt=jpeg&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1 "")  
  
  
执行后设备将强制进入"恢复中"状态。由于实际未进行恢复操作，该过程必然失败并提示用户重启设备。研究人员创建了名为"VeryEvilNotify"的概念验证攻击，将漏洞利用代码植入小组件扩展。  
  
  
研究员指出："iOS会定期在后台唤醒小组件扩展。由于小组件在系统中使用广泛，当安装并启动包含小组件扩展的新应用时，系统会非常积极地执行其小组件扩展。"  
  
  
通过将漏洞代码植入发送通知后反复崩溃的小组件，研究人员构建了持久性攻击——每次重启后都会触发攻击，形成使设备无法使用的无限循环。  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icbm1QXk9w6O9EM8c0VvZicm5zJt6ppn4o8QnTVibPm9cJibP9UInsHRuBHN7ibGhuia3cgJB1jm3uhCPQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1 "")  
  
  
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
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1HyKzSU2XXNcXmbiaiaCljdXpwzOEQ9QTBXMibM6rZTOnbTSwTmCXncQLria2vuLGxn8QPtznzBc0as8vBxWIjrWxQ/640?wx_fmt=jpeg "")  
  
来源：  
FreeBuf  
  
注：内容均来源于互联网，版权归作者所有，如有侵权，请联系告知，我们将尽快处理。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1HyKzSU2XXOdeQx0thlyozF2swQTEN9iaaBNDG0jTKfAgqgdesve8x5IEWNvYxjF6sAWjO1TPCZVsWd0oiaDn3uw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMyyClGk1cttkSBbJicAn5drpXEbFIeChG9IkrslYEylRF4Z6KNaxNafDwr5ibcYaZXdnveQCNIr5kw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMZPiaDBD8yxbIHiciauWK4tuiaMcJkA69QYZ9T4jmc3fdN6EA7Qq9A8E3RWcTKhxVEU1QjqOgrJMu2Qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
点分享  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMZPiaDBD8yxbIHiciauWK4tuiaiaRXdw4BFsc7MxzkVZaKGgtjWA5GKtUfm3hlgzsBtjJ0mnh9QibeFOGQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
点点赞  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1HyKzSU2XXMZPiaDBD8yxbIHiciauWK4tuiaeiaNlRO9954g4VS87icD7KQdxzokTGDIjmCJA563IwfStoFzPUaliauXg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
点在看  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
