---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-44133"
identifier_role: "primary"
primary_identifiers: "CVE-2024-44133"
referenced_identifiers: ""
identifier_status: "unknown"
title: "macOS 用户： Safari严重安全漏洞可致摄像头、麦克风数据被捕获"
product: "macOS TCC与Safari偏好设置"
record_type: "advisory"
document_type: "隐私保护绕过新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地攻击者已能执行dscl并修改用户配置；文中2024-09-16 Sequoia更新修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/macOS/macOS%20%E7%94%A8%E6%88%B7%EF%BC%9A%20Safari%E4%B8%A5%E9%87%8D%E5%AE%89%E5%85%A8%E6%BC%8F%E6%B4%9E%E5%8F%AF%E8%87%B4%E6%91%84%E5%83%8F%E5%A4%B4%E3%80%81%E9%BA%A6%E5%85%8B%E9%A3%8E%E6%95%B0%E6%8D%AE%E8%A2%AB%E6%8D%95%E8%8E%B7.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-9759745fc37ed76a931b2716"
entity_id: "ve-9759745fc37ed76a931b2716"
schema_version: "1"
---

# macOS 用户： Safari严重安全漏洞可致摄像头、麦克风数据被捕获

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：macOS TCC与Safari偏好设置
- 文献类型：隐私保护绕过新闻
- 版本、权限及部署边界：本地攻击者已能执行dscl并修改用户配置；文中2024-09-16 Sequoia更新修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题容易理解为远程网页零点击摄像头攻击，实际需本地执行与改主目录权限，需显著前置
2. 无TCC权限不等于无其他权限，dscl身份验证与用户类型条件未交代
3. 保留明确AdLoad只是相似活动、未证实直接利用的限定，不应抽为在野确认
4. 缺精确修复版本/旧分支与Microsoft原报告；只有DarkReading转载
5. 大量推荐表格和广告应移除，Safari组件与系统TCC实体关联

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.darkreading.com/vulnerabilities-threats/macos-safari-exploit-camera-mic-browser-data>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649787055&idx=1&sn=5fbaf89659bf338d051cb13fa1bf9923&chksm=8893bac0bfe433d624ae16f6ea2aac5b4e7f989baf93d651e5c5725c4a3df924fd0e735b0fb4&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649787042&idx=1&sn=9ff9664f254d1077000edf4df5aeb18b&chksm=8893bacdbfe433dbddfdff5e5b5ff909029b141c9c1b7ddb9543066891e251c28569991008e3&scene=21#wechat_redirect>
- 原文参考链接（未重新核验）：<http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&mid=2649787034&idx=1&sn=601d3128dda5bfa5e68dd68383a041e6&chksm=8893baf5bfe433e3ec3f75a4834085c3e9714c020268cd733fcb4f2de2390a547ffe654f9133&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 安全客   2024-10-21 15:21  
  
微软近期曝光了一项严重的安全漏洞，涉及苹果的透明度、同意和控制（TCC）框架。  
这一漏洞名为 HM Surf（CVE-2024-44133），攻击者可以利用它绕过用户隐私设置，访问敏感数据  
。苹果在 9 月 16 日对 macOS Sequoia 的更新中发布了 CVE-2024-44133 的修复。  
  
  
  
**HM Surf 漏洞****让攻击者能在未获用户同意的情况下，轻松获取浏览器数据、摄像头、麦克风及位置信****息。**微软威胁情报团队的 Jonathan Bar Or 表示，这一漏洞的关键在于某些苹果专有应用（如 Safari）具备特殊权限，能够轻松绕过 TCC 的保护。“HM Surf 涉及移除 Safari 浏览器目录的 TCC 保护，并修改该目录中的配置文件，以获取用户的数据。”他强调，这种隐私风险让用户的安全面临严峻挑战。  
  
  
![](../../.resource/remote/b3a9ebcb2233c8f0d86c3af39f25758825e3fe74b8adabe75fd3a1b0a932ccba.jpg "")  
  
  
攻击者利用 HM Surf 漏洞的流程如下：  
  
1. 更改主目录：通过 dscl 实用程序改变当前用户的主目录，无需 TCC 访问权限。  
  
1. 修改敏感文件：在用户真实主目录下，编辑“~/Library/Safari”中的重要文件（如 PerSitePreferences.db）。  
  
1. 恢复主目录：将主目录更改回原来的目录，迫使 Safari 使用修改后的文件。  
  
1. 发起攻击：启动 Safari 打开网页，悄悄捕获快照和位置信息。  
  
