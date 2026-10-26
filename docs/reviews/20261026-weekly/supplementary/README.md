# 2026-10-26 补充源逐源只读审阅

已读取当前 AGENTS.md、CONTRIBUTING.md、docs/CONTENT-SCHEMA.md、docs/reviews/20261019-weekly/README.md 以及 supplementary-source-coverage-20261019.json。本轮窗口固定为 2026-10-18T00:00:00Z 至 2026-10-26T00:00:00Z；上一轮未完成的历史批次没有重放或提升检查点。以下统计是清单覆盖，不是全部外链正文已读。

## 来源台账

| 来源 | 可用性、固定 head / 时间 | 本轮增量与分页 | 边界 |
|---|---|---|---|
| nomi-sec/PoC-in-GitHub | GitHub API 可读；d3c780f14633854440ce0d478fcde4d3b6762358，2026-10-25T19:47:46Z | dated commits per_page100 第1页64条；32个非README提交逐提交41页，每页100文件、各提交末页均<100；1234个独立 touched paths | compare 首300文件截断已用逐提交枚举补齐本窗口非README路径；外链未全读。包含删除/重命名，但不能推出官方撤回 |
| trickest/cve | 当前 head 7a40b2cacd8df33f71dce21be856511e414576ed，2026-10-16T12:59:57Z，与上次相同 | dated commits per_page100 第1页0条；另独立最新提交 per_page1核对 | 仅新窗口无提交；旧外链缺口保留，不声称旧文无静默修改 |
| projectdiscovery/nuclei-templates | GitHub API可读；8044942b006169b5c93e46c50ec3a791498efdef，2026-10-25T16:22:51Z | dated260条，页100/100/60；对上一固定17f5725dc10ced09f464dd2d255c19957aad51e7 compare294提交、文件恰300截断；按消息排除签名/digest/format/README/stats/chore/Merge branch后83提交各1页，51独立路径，每页均<100 | 只完成该83提交子集；294包含旧作者时间分支提交，不能用dated数替代合并图增量。尝试recursive tree基线端点两次Transport closed，没取全树；没有重试先前403.diff。全量签名变更仍未覆盖 |
| rapid7/metasploit-framework | e25d6ee62a0c7f7df27f367c8028859fdf8136a7，2026-10-23T16:32:31Z | dated第1页36条；与上一b22ce1fbae63e8caeb3a773366a6d3336bd66fb8比较66提交、52路径(<300)完整净差异 | 首次误用dated列表最后分支提交父节点所得555提交宽比较作废；最终只用上一固定head。新10134模块正文全文审阅，88771和93674已有文章不重复新增，其他框架组件不是本次漏洞新稿 |
| Exploit-DB 官方GitLab | 官方branch/main网页缓存显示12879ca774a9d7543907d24a7bc1cebb47959afe、2026-10-02T00:16:12Z，与上次相同，但缓存5天 | dated Oct18 API web返回Cache miss；per_page1缓存4周、显示旧9月12提交，不能拿它作当前head | 当前新窗口未可靠覆盖，不能写无更新；未请求其他绕行渠道。只有缓存分支元数据，不推进成功检查点 |

每个GitHub日期查询均为 `/repos/{repo}/commits?since=2026-10-18T00:00:00Z&until=2026-10-26T00:00:00Z&per_page=100&page=N`。原始完整提交sha、逐页计数和变更路径保存在 coverage.json。非README枚举无缺页、不是全外链安全背书。

## 修订与删除观察

- Nomi的所有 removed/renamed 事件在 coverage.json 保留完整旧/新路径与对应提交；这是汇编索引维护，未据此更改任何正文CVE状态。例：2026-88773索引重命名为2026-109715，2026-102268为2026-113872；官方映射未逐项核验。
- Nuclei本周提交消息明确修订 PHP109618编号/主动检测及版本回退，OpenCTI27960 GraphQL validation误报、Tika2025-54988从echo匹配改为版本门控XFA XXE文件读取，其他catch-all200误报修正；删除CVE-2026-60137模板。这些均不是官方撤销证据，未执行模板。
- 本次PR30已收录的PHP、Node、Plex、FortiSIEM、Laravel、Echo、Drupal、Android及PwnEscape不重复新增。

