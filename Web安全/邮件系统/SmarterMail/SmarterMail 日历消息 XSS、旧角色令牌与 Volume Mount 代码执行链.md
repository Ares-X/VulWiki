---
schema_version: "1"
id: "VW-20261019-SMARTERMAIL"
title: "SmarterMail 日历消息 XSS、旧角色令牌与 Volume Mount 代码执行链"
product: "SmarterMail"
primary_identifiers: "CVE-2026-104082, CVE-2026-104083, CVE-2026-104084"
identifier_status: "active"
version: "Build 9777 之前"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "收件人打开恶意日历消息；RCE 分支需要 SysAdmin access token；降权绕过需旧高权限 refresh token"
side_effects: "提取令牌、保存 refresh.txt、修改全局设置、建域及账号、上传脚本及反连；无自动恢复"
source: "原作者公开代码与厂商/CNA 公告"
source_url: "https://github.com/eev4n/smartermail/tree/665b3e9c3834ea00743d5b6634ec271e93f2b872"
source_status: "recorded"
---

# SmarterMail 日历消息 XSS、旧角色令牌与 Volume Mount 代码执行链

## 编号、范围及前提
2026-10-19 已核对 VulnCheck CNA 的 CVE-2026-104082、CVE-2026-104083、CVE-2026-104084 记录：影响 Build 9777 之前版本。厂商 2026-10-08 Build 9777 发布说明分别记载域配置路径校验、HTML 消毒强化及管理员降权后的令牌拒绝处理。不能把标题理解成无需用户交互、任意普通收件人都会直接获得 SYSTEM。

- CVE-2026-104083：日历消息中的 MathML 外来内容造成 HTML 消毒器与浏览器重解析结果不同，收件人在 Webmail 打开消息时发生存储型 mutation XSS
- CVE-2026-104084：降权前签发的 refresh token 在更新 access token 时未按当前权限重验；需要有效旧高权限令牌，普通低权限令牌不能凭此凭空变成 SysAdmin
- CVE-2026-104082：需要 SysAdmin 范围 access token，通过域存储路径配置和 Volume Mount 脚本执行之间的信任关系绕过脚本目录限制

## 公开代码的具体对应
公开仓库 eev4n/smartermail 固定提交为 665b3e9c3834ea00743d5b6634ec271e93f2b872，包含 main.py、rce.py、send.py 和 README.md。

send.py 通过 SMTP 投递包含 `X-ALT-DESC;FMTTYPE=text/html` 的 iCal 消息；消息中的 JavaScript 读取 localStorage 的 userTokens 并回传至调用者给定 hook。main.py 的接收器解析令牌，对 `/api/v1/auth/refresh-token` POST 后检查返回 JWT 是否含 SysAdmin；无此角色即不继续。

rce.py 与 main.py 的后续分支先调用 `/api/v1/settings/sysadmin/AddOrUpdateMount` 获取错误信息中的脚本路径，再修改 `/api/v1/settings/sysadmin/global-mail` 文件扩展名限制，通过 `/api/v1/settings/sysadmin/domain-put` 将新域的存储位置置于脚本目录内。随后配置用户配额、登录所建用户，经 `/api/upload` 上传脚本，最后以 CommandMount 指向新文件触发执行。与 CNA 描述的路径隔离绕过相符。

main.py 的令牌刷新与 SysAdmin 筛选并不单独证明进行了“管理员降权”实验；CVE-2026-104084 的降权前提来自 CNA，不能把 main.py 任意成功都当成该编号的独立复现。

## 副作用与代码审阅
脚本会发送邮件、接收及保存刷新令牌（本地 refresh.txt）、更改全局上传限制、建立域及账号、改变存储路径和配额、上传 fun.ps1 与 g.bat，并请求目标建立 PowerShell 网络会话。静态证据仅说明程序行为，不证明实际运行权限或成功率；SYSTEM 结论应限定为 CNA 描述的 SmarterMail 服务权限情形。

完整静态审阅三个 Python 文件与递归文件树：第三方导入 requests、Flask；未提供依赖锁、安装脚本、子模块或工作流。没有发现与声明功能无关的隐藏下载执行器，但程序的声明功能本就包含令牌提取、写文件和反连，绝不能称为只读检查器。没有运行、安装或访问样例目标；也没有自动清理/还原全局设置逻辑。

## 修复与来源限制
升级至 Build 9777 或之后的适用修复版本。厂商发布说明与 CNA 对应，不把三个问题合并成一个无需认证的服务端入口。原作者博客本轮读取失败；公开代码与 CNA 可读，因此不引用博客中未取得的实验细节，微信配图也未作为独立验证证据。

## 来源
- 原作者 evan 博客（本轮不可读）：https://blog.evan.lat/posts/sm/
- 固定代码：https://github.com/eev4n/smartermail/tree/665b3e9c3834ea00743d5b6634ec271e93f2b872
- 厂商：https://www.smartertools.com/smartermail/release-notes/current#/9526:~:text=Build%209777%20(Oct%208%2C%202026)
- CNA：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/104xxx/CVE-2026-104082.json
- CNA：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/104xxx/CVE-2026-104083.json
- CNA：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/104xxx/CVE-2026-104084.json
- 线索：gelusus/wxvl 提交 59b51e8d9a3ffe28c04f535e457a178c89288f0d，2026-10-13《SmarterMail 高危漏洞链公开：一封恶意邮件可拿下服务器 SYSTEM 权限》

本稿为中文原创整理，不因公开可访问推定代码或微信全文转载许可，不复制完整程序。
