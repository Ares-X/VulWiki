# 2026-10-03 第二轮：英文原始研究收录与来源覆盖

## 本轮结果

基点为最新核实的 `master`：`8f2a9e14575928bb5f086902c786da66f4a65aa9`。开始时开放 PR 只有 [#8](https://github.com/Ares-X/VulWiki/pull/8)，其六篇未重复、未覆盖。本轮在独立分支新增六篇多来源中文原创技术综述，五篇 `active`、Jellyfin 一篇 `needs-review`。六篇均是 `analysis` / `text-reviewed`；验证状态按现有 schema 如实保留。

本轮“多源检索”表示来源广度，不表示全网、全站或全部历史文章覆盖。观察约为 2026-10-03 04:09–04:30 UTC；候选以当年高质量知识缺口为主，没有把本次汇编时间冒充漏洞首次披露时间。英文文章没有确认可整篇翻译/转载的开放许可，因此采用原创综述、必要短引和固定链接，未逐句翻译整篇文章，也没有转载完整利用代码或截图。

## 新增内容与独立价值

| 主题 | 原研究日期 | 本轮新增价值与具体边界 |
|---|---|---|
| Jellyfin | 2026-06-02 | 两种参数入口、TryParse收口与最终Regex调用；媒体ID未认证获取条件在厂商/研究方说法中有差异，保留提醒 |
| graphql-ruby | 2026-08-08 | Execution::Next的异常状态误判、旧执行器对照、替代值回归；无已知CVE，以GHSA为主编号 |
| Goja/Nuclei | 2026-09-07 | 源/目标数组偏移错误；CVE对应扫描器宿主风险；3.10.0修补与3.11.0签名加固分开 |
| Linux OVS | 2026-09-17 | 三CVE分别对应借用、复制及clone状态；当前PoC为RECIRC变体；分支修复矩阵不一刀切 |
| Lean | 2026-09-09 | UAF引用计数与逻辑/运行时语义分两次修复；native_decide可信边界；保留rc版本身份，不制造CVE |
| Gogs | 2026-05-28，后续更新 | 最终补丁与PR提案差异；认证/仓库前提；模块留存token、仓库状态与清理边界 |

新增正文：
- [Jellyfin 多入口转码参数校验差异与FFmpeg参数注入（CVE-2026-35033）](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Jellyfin/Jellyfin%20%E5%A4%9A%E5%85%A5%E5%8F%A3%E8%BD%AC%E7%A0%81%E5%8F%82%E6%95%B0%E6%A0%A1%E9%AA%8C%E5%B7%AE%E5%BC%82%E4%B8%8EFFmpeg%E5%8F%82%E6%95%B0%E6%B3%A8%E5%85%A5%EF%BC%88CVE-2026-35033%EF%BC%89.md)
- [Goja TypedArray偏移复用与Nuclei扫描端代码执行（CVE-2026-76819）](../Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/Nuclei/Goja%20TypedArray%E5%81%8F%E7%A7%BB%E5%A4%8D%E7%94%A8%E4%B8%8ENuclei%E6%89%AB%E6%8F%8F%E7%AB%AF%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%EF%BC%88CVE-2026-76819%EF%BC%89.md)
- [Gogs Rebase参数注入的最终修补与公开模块副作用（CVE-2026-52806）](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Gogs/Gogs%20Rebase%E5%8F%82%E6%95%B0%E6%B3%A8%E5%85%A5%E7%9A%84%E6%9C%80%E7%BB%88%E4%BF%AE%E8%A1%A5%E4%B8%8E%E5%85%AC%E5%BC%80%E6%A8%A1%E5%9D%97%E5%89%AF%E4%BD%9C%E7%94%A8%EF%BC%88CVE-2026-52806%EF%BC%89.md)
- [Lean超大字符串切片的语义错配与引用计数缺陷](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Lean/Lean%E8%B6%85%E5%A4%A7%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%88%87%E7%89%87%E7%9A%84%E8%AF%AD%E4%B9%89%E9%94%99%E9%85%8D%E4%B8%8E%E5%BC%95%E7%94%A8%E8%AE%A1%E6%95%B0%E7%BC%BA%E9%99%B7.md)
- [graphql-ruby 授权异常被误判成功的执行器差异（GHSA-j7xr-4g94-r9h3）](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/graphql-ruby/graphql-ruby%20%E6%8E%88%E6%9D%83%E5%BC%82%E5%B8%B8%E8%A2%AB%E8%AF%AF%E5%88%A4%E6%88%90%E5%8A%9F%E7%9A%84%E6%89%A7%E8%A1%8C%E5%99%A8%E5%B7%AE%E5%BC%82%EF%BC%88GHSA-j7xr-4g94-r9h3%EF%BC%89.md)
- [Linux OVS共享页标记丢失与三处生命周期修复（CVE-2026-89487等）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E/Linux%20OVS%E5%85%B1%E4%BA%AB%E9%A1%B5%E6%A0%87%E8%AE%B0%E4%B8%A2%E5%A4%B1%E4%B8%8E%E4%B8%89%E5%A4%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%BF%AE%E5%A4%8D%EF%BC%88CVE-2026-89487%E7%AD%89%EF%BC%89.md)

## 实际访问的英文研究源

| 来源 | 本轮成功阅读 | 结果或后置理由 |
|---|---|---|
| [Sonar](https://www.sonarsource.com/blog/jellyfin-remote-code-execution/) | Jellyfin完整原文、厂商公告、固定补丁及版本 | 收录；原文All rights reserved，源码GPL许可不向文章传递 |
| [GitHub Security Lab](https://securitylab.github.com/advisories/GHSL-2026-152_graphql-ruby/) | graphql-ruby原文/公告/修补/CHANGELOG；另读Orchard CMS GHSL-2026-072 | 前者收录；Orchard缺陷在公开发行前修复，不能扩大为已发布版本漏洞 |
| [Assetnote / Searchlight Cyber](https://www.slcyber.io/research/out-of-bounds-out-of-sandbox-rce-goja) | 实际重定向后原文、原创PoC完整文本树、Goja及Nuclei补丁/公告 | 收录；一元素8字节单位纠偏；Zendesk范围不套用Nuclei版本 |
| [Doyensec](https://blog.doyensec.com/2026/09/17/ovs.html) | OVS原文、原创PoC文本、三补丁/CNA、发行版页面 | 收录；附带二进制未分析，不将源码结论推广到它 |
| [Trail of Bits](https://blog.trailofbits.com/2026/09/09/a-proof-of-fermats-last-theorem-that-fits-the-margin/) | Lean原文/issue/两补丁/rc发行/官方验证文档；另读8月25日state-divergence文章 | Lean收录；另一文章未完成补丁互核，后置 |
| [Rapid7](https://www.rapid7.com/blog/post/ve-authenticated-rce-via-argument-injection-gogs-unfixed/) | Gogs原文/公告/发行/最终补丁/完整原始模块及后续差异；N-central原文 | Gogs收录；不沿用NOT FIXED旧标题。N-central两漏洞未完成厂商深核，后置 |
| [PortSwigger](https://portswigger.net/research/the-fragile-lock) | The Fragile Lock原文、两份Ruby-SAML公告及固定补丁；What's in a tag name?原文 | 前者未完成工具/依赖审阅，后置；后者为技巧研究，未强造产品漏洞实体 |
| [Project Zero](https://projectzero.google/2026/09/windows-dangling-com.html) | Dangling COM原文；另读memory access tracing竞态方法文 | CVE-2026-66804已有对应正文，去重新建；方法文未延伸 |
| [watchTowr](https://labs.watchtowr.com/is-this-a-joke-in-the-auth-header-f5-big-ip-unauth-heap-overflow-to-rce-cve-2026-94127/) | F5 94127原文 | 基线已有两篇；上一轮NetScaler也在PR#8，均不重复 |
| [Synacktiv](https://www.synacktiv.com/en/publications/caught-in-the-octopus-trap-unauthenticated-rce-in-argo-cd-with-codeql) | Argo CD原文可读，2026-07-01 Hugo Vincent | 本轮优先级后置，未完成审查；演示password是否实验值未作真实泄露结论，原源未改动 |
| [ZDI](https://www.zerodayinitiative.com/blog/2026/9/23/cve-2024-0244-a-heap-buffer-overflow-in-the-canon-mf753cdw-printer) | Canon CVE-2024-0244长文，2026-09-23 Connor Ford | 2024漏洞的新研究，作者部分根因是推断；截图、固件逐型号互核未完成，后置 |

### 明确失败或替代路线

- OVS 三个 lore.kernel.org 公告请求返回403；改读 Linux CVE 官方固定镜像、CNA JSON和上游补丁，未声称lore正文访问成功
- graphql-ruby v2.6.6 GitHub Releases endpoint返回404；改由tag解析和固定CHANGELOG核实版本。`LICENSE`路径404后，通过目录找到并成功读取`MIT-LICENSE`
- 只读源访问与字段核对不代表遍历整个上游仓库；每篇固定文件审阅范围及未覆盖依赖见[静态审查记录](reviews/20261003-english-research/source-review.json)

## 中文上游的增量补漏

没有重新抓取所有README中文来源。先读上一轮覆盖/排除记录，随后在约04:27 UTC对三个活跃GitHub上游请求 `since=2026-10-03T03:18:11Z` 至实际请求时的提交：

- `SourByte05/Vulnerability-Wiki-PoC`：该窄窗口0提交
- `Mr-xn/Penetration_Testing_POC`：该窄窗口0提交
- `gelusus/wxvl`：新增提交 [0168b10453bbf7bc2040b08c3aa79991f253a2d0](https://github.com/gelusus/wxvl/commit/0168b10453bbf7bc2040b08c3aa79991f253a2d0)，04:02:23 UTC；读取完整5文件清单及3篇候选正文差异

wxvl的Next.js CVE-2026-94545在库内已有ImageResponse文章，不新增重复条目。GitLab AI Gateway CVE-2026-90970目前这份材料主要转述公告，缺具体实现/补丁链；DevKit Pro CVE-2026-14378稿含根因叙述但没有一手链接，检测命令还被排版拆开。两者保留候选，未完成一手源码/作者核查，未为数量纳入本轮。资讯汇总不当独立技术分析。这些取舍不是宣称漏洞不存在或材料恶意，也没有把未观察的中文源写成无更新。

## 真实性、静态安全与保真

所选研究均回溯原作者、厂商/维护者公告和固定源码，版本及研究日期分列。静态反投毒检查聚焦与研究无关的秘密收集/外传、下载执行、启动项/持久化、混淆与脚本/工作流/依赖。对利用所需的文件修改、内存写、token创建、shell及回连按实际用途记录，不凭编码或威胁能力推定作者恶意。

未执行候选PoC、载荷、漏洞验证、依赖安装、容器、扫描或示例目标请求。只执行已读过的本库离线文档单测、质量检查、索引生成及静态Markdown渲染。没有脱敏、截断值、覆盖值或删改旧正文；原源与必要引文之外补充译注和精度说明。

## 质量检查与交付

基点有5654个内容Markdown、5196条历史warning、0 error/fatal。本轮增加6个主入口、6个主CVE编号；Lean无CVE、graphql-ruby只用GHSA。baseline、脚本、工作流、既有正文与资源均不修改。

本轮本地结果见[验证结果](reviews/20261003-english-research/validation.json)和[文章哈希清单](reviews/20261003-english-research/article-manifest.json)。带baseline通过只代表没有新增质量债；严格全库check仍因历史warning返回非零。草稿PR保持不merge，远端head与该提交CI终态以PR交付记录为准。

六篇已完成Pandoc离线HTML渲染，185处代码元素和2个围栏正文与渲染可复制文本逐项一致，无活动HTML或嵌入图片。独立只读复核未发现实质错误或阻断。额外Chromium像素检查在加载前因 `socket() failed: Operation not permitted` 失败，未宣称浏览器截图验收。
