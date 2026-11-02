# wxvl 历史积压有限复核（2026-11-02）

## 范围与计数

- 来源优先清单：Oct26 已保存 touched-paths，比较 `59b51e8d9a3ffe28c04f535e457a178c89288f0d` → `0ca04cb9e2986ac80a58dfd004051d9eeebeb025`。非本周新 head 增量。
- 454 个变更路径：1 个 data.json，453 个 Markdown（451 新增、2 修改）。未逐文重审 data.json。1 篇 Handlebars 按历史暂停范围不重开，其余 452 篇正文成功读取为资料缓存，无下载失败。镜像归档不是原作者来源替代品。
- **41 篇 Markdown 全文人工阅读，411 篇未全文人工阅读**。下载与机器 fence/image 分类不算人工审阅，外部图片和链接也不因正文已读而算已审。逐路径状态和 SHA256 见 `coverage.jsonl`，411 个未读路径逐行见 `unread-paths.txt`。未读项保持可继续状态，不能推断无 PoC 或无变化。
- 不重开 KEV/FrameVul 历史暂停，不推广 OrdaSoft/Handlebars/Quick.Cart/iperf3 历史待查项。没有执行代码、容器、安装依赖、发漏洞请求或修改原文。

## 有效新增

### Flyimg 1.12.2 webpm/tm 命令注入

YNsec 2026-10-23 归档全文可读；有具体 tm HTTP 请求与完整 data URI。固定官方 1.12.2 源码对应两个参数路径，并确认 webpm 早在 1.12.3（2026-07-27）修复，tm/路径引用在 1.12.11（2026-10-28）修复。原文章未反映此后发布情况。源码非零返回会抛异常，不能从文章展示的 500 错误断言后续第二个 sink 在同一请求必然执行。独立中文综述已提交父代理集成；不编造 CVE。

原始 API 工作证据保存在本轮研究目录的 `flyimg-evidence.json`，不作为全文转载附件；25 个源码/清单/工作流文件 blob 与 SHA256：`flyimg-static-audit.json`（区分 23 全文源码类、composer.lock 完整 JSON 元数据解析、LICENSE 许可身份）；请求字符保真：`flyimg-request-fidelity.json`。外部 action、基础镜像和传递依赖源码未审，不能称全项目安全认证。security-advisories API 返回 400 INVALID_ARGUMENT（端点不允许）；未规避重试。

## 逐项待查／排除

- `CVE-2026-21589  Atlassian多款产品未授权任意文件读取漏洞（POC）.md`：已有 Atlassian 多产品 Web 应用根目录文件读取文章，相同 watchTowr 来源和版本矩阵，本篇未增加实质互补证据，不重复收录。
- `友数聚CPAS审计管理系统V4 doDownLoadPicFile 任意文件读取漏洞.md`：请求主要在外链图片，图片未审、版本对应不足，待查而非宣称无 PoC。
- `畅捷通T+ GLSyncService.asmx 任意文件读取漏洞.md` 及 `畅捷通T+ GLSyncService.asmx接口存在任意文件读取漏洞  附POC.md`：同类镜像线索，图片请求未审，版本/触发材料待查。完整精确路径以 coverage.jsonl 为准，不下载推广付费工具。
- `金叶物联网大数据管理平台download接口存在任意文件读取漏洞  附POC.md`：正文有 win.ini GET，但版本与原作者/厂商对应不足，暂不收录。精确空格路径见台账。
- `Gemini-mcp-tool 命令注入漏洞深度分析（CVE-2026-0755）.md`：原 contribute.ts 是手动 CLI，后述 MCP git-workflow-helper.ts 是作者改造，不能混为默认远程漏洞；固定原始代码/CVE对应未完成，待查。
- `【漏洞预警】ILIAS 9.22 零权限 RCE： 无需任何账号，四步写入 webshell.md`：VE 编号不是 CVE，作者明确不公开完整 678-byte gadget，仅链路框架不足准入。与现有其他 ILIAS 链不自动合并。
- `一个隐藏了至少16年的无线WPS漏洞-WPSplinter,利用博通 WiFi 在 eCos 和 Linux 系统上的漏洞.md`：原作者代码 qkaiser/broadcom-wps 未完成固定源码审阅，仅文章原语不算完整准入；不背书武器化推测。
- `能信安：安全漏洞通报.md`：CVE-2023-108463 文字与 CVE-2026-108463 链接冲突，无具体材料，不扩散为确证条目。
- `关于双十一期间暂停授权测试及漏洞收录的通知.md`：同名文件现为中通 10 月 19 日至 11 月 14 日通知，不能把先前京东同名内容被覆盖解释为漏洞撤回。
- `AI加速网络漏洞挖掘与攻击利用，全球网络安全防护面临新挑战.md`、`AI 智能体跑了不到两个月，83 个漏洞攒在手里.md`：新闻/推广，无具体产品触发材料。

另外 28 篇短文的完整精确路径见 `shortread.json`（该文件共 29 项，含上文已计入的双十一通知）。均全文阅读，未作为准入：PHP/WordPress/Linux 等简短预警无具体触发材料；部分文章只是图片，图片未读；参数绑定文章是通用测试概念而非可对应产品/版本的漏洞；其余是讨论、新闻、通知或课程/网盘推广。没有因“PoC 已公开”标志就认定通过门槛，没有将这些文章的编号与产品声明升级为已核验事实。

## 剩余边界

411 篇正文未完全读，图片与外链未全读，旧积压不作无限扩展，本轮保留逐路径续查状态。当前窗口 wxvl 新 head 由 sibling 单独处理，勿将两套窗口数相加后表述为原作者去重漏洞总数。
