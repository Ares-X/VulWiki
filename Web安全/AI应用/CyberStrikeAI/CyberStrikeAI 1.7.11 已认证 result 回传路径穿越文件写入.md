---
schema_version: "1"
id: "VW-20261102-CYBERSTRIKEAI-RESULT"
title: "CyberStrikeAI 1.7.11 已认证 result 回传路径穿越文件写入"
product: "CyberStrikeAI HTTP/HTTPS Beacon Listener"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
version: "已核固定 v1.7.11；不外推全部早期版本"
fixed_version: "已核 v1.7.24 对应源码包含修复；最早修复版本未确定"
prerequisites: "可访问已启动的 Beacon Listener，持有其有效 Implant Token，知道数据库中真实存在的 task_id；目标父目录已存在且服务进程有写权限"
side_effects: "创建或覆盖服务端文件、更新任务结果/状态并触发完成事件及hook；不是只读检测"
source: "MY0723 / 不秃头的安全；AIPentest/CyberStrikeAI"
source_status: "recorded"
source_url: "https://github.com/AIPentest/CyberStrikeAI/blob/a6b3773f0036d3394032b2fa0c67fe88c8f0357d/internal/c2/manager.go"
archive_commit: "a6b3773f0036d3394032b2fa0c67fe88c8f0357d"
---

# CyberStrikeAI 1.7.11 已认证 result 回传路径穿越文件写入

本条仅整理 Beacon Listener 的 `/result` 文件写入问题，不将同篇文章的 XSS → 终端命令执行链混入结论。公开来源已有具体 HTTP 请求和字段，故不需要等待文章引用但未公开的 `fake_beacon.py` 或 `x.js` 才能核对这一独立问题。本轮没有确认可对应的 CVE 编号，不猜编号。

## 固定版本与实际前提

- 受影响源码：v1.7.11，提交 `a6b3773f0036d3394032b2fa0c67fe88c8f0357d`。原作者自述环境为 Debian 12、Go 1.26.3、SQLite WAL；浏览器版本属于其另外的 XSS 实验，不是本请求的必要条件。
- 已包含修复的对照：v1.7.24，提交 `4ca8b7d33663cd4ba8213f4afa8194ae1928ef16`。这不是对“最早修复于 1.7.24”的认定。
- 必须持有 Listener 的有效 `X-Implant-Token`。旧版 `handleResult()` 在解析请求之前就调用 `checkImplantToken()`，不能写成未认证漏洞。
- `task_id` 必须在数据库中存在；空 ID、随机不存在的 ID不会走到文件写入。旧版未在此入口绑定任务、会话与 Listener 的归属，但“缺归属验证”不等于“没有任何身份验证”。
- 文件落点受进程工作目录、storageDir、目标父目录以及进程文件系统权限约束。服务以 root 运行是来源实验的配置，不是漏洞自动赋予 root 权限。

## 公开请求与源码对应

完整请求见文末固定来源第 5.6 节。原文请求为 `POST /result`，内容类型 `application/octet-stream`，携带 Listener Token 和明文 JSON；包含 `task_id`、`success`、`output`、`blob_b64` 和 `blob_suffix`。文本示例的 `blob_b64` 为 `dGVzdDEyMw==`（即 `test123`），后缀为 `/../../../../VULN_POC_test`。原文 `<TOKEN>` 本就是待由实验操作者填写的占位，本库不猜补其值。

这条请求具备可核对的具体触发材料，而非只描述“存在路径穿越”。本轮核对的调用链为：

