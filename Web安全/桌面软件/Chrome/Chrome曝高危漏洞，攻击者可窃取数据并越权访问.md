---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-3619;CVE-2025-3620"
identifier_role: "primary"
primary_identifiers: "CVE-2025-3619;CVE-2025-3620"
referenced_identifiers: "CVE-2020-0796"
identifier_status: "unknown"
title: "Chrome曝高危漏洞，攻击者可窃取数据并越权访问"
product: "Chrome Codecs与USB组件"
record_type: "roundup"
document_type: "双漏洞更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称135.0.7049.95/.96修复；USB权限/设备或渲染器控制前提未知"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/Chrome%E6%9B%9D%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%EF%BC%8C%E6%94%BB%E5%87%BB%E8%80%85%E5%8F%AF%E7%AA%83%E5%8F%96%E6%95%B0%E6%8D%AE%E5%B9%B6%E8%B6%8A%E6%9D%83%E8%AE%BF%E9%97%AE.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://cybersecuritynews.com/critical-chrome-vulnerability-steal-data/"
id: "vw-99a3bb8d11827343e7338d7a"
entity_id: "ve-99a3bb8d11827343e7338d7a"
schema_version: "1"
---

# Chrome曝高危漏洞，攻击者可窃取数据并越权访问

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Chrome Codecs与USB组件
- 文献类型：双漏洞更新新闻
- 版本、权限及部署边界：文称135.0.7049.95/.96修复；USB权限/设备或渲染器控制前提未知
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 对USB先说物理设备或WebUSB，后统一无需物理接触，仅网页即可，缺逐漏洞攻击路径证据
2. 内存损坏直接推出完全控制系统和窃取密码/金融信息，缺沙箱链条，影响外推过度
3. 检测工具不等实际拦截在野攻击；未监测到在野攻击仅当报道时点状态
4. 两主CVE元数据空，只有二手新闻链接，缺官方版本/组件公告；禁WebUSB缓解也未给精确策略有效性

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://cybersecuritynews.com/critical-chrome-vulnerability-steal-data/>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect>

### 归档技术正文

邑安科技  邑安全   2025-04-16 08:45  
  
更多全球网络安全资讯尽在邑安全  
  
![](../../.resource/remote/7dcdb5ab345df0010b6999586efeefcd2f2e9fecd5c05d3624671bc4291ae4f9.png "")  
  
谷歌在发现两个高危漏洞后，已紧急为其Chrome浏览器推出安全更新。这些漏洞可能允许攻击者窃取敏感数据并越权访问用户系统。  
  
编号为CVE-2025-3619和CVE-2025-3620的漏洞影响以下版本：  
- **Windows/Mac**  
：低于135.0.7049.95/.96  
  
- **Linux**  
：低于135.0.7049.95  
  
更新将在未来数日/周内向全球用户逐步推送。  
  
### 漏洞技术细节  
1. **CVE-2025-3619（堆缓冲区溢出）**  
  
1. **位置**  
：Chrome多媒体编解码器组件  
  
1. **危害**  
：通过构造恶意媒体文件（如视频、音频）触发内存破坏，实现**远程代码执行（RCE）**  
，可导致系统完全控制与数据窃取。  
  
1. **CVE-2025-3620（释放后重用漏洞）**  
  
1. **位置**  
：Chrome USB组件  
  
1. **危害**  
：利用物理USB设备或WebUSB接口漏洞，实现**恶意代码执行**  
或**越权系统访问**  
。  
  
### 攻击风险  
- **远程利用**  
：用户仅需访问恶意网页或交互式内容即可触发漏洞，无需物理接触设备。  
  
- **数据威胁**  
：成功利用后可窃取浏览器存储的密码、金融信息等敏感数据，甚至完全控制受感染设备。  
  
- **影响范围**  
：所有未更新Chrome的桌面用户（个人/企业/政府机构），尤其是依赖Chrome管理敏感信息的组织。  
  
### 修复与行动指南  
  
**立即升级至最新版本：**  
- **Windows/Mac**  
：135.0.7049.95/.96  
  
- **Linux**  
：135.0.7049.95  
  
**手动更新步骤：**  
1. 打开Chrome，点击右上角 **⋮**  
 菜单  
  
1. 选择 **帮助 > 关于Google Chrome**  
  
1. 自动下载更新后，点击 **重新启动**  
  
**企业建议：**  
- 通过组策略（GPO）或Chrome Enterprise强制部署更新  
  
- 临时禁用高风险功能（如WebUSB）直至升级完成  
  
### 补充信息  
- **漏洞报告者**  
：外部安全研究员Elias Hohl与@retsew0x01  
  
- **谷歌防御工具**  
：AddressSanitizer、MemorySanitizer、libFuzzer等工具在漏洞大规模利用前成功拦截威胁  
  
- **技术细节管控**  
：谷歌已暂时限制漏洞详情公开，建议通  
过Chrome漏洞奖励计划获取更新  
  
**安全警示**  
：尽管当前未监测到野外攻击，但未修复系统仍处于高风险状态。建议所有用户立即更新浏览器并启用"增强型安全浏览"功能。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/critical-chrome-vulnerability-steal-data/  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](../../.resource/remote/83ae91c3bc56f5917ffcf104a4039d82991163da413f4c7ceb47ecc7293d366c.jpg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
