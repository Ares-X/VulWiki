---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-0031;CVE-2023-6229;CVE-2023-6230;CVE-2023-6231;CVE-2023-6232;CVE-2023-6233;CVE-2023-6234;CVE-2024-0244;CVE-2024-21762;CVE-2024-23113"
identifier_role: "primary"
primary_identifiers: "CVE-2024-0031;CVE-2023-6229;CVE-2023-6230;CVE-2023-6231;CVE-2023-6232;CVE-2023-6233;CVE-2023-6234;CVE-2024-0244;CVE-2024-21762;CVE-2024-23113"
referenced_identifiers: "CVE-2022-42475;CVE-2023-27997"
identifier_status: "unknown"
title: "Android、佳能漏洞已修复，Fortinet警告零日漏洞"
product: "Android；Canon打印机；FortiOS"
record_type: "advisory"
document_type: "多产品漏洞新闻汇编"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Android2024年2月补丁；Canon固件<=03.07需型号匹配；FortiOS多个分支及SSLVPN暴露"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Android/Android%E3%80%81%E4%BD%B3%E8%83%BD%E6%BC%8F%E6%B4%9E%E5%B7%B2%E4%BF%AE%E5%A4%8D%EF%BC%8CFortinet%E8%AD%A6%E5%91%8A%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-b47126d839687b0279efd681"
entity_id: "ve-b47126d839687b0279efd681"
schema_version: "1"
---

# Android、佳能漏洞已修复，Fortinet警告零日漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Android；Canon打印机；FortiOS
- 文献类型：多产品漏洞新闻汇编
- 版本、权限及部署边界：Android2024年2月补丁；Canon固件<=03.07需型号匹配；FortiOS多个分支及SSLVPN暴露
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 无CVE元数据，至少十个明确主漏洞跨移动系统、打印机和网络设备，应建立多实体记录
2. Canon没有各型号修复固件；所谓只影响无路由器直连互联网的设备过窄，网络可达与私网并不等于修复
3. FortiOS只列大分支，缺修复子版本；在2024年2月背景下7.6不受影响的陈述需核对日期/原公告
4. FortiOS缓解明确区分禁用全部SSLVPN与仅禁用Web模式，须保留；可能在野利用的置信表述不能升级
5. 文中谷歌/JVN/厂商公告未保留直接链接，现有大量链接是无关推荐；删除法律犯罪/广告长尾，给相对日期绝对时间

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652099357&idx=1&sn=5c38f6917d6b84e84632bb47344d3714&chksm=8bbcf924bccb7032f6ff66449cc927e65c853c9fc88b03c8569061bcd8048ef8fcefb48eb778&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104571&idx=1&sn=b2b0a1465e8d4856f593fa7a3b7fcd6c&chksm=8bbccd42bccb44540a72239af3de30db90adafde6d5c4217aa1b15600ba47feb550f5fa659bd&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652098579&idx=1&sn=56da5aedb263c64196a74c5f148af682&chksm=8bbcfa2abccb733ca8dd898d7c0b06d98244ca76bd7be343482369fa80546554cced706fa74c&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103736&idx=1&sn=9862de51a047cfde70c4575815ecb5c5&chksm=8bbcce01bccb4717a7bb7941cfd80fb25e9d0da8139c184e4ad245bf53fc91b1d6944bc85916&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652102246&idx=1&sn=6da86a0ad9a923edca47618aedac0ac9&chksm=8bbcf45fbccb7d49635a50913000dde2fc38b1beadf4172d7877b8093c721f727c1819cf1e0f&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103384&idx=1&sn=391073e6109ff105f02be9029e01c697&chksm=8bbcc8e1bccb41f7fe478a3d22757d61f10dcf42548c1c02c0579b8f161277e527ba98ccb542&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 何威风  祺印说信安   2024-02-19 00:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rTibWNx9ARWmFDREcQO6P5V4u2M1YnDFZoLrFQcy9ibg4kz4lEbpX591P0E5trazfJPicpN0T92q1FMmJeVXlVSZw/640?wx_fmt=png&from=appmsg "")  
  
