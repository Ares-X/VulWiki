# VulWiki 目录、检索与关系保真专项（只读）

范围：按仓库根 `AGENTS.md`、`CONTRIBUTING.md`、`docs/CONTENT-SCHEMA.md` 核对；只读检查生成器、生成记录、索引和博客 catalog/search 消费端。未访问网络，未运行文章代码、载荷、HTML 或示例目标；未改仓库。开始时 `git status --short` 仅见既有未跟踪 `.serena/`。

## 覆盖与保真结果

- 内容扫描 5654 篇；派生投影有 5509 个主入口、5603 份有效来源、51 份排除文档。records 的 `source_record_ids` 去重后正好覆盖 5603 个 sources ID；Hexo `buildWikiData()` 检查 ID 唯一、source hash、记录覆盖及正文摘要，实际构造 5509 篇浏览器文档、5509 段全文、94 条 canonical 路由，均通过。
- 94 个 `duplicate_of` 来源全部折叠到主入口；其中 85 个主入口含至少一份关联来源。生成的 `INDEX/*.md` 链接覆盖 5603/5603 来源；`docs/REVIEW-QUEUE.md` 覆盖 51/51 排除项（50 quarantined、1 rejected）。独立分析和未确认实体没有被自动折叠的迹象。
- 主编号导航预期与实际均为 3143 个不同 CVE，缺失 0、多出 0；INDEX-CVE 的入口规则与字段说明一致。
- 来源元数据含 566 条可用 FOFA/Hunter 指纹记录（378 FOFA、188 Hunter；另有 Quake 0），FOFA/Hunter 两两去重后 266 个平台/表达式值。对全部 266 个值逐字比较，INDEX-FOFA 无缺项。长查询样本完整保留引号、括号/逻辑连接符和内层转义引号，见下文证据。
- `python3 scripts/wiki.py build --check` 只读结果：`different_files: []`，扫描 5654 篇、0 errors、0 fatal、5196 warnings。此结果只证明派生产物一致；未将 warnings 当成质量通过。

## 确认的问题：浏览器检索丢失候选/引用角色标签

`docs/generated/records.jsonl` 与 `sources.jsonl` 保留三个独立字段，命令行 `wiki.py search` 还会标出 `primary`、`candidate-non-primary`、`reference-non-primary`。但博客投影把关联来源的候选编号和引用编号合并成一个无标签的 `related` 字符串；worker 只索引这串文本；目录结果只显示主编号，因此用户以引用 CVE 搜索命中时，结果卡片不能说明命中的是引用编号，且会突出显示另一主编号。

复核样本：`Web安全/AI应用/OpenAI/OpenAI大语言模型漏洞挖掘.md`，SHA-256 `0950281e5eb9972daae92212ee89f8b33cac179d443da3dc4b5cad593b2675a5`。frontmatter 第 11–13 行分别为主 `CVE-2025-37899`、引用 `CVE-2025-37778`、旧字段角色 `primary`；records 第 262 行及 sources 第 278 行分别保留主/引用数组。Hexo 投影 `/Users/aresx/Ares-X.github.io/scripts/wiki-data.js:92-97` 在第 96 行将 source candidates/references 展平到 `related`，没有标签；`/Users/aresx/Ares-X.github.io/source/wiki/wiki-search-worker.js:5-8` 把 related 当一般文本搜索；`/Users/aresx/Ares-X.github.io/source/wiki/wiki-catalog.js:100-109` 的结果仅在第 107 行显示 `主编号：` 后的主 CVE，不显示候选/引用命中。

最小建议：catalog 保留 `candidateIdentifiers` 和 `referencedIdentifiers` 两个独立数组（主入口及相关来源都保留来源 ID/角色）；worker 返回实际命中的标识及角色；结果卡片标“引用编号”/“候选编号”。不要改动 records/sources 的原字段和正文。命令行和 JSONL 现状正常。

## 确认的分类错位实例与范围

**DedeCMSV6/通天星 CMSV6**：正文路径为 `Web安全/CMS内容/DedeCMS/DedeCMSV6-0-3 代码审计 - 先知社区.md`，SHA-256 `cee865019919289bd3207fc89cdee6af344b728f92e0a9827ab6fa334fe75105`。frontmatter 第 3 行产品为“通天星 CMSV6 车载视频监控平台”，第 12 行明确 `category_recommendation: "IOT安全/其他设备"`；第 15、25 行明确解释它是车载监控行业平台、不是通用内容管理系统。派生 `INDEX/CMS内容.md:2426` 仍把它列在 CMS 内容目录。`docs/generated/records.jsonl:345` 保留产品，但没有分类建议；`sources.jsonl:361` 保留建议。该文件没有相邻 `.resource/` 目录。

