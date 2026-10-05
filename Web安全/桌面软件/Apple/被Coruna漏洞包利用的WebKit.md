---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-43010;CVE-2023-43000;CVE-2023-41974;CVE-2024-23222"
identifier_role: "primary"
primary_identifiers: "CVE-2023-43010;CVE-2023-43000;CVE-2023-41974;CVE-2024-23222"
referenced_identifiers: "CVE-2023-32434;CVE-2023-38606"
identifier_status: "unknown"
title: "Apple为旧版iPhone/iPad发布紧急安全更新，修复被Coruna漏洞包利用的WebKit漏洞"
product: "Apple旧版iOS/iPadOS WebKit与内核"
record_type: "roundup"
document_type: "多漏洞回补与利用包新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称15.8.7/16.7.15回补；Coruna覆盖13.0–17.2.1，攻击链与单漏洞范围须拆开"
side_effects: "安全建议支持17.2及以上立即更新却未给目标安全版本，且前文明示攻击包覆盖17.2.1，不能把17.2当通用安全下限"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Apple/%E8%A2%ABCoruna%E6%BC%8F%E6%B4%9E%E5%8C%85%E5%88%A9%E7%94%A8%E7%9A%84WebKit.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-381b7e010d27232690468a9d"
entity_id: "ve-381b7e010d27232690468a9d"
schema_version: "1"
---

#  Apple为旧版iPhone/iPad发布紧急安全更新，修复被Coruna漏洞包利用的WebKit漏洞  

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple旧版iOS/iPadOS WebKit与内核
- 文献类型：多漏洞回补与利用包新闻
- 版本、权限及部署边界：文称15.8.7/16.7.15回补；Coruna覆盖13.0–17.2.1，攻击链与单漏洞范围须拆开
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 安全建议支持17.2及以上立即更新却未给目标安全版本，且前文明示攻击包覆盖17.2.1，不能把17.2当通用安全下限
2. CVE43010、历史首修和旧分支版本均需Apple原文核对，只有THN名称无链接
3. 将CryptoWats与Coruna直接等同、国家级工具流出等归因需Google/iVerify原研究；正文也承认同CVE不能证明同源，应保留不确定性
4. 至少四主修复CVE元数据空；Triangulation两CVE是关联背景不能当本次全部补丁
5. 大量重复铺陈和HTML样式、表后标题粘连；迁移动系统

### 操作风险

安全建议支持17.2及以上立即更新却未给目标安全版本，且前文明示攻击包覆盖17.2.1，不能把17.2当通用安全下限

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 黑白之道   2026-03-13 01:46  
  
> **导语**  
：苹果公司近日为一批旧版iOS设备发布紧急安全更新，回溯修复了一个被名为"Coruna"的iOS漏洞利用工具包（Exploit Kit）所利用的WebKit高危漏洞。这波更新主要针对无法升级到iOS 17.2及以上版本的旧设备，包括iPhone 6s、iPhone 7、iPhone 8等经典机型。  
  
## 一、事件概述  
### 1.1 漏洞背景  
  
本次修复的漏洞编号为**CVE-2023-43010**  
，是WebKit引擎中的一个内存损坏漏洞。当用户通过Safari浏览器访问经过恶意构造的网页内容时，攻击者即可触发该漏洞，导致内存破坏并可能实现任意代码执行。  
  
苹果公司在安全公告中指出：  
> "此修复程序最初随iOS 17.2于2023年12月11日发布，此次更新将修复方案引入无法升级到最新iOS版本的设备。"  
  
### 1.2 Coruna漏洞包威胁  
  
此次漏洞修复与一个名为**Coruna**  
的iOS漏洞利用工具包密切相关。根据Google安全研究团队的披露，Coruna漏洞包包含了**23个漏洞利用**  
，分为5条攻击链，专门针对运行iOS 13.0至17.2.1版本的iPhone设备。  
  
安全公司iVerify将该恶意框架命名为"CryptoWats"，并指出其与此前由美国政府机构背景的威胁参与者开发的框架存在相似之处。  
## 二、受影响设备与版本  
### 2.1 更新涵盖的设备  
  
此次苹果发布的安全更新涵盖以下设备和版本：  
  
**iOS 15.8.7 / iPadOS 15.8.7 适用于：**  
- iPhone 6s（全系列）  
  
- iPhone 7（全系列）  
  
- iPhone SE（第一代）  
  
- iPad Air 2  
  
- iPad mini（第四代）  
  
- iPod touch（第七代）  
  
**iOS 16.7.15 / iPadOS 16.7.15 适用于：**  
- iPhone 8  
  
- iPhone 8 Plus  
  
- iPhone X  
  
