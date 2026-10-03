# 第五轮验收证据

固定 Git 输入为 `956c8b26de5accbc1af8faecacdd34c34384a759`。详见 [检查报告](../../REVIEW-FIFTH-POLISH-20261003.md)。证据保留完整原值，未脱敏；所有 gzip 文件均按未压缩与压缩字节校验 SHA-256，清单见 [manifest.json](manifest.json)，结论见 [summary.json](summary.json)。解压只读取文字，不运行其中的文章、示例、脚本或 HTML。

- `before--*.gz` 是旧工具的固定输入扫描；`rule-before--*.gz` 是修正规范化范围后的同一输入；`after--*.gz` 是最后实际文章的扫描。不能把工具消除的误报计作文章修正。
- `operations.jsonl.gz` 保存 520 处精确原文与替换跨度；`preview-ledger.jsonl.gz` 保存 506 篇前后 SHA。UTF-8 字节偏移与 Python 字符位置分别标明；JS 验收按 UTF-8 前缀转换位置。
- `dispositions.jsonl.gz` 完整覆盖原 591 个候选 ID，并绑定最终文件 SHA。516 项已修正、5 项工具误报已消除、70 项保留，不隐去待核内容。
- `html-*-review*.gz`、`http-review*.gz`、`format-review.json.gz` 包含实际读取范围。原分类错误与不适用的建议保留为原报告，修订分类与最终协调者处置分开。`preview-independent-review.rejected-original.json.gz` 是未修好验收器时的失败结果，不能作最终验收依据。
- `preview-checks.jsonl.gz`、`preview-independent-review.json.gz` 是最终静态保真验证；`regression-review.json.gz` 独立重放前轮 373 处操作。引用完整文章原文仍以固定 Git 提交为准。
- `article-byte-ledger.jsonl.gz`、`source-projection-ledger.jsonl.gz`、两个资源 ledger 与 `final-*-proof.json.gz` 核对构建产物及完整索引/资源值。缺损与无效 URL 保留具体原文，未获取外链或访问示例目标。
- `build-check-location.json.gz` 明确记录复用的自建隔离目录及覆盖来源；未发布。`baseline-proof.json.gz` 与 `protected-files-proof.json.gz` 记录基线及用户文件保留。

辅助脚本、工具修订前后源码与测试日志只供审计复查。完整报告区分静态检查、候选上下文阅读、人工全文阅读和未做的核验；它们不能相互替代。
