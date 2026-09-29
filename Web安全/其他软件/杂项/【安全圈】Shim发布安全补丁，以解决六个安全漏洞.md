---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Shim发布安全补丁，以解决六个安全漏洞   
 安全圈   2024-02-08 19:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=png&from=appmsg "微信图片_20230927171534.png")  
  
  
**关键词**  
  
  
  
安全补丁  
  
  
shim 的维护者发布了 15.8 版，以解决六个安全漏洞，包括一个可能为特定情况下的远程代码执行铺平道路的关键错误。  
  
该漏洞被跟踪为 CVE-2023-40547（CVSS 评分：9.8），可被利用来实现安全启动绕过。Microsoft安全响应中心（MSRC）的Bill Demirkapi因发现并报告了该错误而受到赞誉。  
  
使用 shim 的主要 Linux 发行版（如 Debian、Red Hat、SUSE 和 Ubuntu）都发布了针对该安全漏洞的公告。  
  
“在解析HTTP响应时，填充码的http引导支持（httpboot.c）信任攻击者控制的值，导致完全受控的越界写入原语，”甲骨文的Alan Coopersmith在开源安全邮件列表oss-security上分享的一条消息  
中指出  
。  
  
  
Demirkapi在上个月底在X（前身为Twitter）上分享的一篇文章中表示，该漏洞“存在于过去十年中签名的每个Linux引导加载程序中”。  
  
shim 是指一个“普通”软件包，旨在用作统一可扩展固件接口 （UEFI） 系统上的第一阶段引导加载程序。  
  
固件安全公司 Eclypsium 表示，CVE-2023-40547“源于 HTTP 协议处理，导致越界写入，可能导致系统完全受损。  
  
在假设的攻击场景中，同一网络上的威胁参与者可利用该缺陷加载易受攻击的填充码引导加载程序，或由具有足够权限的本地攻击者来操作 EFI 分区上的数据。  
  
该公司补充说：“攻击者可以执行MiTM（中间人）攻击，并拦截受害者与用于提供文件以支持HTTP启动的HTTP服务器之间的HTTP流量。“攻击者可能位于受害者和合法服务器之间的任何网段上。  
  
也就是说，在启动过程中（在主操作系统启动之前）获得执行代码的能力，使攻击者可以全权部署隐蔽的引导工具包，从而几乎可以完全控制受感染的主机。  
  
shim 版本 15.8 中修复的其他五个漏洞如下 -  
  
  
- CVE-2023-40546（CVSS 分数：5.3） - 打印错误消息时越界读取，导致拒绝服务 （DoS） 情况  
  
- CVE-2023-40548（CVSS 分数：7.4）- 针对 32 位处理器编译时，填充码中存在缓冲区溢出，可能导致启动阶段崩溃或数据完整性问题  
  
- CVE-2023-40549（CVSS 分数：5.5） - 验证码函数中的越界读取可能允许攻击者通过提供格式错误的二进制文件来触发 DoS  
  
- CVE-2023-40550（CVSS 分数：5.5）- 验证可能导致信息泄露的安全启动高级目标 （SBAT） 信息时出现越界读取  
  
- CVE-2023-40551（CVSS 分数：7.1） - 解析 MZ 二进制文件时出现越界读取，导致敏感数据崩溃或可能泄露  
  
  
  
“利用此漏洞的攻击者在加载内核之前获得了对系统的控制权，这意味着他们拥有特权访问，并能够规避内核和操作系统实施的任何控制，”Eclypsium指出。  
  
  
  
   END    
  
  
阅读推荐  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgIAOm9pnrvQCLbj8MeBwqZOFBPDM6yVMiapW4UU8G1s1FMCbhL4pbLqcw8ib7EHic2E2XmlhicFDDAzQ/640?wx_fmt=jpeg "")  
[【安全圈】泄露数据达19.1GB！某软件公司因开发系统测试阶段未加密被罚](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652053836&idx=1&sn=38a5773291a5e1b336e0c0ba3b4ec3c7&chksm=f36e0d0cc419841a0101dde229f1ebd206d3f37179cece4e298121b35932572be5479f758f23&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgIAOm9pnrvQCLbj8MeBwqZjpfBxzHPa0Tz40Xhmls7hbbIveHPf7X0x1z2gFGHS8IQqL5vjvHjjQ/640?wx_fmt=jpeg "")  
[【安全圈】谷歌同意支付3.5亿美元解决个人数据泄露诉讼](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652053836&idx=2&sn=092f435b867c3068463dd203ac9583db&chksm=f36e0d0cc419841a7c2c978e2484556731dd0898cd98658ee281f7b1597a27253d5b423ab3e4&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgIAOm9pnrvQCLbj8MeBwqZoHBHhAzwoHX2lMCZQdG4LsjgG97FXicjiaPGVLDkaxSSghtxMwCUJQZA/640?wx_fmt=jpeg "")  
[【安全圈】注意！Facebook出现虚假招聘广告传播恶意软件](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652053836&idx=3&sn=30fbc2fdf9242e50688a0a2b1edd5948&chksm=f36e0d0cc419841a7331615524575c843a15f35d6b2c56b1a1d101b2b54aad4dcb0b9db9438f&scene=21#wechat_redirect)  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aBHpjnrGylgIAOm9pnrvQCLbj8MeBwqZAzTozMXIdwy38kcBpGzFsuhUjAibR5o5ibM5RiaaCPkvAYrkLtvSTia1qg/640?wx_fmt=jpeg "")  
[【安全圈】依靠 SQL 注入攻击，黑客从 65 个网站窃取数百万条用户记录](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652053836&idx=4&sn=581af170500a6d55ca3390217c454390&chksm=f36e0d0cc419841a3ad83431d13d38379fc640718c54268b653959624ef608ed45cee925873e&scene=21#wechat_redirect)  
  
  
  
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
