---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-1862;CVE-2026-1861"
identifier_role: "primary"
primary_identifiers: "CVE-2026-1862;CVE-2026-1861"
referenced_identifiers: "CVE-2020-0796"
identifier_status: "unknown"
title: "Chrome 漏洞可导致攻击者执行任意代码并引发系统崩溃"
product: "Chrome V8/libvpx"
record_type: "roundup"
document_type: "双漏洞更新新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意网页/视频；文称144.0.7559.132/.133修复；渲染器沙箱仍在"
side_effects: "标题系统崩溃超过正文浏览器崩溃证据；保留沙箱内执行与后续漏洞链区分；与《Chrome漏洞允许攻击者执行任意代码并导致系统崩溃》和FreeBuf同名无空格篇正文近乎同译，后者同CyberSecurityNews来源，本篇文本表较完整"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Chrome/Chrome%20%E6%BC%8F%E6%B4%9E%E5%8F%AF%E5%AF%BC%E8%87%B4%E6%94%BB%E5%87%BB%E8%80%85%E6%89%A7%E8%A1%8C%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E5%B9%B6%E5%BC%95%E5%8F%91%E7%B3%BB%E7%BB%9F%E5%B4%A9%E6%BA%83.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://cybersecuritynews.com/chrome-vulnerabilities-arbitrary-code-2/"
id: "vw-9f9034357a9f7733c2ff2035"
entity_id: "ve-9f9034357a9f7733c2ff2035"
schema_version: "1"
---

# Chrome 漏洞可导致攻击者执行任意代码并引发系统崩溃

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Chrome V8/libvpx
- 文献类型：双漏洞更新新闻
- 版本、权限及部署边界：恶意网页/视频；文称144.0.7559.132/.133修复；渲染器沙箱仍在
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题系统崩溃超过正文浏览器崩溃证据；保留沙箱内执行与后续漏洞链区分
2. 两个主CVE元数据空，未披露在野利用不能当已利用0day
3. 与《Chrome漏洞允许攻击者执行任意代码并导致系统崩溃》和FreeBuf同名无空格篇正文近乎同译，后者同CyberSecurityNews来源，本篇文本表较完整
4. 缺Chrome原始公告、libvpx独立受影响版本和准确视频解码路径；广告及推荐移除

### 操作风险

标题系统崩溃超过正文浏览器崩溃证据；保留沙箱内执行与后续漏洞链区分；与《Chrome漏洞允许攻击者执行任意代码并导致系统崩溃》和FreeBuf同名无空格篇正文近乎同译，后者同CyberSecurityNews来源，本篇文本表较完整

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://cybersecuritynews.com/chrome-vulnerabilities-arbitrary-code-2/>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect>

### 归档技术正文

邑安科技
                    邑安科技  邑安全   2026-02-05 03:17  
  
更多全球网络安全资讯尽在邑安全  
  