更可怕的是，微软表示这一攻击可以进一步扩展——攻击者甚  
至可以保存整个摄像头视频流或悄悄地通过 Mac 的麦克风捕获音频。  
  
  
微软注意到与知名广告软件 AdLoad 相关的可疑活动，显示该漏洞可能已被恶意软件利用。Bar Or 表示：“我们观察到 AdLoad 的活动与 HM Surf 技术非常相似，但由于无法完全确认其具体步骤，我们不能确定 AdLoad 是否直接利用了这一漏洞。”  
  
  
这一事件再次提醒我们网络安全的重要性。务必定期更新软件，保持警惕，保护个人隐私。**使用 macOS 系统的用户，请及时更新至最新版本，以防潜在威胁。**Bar Or 最后指出：“攻击者利用类似的方法部署普遍威胁，强调了对抗利用该技术攻击的重要性。”  
  
  
文章来源：  
  
https://www.darkreading.com/vulnerabilities-threats/macos-safari-exploit-camera-mic-browser-data  
  
  
**推荐阅读**  
  
  
  
  
  
<table><tbody><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:4.classicTable1:0"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:4.classicTable1:0.td@@0" style="border-color: rgb(62, 62, 62);border-style: none;padding: 0px;" width="100.0000%"><section style="display: flex;flex-flow: row;margin-top: 10px;margin-right: 0%;margin-left: 0%;justify-content: flex-start;"><section style="display: inline-block;vertical-align: middle;width: auto;min-width: 10%;height: auto;flex: 0 0 auto;align-self: center;box-shadow: rgb(0, 0, 0) 0px 0px 0px;"><section style="font-size: 14px;color: rgb(5, 193, 183);line-height: 1;letter-spacing: 0px;text-align: center;"><p><strong>01</strong></p></section></section><section style="display: inline-block;vertical-align: middle;width: auto;flex: 100 100 0%;align-self: center;height: auto;"><section style="font-size: 14px;letter-spacing: 1px;line-height: 1.8;color: rgb(140, 140, 140);"><p style="text-wrap-mode: wrap;"><span style="color: rgb(224, 224, 224);">｜</span><span style="color: rgb(224, 224, 224);font-size: 12px;"><a target="_blank" href="http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&amp;mid=2649787055&amp;idx=1&amp;sn=5fbaf89659bf338d051cb13fa1bf9923&amp;chksm=8893bac0bfe433d624ae16f6ea2aac5b4e7f989baf93d651e5c5725c4a3df924fd0e735b0fb4&amp;scene=21#wechat_redirect" textvalue="AI驱动机器人暴关键漏洞，可致机器人失控执行危险行为" linktype="text" imgurl="" imgdata="null" data-itemshowtype="0" tab="innerlink" data-linktype="2">关键漏洞可致</a><a target="_blank" href="http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&amp;mid=2649787055&amp;idx=1&amp;sn=5fbaf89659bf338d051cb13fa1bf9923&amp;chksm=8893bac0bfe433d624ae16f6ea2aac5b4e7f989baf93d651e5c5725c4a3df924fd0e735b0fb4&amp;scene=21#wechat_redirect" textvalue="AI驱动机器" linktype="text" imgurl="" imgdata="null" data-itemshowtype="0" tab="innerlink" data-linktype="2">AI驱动机器人失控</a></span></p></section></section></section></td></tr><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:4.classicTable1:1"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:4.classicTable1:1.td@@0" style="border-color: rgb(62, 62, 62);border-style: none;padding: 0px;" width="100.0000%"><section style="margin: 5px 0%;"><section style="background-color: rgb(224, 224, 224);height: 1px;"><section style="line-height: 0;color:rgba(0,0,0,0);width:0;"><svg viewBox="0 0 1 1" style="vertical-align:top;"><text x="-10" y="-10">_</text></svg></section></section></section></td></tr></tbody></table>  
  
