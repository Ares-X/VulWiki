# 2026-10-25 维护检查记录

## 范围与保真

- 基线：`79d461e7b8a04047dae0127136ee86168cc9eff0`；独立分支 `codex/weekly-vulns-2026-10-25`。在新建任务目录获取仓库，没有覆盖既有工作副本。四篇新增、一个已有条目局部追加；具体路径、字节数与 SHA-256 见 `changed-articles.json`。
- 本地只稀疏检出正文、规范、脚本与派生索引，不下载全库历史图片。扫描正文共 6032 篇（基线 6028）；原有正文、代码、资源 URL、图片及元数据均保留。PwnEscape 既有文件仅新增 dated 限制说明。
- 机器来源投影逐记录比较：新增四条、仅既有 PwnEscape 一条改变、删除零条；原有 5562 个显式实体、927 条指纹和两条排除记录数量不变。新增八个主 CVE 导航号，其中 Plex 四项是一个组合链条，不能按文档数或 CVE 数宣称独立漏洞数。
- 已读五篇修改稿与最终正文/索引差异；来源实际阅读及未读范围见 README。没有运行漏洞资料、访问示例目标、安装 PoC 依赖、扫描资产或修改 baseline。本记录不是动态复现证明；独立维护者审阅仍由 draft PR 承载。

## 本地检查

| 检查 | 环境与结果 |
| --- | --- |
| Python 单测 | Python 3.13.11，`python3.13 -m unittest discover -s tests -v`，96/96 通过。首次误用系统 Python 3.9 的五个 `Path.write_text(newline=...)` 错误已通过选择符合仓库要求的运行时解决，未改工具源码。 |
| 质量基线差异 | `scripts/wiki.py check --baseline docs/quality-baseline.json`：6032 篇，0 error、0 fatal、0 new issue，4093 条历史 warning。仅说明没有新增质量债，不称全库无问题；baseline 未修改。 |
| 索引生成 | `scripts/wiki.py build` 完成；`build --check` 的 different_files 为空；派生摘要/来源及产品、2026 CVE 入口变化与四篇新增相符。 |
| 渲染单测 | Node v26.5.0，使用既有博客 Marked 4.3.0 依赖；render-audit 与 image-inventory 共 44/44 通过。没有安装依赖或执行 HTML/PoC。 |
| 全库静态渲染 | 6032 篇，0 structural failure，15 个历史候选（9 bare_image_filename、1 code_web_controls、1 unfenced_source、4 unknown_html_literal）；五篇变更稿候选为 0。仅字符串 lexer/parser，未作浏览器实际展示或图片像素核验。 |
| 全库资源扫描 | 已运行 require-local，但本地稀疏检出缺少 20368 个历史资源文件，退出 1；远程图片、空标签、外部 SVG 依赖均为 0。不能把这次本地扫描称完整图片字节验收。 |
| 变更范围资源扫描 | 对五篇变更稿的精确符号链接清单运行同一 require-local 工具，退出 0，缺失/远程/空标签等均 0；本轮没有新增或改变图片引用。它不替代完整检出资源检查。 |
| Git diff | 提交前检查 `git diff --check`，并复核只含本轮正文、维护记录及生成结果；不修改发布配置。 |

全库原始诊断、初始内容清单和渲染清单保存于任务目录的仓库外文件，未截断或脱敏诊断值。稀疏检出检查与完整检出 CI 分别报告；推送后由 PR 对应提交的 Content quality 检查验证完整资源，远端结果在 PR 和任务交付中记录，避免把旧提交的通过结果冒充本次提交。

## 临时材料

克隆默认检出时开始下载完整资源，随后停止该任务的进程树并改为单次批量获取文档。中断产生的唯一无效 `tmp_pack_dQLjNn` 在确认无打开句柄后删除；源 Markdown、Git 完整对象 pack、原资源及用户其他任务材料均保留。仓库外 `cleanup-report.json` 记录精确删除路径、du 与磁盘可用空间前后值。没有构建博客、创建完整网站副本、合并或发布。
