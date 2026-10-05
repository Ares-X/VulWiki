---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-49415"
identifier_role: "primary"
primary_identifiers: "CVE-2024-49415"
referenced_identifiers: "CVE-2024-49413;CVE-2024-44068"
identifier_status: "unknown"
title: "Google Project Zero 研究人员发现针对三星设备的零点击漏洞"
product: "Samsung libsaped.so APE decoder"
record_type: "advisory"
document_type: "漏洞研究新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Android12/13/14中SMR Dec2024 Release1之前；S24且Google Messages启用RCS自动转录路径"
side_effects: "保留研究者明确可利用性不清、已观察媒体进程崩溃；不得标题零点击直接等同稳定RCE或所有三星型号"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Google%20Project%20Zero%20%E7%A0%94%E7%A9%B6%E4%BA%BA%E5%91%98%E5%8F%91%E7%8E%B0%E9%92%88%E5%AF%B9%E4%B8%89%E6%98%9F%E8%AE%BE%E5%A4%87%E7%9A%84%E9%9B%B6%E7%82%B9%E5%87%BB%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-d08419fc5ea181e112d49380"
entity_id: "ve-d08419fc5ea181e112d49380"
schema_version: "1"
---

# Google Project Zero 研究人员发现针对三星设备的零点击漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Samsung libsaped.so APE decoder
- 文献类型：漏洞研究新闻
- 版本、权限及部署边界：Android12/13/14中SMR Dec2024 Release1之前；S24且Google Messages启用RCS自动转录路径
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 每样本字节数24应核实为24位/3字节，现文字与最多3*blocks计算矛盾
2. 保留研究者明确可利用性不清、已观察媒体进程崩溃；不得标题零点击直接等同稳定RCE或所有三星型号
3. 49413SmartSwitch和44068处理器历史在野为背景，不能把后者在野状态赋给49415
4. ProjectZero原始issue和三星公告链接完整，月度公告应固定历史日期/条目；无本地PoC且截图未视检

### 操作风险

保留研究者明确可利用性不清、已观察媒体进程崩溃；不得标题零点击直接等同稳定RCE或所有三星型号

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://project-zero.issues.chromium.org/issues/368695689>
- 原文参考链接（未重新核验）：<https://security.samsungmobile.com/securityUpdate.smsb>
- 原文参考链接（未重新核验）：<https://thehackernews.com/2025/01/google-project-zero-researcher-uncovers.html>
- 原文参考链接（未重新核验）：<https://securityaffairs.com/172909/hacking/samsung-zero-click-flaw.html>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

会杀毒的单反狗  军哥网络安全读报   2025-01-11 01:03  
  
**导****读**  
  
  
  
网络安全研究人员详细介绍了目前已修补的安全漏洞，该漏洞影响三星智能手机上的Monkey Audio (APE) 解码器，可能导致代码执行。  
  
![](../../.resource/remote/ebf9f68b7c67048dd38c863939a53bda31a3c04c066131fdcc449d56ba491d53.png "")  
  
该漏洞编号为CVE-2024-49415，CVSS 评分：8.1，影响运行 Android 12、13 和 14 版本的三星设备。  
  
  
三星在 2024 年 12 月作为其每月安全更新的一部分发布的针对该漏洞的公告中表示： “SMR Dec-2024 Release 1 之前的 libsaped.so 中的越界写入允许远程攻击者执行任意代码。”“该补丁添加了正确的输入验证。”  
  
  
发现并报告该缺陷的 Google Project Zero 研究员 Natalie Silvanovich 将其描述为无需用户交互即可触发（即零点击）并且在特定条件下是一个“有趣的新攻击面”。  
  
  
三星 S24 上的 Monkey's Audio (APE) 解码器中存在越界写入。libsaped.so 中的 saped_rec 函数写入由 C2 媒体服务分配的 dmabuf，该 dmabuf 的大小似乎始终为 0x120000。虽然 libsapedextractor 提取的最大块/帧值也限制为 0x120000，但如果输入的每个样本的字节数为 24，saped_rec 最多可以写入 3 * 块/帧字节。  
  
  
“这意味着块/帧大小较大的 APE 文件可能会严重溢出此缓冲区。” Silvanovich 写道。“请注意，如果 Google Messages 配置为 RCS（此设备上的默认配置），那么这是三星 S24 上的一个完全远程（0 次点击）错误，因为转录服务会在用户与消息交互以进行转录之前解码传入的音频。”  
  
  
攻击者可以通过 Google Messages 向启用了 RCS 的设备发送特制的音频消息来利用此漏洞，从而导致设备的媒体编解码器进程（“samsung.software.media.c2”）崩溃。  
  
  
研究人员指出，该漏洞会导致 DMA 缓冲区溢出，但其可利用性尚不清楚，因为非 DMA 数据似乎分配在相邻的缓冲区中。  
  
  
三星 2024 年 12 月的补丁还解决了 SmartSwitch 中的另一个高严重漏洞 ( CVE-2024-49413，CVSS 评分：7.1)，该漏洞可能允许本地攻击者利用不正确的加密签名验证来安装恶意应用程序。  
  
  
2024 年 10 月，谷歌威胁分析小组 (TAG)警告称，三星  
0day   
漏洞 CVE-2024-44068  
    
（CVSS 评分为 8.1），已被野外利用。  
  
  
该漏洞是一个释放后使用问题，攻击者可以利用该漏洞在易受攻击的 Android 设备上提升权限。  
  
  
该漏洞存在于三星移动处理器中，据专家称，该漏洞与其他漏洞相结合，可在易受攻击的设备上实现任意代码执行。  
  
  
三星于 2024 年 10 月发布安全更新解决了该漏洞。  
  
  
谷歌Project Zero漏洞披露：  
  
https://project-zero.issues.chromium.org/issues/368695689  
  
  
三星官方安全公告  
:  
  
https://security.samsungmobile.com/securityUpdate.smsb  
  
  
新闻链接：  
  
https://thehackernews.com/2025/01/google-project-zero-researcher-uncovers.html  
  
https://securityaffairs.com/172909/hacking/samsung-zero-click-flaw.html  
  
![](../../.resource/remote/3e3d8ac7aa21737801e6da1cde8fe2f97e6acf7ec5b9af655b5c65fddc7d7d98.jpg "")  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