<table><tbody><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:5.classicTable1:0"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:5.classicTable1:0.td@@0" style="border-color: rgb(62, 62, 62);border-style: none;padding: 0px;" width="100.0000%"><section style="display: flex;flex-flow: row;margin-top: 10px;margin-right: 0%;margin-left: 0%;justify-content: flex-start;"><section style="display: inline-block;vertical-align: middle;width: auto;min-width: 10%;height: auto;flex: 0 0 auto;align-self: center;box-shadow: rgb(0, 0, 0) 0px 0px 0px;"><section style="font-size: 14px;color: rgb(5, 193, 183);line-height: 1;letter-spacing: 0px;text-align: center;"><p><strong>02</strong></p></section></section><section style="display: inline-block;vertical-align: middle;width: auto;flex: 100 100 0%;align-self: center;height: auto;"><section style="font-size: 14px;letter-spacing: 1px;line-height: 1.8;color: rgb(140, 140, 140);"><p style="text-wrap-mode: wrap;"><span style="color: rgb(224, 224, 224);">｜</span><span style="color: rgb(224, 224, 224);font-size: 12px;"><a target="_blank" href="http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&amp;mid=2649787042&amp;idx=1&amp;sn=9ff9664f254d1077000edf4df5aeb18b&amp;chksm=8893bacdbfe433dbddfdff5e5b5ff909029b141c9c1b7ddb9543066891e251c28569991008e3&amp;scene=21#wechat_redirect" textvalue="Linux系统安全告急：新技术绕过“noexec”，任意代码执行风险激增" linktype="text" imgurl="" imgdata="null" data-itemshowtype="0" tab="innerlink" data-linktype="2">新技术绕过“noexec”，Linux执行风险激增</a></span></p></section></section></section></td></tr><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:5.classicTable1:1"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:5.classicTable1:1.td@@0" style="border-color: rgb(62, 62, 62);border-style: none;padding: 0px;" width="100.0000%"><section style="margin: 5px 0%;"><section style="background-color: rgb(224, 224, 224);height: 1px;"><section style="line-height: 0;color:rgba(0,0,0,0);width:0;"><svg viewBox="0 0 1 1" style="vertical-align:top;"><text x="-10" y="-10">_</text></svg></section></section></section></td></tr></tbody></table>  
  
<table><tbody><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:6.classicTable1:0"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:6.classicTable1:0.td@@0" style="border-color: rgb(62, 62, 62);border-style: none;padding: 0px;" width="100.0000%"><section style="display: flex;flex-flow: row;margin-top: 10px;margin-right: 0%;margin-left: 0%;justify-content: flex-start;"><section style="display: inline-block;vertical-align: middle;width: auto;min-width: 10%;height: auto;flex: 0 0 auto;align-self: center;box-shadow: rgb(0, 0, 0) 0px 0px 0px;"><section style="font-size: 14px;color: rgb(5, 193, 183);line-height: 1;letter-spacing: 0px;text-align: center;"><p><strong>03</strong></p></section></section><section style="display: inline-block;vertical-align: middle;width: auto;flex: 100 100 0%;align-self: center;height: auto;"><section style="font-size: 14px;letter-spacing: 1px;line-height: 1.8;color: rgb(140, 140, 140);"><p style="text-wrap-mode: wrap;"><span style="color: rgb(224, 224, 224);">｜</span><span style="color: rgb(224, 224, 224);font-size: 12px;"><a target="_blank" href="http://mp.weixin.qq.com/s?__biz=MzA5ODA0NDE2MA==&amp;mid=2649787034&amp;idx=1&amp;sn=601d3128dda5bfa5e68dd68383a041e6&amp;chksm=8893baf5bfe433e3ec3f75a4834085c3e9714c020268cd733fcb4f2de2390a547ffe654f9133&amp;scene=21#wechat_redirect" textvalue="学校成网络攻击新靶心：国家级黑客与勒索团伙的双重威胁" linktype="text" imgurl="" imgdata="null" data-itemshowtype="0" tab="innerlink" data-linktype="2">学校遭国家级黑客与勒索团伙的双重网络威胁</a></span></p></section></section></section></td></tr><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:6.classicTable1:1"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:6.classicTable1:1.td@@0" style="border-color: rgb(62, 62, 62);border-style: none;padding: 0px;" width="100.0000%"><section style="margin: 5px 0%;"><section style="background-color: rgb(224, 224, 224);height: 1px;"><section style="line-height: 0;color:rgba(0,0,0,0);width:0;"><svg viewBox="0 0 1 1" style="vertical-align:top;"><text x="-10" y="-10">_</text></svg></section></section></section></td></tr></tbody></table>  
  
  
**安全KER**  
  
  
安全KER致力于搭建国内安全人才学习、工具、淘金、资讯一体化开放平台，推动数字安全社区文化的普及推广与人才生态的链接融合。目前，安全KER已整合全国数千位白帽资源，联合南京、北京、广州、深圳、长沙、上海、郑州等十余座城市，与ISC、XCon、看雪SDC、Hacking Group等数个中大型品牌达成合作。  
  
![](../../.resource/remote/d6caf2b9d07446e5db2fc0c72b39245bd35ef1117cbe12d413cf0c1f3677e90a.png "")  
  
![](../../.resource/remote/31600ffd2a8b7de6a5cfe92a17d234f4fe8bb143ca88486bc2e1ef8dac3fea63.png "")  
  
**注册安全KER社区**  
  
**链接最新“圈子”动态**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
