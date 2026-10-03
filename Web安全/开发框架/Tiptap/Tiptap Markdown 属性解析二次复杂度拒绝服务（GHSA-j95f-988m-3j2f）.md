---
schema_version: "1"
id: "VW-20261003-tiptap-markdown-attributes"
title: "Tiptap Markdown 属性解析二次复杂度拒绝服务（GHSA-j95f-988m-3j2f）"
product: "Tiptap @tiptap/core"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "active"
primary_identifiers: "GHSA-j95f-988m-3j2f"
identifier_status: "active"
version: ">=3.7.0, <3.30.5；须进入默认 Markdown block/inline 属性解析路径"
fixed_version: "@tiptap/core 3.30.5"
prerequisites: "应用将不可信 Markdown 交给 createAtomBlockMarkdownSpec、createBlockMarkdownSpec 或 createInlineMarkdownSpec 的默认属性解析器；应用入口的认证要求由集成方式决定"
side_effects: "恶意输入会消耗 CPU 并同步阻塞浏览器主线程、服务器事件循环或工作线程；持久化文档可反复触发；本文未运行性能测试"
source: "joostgrunwald；Tiptap 官方安全公告与修复提交；先知社区为本轮发现线索"
source_status: "recorded"
source_url: "https://github.com/ueberdosis/tiptap/security/advisories/GHSA-j95f-988m-3j2f"
verification_source: "https://github.com/ueberdosis/tiptap/commit/d0d499be3cce633cf54ca9aa9f3d8a5a1f98bd74"
---

# Tiptap Markdown 属性解析二次复杂度拒绝服务

这是一项历史补缺：仓库安全公告于 **2026-08-26** 发布，GitHub Advisory Database 于 **2026-09-08** 收录，本库于 **2026-10-03** 经窗口内新增分析线索回溯公告和源码。它不是本轮首次披露的新漏洞。核对的是原始公告、修复差异与上游回归测试，未安装 Tiptap、未运行 PoC，不把原作者计时写成本库复现。

## 影响范围与入口

官方结构化公告列出 `@tiptap/core >=3.7.0, <3.30.5`，首个修复版本为 `3.30.5`。公告正文保留了报告时“3.29.2 与当时 main 仍受影响”的描述；该句是报告快照，不能据此忽略后来发布的修复。

漏洞位于 Markdown 属性解析，不是所有 Tiptap 文档处理方式都受影响：

- `createAtomBlockMarkdownSpec` 与 `createBlockMarkdownSpec` 的默认解析器处理 Pandoc 风格块属性
- `createInlineMarkdownSpec` 的默认解析器处理 shortcode 行内属性
- 只消费已校验 ProseMirror JSON、从不进入 Markdown 解析路径的编辑器，不能仅因使用 Tiptap 就判为可触发
- 远程可达性、登录角色、输入长度限制以及解析发生在客户端还是服务端，应按具体应用核对，库的公告不替应用回答这些前提

## 根因与固定源码证据

以修复提交的父版本 `55f59e4907b37e0aa4404c52e965014f66158393` 为“修复前”，而不是跟随会移动的 `main`。`packages/core/src/utilities/markdown/attributeUtils.ts` 先将引号内容替换为内部占位引用，再用未限定属性起始边界的贪婪表达式寻找键值对；清理阶段又使用同类表达式。原始表达式为：

```javascript
/([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g
```

输入由重复的 `__QUOTED_0` 前缀构成且缺少所需等号时，键名匹配反复吞入后续长串，随后失败，再从下一个可能起点重试。总扫描工作随输入增长呈二次复杂度；清理阶段还会重复这类工作。这里的内部占位字符串是被分析算法的原值，不代表本库对内容作了替换。

行内路径原位于 `createInlineMarkdownSpec.ts`，原始表达式为：

```javascript
/(\w+)=(?:"([^"]*)"|'([^']*)')/g
```

连续单词字符而没有等号会造成相同的后缀重扫。它与块属性路径共享问题类别，但入口和表达式不同，验证不能只覆盖其中一个。

