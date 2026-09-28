---
cve: "CVE-2025-43200"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  苹果iOS现零点击漏洞，记者遭Graphite间谍软件入侵  
看雪学苑  看雪学苑   2025-06-13 10:04  
  
近日，一款名为Graphite的间谍软件被曝光利用苹果iOS系统的零点击漏洞对记者展开攻击。据调查，这款间谍软件背后的开发者是Paragon公司，其攻击目标中至少包括三位欧洲记者，其中两例已经通过取证分析得到了验证。  
  
  
此次攻击是利用iOS系统中存在的漏洞（CVE-2025-43200），攻击者利用该漏洞无需获取用户任何操作指令或授权，就可以远程入侵其苹果设备。此次攻击的传播渠道是通过苹果的iMessage，攻击者会利用一个名为“ATTACKER1”的iMessage账号向目标对象发送带有恶意代码的信息，一旦信息被接收，设备就会自动被安装上Graphite间谍软件。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8ENF0cDMqrHFD9TiagRTSGj1pRj7iaz0icwHlsn5YJRkcCxK5qdB6C1q2hqONIr5U20hlKpXiaQneicrkA/640?wx_fmt=png&from=appmsg "")  
  
图片来源：CitizenLabs  
  
  
从被入侵的设备技术分析结果来看，这些设备与一个IP地址为46.183.184[.]91的服务器存在连接记录。经调查，研究人员发现该服务器属于VPS提供商EDIS Global，而且它还与Paragon公司开发的Graphite间谍软件的基础设施相匹配。直到2025年4月12日，该服务器仍符合Citizen Lab（公民实验室）所标记的“指纹P1”特征。不过，苹果官方已经确认，iOS 18.3.1版本的系统更新中已经修复了这个漏洞，但在此系统更新之前，运行早期版本iOS系统的设备一直处于被攻击的风险之中。  
  
  
在此次间谍软件攻击事件中，受到攻击的记者包括一位不愿透露姓名的知名欧洲记者和意大利记者Ciro Pellegrino，后者是意大利新闻网站Fanpage[.]it那不勒斯新闻编辑室的负责人。这两位记者都在2025年4月29日收到了苹果公司发出的提示信息，内容是提醒他们设备可能被高级间谍软件入侵。随后经过取证分析，证实了这两人的设备确实留有Graphite间谍软件的痕迹。  
  
  
除了Ciro Pellegrino之外，同样在Fanpage[.]it工作的记者Francesco Cancellato也遭遇了相似的攻击。他从WhatsApp那里得知自己的设备被Paragon的间谍软件锁定为目标。由于有两名记者来自同一家新闻机构Fanpage[.]it，这表明攻击者是蓄意针对该新闻组织展开行动。这种间谍软件一旦安装成功，就可以访问记者手机中的信息内容、地理位置数据、照片，甚至还能够私自启动话筒和摄像头，完全是在记者毫不知情的情况下进行操作。这无疑给记者的信源和日常工作带来了极其严重的隐私和安全风险。  
  
  
意大利负责监管情报机构的议会委员会COPASIR在2025年6月5日发布了一份报告，承认Paragon的Graphite间谍软件确实被用于对一些个人的攻击，但对于记者Francesco Cancellato遭到谁的攻击这一问题，却表示不知情。  
  
  
  
资讯来  
源  
：  
cybersecuritynews  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibExiboJzOiafqGLvlOkrmU6NIr3qSr7ibpkIo2N5mhCTNXoMl37s2oRSIDw/640?wx_fmt=gif&from=appmsg "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
