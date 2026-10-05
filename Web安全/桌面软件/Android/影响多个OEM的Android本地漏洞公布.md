---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-45779"
identifier_role: "primary"
primary_identifiers: "CVE-2023-45779"
referenced_identifiers: ""
identifier_status: "unknown"
title: "影响多个OEM的Android本地漏洞公布"
product: "Android OEM APEX模块签名"
record_type: "advisory"
document_type: "漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地攻击；测试私钥可公开获取；安装APEX所需权限、adb授权与物理接触须区分"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Android/%E5%BD%B1%E5%93%8D%E5%A4%9A%E4%B8%AAOEM%E7%9A%84Android%E6%9C%AC%E5%9C%B0%E6%BC%8F%E6%B4%9E%E5%85%AC%E5%B8%83.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-002dd490f0d19db74ef0dbc9"
entity_id: "ve-002dd490f0d19db74ef0dbc9"
schema_version: "1"
---

# 影响多个OEM的Android本地漏洞公布

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Android OEM APEX模块签名
- 文献类型：漏洞新闻
- 版本、权限及部署边界：本地攻击；测试私钥可公开获取；安装APEX所需权限、adb授权与物理接触须区分
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 以相同公钥即人人能伪造签名解释有误，核心是测试私钥公开而非公钥本身公开
2. 部分受测OEM型号不能扩展到整个品牌；较早安全补丁日期也不自动证明受影响
3. 物理访问不等于adb已授权，本地低权限应用与shell/安装模块权限未拆清
4. 2023-12-05修复需映射OEM实际补丁；更换发行版/新机建议过宽
5. 有BleepingComputer来源但缺Meta原研究、声称公开的GitHub与谷歌公告；迁移动系统

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.bleepingcomputer.com/news/security/exploit-released-for-android-local-elevation-flaw-impacting-7-oems/>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网络安全应急技术国家工程中心   2024-02-04 15:36  
  
影响多家 Android 原始设备制造商 (OEM) 的本地特权提升缺陷的概念验证 (PoC) 漏洞现已在 GitHub 上公布。然而，由于该漏洞需要本地访问，因此其发布将主要对专业研究人员有所帮助。  
  
该漏洞的编号为 CVE-2023-45779，由 Meta 的 Red Team X 于 2023 年 9 月上旬发现，并在 Android  2023 年 12 月的安全更新中得到解决 ，但没有披露攻击者可用来识别和利用该漏洞的详细信息。  
  
该漏洞的存在是由于使用测试密钥对 APEX 模块进行不安全签名，允许攻击者向平台组件推送恶意更新，从而导致本地权限提升。尽管该漏洞无法直接远程利用，但它凸显了兼容性测试套件 (CTS) 和 Android 开源项目 (AOSP) 文档中的弱点，Google 计划在即将发布的 Android 15 版本中解决这些弱点。  
  
已收到 Android 安全补丁级别 2023-12-05 的设备将受到 CVE-2023-45779 的保护。  
# APEX 签名并不安全  
  
有研究人员发表了一篇文章， 解释说问题在于使用 AOSP 公开的测试密钥签署 APEX 模块。  
  
APEX 模块使 OEM 能够推送特定系统组件的更新，而无需发布完整的无线 (OTA) 更新，从而使更新包更精简、更易于测试并交付给最终用户。  
  
这些模块应使用在构建过程中创建的只有 OEM 知道的私钥进行签名。然而，使用 Android 源代码构建树中的相同公钥，意味着任何人都可以伪造关键系统组件更新。此类更新可能会为攻击者提供更高的设备权限，从而绕过现有的安全机制并导致全面泄露。  
  
CVE-2023-45779 影响许多 OEM，包括微软 (Surface Duo 2)、诺基亚 (G50)、Nothing (Phone 2)、费尔电话 (5)等。  
  
上述模型仅涉及测试覆盖范围，因此这些 OEM 的多个（如果不是全部）模型可能容易受到 CVE-2023-45779 的影响。  
  
多家 OEM 未能发现安全问题的原因是多方面的，包括 AOSP 中不安全的默认设置、文档不足以及 CTS 覆盖范围不足，未能检测到 APEX 签名中测试密钥的使用。  
  
其设备型号经 Meta 分析师测试并确认由于使用私钥而不会受到 CVE-2023-45779 影响的 OEM 厂商包括 Google (Pixel)、三星 (Galaxy S23)、索尼（Xperia 1 V）、摩托罗拉（Razr 40 Ultra）和 OnePlus（10T）等。  
# 可用的漏洞利用  
  
研究人员在 GitHub 上发布了 CVE-2023-45779 的漏洞。  
  
通常，该缺陷需要对目标设备进行物理访问，并需要一些使用“adb shell”来利用它的专业知识，因此 PoC 主要用于研究和缓解验证。然而，正如我们多次看到的那样，该漏洞始终有可能被用作漏洞链的一部分 ，以提升已受损设备上的权限。  
  
如果您的 Android 设备运行的版本早于 Android 安全补丁级别 2023-12-05，请考虑切换到发行版或升级到较新的型号。  
  
**参考及来源：**  
  
https://www.bleepingcomputer.com/news/security/exploit-released-for-android-local-elevation-flaw-impacting-7-oems/  
  
  
  
原文来源  
：嘶吼专业版  
  
“投稿联系方式：010-82992251   sunzhonghao@cert.org.cn”  
  
![](../../.resource/remote/f3ab05c36341863ed9d85136ffb4fb0121c50bb24dd77865ada8e50ae835d232.jpg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
