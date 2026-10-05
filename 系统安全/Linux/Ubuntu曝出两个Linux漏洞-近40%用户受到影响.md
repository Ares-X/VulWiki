---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-32629;CVE-2023-2640"
identifier_role: "primary"
primary_identifiers: "CVE-2023-32629;CVE-2023-2640"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Ubuntu曝出两个Linux漏洞-近40%用户受到影响"
product: "Ubuntu定制OverlayFS"
record_type: "roundup"
document_type: "双漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地低权限，Ubuntu特定OverlayFS补丁组合；未给内核/发行版具体范围"
side_effects: "更新后重启提醒有价值；尾部推荐和动画噪声可剥离"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Ubuntu%E6%9B%9D%E5%87%BA%E4%B8%A4%E4%B8%AALinux%E6%BC%8F%E6%B4%9E-%E8%BF%9140%25%E7%94%A8%E6%88%B7%E5%8F%97%E5%88%B0%E5%BD%B1%E5%93%8D.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-77666de7944980028a06ad31"
entity_id: "ve-77666de7944980028a06ad31"
schema_version: "1"
---

# Ubuntu曝出两个Linux漏洞-近40%用户受到影响

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Ubuntu定制OverlayFS
- 文献类型：双漏洞新闻
- 版本、权限及部署边界：本地低权限，Ubuntu特定OverlayFS补丁组合；未给内核/发行版具体范围
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter缺两主CVE；32629被归内存管理子系统与后文OverlayFS主题不一致需核对
2. 包括Ubuntufork在内其他发行版安全的全称结论不可靠，应按是否继承易受影响补丁确认
3. 40%用户/4000万用户无数据来源和时间基准，不能作为可靠影响规模
4. Wiz/BleepingComputer/Ubuntu公告仅名字无实际URL，PoC武器化声明无证据链接
5. 更新后重启提醒有价值；尾部推荐和动画噪声可剥离

### 操作风险

更新后重启提醒有价值；尾部推荐和动画噪声可剥离

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=1&sn=5c9ef0d7dcb2b1b63eca5db4c4eed405&chksm=f36fc0fac41849ec4a8a80658dfa5379ff9ec33e94cf57cfbb094586d90792f7ab83fd20a15c&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=2&sn=1709ae32ec52bb9307dd7c088ede4ccd&chksm=f36fc0fac41849ecbedef074d12e6a3b4ecb1b44605e1a815610f0f8b393b02d37ac08664e15&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=3&sn=513ca6d7945c3a9d8c66ea8a681b4ee3&chksm=f36fc0fac41849ecfbf7c4760fd771120e56d4fdcebad3fc2420be2f610a95a960c8eaa8956a&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=4&sn=a6770cb53a5583f0e8b921778dacfca5&chksm=f36fc0fac41849ecaefef66e916873551746f8c0e7a59be9c75cb86aab177b0f7d36120b18f8&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 安全圈   2023-07-27 19:00  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/393b4e080a4e28dc4d77ff8bf741ab287cf502d83934ee8e3545efa4ceaea3cd.jpg "")  
  
  
**关键词**  
  
  
  
安全漏洞  
  
  
  
Bleeping Computer 网站披露，Wiz 研究人员 s.Tzadik 和 s.Tamari 发现 Ubuntu 内核中存在两个 Linux 漏洞 CVE-2023-32629 和 CVE-2023-2640，没有特权的本地用户可能利用其在设备上获得更高权限，影响大约 40% 的 Ubuntu 用户。![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2499ed3c25f36b81bed5ea9c11703e575ad53e9862aecfdf5c534c3d6ed7d68c.jpg "")  
  
  
Ubuntu 是目前使用最广泛的 Linux 发行版之一，拥有大约 4000 多万用户。  
  
CVE-2023-2640 是存在于 Ubuntu Linux 内核中的一个高严重性（CVSS v3得分：7.8）漏洞，之所以出现是因为权限检查不充分，从而允许本地攻击者获得过高的权限。另外一个漏洞 CVE-2023-32629 是存在于 Linux 内核内存管理子系统中的一个中等严重性（CVSS v3 分数：5.4）漏洞，允许本地攻击者执行任意代码。  
  
