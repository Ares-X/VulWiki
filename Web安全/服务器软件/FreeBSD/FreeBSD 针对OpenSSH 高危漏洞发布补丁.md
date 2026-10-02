---
cve: "CVE-2024-7589"
source: "gelusus/wxvl 公众号漏洞文库"
title: "FreeBSD 针对OpenSSH 高危漏洞发布紧急补丁"
product: "FreeBSD OpenSSH blacklistd集成"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-7589"
referenced_identifiers: "CVE-2024-6387"
identifier_role: "primary"
prerequisites: "FreeBSD特定sshd信号路径，超LoginGraceTime；缓解设0会增加DoS风险"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-9dbe4cbb9b9157d4f7fe319f"
entity_id: "ve-9dbe4cbb9b9157d4f7fe319f"
schema_version: "1"
---

# FreeBSD 针对OpenSSH 高危漏洞发布紧急补丁

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：FreeBSD特定sshd信号路径，超LoginGraceTime；缓解设0会增加DoS风险
- 证据范围：前半区分FreeBSD变体，但后半把上游6387版本表/修复与主漏洞混排，易导致错误修补

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 称所有<9.8p1均受影响与自己列4.4p1至8.5p1不受影响直接冲突
- 不能用上游9.8p1代替FreeBSD-SA补丁级别
- 1400万暴露不等同已验证受影响实例；深度学习提高成功率是推测
- 缺FreeBSD官方公告链接，landian链接尾混入中文标点编码

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

小薯条  FreeBuf   2024-08-13 19:03  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
  
近日，FreeBSD 项目的维护者针对OpenSSH 高危漏洞发布了紧急补丁。该漏洞被追踪为 CVE-2024-7589，CVSS 得分为 7.4（最高分为 10.0）。通过利用该漏洞，黑客能够在权限提升的情况下远程执行任意代码。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3ib1LNQnAqtRibqVCFXOEsmicA3HttgBf3EruOH8Fn1TwBFrkKiaBGT0521icSbibZ8YiawZ9yxicotzA2tQw/640?wx_fmt=png&from=appmsg "")  
  
  
根据上周发布的一份公告，sshd(8) 中的一个信号处理器可能会调用一个不安全的异步信号记录函数。而当客户端未在 LoginGraceTime 秒数（默认为 120 秒）内通过身份验证时，将调用该信号处理程序。该信号处理程序在 sshd(8) 的特权代码上下文中执行，该代码未被沙盒化，并以完全 root 权限运行。  
  
  
OpenSSH 是安全外壳（SSH）协议套件的实现，为各种服务（包括远程外壳访问）提供加密和验证传输。  
  
  
CVE-2024-7589 被描述为上月初曝光的 regreSSHion（CVE-2024-6387）问题的「另一个实例」。项目维护者表示，本例中的错误代码来自 FreeBSD OpenSSH 中 blacklistd 的集成。  
  
  
由于在有特权的 sshd(8) 上下文中调用的函数不是异步信号安全的，因此存在一个条件，确定的攻击者可能能够利用这个条件以 root 身份执行未经验证的远程代码。因此强烈建议 FreeBSD 用户更新到支持的版本并重启 sshd，以减少潜在威胁。  
  
  
在无法更新 sshd(8) 的情况下，可以通过在 /etc/ssh/sshd_config 中将 LoginGraceTime 设置为 0 并重新启动 sshd(8) 来解决竞争条件问题。虽然这一更改使守护进程容易受到拒绝服务的影响，但却能防止远程代码执行。  
  
  
**上月曝出的高危漏洞，影响1400万台服务器**  
  
  
#   
  
今年7月，网络安全公司 Qualys 威胁研究团队公布了 OpenSSH 中的高危远程代码执行漏洞，该漏洞编号为 CVE-2024-6387，扫描显示暴露在公网上的受影响的服务器超过 1400 万台。  
  
  
值得注意的是此漏洞曾经出现过但在 2006 年被修复，在 2020 年发布的 OpenSSH 新版本中又重新出现了，所以受影响的 OpenSSH 版本略微有些复杂。  
  
  
受影响的 OpenSSH 版本：  
  
- 低于 4.4p1 版 (不含此版本)：受影响  
  
- 高于 4.4p1 但低于 8.5p1 (不含此版本)：不受影响  
  
- 8.5p1 及后续版本到 9.8p1 (不含此版本)：受影响  
  
考虑到 8.5p1 及之前的版本已经非常老旧估计使用量比较低，因此这里可以直接以 8.5p1 版作为分水岭，若系统使用的 OpenSSH 版本为 9.8p1 以下版本那就受到影响，用户应当尽快更新到 9.8p1 及后续版本。  
  
  
攻击者利用此漏洞实际上可以以最高权限执行任意代码，因此一旦得手就可以获得整个系统和服务器的控制权，无论是安装恶意软件还是窃取数据都是轻轻松松完成。  
  
  
同时 Qualys 还提到攻击者还可以借助此漏洞获得的权限绕过防火墙、入侵监测系统和日志记录机制等关键安全机制，即可以通过这些方式避免被发现并隐藏其活动。  
  
  
然而由于该漏洞具有远程竞争条件特性，因此实际利用的话也有难度，攻击者可能需要尝试很多次才可以成功攻击，这会导致内存损坏并且要克服地址空间布局随机化 (ASLR)。  
  
  
基于以上问题有能力的攻击者可以利用深度学习技术提高漏洞利用率，所以对用户、开发者、企业来说应当尽快检查更新获取 OpenSSH 最新版。  
  
  
目前已经有部分 Linux 系统开发商推出安全更新修复这一漏洞，如果用户尚未检查到更新请换个时候再次检查更新，尽可能第一时间修复此漏洞。  
  
  
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
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ich6ibqlfxbwaJlDyErKpzvETedBHPS9tGHfSKMCEZcuGq1U1mylY7pCEvJD9w60pWp7NzDjmM2BlQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oQ6bDiaGhdyodyXHMOVT6w8DobNKYuiaE7OzFMbpar0icHmzxjMvI2ACxFql4Wbu2CfOZeadq1WicJbib6FqTyxEx6Q/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ61icYlLmBLDpdYEZ7nIzpGovpHjtxITB6ibiaC3R5hoibVkQsVLQfdK57w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
> https://thehackernews.com/2024/08/freebsd-releases-urgent-patch-for-high.html  
> https://www.landiannews.com/archives/104739.html%E3%80%81  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3icEEJemUSFlfufMicpZeRJZJ7JfyOicficFrgrD4BHnIMtgCpBbsSUBsQ0N7pHC7YpU8BrZWWwMMghoQ/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494714&idx=1&sn=fe28fee45c1508a1645fd04c2b18ca82&chksm=ce1f16a5f9689fb3996529f7738a1b7dc3960f3fc5bd31c7d1505dbd3a179d5b3bfd6c66e5f3&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494663&idx=1&sn=8220aadcd0c1496c6ecbae5bc5fddee1&chksm=ce1f1698f9689f8e004a21a851d5d2987d45054bf636fad5abba5b977ae3ab342ce2a73b26f8&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