**谷歌周一宣布修复 Android 中的 46 个漏洞，其中包括一个导致远程代码执行的严重错误。**  
  
该漏洞编号为 CVE-2024-0031，影响 Android 开源项目 (AOSP) 版本 11、12、12L、13 和 14，已在平台的系统组件中发现。  
  
  
谷歌在其公告  
中解释说：“这些问题中最严重的是系统组件中的一个关键安全漏洞，该漏洞可能导致远程代码执行，而无需额外的执行权限  
。”  
  
该漏洞已作为 Android 2024-02-01 安全补丁级别  
的一部分得到解决，总共解决了 15 个安全缺陷。  
  
其余 14 个问题均为导致特权提升或信息泄露的高严重性漏洞。其中九个错误影响框架组件，而其余五个则影响 Android 的系统组件。  
  
本月 Android 更新的第二部分以2024-02-05 安全补丁级别  
发布在设备上，修复了 Arm、MediaTek、Unisoc 和 Qualcomm 组件中的 31 个高严重性安全缺陷。  
  
周一，谷歌还宣布了针对影响其 Pixel 设备的七个漏洞的补丁。其中五个是在高通的音频子组件中发现的。  
  
所有七个问题以及 Android 2024 年 2 月更新中包含的缺陷均已在运行 2024 年 2 月 5 日安全补丁的 Pixel 设备上得到修复。  
  
Android Automotive OS、Wear OS 和 Pixel Watch 更新也已发布，以提供2024-02-05 安全补丁级别  
中包含的补丁。然而，这两个平台都没有解决其他漏洞。  
  
同样在周一，三星  
宣布  
为数十种符合条件的设备发布一套新的软件更新。该更新包括 Android 2024 年 2 月修复和针对三星产品特定漏洞的补丁。  
  
建议用户在软件更新可用后立即更新其设备。  
# 佳能修补小型办公打印机中的 7 个严重漏洞  
  
**日本电子产品制造商佳能周一宣布了软件更新，修复了影响几种小型办公打印机型号的七个严重漏洞。**  
  
这些被描述为缓冲区溢出错误的问题可以通过网络进行远程代码执行 (RCE) 或导致易受攻击的产品变得无响应。  
  
“这些漏洞表明，如果产品不使用路由器（有线或 Wi-Fi）直接连接到互联网，未经身份验证的远程攻击者可能能够执行任意代码和/或能够瞄准该产品在通过互联网的拒绝服务 (DoS) 攻击中，”  
佳能指出  
。  
  
这些缺陷被追踪为 CVE-2023-6229 到 CVE-2023-6234 和 CVE-2024-0244。根据日本漏洞信息门户网站  
JVN 的  
数据，他们的 CVSS 评分为 9.8。  
  
NIST 公告显示，这些缺陷是在 CPCA PDL 资源下载过程、地址簿密码过程、WSD 探测请求过程、地址簿用户名过程、SLP 属性请求过程、CPCA 颜色 LUT 资源下载过程和 CPCA PCFAX 号码等组件中发现的。过程。  
  
易受攻击的打印机型号因地区而异：欧洲为 i-SENSYS LBP673Cdw、MF752Cdw、MF754Cdw、C1333i、C1333iF 和 C1333P 系列，北美为 imageCLASS MF753CDW、MF751CDW、MF1333C、LBP674CDW 和 LBP1333C 系列；以及日本的 Satera LBP670C 和 MF750C 系列。  
  
不过，对于所有型号，这些漏洞都会影响固件版本 03.07 及更早版本。可以在佳能的地区网站上找到解决这些错误的更新。  
  
“目前还没有关于这些漏洞被利用的报告。然而，为了增强产品的安全性，我们建议客户安装适用于受影响型号的最新固件，”  
佳能在其欧洲支持网站上表示  
。  
  
鉴于上述漏洞可以被远程利用，我们还建议客户限制对打印机的访问，将它们隐藏在防火墙或路由器后面，并为其设置私有 IP 地址。  
  
