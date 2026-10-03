# 后续复核证据

对应[处理报告](../../REVIEW-FOLLOWUP-20261003.md)。`manifest.json` 记录每份证据的完整 SHA-256 和字节数。

- `article-edit-ledger.jsonl.gz`：41 篇的完整输入原文、逐操作原值 / 新值 / 位置、最终哈希与逆变换验证。
- `article-inputs.jsonl.gz`、`root-final-article-ledger.jsonl.gz`：5,654 篇本轮输入与最终哈希，核对未声明文章没有改变。
- `final-build-inputs.jsonl.gz`：冻结构建输入文件哈希；最终 manifest 另列证据文件在该快照中的哈希，区分构建前版本和构建后补充验证。
- `source-recovery-records.json`：30 篇短摘要、完整原文地址、实际核对的一手资料范围及具体未决项；不是完整原文恢复。
- `source-retrieval-fingerprints.json`：实际取得的响应指纹；未取得原始响应体的页面不假填哈希。
- `dlink-restored-block.json`：本轮恢复的完整 ENTRY 块、上下文及已有本地原文缓存完整 SHA-256；没有重新转录缓存中的其他摘录，原缓存文件保留。
- `empty-*.gz`：91 个空块的逐处复核和有限提醒建议；只恢复有精确证据的 1 块。
- `root-*-encoding-lines.json.gz`、`unknown-context--final-findings.jsonl.gz`：严格可逆行证据和 36 项疑点复核；不推广为整篇技术结论通过。
- `final-independent-*.json`：独立只读复核结果。Python 3.9 不满足工具要求；正式验收使用已安装的 Python 3.12.14。
- `markdown-preservation.json`、`identifier-projection-diff.json`：静态 Markdown token 保留和旧有效来源编号投影差异。
- `runtime-index-check.json`：实际生成目录中的 32 篇恢复条目，以及两篇候选和五篇汇编共 8 项编号检索角色断言。
- `resources--recovery-review.json`：16 个历史缺失资源未找到精确原附件的结果，原引用保留。
- `quality.json.gz`：完整静态诊断，原值不脱敏；存在历史警告，不能描述为全库事实核验通过。
- `final-build-summary.json`、`final-build-file-ledger.jsonl.gz`：独立静态构建及文章、资源、目录、编号与全文投影核对；构建完成后生成，不属于原构建输入快照。

本轮不执行文章代码或附件，不访问示例目标，发布暂停。外部整页正文不重新分发；来源摘要和核对范围分开记录。gzip 是无损压缩，不是隐藏或脱敏。

manifest、最终独立验证补充、检索断言和构建结果在冻结构建后完成，因此证据目录可能晚于该构建快照；manifest 按文件明示差异，不将这些更新声称为已随该次构建输出。文章和生成索引没有在验收后变动。