最小建议：将此单篇迁到 `IOT安全/其他设备/` 的适当产品目录，检查正文相对链接、引用和旧路径入口后重建派生索引；不要因标题含 DedeCMS 而合并到 DedeCMS 实体。字段说明明确 `category_recommendation` 是人工建议、构建器不迁目录，且移动时须检查图片/历史链接，所以这属于待应用的内容分类校正，不是 generator 对既定语义的违约。

**Linux ksmbd/AI 标题**：`Web安全/AI应用/OpenAI/OpenAI大语言模型漏洞挖掘.md` 的 frontmatter 第 5 行产品为 `Linux ksmbd`，第 14 行另留 `category: "系统安全/Linux"`；正文第 28 行说 OpenAI 是发现问题的工具、受影响组件是 Linux ksmbd。生成记录第 262 行和 `INDEX/AI应用.md:60` 仍按物理旧路径把它放在 AI应用。与上述一样，建议用标准分类字段并迁移到 Linux 分类，同时保留旧路由；是否继续以来源主题作为目录入口需内容负责人决定。

数量级：166 个主/来源记录含 category_recommendation；其中 66 个主入口的建议使用 `Web安全/`、`系统安全/`、`IOT安全/` 路径样式，60 个的前两段与当前目录前两段不同（最大组 29 篇从 `Web安全/CMS内容` 建议至 `IOT安全/其他设备`）。这些是人工待处理建议统计，不能把所有行都自动判作错误，尤其有些建议值是 `OA / 通达`、`ERP / Dolibarr` 等产品分类表达。

## 查询字面值核对样本

`Web安全/商业软件/租赁管理系统 信息/租赁管理系统 信息泄露漏洞 CNVD-2025-03578.md` 第 20 行的完整表达式是：

`title="商业租赁管理系统" || body="Silverlight/install/Silverlight5.exe" || body="pageUrl = \"/loading.aspx\"" || body="竞优软件</a>"`

SHA-256 `d20e2b5a86aeb10b0732d59ad690ccf8c38845b3dfefbba62ecca9071e56807f`。`INDEX-FOFA.md:324` 显示同一表达式；派生 JSON 与 Hexo catalog 保留原查询串。检索索引将其呈现为 Markdown inline code，未发现截断或值替换。查询只通过静态语法子集审查，未向 FOFA 发请求、未验证精度。

## 不确定项与边界

- 分类建议是人工提示，不是“已批准迁移”的机器信号；除上述正文明确更正的示例外，不据字段做批量迁移。
- 51 条 excluded 有意不进入默认 product/CVE/fingerprint 搜索，按规则出现在 REVIEW-QUEUE；此处没有发现它们被错误混入索引。
- 文档全库 5196 warnings 中包含缺来源、待核指纹和格式/正文警告；本专项没有逐篇判断这些警告是否应被解决。

## 关键证据文件哈希

- `scripts/wiki.py`：`e47ecf1a9e4ddffd55c9ab51f837818903cb17600eb0ec7a4147605ccbb35844`
- `/Users/aresx/Ares-X.github.io/scripts/wiki-data.js`：`8f509e9bda284d3751bc0011b496e8bd9866538db6b5626012e0e436fea1495d`
- `/Users/aresx/Ares-X.github.io/source/wiki/wiki-search-worker.js`：`fdad699a74181f5bda8c314c1d995fc3cd382d7be419a5e12529b24fd9cec906`
- `/Users/aresx/Ares-X.github.io/source/wiki/wiki-catalog.js`：`8cc7e7934688250601163bccef008185cae22fb6b9d8450f03f634225b9970ce`
- `docs/generated/records.jsonl`：`d88ef1ec7be119976e0a46aa587790a7f0a5441d5280491b533f696c5165e3d5`
- `docs/generated/sources.jsonl`：`886fccbb772af79dbf25b15b37f8f7240e62460b839f900e8b2e75bf79a254bb`
- `INDEX/CMS内容.md`：`af6af9a55beec6ed8f431547046ac2ecfc24ef338531542ebc830971d864dfe0`
- `INDEX/FOFA` 实际文件 `INDEX-FOFA.md`：`b7c0c53bfbd0fc93afcd8b90ab9752d9bfda36cb1c2f33a044f05ca5de856975`