## 公开验证资料与对照

完整公开 PoC 保留在官方 GHSA，本文不改写其输入、参数或代码。原作者采用 `@tiptap/core 3.29.2`，通过完整公开 tokenizer 入口计时，分别构造块 token 与行内 token，而不只孤立执行正则表达式。

公告报告：20,508 字节的 atom-block token 约耗时 1.40 秒，同长度对照约 0.29 毫秒；32,776 字节的 inline token 约耗时 2.21 秒，对照约 0.19 毫秒。这些是**原作者结果**，不是跨硬件保证，也不是本库测量。

后续获授权的隔离核验应同时保留：受影响版本与修复版本、同长度正常对照、递增输入长度、三个公开 helper 的实际入口、事件循环阻塞时间，以及失败和超时结果。只看到解析成功不能证明复杂度已修复；只测一个长度也不能确认增长阶数。

风险是 CPU 和可用性消耗。服务端同步调用会阻塞同进程其他请求，浏览器端可冻结界面；若应用保存并自动重开恶意文档，影响可重复发生。不要用生产服务作计时对照。本文未复制或执行任何安装脚本、未下载附件、未向站点提交 Markdown。

## 修复与静态审查

已核对官方提交 `d0d499be3cce633cf54ca9aa9f3d8a5a1f98bd74`：

1. 核心默认属性解析改用 `tokenizeAttributes.ts`，由显式游标推进完成 token 化，并分别接入 `parseAttributes.ts` 与 `parseShortcodeAttributes.ts`
2. helper 的导入切换到新实现；修复不只是给原正则换一个量词
3. `@tiptap/extension-mention` 的自定义解析器额外增加起始/空白边界，不能因 core 改造而漏掉自定义路径
4. 回归测试覆盖块、atom-block、行内与 Mention，包含增长输入和同长度对照，也检查不应接受的属性边界与内部占位引用

推荐升级至官方 `3.30.5` 或包含该修复的后续受支持版本。输入长度限制、隔离解析工作线程与时间预算属于临时减轻措施，不替代修复；也应检查应用自己传入的自定义 `parseAttributes`。

静态审阅范围为该固定补丁的生产代码、changeset 与测试差异，以及 GHSA 中两段公开 PoC。未发现这些已审文本含无关外传、凭据收集、持久化、远程下载或混淆；这不构成对整个 npm 依赖树、安装生命周期或任意第三方复现仓库的安全保证。上游为 MIT 许可；本文为原创归纳，只引用必要技术标识与短表达式。

## 来源与历史

- [Tiptap 官方 GHSA](https://github.com/ueberdosis/tiptap/security/advisories/GHSA-j95f-988m-3j2f)：报告人 joostgrunwald；仓库公告 2026-08-26 发布；支持影响范围、公开 PoC 与原作者计时；[Advisory Database 记录](https://github.com/advisories/GHSA-j95f-988m-3j2f)于 2026-09-08 收录
- [修复前固定文件](https://github.com/ueberdosis/tiptap/blob/55f59e4907b37e0aa4404c52e965014f66158393/packages/core/src/utilities/markdown/attributeUtils.ts)：支持块属性数据流和原始表达式
- [官方固定修复差异](https://github.com/ueberdosis/tiptap/commit/d0d499be3cce633cf54ca9aa9f3d8a5a1f98bd74)：支持实现变化和回归测试覆盖
- [v3.30.5 发布页](https://github.com/ueberdosis/tiptap/releases/tag/v3.30.5)：与公告的首修复版本交叉核对
- [先知社区线索](https://xz.aliyun.com/news/92870)：零零八，2026-09-23 11:31:29；本轮只读到官方 feed 的标题、日期与摘要，正文返回挑战页，未据摘要扩写或声称审阅全文
- 核对日期：2026-10-03；未本地复现；本库未找到相同产品、默认 Markdown 属性入口及根因的既有主文，故作为独立分析新增
