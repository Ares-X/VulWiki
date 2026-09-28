---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】黑客使用 VMware ESXi 0day漏洞在虚拟机安装后门   
 安全圈   2023-06-15 19:01  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
**关键词**  
  
窃取数据  
  
  
  
VMware 今天修补了一个 VMware ESXi 零日漏洞，该漏洞被某国赞助的黑客组织利用来后门 Windows 和 Linux 虚拟机并窃取数据。  
  
  
网络间谍组织——被发现攻击的网络安全公司 Mandiant 追踪为 UNC3886——使用 CVE-2023-20867 VMware Tools 身份验证绕过漏洞， 在来自受感染 ESXi 主机的来宾虚拟机上部署 VirtualPita 和 VirtualPie 后门，在那里他们将特权提升为 root。  
  
  
“受损的 ESXi 主机可能会迫使 VMware Tools 无法验证主机到客户的操作，从而影响客户虚拟机的机密性和完整性。”VMware 在今天的安全公告中表示。  
  
  
攻击者使用恶意制作的 vSphere 安装包 (VIB) 安装后门恶意软件，这些包旨在帮助管理员创建和维护 ESXi 映像。  
  
  
Mandiant 在调查期间发现的第三种恶意软件变种 (VirtualGate) 充当纯内存植入程序，对被劫持虚拟机上的第二阶段 DLL 有效负载进行去混淆处理。  
  
  
“来宾和主机之间的这种开放式通信通道，其中任何一个角色都可以充当客户端或服务器，只要部署了后门并且攻击者获得了对任何一个的初始访问权限，就启用了一种新的持久性方法通过来宾虚拟机获得对有后门的 ESXi 主机的访问权限。” Mandiant 说。  
  
  
“这进一步加强了 UNC3886 对 ESXi、vCenter 和 VMware 虚拟化平台的深刻理解和技术知识。UNC3886 继续针对传统上缺乏 EDR 解决方案的设备和平台，并在这些平台上利用0Day漏洞攻击。”  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg1xiaKkicyYcYva5oiaRZ0DP6viaRBCsfupwPY622IicvpDXicueTR6iammOTVknP34GvLiaVVsgSQwpoGkg/640?wx_fmt=jpeg "")  
  
UNC3886 VMware 0day漏洞攻击—Mandiant  
  
3 月，Mandiant还透露，某国 UNC3886 黑客在 2022 年年中的同一活动中使用了一个0day漏洞 (CVE-2022-41328)，以破坏 FortiGate 防火墙设备并部署以前未知的 Castletap 和 Thincrust 后门。  
  
  
他们利用入侵 Fortinet 设备并在 FortiManager 和 FortiAnalyzer 设备上获得持久性后获得的访问权限，在受害者网络中横向移动。  
  
  
在下一阶段，他们使用 VirtualPita 和 VirtualPie 恶意软件为 ESXi 和 vCenter 机器设置后门，以确保他们的恶意活动不被发现。  
  
  
Fortinet 说：“这次攻击具有很强的针对性，有一些迹象表明是首选政府或与政府相关的目标。”  
  
  
“利用该漏洞需要对 FortiOS 和底层硬件有深入的了解。自定义植入表明攻击者具有高级功能，包括对 FortiOS 的各个部分进行逆向工程。”  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg1xiaKkicyYcYva5oiaRZ0DP6iaXiaDsOSF8CWwcYkicGosS4P2nBiac3du8CTIaEqKjd3XQVibXibHicUpA5g/640?wx_fmt=jpeg "")  
  
Fortimanager 攻击流程—Mandiant  
  
这个网络间谍组织以集中攻击美国和 APJ 地区的国防、政府、电信和技术部门的组织而闻名。他们最喜欢的目标是没有端点检测和响应 (EDR) 功能的防火墙和虚拟化平台中的0day漏洞。  
  
  
根据 Mandiant 的说法，UNC3886 使用范围广泛的新恶意软件系列和专门为其目标平台量身定制的恶意工具，这表明其具有强大的研究能力以及理解目标设备所采用的复杂技术的非凡能力。  
  
  
Mandiant 首席技术官查尔斯卡马卡尔 (Charles Carmakal) 表示：“这是某国间谍活动的延续，已经持续了多年。这种攻击手段非常聪明，很难被发现。我们确信还有其他受害者正在处理这个问题，但他们还不知道。”告诉 BleepingComputer。  
  
  
“他们已经通过成熟的安全程序成功地入侵了国防、技术和电信组织。”  
  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylg1xiaKkicyYcYva5oiaRZ0DP6JHANdrC5iatqhrnzqsd9HV7kADiciaB3PRpPHRJnC1XCf9PXgkTO8Il3A/640?wx_fmt=png "")  
[【安全圈】门禁巨头遭勒索攻击，北约、阿里集团等多个实体受到影响](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037048&idx=1&sn=00d14c6a2140d48175d03c9557d0816d&chksm=f36ff3f8c4187aee538cb63b32de291e06eb23fd6e65ea730b2ec99ca75948f768b63ef43e37&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylg1xiaKkicyYcYva5oiaRZ0DP6U08aauvUIobOPu2w4OI7raay3jnf7icE6I4grlSR4WZZtGibMx0lorIQ/640?wx_fmt=jpeg "")  
[【安全圈】黑客分发问题Win10 ISO镜像，通过EFI分区隐藏窃取加密货币](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037048&idx=2&sn=1ceacf11646b25e0496b6dd473443e8e&chksm=f36ff3f8c4187aee34edd129af2e6692c2379c79569da38d9503242f53d05378e41dee895fc3&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylg1xiaKkicyYcYva5oiaRZ0DP6sYbibSDbuI9TooCldx54FBlcicKY9hZGqjKKqR7fferganRokR2iczQTg/640?wx_fmt=png "")  
[【安全圈】Windows和MacOS平台上发现多个Zoom漏洞，已发布补丁](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652037048&idx=3&sn=ddc69e0ed488f7c458907d3b7cc6ca78&chksm=f36ff3f8c4187aee3534aea9cdd28681ec8f24432f2d50d5c89d8f0c41822066c43934a969ce&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylg1xiaKkicyYcYva5oiaRZ0DP6EYaXJ4ht1YiaWwrQrdYIicoPKkt8bic2hOESgnric3YmOI4RZL4978v7xA/640?wx_fmt=png "")  
[【安全圈】苹果将在 iOS 17 引入新功能，Safari隐私浏览有重大更新](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652036961&idx=1&sn=8260235f07dc3ccd4d0c1819ce664842&chksm=f36ff321c4187a37ead00b498358b126a9672732cd26567e18c05ec610f4e763f46157a84064&scene=21#wechat_redirect)  
  
  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEDQIyPYpjfp0XDaaKjeaU6YdFae1iagIvFmFb4djeiahnUy2jBnxkMbaw/640?wx_fmt=png "")  
  
**安全圈**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
