# piflow CVE-2026-109442：暂不准入主库

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
