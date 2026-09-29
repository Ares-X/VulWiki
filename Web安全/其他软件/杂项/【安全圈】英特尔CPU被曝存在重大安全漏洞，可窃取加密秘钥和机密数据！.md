---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】英特尔CPU被曝存在重大安全漏洞，可窃取加密秘钥和机密数据！   
 安全圈   2023-08-12 19:00  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/aBHpjnrGylgSxa9I02IBd3bgLEhwfJCeRibw3LEjMujeAhD2CvyiaVCZJVHGHODbkPx3pViaX0sAibZsDun6sicUzdQ/640?wx_fmt=jpeg "")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
   
  
今日，谷歌的一位高级研究科学家利用一个漏洞设计了一种新的CPU攻击方法，该漏洞可影响多个英特尔微处理器系列，并允许窃取密码、加密密钥以及共享同一台计算机的用户的电子邮件、消息或银行信息等私人数据。  
  
  
该漏洞被追踪为CVE-2022-40982，是一个瞬态执行侧通道问题，影响基于英特尔微架构Skylake到Ice Lake  
的所有处理器。  
  
  
攻击者利用这个安全漏洞可以提取受软件保护扩展(SGX)保护的敏感信息。SGX是英特尔基于硬件的内存加密技术，可以将内存中的代码和数据与系统上的软件分离开来。  
  
  
SGX目前仅在服务器中央处理单元上得到支持，并为那些操作系统都无法访问的软件提供可信的隔离环境。  
  
  
**收集秘密数据**  
  
  
  
谷歌研究员Daniel Moghimi发现了这个漏洞，并将其报告给了英特尔，他说他的垮台攻击技术利用了gather指令，“在推测执行期间泄露了内部矢量寄存器文件的内容”。  
  
  
Gather是英特尔处理器内存优化的一部分，用于加速访问内存中的分散数据。然而，正如Moghimi在今天发表的一篇技术论文中解释的那样：“gather指令似乎使用了一个跨同级CPU线程共享的临时缓冲区，它将数据暂时转发给后来依赖的指令，数据属于不同的进程，并在同一核心上运行gather执行。”  
  
  
Moghimi开发了两种攻击技术，一种是收集数据采样(GDS)，另一种是收集值注入(GVI)，它将GDS与2020年披露的负载值注入(LVI)技术相结合。  
  
  
通过使用GDS技术，Moghimi 能够在受控虚拟机之外的另一个虚拟机（VM）上窃取 AES 128 位和 256 位加密密钥，每个系统都位于同一 CPU 内核的同胞线程上。  
  
  
研究人员可在10 秒内一次性窃取 8 个字节，最终成功窃取了 AES 圆形密钥，并将它们组合起来破解了加密。对于 100 个不同的密钥，AES-128 的首次攻击成功率为 100%。对 AES-256 的首次攻击成功率为 86%。  
  
  
研究人员指出，尝试失败意味着恢复整个密钥需要多次运行攻击，因为主密钥的数据不会在 10 秒内频繁出现。  
  
  
除了加密密钥外，Moghimi还提供了 GDS 攻击的变种，这种攻击可以窃取静态的任意数据，因为在两种情况下，CPU 会将这类信息预取到 SIMD  
 寄存器缓冲区中。  
  
  
**威胁评估和微代码性能影响**  
  
  
  
Moghimi 指出，Downfall 攻击要求攻击者与受害者在同一个物理处理器内核上。  
但恶意软件等本地程序有可能利用这一漏洞窃取敏感信息。  
  
  
去年 8 月，英特尔发现了 Downfall/GDS 漏洞，并与 Moghimi 合作进行了研究，并且目前提供了微码更新来缓解这一问题。  
  
  
为了给原始设备制造商（OEM）和通信服务提供商（CSP）留出测试和验证解决方案的时间，并为他们的客户准备必要的更新，有关该漏洞的细节保密了近一年。  
  
  
英特尔告诉 BleepingComputer，该问题不会影响 Alder Lake、Raptor Lake 和 Sapphire Rapids，Downfall 会影响以下三个系列的处理器：  
  
- Skylake 系列（Skylake、Cascade Lake、Cooper Lake、Amber Lake、Kaby Lake、Coffee Lake、Whiskey Lake、Comet Lake）  
  
- 虎湖系列  
  
- 冰湖系列（Ice Lake、Rocket Lake）  
  
