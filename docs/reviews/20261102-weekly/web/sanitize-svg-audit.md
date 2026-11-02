# sanitize-svg 0.4.1 静态准入记录

审查日：2026-11-02。决定：建议准入窄范围原创综述，最终去重由集成方完成。

## 公开触发与真实性

- 研究原文 https://portswigger.net/research/scalable-vector-grief ，Gareth Heyes，公开/更新均 2026-10-27 14:29 UTC。
- 原文明确给出完整嵌套 SVG onload 短例；不依赖未发布二进制、失效下载或猜补载荷。
- 上游 head `cb918e034d2a73765eabd61854b0e2733d43d455`，作者时间 2025-04-23 20:47:20 UTC。`package.json`=0.4.1。源码 `src/sanitizeSVG.ts` blob `410232023d35d675b9e6bb9739b071e452fbda38`，分发 `dist/lib/sanitizeSVG.js` blob `c23c0db66ba51da336410130fdf41f5ac86b8c3c`，均完整阅读，逻辑一致。
- 根节点 attributes 检查与后代元素黑名单分开；nested svg 不在黑名单且其 onload 不被根属性枚举，这支持短例对应。并非重写或运行过滤器得出的动态结论。
- 无 CVE/GHSA 声明，故不填主编号，也不把旧版本 XSS 公告套用本项。GitHub releases 返回 []；since Oct24 的 commits、全部状态 issues 集合返回 []，不足100条无分页截断。tags endpoint 被连接器判 INVALID_ARGUMENT/不允许的公开 endpoint，未取得 tag 列表。不能宣称 npm 具体发布时间已由官方注册表核实。

## 反投毒检查范围与结果

- 固定 tree 递归结果 `truncated:false`，19个路径（含目录）；无工作流、安装脚本文件、二进制或下载器。两个实际执行源码文件均完整阅读。
- package.json 完整阅读：没有 install/postinstall 钩子；prepublish 运行 yarn build，build 为 tsc；precommit/lint-staged 涉及格式化、tslint --fix 与 git add，属于开发者工作树修改，未运行。普通消费者代码只读取传入 File/Buffer 并使用 DOM，没有网络访问、文件写入、命令启动、凭据读取或持久化。
- 运行元数据声明 tslib peerDependency；开发依赖为 gh-pages、husky、lint-staged、prettier、tslint、typedoc、typescript 等。yarn.lock 完整取回 86735字符/2157行，程序枚举所有 resolved URL，域名唯一 registry.yarnpkg.com，无其他下载源；此为锁清单检查，不是每个传递依赖包源码审计，不给依赖安全认证。
- 原文短载荷只含 alert(1)，无外传端点或命令；alert 是验证副作用，真实事件执行属于漏洞边界，不误判为针对运行者投毒。源文章的其他在线 demo、Hackvertor、PHP/XSLT/GIF 案例未访问/执行，不纳入窄候选可信范围。
- MIT 库许可完整阅读；不将其扩展为 PortSwigger 文本转载许可。稿件原创中文，唯一来源代码短引文为一行完整 SVG，未截断/替换原值。没有引入图片或远程加载标签。

## 风险与验收交接

须作为 XML 围栏文本展示，惰性渲染和复制文本应与原始一行逐字一致，不能让 onload 进入活动 DOM。浏览器版本未由原研究声明，应用是否可利用依赖直接导航、脚本上下文及 CSP；稿件明确这些限制且不推断下游。建议收录目录 Web安全/开发框架/sanitize-svg/。最终正文/已有索引去重、schema质量、生成索引与 CI 由集成方核实。
