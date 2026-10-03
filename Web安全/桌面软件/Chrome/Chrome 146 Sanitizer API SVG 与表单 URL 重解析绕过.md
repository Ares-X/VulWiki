---
schema_version: "1"
id: "VW-20261003-chrome-sanitizer-bypasses"
title: "Chrome 146 Sanitizer API：SVG 名称解析与表单 URL 重解析绕过"
product: "Google Chrome / Blink Sanitizer API"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "原作者在 Chrome 146 演示两种绕过；需应用实际使用并允许相关元素的 Sanitizer API 配置"
fixed_version: "原作者称 Chrome 147 于 2026-04-07 带入两项修复；固定提交见正文"
prerequisites: "攻击者可控制传入 setHTML 的 HTML；应用配置保留相关 SVG 或 form 元素；原文例子需要用户点击生成的链接或提交按钮"
side_effects: "在页面来源中执行 JavaScript；公开最小例子调用 alert(1)，没有显式文件写入或外传代码；不能据此推断真实 XSS 无数据访问后果"
source: "Adam Kues / Searchlight Cyber；Chromium 官方补丁和回归测试"
source_status: "recorded"
source_url: "https://www.slcyber.io/research/two-bypasses-for-chromes-sanitizer-api"
verification_source: "https://github.com/chromium/chromium/commit/99dfc1af6343a7e33446157fcaf463a714097f48"
---

# Chrome Sanitizer API 的两种解析边界绕过

## 核对边界

2026-10-03 静态核对原始研究、两项固定 Chromium 补丁及 SVG 回归测试，未将例子装入浏览器、执行脚本或构建 Chromium。本文没有把两项问题合并成一个已确认 CVE，也没有把两项原始发现都归给同一个人。

Adam Kues 公开了 Chrome 146 中的两个不同机制：第一项由其发现并报告；第二项是其从既有 Chromium 提交逆向分析后推导的演示。第二项最初发现/报告者未由该文章明确给出，补丁作者也不能自动等同漏洞发现者。[原始研究，2026-05-22](https://www.slcyber.io/research/two-bypasses-for-chromes-sanitizer-api)

## 适用条件

HTML 必须进入受影响浏览器的安全 `setHTML` 路径，且实际配置允许所需元素。原文讨论包含空配置 `new Sanitizer({})` 的宽松模式；不能仅凭页面存在 HTML 输入框就认定可利用。浏览器对 SVG 动画、URL 和表单的具体处理也是前提，不能把 Chrome 的结果推广到 Firefox、Safari 或所有净化库。

## 第一项：SVG 动画属性名解析不一致

旧逻辑对 `attributeName` 做原始字符串比较，但 SVG 动画稍后会按限定名称规则解释它。原文关键属性值为 `xlink:href:x`，随后动画将链接导向 `javascript:alert(1)`。[原文第一项 PoC](https://www.slcyber.io/research/two-bypasses-for-chromes-sanitizer-api)

可独立核对的公开回归证据在提交 [99dfc1af6343a7e33446157fcaf463a714097f48](https://github.com/chromium/chromium/commit/99dfc1af6343a7e33446157fcaf463a714097f48) 的 `third_party/blink/renderer/core/sanitizer/sanitizer_unittest.cc`。`SvgSetWithMultipleColons` 使用 SVG `set` 元素，目标包含同一多冒号属性名，随后在安全净化结果中断言不存在 `attributeName`。它与文章的 `animate` 演示互补，不能把两者描述成同一份字节完全相同的 PoC。

同提交的 `sanitizer.cc` 改为调用 `Document::ParseQualifiedName`，用 `kParsingAttribute` 模式取得 `local_name`，再判定是否为 `href`。静态差异表明补丁把判定对象从原始文本移到解析结果；源码回归测试是公开验证材料，但本库没有执行它。

## 第二项：非法 URL 经表单提交变成可执行 URL

原文的最小表单：

```html
<form action="javascript://://-alert(1)//">
 <button type="submit">click me</button>
</form>
```

直接把某个无效 URL 留在 DOM，不代表点击时一定执行。该例还依赖 GET 表单提交时重组 URL：原作者报告结果变为 `javascript:/.//-alert(1)//?`，从而在点击提交时执行。这里的失败对照非常重要，不能把任意“含 javascript 但 URL 无效”的字符串都标成可执行 XSS。[原文 URL Reparsing 分析与 PoC](https://www.slcyber.io/research/two-bypasses-for-chromes-sanitizer-api)

固定提交 [c7d115c0878465398b7aa3ceea3841484010a25e](https://github.com/chromium/chromium/commit/c7d115c0878465398b7aa3ceea3841484010a25e) 将 `RemoveAttributeIfProtocolIsJavaScript()` 中的 `KURL(value.GetString()).ProtocolIsJavaScript()` 改为独立 `ProtocolIsJavaScript(value)`。该差异支持“只判断 scheme，不让整个 URL 无效使检查失效”的修复解释；提交说明以解析优化描述变更，不能只凭提交标题把它算作另一份独立漏洞报告。

## 副作用与后续验证

公开最小 HTML 没有 npm/pip 安装脚本、远程脚本加载器、文件写入或显式数据回传；它会触发页面 JavaScript 和弹窗。完整 Chromium 构建/测试体系的依赖并未审计或运行，不能把“最小片段无安装步骤”扩大为整个仓库已通过安全审计。

授权回归应同时保留输入 HTML、实际 Sanitizer 配置、净化后 DOM、点击前后行为与精确浏览器构建号。对照应包括修复版、移除相关元素的配置及原文所述直接无效 URL 的不执行情形。仅检查净化后的字符串可能漏掉第二项；仅观察弹窗又不能定位究竟是哪一条边界失效。测试应在没有真实账户、外部资源和持久站点数据的隔离页面完成，结束后关闭页面并清理测试资料。

## 修复与来源

原作者称两项修复随 2026-04-07 的 Chrome 147 发布；本次确认到上游固定提交，但未独立核对每个平台的全部发行构建或回移分支。升级到包含补丁的受支持版本，并回归实际 HTML 配置。严格元素/属性允许列表可缩小风险面，但应与浏览器升级区分。

- [Adam Kues / Searchlight Cyber 原文](https://www.slcyber.io/research/two-bypasses-for-chromes-sanitizer-api)：两种公开演示、测试/修复主版本及发现归属边界
- [Chromium SVG 补丁与回归测试](https://github.com/chromium/chromium/commit/99dfc1af6343a7e33446157fcaf463a714097f48)：解析规则与回归断言
- [Chromium scheme 检查补丁](https://github.com/chromium/chromium/commit/c7d115c0878465398b7aa3ceea3841484010a25e)：独立 scheme 检查变更
- 本文为原创中文分析；未独立复现，不把原作者成功演示当作本库测试结果
