# 2026-11-02 周维护：固定来源、具体触发材料与证据冲突

基线为本轮读取的 master `104c9204d56d0a4f2cbe51fe3b4a95683007703a`，维护分支 `docs/weekly-maintenance-20261102`。开始时唯一开放维护 PR 为 [#33](https://github.com/Ares-X/VulWiki/pull/33)，PiFlow 准入纠正仍未合并；本轮不重做该纠正，也不将其描述为已生效。保留 master 已有的内容修复及 issue 自动分配工作流。

先读当前 AGENTS、CONTRIBUTING、CONTENT-SCHEMA、README 来源/补档历史及上轮记录。上轮没有全源成功检查点：本轮逐库比较上轮固定 head，并用 2026-10-24 至 2026-11-02 00:00 UTC 的重叠窗口交叉核对；历史未读仍保留，不以提交枚举冒充正文审读。本批初筛优先核对具体公开触发材料；这不改变 CONTRIBUTING.md 允许收录独立分析及带明确待核提醒材料的规则，也不构成移出既有文章的依据。

## 正文处置

- **The Grid / CVE-2026-94169**：固定完整 AJAX 请求与已查看截图支持文件包含/文件内容返回；CNA 的 RCE 影响不等于截图执行了系统命令。版本至 2.8.1、修复 2.8.2；第三方 ZIP 自报 2.8.0，不能当官方包或可信检测工具。
- **sanitize-svg 0.4.1**：只整理根属性检查漏掉嵌套 SVG onload 的具体短例及固定源码，不泛化到原文其他库或浏览器技巧。
- **FreeSWITCH / CVE-2026-116779**：具体 MESSAGE 探针与官方源码链对应；记录公开脚本将 401/407 错判、默认 UDP 未连接发送及 REGISTER 副作用，不推荐为可信检测器。
- **pypdf / CVE-2026-119204**：官方回归测试提供完整 PDF 字节构造，非仅补丁；重复引用导致字典复制和内存放大，修复 6.21.4，不写成 RCE。
- **Flyimg**：回补上轮未读旧文，并核新修复：webpm 为 1.12.3，tm/路径引用为 1.12.11；原文对同一请求“两次执行”的概括不能由非零退出记录证明。
- **SOCFortress CoPilot / CVE-2026-61730、61738**：区分公开报告读取与 admin/analyst 的 JSON 路径穿越写入。新 CNA 收窄旧 GHSA 的 RCE 概括；0.1.77 只确认凭据隔离，不能声称报告鉴权完整修复。
- **既有 GitLab / CVE-2026-97229 追加**：保留原文件完整字节前缀，补入新 Metasploit 实现的 19.3.4 官方包例外、原生库与 HTTP 测试范围区别、token/远端分支清理和状态改变风险。

每篇采用原创中文技术说明、必要短引文或固定原代码链接，不整篇转载许可不明长文。新稿不增加图片；The Grid 图像在工作证据中查看但不另行转载。没有改写原例、猜补占位、执行 PoC、安装其依赖、生成恶意样本或访问示例目标。

## 逐源覆盖

本轮按 26 个来源组逐一检查，范围以分表为准，不宣称互联网全量。

1. [十个优先 GitHub 来源](primary/source-ledger.json)及[审阅与取舍](primary/static-audit.md)：wy876/POC 404；八个固定 head 未变；SourByte 一提交十三文件、六篇正文全读。镜像相同来源不重复计数。
2. [网页与原作者来源](web/source-ledger.md)：逐个访问 0-sec、先知、跳跳糖、Seebug、安全客、Y4er、PortSwigger、watchTowr、Exploit-DB 和公开 X。不可访问、超时、动态表格及历史静默更新限制分别列出，未读不写成无更新。
3. [补充工具/索引来源](supplementary/README.md)及[分页证据](supplementary/coverage.json.gz)：nomi、trickest、Nuclei、Metasploit。路径和提交计数不是新漏洞数；聚合器外链未审、第三方依赖范围及模板精读范围分别记录。
4. [wxvl 与 Mr-xn 来源台账](secondary/source-ledger-public.json)：本轮 wxvl 206 篇正文文字判读见 [1–60](secondary/body-review-1-60.json)、[61–140](secondary/wxvl-61-140-review.json)、[141–206](secondary/body-review-141-206.json)；不等同图片/外链全读。上轮旧积压本轮另读 41 篇，仍有 [411 篇未读](secondary/prior-wxvl/unread-paths.txt)及 1 篇原已暂停；Mr-xn 6 个新增外链未能读取，历史 24 个未读不清零。源正文获取、人工全文、片段阅读、未看截图及未读外链不混为一个完成数字。

## 暂缓与风险

- [CoreGraphics](primary/coregraphics-hold.md) 有完整生成器，但 Apple/CNA 不能支持两个编号与 Type5/CMap 的一一映射，原作者也标为推测；CMap 载体的负面结果不能作为成功 PoC。
- [WalletService BOF](primary/wallet-bof-dedup.md) 是主库已覆盖旧链，不因本周转载再建新文；Go-fastdfs 也无新增实质证据。
- Cisco SEG 的两个 CVE 映射存疑；Flowise 模块与 GHSA 版本边界不一致；Nuclei Ahsay 模板版本描述冲突并可能残留 JSP 命令入口。具体依据见补充来源台账，不推断作者恶意。
- Source-only 线索、版本/前提未对应的国产产品请求、原作者依赖链未审完的研究留待查。暂缓原因不是要求维护者动态复现。
- wxvl《某WordPress付费插件严重漏洞在野攻击分析以及漏洞复现》§四的时间线及关键事实含作者声称来自 2026-10-31 真实日志的密码重置 key，无法确认失效且两处记录不一致。本轮暂停该候选发布；原文未修改，不在公开稿或此台账复制该值。继续其他独立项。
- 上轮未读与以前明确暂停范围不因本轮计划自动重开；本轮没有推进“全部来源成功”的检查点。原始抓取全文、ZIP 与可能含秘密的日志不作为公开 PR 附件。

## 检查与权限边界

草稿提交时的验收见 [checks.md](checks.md)。复用既有稀疏工作树，未复制完整图片/网站或新建 Codex/Work 任务。脚本、测试和 baseline 不变，审阅后仅运行文档单测、离线质量与惰性渲染；完整资源验收依最终精确 head 的完整 checkout CI。没有合并、默认分支写入或站点发布操作。

以上为提交草稿时的操作范围。2026-11-02 的集成复核、完整本地资源检查及 PR #33 处置另见 [integration-review.md](integration-review.md)；PiFlow 原正文、状态与索引入口保留。
