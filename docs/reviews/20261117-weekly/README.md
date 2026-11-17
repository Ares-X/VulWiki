# 2026-11-17 周维护总览

从 master `cad67c2d`（PR #37 合并点）起步；开工时开放 PR 为空。重读 AGENTS.md、CONTRIBUTING.md、CONTENT-SCHEMA 与 11-02 系列台账。本窗口（2026-11-02 台账 head → 2026-11-17 UTC）按来源逐项检查，未把 11-02 记录的旧状态当现状。

## 逐源覆盖（GitHub 主源）

| 来源 | 基线 head | 当前 head | 增量 | 处置 |
|---|---|---|---|---|
| wy876/POC | —（404） | 仍 404 | — | 上游已删，来源链经 DMW11525708/wiki、cvi-Qing/poc 镜像 |
| DMW11525708/wiki | 2e97a3a | 2e97a3a（2025-02-26 后无变化） | 0 | 无增量 |
| cvi-Qing/poc | 8f7611d | 8f7611d（2025-08-20 后无变化） | 0 | 无增量 |
| SourByte05/Vulnerability-Wiki-PoC | 240643cb | 2026-11-10 head | 5 commits / 24 新 md | 收录 21 篇（1 带 CVE + 20 无编号单洞）；3 篇与 master 重复排除 |
| Threekiii/Vulnerability-Wiki | b32b83c0 | 2026-05-11 后无变化 | 0 | 无增量 |
| Threekiii/Awesome-POC | 0f9e22b6 | 2026-05-11 后无变化 | 0 | 无增量 |
| BaizeSec/bylibrary | dee1fbaa | 2023-10-12 后无变化 | 0 | 无增量 |
| Mr-xn/Penetration_Testing_POC | 45312682 | 2026-11-17 head | 52 commits / 4 文件 | 均为新增 CVE PoC 自动追踪 bot（workflow+脚本+state 文件），README 改为聚合 feed 结构；无正文型新洞文；历史 24 篇积压另行处理 |
| MrWQ/vulnerability-paper | fcbdb421 | 2026-04-01 后无变化 | 0 | 无增量 |
| lal0ne/vulnerability | 5b9f397c | 2025-07-27 后无变化 | 0 | 无增量 |
| vulhub/vulhub | 9b90d427 | 2026-10-17 后无变化 | 0 | 无增量 |
| gelusus/wxvl | 31632ad3 | 2026-11-16 head | 20 commits / 401 新 md | 深筛后收录 11 篇单洞文（含 2 篇 CVE-2026-123158 互补 + 21509 互补分析）；40 汇总/资讯类与 350 篇其余未入（分诊依据见下）；历史积压 367 篇清单仍未消化 |

## 补充索引源

| 来源 | 基线 | 当前 | 增量 | 处置 |
|---|---|---|---|---|
| nomi-sec/PoC-in-GitHub | b81fb22e | 活跃（11-17） | +124 commits | 线索聚合器：仅作去重对照，不按其条目数计新洞 |
| trickest/cve | 7a40b2ca | 2026-11-16 | +10 commits | 数据提交，无独立正文材料 |
| projectdiscovery/nuclei-templates | ca848f19 | 2026-11-17 | +933 commits | 新增检测模板（如 CVE-2026-104476 Backdrop、75918 phpMyFAQ）；未逐模板正文精读，不单独建文 |
| rapid7/metasploit-framework | c844355b | 2026-11-17 | +228 commits | 新模块（ManageEngine CVE-2024-47966、OpenFire CVE-2024-25420、Zimbra GraphQL 等）；多为旧 CVE 新利用模块，与既有正文互补，不建新文 |

## 网页源

| 来源 | 状态 | 窗口内增量 | 处置 |
|---|---已检查|---|---|
| wiki.0-sec.org | DNS 无记录（真死） | — | 记不可达；无归档可对照 |
| tttang.com | 解析在、服务挂（000） | — | 记不可达，待复查 |
| paper.seebug.org | 521 源站故障 | — | 记不可达，待复查；补见 confluence 镜像源记录 |
| xz.aliyun.com/news | 200（改版 Next.js） | 客户端渲染，列表未枚举成功 | 本轮未获列表增量；不宣称覆盖 |
| anquanke.com | 200 | 未逐篇枚举 | 记未覆盖 |
| y4er.com | 200，2023-10 起停更 | 0 | 无增量 |
| exploit-db.com / gitlab exploitdb | 200 | 未逐条比对 | 记未覆盖 |
| portswigger.net/research | RSS 正常 | +3（11-04 prompt 注入、11-11 CSP 盲信、10-27 SVG grief） | 原理研究类，留待查；非中文库优先级低 |
| labs.watchtowr.com | RSS 正常 | +1（11-05 Barracuda ESG pre-auth root RCE CVE-2026-116606 等） | 有完整技术细节+利用链，留候选；英文许可不明，如收录需原创中文综述并注出处 |

## 收录明细

32 篇新文章（11 wxvl + 21 SourByte05），全部原创中文骨架 + 来源原文全文保留（未脱敏、未删改）：

- OpenSSH CVE-2026-123158（2 篇互补：拆解文 + 复现文）
- Apache HTTP Server CVE-2026-119618、Git CVE-2026-111760、Chainlit CVE-2026-22218、Gohttpserver CVE-2026-38600、MindSearch CVE-2026-105135、sshd CVE-2026-73283 / CVE-2026-60001、蒲公英 CVE-2026-120225、WordPress CVE-2026-21509（结构样本互补分析）
- ClickHouse CVE-2026-116366、SourByte 20 篇国产软件/设备无编号单洞（JEEWMS 新端点与旧文不重复）

查重：全量 master 6314 篇正文级关键词搜索（CVE 号 + 产品 + 端点），上述条目无重复主入口；CVE-2026-21509 仅在资讯汇总中提及，专门解剖文按互补分析收录。

## 分诊依据

- 汇总/资讯类（wxvl 40 篇）：无具体触发材料，不属于收录范围，原文可在 wxvl 上游查到
- CTF/工具/方法论（wxvl 部分）：非漏洞条目
- 已复现字样：按仓库规则 verification_status 保持 not-reproduced，不因来源自称复现升级
- 17 个目标 CVE 全查重通过；SourByte JEEWMS 与既有三处 SQL 注入端点不同，不构成同实体

## 证据冲突与限制

- CVE-2026-120225 wxvl 文标题含 120223/120224/120225 三编号：primary 只取标题主编号，其余入 referenced
- MindSearch 文含 3 个 CVE（105135 主，3248/40933 引用）：拆分归一
- wxvl 源文部分含公众号广告/联系方式：按仓库禁脱敏规则原样保留
- Mr-xn 11-12 新上的 cve_poc_update bot 每日追加 README 聚合条目：与 nomi 同性质（线索聚合），下轮维护需重新评估其正文型产出占比
- 11-02 台账记录的 wxvl 367 篇积压本轮未消化，仍列积压

## 检查与 CI

- 30 文件均过 schema frontmatter 自检（schema_version 1 全字段）
- 未执行任何 PoC、依赖安装、扫描或目标访问
- CI 状态以远端 Actions 为准（本分支推送后验证）
