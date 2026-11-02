# PR #35 集成复核与 PR #33 处置（2026-11-02）

复核输入为 PR #35 `431670fe1e0580dcce5ead36174f1690d5eff1d2`，基线为 `104c9204d56d0a4f2cbe51fe3b4a95683007703a`。本记录检查资料收录与展示，不执行文章、HTML、PoC 或扫描，不访问示例目标。未安装依赖，未改脚本、测试、质量基线或任何示例值。

## 内容和保真

- 6 篇新增及 GitLab 追加段逐篇阅读，分别核对产品、编号、版本、前提、副作用与资料边界。独立复核覆盖 GitLab、FreeSWITCH、Flyimg、CoPilot，另由独立审阅者检查哈希、旧文保留与覆盖声明。
- The Grid 的 [Patchstack 原始公告](https://patchstack.com/database/wordpress/plugin/the-grid/vulnerability/wordpress-the-grid-plugin-2-8-1-remote-code-execution-rce-vulnerability?_s_id=cve) 支持未认证、影响至 2.8.1 与修复 2.8.2；请求返回文件内容不能升级为截图已证明系统命令执行。原批次查看截图的声明保留，本次集成未重复查看像素。
- [PortSwigger 原研究](https://portswigger.net/research/scalable-vector-grief) 与 [sanitize-svg 固定源码](https://github.com/mattkrick/sanitize-svg/blob/cb918e034d2a73765eabd61854b0e2733d43d455/src/sanitizeSVG.ts) 对应嵌套事件例。XML 围栏保持原短例，不放入活动 DOM，不推定下游受影响。
- [pypdf 官方公告](https://github.com/py-pdf/pypdf/security/advisories/GHSA-cggf-277g-3q54) 与 [完整修复差异及回归用例](https://github.com/py-pdf/pypdf/commit/ea4ac663133f1b3de1d7a8f2e6fa239802fde79e) 对应版本与页面字典复制预算；200×200 引用不等于八百万个独立页面，不把内存耗尽改称代码执行。
- `changed-articles.json` 中 7 篇的原始字节数与 SHA-256 全部匹配。GitLab 原有 6417 字节为最终文件完整前缀；其余 6043 篇旧正文不变。3 个新增围栏经字符串解析与源码逐字符比较，不运行其中内容。压缩逐源清单的压缩哈希、解压字节数与解压哈希匹配。
- 更新根 README 当前统计与维护时间线。正文、图片和历史路径不作额外改写；本轮仍是 6050 篇、5950 个主入口、6048 份可检索来源、2 份既有隔离材料。

## 不合并 PR #33 的移出方案

PR #33 `ca68a01498a481ee87d9c09ff90d068515f73b61` 将 PiFlow 原文移到审阅目录并从默认索引排除。原文已明确区分静态调用链、HTTP 占位描述和直接工具调用实验，仍有可定位的技术主体；缺少匿名网络请求与工具执行对应记录是具体待核项。CONTRIBUTING.md 允许这种 `analysis` / `needs-review` 文章保留目录和搜索入口，不以缺少可执行 PoC 或维护者未复现为隔离理由。

移档还使原正文 URL、归档内两条相对链接及历史周报的正文链接失效。逐字节迁移本身并不能证明移出决定合理。因此不合并该方案：保留原文章、已有证据提醒、原路径与派生索引；PR 的历史核对与移档建议仍可从其固定提交追溯。未重写历史初筛结论或猜补实际请求。

## 验收边界

正式工作目录的本地检查覆盖完整资源，不沿用草稿稀疏检出的缺失结果。Python 文档单测 96 项、全部 Node 文档测试 44 项通过，质量基线差异与确定性索引检查通过。复用博客现有 Marked 4.3.0 惰性解析 6051 个文件，结构失败 0、候选 15 个，本次 7 篇正文无候选；草稿在 Marked 17.0.5 的 33 个候选是另一解析器输入，不能合并计数或宣称消除了 18 项问题。3 个围栏的 token 文本与解析 HTML 解码后的复制文本均与源围栏逐字符相同。完整报告保留在库外恢复目录，最终精确 head 的 CI 在 PR 中另行记录。

6050 篇离线质量检查 errors/fatal/new 均为 0，仍有 4093 项既有警告。资源审计 missing/zero_byte/html_error_page/remote_images/unusable_image_tags/external_image_dependencies 均为 0；20337 个识别容器、32 个既有未知容器及 38 个扩展名不匹配分别保留，不能说成所有图片均人工看过或全部格式已消歧。惰性字符串渲染、哈希相等和 CI 不证明漏洞复现、所有来源真实性或每一页浏览器视觉验收。
