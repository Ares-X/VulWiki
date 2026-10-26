# PR #32 最终文档检查与验收（2026-10-26）

基线 master `dcf0607b87f46653d43aa0420de577f440d5aaae`；原始输入 `a29de54d9b94824b9d52a52a6931a632bc8fa373` 为 5 篇新增、2 篇补充。复核补入 piflow 分析，最终 **6 篇新增、2 篇既有更新**。路径及最终字节摘要见 [changed-articles.json](changed-articles.json)。

## 实际通过

- 预装 Python 3.12.14：96 项单测通过。最初误用 macOS Python 3.9.6 时，5 项因不支持 `Path.write_text(newline=...)` 报错；改用符合项目 Python 3.10+ 要求的既有运行时后通过，没有修改工具或测试来掩盖错误。
- Node 26.5.0：44 项渲染/图片清单单测通过；没有安装新依赖。
- 基线质量检查：6044 文档，errors 0、fatal 0、new_issues 0；仍有 4093 条历史警告，baseline 未改。
- 索引重建并通过 `build --check`，无 different_files；5944 个主入口、6042 份可检索来源、2 个排除项、3736 个主 CVE。来源文件数不等于独立漏洞数量。
- 最终 8 篇正文经本机已安装的 Marked 4.3.0 离线解析，候选 0；4 个代码块的 HTMLParser 提取文本与 token 按默认末尾换行规则一致，见 [copy-fidelity.json](copy-fidelity.json)。没有执行 HTML 或文章代码。
- 两篇既有 LiteLLM 文章的基线字节完整作为前缀保留；原 PR 七篇的代码块原始字节与 URL 未变。见 [append-fidelity.json](append-fidelity.json) 及 [pr32-fidelity.json](pr32-fidelity.json)。
- 新增 PNG 实际查看像素，与原站重新取得的字节完全相同；570×340、15435 bytes，SHA-256 `369e47acf17da21cd509d03654aaf498e0bb4137149cbcc6d6e707a8e85feaed`，本地引用。原图已有占位符保留，没有编辑图片或脱敏。
- 7 份相关官方 CNA JSON 均取得，状态 PUBLISHED。LiteLLM 59823 明确引用对应 GHSA，保留主编号；35029 与 59823 的修复版本分别核对。CNA 身份对应不等于实际请求成功认证。
- piflow 固定 18 个文件的 Git blob/字节数全部匹配；原 SHA-256 均有误，按下载原始字节重算并保留 previous_sha256。哈希核对与全文/选段阅读范围分开。
- 两组覆盖原始七篇的独立审阅，另一组对 piflow 新分析、18 文件哈希及两处文字修正独立验收，结论 PASS_WITH_SCOPE_LIMITS。

## 资源与范围边界

正式完整检出的实际资源扫描：missing、zero_byte、html_error_page、remote_images、unusable_image_tags、external_image_dependencies 均为 0；recognized_container 20337，unknown 32，extension_mismatch 38。后两项保留历史分类，不冒充逐像素全库验收。

原始作者在稀疏环境报告 20368 个资源未检出，并用 Marked 17.0.5 做过全库解析。这是原输入环境记录；当前最终解析覆盖 8 篇受影响文章，不声称本次重新阅读全文或视觉验收全库。未读来源、图片、外链及 Nuclei 截断等缺口继续保留在逐源台账。

没有执行 PoC、扫描、文章命令、HTML、安装其依赖、拉取容器或访问示例目标；没有动态复现要求。没有新建完整源码、图片、网站副本或 Codex 工作树。独立审阅共享正式源码，原有其他任务的脏文件保持原样。小体积文本和压缩日志保留；远端最终 head、CI、合并与在线发布分别确认，不把本地检查等同已部署。
