# 本地验收与远端验收边界

基线 `104c9204d56d0a4f2cbe51fe3b4a95683007703a`；Python 3.12.14、Node v24.22.1，已有 Marked 17.0.5。未安装 PoC 依赖或执行其代码。

| 检查 | 实际结果 |
|---|---|
| Python 文档单测 | 96 项通过 |
| Node 文档单测 | 44 项通过 |
| 文档质量 | 6050 篇；errors/fatal/new 均 0，历史 warnings 4093 |
| 索引生成及 --check | 均退出 0；脚本与 baseline 未变 |
| 惰性离线渲染审计 | 6051 个 Markdown（含资源说明）；结构失败 0，33 个既有候选；本次正文无候选 |
| 代码复制文本 | 7 篇、3 个围栏块；解析后的 code 文本逐字符一致，不执行 DOM/脚本 |
| 既有正文保留 | 6044 篇基线中仅 GitLab 追加，其原始 6417 字节前缀完整；其余 6043 篇 SHA-256 不变 |
| git diff --check | 通过 |
| 本地资源审计 | 退出 1：稀疏工作树缺少 20369 个资源；zero_byte/html/remote_images/unusable_tags/external_dependencies 均 0。不是完整资源通过 |

文章哈希见 [changed-articles.json](changed-articles.json)，复制验收见 [copy-fidelity.json](copy-fidelity.json)。全部检查只读取文档、生成索引及审计结果，不向文中目标发请求。源文全文与压缩包仅用于静态研究，不作为本 PR 附件。

最终远端 head、草稿状态及完整 checkout 的适用 CI 结果在 PR 描述及本轮私聊交付中列明；本文件不把待运行 CI 当作已通过。
