# 全量保真审查证据

对应[审查报告](../../REVIEW-FULL-FIDELITY-20261003.md)。固定基线为合并内容提交 `8f2a9e14575928bb5f086902c786da66f4a65aa9`，180 篇修正的最终 SHA256 单独记录；发布暂停。

| 文件 | 内容 |
|---|---|
| `manifest.json` | 固定版本、输入分片哈希、覆盖数量及每个证据文件的字节数/SHA256 |
| `article-inventory.jsonl`、`coverage-summary.json` | 全部 5,654 篇的路径、Git blob、版本/工作文件哈希及覆盖证明 |
| `recursive-node-dispositions.jsonl.gz`、`node-screen-ledger.jsonl.gz` | 362 篇递归节点差异的完整审阅和全库筛查 |
| `prose-dispositions.jsonl.gz` | 3,128 条原文候选、上下文结论及 83/366 条补充复核；初审与最终复核同时保留 |
| `render-ledger.jsonl.gz`、`render-summary.json.gz` | 全库字符串渲染、代码/图片差异及活动 HTML 标记的静态检查 |
| `heading-screen.json.gz`、`heading-copy-proof.json` | 全库围栏解析检查和 17 篇独立围栏复制内容对照 |
| `heading-classification-reconciliation-v2.json` | 独立复核对初审分类错误的纠正，确认 18 篇仅补空行且原围栏字节保留 |
| `change-whitelist.json`、`*-fix.json`、`status-table-restoration.json` | 180 篇修改的精确白名单、依据、前后 SHA256 和局部变更证据 |
| `final-frontmatter-proof.json`、`final-generated-counts.json` | 8 篇字段修改、其他字段保真及最终入口数量 |
| `metadata-ledger.jsonl.gz`、`excluded-baseline-dispositions.jsonl` | 全库元数据和基线 59 篇排除稿逐篇审阅；最终 8 篇恢复见 `admission-fix.json` |
| `html-dispositions.jsonl.gz`、`html-addition-source-evidence.json`、`image-dispositions.json` | HTML、代码字面量和图片差异；不代表执行、像素或真实性核验 |
| `assets-preservation.json`、`source-attribution.json` | 资源保留与 644 篇来源页脚变化的复核 |
| `independent-163-overlay-review.json`、`independent-163-hash-ledger.json` | 前 163 篇修改的独立复核；随后 17 篇有单独围栏证明 |
| `progress-translation-limits.jsonl` | 乱码原文导致的解释等价未知，不能当作核验通过 |
| `quality-report.json.gz`、`quality-summary.json`、`tests.log` | 完整质量报告、遗留警告口径和 52 项测试输出 |
| `prior-build-*` | 基线构建的逐文件核验和 13 个未引用嵌套重复资源的证据 |
| `final-build-summary.json`、`final-build-file-ledger.jsonl.gz`、`final-build.log` | 本轮最终工作内容的独立 Hexo 构建和逐文件哈希核验；未部署 |

大文件使用标准 gzip 无损压缩。`manifest.json` 同时记录压缩文件 SHA256 与解压数据 SHA256；完整原值没有遮罩、替换、截断或隐藏。`quality-summary.json` 保存检查器直接输出的 JSON，`tests.log` 保存测试日志。

可用 Python 标准库核验解压结果：

```python
import gzip, hashlib, json
from pathlib import Path

root = Path("docs/reviews/20261003-full-fidelity")
manifest = json.loads((root / "manifest.json").read_text())
for row in manifest["files"]:
    raw = (root / row["file"]).read_bytes()
    assert len(raw) == row["bytes"]
    assert hashlib.sha256(raw).hexdigest() == row["sha256"]
    decoded = gzip.decompress(raw) if row["compression"] == "gzip" else raw
    assert len(decoded) == row["decoded_bytes"]
    assert hashlib.sha256(decoded).hexdigest() == row["decoded_sha256"]
```

没有运行文章代码、资源或载荷，没有访问示例目标，也没有把本轮静态检查标成漏洞复现。截图像素、实际浏览器剪贴板和外部技术事实的未知按报告保留。
