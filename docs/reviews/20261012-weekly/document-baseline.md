## 基点文档检查（2026-10-12）

固定基点：`8291608013efb898ce75b267bf13134c7ab68389`。全部 5,862 篇原文的路径、字节数和 SHA-256 已记录；Python 前后清单一致，Node 渲染/图片清单记录的 SHA 也与基点一致。

- Python 单测：96/96 通过
- Node 单测：44/44 通过，使用已有 Node 24.19.0、Marked 17.0.5，没有安装依赖
- 质量基线：0 错误、0 fatal、0 新问题；仍有 4,093 项历史警告，相对现有 baseline 已解决 1,049 项。不是全库质量零缺陷
- 索引一致性：`build --check` 无差异，检查过程未写索引或 baseline
- 静态渲染：5,862 篇，0 结构阻断，15 篇有 33 个待判读候选
- 图片 token：24,920 个 Markdown 图片 = 24,892 个已定位源码跨度 + 28 个明确未定位项，数量对账一致；另有 20 个 HTML 图片和 483 个图片包裹链接
- 本地资源检查退出 1：稀疏工作树未检出 20,347 个引用图片路径。这些路径全部存在于 HEAD 且标记 skip-worktree，并非据此确认仓库缺图。19,101 个不同资源 blob 仅 27 个已缓存，19,074 个不可用；禁用 Git lazy fetch，没有下载或展开资源。因此未完成资源字节签名、解码与像素验收

历史警告构成：source_missing 3,828；unrecognized_identifier_namespace 86；site_relative_link 80；fingerprint_unverified 45；identifier_inactive 26；noncontent_link_candidate 24；identifier_role_unknown 2；path_legacy 2。

渲染候选构成：html_markdown_boundary 12；bare_image_filename 9；lost_markdown_link_literal 4；unknown_html_literal 4；unfenced_source 3；code_web_controls 1。候选包含潜在误报，未把机器命中称为确认缺陷。

本轮仅运行经检查的离线文档工具和临时测试夹具，未执行文章、PoC、扫描器或载荷，未访问示例目标，未修改正文或执行脱敏。基点检查与后续新增文章的最终验收分别记录；不把机器扫描称为全文人工审阅、外部事实核验、浏览器显示验证或漏洞复现。
