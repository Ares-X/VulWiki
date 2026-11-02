# 2026-11-02 第三批：有界积压与待查补证

起点：master `09fb76eca271fb9419cbbc92c527616f8bc2d6a3`；复用草稿 PR #37，原 head `8642245b0d5d01d1c1f0c7f1c2a55bf9bcb0d411`，不覆盖既有内容、不合并、不发布网站。

## 本批结果

新增 6 篇原创中文整理：Pillow EPS CVE-2026-112900、Pillow FPX CVE-2026-112398、Ruby Onigmo CVE-2026-110264、PentestCode issues 21/22、LocalAI CVE-2026-59707、CyberStrikeAI result 回传写入。每项均以公开具体触发材料及固定源码对应逻辑准入，不用 analysis 分类降低门槛；正文链接原始完整材料，未复制长篇许可不明文章。

wxvl 固定 `0ca04cb9e2986ac80a58dfd004051d9eeebeb025` 的最近尚未读完整提交日 2026-10-24，共 33 篇可见正文逐篇分流。触碰提交日不等于披露日。详见 wxvl-coverage-33.json；积压从 400 降为 367，剩余清单单列。原始 HTML 样式未逐标签审读，图片未读取；不宣称全仓或所有上游完成本日刷新。

## 重要证据限制

- LocalAI 的 CNA Patch Commit 实为受影响测试构建；真实修复为 2cbb3c96，v4.6.0 包含修复，v4.5.6 仍缺 guard，不能将 CNA <=4.3.1 当作完整安全边界。它是历史补档，不冒充新披露。DNS-only nuclei 模板不能据命中区分补丁。
- CyberStrikeAI 需要有效 listener token、真实 task_id 及落盘权限。ok 响应不证明落盘。仅核对 v1.7.11 与 v1.7.24，不猜最早修复。原资料两张截图含可能有效的实验 listener token，整张图片发布暂停；没有修改原文或复制该值，位置和依据见 cyber-image-publication-hold.json。独立正文保留原有 <TOKEN> 字面占位，不猜补。
- Pillow EPS 项目 Moderate 与聚合 Critical 存在评分差异；FPX 的固定无 ASLR 环境不等于默认通用 RCE，生成器默认哨兵不是 system。两项不能映射给相邻 CVE。
- Ruby 公开 PoC 是本地编译/匹配崩溃，不是 GitLab 远程 RCE；官方 10-23 Ruby 修复已取代原 PoC README 的旧修复状态。
- PentestCode 附件读取 Cache miss；准入依据为原 issue 公开手动工具步骤、注入字符串与固定源码，不推荐未读附件。plan 仅生成命令，执行需要后续 shell；报告输出有固定结构。
- PHP2ShellPOC2026 Ruby 分片静审受平台限制未完成，保持 HOLD_STATIC_REVIEW_BLOCKED，未重试或换路径审阅，不作为新增可信 EXP。GPU 候选固定树审阅未完成，继续 HOLD。Cloudflare 材料属于 2018 旧研究。

## 静态审阅与质量

没有执行利用、安装其依赖、扫描目标或运行外部工作流。各篇正文和分项台账列出安装、依赖、工作流已读范围及缺口；静态审阅不是安全认证。公开 review 不含私聊、凭据、长篇原文 bundle 或被暂停截图。既有正文以本批开始时 6066 个 Markdown 哈希校验；质量检查与远端 CI 终态由 PR 回执记录。