佳能指出，所有七个安全缺陷都是通过趋势科技的零日计划 (ZDI) 报告的。  
# Fortinet 警告新的 FortiOS 零日漏洞  
  
  
Fortinet 修补了 CVE-2024-21762，这是一个可能已被广泛利用的关键远程代码执行漏洞。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rTibWNx9ARWmFDREcQO6P5V4u2M1YnDFZJAH82JkyWVhkyyia6d1LtiaV86LTJd0UaRHjnO0Hib4LfseTpibfCXe8zw/640?wx_fmt=jpeg&from=appmsg "")  
  
**Fortinet 周四发布了针对 FortiOS 中可能已被利用的关键远程代码执行漏洞的补丁。**  
  
该安全漏洞编号为  
CVE-2024-21762  
，影响 FortiOS 版本 6.0、6.2、6.4、7.0、7.2 和 7.4。已针对每个受影响的版本发布了补丁（6.0 除外）——建议 6.0 用户迁移到较新的版本。FortiOS 7.6 不受该漏洞影响。  
  
作为解决方法，用户可以禁用 SSL VPN 功能。Fortinet 表示，禁用 SSL VPN Web 模式并不能缓解该漏洞。  
  
CVE-2024-21762 似乎是一个零日漏洞，Fortinet 表示它“可能在野外被利用”。  
  
该漏洞被描述为越界写入问题，未经身份验证的远程攻击者可以利用该漏洞使用特制的 HTTP 请求执行任意代码。   
  
Fortinet 尚未分享有关可能利用 CVE-2024-21762 的攻击的任何信息，但该公司发布公告之际，它透露一些客户尚未修补两个较旧的漏洞 CVE-2022-42475 和 CVE-2023-27997，这两个漏洞已被  
用于  
与中国和其他国家相关的 APT 攻击。   
  
  
据了解，名为Volt Typhoon  
的中国威胁组织  
除了思科和 Netgear 的产品外，还以 Fortinet 设备为目标，试图将它们陷入僵尸网络。美国最近破坏了这个僵尸网络。   
  
  
同样在周四，Fortinet 宣布了CVE-2024-23113  
的补丁  
，这是一个内部发现的问题，可被利用用于未经身份验证的远程代码执行。  
  
**—END—**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWhJou9CCpqmibD6ldgHL2ONAnycCV5yOcv7NiccibzQb5oMWLVmYhwK6jQaSapdQNKVoTAePYIKqmmicA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
  
**精彩回顾：祺印说信安2024之前**  
  
