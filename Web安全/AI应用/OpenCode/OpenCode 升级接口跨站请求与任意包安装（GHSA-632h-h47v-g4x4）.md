---
schema_version: "1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
identifier_status: "active"
source_status: "recorded"
id: "VW-20261003-COLLECTION-OPENCODE"
title: "OpenCode 升级接口跨站请求与任意包安装（GHSA-632h-h47v-g4x4）"
product: "OpenCode"
primary_identifiers: "GHSA-632h-h47v-g4x4"
version: "研究确认 v1.14.30 至 v1.18.21；维护者公告旧正文上界写 v1.18.16，详见版本核对"
fixed_version: "v1.18.22；补丁 c6e76e9b2865b03f1a7611db2dbd04eddc80c65e"
prerequisites: "npm、pnpm 或 Bun 安装；运行 serve/web HTTP 服务；浏览器可达且未启用认证或缓存有效 Basic 凭据；用户访问攻击页面；安装链允许相应生命周期脚本"
side_effects: "下载并全局安装替代包；执行安装生命周期脚本；写入 /tmp/opencode-rce 或 /tmp/opencode-upgrade-rce；macOS 示例启动计算器；npm registry、checkip.amazonaws.com 与包服务器网络访问"
source: "Christophe Tafani-Dereeper / Datadog Security Labs；Anomaly 官方公告与源码"
source_url: "https://securitylabs.datadoghq.com/articles/opencode-upgrade-remote-code-execution/"
verification_source: "https://github.com/anomalyco/opencode/security/advisories/GHSA-632h-h47v-g4x4"
category_recommendation: "Web安全/AI应用/OpenCode"
---

# OpenCode 升级接口跨站请求与任意包安装

## 核对与使用边界

2026-10-03 核对了原始研究、维护者公告、v1.18.21 源码与修复提交。公开 PoC 是文章内的包构造步骤、HTML 表单和请求记录，不需要另找第三方扫描器。本库未运行服务、安装包、访问示例目标或播放演示视频。浏览器、认证缓存及包管理器生命周期策略仍需在授权隔离环境分别确认。

## 版本与部署前提

- Datadog 研究将影响范围定为 v1.14.30—v1.18.21，演示使用 v1.18.21；维护者公告的结构化修复版本与结尾均为 v1.18.22，但“Impacted versions”旧段落仍写 v1.18.16。本文保留此差异，并采用研究演示、修复提交及版本源码共同支持的上界，不把 1.18.17—1.18.21 当成已修复。
- 触发面是 `opencode serve` 或 `opencode web` 启动的 HTTP API。只使用终端 CLI 不构成这里的跨站入口。
- 任意包安装路径限于 npm、pnpm、Bun 管理的安装。公告明确排除 curl、Homebrew、Chocolatey、Scoop 对该路径的影响；这不等于这些方式没有其他风险。
- 默认回环监听仍可能被受害者浏览器访问。设密码后，是否携带缓存的 HTTP Basic 凭据取决于浏览器会话；不能把“设了密码”直接等同于阻断全部跨站导航。

## 根因与源码证据

v1.18.21 的 `global.ts` 原始处理器直接读取请求文本并交给 JSON 解析；`GlobalUpgradeInput.target` 只要求字符串。安装层又把该字符串作为 npm 兼容的 package specifier 传给全局安装命令。危险点是允许 URL 包来源与其生命周期执行，不是要求先打破 shell 引号。

[易受影响安装实现](https://github.com/anomalyco/opencode/blob/826d9ad46a22bef0294998e08daa3c4904fea28f/packages/opencode/src/installation/index.ts)中的 npm 分支为：

```typescript
upgradeResult = yield* run(["npm", "install", "-g", `opencode-ai@${target}`])
```

跨站表单使用 `text/plain`，把浏览器插入的等号放进额外 JSON 字段。这样浏览器发送的仍是有效 JSON，而旧服务端没有执行 JSON 媒体类型约束。顶层表单导航与受 CORS 预检限制的 fetch 不是同一路径；相关浏览器结论以研究实测时间为边界。

## 公开 PoC 与副作用审阅

[维护者公告的 PoC](https://github.com/anomalyco/opencode/security/advisories/GHSA-632h-h47v-g4x4#poc)给出可追溯的包重打包、表单、HTTP 记录；[研究文章](https://securitylabs.datadoghq.com/articles/opencode-upgrade-remote-code-execution/)给出最小 `package.json` 与修复前后对照。原文中 `ATTACKER_IP` 是作者原有变量/占位值，本库没有替换请求或地址。

静态审阅发现：

1. 公告构建步骤会访问 npm registry 下载现有包，修改 `scripts.preinstall`，写临时 manifest 与 tarball；另会访问 `checkip.amazonaws.com` 查询公网地址，并启动端口 80 的 HTTP 服务。
2. 受测端会下载并全局安装替代包。原作者的两个演示分别写 `/tmp/opencode-rce`、`/tmp/opencode-upgrade-rce`，并调用 macOS 计算器。它们不是只读检查；全局安装本身还可能覆盖原有 OpenCode 安装。
3. 文章记录旧版返回成功、修复版拒绝 `text/plain`。本库只确认记录存在，未独立产生这些响应；单有 HTTP 200 也不足以证明生命周期命令执行。

授权复核应保存安装目录和包管理器配置，先确认生命周期脚本策略，再比较同一输入在修复前后是否进入安装层。恢复应包括重新安装可信包、清除实验文件并终止实验 HTTP 服务，不能只关闭计算器。

## 修复与对照

[修复提交 c6e76e9b2865b03f1a7611db2dbd04eddc80c65e](https://github.com/anomalyco/opencode/commit/c6e76e9b2865b03f1a7611db2dbd04eddc80c65e)同时要求显式合法 semver、改用 typed handler 的媒体类型解码，并移除无请求体升级。随补丁加入的测试覆盖非法 target、`latest` 和不支持的媒体类型；本库只阅读测试，未执行。

[v1.18.22](https://github.com/anomalyco/opencode/releases/tag/v1.18.22)发布于 2026-08-24。升级前停用不必要的 HTTP 服务和限制访问只能降低暴露面，不能代替修复。此问题使用 GHSA 编号，研究说明未申请 CVE，不另造 CVE。

## 来源

- Christophe Tafani-Dereeper，Datadog Security Labs，2026-09-24：[原始研究](https://securitylabs.datadoghq.com/articles/opencode-upgrade-remote-code-execution/)，支持演示版本、浏览器链和公开 PoC
- Anomaly：[维护者公告](https://github.com/anomalyco/opencode/security/advisories/GHSA-632h-h47v-g4x4)，支持安装方式、认证前提、修复版本及版本差异记录
- Anomaly：[v1.18.21 路由定义](https://github.com/anomalyco/opencode/blob/826d9ad46a22bef0294998e08daa3c4904fea28f/packages/opencode/src/server/routes/instance/httpapi/groups/global.ts)、[请求处理器](https://github.com/anomalyco/opencode/blob/826d9ad46a22bef0294998e08daa3c4904fea28f/packages/opencode/src/server/routes/instance/httpapi/handlers/global.ts)、修复提交与 release，支持独立静态代码对照