![image](https://mmbiz.qpic.cn/mmbiz_jpg/1N39PtINn8ukBKAeiabDibCCVWMV36eiam3K4qhd28pIfCoqw4ibTKMcehOP5IWth0GQfSpEFETt0M3P6xp8xXHskg/640?wx_fmt=jpeg&from=appmsg "")  
  
Google 已针对 Chrome 稳定版发布关键安全更新，修复了两个高危漏洞，这些漏洞可能导致用户遭受任意代码执行（ACE）和拒绝服务（DoS）攻击。  
  
本次更新将 Windows 和 macOS 版本升级至 144.0.7559.132/.133，Linux 版本升级至 144.0.7559.132。这家科技巨头确认，更新将在未来数日或数周内逐步推送。这些补丁专门修复了浏览器 JavaScript 引擎和视频处理库中的内存损坏问题。  
## 漏洞详情  
  
更新修复了两个被归类为"高危"的安全缺陷。成功利用这些漏洞通常需要用户访问特制网站，从而在浏览器渲染进程中触发攻击。  
### （CVE-2026-1862）：V8 引擎类型混淆漏洞  
  
最严重的漏洞存在于 Google 开源的高性能 JavaScript 和 WebAssembly 引擎 V8 中。当引擎被诱骗使用不兼容的类型访问内存资源时（例如将整数视为指针），就会发生类型混淆漏洞。  
  
攻击者经常利用 V8 类型混淆漏洞来操控内存指针。这种操控允许他们越界读取或写入内存，可能导致在沙箱环境中执行任意代码。该漏洞由研究员 Chaoyuan Peng（@ret2happy）报告。  
### （CVE-2026-1861）：libvpx 堆缓冲区溢出漏洞  
  
第二个漏洞存在于 VP8 和 VP9 视频编码格式的参考软件库 libvpx 中。当进程尝试向固定长度的内存缓冲区写入超过其容量的数据时，就会发生堆缓冲区溢出。  
  
在此情况下，攻击者可在网页中嵌入畸形视频流。当 Chrome 尝试使用 libvpx 处理该视频时，溢出可能损坏堆上的相邻内存。这通常会导致浏览器崩溃（DoS），但也可与其他漏洞利用链结合实现代码执行。  
## 漏洞信息表  
<table><thead><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;"><th data-colwidth="173" valign="middle" style="box-sizing: border-box;text-align: center;margin: 0px;padding: 0px;border-top: 1px solid rgb(204, 204, 204);border-right: 1px solid rgb(204, 204, 204);border-bottom: none;border-left: 1px solid rgb(204, 204, 204);border-image: initial;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: 550;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;background: rgb(245, 245, 245);"><section style="text-align: center;"><span leaf="">CVE 编号</span></section></th><th data-colwidth="77" valign="middle" style="box-sizing: border-box;text-align: center;margin: 0px;padding: 0px;border-top: 1px solid rgb(204, 204, 204);border-right: 1px solid rgb(204, 204, 204);border-bottom: none;border-left: 1px solid rgb(204, 204, 204);border-image: initial;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: 550;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;background: rgb(245, 245, 245);"><section><span leaf="">严重等级</span></section></th><th data-colwidth="133" valign="middle" style="box-sizing: border-box;text-align: center;margin: 0px;padding: 0px;border-top: 1px solid rgb(204, 204, 204);border-right: 1px solid rgb(204, 204, 204);border-bottom: none;border-left: 1px solid rgb(204, 204, 204);border-image: initial;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: 550;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;background: rgb(245, 245, 245);"><section><span leaf="">描述</span></section></th><th data-colwidth="124" valign="middle" style="box-sizing: border-box;text-align: center;margin: 0px;padding: 0px;border-top: 1px solid rgb(204, 204, 204);border-right: 1px solid rgb(204, 204, 204);border-bottom: none;border-left: 1px solid rgb(204, 204, 204);border-image: initial;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: 550;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;background: rgb(245, 245, 245);"><section><span leaf="">组件</span></section></th><th data-colwidth="227" valign="middle" style="box-sizing: border-box;text-align: center;margin: 0px;padding: 0px;border-top: 1px solid rgb(204, 204, 204);border-right: 1px solid rgb(204, 204, 204);border-bottom: none;border-left: 1px solid rgb(204, 204, 204);border-image: initial;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: 550;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;background: rgb(245, 245, 245);"><section><span leaf="">报告者</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;"><td data-colwidth="173" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><strong style="box-sizing: border-box;font-weight: 700;margin: 0px;padding: 0px;border: 0px;text-decoration: none;font-style: normal;font-variant: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;"><span leaf="">CVE-2026-1862</span></strong></td><td data-colwidth="77" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">高危</span></section></td><td data-colwidth="133" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">类型混淆</span></section></td><td data-colwidth="124" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">V8 引擎</span></section></td><td data-colwidth="227" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">Chaoyuan Peng</span></section></td></tr><tr style="box-sizing: border-box;margin: 0px;padding: 0px;border: 0px;text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;"><td data-colwidth="173" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><strong style="box-sizing: border-box;font-weight: 700;margin: 0px;padding: 0px;border: 0px;text-decoration: none;font-style: normal;font-variant: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;"><span leaf="">CVE-2026-1861</span></strong></td><td data-colwidth="77" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">高危</span></section></td><td data-colwidth="133" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">堆缓冲区溢出</span></section></td><td data-colwidth="124" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">libvpx</span></section></td><td data-colwidth="227" valign="middle" style="box-sizing: border-box;margin: 0px;padding: 5px;border: 1px solid rgb(204, 204, 204);text-decoration: none;font-style: inherit;font-variant: inherit;font-weight: inherit;font-stretch: inherit;font-size: inherit;line-height: inherit;font-optical-sizing: inherit;font-size-adjust: inherit;font-kerning: inherit;font-feature-settings: inherit;font-variation-settings: inherit;font-language-override: inherit;vertical-align: baseline;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, &#34;WenQuanYi Micro Hei&#34;, PingFangSC;outline: none;text-align: left;word-break: break-word;white-space: pre-wrap;"><section><span leaf="">Google 内部</span></section></td></tr></tbody></table>## 缓解措施  
  
Google 未披露这些漏洞是否已被实际利用（0Day 状态），在大多数用户完成更新前将限制漏洞细节公开。但鉴于 V8 和堆溢出漏洞的性质，武器化风险仍然很高。  
  
建议企业管理员和用户立即更新。验证安装步骤如下：  
1. 打开 Chrome 并导航至菜单 > 帮助 > 关于 Google Chrome  
  
1. 确保浏览器检查更新并重启至 144.0.7559.132 或更高版本  
  
原文来自:   
cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/chrome-vulnerabilities-arbitrary-code-2/  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1N39PtINn8tD9ic928O6vIrMg4fuib48e1TsRj9K9Cz7RZBD2jjVZcKm1N4QrZ4bwBKZic5crOdItOcdDicPd3yBSg/640?wx_fmt=jpeg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
