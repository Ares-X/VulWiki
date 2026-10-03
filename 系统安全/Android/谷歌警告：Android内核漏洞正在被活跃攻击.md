---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-36971"
identifier_role: "primary"
primary_identifiers: "CVE-2024-36971"
referenced_identifiers: "CVE-2024-32896"
identifier_status: "unknown"
title: "谷歌警告：Android内核漏洞正在被活跃攻击"
product: "Android Linux内核"
record_type: "advisory"
document_type: "补丁新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "2024-08公告；未列受影响版本或执行权限；后半切换2024-06 Pixel公告"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Android/%E8%B0%B7%E6%AD%8C%E8%AD%A6%E5%91%8A%EF%BC%9AAndroid%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9E%E6%AD%A3%E5%9C%A8%E8%A2%AB%E6%B4%BB%E8%B7%83%E6%94%BB%E5%87%BB.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-9f4ea00c52013921e4738abe"
entity_id: "ve-9f4ea00c52013921e4738abe"
schema_version: "1"
verification_source: "https://github.com/torvalds/linux/commit/92f1655aa2b2294d0b49925f3b875a634bd3b59e"
source_url: "https://github.com/torvalds/linux/commit/92f1655aa2b2294d0b49925f3b875a634bd3b59e"
---

# 谷歌警告：Android内核漏洞正在被活跃攻击

# 原始源码所支持的结论

原回调先释放dst再清除sk_dst_cache，违反RCU下先脱链再释放的顺序，可能使读方访问已释放对象。补丁改回调签名，传入sock，让IPv4、IPv6、XFRM各自调用sk_dst_reset；IPv6 RTF_CACHE分支额外持有引用以平衡释放。

需触发路由缓存negative_advice并满足竞态；提交提到UDP暴露路径，不等于给出无权限互联网RCE完整链。此稿是原始补丁与调用语义的中文分析，不把内核补丁标题、KEV记录或Android新闻自动升级成可直接复现的EXP。没有捏造实验环境、实际输出、内存布局或提权成功率。

## 修复与版本

Linux CNA列出的相应稳定分支修复起点为：4.19.316、5.4.278、5.10.219、5.15.161、6.1.94、6.6.34、6.9.4；主线6.10。这些是上游分支边界；发行版、Android/OEM内核可独立回补，不能只比较uname或移动设备营销版本。完整CNA Git范围和早期回补区间见[记录](https://cveawg.mitre.org/api/cve/CVE-2024-36971)。

## 静态审阅范围与风险

已全文读取固定提交 `92f1655aa2b2294d0b49925f3b875a634bd3b59e` 的提交说明和全部diff，SHA256 `3a50f6ea439f919660e8f890a29a7aea4a467f785650135f7a6167eedc672ff5`；没有应用补丁、编译内核、加载驱动、模拟设备或执行触发。本次材料没有安装器、下载执行段或第三方回连；这只描述所读diff，不证明整棵Linux源代码或固件供应链安全。

维护核对2026-10-03。公开技术分析本身足以作为参考；没有单独可执行PoC不影响保留这份分析，但不能把它称为已验证利用。


<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Android Linux内核
- 文献类型：补丁新闻
- 版本、权限及部署边界：2024-08公告；未列受影响版本或执行权限；后半切换2024-06 Pixel公告
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 末尾2024-06-05补丁的结论容易误被读成修复8月主漏洞，须把两篇时间线分开
2. RCE/root表述未说明必要执行权限与链条件，缺原理和官方链接
3. 47个组件漏洞计数是公告背景，不是本文可直接拆成47条有证据漏洞记录
4. 中英混排/引号断行和来源追踪不足，属于新闻无需假造PoC

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

鹏鹏同学  黑猫安全   2024-08-07 10:04  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8dBEfDPEceibXXic2V7XWPF80libk2UCibQ8e3ibDCO8YfFd3GegYMzq7TsTNoETtCbvZkaBpH3kPklNDDAQqPFcstA/640?wx_fmt=png&from=appmsg "")  
  
谷歌修复了 Android 内核中的高危漏洞，编号为 CVE-2024-36971。该漏洞是一个远程代码执行漏洞，攻击者可以使用它来执行任意代码和获取root权限。谷歌知道这个漏洞已经被活跃攻击，但没有分享相关攻击的细节。  
  
谷歌的安全公告中写道：“有迹象表明，CVE-2024-36971可能正在受到有限的、目标化的攻击。”该漏洞于 2024 年 6 月由 Google 威胁分析团队（TAG）成员克莱门特·勒辛格（Clement Lecigne）发现。TAG 团队负责调查由国家级攻击者和商业间谍软件供应商实施的攻击。  
  
2024 年 8 月的 Android 安全公告中总共解决了 47 个漏洞，其中包括 Framework（13）、System（1）、Kernel（1）、Arm 组件（2）、Imagination Technologies（1）、MediaTek 组件（1）、Qualcomm 组件（21）和 Qualcomm closed-source 组件（7）。  
这些漏洞包括 Elevate of Privileges、DoS、Remote Code Execution 和 Information disclosure。  
  
公告中写道：  
“这些问题中最严重的是 Framework 组件中的高安全漏洞，可能会导致本地权限 escalation，但不需要任何额外的执行权限。  
”。  
  
2024 年 6 月，谷歌发现了 Pixel 固件中的 elevate of privilege 漏洞，编号为 CVE-2024-32896，该漏洞已经在野外被攻击作为 zero-day。  
公告中写道：  
“有迹象表明，CVE-2024-32896可能正在受到有限的、目标化的攻击。  
”。  
  
谷歌没有提供攻击该漏洞的技术细节。  
Pixel 更新公告提供了安全漏洞和功能改进的详细信息，对于支持的 Google Pixel 设备。  
公司已将所有详细在公告中列出的漏洞解决了，通过 2024-06-05 或更高版本的安全补丁和 2024 年 6 月的 Android 安全公告。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