英特尔修复和响应工程副总裁 Vivek Tiwari 认为，试图在受控实验室环境之外利用这一点将是一项复杂的工作。  
  
  
英特尔在给 BleepingComputer 的一份声明中表示，客户可以查看公司提供的风险评估指南，并决定通过 Windows 和 Linux 以及虚拟机管理器（VMM）中的可用机制禁用微码缓解功能。  
  
  
做出这样的决定可能是出于对Downfall/GDS缓解措施可能带来的性能问题的担忧，也可能是因为该问题对环境不构成威胁。  
  
  
英特尔为客户提供了威胁评估和性能分析信息，其结论是在某些环境中该问题的影响可能很小。在频繁执行收集指令的情况下，存在潜在影响，这是高性能计算（HPC）环境所特有的。  
  
  
不过，该芯片制造商表示，由于攻击的条件和这些环境的典型配置，该问题在高性能计算环境中可能不会被视为威胁。  
  
  
例如，攻击者需要在与目标相同的物理内核上运行，并能够运行不受信任的代码等，而这些在这些环境中并不常见。  
  
  
**基于软件的缓解措施**  
  
  
  
要消除 Downfall/GDS 攻击的风险，需要重新设计硬件。  
虽然基于软件的替代方案是存在的，不过这些方案都有注意事项，而且只能暂时解决问题。  
  
  
Moghimi 提出了四种这样的替代方案，其中三种有明显的缺点：  
  
- 禁用同步多线程（SMT）可部分缓解 GDS 和 GVI 攻击，但削减超线程会带来 30% 的性能损失，而且跨上下文切换  
的泄漏仍会发生  
  
- 通过操作系统和编译器禁止受影响的指令，以防止它们向收集泄密；缺点是一些应用程序可能会被打乱，而且如果漏掉某些指令，泄密仍会发生  
  
- 禁用收集。缺点是使用该指令的应用程序可能会变得缓慢甚至崩溃  
  
- 防止收集指令后的瞬时数据转发（添加加载栅栏，如 lfence 指令）可减轻 Downfall，这也是英特尔在最新微代码更新中采用的解决方案。  
  
不过，Moghimi 表示，要创建这样的工具并不容易，因为它们需要更好地覆盖硬件和支持的指令，鉴于硬件的复杂性和专有障碍，这是一项具有挑战性的任务。  
  
  
这位研究人员发布了 Downfall 的代码，以便其他人可以查看和试用。此外，Daniel Moghimi 还计划在美国黑帽安全大会上讨论 Downfall 漏洞和攻击技术。  
  
  
英特尔发布了 CVE-2022-40982 的安全公告，目前的严重程度为 6.5 级。基于此漏洞，该公司还提供了一份技术文件，以及 Moghimi 关于 Downfall 的采访内容。  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliackaUDs6kCF3x9G5rtKpMvRbP1QnAv3hpo3dQiaib0GxuZB56JDUGLj1ibjmDUfmpAfpeHNKicD94OicA/640?wx_fmt=png "")  
[【安全圈】北海某网站存在数据泄密问题，被罚20万！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041765&idx=1&sn=63bbc0672f127d0f948d07c1d047ec49&chksm=f36fde65c41857736b0facb78782a64cc8fd1edad7c40464f4ca254698a45b6b31fd5baac8da&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliackaUDs6kCF3x9G5rtKpMvmlZicRYC2M57rAiabUCMwZh7QNCyiaRrWJ5bekQZ7qDeZx2Yj2TqxZRUA/640?wx_fmt=png "")  
[【安全圈】重拳出击！国家安全机关破获美国中央情报局间谍案](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041765&idx=2&sn=c7bb3d4f24dfdfef8ee2044b888c3ac4&chksm=f36fde65c418577314434cdc1a795b02e3f7d5cb088c187f2bfc1c32ea8a1a1edde118090f35&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliackaUDs6kCF3x9G5rtKpMvO2T1dMynJgfLCPcDtk1wUMynibFDQG9fArRGzuqNvaAIuJDS0zvbKiaw/640?wx_fmt=png "")  
[【安全圈】EoL-Zyxel 路由器五年前的漏洞仍在被利用](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041765&idx=3&sn=7122da67020670cfad662194bcef4799&chksm=f36fde65c41857735c9a6201de60c3a60ea19f6641dc350828879ac639e3ee59ba1ba92046d2&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliackaUDs6kCF3x9G5rtKpMvx7qb24PsKnYoqU2BnBzdibPxaud509mahS1xib0Bco1LrYzlCD8WyvAA/640?wx_fmt=png "")  
[【安全圈】警方侦破“AI换脸”诈骗案，515人落网！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652041765&idx=4&sn=f3f16ba70f365c42440afd7468ae74c3&chksm=f36fde65c418577369bff90d51f1274a8d152f4bd2a132d04ac82829e8c056e6aaa80d8a5071&scene=21#wechat_redirect)  
  
  
  
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
