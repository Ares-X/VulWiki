# 内容字段与机器入口（v1）

Markdown 是唯一维护源。`scripts/wiki.py` 使用 Python 3.10+ 标准库，只读取 `Web安全/`、`系统安全/`、`IOT安全/` 的正文 Markdown。它不执行 PoC、不访问外链、不从全文推断主 CVE，也不改写正文或自动删除重复稿。现有 Docsify / Hexo 仍可读取 Markdown；博客发布器不属于本仓库。

## 字符串 frontmatter

新增字段全部使用单行字符串，推荐 `json.dumps(value, ensure_ascii=False)` 对应的 JSON 双引号与转义，例如：`fofa: "body=\"Example\""`。也支持 YAML 单引号标量。不支持新字段写成多行 YAML、对象、数组、裸布尔值或裸数字。未知字符串键保留在原文。历史 `draft` / `tags` 例外作为不参与漏洞判断的原始文本兼容。

审阅记录里的 product 对象不能直接复制进 frontmatter：应根据结论选取正确产品字符串；多产品合集可用分号串保留多个名称。不要把未知、空白或元数据结构错误自动当成漏洞不存在。

| 字段 | 含义与取值 |
|---|---|
| schema_version | 新稿可用 `"1"` 启用严格必填；历史文章不要为批量迁移而假填 |
| id | 永久文章 ID，如 `VW-20261002-0001`；不随文件改名，不等同 CVE 或实体 ID |
| title | 人工规范的显示标题；缺失时用文件名，不据此抽产品/编号 |
| product | 主受影响产品/组件；目录、研究工具、发布者不自动成为产品 |
| record_type | `vulnerability` / `analysis` / `advisory` / `incident` / `roundup` / `unknown` |
| review_status | `text-reviewed` / `unreviewed` |
| verification_status | `not-reproduced` / `source-claimed` / `reproduced` / `failed` / `unknown` |
| content_status | `active` / `needs-review` / `quarantined` / `rejected` |
| primary_identifiers | 人工确定的主编号，多值用分号分隔 |
| referenced_identifiers | 背景、链条或推荐引用编号，分号分隔，不进入主 CVE 索引 |
| identifier_role | 旧 cve/cnvd 等字段的角色：`primary` / `reference` / `unknown` |
| identifier_status | `active` / `rejected` / `disputed` / `unknown`；不假设官方已确认 |
| version | 来源声称的影响版本；保留分支/范围/部署限制，不直接成为资产判定规则 |
| fixed_version | 有依据的修复声明，不能默认覆盖所有分支 |
| prerequisites | 认证、角色、网络、配置、交互、写入权限等；未知写 unknown 并说明缺口 |
| side_effects | 写文件、改账号、清库、重启、持久化、日志、出网/上传等；未知写 unknown |
| source | 原作者或上游汇编库标签，两者在正文分别说明 |
| source_status | `recorded` / `unknown` / `missing`；recorded表示已记URL，不表示事实核验通过 |
| source_url | 实际原文/公告 URL；缺失时声明source_status，不使用本库 blob 冒充原始出处 |
| archive_url | 可选历史归档链接；不替代 source_url、不代表来源核验 |
| ref / verification_source | 参考链接 / 核对事实的一手依据，正文说明支持字段、时间和限制 |
| fofa / hunter / quake | 各平台独立的完整表达式；资产指纹不证明漏洞存在 |
| fofa_unverified 等 | 留存残缺或待核查询，不进入指纹索引 |
| category_recommendation | 人工纠正分类建议；构建器不迁移目录 |
| entity_id | 人工确定的漏洞实体标识；不能由共同 CVE 自动创建 |
| canonical | 目标 Markdown 相对仓库根的完整路径，保留 Unicode/空格，不做 URL 编码 |
| relation_type | `duplicate_of` / `analysis_of` / `chained_with` / `patch_bypass_of` / `supersedes` |

新 v1 文稿必填 id、title、product、record_type、review_status、verification_status、content_status、prerequisites、side_effects。来源使用 source_url；确实未找到原始出处时，必须显式写 `source_status: "unknown"` 或 `"missing"`，此时可省略 source_url，并保留 source_missing 质量警告。不能填伪URL满足检查，也不应因缺来源回避schema_version。recorded状态下缺URL会阻断严格契约。编号、源码、PoC、指纹并非每种文章都有；不为了填模板虚构内容。

`reproduced` 额外要求 verification_environment、verification_evidence、verification_date 三个字符串。检查仅验证字段存在，不能证明真的复现。原作者称成功最多记为 source-claimed；本库文字审阅不能升级成 reproduced。failed 只表示某次实验失败，不能推出版本不受影响。

## 主编号、候选与状态

已知格式检查支持 CVE、CNVD（含 CNVD-C）、CNNVD、GHSA、QVD、XVE。只规范大小写，不修改数字。TALOS、WSO2、AVD 等其他形态的人工标识保留主角色，产生 `unrecognized_identifier_namespace` 待核，不假称无效或冒充 CVE。格式通过不等于官方分配有效，也不证明产品映射正确。

