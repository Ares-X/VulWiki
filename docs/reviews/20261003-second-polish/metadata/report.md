# 元数据 / 编号角色 / 正文映射只读专项

日期：2026-10-03  
仓库：`/Users/aresx/Ares-X.github.io/source/wiki/VulWiki`  
核对基线：manifest 固定的 5,654 篇 `shard-1..8.jsonl`（merged PR #6 为 `8f2a9e14575928bb5f086902c786da66f4a65aa9`）；只读检查当前工作树、`docs/generated/{records,sources,excluded}.jsonl` 与前轮 `docs/reviews/20261003-full-fidelity/metadata-ledger.jsonl.gz`、`admission-fix.json`。

## 结论

在此专项边界内，未确认新增的标题、产品、record_type、primary_identifiers 与正文之间的明确错配，也未找到可据 Git 原文证明的 query / FOFA 原值被丢弃或脱敏。当前元数据总体与前轮正文校订状态相符：可疑编号通常被保留为引用或候选，复杂材料标为 analysis，来源字段和原始正文同时保留。没有基于缺少外部公告或未复现推断 CVE 无效、产品映射错误或漏洞不存在。

发现一条来源 URL 值含 `****` 与零宽字符的既有标记，但固定归档版本中该字段不存在，原译文正文亦含相同字面 URL。这个事实不能证明标记由本轮引入、也不能推断正确 URL。遵从不脱敏要求，建议仅作为待核记录保留原值，不给出替换猜测。

## 覆盖与方法

- 验证了 8 个 shard 文件 SHA256 均等于 `/tmp/vulwiki-second-polish-20261003/manifest.json` 指定哈希，共 5,654 条、5,654 条唯一路径。
- 对照前轮 gzip 元数据 ledger：5,654 条路径一一覆盖。
- 当前派生数据计数：records 5,509；sources 5,603；excluded 51。ledger 状态计数：5,501 篇同时在 records 与 sources，94 篇仅 sources，59 篇在 excluded；每个固定输入路径均落入这些当前集合之一，没有孤立路径。current records 与 sources 的共享 title/product/record_type/primary_identifiers/referenced_identifiers 字段一致。
- 逐篇解析固定 shard 中 archive 与 working frontmatter，对比 source_url / fofa / hunter / quake 的精确字符串；修改项回看完整正文及前轮 ledger。867 篇 archive 带有 fofa 字段，其中 812 篇归档 frontmatter 与 working frontmatter 不同：804 篇原值仍在 archive 和 working 正文，8 篇残缺值转到 `fofa_unverified`，未发现此次扫描中可证的原值丢失。归档源 URL / Hunter / Quake 字段没有非空值变化命中。
- 前轮 ledger 中 2,712 个旧 `cve` / `cnvd` 编号仍有原文字面量；旧编号角色须以当前 `primary_identifiers` / `referenced_identifiers` 为准，不把旧字段或标题文字自动推成主编号。ledger 仅有 1 条新掩码标记候选，逐项查看如下。
- 未执行任何文章代码、PoC、扫描器或载荷，没有访问示例目标，没有使用外部新来源。

## 有证据的待核项

### 1. OMI 译文来源 URL 含标记样式字符，归档字段缺失，不能确定其来历

- 路径：`Web安全/云平台/Azure/重温OMI：分析CVE-2022-29149，Azure OMI中的权限提升漏洞.md`
- 当前文件 SHA256：`a25ed8932e460aeb23a94413825c53846cd2cb80b25816405cc9ec67896869f7`
- 当前字段：`source_url: "https://www.wiz.io/blog/omi-returns-lpe-technical-analysis****‍**"`；`primary_identifiers: "CVE-2022-29149"`；`referenced_identifiers: ""`；`product: "Microsoft OMI"`；`record_type: "analysis"`。
- 完整正文证据：工作正文开头译注为 `**‍****本文为译文，原文链接：https://www.wiz.io/blog/omi-returns-lpe-technical-analysis****‍**`；同一正文还保留 CVE-2022-29149 主文论述，以及“前四个漏洞”中的 CVE-2021-38647，结构上支持把后者作背景而不是本篇主编号。固定归档 frontmatter 只有 `cve: "CVE-2022-29149"` 和来源标签，无 `source_url` 字段；归档正文中上述 URL 已带相同标记样式后缀。前轮 metadata ledger 的唯一 mask-marker candidate 指向此字段。
- 判断：来源地址值的污染/标记是确定的；是否为历史源文原样、翻译/采集污染、旧修订造成或合并时形成不确定。不能称作新增脱敏，也不猜测并改 URL。外部公告真实性和 URL 可达性未核。
- 最小建议：无可证据支持的 `old_text → new_text` 替换。保留原值并记录待核；若后续仅从固定 Git 历史中找到已存在的更早原始值，可逐值提案，不从外部猜补。

## 供主审查协调者注意

前轮 admission-fix 中 8 篇已按具体正文证据更正标题/类型/编号角色；其余 51 篇 excluded 的计数与当前投影相符。本专项未发现足以推翻这些决定的新 Git 原文证据。标题文字中含编号、正文提到某产品或同源原作者 claim 均不足以单独证明错配。当前 5,509 个主入口 records、5,603 个来源 records、51 个 excluded 覆盖关系完整。

## 未能确定的事项

- 不调用外部公告/厂商源，因此不能裁定任何 disputed / unknown 编号的官方状态，也不能完成新的产品映射验证。
- 图片像素、源网页当前内容、平台查询合法性未核；没有把路径名或截图名当内容证据。
- OMI URL 的标记究竟来自早期内容还是后续导入未知，固定归档只证明该 URL 字符串当时存在于正文。
- 对 812 个归档 FOFA 字段差异，本次可证值均在正文或 `fofa_unverified` 保留；残缺项不是有效资产查询，不推断应补全。