[90个网络和数据安全相关法律法规打包下载](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652099357&idx=1&sn=5c38f6917d6b84e84632bb47344d3714&chksm=8bbcf924bccb7032f6ff66449cc927e65c853c9fc88b03c8569061bcd8048ef8fcefb48eb778&scene=21#wechat_redirect)  
  
  
[2023年收集标准合集下载](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104571&idx=1&sn=b2b0a1465e8d4856f593fa7a3b7fcd6c&chksm=8bbccd42bccb44540a72239af3de30db90adafde6d5c4217aa1b15600ba47feb550f5fa659bd&scene=21#wechat_redirect)  
  
  
**>>>网络安全等级保护<<<**  
  
[网络安全等级保护：等级保护工作、分级保护工作、密码管理工作三者之间的关系](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652098579&idx=1&sn=56da5aedb263c64196a74c5f148af682&chksm=8bbcfa2abccb733ca8dd898d7c0b06d98244ca76bd7be343482369fa80546554cced706fa74c&scene=21#wechat_redirect)  
  
  
[等级保护网络架构安全要求与网络分段的7个安全优点](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103736&idx=1&sn=9862de51a047cfde70c4575815ecb5c5&chksm=8bbcce01bccb4717a7bb7941cfd80fb25e9d0da8139c184e4ad245bf53fc91b1d6944bc85916&scene=21#wechat_redirect)  
  
  
[网络安全等级保护相关知识汇总](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652102246&idx=1&sn=6da86a0ad9a923edca47618aedac0ac9&chksm=8bbcf45fbccb7d49635a50913000dde2fc38b1beadf4172d7877b8093c721f727c1819cf1e0f&scene=21#wechat_redirect)  
  
  
**>>>数据安全系列<<<**  
  
[数据安全管理从哪里开始](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103384&idx=1&sn=391073e6109ff105f02be9029e01c697&chksm=8bbcc8e1bccb41f7fe478a3d22757d61f10dcf42548c1c02c0579b8f161277e527ba98ccb542&scene=21#wechat_redirect)  
  
  
[数据安全知识：数据安全策略规划](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104021&idx=1&sn=7f80bb27ce6ad7c9debe83c172ff9f73&chksm=8bbccf6cbccb467a0971b9de4a8b14851c2666ad6934a88b8324a1ffc4b5cf5109cbc3976697&scene=21#wechat_redirect)  
  
  
[数据安全知识：数据库安全重要性](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104183&idx=2&sn=f2a98256b0497ce3a99c0ad30223bf40&chksm=8bbccfcebccb46d8aac9f8a5c8d1f46061ca61ad69b3a61d52d3dc614e1e18ae65d982a5574b&scene=21#wechat_redirect)  
  
  
******>>>错与罚<<<**  
  
[北京多家公司因不履行网络安全保护义务被处罚！“两高一弱”仍然是安全隐患重点](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104010&idx=1&sn=0ddfdc41a52d235c99269b784b7858fa&chksm=8bbccf73bccb4665d0c29f8067b90e0e9b48894d2d4bbb9da98e64218efa47e36c32034a4775&scene=21#wechat_redirect)  
  
****  
  
[严厉打击网络谣言！商丘警方公布4起典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104388&idx=1&sn=9da4f7c6e055ff4e5bae9c0b10420538&chksm=8bbcccfdbccb45eb58a4322c3845b7ea5c743fe746a09e103f88aaaac84a2e997ab3b4658fa2&scene=21#wechat_redirect)  
  
  
[侮辱南阳火灾遇难学生的“谯城芳芳姐”获十日行政拘留](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104388&idx=2&sn=4824c66acd50a0701a117d12408ddf80&chksm=8bbcccfdbccb45ebfe3a03f67e98ddc5239ed0490efa326da41dc6abcdef432c12a6124eef12&scene=21#wechat_redirect)  
  
  
[宁夏网警公布5起打击谣言典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104388&idx=3&sn=3ab286ac8ead9305cbc8db6fcd1d25a6&chksm=8bbcccfdbccb45ebe9a7431baddbcf8aaf4f3e77545b0bcac0da033e84aed8fb7c9b76efb691&scene=21#wechat_redirect)  
  
  
[吉林警方公布3起、湖北公安公布5起打击谣言典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104256&idx=3&sn=1cec040494e2fe846ae1f4d19e9de390&chksm=8bbccc79bccb456f95523f31460e34fd5627344f26adb4fed2358b2d5a0178c5ef9fbb4d1439&scene=21#wechat_redirect)  
  
  
[安徽警方依法打击整治网络谣言10起典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104242&idx=3&sn=90a9f1e57b9e0ad43206eea3da80842c&chksm=8bbccc0bbccb451da48561fc6b3e6bee505be0f5a3e67ec5ac01bfa0dae2fd0d9a8bc23515a2&scene=21#wechat_redirect)  
  
  
[2023年度国家网络与信息安全信息通报工作总结会议在京召开](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104222&idx=2&sn=949bca98b6427c7d443ded04c6779a4d&chksm=8bbccc27bccb45313a34056bc7480bc14c0dc502250491a8a566f6b651f604b3f5b1b5753108&scene=21#wechat_redirect)  
  
  
[焦点访谈丨拒绝“按键”伤人 避免网络戾气变成伤人利器](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104214&idx=6&sn=554d342874f552e8107d81ac664ae2e5&chksm=8bbccc2fbccb45392b7d1bb952aae7ac6a2fe4d1fdfa05512660a35645318afe0fc36f4414a4&scene=21#wechat_redirect)  
  
  
[全国公安厅局长会议召开 忠实履行神圣职责 为扎实稳健推进中国式现代化贡献公安力量](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104214&idx=2&sn=125e830221fe7b1f3522bbf0205814fd&chksm=8bbccc2fbccb45398c2cc7393a957d5609feff89aae0f14b2e1c895a52642fe3940c9f145a89&scene=21#wechat_redirect)  
  
  
[公安部：纵深推进全面从严管党治警 着力锻造忠诚干净担当的新时代公安铁军](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104214&idx=3&sn=878a4f16e8c21e2bf7903cba054e135f&chksm=8bbccc2fbccb4539551b2f6c98a75f3b6dfddc9cc7322a23123d6a71450efc0a8bde58d2c5eb&scene=21#wechat_redirect)  
  
  
[山西公布10、辽宁网警公布6起打击谣言典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104214&idx=4&sn=4a425e447b3f74e37a3e029ea26fb2c7&chksm=8bbccc2fbccb4539286ea4900236dd52dee37cbc74347ab5e9147426a2e73c5df808f428ad8c&scene=21#wechat_redirect)  
  
  
[重庆璧山出现比缅甸还恐怖的新型背债人？警方：系某房产中介为博眼球造谣](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104214&idx=5&sn=d743fe9c40fb4217584fb2ba5561c0df&chksm=8bbccc2fbccb4539c25341414c8ad6b4c6eb3aefc6b0e3b7a69c2f2b647ba46567af3d53ed46&scene=21#wechat_redirect)  
  
  
[上海、四川、浙江、福建警方宣传和打击整治网络谣言](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104159&idx=3&sn=cf504c3cfe1a938ce188f1f1d2e84921&chksm=8bbccfe6bccb46f01e547155be9b9b2af86c54c95659c9be99e1e247c4e60cbbc354946d27b2&scene=21#wechat_redirect)  
  
  
[四川德阳网警开展打击整治网络谣言宣传活动](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104077&idx=3&sn=66b3ec60984cdf4ea12f5a65cd7dfc9d&chksm=8bbccfb4bccb46a24b07a39022d717e962a18b389c135392dba1813f91dccee84bc8d12610a9&scene=21#wechat_redirect)  
  
  
[广安警方公布4起打击整治网络谣言典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104077&idx=4&sn=ba2c2112d68839753ef1a4880f3db435&chksm=8bbccfb4bccb46a22f39036676fe59cbdb5c1013ac120d6ce40a71130859ffc031a8b5084f07&scene=21#wechat_redirect)  
  
  
[四川查处两起利用AI编造、传播网络谣言案件](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104077&idx=5&sn=a5b11dc662e274df84fc7ccfd920877e&chksm=8bbccfb4bccb46a2e0daa6ff57acdf6ef282285bc2fdaba7cf2adcfa49d22765dfae1cdfe59f&scene=21#wechat_redirect)  
  
  
[西安网警依法处置一起网络暴力案件](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104021&idx=3&sn=0115bec6c696677cbfbfd227563417d4&chksm=8bbccf6cbccb467abebd9562fdbe58ff13f73130b95e6b4049c19ece0113d7b08e50c5359820&scene=21#wechat_redirect)  
  
  
[中信银行被罚400万，涉信息安全风险隐患未得到整改、虚假演练等](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103991&idx=1&sn=0cab9d0e32c9f69cab628b843bf73d4e&chksm=8bbccf0ebccb46187f7efe2016109ced6bdaef4ff8f6fd9d90790e36e3e623fe4483398992e0&scene=21#wechat_redirect)  
  
  
[中行被罚430万，涉迟报重要信息系统重大突发事件等](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103970&idx=2&sn=76254b9a3981e3fa57e4957aaaeb16c6&chksm=8bbccf1bbccb460d7d23b6b7b165005d22a33c21443632cbcca4e162d6aeaa06d9025783f638&scene=21#wechat_redirect)  
  
  
[新疆警方公布5起打击整治网络谣言典型案件](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103970&idx=4&sn=76410ed268999f04052b88352fa2be7e&chksm=8bbccf1bbccb460de37e1ef991c384e7e793b4f26fc97e419bcf13a0fae86b1ea874e57be351&scene=21#wechat_redirect)  
  
  
[山西忻州一网民因编造地震谣言被依法查处](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103970&idx=3&sn=de03afd0974ff1740044c29da6016604&chksm=8bbccf1bbccb460d5b5b70f919342b50efb5bb9ba9700f7fe606cfc6c74c827dcc2402e17e9d&scene=21#wechat_redirect)  
  
  
[公安部召开新闻发布会通报打击黑客类违法犯罪举措成效并答记者问](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103951&idx=2&sn=d4b7d5aebc16a942fb695bca3d414f4e&chksm=8bbccf36bccb46204f3274379ffd3c8903c4acb2469447c5b6515f7172e6b1a187e790c0ed42&scene=21#wechat_redirect)  
  
  
[有坏人！快藏好您的个人信息](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103951&idx=3&sn=a79b0b73813585d91ac550bd47b4455f&chksm=8bbccf36bccb462041e356e29f05d20c12736039871290414a0369a8ade194f635e8eeafa3ca&scene=21#wechat_redirect)  
  
  
[在西藏架设“GOIP”设备给骗子提供帮助，10人落网！](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103951&idx=4&sn=5a29a6513ef65004fa9a52cc48a649ac&chksm=8bbccf36bccb4620e2c4151522f80dce5c8305587e9da66eebdfb26938a174c9d53b7a4469ed&scene=21#wechat_redirect)  
  
  
[网上买卖传播淫秽物品，触犯法律！](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103940&idx=4&sn=b52f4c08d55e271ef299a174ab357f49&chksm=8bbccf3dbccb462b21ed00751ed278683c0927e2c2974adce3d24fff7a8771519f5480417e03&scene=21#wechat_redirect)  
  
  
[“温州帮”竟然是缅北电诈后台？警方通报来了](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103940&idx=5&sn=22173da928f67880a4a37a586dc7683c&chksm=8bbccf3dbccb462b5717c1fe4350d89b671183cba8d5278c294e063f1856fec41a0b9ace54f3&scene=21#wechat_redirect)  
  
  
[借甘肃积石山地震造谣博流量，行拘！](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103924&idx=3&sn=11ff4bcc6cc789554db01ea422185861&chksm=8bbccecdbccb47dbb07650da1243c57eb754e90ca8cff97384af1a691ef6a10f198634b93654&scene=21#wechat_redirect)  
  
  
[陕西警方公布6起打谣典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103924&idx=4&sn=9ade7706756da02f2445d7bacc97d5ca&chksm=8bbccecdbccb47dba6b27b9b7d5f2f650dac3419e2fa55bdd47be8d81041f39a1af416fd5815&scene=21#wechat_redirect)  
  
  
[“再来一次12级地震”，行拘！](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103924&idx=5&sn=1bc2675b734a42942654184e8763b10e&chksm=8bbccecdbccb47db54e8cc53eb43b9401a318f5c11060aa0c807eb53ce27590e668ee94e32ab&scene=21#wechat_redirect)  
  
  
[江西警方公布7起“打谣”典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103924&idx=6&sn=20e55dcdc18a802bf2079e3706050546&chksm=8bbccecdbccb47dbeea304bcbf81f23fb6c8ac7eb970893321f0b825277e5e1998e099cd9d47&scene=21#wechat_redirect)  
  
  
[江苏警方公布8起打谣典型案例](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103924&idx=7&sn=b4692b982f6ad99a087ccb5f1d5f3a04&chksm=8bbccecdbccb47dbb96efae0b284dd655ef7e526ce811ad0ff6c2a92e04e0e1eac94110f4aa3&scene=21#wechat_redirect)  
  
  
[越想越生气，酒后干出糊涂事……](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103924&idx=8&sn=5e96bbf3eb7076304c0193e1b21bdb81&chksm=8bbccecdbccb47dbd4ec4e1a6539eb19791b6e2120e4dbcf7cf91f49b94e601eec1897517029&scene=21#wechat_redirect)  
  
  
[邯郸刘某某因编造网络谣言被依法查处！](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103925&idx=3&sn=a602191fd3828335576572dd1455d167&chksm=8bbcceccbccb47da5fac006e6d897247911225b784ec1de5b7c34a6ca7ba31944c243d9137eb&scene=21#wechat_redirect)  
  
  
**>>>其他<<<**  
  
[2023年10佳免费网络威胁情报来源和工具](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103402&idx=1&sn=80a1ee98453d96a6f2304272d2a6b33e&chksm=8bbcc8d3bccb41c5fe204b9933fbded47cd14612e3101111b2f806d8a136a61ff27577dfd765&scene=21#wechat_redirect)  
  
  
[2023年网络安全资金下降40%](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104036&idx=3&sn=797c6ac97c1c280791cbcf44737eae0c&chksm=8bbccf5dbccb464bc612673aa47f43a0affceaaa6827381f54333baf7da6994882bcff4cdbd9&scene=21#wechat_redirect)  
  
  
[为什么攻击模拟是避免 KO 的关键](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104101&idx=1&sn=4f52a7b75387d67862021b8f0d647d26&chksm=8bbccf9cbccb468ad8e85019c4978ff5f374845082160f75b52d9fd226b635e3f4815fb1edf9&scene=21#wechat_redirect)  
  
  
[持续安全监控对于稳健的网络安全策略的重要性](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652103729&idx=3&sn=688da0c1e70c3975b24d7036e6f90c3d&chksm=8bbcce08bccb471e89426f5a0089aa335689403215ab6b4d0cea9fa159c2d2c7bfac94fd59f2&scene=21#wechat_redirect)  
  
  
[网络安全策略：远程访问策略](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104095&idx=2&sn=e8b2c6e7b9ec9c7a5e2da7f0df549ce8&chksm=8bbccfa6bccb46b0f847137b32cc0426dd05cf8a4b6d8b1ceeaee8e57482c70873a42041f771&scene=21#wechat_redirect)  
  
  
[网络安全策略：账户管理策略](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104021&idx=2&sn=c796ce34bf877501045259cda0097256&chksm=8bbccf6cbccb467ac55aa14b1a35004cb8f40dbab7a8760cb5ad2f06d15b3a15c85e38011087&scene=21#wechat_redirect)  
  
  
[保护企业的19项网络安全最佳实践](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104183&idx=1&sn=8f8693bdb34a0bba9975cade5b43b13d&chksm=8bbccfcebccb46d8e12d90e65018f0ee875ae2915ca5fc2e23eb86747361ddffcfec27561933&scene=21#wechat_redirect)  
  
  
**网络安全**[团队友情如何增强安全性](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104160&idx=1&sn=f23b88c17ca45309cb2d363490f72b84&chksm=8bbccfd9bccb46cf3d873a6d81b7873d31ba6357bfd87246b6790f1c0c54ced1b12526c65c13&scene=21#wechat_redirect)  
  
  
[实现混合网络时代的“无摩擦防御”](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104222&idx=1&sn=f15fd89240d1c5cb8bb83ccefaf9349a&chksm=8bbccc27bccb453100a3c15379d8e0f666c061c93ff25913e91de947a9d119f47b8d53045f25&scene=21#wechat_redirect)  
  
  
[物联网不是一份持续接受的礼物](http://mp.weixin.qq.com/s?__biz=MzA5MzU5MzQzMA==&mid=2652104222&idx=3&sn=ba74d7b9bb872a4da2572cb5ebbdad0f&chksm=8bbccc27bccb453114fc7ce6e43699a17a777a9f398981098df51574501c636efed381125342&scene=21#wechat_redirect)  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
