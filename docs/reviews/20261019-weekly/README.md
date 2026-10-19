# 2026-10-19 周维护：覆盖与未完成项

基线 master `34eea13f87b846498780ebc83b350d32800506a7`；检查窗口自 2026-10-11 重叠起算。10 月 13 日 PR #28 只代表其 10 篇新增和 AnyDesk 更新的审阅，不作为全部来源成功检查的截止点。已先读 AGENTS.md、CONTRIBUTING.md、CONTENT-SCHEMA.md、README 来源、10 月 12 日台账及 PR #28 修订记录。开始时开放 PR 列表为空。

本记录合并当日各来源检查结果及恢复后核验。路径清单、标题和提交比对不是正文全读；下列未完成项不会被“新增文章成功”覆盖。旧批次已停止或访问被拒绝的范围未重新执行。未因文章质量或授权范围不明而删改原文。

## 优先上游逐源覆盖

| 上游 | 当前检查结果与边界 |
|---|---|
| wy876/POC | 404，不判断为无更新或确认删除 |
| DMW11525708/wiki | head `2e97a3a15827b8daa45b4fa9f437bcf13cbc41fc`，相对历史检查无新增提交 |
| cvi-Qing/poc | head `8f7611d46a8e90cb69b40671f55ee6f7336b557d`，无新增提交 |
| SourByte05/Vulnerability-Wiki-PoC | head `5d8a80f483029ce800ad01de94ce5d43d799f377`；2 个提交、28 个路径、12 篇正文已读。请求材料存在，但产品版本/厂商证据不足；Atlassian 21589 已有重复候选，CRMEB 所称文件读取实际为 loopback SSRF 路径，暂不新增正文 |
| Threekiii/Vulnerability-Wiki | head `b32b83c01eabac4d6b4b334852be9cff76ba67ee`，无新增提交 |
| Threekiii/Awesome-POC | head `0f9e22b660cb1ea12c1c3668f9128d93e08da412`，无新增提交 |
| BaizeSec/bylibrary | head `dee1fbaa831df860c6905f80de8700211ba63098`，无新增提交 |
| Mr-xn/Penetration_Testing_POC | head `f33600e512f2ff654ec335102daf23b8a5218d24`；21 个基线后提交、206 路径。204 篇新增 IoT 文档和 23 个新增外链正文未读，不称为全文审阅 |
| MrWQ/vulnerability-paper | head `fcbdb421b62aef6ccac59a1887d94687f4faf9d6`，无新增提交 |
| lal0ne/vulnerability | head `5b9f397c1970203b1764fb7a66a0ffac39bef4cc`，无新增提交 |
| vulhub/vulhub | head `9b90d4276f84feed6333286afeb7e1250379a1da`；1 个提交、9 路径、7 个新增。GitLab 97229 具体 Python 实现、README、Compose、初始化 Ruby 已读，原作者全部三文件另行全文审计；镜像二进制未审计 |
| gelusus/wxvl | head `59b51e8d9a3ffe28c04f535e457a178c89288f0d`；15 个提交、230 路径、226 篇新增正文，仅 7 篇已读，219 篇未读。GitLab 线索归并原作者/Vulhub；Langflow、Wukong、glances 尚未完成对应关系核验 |
| wiki.0-sec.org | 访问失败 |
| 先知 | 索引可读，glibc 92923 新线索正文为空，feed 获取失败，不能按标题收录 |
| 跳跳糖 | 502，未覆盖正文 |
| Seebug | 访问失败，未覆盖正文 |
| 安全客 | 10 月 12 日 316231、316225 两篇事件文章已读，未提供本任务要求的具体触发材料；另一个 AI 条目仅读标题 |
| Y4er Blog | 可见索引最新为 2023-10-26，索引缓存约两周，不能保证近期修改无遗漏 |

上述 GitHub 优先源提交清单均少于 100 条、compare 路径少于 300 条，未见该范围 API 截断；未见净删除/重命名。这里的“无新增提交”仅指对应 head 的历史比对，不声称所有旧文重新全文审读，也不保证外链未发生静默修改。

## 补充源与原作者