s.Tzadik 和 s.Tamari 两位分析师发现在 Linux 内核上实现 OverlayFS 模块的差异后，找到了这两个漏洞问题。（OverlayFS 是一种联合装载文件系统实现，因其允许通过用户名称空间进行无特权访问，并且受到容易被利用的漏洞的干扰，过去曾多次受到威胁攻击者的攻击）  
  
Ubuntu 作为使用 OverlayFS 的发行版之一，在 2018 年对其 OverlayFS 模块进行了自定义更改，总体上来说应该是安全的。然而在 2019 年和 2022 年，Linux 内核项目对该模块进行了修改，这就与 Ubuntu 的更改起了冲突，新版本广泛分发采用了包含这些更改的代码，因此冲突引入了这两个漏洞。更不幸的是，这两个漏洞存在被利用的风险，毕竟它们的 PoC 已经公开了很长一段时间。![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/aeeec58d3ee421dfd4e4ad0b87b0b6840cd5b6c36c68d112cc5f5c330661669a.jpg "")  
  
  
Wiz 研究人员警告称这两个漏洞源于 Ubuntu 对 OverlayFS 模块的单独更改，都针对 Ubuntu 内核，目前针对这些漏洞的武器化攻击已经公开。需要注意的是这两个漏洞只会影响 Ubuntu，其它包括 Ubuntufork 在内的 Linux 发行版以及不使用 OverlayFS 模块的自定义修改都应该是安全的。  
  
近期，Ubuntu 发布了一份关于最新版本Ubuntu Linux 内核中存在六个漏洞的安全公告，并提供了修复更新版本， 建议尚不清楚如何重新安装和激活第三方内核模块的用户通过包管理器执行更新（包管理器应负责所有依赖项和安装后配置）。此外， 用户要注意安装 Linux 内核更新后，需要重新启动才能在Ubuntu 上生效。  
  
  
   END    
  
  
阅读推荐  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/eed5195845c4c35122ad056ce21c4c62bcdeff48408386f104b9956fceec4721.jpg "")  
[【安全圈】武汉地震设备遭攻击，“黑手”疑来自境外！](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=1&sn=5c9ef0d7dcb2b1b63eca5db4c4eed405&chksm=f36fc0fac41849ec4a8a80658dfa5379ff9ec33e94cf57cfbb094586d90792f7ab83fd20a15c&scene=21#wechat_redirect)  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b4c496fe99de674df8a48a882c8734cbc2699f6a75ffd780ddd3b569bfbf6939.png "")  
[【安全圈】“邪恶版”ChatGPT 出现：WormGPT，可利用其编辑恶意软件](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=2&sn=1709ae32ec52bb9307dd7c088ede4ccd&chksm=f36fc0fac41849ecbedef074d12e6a3b4ecb1b44605e1a815610f0f8b393b02d37ac08664e15&scene=21#wechat_redirect)  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/338c0e0fecce975ec5bc545fadecda5ff1911c32293d4d7884c3a8cdef9fabd2.jpg "")  
[【安全圈】遭遇攻击，挪威十余个政务平台敏感数据或泄露](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=3&sn=513ca6d7945c3a9d8c66ea8a681b4ee3&chksm=f36fc0fac41849ecfbf7c4760fd771120e56d4fdcebad3fc2420be2f610a95a960c8eaa8956a&scene=21#wechat_redirect)  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b2135bd7cf41de89dfd5522e42c4227e3e0a95609c0a7c471b5e9696de3f4cd6.png "")  
[【安全圈】所有 AMD Zen 2 CPU 均受影响，专家发现 Zenbleed 远程执行漏洞](http://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652040378&idx=4&sn=a6770cb53a5583f0e8b921778dacfca5&chksm=f36fc0fac41849ecaefef66e916873551746f8c0e7a59be9c75cb86aab177b0f7d36120b18f8&scene=21#wechat_redirect)  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/8ef99978569138e40faaefacfc8d661fb13980ac43fb5341e3533c125d154eaf.gif "")  
  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/cf59233925b190a547d1093175012782459a87a613596889430326433b280cb7.png "")  
  
**安全圈**  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/8ef99978569138e40faaefacfc8d661fb13980ac43fb5341e3533c125d154eaf.gif "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e09a59ca7314db8625c67aa53c2a2a68642281bd4c465c4415787e93478bf110.gif "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e09a59ca7314db8625c67aa53c2a2a68642281bd4c465c4415787e93478bf110.gif "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
