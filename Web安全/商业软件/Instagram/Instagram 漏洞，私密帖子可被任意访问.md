---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Instagram 私密帖子授权缺失争议报告"
product: "Instagram"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2025-10特定账户/请求头条件不明；2026-01转述"
prerequisites: "未登录声明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://medium.com/@jatin.b.rx3/i-found-a-bug-that-exposed-private-instagram-posts-to-anyone-eebb7923f7e3"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Instagram/Instagram%20%E6%BC%8F%E6%B4%9E%EF%BC%8C%E7%A7%81%E5%AF%86%E5%B8%96%E5%AD%90%E5%8F%AF%E8%A2%AB%E4%BB%BB%E6%84%8F%E8%AE%BF%E9%97%AE.md"
id: "vw-d227098d58fb862b5d70b303"
entity_id: "ve-d227098d58fb862b5d70b303"
schema_version: "1"
---

# Instagram 私密帖子授权缺失争议报告

## 条目说明

- 对象与具体问题：Instagram；私密帖子授权缺失争议报告
- 版本、配置及部署条件：2025-10特定账户/请求头条件不明；2026-01转述
- 认证与权限前提：未登录声明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题任意访问与2/7授权账户有条件受影响不一致，样本比例不能外推
- 根因/Meta悄然针对性修复/故意否认是研究者解释，平台不同意见及未独立核验须并列
- Git时间戳/提交历史无法事后伪造断言错误，哈希完整性不等于可信时间
- 两处段落在会被错/在截断，关键头/完整响应/视频/仓库未直接收录
- 10月12首次报告至16失效非48小时，若从14提供账户计算需明确；避免复述私人账户标识，保留自有测试范围

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 骨哥说事
                    骨哥说事  骨哥说事   2026-01-26 16:01  
  
<table><tbody><tr><td data-colwidth="557" width="557" valign="top" style="word-break: break-all;"><h1 data-selectable-paragraph="" style="white-space: normal;outline: 0px;max-width: 100%;font-family: -apple-system, system-ui, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;background-color: rgb(255, 255, 255);box-sizing: border-box !important;overflow-wrap: break-word !important;"><strong style="outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="outline: 0px;max-width: 100%;font-size: 18px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="color: rgb(255, 0, 0);"><strong><span style="font-size: 15px;"><span leaf="">声明：</span></span></strong></span><span style="font-size: 15px;"></span></span></strong><span style="outline: 0px;max-width: 100%;font-size: 18px;box-sizing: border-box !important;overflow-wrap: break-word !important;"><span style="font-size: 15px;"><span leaf="">文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。</span></span></span></h1></td></tr></tbody></table>

#   
  
##   
  
****# 防走失：https://gugesay.com/archives/5224  
  
******不想错过任何消息？设置星标****↓ ↓ ↓**  
****  
##   
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hZj512NN8jlbXyV4tJfwXpicwdZ2gTB6XtwoqRvbaCy3UgU1Upgn094oibelRBGyMs5GgicFKNkW1f62QPCwGwKxA/640?wx_fmt=png&from=appmsg "")  
  
相关链接与视频演示请从博客或下方原文链接查看。  
  
**开发者工具显示 polaris_timeline_connection 中暴露的私密帖子数据。查看包含泄露数据的完整示例响应【请点击此处】**  
  
2025年10月，安全研究员 Jatin Banga 发现 Instagram 存在一个严重的服务器端漏洞，该漏洞允许未经身份验证的用户直接访问私密账户发布的帖子。整个过程**无需登录认证**  
、**无需建立关注关系**  
，攻击者仅需发送一个携带特定请求头的 HTTP 请求即可实现。  
  
Meta 公司在收到其漏洞报告后的 48 小时内悄然修复了此问题。然而，该公司随后将提交的案例标记为“不适用” 并予以关闭，官方层面否认该漏洞曾存在，尽管实际修复的内容与其报告完全一致。  
  
此次事件揭开了研究员历时 102 天与 Meta 漏洞赏金程序交涉的过程。下文将详述该漏洞的发现、报告与最终被否认的完整故事。  
> **更新（验证请求）：**  
 研究员邀请独立安全专家审查相关的技术分析、时间线记录及证据材料，以评估所述漏洞在测试期间是否真实可被利用。  
  
#### 漏洞的发现过程  
  
研究员 Jatin Banga 在开发一个 HTTP 请求工作流自动化工具时，意外发现了异常情况。在审查 Instagram 移动版网页的响应数据时，他注意到服务器返回了本不应被访问内容的 CDN（内容分发网络）链接。  
  
这些链接指向的是**私密帖子**  
，包括**全分辨率图片**  
和**标题文字**  
等完整内容。这些数据均嵌入在对一个未经身份验证请求的 HTML 响应中。  
  