| 来源 | 覆盖 / 限制 |
|---|---|
| nomi-sec/PoC-in-GitHub | 64 个 dated 提交（恢复记录未保存日期查询边界），56 个基线后；28 个非 README 提交，35 页解决 1,075 个 touched paths 清单截断。属于候选清单覆盖，未全读这些外链；历史停止项不重试 |
| trickest/cve | 6 个 dated 提交（日期查询边界未独立确认），5 个基线后；37 页解决 3,386 路径清单截断。尚未全读外链，不按同 CVE 删除互补材料 |
| projectdiscovery/nuclei-templates | 264 个 dated 提交（恢复记录未保存日期查询边界）、3 页；305 个基线后提交包含旧时间合并提交。compare 的 300 路径上限仍未解决，明确为未完整覆盖；历史停止批次不重放 |
| rapid7/metasploit-framework | 20 个 dated 提交（日期查询边界未独立确认）、66 个基线后、38 路径清单完整；4gaBoards 53959、OpenCTI 27960/39980、Grafana 2024-9264 的三组模块与文档曾读，但本次未形成完整固定源码、官方版本、去重证据包，不据此新增正文 |
| Exploit-DB | 官方 GitLab head `12879ca774a9d7543907d24a7bc1cebb47959afe`（10 月 2 日）与基线相同，10 月 11 日起提交 API 第一页为空；仅此新时间窗口，无历史正文重读 |
| PortSwigger | 可见研究索引最新 10 月 6 日；未证明每篇无静默修订 |
| watchTowr | 可见索引最新 10 月 9 日；未证明每篇无静默修订 |
| Project Zero | 可见索引最新 10 月 6 日；未证明每篇无静默修订 |
| 公开 X/Twitter | PortSwiggerRes、watchtowrcyber 页面读取失败，无专用全量接入，不宣称全量跟踪 |
| Rapid7 GitLab | 固定原作者 tree 三文件全文静态审计，GitLab 官方补丁公告核对；研究博客此次获取失败，未依赖其未读内容 |
| Doyensec SFAPE | 10 月 13 日新研究，既有 9 月修复；技术正文、具体重复 Initialize 触发、Microsoft CNA 与 KB 已核对，新增原创综述，详见 sfape-source-audit.md |

补充源的当前固定 head 与恢复清单复核见同目录 supplementary-source-coverage-20261019.md/json；日期查询边界未完整保存，因此不能把清单数作为全部窗口的逐文件审计成果。这些缺口留待后续，不能推进“全部来源已成功检查”检查点。

## 待查而非正文

- Zimbra：10 月 14 日 tracker 首发，73571 对应 10.1.17、10631/50055 对应 10.1.20、93635/93637 未见公开修复；未完成固定代码审计，暂留线索：https://github.com/jburgess-r7/zimbra-vulnerability-tracker
- Adobe AEM：Searchlight 10 月 15 日 VULN-34973/34975/34976/34977 有具体链条，CVE、受影响及修复版本、厂商对应仍缺：https://www.slcyber.io/research/more-critical-bugs-in-adobe-experience-manager-pre-auth-rce
- WebAlliance 108065：Rapid7 10 月 14 日请求的 GetUser/sUserID 与 GetCustomer/sCustID 对应存在冲突，版本边界不明：https://www.rapid7.com/blog/post/ve-unauthenticated-sql-injection-in-channel-software-weballiance-ecommerce/
- Flowise：Sonar 10 月 14 日研究的 OAuth callback HTML 注入，有 HTML 示例；全局 sanitizer 会清除 JavaScript，不能直接写成 XSS/RCE。修复提交 917e02eb36736fcbfaa4bef9342e217c5d4a9840，发布日期与版本仍待核：https://www.sonarsource.com/blog/sonars-new-js-ts-engine/
- Trail of Bits 包完整性调查、ZDI 补丁综述、Synacktiv 工具比较与 Ivanti 104935 预警，不满足本次独立具体触发材料对应门槛，未作为新增漏洞正文

## GitLab 收录与静态审计依据

新增稿采用原创中文综述和固定来源链接；未复制许可不明的原作者完整 PoC。全库三类正文和生成来源索引精确搜索 `CVE-2026-97229` 未命中已有正文；纯数字片段搜索的 StreamPipes/Chrome 命中与本漏洞无关。

原作者固定提交 `3ffd4ca6b969eb22eb2800d6f6bb860e8766d165` 的 recursive tree 未截断，只有 `.gitignore`（23 字节）、`README.md`（4,910 字节）、`poc.py`（9,592 字节），全部已读。没有安装脚本、工作流、依赖清单、二进制或 LICENSE。脚本存在操作者指定的输出回传，未见与利用流程无关的固定外传地址、遥测或持久化；这不构成安全认证。回调暴露、请求长度、Git 凭据参数、远端分支残留、Puma 崩溃等风险已写入正文。

Vulhub 脚本注释宣称固定命令，但实现接受自定义 `-c/--command`，正文保留并解释该差异。PoC 完整流程的项目推送前提与最后匿名 lint 请求分开，不将官方 PR:N 直接等同无账号完成全链。

本次没有执行 PoC、安装其依赖、动态复现或扫描。没有改动历史正文、质量基线或已完成修复。文档检查结果及最终新增数量将在同目录结果文件记录。
