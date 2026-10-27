# 2026-10-27 准入纠错检查

范围仅为 PiFlow 的正文准入、完整归档、状态历史及派生索引，不是新一轮来源全审。

- 基线：master `a4d6ef19733c9376500c175ebc6e0f531b504de2`；开始时开放 PR 列表为空。
- 已读当前 AGENTS.md、CONTRIBUTING.md、docs/CONTENT-SCHEMA.md、原正文与审阅台账；本次严格准入要求优先于历史 `analysis` 例外。
- `scripts/`、`tests/`、`.github/workflows/` 相对之前已审查的 `164065de` 无差异；复核本次 Python 入口、Git 只读查询、索引写入边界及资源检查行为后运行离线检查。没有运行原文代码或请求目标。
- `python -m unittest discover -s tests -v`：96 项通过。
- `node --test tests/*.test.cjs`：44 项通过。
- `python scripts/wiki.py check --baseline docs/quality-baseline.json`：6043 篇，错误 0、fatal 0、新增质量债 0；历史警告 4093 项保留。baseline 未修改。
- `python scripts/wiki.py build` 后 `build --check`：`different_files: []`。
- 默认产品、CVE 索引和全部 `docs/generated/` 文件不再包含 `VW-20261026-piflow-109442`、`CVE-2026-109442` 或 `cas-bigdatalab piflow`。
- 原正文与归档完整字节、Git blob、SHA-256 一致。惰性 Marked 字符串渲染结果及代码块复制文本一致；只比较内存中的 HTML/代码文本，没有执行脚本、加载外链或浏览目标。
- 原批次其他七篇文章与当前 master 逐字节一致；静态台账 18 文件 scope、findings、修正后 SHA-256 和 previous_sha256 保持不变。
- `git diff --check`：通过。
- 本地 `resource-audit.py --require-local` 返回非零：当前为 sparse checkout，20369 个既有图片路径没有物化；远程图片、空图片、HTML 错误页、不可用图片标签及外部图片依赖均为 0。这不是图片删除，也不作为完整资源通过。完整 checkout 的 PR CI 另行报告。
- 三条保真保留的历史相对链接例外及可用替代链接已列在本目录 README；历史批次 `changed-articles.json` 不作为当前准入清单。