起初，研究员对此表示怀疑，并进行了多次验证：刷新页面、重复发送请求、确认自身登录状态。但结果表明，其并未处于登录状态，而数据却持续返回。  
  
研究员曾推测这可能是一个偶然的缓存异常现象，但经过对同一账户的反复测试，异常并未消失。为了严谨验证，研究员使用自己的私密账户进行了测试：发布一个帖子，等待数小时后，在未认证状态下发送相同请求。结果显示，帖子内容及其 CDN 链接均可被访问，证实了这并非偶然性错误。  
#### 漏洞技术原理  
  
该漏洞的利用方式极为简单直接：  
1. 向 instagram.com/<私密用户名>  
 发送未经认证的 GET 请求，并携带特定的移动端请求头  
  
1. 服务器返回的 HTML 中包含一个内嵌的 JSON 结构，其中含有 polaris_timeline_connection  
 字段  
  
1. 从该字段的 edges  
 数组中提取出私密内容的 CDN 链接。  
  
1. 通过链接直接访问包含标题的私密照片  
  
关键在于，服务器在未验证请求者权限的情况下，**主动生成并返回了这些本应私有的数据**  
。这表明问题根源在于 Instagram 后端在组装响应数据**之前**  
，缺失了关键的授权检查逻辑，而非简单的 CDN 缓存泄露。  
#### 漏洞利用演示  
  
**PoC脚本暴露私密帖子**  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hZj512NN8jm2KyFRs3ZBaNAKupaStqRSaLhLSl0C7mARczuNBlNfHwd7SlPElCUYuTJOCmuDvnBkBOw6ZOOj4w/640?wx_fmt=png&from=appmsg "")  
  
  
脚本实际运行，成功提取私密帖子数据。相关过程可查看源视频2（第0:25秒处）。  
  
**针对第三方账户的利用演示**  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hZj512NN8jm2KyFRs3ZBaNAKupaStqRS2J0B2kUZKkiaF06ok95UjS7W1bEa8CYuX5Fo7YRJM7cuYkZia5O6pbOg/640?wx_fmt=png&from=appmsg "")  
  
  
相关过程可查看源视频3。  
#### 漏洞测试范围  
  
为遵循道德测试准则，研究员将所有正式测试限制在自身拥有或已获明确书面授权的账户内。在所测试的 7 个授权账户中：  
- **2 个账户确认存在该漏洞**  
（约占 28%）。由于漏洞最初是在一个未经授权的账户上意外发现的，因此实际存在漏洞的账户比例可能更高。  
  
- **5 个账户未受此漏洞影响。**  
  
测试表明，该漏洞的触发具有**条件性**  
，并非所有设置为私密的账户都会暴露。初步分析曾指向账户注册时长等因素，但漏洞触发的根本条件最终未能确定。  
#### 漏洞报告与交涉  
  
2025年10月12日，研究员向 Meta 的漏洞赏金计划提交了第一份详细报告，内容包括完整的技术说明、概念验证脚本及演示视频。然而，Meta 迅速关闭了该报告（案例编号：1838087146916736），并误判其为 CDN 缓存问题。  
  
研究员随即提交了第二份更清晰的报告（案例编号：1838100803582037），明确指出这是**服务器端授权检查缺失**  
问题。此次报告获得了 Meta 的跟进。  
  
**双方后续沟通时间线如下：**  
- **10月13日：**  
 Meta 要求研究员在其提供的测试账户 2fa_2fa  
 上进行复现，漏洞利用未成功。这初步证实了漏洞的条件性触发特征  
  
- **10月14日：**  
 Meta 要求提供一个存在漏洞的账户示例。研究员在获得许可后，提供了账户 its_prathambanga  
。漏洞利用成功，研究员同时发送了浏览器手动复现和脚本自动化的视频证据  
  
- **10月15日：**  
 研究员提交了详细分析报告，解释了漏洞触发的“双重状态”机制：特定请求头会诱使服务器返回 0 关注者 / 0 正在关注  
 的异常状态，在此状态下，部分账户的私有时间线数据会被错  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hZj512NN8jm2KyFRs3ZBaNAKupaStqRSia9rVWW3Usm6AWlqZJ6FiauKjZQhwkdH8PYFYYWGfcFdgboHthiagzJ4w/640?wx_fmt=png&from=appmsg "")  
  
漏洞触发的“异常状态”界面。请注意，尽管访问的私密账户拥有多位关注者，页面却显示0 关注者 / 0 正在关注，并伴有故事环。这确认了会话已进入服务器端的逻辑错误状态。  
#### 漏洞被悄然修复  
  
**2025年10月16日**  
，研究员发现针对所有先前存在漏洞账户的利用尝试均告失败，服务器开始返回空响应。Meta 在未通知研究员的情况下，**悄然修复了该漏洞**  
。  
  
研究员随后发送邮件询问修复确认事宜，但未收到任何回复。  
#### Meta 的最终否认与案例关闭  
  
