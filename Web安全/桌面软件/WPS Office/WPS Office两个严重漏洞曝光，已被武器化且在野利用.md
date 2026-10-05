---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-7262;CVE-2024-7263"
identifier_role: "primary"
primary_identifiers: "CVE-2024-7262;CVE-2024-7263"
referenced_identifiers: ""
identifier_status: "unknown"
title: "WPS Office两个严重漏洞曝光，已被武器化且在野利用"
product: "Kingsoft WPS Office Windows"
record_type: "roundup"
document_type: "多漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "打开诱导文档；文中7262范围12.2.0.13110–13489与修复16909关系未说明；7263范围至17153前"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/WPS%20Office/WPS%20Office%E4%B8%A4%E4%B8%AA%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E6%9B%9D%E5%85%89%EF%BC%8C%E5%B7%B2%E8%A2%AB%E6%AD%A6%E5%99%A8%E5%8C%96%E4%B8%94%E5%9C%A8%E9%87%8E%E5%88%A9%E7%94%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-dde8f9b0d566d1ddaa79475c"
entity_id: "ve-dde8f9b0d566d1ddaa79475c"
schema_version: "1"
---

# WPS Office两个严重漏洞曝光，已被武器化且在野利用

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Kingsoft WPS Office Windows
- 文献类型：多漏洞新闻
- 版本、权限及部署边界：打开诱导文档；文中7262范围12.2.0.13110–13489与修复16909关系未说明；7263范围至17153前
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据只列7262而正文包含两个独立漏洞，需多实体
2. 标题称两漏洞均已在野利用，正文仅为7262给出利用依据；7263的在野状态需单独核验
3. 共同CVSS9.3、国际版限定与国内版不受影响均缺可靠原始支持，尤其不能据圈内消息排除风险
4. 任意代码执行不自动意味着系统最高权限；需说明当前用户上下文
5. 影响上界13489与修复16909间的版本空档需区分已测范围和首次修复，不直接猜测补全
6. 补ESET与厂商原始公告及日期锚点，清理推广文案

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://securityonline.info/wps-office-vulnerabilities-expose-200-million-users-cve-2024-7262-exploited-in-the-wild/>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494753&idx=1&sn=a9ee1d680adf601e9ee212fc3841387f&chksm=ce1f16fef9689fe8ad2926bc3739025b04955e5c29fee949f44be9fe8262d8723110eb50b6b9&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494714&idx=1&sn=fe28fee45c1508a1645fd04c2b18ca82&chksm=ce1f16a5f9689fb3996529f7738a1b7dc3960f3fc5bd31c7d1505dbd3a179d5b3bfd6c66e5f3&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

流苏  FreeBuf   2024-08-19 18:44  
  
![](../../.resource/remote/a292ac9cc234e46f20d8114e58408ccfc661566640b7fb44ab2686d5eeb8dc3a.gif "")  
  
  
WPS Office作为一款用户基数超过2亿的广泛使用的办公套件，被发现存在两个关键漏洞（CVE-2024-7262和CVE-2024-7263），这些漏洞可能导致用户遭受远程代码执行攻击。这两个漏洞的CVSS评分为9.3，表明它们的严重性很高，且易于被利用。其中CVE-2024-7262已经被武器化，ESET的安全研究人员发现它正在野外被积极利用。但也有圈内小道消息称，该漏洞只会影响国际版，国内版本不受影响。  
  
  
**漏洞位置**  
  
  
##   
  
这两个漏洞都存在于WPS Office的`promecefpluginhost.exe`组件中。  
  
- CVE-2024-7262影响版本为12.2.0.13110至12.2.0.13489。  
  
- CVE-2024-7263影响版本为12.2.0.13110至12.2.0.17153（不包括17153）。  
  
##   
  
  
**漏洞原因**  
  
  
  
两个漏洞都源于不恰当的路径验证，使攻击者能够加载并执行任意的Windows库文件。  
  
### CVE-2024-7262：  
  
  
该漏洞存在于`promecefpluginhost.exe`进程如何验证文件路径的方式中。攻击者只需诱骗用户打开一个欺骗性的电子表格文档，即可加载恶意的Windows库文件。  
  
  
这种「单击即中」的漏洞允许攻击者在受害者的机器上执行任意代码，可能导致数据盗窃、勒索软件攻击或进一步的系统破坏。  
  
### CVE-2024-7263：  
  
  
为了解决CVE-2024-7262，金山软件发布了版本12.2.0.16909的补丁。但研究人员很快发现这个补丁并不充分。  
  
  
CVE-2024-7263利用了一个在原始修复中被忽略的未正确消毒的参数。这个疏忽使攻击者能够再次加载任意的Windows库文件，绕过了金山软件最初实施的安全措施。  
  
### 武器化与利用  
  
  
特别令人担忧的是，CVE-2024-7262已经被武器化。ESET的安全研究人员发现它正在野外被积极利用，恶意行为者正在分发旨在触发该漏洞的欺骗性电子表格文档。  
  
  
**风险缓解措施**  
  
##   
  
鉴于这些漏洞的严重性以及CVE-2024-7262已被确认的活跃利用，所有WPS Office用户必须尽快将软件更新到最新可用版本（12.2.0.17153或更高版本）。此外，建议用户采取以下额外安全措施：  
  
- 不要随意打开来源不明的文件：特别是电子表格、文档和其他可能包含恶意代码的文件。  
  
- 启用防火墙和反病毒软件：确保这些安全工具处于最新状态，并定期扫描系统以检测和清除潜在威胁。  
  
- 保持警惕：关注WPS Office和其他常用软件的安全公告，及时应用补丁和更新。  
  
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
  
![](../../.resource/remote/c756b5fb2e446e8a46aeb976861dc8502220a41de5fd7e545c0fa98a66cefe23.webp "")  
  
  
![](../../.resource/remote/af824128f3c655f23db4a009f5f2a753c9c7e209ababffdeaf5e18432c146adc.webp "")  
  
![](../../.resource/remote/f6fba0392477c2656e3f6b5c30fa49b30de791784846cdb1161c166e4b14e541.webp "")  
> https://securityonline.info/wps-office-vulnerabilities-expose-200-million-users-cve-2024-7262-exploited-in-the-wild/  
  
  
![](../../.resource/remote/0bffd438af0f544d8aead12bdd40b183fc2d88caa433e43fbd4152d042609e5d.webp "")  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494753&idx=1&sn=a9ee1d680adf601e9ee212fc3841387f&chksm=ce1f16fef9689fe8ad2926bc3739025b04955e5c29fee949f44be9fe8262d8723110eb50b6b9&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=Mzg2MTAwNzg1Ng==&mid=2247494714&idx=1&sn=fe28fee45c1508a1645fd04c2b18ca82&chksm=ce1f16a5f9689fb3996529f7738a1b7dc3960f3fc5bd31c7d1505dbd3a179d5b3bfd6c66e5f3&scene=21#wechat_redirect)  
  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651253272&idx=1&sn=82468d927062b7427e3ca8a912cb2dc7&scene=21#wechat_redirect)  
  
![](../../.resource/remote/9e6a809b9fdf5ef44cf7cd86b8e001b4411ee0bfd0f43b726a7d5f1d85e9c9a1.gif "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
