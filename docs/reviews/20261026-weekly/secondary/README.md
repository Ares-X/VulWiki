# 五个次级归档来源：2026-10-26 只读核查

先读当前 AGENTS.md、CONTRIBUTING.md、CONTENT-SCHEMA.md 与 20261019-weekly/README.md。窗口 Oct18 起含重叠，实际以历史固定 head 为增量基线；未执行来源代码、安装依赖、扫描或创建远程任务。这里只写库外交接文件，未改仓库。

## 覆盖与检查点
source-ledger.json 是每源 head、日期与限制；wxvl-touched-paths.jsonl 保留全部 454 路径及提交事件。**wxvl 只完成变更路径枚举和部分候选正文复核；不得推进“全部来源已成功审阅”检查点。未读不是无价值。**
- Mr-xn：head 64437677355191af561cdccea883219fbe9c5fdf，2026-10-25 11:03:47Z；历史 head 后16提交，净修改仅 README，23新增行/24外链（20篇友加、亿赛通合计及PHP等，准确URL见 mrxn-new-links.json）。Oct18查询18提交含两条重叠。没有新增本地漏洞文章、删除或更名。GetDefault 页面工具不可访问、亿赛通页面 Cache miss；未绕过。其余 mrxn 页面没有全读，PHP四个链接与既有入库范围交叉，不在此重复审核。
- MrWQ：fcbdb421b62aef6ccac59a1887d94687f4faf9d6 / 2026-04-01 02:23:55Z；无增量。
- lal0ne：5b9f397c1970203b1764fb7a66a0ffac39bef4cc / 2025-07-27 13:14:37Z；无增量。
- vulhub：9b90d4276f84feed6333286afeb7e1250379a1da / 2026-10-17 20:59:35Z；无增量。
- wxvl：0ca04cb9e2986ac80a58dfd004051d9eeebeb025 / 2026-10-25 22:19:17Z；25提交。compare 恰300文件，不能视为全量；逐提交各2–54文件，累计489事件/454唯一路径，解决路径清单截断。451新增正文、2既有正文修改、data.json 修改；没有 removed/renamed 事件。**正文未全读，图片未逐像素审阅。**

后三个无增量源为最近 head 与日期查询证据，不是旧文、未合并分支或外链静默修改全面复查。

## 实质修订/撤回观察
- wxvl 的既有“关于双十一期间暂停授权测试及漏洞收录的通知.md”被不同来源同题覆盖：从京东10/16–11/18通知变成中通10/19–11/14通知。它是归档标题碰撞/替换，不应当作原京东撤回。提交 4f3e5d16719457a573f67c5251fb08c92d2e580b 可追溯。
- 既有“能信安：安全漏洞通报.md”从10月2日新闻+漏洞条目换成10月23日通报，实质正文更换；不是仅格式改动。新文 SmartScreen 编号在一处为 CVE-2023-108463，链接为 CVE-2026-108463：编号冲突未核对，不能提升成主编号。
- 新增后又修改的【零日雷达】【已验证RCE】PHP文章移除了捕获/复现具体时分并改图片/来源链接，不能沿用旧时间证据。其他多处同名转载改署名、图片/推荐链接；本次未将全部修改事件宣称语义全审。
- 没有文件级净撤回证据，不保证所有外部文章无撤回。

## 合格候选
Camel CVE-2026-78165：camel-78165.md 为原创中文稿，camel-static-audit.json 列固定19文件范围。Apache CNA记录及官方4.22.x修复已读；vendor网页工具失败已明示。主库精确编号搜索零命中，维护者另做全库确认。仅 benign readObject marker，不能写成完整RCE；需要Redis发布/读值控制与classpath/gadget边界。公开仓库无LICENSE，不复制完整PoC。完整静态审阅未见无关外传/持久化/破坏；镜像和传递依赖未审计。

## 选取候选与尚未完成项
10份 wxvl 选中文本已完整取回，但工具大批返回截断，**不能把“取回”称作全文人审**。完整逐字审读完成的是 Camel 次级文、Nextcloud次级文、piflow次级文，以及Camel原作者19文件。其他选中文本只读片段/提取出处，待继续：
- piflow CVE-2026-109442：有 Lasso 原作者明确 POST /chat 步骤与实际 canary；VulnCheck CNA范围2.0.0–2.0.1。已读 https://www.lasso.security/vulnerability-database/cve-2026-109442 与 https://www.vulncheck.com/advisories/piflow-2.0.0-through-2.0.1-unauthenticated-rce-via-chat-agent-exec-shell ，以及固定 ad8d0108a54a4257307d4946dc9250e26f24c63f 的 agents/tools.py（完整）。代码确认 shlex/argv subprocess，无显式shell=True，继承环境；原作者实验另称817605d。尚未审完路由、factory、engine、依赖/脚本，不能说固定反投毒完成。root无LICENSE、无.github workflow（完整tree），大量workspace技能和附件未审；不应审计整个产品假称已完成。本次精确主库CVE搜索无命中，但仍需正式去重。
- Ivanti CVE-2026-104935 固件分析(附exp)：代码材料取回，有具体 Python 片段与Volexity链接；全文技术与反投毒未完，不准入。https://www.volexity.com/blog/2026/10/13/a-series-of-unauthenticated-events-chained-exploitation-of-ivanti-connect-secure-zero-days/?utm_source=chatgpt.com （本次未打开）。
- flyimg 1.12.2 两个 RCE：取回材料含 webpm/tm 两种具体路径输入和环境，尚无一手原始链接；不能仅据靶场宣称完整版本边界。
- ILIAS 9.22 零权限RCE、Zen Cart 两种payload、ARTEX 未认证RCE、Gemini-mcp-tool 0755：文本已取回，需一手版本/触发/许可与反投毒，均不是已合格。
- PHP115560：取回的是次级预警，不在本组建立新触发证据，留台账。与PR30既有PHP稿需区分。
- Nextcloud110447：次级文全文已读，明确无独立公开利用代码，且主库历史已处理richdocumentscode；不重复新增，不能用其概括步骤替代具体触发或覆盖既有细节。

尚未取回但值得下一步定位（仅标题线索，不是技术结论）：OpenCode/PentestCode安全问题、Linux KSMBD两漏洞、Brother默认密码链、SPIP77806、Divi Plus91136、T+ GLSyncService、Ollama路径穿越、友数聚CPAS文件读取。全部未读路径仍在inventory，绝不归类“无合格资料”。

## 精确访问失败
本次只做网页 GET：
1. https://mrxn.net/jswz/youjiasoft-Sys-GetDefault-sqli.html ：工具“not accessible”；原因未知，不猜测403/删稿。
2. https://mrxn.net/jswz/CDGServer3-UnInstallApplication-sqli.html ：工具“Cache miss”。
3. https://camel.apache.org/security/CVE-2026-78165.html ：工具“not accessible”；用独立可访问的Apache CNA及官方补丁作事实核对，不假称该网页已读。
均未绕过限制，未尝试身份/口令登录。