- `primary_identifiers` 优先；没有它时只有 `identifier_role: "primary"` 的旧字段成为主编号
- 未声明主角色的旧 cve/cnvd 等仍是可检索候选；明确 reference 的旧字段进入引用集合
- 不抓取标题、正文首次提及或推荐文章的 CVE 作为主编号
- rejected / disputed 的主编号不进入有效 CVE 导航；原始记录与说明仍保留
- needs-review 条目正常进入目录并显示状态；不默认已验证
- quarantined / rejected、严重结构错误、未处理活动 HTML 的文档进入[待核清单](REVIEW-QUEUE.md)，不进入有效目录
- 单个坏指纹或格式错误编号单独排除，不把其余文档事实自动判成无效

## 文章、实体和来源

一篇 Markdown 是一份来源文档，稳定 id 指向文章；entity_id 只记录人工确认的漏洞实体。同 CVE / 同端点 / 同正文只产生候选，不触发自动合并或删除。

canonical 自指表示本身是主入口，不要求 relation_type。非自指必须指定关系。只有 duplicate_of 折叠至主入口并展示关联来源。analysis_of、chained_with、patch_bypass_of、supersedes 保留各自独立入口和主编号，避免吞掉独立分析或不同漏洞。重复关系循环、缺失目标、重复源指向隔离/结构错误目标会阻断有效入口。

原路径、`.resource`、独立分析、失败实验、平台/版本差异继续保留。来源文档的结论不自动合并成主文事实；迁移资源需另外核对旧链接。有效 source 记录与人工 entity 分组是两层，不能用来源篇数宣称独立漏洞数量。

## 派生产物与检索

在仓库根执行 `python scripts/wiki.py build`：

| 产物 | 用途 |
|---|---|
| INDEX.md、INDEX/*.md | 兼容原分类路径，按显式产品分组的主入口及保留来源 |
| INDEX-CVE.md、INDEX-CVE/year/*.md | 仅明确主 CVE 导航，撤销/争议/未核角色排除 |
| INDEX-FOFA.md | FOFA / Hunter / Quake 分栏，保守语法检查通过的查询 |
| docs/generated/records.jsonl | 主入口元数据投影与 source_record_ids，不等同漏洞实体表 |
| docs/generated/sources.jsonl | 来源元数据、路径、SHA256、状态、来源URL、关联及指纹 |
| docs/generated/entities.jsonl | 仅人工 entity_id 分组，不自动推导 |
| docs/generated/excluded.jsonl | 排除路径、状态和阻断检查，供追溯而非有效搜索 |
| docs/generated/duplicate-candidates.json | 相同正文 / 相同主编号候选及待人工判断状态 |
| docs/generated/summary.json | 口径、输入内容摘要和问题分布 |

JSONL 是 UTF-8 每行一个对象，不复制全文和图片。阅读全文依 path 读取原 Markdown；正文按需搜索继续使用现有站点流程。输出排序固定、不写构建时间；生成 Markdown 只保留一个末尾换行，原正文不作此改写。旧索引页若不再适用，保留 URL 并导航回当前索引，避免继续展示失效数据。

`python scripts/wiki.py search CloudStack` 默认查主入口，可用 `--type analysis`、`--verification not-reproduced`、`--entity ENTITY-ID`。`--include-sources` 可查所有保留来源及完整版本/来源/指纹元数据。旧候选编号命中标为 `candidate-non-primary`，引用命中为 `reference-non-primary`；未进主 CVE 索引不代表编号不存在。

派生来源 URL 的 token/api_key 等凭据型查询值作中段星号遮罩，诊断不输出 URL userinfo/查询串。这不是全库秘密扫描，也不表示凭据已撤销。真实敏感样例仍需人工确认与正文中的最小范围遮罩。

## 离线校验与真实边界

- 检查元数据类型/枚举、主编号格式、唯一 id、canonical 目标/循环、相对资源
- sparse checkout 的资源只有同时存在 Git HEAD 且标记 skip-worktree 才可用树确认；普通工作树删除仍报错
- 网站根路径属于原站语境，按篇列待核和示例位置；不把所有抓取导航误报为仓库逃逸
- ref、verification_source 与正文明确来源区域的 URL 只算可追溯 `unverified-link`；不联网、不证明仍在线或支持结论
- 检查围栏空块/闭合，忽略围栏、行内代码及缩进代码中的 HTML 示例；活动脚本、真实 DOM 事件属性和活动 URL 列为候选，人工确认后应保留原字符串并展示为代码
- 不自动改 payload，不运行代码，不把图片路径存在当成已看像素或截图真实
- 指纹只是保守语法子集，支持字段比较、非空引号值/数字、括号、&&/||/!；复杂合法语法可能需人工扩展规则，不宣称平台全语法验证
- 轻量 Markdown/HTML 解析不是完整渲染器，复杂采集内容仍需审阅；语义、版本、来源真实性与实际复现均不由机器检查替代

## 质量基线不是质量通过

`python scripts/wiki.py check` 会因任何未解决问题返回非零。带 `--baseline docs/quality-baseline.json` 只允许已明确接受的历史非 fatal 债；仍输出全部错误/警告、残留数与新增/修复项。每项基线保留路径、问题、说明、出现次数和行号。

结构 fatal、活动 HTML 等 `FATAL_CODES` 永远阻断：baseline 命令拒绝把它们写入基线；即使已有或手改的基线包含相同问题，check 仍失败。不得通过重建基线把新增问题变成通过。修复后应审阅并缩减旧基线。

CI 只做离线单测、基线差异检查和生成一致性检查，上传完整质量报告，不自动创建或修改基线。生成成功不代表全文语义通过、外部事实已核对或漏洞已复现。