1. [旧版 `handleResult()`](https://github.com/AIPentest/CyberStrikeAI/blob/a6b3773f0036d3394032b2fa0c67fe88c8f0357d/internal/c2/listener_http.go)：校验 Listener Token 后先尝试 AES-GCM 解密，失败则直接把原始 body 当 JSON 解析。因此这一版本的示例不需要 AES key，但并未绕过 Listener Token。
2. [`TaskResultReport`](https://github.com/AIPentest/CyberStrikeAI/blob/a6b3773f0036d3394032b2fa0c67fe88c8f0357d/internal/c2/types.go)：真正使用的文件字段为 `blob_b64` 与 `blob_suffix`。原请求附带的 `session_id` 并不在这个结构中，不能把它的空字符串解释为有效会话认证。
3. [`IngestTaskResult()` 与 `saveResultBlob()`](https://github.com/AIPentest/CyberStrikeAI/blob/a6b3773f0036d3394032b2fa0c67fe88c8f0357d/internal/c2/manager.go)：先查真实任务，再把 `taskID + suffix` 拼到结果目录。后缀只被去空白、补前导点，没有拒绝路径分隔符与上跳段；`filepath.Join()` 清理后可以离开结果目录。默认 storageDir 为 `tmp/c2`，实际可配置。

原文一串 `./` 的对照不会形成有效上跳；可穿越请求依赖真实路径分隔符及 `..` 段。后缀前补一个点并没有把它变成安全扩展名。本条只解释原请求，不生成新载荷或修改原始示例。

## 如何解释来源证据

本轮已查看第 5.6 节两张原图的实际像素：一张记录经本地代理发出的明文 `/result` 请求，另一张列出多种后缀对应的 HTTP 200 / `ok` 响应。图片中有不同的写入内容，不能把它们与文本示例 `test123` 当作同一份字节证据。图片不在本库整张转载。

**返回 `{"ok":"1"}` 不是文件写入成功的充分证据。** 源码在 blob 落盘失败时只写 warning，仍可能更新任务并返回成功；目标父目录不存在或权限不足均可能导致这种情况。来源文章另述检查文件落地与访问静态文件的过程，这属于作者实验记录。本库没有把请求截图或 `ok` 单独升级为独立落盘证明，也不把写入某个 `.js` 文件等同于该文件必然被管理员浏览器执行。

## 修复对照

v1.7.24 的[结果路径处理](https://github.com/AIPentest/CyberStrikeAI/blob/4ca8b7d33663cd4ba8213f4afa8194ae1928ef16/internal/c2/manager.go)拒绝非法 task ID，使用扩展名白名单模式约束 suffix，并通过绝对路径和相对路径关系检查结果仍在预定目录中。[Listener 入口](https://github.com/AIPentest/CyberStrikeAI/blob/4ca8b7d33663cd4ba8213f4afa8194ae1928ef16/internal/c2/listener_http.go)取消解密失败后的明文回退，校验任务所属会话、Listener 和 `X-Session-Token`。原来的裸明文请求不能直接沿用到该版本。

部署应采用含上述修复的受支持版本并核对实际二进制来源；同时隔离管理接口、限制 Listener 暴露和服务账户写权限。这里只确认两个固定版本差异，不外推整个版本区间。

## 请求级静态反投毒与环境审阅

该候选的利用材料是公开 curl 请求，不依赖第三方攻击脚本。已逐字段阅读请求原字节、核对两张图和固定源码中的认证、任务查找、解密回退、写入及错误处理。请求指向作者本地 Listener，没有额外下载器、混淆二进制、使用者文件搜集或独立外传地址。它会真实创建/覆盖服务端文件，并修改任务状态、发布完成事件及调用 hook；这些是漏洞利用副作用，不能作为生产只读检测。

为避免把环境脚本当作可信前置，本轮还完整静读 v1.7.11 的 501 行 `run.sh`、411 行 `upgrade.sh`、服务器 main、`go.mod` 和 `requirements.txt`，结构化核对 `go.sum`，检查两版本完整树是否存在工作流，并读完 v1.7.24 的三份 workflow：

- `run.sh` 会创建 Python venv、升级 pip、通过可覆盖镜像安装依赖，再下载 Go modules 并编译启动服务。Python 依赖多为下限版本，没有哈希锁定；Go 声明要求 1.25，而脚本仅检查至少 1.21，不能照搬脚本提示判断工具链足够。
- `go.mod` 固定了模块版本，但把 DingTalk SDK 替换到 `github.com/uouuou/dingtalk-stream-sdk-go` 的固定伪版本。模块源码和下载物没有逐份审计；`go.sum` 存在不代表供应链安全认证。原研究的环境命令还设置 `GOSUMDB=off`，此处不把它推荐为安装规范。
- `upgrade.sh` 默认查询 `Ed1s0nZ/CyberStrikeAI` 最新 release，下载并解包源码，以 `rsync --delete` 同步代码，可能停止服务，然后调用 `run.sh`。这是明确的远程下载、代码替换和启动行为，不是本请求所需的离线步骤；本轮没有运行。
- v1.7.11 固定树没有 `.github/workflows`。v1.7.24 的三份工作流使用只读 contents 权限，但执行构建/测试；process-isolation 任务包含 privileged Docker fixture，Action 及镜像标签并非全部固定 digest。仅阅读这些配置，不代表执行过或全面认证其依赖。

静态检查只覆盖上述候选请求及相关环境文件，未审计产品所有工具、插件、模型调用、可选依赖、镜像层或非公开 XSS 脚本。未运行 PoC、编译、安装依赖或访问任何目标 Listener。

## 来源、日期与许可

MY0723 / 不秃头的安全文章页面显示 2026-10-30 04:18，并引用了更早的微信研究。本轮直接读取该微信原链接返回 Site Unavailable，无法确认它的完整正文及原始发布日期；未用搜索转载的日期代替原作者发布日期。v1.7.11 固定提交时间为 2026-07-28，v1.7.24 固定提交时间为 2026-10-16；提交日期不是漏洞发现日期。此条是 2026-11-02 完成证据补齐的收录。

项目固定源码 [LICENSE](https://github.com/AIPentest/CyberStrikeAI/blob/a6b3773f0036d3394032b2fa0c67fe88c8f0357d/LICENSE)为 Apache-2.0；研究文章和图片未见明确再发布许可。因此本条采用原创中文综述、必要短字段和原链接，不整篇翻译、复制非公开脚本或转载整张截图。

- [MY0723 文章的固定上游归档（第 5.6 节含完整请求）](https://github.com/gelusus/wxvl/blob/31632ad3a32467b7837fe87d93fa186c48616030/doc/2026-10/CyberStrikeAI%20C2%20%E6%8E%A7%E5%88%B6%E5%8F%B0%E4%BB%A3%E7%A0%81%E5%AE%A1%E8%AE%A1%EF%BC%9A%E5%AD%98%E5%82%A8%E5%9E%8B%20XSS%20%E9%93%BE%E5%BC%8F%20RCE%20%E4%B8%8E%20%E2%88%95result%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5.md)：来源链为作者文章 → gelusus/wxvl 归档，不作为第二份独立验证。

- [文章引用的更早微信来源](https://mp.weixin.qq.com/s/3XXw61i1XTDxJsih848uTQ)：本轮访问失败，未称全文已读。
