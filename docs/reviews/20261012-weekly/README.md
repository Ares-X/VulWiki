# 2026-10-12 每周公开来源维护

本目录记录第一阶段的 4 篇新增和 PaperCut 更新，所列抓取范围、访问失败与静态审查限制仅适用于该阶段。PR #27 后续扩展为 91 篇新增、3 篇既有文章更新；完整 94 篇变更的复审、纠错和最终验收见 [PR #27 复审记录](../20261012-pr27/README.md)。不能用本页早期的“未读”或稀疏资源限制代替后续实际检查结果，也不能把后续复审扩展成所有上游内容均已审读。

## 范围与结果

基点 master `8291608013efb898ce75b267bf13134c7ab68389`，开始时开放 PR 为零。先读 AGENTS、CONTRIBUTING、字段规范、README 来源和上周记录。按 2026-10-04 00:00 UTC 起的重叠窗口、上周固定 HEAD 比较；观察截至本轮实际读取时刻。

本轮新增 **4 篇**、更新 **1 篇**：Exposed CVE-2026-108474、Atlassian CVE-2026-21589、LPAR2RRD CVE-2025-54769、Langflow CVE-2026-7873；PaperCut 旧文追加新研究范围和来源差异。LPAR2RRD、Langflow 是旧漏洞的新公开材料，不称本周新披露。PR10、既有 KEV 与 FrameVul 已交付文章不重复计算；旧暂停候选没有通过换批次恢复审查。

当前用户任务要求具体公开触发材料，严于仓库允许独立分析的常规规则；本轮新增逐篇具有原始请求、公开步骤或固定验证代码，不用 analysis 标签放宽门槛。

## 逐源 GitHub 清点

提交、路径、索引链接数量均不是审读篇数。镜像 HEAD 相同不代表旧文章已重读；新增文件列表不代表对应漏洞通过收录。

| 来源 | 日期窗口提交 | HEAD比较/范围 | 状态 |
|---|---:|---|---|

