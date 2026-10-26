---
schema_version: "1"
id: "VW-20261026-piflow-109442"
title: "piflow 聊天入口缺少认证与宿主命令工具调用链（CVE-2026-109442）"
product: "cas-bigdatalab piflow"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-109442"
identifier_status: "active"
version: "VulnCheck CNA：2.0.0 至 2.0.1；源码核对固定 ad8d0108a54a4257307d4946dc9250e26f24c63f"
fixed_version: "unknown；已读公告未给出已发布修复版"
prerequisites: "可达未被外部网关保护的聊天入口；数据库与模型配置可用；模型实际调用 exec_shell。公开材料缺少非占位网络请求与工具执行的对应记录。"
side_effects: "会话/消息和日志写入、模型调用费用、宿主进程执行与环境变量访问；Docker 示例映射宿主 workspace/storage/logs，影响还取决于进程及容器权限。"
source: "Lasso Security；VulnCheck CNA；固定 piflow 源码"
source_status: "recorded"
source_url: "https://www.lasso.security/vulnerability-database/cve-2026-109442"
archive_commit: "ad8d0108a54a4257307d4946dc9250e26f24c63f"
review_date: "2026-10-26"
---

# piflow 聊天入口缺少认证与宿主命令工具调用链

本文收录公开源码与公告支持的原理分析。**待核的是完整网络请求与实际工具调用的对应记录、后续修复状态；不是要求维护者运行漏洞。** CNA 将问题对应到 piflow 2.0.0–2.0.1；下面的固定源码只代表所读提交，不代替全部受影响版本的逐版本比对。

## 已确认的源码链与部署条件

固定提交的 `POST /chat` 和 `/chat/stream` 没有声明认证依赖，构造应用处未见全局身份依赖；请求者提交的 `user_id` 不是认证身份。`ensure_thread_access` 为新线程登记这个值，对已有线程作值比较，不能据此认为聊天接口已经认证调用者。

聊天处理将准备后的消息交给 `agent.astream`；工厂为该 agent 绑定 `exec_shell`，审批配置未列出这个工具。工具用 `shlex` 拆分参数后调用 `subprocess.run`，继承进程环境且没有命令允许列表。路径改写与虚拟文件后端并不隔离这一独立进程调用；`shell=False` 也不等于禁止显式启动解释器。

这些代码支持“未认证聊天入口连接宿主命令工具”的根因判断。**模型是否选择调用、具体参数和执行结果仍取决于模型、提示及运行配置**，不能从静态路径推出每条聊天消息都会执行命令。漏洞在认证与执行隔离边界，不是工具本身具有预期的命令执行能力这一事实。

Docker 的后端绑定 loopback，但同一部署的 nginx 无鉴权转发聊天路径，Compose 发布 `5174:5174`；loopback 不能单独证明外部不可达。执行权限在进程所在主机或容器内，不能普遍写成宿主机 root。外部网关、网络规则和挂载改变实际暴露及影响。

## 来源实验与未决证据

Lasso 的公开 HTTP 示例仍含描述提示词的占位符，没有给出对应响应或 tool-call 记录。本库不把占位描述补写成可执行请求。

作者另记录在提交 `817605d` 直接调用工具的实验，公开调用原值如下：

```python
exec_shell("id")
exec_shell("sh -c 'id; uname -a; whoami'")
exec_shell("sh -c 'echo LEAKED_LLM_API_KEY=$LLM_API_KEY'")
```

作者报告了主机身份、系统信息与环境变量回显；这是工具能力的实验记录，**不能当作匿名 HTTP 请求已触发工具的对应证据**。第三项访问环境秘密，会把值带入输出和日志。实验提交与本库固定审阅提交不同，后者不是修复提交。

## 状态、处置与审阅范围

VulnCheck 的 2026-10-19 公告和官方 CNA 给出受影响范围；没有在已读材料中确认修复版本。来源建议为聊天入口增加认证，限制暴露，并对进程执行采用实际隔离、最小环境和审批；这些是缓解建议，不是已发布补丁的证明。

原批次的 [18 文件审阅台账](../../../docs/reviews/20261026-weekly/piflow/static-audit.json) 逐项区分全文与选段范围。本次重新下载这些固定文件，核对 Git blob、字节数并重算 SHA-256；重新阅读全文的核心为 `agents/tools.py`、`agents/factory.py` 与三个 Docker 部署文件，其他大文件仅复核本文涉及的路由、消息传递和线程检查片段；原批次审读范围仍由台账单列。未执行、编译或安装来源代码、依赖或容器，未访问示例目标；依赖、模型服务、工作区技能和整个产品不因此获得安全认证。

本文为中文事实归纳及必要短引用，原站版权和产品许可缺口见 [许可记录](../../../docs/reviews/20261026-weekly/piflow/license-review.json)。没有复制完整原文或源码，没有猜补原始占位符或脱敏。

## 来源

- [Lasso 原始研究](https://www.lasso.security/vulnerability-database/cve-2026-109442)：工具实验及网络证据限制；未确认页面首次发布日期。
- [VulnCheck CNA 公告](https://www.vulncheck.com/advisories/piflow-2.0.0-through-2.0.1-unauthenticated-rce-via-chat-agent-exec-shell)：编号、产品、版本范围与 2026-10-19 公告日期。
- [官方 CVE JSON](https://cveawg.mitre.org/api/cve/CVE-2026-109442)：本次读取状态 PUBLISHED，引用同一固定源码。
- 固定源码：[聊天入口](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/server.py#L615)、[线程检查](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/runtime/chat_store.py#L167)、[消息传递](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/runtime/engine.py#L741)、[工具绑定](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/agents/factory.py)、[进程执行](https://github.com/cas-bigdatalab/piflow/blob/ad8d0108a54a4257307d4946dc9250e26f24c63f/agents/tools.py#L114)。
