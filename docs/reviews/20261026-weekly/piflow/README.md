> **当前结论（2026-10-27）：暂缓正文收录。** 下方保留原始暂缓与 PR #32 收录复核的历史文字；后者已由文末本次纠错取代。原正文完整保存在 [待查原文档案](pending-original.md)，不进入三类正文及默认索引。

# piflow CVE-2026-109442：原始暂缓记录与收录复核

核对日期：2026-10-26。结论不是“未复现所以拒收”，而是**公开的具体实验没有跨过本漏洞所涉及的未认证网络边界**，尚未满足本轮明确要求的具体触发材料门槛。没有生成漏洞正文，也没有补写 HTTP 请求或自然语言提示词。

## 已有材料实际证明什么

- [Lasso 原作者页面](https://www.lasso.security/vulnerability-database/cve-2026-109442) 的 PoC 段列出 POST `/chat` 和 JSON `message`，但该值仍是提示词描述占位符，不是实际发出的完整消息。页面没有给出对应 HTTP 响应或该请求导致的 tool-call 记录。
- 同页称在本地提交 `817605d` 调用原样 `exec_shell` 做了 canary。公开的三个调用保持原值：

```python
exec_shell("id")
exec_shell("sh -c 'id; uname -a; whoami'")
exec_shell("sh -c 'echo LEAKED_LLM_API_KEY=$LLM_API_KEY'")
```

  作者记录第一项返回 `uid=501(noyp) gid=20(staff) ...`，第二项为 Darwin/arm64 主机信息及用户名，第三项回显继承的环境变量。这里的省略号来自来源本身，不补全。第三项读取环境秘密，不能当成无敏感访问的通用测试。上述调用证明宿主进程能力与环境继承，但直接调用产品预期的工具函数不能替代未认证 HTTP 利用证据。
- [VulnCheck CNA 公告](https://www.vulncheck.com/advisories/piflow-2.0.0-through-2.0.1-unauthenticated-rce-via-chat-agent-exec-shell) 日期为 2026-10-19，声明受影响 2.0.0–2.0.1，CWE-306，CVSS 4.0 为 9.3；它没有补充实际请求体。Lasso 的 9.8 分值与此不可混为同一评分。

## 固定源码核对

固定审阅提交为 `ad8d0108a54a4257307d4946dc9250e26f24c63f`，**不是已验证修复提交**，也不假设它与作者实验提交相同。

1. [server.py](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/server.py#L615) 的两个聊天端点未声明身份依赖；请求中的 user_id 由客户端填写。FastAPI 构造及中间件登记未见全局认证。
2. [runtime/chat_store.py](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/runtime/chat_store.py#L167) 的 ensure_thread_access 在无记录时使用提交的 user_id 建线程，已有线程只比较该值。这个检查不是请求者身份认证。聊天请求会写会话与消息、更新时间、产生日志，并可能调用收费模型，不能统称只读。
3. [runtime/engine.py](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/runtime/engine.py#L741) 将准备后的用户消息交给 agent.astream；[factory.py](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/agents/factory.py) 绑定 exec_shell，interrupt_on 没有它。模型是否实际调用工具仍依赖模型、提示及运行配置，静态链不能冒充实际调用记录。
4. [tools.py](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/agents/tools.py#L114) 把命令拆为 argv 后运行 subprocess，未使用 shell=True；单纯顶层分号不是自动 shell 拼接，但显式解释器参数不受允许列表约束。虚拟文件路径改写并非操作系统隔离。
5. 原生 server 启动绑定所有网卡；Docker 后端绑定 loopback，但 nginx 的 5174 端口无鉴权转发聊天请求且 compose 发布该端口。不能把 Docker 的 loopback 误判为网络不可达。实际外部网关和防火墙可能改变暴露条件。

缺认证与未隔离执行组合的根因成立，不能把“代理可以正常运行命令”本身称为漏洞。启动依赖可用数据库、模型配置/API key；本次没有安装、运行或向任何目标发送请求。

## 反投毒、许可、去重与恢复准入条件

`static-audit.json` 固定 18 个源码/部署/依赖文件及 Git blob、SHA-256、逐文件审读范围：4 个大文件为明确的选段审阅，不是整库全审。小型安装/打包脚本未见与功能无关的外传载荷；打包脚本有清理 staging/archive，Docker 有依赖安装与服务启动，均未执行。依赖锁内容、传递包、镜像、workspace 技能与附件不在审阅范围。

`license-review.json` 记录原站版权与产品根许可缺口。`evidence/` 是本地内部审阅副本，**不要将其作为可再分发源码或文章复制进主库**。没有完整翻译原作者文章。

主库 `dcf0607b87f46653d43aa0420de577f440d5aaae` 的三类正文以产品名、仓库名、CVE、DeepAgents、exec_shell 检索均零命中；docs/reviews 中的候选台账不是既有正文。未因编号未命中就忽略产品/根因去重。

恢复准入需要现有公开来源补充：实际发出的非占位聊天消息/请求，以及该未认证请求触发工具执行的对应证据，或等价的具体公开操作跨越认证边界。仅另一次直接调用 exec_shell、原理图、CVE 概述或重新声称“可远程执行”仍不满足。无需维护者自行复现，更不得为填补材料而发明 payload。


## PR #32 收录复核（2026-10-26）

以上暂缓结论是原始草稿的初筛记录，不作为项目新增收录门槛。CONTRIBUTING.md 允许独立原理、源码调用链作为 analysis，不要求每篇都有可直接执行的 PoC。已读 CNA 与固定源码支持可定位的技术主体，因此新增带具体证据缺口的 [piflow 分析](../../../../Web安全/AI应用/piflow/piflow%20聊天入口缺少认证与宿主命令工具调用链（CVE-2026-109442）.md)，仍明确没有公开的完整网络请求/执行对应记录和已确认修复版本。没有改写或删除上述 canary、占位符及限制，也不补做动态实验。

重新取得固定提交的 18 个文件，全部 Git blob 与字节数匹配；原台账的 18 个 SHA-256 均不匹配原始文件，已用实际下载字节重算，旧值保存在 static-audit.json 的 previous_sha256，不将其误称为来源文件变化。哈希核对不扩大原始逐文件阅读范围。没有将内部源码副本发布进主库。


## 准入纠错（2026-10-27）

PR #32 在 `653362e2dc305c8006d03a326580b8c0df3a6505` 以 `analysis` 例外收录了本项，但本轮明确授权要求每篇都有与产品、版本、前提准确对应的公开具体 PoC/EXP、实际验证代码、请求或操作步骤；`analysis` 和 `needs-review` 均不能豁免。上述宽松规则不能替代本轮更严格门槛，因此当前恢复 `HOLD_CONCRETE_SECURITY_BOUNDARY_TRIGGER_NOT_PUBLISHED`。原复核文字、18 文件修正后的 SHA-256、`previous_sha256` 和许可记录全部保留。

缺口是原正文第 39 行所述 HTTP 消息仍为占位描述，第 44–46 行是直接 `exec_shell` 调用，第 49 行明确它们不能证明匿名 HTTP 请求触发工具；不是因为本项目没有执行复现。可恢复的材料为非占位的实际聊天请求及对应工具执行证据，或等价的具体公开跨认证边界操作。不要猜补请求，也不把 CVE 公告或静态调用链当作该材料。此决定不否认 CVE 分配、已有源码分析或原作者实验，不对作者作恶意判断，也不更改其他文章的准入结论。

### 原文完整性、路径与索引

- 从当前 master `a4d6ef19733c9376500c175ebc6e0f531b504de2` 的 `Web安全/AI应用/piflow/piflow 聊天入口缺少认证与宿主命令工具调用链（CVE-2026-109442）.md` 完整移至 [pending-original.md](pending-original.md)，6084 字节，SHA-256 `613e442a675a52038d9f7336fb0cd98fd4ba841c268b8b76ec1a78ef42b47764`；没有改写正文、元数据、标识符、示例、URL 或原占位符。
- 档案中的 `content_status: "needs-review"` 等字段是当时正文原值，不是当前收录状态。档案位于 `docs/reviews/`，不在生成器读取的 `Web安全/`、`系统安全/`、`IOT安全/` 根目录内；重新生成默认产品/CVE/搜索派生索引后不再包含本项。
- 为保持逐字节保真，没有改写档案原有相对链接；其中台账和许可链接需通过本目录的 [static-audit.json](static-audit.json) 与 [license-review.json](license-review.json) 阅读。原正文历史地址见 [master 固定版本](https://github.com/Ares-X/VulWiki/blob/a4d6ef19733c9376500c175ebc6e0f531b504de2/Web安全/AI应用/piflow/piflow%20聊天入口缺少认证与宿主命令工具调用链（CVE-2026-109442）.md)。不保留仍会被主正文扫描的占位文章。
- [机器可读迁移证据](admission-correction-20261027.json) 记录原路径、归档路径、Git blob、SHA-256 和其他七篇批次文章的未改动哈希。原批次报告与 `changed-articles.json` 是历史快照，不回写成“当时没有收录”。
- 本次仅做已公开材料的准入纠错和离线文档检查，没有修改关联博客、发布器、质量基线或自动部署配置。

### 历史链接检查例外

本目录上方 PR #32 历史段落中的相对正文链接仍按当时路径保留，该路径在当前分支不再存在；请使用上面的固定 master 历史地址或 `pending-original.md`。档案原文内两条相对台账/许可链接也只作为原字节保留，当前可用目标由本次纠错段落另列。这三条是明确记录的历史链接例外，不声称所有历史相对链接仍可在当前目录直接打开；不为修链接改写原文。
