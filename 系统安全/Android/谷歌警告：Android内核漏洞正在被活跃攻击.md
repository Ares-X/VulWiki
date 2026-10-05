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
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-9f4ea00c52013921e4738abe"
entity_id: "ve-9f4ea00c52013921e4738abe"
schema_version: "1"
---

# 谷歌警告：Android内核漏洞正在被活跃攻击

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
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/24120d0af1689ca7b78965426b2f0987f2d60e84b4b33b32eb858a41179de065.png "")  
  
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