2025年10月27日，即漏洞被修复约11天后，研究员收到了 Meta 的官方最终裁定：  
> “我们无法复现此问题。”  
  
  
针对一个已被修复的漏洞，Meta 给出了“无法复现”的结论。研究员立即回信指出其中的矛盾：Meta 曾索要并获得了可复现的漏洞账户示例，而这些账户现在已被修复。  
  
Meta 对此的回应是：  
> “一个无法复现的问题被修复，并不能改变它在当时无法复现的事实。即使该问题曾经可以复现，也有可能是出于修复其他问题的需要而进行了更改，此问题只是作为意外副作用被修复了。”  
  
  
最终，Meta 将该漏洞报告案例状态标记为 **“不适用”**  
 并予以关闭，未对研究员的发现给予任何正式确认或致谢。  
#### 事件中暴露的疑点  
  
整个处理过程中，存在三处令人费解的环节：  
1. **Meta 未索取关键调试数据：**  
 研究员曾主动提出提供包含 X-FB-Debug  
 请求头在内的完整网络日志，这些数据对内部追踪问题根源至关重要，但 Meta 未予回应  
  
1. **未利用现成的诊断信息：**  
 研究员提供了明确的“存在漏洞/不受影响”账户对比列表，这为分析漏洞触发条件提供了绝佳样本，但 Meta 未就此进行深入调查  
  
1. **缺乏根本原因分析：**  
 Meta 将修复简单归因于“基础设施变更”或“其它变更的意外副作用”，而非基于具体调查的有针对性修复。在  
  
#### 研究员保留的完整证据链  
  
为确保证据的可信度，研究员系统性地保留了所有材料，并进行了时间戳和完整性校验：  
- **PoC 脚本：**  
 可自动化提取私密 CDN 链接的 Python 脚本。  
  
- **修复前后对比截图：**  
 同一请求在漏洞存在时和被修复后的响应对比。  
  
- **带验签的视频证据：**  
 4 段附有具体时间戳和 SHA256 哈希值的屏幕录像，相关文件提交至 Git 的历史记录可查。  
  
- **完整的沟通记录：**  
 与 Meta 所有往来邮件的 PDF 存档。  
  
- **原始网络日志与样本：**  
 包括攻击成功与失败时的请求头、响应数据及暴露的 CDN 链接样本。  
  
**所有证据均在报告过程中实时提交至 Git 仓库，其时间戳和提交历史无法事后伪造。**  
  
**漏洞修复前后界面对比**  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hZj512NN8jm2KyFRs3ZBaNAKupaStqRSuCZlQyWnAWfibicRO1llhu9fcH6AFVfHwSwY8mV3hdzUFYV11Sojxm6A/640?wx_fmt=png&from=appmsg "")  
修复前：polaris_timeline_connection.edges 字段中包含私密数据。  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hZj512NN8jm2KyFRs3ZBaNAKupaStqRSZXvLZInwOjcoFrh75hdwRqxVv9LvmQ1FiaDiapRIvZNk5QpkACRV7aYw/640?wx_fmt=png&from=appmsg "")  
修复后：相同请求返回空的 edges 数组。对比过程可查看源视频4。  
#### 事件反思与影响  
  
尽管无法断定这是 Meta 的有意掩盖还是流程疏忽，但两种可能性都揭示了大型科技公司在漏洞处理上可能存在的通病。  
  
可以确定的事实包括：  
1. 漏洞确实存在，并有视频等多重证据记录  
  
1. Meta 在调查中曾主动索要并获得了可复现漏洞的账户示例  
  
1. 这些特定账户在 48 小时内被修复  
  
1. 修复完成后，Meta 转而声称漏洞“无法复现”并关闭案例，未进行根因分析  
  
Instagram 拥有超过十亿用户，其“私密”功能的可靠性是用户信任的基石。一个仅随机或条件性影响部分用户的漏洞，比影响全体用户的漏洞更具隐蔽性和危险性——它更难以被用户察觉、被平台诊断，其修复状态也更难被有效验证  
  
Meta 以“基础设施变化”为由轻描淡写地带过，难以让安全社区和用户群体信服其安全响应机制的严谨性  
#### 选择公开披露的原因  
  
业内通行的协调披露窗口期通常为 90 天。研究员给予了 Meta 102 天的处理时间，并进行了多次升级沟通。虽然目前所有已知的测试账户上该漏洞已失效，但由于 Meta 未提供根本原因分析，无法确认引发该漏洞的底层逻辑缺陷是否已得到彻底修补。基于对透明度和用户安全的考量，研究员决定公开此事件的完整经过。  
  
原文：https://medium.com/@jatin.b.rx3/i-found-a-bug-that-exposed-private-instagram-posts-to-anyone-eebb7923f7e3  
  
- END -  
  
**感谢阅读，如果觉得还不错的话，动动手指一键三连～**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
