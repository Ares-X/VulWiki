---
schema_version: "1"
id: "VW-20261019-FLOWISE-OAUTH-HTML"
title: "Flowise OAuth2 回调反射 HTML 注入与模板修复边界"
product: "Flowise"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
identifier_status: "unknown"
version: "源代码范围：Sonar 指出 2025-06-06 引入；修复提交父节点 c22f2d3d25077f065001e07b79870aee2c37d70c 仍为旧模板；发行版边界待核"
fixed_version: "2026-02-24 提交 917e02eb36736fcbfaa4bef9342e217c5d4a9840 修复模板；首个包含补丁的发行版待核"
prerequisites: "OAuth2 回调可达且使用旧模板；默认白名单允许回调；钓鱼效果需要受害者访问并进一步点击链接"
side_effects: "响应显示攻击者控制的链接；访问与点击可留日志并导航外站；正常 OAuth 成功分支会交换和保存令牌，但不属于本条错误页触发"
source: "Samuele Buro / Sonar；FlowiseAI 官方源码；本库原创中文整理"
source_status: "recorded"
source_url: "https://www.sonarsource.com/blog/sonars-new-js-ts-engine/"
archive_commit: "917e02eb36736fcbfaa4bef9342e217c5d4a9840"
---

# Flowise OAuth2 回调反射 HTML 注入与模板修复边界

待核项是发行版本与独立 CVE 对应，不是公开触发材料缺失。该问题是 HTML 内容注入带来的钓鱼能力，现有材料不支持 RCE 或任意 JavaScript 执行。

## 公开触发与源码路径

公开研究给出 GET `/api/v1/oauth2-credential/callback` 的交互示例与回调代码。`code` 和 `state` 非空、且 state 不匹配 Credential 时，404 错误消息插入 state，再经 `generateErrorPage`、`generateOAuth2ResponsePage` 进入 HTML 响应。错误分支也直接使用 `error_description`。

原文示例使用 `<a href="https://evil.example/login">`，说明允许的链接仍能显示在 Flowise 域名下；这里保留的标签是来源片段，不是完整 HTML 文档或新增可执行 PoC。浏览器演示是客户端运行模板与简化 sanitizer，不能冒充本库真实服务器复现。

独立源码核对：总路由把 oauth2Router 挂在 `/oauth2-credential`；常量把 callback 列入白名单，部署可通过 DENYLIST_URLS 收紧。`sanitizeMiddleware` 对查询值调用 sanitize-html 默认策略，不能因为静态规则报告 XSS 就忽略上游处理。

## 补丁与版本

官方提交增加 HTML escaping，在插入模板前处理 title、statusIcon、statusText、message、details。提交同时改变其他控制器错误消息，不能把所有修改都算成同一漏洞。补丁日期为 2026-02-24；2026-10-14 是 Sonar 文章发布日期。该提交 package.json 显示 3.0.13，但仓库中的版本字符串不是已发布制品证据，本条不据此宣称 3.0.13 是修复版本。

## 审阅与依赖边界

已静态阅读回调完整文件、模板、全局 sanitizer、路由挂载与白名单关联、补丁五个文件的 diff、根目录/服务器依赖清单及五个 CI 工作流。未安装或执行项目，未访问示例目标。相关依赖为 Express 与 sanitize-html（清单范围 ^2.11.0）；根目录含 postinstall，CI 含依赖安装、Cypress 下载和 Docker 发布流程，不能把克隆后安装视为无副作用。本条只分析相关路径，不声称完成 Flowise 全库安全审计。

## 来源与授权

- [Sonar 原始研究](https://www.sonarsource.com/blog/sonars-new-js-ts-engine/)，Samuele Buro，2026-10-14；支持影响边界和公开触发，采用原创中文概述，不整篇转载
- [Flowise 官方修复](https://github.com/FlowiseAI/Flowise/commit/917e02eb36736fcbfaa4bef9342e217c5d4a9840)，2026-02-24
- [回调实现](https://github.com/FlowiseAI/Flowise/blob/917e02eb36736fcbfaa4bef9342e217c5d4a9840/packages/server/src/routes/oauth2/index.ts)
- [模板实现](https://github.com/FlowiseAI/Flowise/blob/917e02eb36736fcbfaa4bef9342e217c5d4a9840/packages/server/src/routes/oauth2/templates.ts)
- [sanitizer 实现](https://github.com/FlowiseAI/Flowise/blob/917e02eb36736fcbfaa4bef9342e217c5d4a9840/packages/server/src/utils/XSS.ts)
- [许可说明](https://github.com/FlowiseAI/Flowise/blob/917e02eb36736fcbfaa4bef9342e217c5d4a9840/LICENSE.md)：商业目录及特定版权文件除外，其他适用 Apache-2.0；此处相关回调/模板不位于商业目录。本稿没有分发完整源文件

核对日期：2026-10-19。未发现与库内其他 Flowise RCE、文件写入、JWT 绕过条目的实体重复。
