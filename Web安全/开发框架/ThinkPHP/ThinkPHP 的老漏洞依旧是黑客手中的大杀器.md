---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  ThinkPHP 的老漏洞依旧是黑客手中的大杀器   
Avenger  FreeBuf   2024-10-05 09:31  
  
##   
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icaqFo7ZajeZ5LicFLVX35hGhz6uC6waHcJHxicBHHHsuzQkiaZqc4AjbGAP4oY7fyFKPSl8IbmTrvkA/640?wx_fmt=jpeg&from=appmsg "")  
  
  
研究人员发现安全领域出现了令人不安的趋势：  
攻击者不仅对新披露的漏洞十分感兴趣，对已知的漏洞也丝毫不放过，尽管有些漏洞已经存在了好些年头，攻击者仍然能够通过老漏洞成功完成攻击。  
  
  
典型的例子就是 ThinkPHP 远程代码执行漏洞 CVE-2018-20062 和 CVE-2019-9082，距今已有六年的时间了，攻击者仍然在使用这些漏洞进行攻击。  
  
  
研究人员最早在 2023 年 10 月 17 日首次检测到此类攻击，与传统意义上的 POC 不同，攻击者会从控制的 C&C 服务器下载经过混淆的 Shell 脚本。虽然仅仅持续了几天小范围的攻击就销声匿迹，但 2024 年 4 月攻击死灰复燃且规模比之前大得多。  
##   
  
**ThinkPHP**  
  
  
## ThinkPHP 是中文社区开源的 Web 应用框架，主要用于开发基于 PHP 的 Web 应用。该框架提供了一组库、组件和工具，通过 MVC 架构简化 Web 应用的构建过程。  
  
  
CVE-2018-20062 与 CVE-2019-9082 是在 ThinkPHP 旧版本中发现的漏洞，不仅是影响 ThinkPHP 还有基于 ThinkPHP 二次开发的 CMS，如 NoneCMS 与 open-source BMS。这两个漏洞都可以让攻击者可以在失陷主机上远程执行代码，从 2018 年被披露已经长达六年。  
  
  
**在野攻击**  
  
  
## 研究人员发现中国境内的失陷主机在尝试下载名为 public.txt 的文件，恶意文件将以 roeter.php 为名保存在是失陷主机中。从名称上来看，应该是 router 单词拼写错了。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icaqFo7ZajeZ5LicFLVX35hGu9iaGHxmvgsvyFa16waich6gibw2EdYyBiaHzk4ZibWJXS8duVzLEVibTqLQ/640?wx_fmt=jpeg&from=appmsg "")  
  
在野攻击  
  
  
下载的文件包含一个经过混淆的 WebShell 脚本，该脚本使用 ROT13 算法进行混淆。尽管攻击者通过很长的十六进制字符串进行混淆，但却选择了非常简单的密码（admin）作为 WebShell 的密码。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icaqFo7ZajeZ5LicFLVX35hGgPHic1Vr3jMekHp4uOVJ4QDwsiacicFI1oc5xFaiaAbkcnpKjL6EQHEraw/640?wx_fmt=jpeg&from=appmsg "")  
  
混淆的 WebShell  
  
  
攻击从 Zenlayer 云提供商（ASN 21859）的 IP 地址发起，这些服务器主要位于中国香港。分析人员对部署后门的服务器进行了检查，发现该服务器也感染了相同的 WebShell。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icaqFo7ZajeZ5LicFLVX35hG7lezBu6JEJQ3h29Qd1iafHZh6rjIf9j4CnvjFNvCvy8triaVlSyRF0Zw/640?wx_fmt=jpeg&from=appmsg "")  
  
失陷主机被用作分发服务器  
  
  
这表明该服务器很可能是攻击基础设施中的一个节点，攻击者通过这种方式来降低运营成本。并且这样也可以让执法部门更难以关停服务器，运营商不会轻易关闭有合法服务的服务器。  
  
  
**Dama WebShell**  
  
  
## 该 WebShell 具备浏览文件系统、修改文件时间戳等高级功能，攻击者借此实现混淆的功能。东欧和西欧的网络犯罪分子经常使用英文 WebShell（如 WSO-GN WebShell），但 Dama WebShell 的界面语言是繁体中文。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icaqFo7ZajeZ5LicFLVX35hGU0Qth3g52IvB3arjkThbs8wUR9u8WpaMorVVM9KMkN0Rpgpkeic7nxA/640?wx_fmt=jpeg&from=appmsg "")  
  
用户界面  
  
  
该 WebShell 可以将文件上传到服务器来收集核心的系统数据，如操作系统版本与 PHP 信息，这可以帮助攻击者实施提权漏洞攻击。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icaqFo7ZajeZ5LicFLVX35hGluShQmicGKlMbRSia8qwqCEcqkrw8MicQpBaJVzo74GiaEPiaPhiaI2sg1AQ/640?wx_fmt=jpeg&from=appmsg "")  
  
与数据库进行交互  
  
  
攻击者会利用包括端口扫描等功能对数据库和服务器上的数据进行访问。Dama WebShell 还提供了多种提权方法，如绕过已被禁用的敏感 PHP 函数进行沙盒逃逸最终执行 Shell 命令。  
  
  
Dama WebShell 还可以利用 Windows 任务调度功能配置 WMI 添加高权限用户。尽管配备了用于直接解释执行代码的 PHP 解释器，但 Dama WebShell 并不支持通过命令行执行系统命令。  
##   
  
**总结**  
  
  
##   
  
尽管攻击者已经了解这些漏洞很久很久，但仍然在继续使用并且能够攻击成功。这凸显了组织在识别易受攻击资产和升级补丁管理上，持续面临巨大挑战。  
  
  
研究人员发现并非所有的受害者都使用了 ThinkPHP，攻击者可能不加区分进行了广泛的攻击。攻击者一方面对恶意脚本进行了混淆处理，另一方面也有很低级技术的表现，这二者十分割裂。当然，攻击技术先进并不代表着背后的攻击者也很熟练。  
  
  
【  
FreeBuf粉丝交流群招新啦！  
  
在这里，拓宽网安边界  
  
甲方安全建设干货；  
  
乙方最新技术理念；  
  
全球最新的网络安全资讯；  
  
群内不定期开启各种抽奖活动；  
  
FreeBuf盲盒、大象公仔......  
  
扫码添加小蜜蜂微信回复「加群」，申请加入群聊  
】  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&retryload=2&tp=webp "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oQ6bDiaGhdyodyXHMOVT6w8DobNKYuiaE7OzFMbpar0icHmzxjMvI2ACxFql4Wbu2CfOZeadq1WicJbib6FqTyxEx6Q/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ61icYlLmBLDpdYEZ7nIzpGovpHjtxITB6ibiaC3R5hoibVkQsVLQfdK57w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&retryload=2&tp=webp "")  
> https://www.akamai.com/blog/security-research/2024-thinkphp-applications-exploit-1-days-dama-webshell  
>   
>   
>   
>   
>   
>   
>   
>   
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651302087&idx=1&sn=29d91904d6471c4b09f4e574ba18a9b2&chksm=bd1c3a4c8a6bb35aa4ddffc0f3e2e6dad475257be18f96f5150c4e948b492f32b1911a6ea435&token=21436342&lang=zh_CN&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651302006&idx=1&sn=18f06c456804659378cf23a5c474e775&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=other&wxfrom=5&wx_lazy=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
