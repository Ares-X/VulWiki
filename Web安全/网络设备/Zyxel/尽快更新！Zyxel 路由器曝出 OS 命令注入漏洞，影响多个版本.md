---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  尽快更新！Zyxel 路由器曝出 OS 命令注入漏洞，影响多个版本   
小薯条  FreeBuf   2024-09-06 19:12  
  
****  
  
近日，Zyxel 发布安全更新，以解决影响其多款商用路由器的关键漏洞，该漏洞可能允许未经认证的攻击者执行操作系统命令注入。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR39My17X1N4pYFbiaE33C9NXQ2kLGB4j1icLmjCZicTRXLCgX0s5ucXpHFEdKibtFJ5ByENerqt3p4lkGg/640?wx_fmt=jpeg&from=appmsg "")  
  
  
该漏洞被追踪为 CVE-2024-7261，CVSS v3 得分为 9.8，是一个输入验证故障，由用户提供的数据处理不当引起，允许远程攻击者在主机操作系统上执行任意命令。  
  
  
Zyxel 警告称某些 AP 和安全路由器版本的 CGI 程序对参数 “host ”中特殊元素的中和不当，可能允许未经认证的攻击者通过向有漏洞的设备发送伪造的 cookie 来执行操作系统命令。  
  
  
受 CVE-2024-7261 影响的 Zyxel 接入点 (AP) 如下：  
  
- NWA 系列：NWA50AX、NWA50AX PRO、NWA55AXE、NWA90AX、NWA90AX PRO、NWA110AX、NWA130BE、NWA210AX、NWA220AX-6E | 7.00 之前的所有版本都存在漏洞，请升级至 7.00(ABYW.2) 及更高版本、NWA1123-AC PRO | 6.28 之前的所有版本易受攻击，请升级至 6.28(ABHD.3) 及更高版本、NWA1123ACv3、WAC500、WAC500H | 6.70 之前的所有版本易受攻击，请升级至 6.70(ABVT.5) 及更高版本  
  
- WAC 系列：WAC6103D-I、WAC6502D-S、WAC6503D-S、WAC6552D-S、WAC6553D-E | 6.28 之前的所有版本易受攻击，请升级至 6.28(AAXH.3) 及更高版本  
  
- WAX 系列：WAX300H、WAX510D、WAX610D、WAX620D-6E、WAX630S、WAX640S-6E、WAX650S、WAX655E | 7.00 之前的所有版本都存在漏洞，请升级至 7.00(ACHF.2) 及更高版本。  
  
- WBE 系列：WBE530、WBE660S | 7.00 之前的所有版本都存在漏洞，请升级至 7.00(ACLE.2) 及更高版本  
  
Zyxel 表示，运行 V2.00(ACIP.2)的安全路由器 USG LITE 60AX 也受影响，但该型号已通过云自动更新到 V2.00(ACIP.3)，其中实施了 CVE-2024-7261 的修补程序。  
  
  
**更多 Zyxel 修复**  
  
  
## Zyxel 还针对 APT 和 USG FLEX 防火墙中的多个高严重性缺陷发布了安全更新。摘要如下：  
  
- **CVE-2024-6343：**CGI 程序中的缓冲区溢出可能导致通过身份验证的管理员发送伪造的 HTTP 请求，从而导致 DoS。  
  
- **CVE-2024-7203：**验证后命令注入允许通过伪造的 CLI 命令执行操作系统命令。  
  
- **CVE-2024-42057：**在 IPSec VPN 中的指令注入，允許未認證的攻擊者在「使用者為本-PSK」模式下，利用偽造的長使用者名稱執行作業系統指令。  
  
- **CVE-2024-42058：**取消引用空指针可通过未认证攻击者发送的伪造数据包导致 DoS。  
  
- **CVE-2024-42059：**身份验证后命令注入允许身份验证的管理员通过 FTP 上传伪造的压缩语言文件执行操作系统命令。  
  
- **CVE-2024-42060：**認證後指令注入漏洞，令已認證的管理員可透過上載精心製作的內部使用者協議檔案，執行作業系統指令。  
  
- **CVE-2024-42061：**dynamic_script.cgi "中的反射 XSS 允许攻击者诱骗用户访问伪造的 URL，从而可能泄漏基于浏览器的信息。  
  
上述漏洞中 CVE-2024-42057 值得特别关注 ，它是 IPSec VPN 功能中的命令注入漏洞，无需验证即可被远程利用。  
  
  
利用漏洞所需的特定配置要求会降低其严重性，包括在基于用户的 PSK 身份验证模式下配置设备，以及用户的用户用户名长度超过 28 个字符。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR39My17X1N4pYFbiaE33C9NXQUASWmAVY2ujZf8zzJnvmic4cghv81zM0r7M7z0M7ntxia4DspveIvMaA/640?wx_fmt=jpeg&from=appmsg "")  
  
图源：Zyxel 官网  
  
  
有关其他受影响的防火墙更多详细信息，可具体查看 Zyxel 公告。  
  
  
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
> https://www.bleepingcomputer.com/news/security/zyxel-warns-of-critical-os-command-injection-flaw-in-routers/  
  
>   
>   
>   
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
[](https://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494804&idx=1&sn=3f8abfd1c27c79f9a511cd9e9f3b8443&chksm=ce1f160bf9689f1d4d0102e41e9ebe4c36239bdf77ba1939742f917e9d839397af22b7d08896&token=1056323174&lang=zh_CN&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494785&idx=1&sn=9fb76edd4009af6f5cfdf4c7fc19ae1b&chksm=ce1f161ef9689f0803457ac72b1337a2b371c4d53779f73d7ca5278ff497255a512e4f1ccf96&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