| [wy876/POC](https://github.com/wy876/POC) | 未知 | 未知 次提交 | HTTP404 unavailable; cannot distinguish deleted/private/renamed/access-limited |

| [DMW11525708/wiki](https://github.com/DMW11525708/wiki) | 0 | 0 次提交 | accessible |

| [cvi-Qing/poc](https://github.com/cvi-Qing/poc) | 0 | 0 次提交 | accessible |

| [SourByte05/Vulnerability-Wiki-PoC](https://github.com/SourByte05/Vulnerability-Wiki-PoC) | 0 | 0 次提交 | accessible |

| [Threekiii/Vulnerability-Wiki](https://github.com/Threekiii/Vulnerability-Wiki) | 0 | 0 次提交 | accessible |

| [Threekiii/Awesome-POC](https://github.com/Threekiii/Awesome-POC) | 0 | 0 次提交 | accessible |

| [BaizeSec/bylibrary](https://github.com/BaizeSec/bylibrary) | 0 | 0 次提交 | accessible |

| [Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC) | 7 | 7 次提交 | accessible |

| [MrWQ/vulnerability-paper](https://github.com/MrWQ/vulnerability-paper) | 0 | 0 次提交 | accessible |

| [lal0ne/vulnerability](https://github.com/lal0ne/vulnerability) | 0 | 0 次提交 | accessible |

| [vulhub/vulhub](https://github.com/vulhub/vulhub) | 0 | 0 次提交 | accessible |

| [gelusus/wxvl](https://github.com/gelusus/wxvl) | 19 | 19 次提交 | accessible |

| [nomi-sec/PoC-in-GitHub](https://github.com/nomi-sec/PoC-in-GitHub) | 64 | 902 路径 | 路径清点完整；全文审查另列 |

| [trickest/cve](https://github.com/trickest/cve) | 8 | 1295 路径 | 路径清点完整；全文审查另列 |

| [projectdiscovery/nuclei-templates](https://github.com/projectdiscovery/nuclei-templates) | 103 | 103 路径 | 路径覆盖不完整；全文审查另列 |

| [rapid7/metasploit-framework](https://github.com/rapid7/metasploit-framework) | 50 | 71 路径 | 路径清点完整；全文审查另列 |

| [Exploit-DB](https://gitlab.com/exploit-database/exploitdb) | 10/5起 0 | HEAD 12879ca774a9d7543907d24a7bc1cebb47959afe 未变 | 官方 GitLab查询为空；官网动态表格未取得 |


固定 SHA、完整变化路径与逐项分页证据见 [primary.json](primary.json)、[supplementary.json](supplementary.json)。nomi/trickest 原 compare 的300文件上限已通过逐提交分页解决；Nuclei 26个选定非chore提交中21个遇HTTP403限流，只取得5个的103条不同路径，不能称完整覆盖。

主上游实际全文读4篇（LPAR2RRD、Exposed、Adminer、Strapi），另GitLab1篇仅部分读；wxvl其余227篇新增正文未读，Mr-xn12个新增链接正文未读。Metasploit完整读7份新增模块文档，其中2份模块源码，只有7873达到本次静态准入范围。原作者网站检查范围另列；列表里的排除项不冒充完成漏洞审读。

## 原作者网站与失败覆盖

| 来源 | 访问/实读 | 覆盖限制 |
|---|---|---|

| [wiki.0-sec.org](https://wiki.0-sec.org/) | Web inaccessible; direct GET HTTP502 | Cannot verify weekly changes |

| [先知](https://xz.aliyun.com/news) | Atom100 entries,3 entries published Oct4 onward:92915/92916/92917. Direct body GET200 only challenge JS; Web one-line extraction. Challenge not executed. | 100-entry feed covers back to August but not all categories/history; timestamps no timezone; updated recent across old entries is not proof of real change |

| [跳跳糖](https://tttang.com/) | Web timeout; direct GET502 | Cannot verify weekly changes |

| [Seebug Paper](https://paper.seebug.org/) | Web inaccessible; direct GET521 | Cannot verify weekly changes |

| [安全客](https://www.anquanke.com/index.html) | 3 new homepage items; two security stories316214/316211 read. PixelLeak and smart power-strip incident explain events without specific public vulnerability triggers; translation benchmark marketing excluded. | Homepage only, no complete archive traversal; unattributed claims not validated or admitted |

| [Y4er](https://y4er.com/posts/) | Archive first page20items; newest predates window | 210 old articles not compared for silent edits |

| [PortSwigger](https://portswigger.net/research/articles) | 2 new articles read: Oct5 overlapping CSS fragments updatedOct6; Oct6 modelresearch evaluation. CSS method uses publiclabs but not newly identified product/version vulnerability; modelessay not admission. | No live lab opened or run; no allhistorical comparison |

| [watchTowr](https://labs.watchtowr.com/) | 2 new original articles fully read. Oct6 Atlassian21589 candidate; Oct9 PaperCut additive oldarticle update. Two full fixed repositories reviewed,2files each. | No dependency implementation audit; screenshots not independently verified; original article no revision history |

| [GitHub SecurityLab](https://securitylab.github.com/advisories/) | Latest7 announcements pre-window and logged previousweek | Index not evidence of no silent edits; no repeat of previously deferred code audits |

| [Sonar](https://www.sonarsource.com/blog/) | Homepage+officialdomain scoped query yielded model evaluation/product posts, no verified new vulnerability research candidate | Dynamic category pages not exhaustively paginated |

| [Assetnote/Searchlight](https://www.slcyber.io/research-blog) | Oct7 Discourse55420/55674 delegated to parent for partialofficial/code-review; Oct8 GoBalance key truncation analysis read, no fixed original repo or patch corroborated yet | GoBalance lacks full fixed code/installation/dependencies/workflow audit; not admitted. Events/attribution not independently verified |

| [Doyensec](https://blog.doyensec.com/) | LatestChromeiOS article predateswindow | No historicaltextcomparison |

| [TrailofBits](https://blog.trailofbits.com/) | LatestSequenceHash predateswindow | No historicaltextcomparison |

| [ProjectZero](https://projectzero.google/) | New emergency-patching process article read, no specific new public-trigger candidate | Publicissue tracker not exhaustively checked |

| [Synacktiv](https://www.synacktiv.com/en/publications) | Latest English list predateswindow | Only English latestpage; no historicaltextcomparison |

| [ZDI](https://www.zerodayinitiative.com/blog/) | Oct5-8 schedule/results4items; day3 original read, competition outcomes do not disclose concrete trigger materials | Remaining dailyresults not fullcode reviews; disclosureadvisory archive not exhaustively checked |

| [Rapid7](https://www.rapid7.com/blog/) | Latest vulnerability21589 links sameAtlassianissue; duplicatelead merged withwatchTowr/official | Metasploit repository review separate parentwork; no allblog pagination |

| [PublicX](https://x.com/PortSwiggerRes) | DirectPortSwiggerRes/watchtowrcyber errors; scoped21589 datequery no verifiedpost | No dedicatedX connection; cannot claimfullcoverage |


逐站观察时间、候选状态见 [web-research.json](web-research.json)。先知100条Atom中3条属于窗口，但正文仅挑战页，未执行挑战脚本；不是3篇已读。0-sec、跳跳糖返回502，Seebug521；公开X无可核具体帖。CISA实时JSON返回403，见[cisa-crosscheck.json](cisa-crosscheck.json)，没有据此作当前KEV成员判断。以上访问失败不解释为无更新。

## 纠错、风险与取舍

- Exposed：第三方HTTP状态/版本探测不足以证明SQL注入；采用JetBrains CNA、固定修复和含具体引号输入的回归测试。依赖升级可能影响旧手动转义，不能承诺业务零改动

- LPAR2RRD：新社区tar/update.sh程序没有原公告multipart文件名目录遍历机制；以KoreLogic原始公开请求和厂商8.05说明为收录依据，纠正发现者、披露日期与无依据的chroot/safe_extract修复说法

- Langflow：需账号登录；文档auth/unauth文件名、1.8.4/1.9.0示例不一致；厂商默认参数求值与模块装饰器触发分别说明，不混同。完整框架传递依赖未认证

- Atlassian：Web应用根目录内已知路径读取不是操作系统任意文件读取；DAG只探测三产品，未实现Crowd管理链。厂商概括所有版本与CNA引入下限逐项并存说明

- PaperCut：原文完整保留，新增DAG只验证有限认证绕过，不执行RCE或重置密码；82077单独需已认证管理员。研究单处81579、README26.05的差异放在引用外说明

- Adminer：ATTACH前提自相矛盾，原始来源未闭环，暂缓。Strapi旧KEV相关内容不继续深入暂停范围。GitLab已收录，不重复新增

- Discourse：已读10/7研究及两份官方公告，55420默认/非默认配置及文件读/RCE范围冲突；55674官方文字与CVSS交互要求不一致，固定依赖审查未完成，留待查而非正文，见[discourse-review.json](discourse-review.json)

- GoBalance及其余新增模块仅完成线索/部分材料审查，版本、修复或完整静态核对未闭环；不把竞赛结果、事件报道或方法文章凑作新漏洞稿


没有发现需发布的有效秘密；没有执行漏洞代码、安装候选依赖或访问示例目标。固定源文件审查范围和Git blob身份见[audit-entries.json](audit-entries.json)。本地原始快照哈希用于审计，不等于全部快照被转载进本仓库。无许可证的长文以原创中文综述与必要少量技术引用处理，完整材料链接保留。静态检查不是安全认证。

## 文档验收

基点5862篇，96项Python及44项Node单测通过；4093条既有warning，0错误/fatal/新增问题，索引一致。稀疏工作树未下载全部历史资源，资源检查返回非零：20347个资源文件均因稀疏检出未落盘，Git HEAD及skip-worktree身份全部核对，19101个不同blob中只有27个缓存对象；没有将此误报为库内缺图，也没有声称图片字节/像素验收通过。资源字节审查限制单列；不以Git树存在代替图片像素审阅。最终新增文章、保真、渲染、生成一致性与远端CI结果见 validation.json及交付时核实。