- iPad（第五代）  
  
- iPad Pro 9.7英寸  
  
- iPad Pro 12.9英寸（第一代）  
  
![iPhone安全更新示意图](../../.resource/remote/efe23438a23acf220cae3c77daf3e76d470bc7607a122f0f66f84be50be0a31b.png "iPhone安全更新示意图")  
 # 版权：本文配图  
## 三、修复的漏洞详情  
### 3.1 核心漏洞：CVE-2023-43010  
  
这是本次更新的核心漏洞，最初在iOS 17.2中修复，现已回溯到旧版本。该漏洞存在于WebKit引擎中，可通过处理恶意网页内容触发内存损坏。  
### 3.2 其他修复的关联漏洞  
  
iOS 15.8.7和iPadOS 15.8.7还包含另外三个与Coruna漏洞包相关的安全修复：  
<table><thead><tr><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">漏洞编号</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">原修复版本</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">漏洞类型</span></section></th><th style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;text-align: center;font-weight: bold;color: rgb(72, 112, 172);background: rgb(247, 247, 247);"><section><span leaf="">危害描述</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2023-43000</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">iOS 16.6</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Use-after-free</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">WebKit内存损坏，可导致代码执行</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2023-41974</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">iOS 17</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">Use-after-free</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">内核权限提升，可获取root权限</span></section></td></tr><tr><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">CVE-2024-23222</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">iOS 17.3</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">类型混淆</span></section></td><td style="border: 1px solid rgb(217, 223, 228);padding: 9px 12px;font-size: 0.75em;line-height: 22px;vertical-align: top;"><section><span leaf="">WebKit任意代码执行</span></section></td></tr></tbody></table>

## 四、Coruna漏洞包深度解析  
### 4.1 攻击能力  
  
Coruna漏洞包是一个高度复杂的iOS攻击框架，具备以下特点：  
- **23个独立漏洞利用**  
，分布在5条攻击链中  
  
- 支持iOS 13.0至17.2.1版本覆盖  
  
- 包含从浏览器沙箱逃逸到内核权限提升的完整攻击链  
  
- 被认为是目前针对iOS设备最复杂的漏洞包之一  
  
### 4.2 与Operation Triangulation的关联  
  
一个有趣的发现是，Coruna漏洞包中使用了两个曾在**Operation Triangulation**  
行动中被武器化利用的漏洞：  
- **CVE-2023-32434**  
  
- **CVE-2023-38606**  
  
Operation Triangulation是2023年针对俄罗斯用户的高级持续性威胁（APT）活动。卡巴斯基安全团队表示，考虑到这些漏洞已有公开的实现细节，任何具备足够技术能力的团队都有可能独立开发出类似的漏洞利用工具。  
  
卡巴斯基首席安全研究员Boris Larin在接受采访时表示：  
> "尽管我们进行了深入研究，但无法将Operation Triangulation归因于任何已知的APT组织或漏洞开发公司。需要强调的是，Google和iVerify的研究报告并未声称Coruna重复使用了Triangulation的代码，他们只是指出Coruna中的两个漏洞（Photon和Gallium）针对的是相同的漏洞。在我们看来，仅凭漏洞利用的相同性进行归因是不够的。"  
  
## 五、安全建议  
### 5.1 用户应采取的行动  
1. **尽快更新系统**  
：如果您的设备支持iOS 17.2及以上版本，请立即更新  
  
1. **检查设备兼容性**  
：如果设备较旧，务必安装本次发布的iOS 15.8.7或iOS 16.7.15更新  
  
1. **谨慎访问网页**  
：避免点击来源不明的链接，尤其是短链接  
  
1. **启用自动更新**  
：在设置中开启自动更新，确保系统始终保持最新  
  
### 5.2 企业用户建议  
- 建立旧设备清单，追踪需要特殊维护的iOS设备  
  
- 对无法更新的设备实施额外的网络访问控制  
  
- 加强移动设备管理（MDM）策略  
  
- 对安全团队进行Coruna漏洞包的威胁情报培训  
  
## 六、总结  
  
这次苹果公司为旧版设备发布的安全更新意义重大。它不仅修复了被活跃漏洞包利用的安全缺陷，也凸显了移动设备安全面临的持续威胁。  
  
Coruna漏洞包的出现再次证明，复杂的国家级漏洞利用工具正在流向更广泛的黑客市场。虽说这些漏洞利用主要针对特定目标，但对于普通用户而言，保持系统更新依然是抵御这类威胁的最有效手段。  
  
毕竟，在网络安全这个圈子里，预防永远比补救更重要——这句话虽然老套，但确实是真的。  
  
**参考来源**  
：The Hacker News  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
