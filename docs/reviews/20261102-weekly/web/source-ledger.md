# 2026-11-02 网页来源核对

窗口：2026-10-24 00:00 UTC 至 2026-11-02；与前次重叠。观察时间约 00:48–00:51 UTC。来源检查不等于所有历史正文重读；没有可比较旧正文快照的来源，不声称已排除历史静默纠错或撤回。未执行载荷、未访问原文演示目标。

| 来源 | 实际检查与结果 | 覆盖限制 |
|---|---|---|
| https://wiki.0-sec.org | web open 返回不可访问 | 未读，不能声称无更新 |
| https://xz.aliyun.com /news | 首页与文章页可读；文章页返回“已加载全部”，最新技术文为 Oct23 CVE-2026-6307，窗口内可见的是 Nov1 站点升级公告，不收普通公告 | 新版站点可见列表只有约 16 项，不能当作原站历史全量；旧文实质更新无修改时间快照 |
| https://tttang.com | 首页 Timeout fetching；/archive/ 不可访问；补充站点限定搜索只返回旧作者归档 | 窗口正文未覆盖 |
| https://paper.seebug.org | 首页与 /rss/ 不可访问；站点限定日期搜索未找到可核窗口候选 | 未读不作无更新结论 |
| https://www.anquanke.com | 首页两次 Timeout fetching；/vul 为 404，站点限定窗口搜索无可核结果 | 窗口未覆盖 |
| https://y4er.com /posts/ | 首页、全部文章第一页可读；标示共 210 篇，最新日期 2023-10-26，当前页已降到 2023-04 | 当前最新列表无窗口新稿；210 篇历史未逐篇重读，不能排除旧文更新 |
| https://portswigger.net/research /research/articles | 两页均显示 Oct27 Scalable Vector Grief 为最新，下一项 Oct6；最新原文完整文本已读，发布/更新均 Oct27 14:29 UTC | 索引窗口枚举完整到越界项；旧文静默更新未全量比对；只缩窄一个库的候选审查 |
| https://labs.watchtowr.com /disclosed-vulnerabilities/ | 首页最新 PaperCut Oct9；披露台账最新已公开日期 Sep19，多个更高 WT 编号仍 Unpublished | 未发现可见窗口新稿；Unpublished 不猜内容。首页 PaperCut 与披露表 WT-0141–0144 仍未发布标签不同步，不据此推断撤回 |
| https://www.exploit-db.com | 首页可达但记录表是“requires JavaScript”；日期限定 /search?date_start=2026-10-24&date_end=2026-11-02 不可访问，站点限定日期搜索未找到结果 | 未取得窗口记录，不声称零增量 |
| X/Twitter | x.com/garethheyes 与 x.com/assetnote 均 403；针对 Scalable Vector Grief 的公开搜索无可独立读取帖子 | 无专用接入；不保证全量。通过公开索引发现研究后追原作者，不以二手帖子作事实依据 |
| 原作者补充 Searchlight Cyber | https://www.slcyber.io/research/cache-me-if-you-can-xss-in-cloudflares-cdn-cgi-image Oct28，Kevin Gervot 与 Adam Kues；551行原文完整读取，含具体 SVG、Flask 与浏览器历史导航材料；原文固定链接 svg-hush 820d3751d686a605a62a773b6f82ced1beed9efa、xml-rs 798543db49000767ff4dae131fd2a9ea5fe7310b、Chromium 1f410ff4e39b61ea93b59eb021b35853dbc4ca12 | HOLD：本轮仅阅读原文和定位固定引用，未完成全部组件/依赖/工作流静态审阅，也未独立核实托管服务修复状态、图片证据或浏览器版本。不是缺 PoC，不是要求复现 |

## 镜像与重复排除

搜索返回 Cybernoz、Rubric、SiteM、Medium、Beyond the News 等 PortSwigger 转载或摘要，均归同一原文来源链，不分别算新增。Searchlight 的 Cloudflare 图像链与 PortSwigger 的 sanitize-svg 根属性漏检不同，不因共同 SVG 字样合并。

## 唯一建议进入正文的候选

`sanitize-svg-article.md`：只覆盖 @mattkrick/sanitize-svg 0.4.1 嵌套 SVG onload；具体触发片段存在，源码与版本对应已核，附 `sanitize-svg-audit.md`。没有把 PortSwigger 其余库、Firefox XSLT、Safari GIF 技巧当作已审阅候选。
