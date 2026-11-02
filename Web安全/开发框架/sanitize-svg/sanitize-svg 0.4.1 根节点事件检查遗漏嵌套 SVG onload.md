---
schema_version: "1"
id: "VW-20261102-SVG-NESTED-EVENT"
title: "sanitize-svg 0.4.1 根节点事件检查遗漏嵌套 SVG onload"
product: "@mattkrick/sanitize-svg"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "0.4.1；固定源码 cb918e034d2a73765eabd61854b0e2733d43d455，未推定其他版本范围"
fixed_version: "截至 2026-11-02，本轮未找到对应修复提交或发布版本"
prerequisites: "应用将本库返回的非 null SVG 当作安全内容，并在允许 SVG 脚本事件的文档上下文展示；不能把普通 img 展示直接等同于脚本执行"
side_effects: "原公开示例触发 JavaScript alert；实际危害取决于上传内容的来源、展示上下文和 CSP，不能将验证载荷称为只读检测器"
source: "Gareth Heyes / PortSwigger Research；Matt Krick 上游源码"
source_status: "recorded"
source_url: "https://portswigger.net/research/scalable-vector-grief"
verification_source: "https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/src/sanitizeSVG.ts"
---

# sanitize-svg 0.4.1 根节点事件检查遗漏嵌套 SVG onload

## 范围与证据

Gareth Heyes 于 2026-10-27 14:29 UTC 发表并更新《Scalable Vector Grief》，提供了多个 SVG 过滤绕过示例。本条只整理其中嵌套 SVG 事件这一条，不把另外五个库或浏览器技巧的结论合并到本产品。

本轮于 2026-11-02 核对固定提交 `cb918e034d2a73765eabd61854b0e2733d43d455`：`package.json` 标记版本为 `0.4.1`，该提交作者时间为 2025-04-23 20:47:20 UTC。这里的版本对应来自实际源码，不代表原研究披露了其完整测试矩阵，也不把 Git 提交时间当作 npm 精确发布时间。

## 漏检原因与公开材料

源码先将输入放进惰性的 template，再只读取第一个根元素的 attributes 检查以 `on` 开头的属性；随后用元素名黑名单检查后代。黑名单不包含 `svg`。因此，嵌套 SVG 的事件属性没有进入根属性检查，也不会仅因其元素名被拒绝。打包的 `dist/lib/sanitizeSVG.js` 与这一逻辑一致。

原作者给出的完整短例为：

```xml
<svg xmlns="http://www.w3.org/2000/svg"><svg onload="alert(1)"/></svg>
```

公开验证材料是这一输入以及上游 README 的 `sanitizeSVG` 文件/Buffer 调用方式：原作者报告它通过过滤；固定源码说明为什么内部事件被遗漏。后续若作为独立 SVG 文档在允许脚本的同源环境展示，事件带来脚本执行风险。普通 `img` 上下文、独立无敏感数据来源、CSP 等条件不能省略；本条不推定任何具体下游应用受影响，也不分配或猜测 CVE。

## 修复与使用边界

截至本次检查，上游窗口内提交和 issue 集合为空，release 集合为空，未取得对应修复声明；不能将另一个旧 XSS 的版本修复范围移用于本项。维护者应评估递归元素与属性检查及安全展示策略，但这里没有发布或推荐自制补丁。处理不可信 SVG 时，应把文件可被直接导航访问这一情形纳入应用自身的信任边界评估。

## 来源与许可

- [Gareth Heyes，Scalable Vector Grief](https://portswigger.net/research/scalable-vector-grief)：2026-10-27 发布/更新，支持具体载荷及原作者绕过结论。未找到整篇转载许可，因此本文为原创中文技术综述，仅保留必要短代码引文，不是全文翻译。
- [固定源码](https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/src/sanitizeSVG.ts)、[发行文件](https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/dist/lib/sanitizeSVG.js)、[package.json](https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/package.json)：支持本条版本与静态调用逻辑。
- [上游 README](https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/README.md)提供调用方法和 SVG 展示上下文说明；库源码采用 [MIT 许可](https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/LICENSE)。库许可不自动覆盖 PortSwigger 文章。
