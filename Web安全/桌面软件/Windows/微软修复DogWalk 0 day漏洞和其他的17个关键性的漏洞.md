---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2022-34713;CVE-2022-35804;CVE-2022-34715"
identifier_role: "primary"
primary_identifiers: "CVE-2022-34713;CVE-2022-35804;CVE-2022-34715"
referenced_identifiers: "CVE-2022-30190"
identifier_status: "unknown"
title: "微软修复DogWalk 0 day漏洞和其他的17个关键性的漏洞"
product: "Microsoft Windows MSDT、SMB、NFS与Exchange"
record_type: "roundup"
document_type: "多漏洞补丁新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "DogWalk需诱导文件交互；SMB/NFS需相应服务配置；Exchange三项未列编号"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Windows/%E5%BE%AE%E8%BD%AF%E4%BF%AE%E5%A4%8DDogWalk%200%20day%E6%BC%8F%E6%B4%9E%E5%92%8C%E5%85%B6%E4%BB%96%E7%9A%8417%E4%B8%AA%E5%85%B3%E9%94%AE%E6%80%A7%E7%9A%84%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-aaae59389d595ab31f8a0bec"
entity_id: "ve-aaae59389d595ab31f8a0bec"
schema_version: "1"
---

# 微软修复DogWalk 0 day漏洞和其他的17个关键性的漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Microsoft Windows MSDT、SMB、NFS与Exchange
- 文献类型：多漏洞补丁新闻
- 版本、权限及部署边界：DogWalk需诱导文件交互；SMB/NFS需相应服务配置；Exchange三项未列编号
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 主元数据只34713但正文多个漏洞应拆实体，Follina30190只是背景
2. 同段声称DogWalk只能物理访问又可远程邮件触发矛盾，后文MSDT URL调用Word疑混入Follina且调用方向错误
3. 2020报告与一直在野利用不能画等号，DogWalk变种说法和利用起点需原公告
4. 补丁重要/严重等级误称CVSS评级；NFS评分8.5–9.8混合来源未说明
5. SMB客户端/服务器混述，禁用压缩缓解和Windows11受影响范围需具体公告；不得推定所有机器默认运行可攻击服务
6. 121/17/101统计需日期与类别；缺Exchange三CVE及微软公告链接

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://threatpost.com/microsoft-patches-dogwalk-zero-day-and-17-critical-flaws/180378/>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网络安全应急技术国家工程中心   2022-08-22 15:33  
  
微软正在敦促用户修补一个名为Dogwalk的0 day漏洞，该漏洞目前在野外一直被大量攻击利用。该漏洞(CVE-2022-34713)与微软Windows支持诊断工具有关，它允许远程攻击者在有漏洞的系统上执行任意代码。  
  
该警告是在8月大规模补丁更新时发布出来的，该更新还包括了121个漏洞，其中17个是关键性的，101个带有通用漏洞评分系统的重要评级。  
  
0 day计划经理在星期二的博文中写道，本月发布的修复数量明显高于8月预期发布的数量。它几乎是去年8月份的三倍，并且该数量在今年每月发布的漏洞数量中位于第二名。  
# DogWalk漏洞已经存在两年多了  
  
2020年1月，研究人员Imre Rad首次向微软报告了这个一直在被积极利用的Dogwalk漏洞。然而，直到另一位研究人员开始追踪一个名为Follina(CVE-2022-30190)漏洞的利用，Dogwalk漏洞才重新开始被引起重视。根据Tenable Patch Tuesday的综述报告，对Dogwalk的重新关注似乎也促使了微软将该漏洞添加到了本月的修复计划中。  
  
微软表示，CVE-2022-34713是Dogwalk的一个变种，但有所不同。微软将该漏洞评为重要漏洞，并警告说，只有对易受攻击的计算机进行物理访问的时候才可以利用该漏洞。然而，0 day计划的研究人员却在这里概述了远程攻击发生的可能性。  
  
Childs写道，这里有一个社会工程学的因素，因为该漏洞的利用需要威胁者说服用户点击一个链接或打开一个文件。微软可能会将一个漏洞的原理描述的非常的简单，这意味着它可能很容易被利用，并且不需要预先的系统权限来利用该漏洞。  
  
当MSDT使用URL协议对一个应用程序(通常是Microsoft Word)进行调用时，这个漏洞也会允许代码执行。目前还不清楚这个漏洞是由一个失效的补丁造成的，还是一个新出现的漏洞。  
# 17个关键性的漏洞  
  
在周二修补的漏洞中有三个最严重的特权提升漏洞，该漏洞可以让那些使用微软Exchange服务器的实例受到攻击。目前微软已经针对这个漏洞发布了一个单独的警报页面来帮助修复这些漏洞。  
  
Tenable就Exchange Server的漏洞写道，这三个漏洞都是需要进行认证和用户互动才能被利用，攻击者需要诱使目标访问精心构造的Exchange服务器。这个攻击方式可能是需要通过网络钓鱼来实施。  
  
据该公司称，微软的SMB 3.1.1(SMBv3)客户端和服务器会一直运行在微软的Windows 11系统内，但是该客户端存在一个关键性的漏洞(CVE-2022-35804)。微软将该漏洞归类为 "更可能被利用"，并将该漏洞的严重程度定为8.8。  
  
该漏洞可能会影响到Windows 11，0 day计划宣称，这意味着一些新的软件可能也会包含这个漏洞。研究人员说，只有在启用SMB服务器时，SMB漏洞才有可能在那些受影响的Windows 11系统之间形成蠕虫效应。  
  
Childs写道，禁用SMBv3压缩是解决这个漏洞的一个很好的办法，但更新应用才是修复这个漏洞的最佳方式。  
  
微软在其Windows网络文件系统中修复了一个远程代码执行漏洞(CVE-2022-34715)，其严重程度在8.5至9.8之间。这已经是微软连续第四个月部署关键的NFS代码执行补丁了。有趣的是，微软将该漏洞描述为重要漏洞，而研究人员则警告说该漏洞是关键漏洞，应该优先进行打补丁。  
  
要利用这个漏洞，需要远程的未经认证的攻击者对受影响的NFS服务器进行特殊的调用，这将会为攻击者提供高权限的代码执行环境。微软将其列为重要严重事件，但如果你正在使用NFS，我建议你将其视为关键事件，一定要迅速测试和修复该漏洞。  
  
在相关新闻中，Adobe在周二修补了25个CVE漏洞，解决了Adobe Acrobat和Reader、Commerce、Illustrator、FrameMaker和Adobe Premier Elements中的大量的漏洞。  
  
**参考及来源：**  
  
https://threatpost.com/microsoft-patches-dogwalk-zero-day-and-17-critical-flaws/180378/  
  
  
  
原文来源  
：嘶吼专业版  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176njVOPvfib4X3jQ6GIHLtX8SSDvbpmcpr4uu3X7ELG7PDjdaLVeq4Er02ZoicTPvxrC6KCVH3bssUVw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
