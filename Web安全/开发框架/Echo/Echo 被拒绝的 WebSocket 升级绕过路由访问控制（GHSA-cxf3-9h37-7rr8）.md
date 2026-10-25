---
schema_version: "1"
id: "VW-20261025-ECHO-PROXY-UPGRADE"
title: "Echo 被拒绝的 WebSocket 升级绕过路由访问控制（GHSA-cxf3-9h37-7rr8）"
product: "Go Echo Proxy middleware"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "GHSA-cxf3-9h37-7rr8"
identifier_status: "active"
version: "Echo v4 >=4.0.0 <4.16.1；v5 >=5.0.0 <5.4.1"
fixed_version: "v4.16.1；v5.4.1（2026-10-22 公告）"
prerequisites: "可达 Echo 代理路由；上游拒绝 WebSocket 升级却保持连接；目标资源只依赖 Echo 路由鉴权而无上游独立鉴权；不提供任意主机代理"
side_effects: "同一连接上的后续请求可访问配置上游资源，副作用取决于该资源；官方回归 PoC 创建本地前后端 listener 并发送请求，本次未运行"
source: "LabStack / Echo；Duodum"
source_status: "recorded"
source_url: "https://github.com/labstack/echo/security/advisories/GHSA-cxf3-9h37-7rr8"
archive_commit: "3fb0ba7e17645bb65611e2a08875d0a2f65c421f"
---

# Echo 被拒绝的 WebSocket 升级绕过路由访问控制

Echo 于 2026-10-22 公告 Proxy middleware 对 WebSocket 升级的错误隧道选择，可使后续请求绕过 Echo 的路由和路由级中间件。截至本次核对，官方页面显示 No known CVE，本文仅使用 GHSA-cxf3-9h37-7rr8，不虚构 CVE 或借用其他 Echo 编号。

## 机制与条件

旧实现因客户端请求升级而提前选择原始隧道，未先确认配置的上游是否实际接受升级。若上游返回普通 HTTP 状态却保持连接，后续 HTTP 请求仍被原始连接直接转发至同一上游，不再经过 Echo 路由鉴权。

利用需要可访问的代理路由、拒绝升级且保留连接的上游、以及仅由 Echo 路由访问控制保护的资源。它不能任意指定其他主机，也不绕过上游自身的认证；上游只返回非 101 状态并不足以保证旧版本安全。

## 官方回归 PoC 与静态审阅

本条按已有官方回归复现材料入库。2026-10-25 阅读 GHSA、固定测试 `TestProxyRejectedUpgradeKeepsRouting` 全部函数及相关代理实现片段；未执行 `go test`、启动 listener 或复现攻击。其余同文件升级断连测试不作为本项已验证影响。

- [固定官方测试文件](https://github.com/labstack/echo/blob/3fb0ba7e17645bb65611e2a08875d0a2f65c421f/middleware/proxy_security_test.go)：提交时间 2026-10-22 16:18:36 UTC。
- [对应 v4 代理实现](https://github.com/labstack/echo/blob/3fb0ba7e17645bb65611e2a08875d0a2f65c421f/middleware/proxy.go)。

该测试分别模拟上游对 `/gateway` 的升级请求返回 200、401、403；同一个 TCP 连接再请求 `/admin`。Echo 本地 `/admin` 路由应返回 403，上游 `/admin` 会递增 `adminCalls` 并返回 `upstream secret`。修复后的断言要求后续响应仍为 403、`adminCalls` 为零，确认请求回到 Echo 路由。它是固定修复提交中的回归证明形式，不能把测试期望值称作本库亲自运行的结果。

官方另记录在 v4.15.0、v4.16.0、v5.0.0、v5.4.0 的运行时复现，并通过源码历史把 v4 范围追溯到 4.0.0；“源码覆盖范围”与“实际运行过的版本集合”分别保留。

## 修复与临时缓解

升级至 v4.16.1 或 v5.4.1 及更高。补丁交由 Go 标准 HTTP reverse proxy 处理升级，只在有效上游升级响应后建立隧道，被拒绝的升级继续按普通 HTTP 请求处理。官方分别给出 [v4 修复](https://github.com/labstack/echo/commit/3fb0ba7e17645bb65611e2a08875d0a2f65c421f) 与 [v5 修复](https://github.com/labstack/echo/commit/1855061e572ae9dab727c811d8382f266bfbaaec)，不要只更新跨主版本不兼容的依赖声明而不核对部署。

不能立即升级时，官方建议在受影响代理路由前拒绝 WebSocket 升级，或对每个上游资源独立执行访问控制。具体资源可有读写/管理副作用；本项不能统称只读信息泄露。官方测试会创建本地 listener、发送网络请求并清理连接，本次维护没有运行该 PoC。

## 来源

- [Echo 官方 GHSA，2026-10-22](https://github.com/labstack/echo/security/advisories/GHSA-cxf3-9h37-7rr8)：Duodum 报告、影响、前提、版本与缓解。
- 上述固定源码和回归函数：静态说明请求流与断言，不等于本库复现。核对日期 2026-10-25。
