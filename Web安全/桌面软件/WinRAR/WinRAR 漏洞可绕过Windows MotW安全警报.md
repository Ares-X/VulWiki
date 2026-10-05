---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-31334"
identifier_role: "primary"
primary_identifiers: "CVE-2025-31334"
referenced_identifiers: ""
identifier_status: "unknown"
title: "WinRAR 漏洞可绕过Windows MotW安全警报"
product: "WinRAR Windows MotW传播"
record_type: "advisory"
document_type: "安全新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "从WinRAR打开指向可执行文件的符号链接；文中7.11修复，需要用户交互"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/WinRAR/WinRAR%20%E6%BC%8F%E6%B4%9E%E5%8F%AF%E7%BB%95%E8%BF%87Windows%20MotW%E5%AE%89%E5%85%A8%E8%AD%A6%E6%8A%A5.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.bleepingcomputer.com/news/security/winrar-flaw-bypasses-windows-mark-of-the-web-security-alerts/"
id: "vw-98cbf1d157e97a34a7217e24"
entity_id: "ve-98cbf1d157e97a34a7217e24"
schema_version: "1"
---

# WinRAR 漏洞可绕过Windows MotW安全警报

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：WinRAR Windows MotW传播
- 文献类型：安全新闻
- 版本、权限及部署边界：从WinRAR打开指向可执行文件的符号链接；文中7.11修复，需要用户交互
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 缺主CVE元数据；交替数据流名称与Zone.Identifier写法需规范
2. 只有管理员可创建符号链接说法过于绝对，应考虑Developer Mode及授权权限，并区分攻击者创建与受害者处理条件
3. MotW绕过不等于无需点击自动执行或提权，当前进程/用户权限边界应补
4. 7.10隐私选项删除的是哪些来源字段需核验，不能误解为推荐彻底去掉安全标记
5. 补厂商变更日志及IPA/JPCERT原始来源，删除广告，最新版本限定2025-04日期

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.bleepingcomputer.com/news/security/winrar-flaw-bypasses-windows-mark-of-the-web-security-alerts/>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com>
- 原文参考链接（未重新核验）：<https://oss.qianxin.com>
- 原文参考链接（未重新核验）：<https://codesafe.qianxin.com”。**>

### 归档技术正文

Ionut Ilascu  代码卫士   2025-04-07 18:20  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**WinRAR 文件压缩解决方案中存在一个漏洞 (CVE-2025-31334)，可被用于绕过 Windows 设备的MotW 安全警报并执行任意代码，影响除了最新版本7.11以外的所有版本。**  
  
  
![](../../.resource/remote/2069adf134a498822d98b9e340a1ef09614dc268f3618e95dc44e85f5dcda62a.png "")  
  
  
MoTW 是以元数据值形式（交换数据流 “zone-identifier”）存在于 Windows 中的一个安全功能，用于标记从互联网下载的可能不安全的文件。  
  
当通过 MotW 标记打开可执行文件时，Windows 会提醒用户称该文件下载自互联网，可能是有害的，并会提供继续执行或终止的选项。  
  
  
![](../../.resource/remote/27f03c817f6e300abd6362af595633d5d9a4f72cca70667b043fd9f78e75a4df.gif "")  
  
**从符号链接到可执行文件**  
  
  
CVE-2025-31334有助于威胁行动者在打开 WinRAR 7.11 之前版本中打开指向可执行文件的符号链接时，绕过 MotW 安全警报。攻击者可通过使用一个特殊构造的符号链接执行任意代码。值得注意的是，只有通过管理员权限才能在 Windows 上创建符号链接。  
  
该漏洞的评分为6.8，为中危级别，已在 WinRAR 最新版本中修复。该应用的变更日志中提到，“如指向一份可执行文件的符号链接从 WinRAR shell 中启动，则可执行的 MotW 数据被忽视。”  
  
该漏洞由日本三井物产安全方向公司的研究员 Shimamine Taihei 通过信息技术推广局 (IPA) 报送。日本计算机安全事件响应中心与 WinRAR 开发人员协同披露该漏洞。  
  
从 7.10 版本开始，WinRAR 提供从MotW 删除交换数据流信息（如位置、IP地址）的选项，以免用户遭隐私风险。包括国家黑客组织在内的威胁行动者们此前利用 MotW 绕过，在未触发安全警报的情况下传播各种恶意软件。最近，俄罗斯黑客利用了位于7-Zip 压缩文档中的一个类似漏洞。当黑客再次压缩以运行恶意软件释放器 Smokeloader 时，并未波及 MotW。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/winrar-flaw-bypasses-windows-mark-of-the-web-security-alerts/  
  
  
  
题图：  
Pixabay   
License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
