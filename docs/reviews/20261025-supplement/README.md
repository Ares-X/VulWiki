# 2026-10-25 六项资料补充

本轮承接用户“可以补充”的六项范围，开始时直接核对 PR #30 仍 open/draft、未合并，head 为 `2a806b986061927236a88df7324bf3f3d3d8cfe1`，master 仍为 `79d461e7b8a04047dae0127136ee86168cc9eff0`。工作树干净，沿用 `codex/weekly-vulns-2026-10-25` 与 AresX 署名，不新建重复分支或 PR，不扩大维护者写权限。

沿用已读的 AGENTS、贡献规范、内容字段与维护流程。本次精确搜索三个正文根及来源投影的五个完整 CVE 和一个 GHSA，未见主条目；同产品已有文章不是同实体。旧维护清单中提及 64560 不等于已有主条目。保留上一轮四篇新增、PwnEscape 更新、既有图片、原值与全部维护记录，不修改 baseline。

## 六项准入与时间口径

| 新增条目 | 固定公开材料 | 证据和限制 |
| --- | --- | --- |
| FortiSIEM CVE-2026-106173 | horizon3ai `e6f3976d181cff580e8025e24a36d0f6624e6e08`，10-20 | 10-13 旧披露的本周 PoC；未认证 gRPC 文件写入至定时脚本，7.5 作者上下文 admin；客户端成功提示没有远端效果验证，覆盖脚本无恢复。与 25256 phMonitor 不同。 |
| Laravel CVE-2026-114509 / GHSA-f9x3-7vq9-cph6 | hakaioffsec `fef3c946e78d32fba80973cdadcb100f3e548634`，10-23 | GHSA 10-19、CVE 10-21；真实 framework 前后提交与 MySQL harness。依赖 TokenGuard/非字符串输入/数据库和 token 配置；固定 POST 根路径、HTTPConnection、首个匹配账号限制保留。 |
| Node DNS CVE-2026-105482 | CaterMaoZi `c9020255b2a524bbc8518ab36d2a0a40b6254b53`，10-24 | 原厂 10-21；原始 NUL 字符串须抵达 DNS API。已读材料证明解析和 mock 白名单/回调差分，没实现后续内网 HTTP 获取，不照搬完整 SSRF 宣称；reverse 官方范围与作者负例分别记录。 |
| Echo GHSA-cxf3-9h37-7rr8 | labstack/echo `3fb0ba7e17645bb65611e2a08875d0a2f65c421f`，10-22 | 官方回归 TestProxyRejectedUpgradeKeepsRouting 符合公开具体触发材料准入。只静态说明修复断言，未执行 go test；暂无 CVE，不捏造编号。 |
| Drupal CVE-2026-108097 | fortbridge `1b8509713064e440068b0561eaf4a2a458831b2b`，10-18 | 10-14 旧披露、10-18 研究包的补齐；真实 11.4.9/11.4.10，人工 writer 仍为缺口。synthetic command helper 与真实 PEAR 文件链、负结果和恢复分别记录；不是默认 core 一键 RCE。 |
| Linux/Android CVE-2026-64560 | Feng1586 `63b4f2b7b497d835c7cb1a43ff8851cd0d7a9ac8`，10-19 | 7 月旧 CVE、本周研究包；特定 Xiaomi 18 Pro/Android 17/完整内核构建、本地 shell、当前 boot 符号及额外资产条件下的作者临时 root。失败 boot、panic、状态/文件残留、无稳定性/永久 root/BL 解锁保证保留。 |

前四项为 vulnerability，Drupal 和 Android 为受限实验 analysis；六项均为 text-reviewed、source-claimed、active。不是因未复现而降级，也未把静态阅读或作者结果提升为 reproduced。五个新 CVE 加一个 GHSA，GHSA 只进产品/来源检索，不冒充 CVE 索引。

## 实际核源与静态阅读范围