## 合格稿及具体静态审计

1. langflow10134.md：固定MSF模块Ruby全文、文档全文、Gemfile、gemspec、本窗口labels工作流全文；IBM公告及CNA。匿名FLOW_UUID分支只POST空对象触发已有流程，没有注入新代码；认证分支创建PUBLIC恶意流程，实际来源成功记录只支持该路径。模块check版本判断与真正利用分开。MSF_LICENSE/BSD-3-clause，原创中文说明。没有审计整个框架/全部工作流/依赖二进制，明确不提供安全认证。
2. traefik85595.md：固定7e45b32b087ef7df97b59062e5683265dd2d9a20 recursive tree未截断，10文本文件全读（README、REPORT、Python、4 evidence、lab README/compose/run.sh）；无LICENSE/工作流/二进制。官方GHSA与CNA核对。作者GHSA错误、CNA内部CPE边界冲突、缺失lab配置和脚本路径错误、HTTP-only及实验专用判定均已说明。没有操作者无关固定外传、凭据窃取、持久化、混淆或破坏性操作；实验启动和其他模式重启容器属于明确实验副作用，而非静态维护动作。

## 去重与未完候选

全库复核在当前dcf0607正文全库检索确认10134、85595无编号命中；本轮审阅进一步搜索并阅读全文对比Langflow当前目录的55255、9198、5027、0770/14行JSON、17633 post-auth材料：无build_public_tmp或PythonCodeStructuredTool对应主体，端点/权限边界不同，未按同产品合并。Traefik仍由最终维护审阅按产品标题复核。

以下只是Nomi列表新线索，未完成正文/官方对应/安全审计，不写成没有PoC或拒收：Boreas37/CVE-2026-85168-PoC（n8n Git节点）、oscerd/CVE-2026-80312（Camel OAuth fail-open）、oscerd/CVE-2026-80343（Camel netty-http大小写约束）。其他1234路径的外链亦未全部完成。Nuclei新模板REDCap90817、StirlingPDF85714、rustypaste90774等只作清单线索，本轮没有宣称可收录。

## 访问失败与边界

- GitHub nuclei基线recursive tree读取两次Transport closed：传输失败，非确认资源不存在；没有全树结果。
- GitLab新窗口API Cache miss：缓存获取失败，非确认无提交。
- 原作者Traefik错误GHSA网页404：原URL失效/不存在观察；按CNA明确引用另一个公告，不猜同号映射。
- GitHub connector访问 `/repos/traefik/traefik/security-advisories/GHSA-4v96-rv7j-9wmr` 报400 not allowed endpoint；未绕过该接口限制；后续CNA是独立允许的仓库文件查询。
- 一次宽范围本地find遇 `/tmp/codex-daemon-1000` Permission denied，未再次读取或请求权限；不是本任务材料路径。
- 初次 `git -C vulwiki-fidelity-master grep ... HEAD` 在partial clone触发隐式Git对象获取，长时间无结果后中止，退出130并显示 Proxy CONNECT aborted。未把该查询当作去重结果，随后仅用当前本地Markdown的Python读取完成Langflow对读；没有重试网络Git获取。

所有工作只读来源/当前正文并写库外输入稿。未执行PoC、安装依赖、下载运行镜像、访问示例目标、扫描、修改仓库或脱敏。Langflow草稿使用的原文占位符均来源已有，未改写。没有创建cloud Codex Work任务。

## 当前全库去重补充

复核发现 AI综合 分类既有 CVE-2026-33017 文章同样涉及 build_public_tmp，不能由只查 Langflow 产品目录就声称该端点未覆盖。其请求 data 注入节点与本次模块空对象触发/认证预置节点不同，已在新正文链接并明确区分。