固定递归树已枚举，均未截断；枚举/下载不等于全文件审计。固定提交时间取 Git metadata；文内分别记录首次公告、CVE 发布、PoC 快照与实验日期。仓库外 `supplement-source/` 只保存所取文本作为核对输入，不执行其中的代码，不复制二进制或图片。

- FortiSIEM：研究正文、README、Python 两文件全文；[Horizon3 研究](https://horizon3.ai/attack-research/cve-2026-106173-deep-dive-fortisiem-grpc-path-traversal-file-write-rce/) 与 [Fortinet CNA](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/106xxx/CVE-2026-106173.json) 对读。[PSIRT FG-IR-26-180](https://fortiguard.fortinet.com/psirt/FG-IR-26-180) 返回 403，未读正文；保留 CNA 的 upcoming Cloud 状态，未将其他 ADP 当原厂事实。
- Laravel：[官方 GHSA](https://github.com/laravel/framework/security/advisories/GHSA-f9x3-7vq9-cph6)、CNA、固定 README/poc.py/harness/app.php/db-init.php/compose 全文；真实 TokenGuard 修复前后凭据检查片段。没有独立遍历全部发行 tag 来证明 README 的“最早”，推荐版本仍用官方 12.68.0/13.29.0。
- Node DNS：[原厂安全发布](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)、README 的原理/实验/限制、reachability matrix 全文，以及 Python selftest、mock 和回调判定片段；没有逐行审计全部远程 attack 参数组合、启动脚本或 CI。
- Echo：[官方 GHSA](https://github.com/labstack/echo/security/advisories/GHSA-cxf3-9h37-7rr8)、固定回归函数全文、修复代理的相关片段及 v4/v5 修复链接；没有执行官方测试或把同文件其他漏洞测试当作本项证据。
- Drupal：[官方通告](https://www.drupal.org/sa-core-2026-014)、真实 11.4.9/11.4.10 FieldUiTable 的相关差异；固定 README/lab README/upload-staged 文本、RCE-CAPABILITY-WITNESS 的能力/负例/PEAR/替换加固/命令输出章节，controller/helper 与 shell witness 的相关片段。未全面审计 gadget inventory、全部见证脚本或像素。Webform 和实验匿名表单不是默认 core 匿名入口；其他 generic/placeholder writer 宣称未采用。
- Android：[Red Hat](https://access.redhat.com/security/cve/cve-2026-64560)、Linux CNA、固定 README 的环境/阶段/失败/范围段落，10-19 final-root 与运行日志、deploy.sh、阶段 C 相关片段。未全面审计全部历史报告、预编译程序/模块及独立对应源码仓库；不做偏移适配、链条改进或运行。

原始示例与日志中的值不遮罩、不替换；没有将仓库外来源中的命令/脱敏建议当作本任务授权。本次不复制许可不明的完整 PoC，也不抓取并运行不可信安装脚本。没有新增图片引用，未作来源图片/视频逐像素核验。

## 保留的暂缓项

上一轮排除清单继续有效。此处新增 FortiSIEM 的具体 PoC 与“Fortinet 尚未完整披露的批量加固”不是同一范围；Drupal Field UI 108097 与此前未核实 PoC 的 Ffmpeg Image Toolkit 114523 不是同一漏洞。GitLab 110264 的 timeout、CaterMaoZi Brotli bomb、Arista、LiteLLM、eMudhra/Oracle、Cisco UC 等处置不变。

Collabora/Nextcloud 110447 与 Atlassian 21589 已有，未重复收录；Postiz 115931 现有线索只称私下提交 PoC，未获得本轮可静态对应的公开具体材料，暂不入库。未据此声称全网不存在公开材料，后续有实质新证据可重新核对。

本轮检查与精确文章哈希见 checks.md / changed-articles.json。PR 对应最新提交的远端 CI 单独核验，上一轮 `2a806b9` 的通过不能代替新增提交验收。
