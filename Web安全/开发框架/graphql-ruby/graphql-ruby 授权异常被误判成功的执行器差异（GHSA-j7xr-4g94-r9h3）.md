---
schema_version: "1"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "active"
identifier_status: "active"
source_status: "recorded"
id: "VW-20261003-graphql-ruby-next-authorization"
title: "graphql-ruby 授权异常被误判成功的执行器差异（GHSA-j7xr-4g94-r9h3）"
product: "graphql-ruby"
primary_identifiers: "GHSA-j7xr-4g94-r9h3"
version: ">= 2.5.23, <= 2.6.5；仅使用 Execution::Next 且 resolver 授权钩子抛出 GraphQL::UnauthorizedError 的路径"
fixed_version: "2.6.6"
prerequisites: "应用使用 Execution::Next；可达字段使用 GraphQL::Schema::Resolver 或其子类；authorized? 通过抛出 GraphQL::UnauthorizedError 拒绝请求"
side_effects: "被拒绝的 resolve 仍可能执行；查询可能泄露数据，Mutation 等写操作的副作用取决于宿主 resolver 实现"
source: "Bas Alberts / GitHub Security Lab；graphql-ruby 维护者公告与补丁"
source_url: "https://securitylab.github.com/advisories/GHSL-2026-152_graphql-ruby/"
verification_source: "https://github.com/rmosolgo/graphql-ruby/security/advisories/GHSA-j7xr-4g94-r9h3; https://github.com/rmosolgo/graphql-ruby/commit/741e37959193b9afe2c6c578cea3ec431b5fda33"
---

# graphql-ruby 授权异常被误判成功的执行器差异

此问题把“授权异常已经交给错误处理器”误当成“授权已经成功”。只要进入 `Execution::Next` 的 resolver 调用路径，原本用于拒绝访问的异常反而可能放行 `resolve`。本文结合发现者报告、维护者公告和最终补丁作中文技术综述；不是英文原文的逐句翻译。

## 影响范围与判断条件

维护者给出的范围是 `>= 2.5.23, <= 2.6.5`，修复版为 `2.6.6`。这里的限制条件不能省略：

- schema 需要使用 `Execution::Next`
- 字段使用 `GraphQL::Schema::Resolver`，或 `GraphQL::Schema::Mutation`、`GraphQL::Schema::RelayClassicMutation`、`GraphQL::Schema::Subscription` 等子类
- 实例方法 `authorized?` 通过抛出 `GraphQL::UnauthorizedError` 拒绝访问

维护者明确其他授权形式正常，不能由安装了 graphql-ruby 推出所有查询都绕过授权。公开公告在核对日仍写 `No known CVE`；本篇以 GHSA 作主编号，GHSL-2026-152 仅为研究报告编号。

## 数据流与错误状态

[修补前源码](https://github.com/rmosolgo/graphql-ruby/blob/8b9f621c196d9ed08aee5fa7451887b929e84673/lib/graphql/schema/resolver.rb)中的 `Resolver#call` 调用 `authorized?(**@prepared_arguments)`。异常分支把错误交给 `q.schema.unauthorized_object(err)`，将返回值存入 `new_return_value`，同时令 `is_authed = true`。

后续分支优先判断 `is_authed`，真值会进入校验和 `call_resolve(@prepared_arguments)`。因此，即便默认错误处理器返回 `nil`，它也不能阻止业务 resolver 执行。错误处理器提供的替代结果同样可能被绕开；“是否已处理异常”与“是否允许进入业务代码”是两个不同状态。

GitHub Security Lab 对照了旧 Interpreter：其 `resolve_with_support` 路径会把相同异常传递给 Runtime 错误处理器。这个对照的价值是定位执行器差异，而不是证明所有应用都存在同一越权结果。最终泄露哪些字段、是否改变数据，仍取决于宿主 schema 与 resolver。

## 最终修补与回归证据

2026-07-17 的[最终提交](https://github.com/rmosolgo/graphql-ruby/commit/741e37959193b9afe2c6c578cea3ec431b5fda33)仅对生产逻辑作这一关键修改：异常分支的 `is_authed` 从 `true` 改为 `false`。这样控制流继续使用未授权结果处理，而非调用实际 resolver。

补丁附带 `Resolver9` 回归用例，授权方法始终抛异常。普通输入应返回 `nil`；自定义 `unauthorized_object` 遇到公开测试值 `"Replace Me"` 时返回 `"Replacement String"`，该替代值也应保留。两项断言共同约束了修补行为：既不能放行业务代码，也不能把合法错误处理器的返回值一律丢弃。

静态核查对象为上述固定提交中的 `lib/graphql/schema/resolver.rb` 与 `spec/graphql/schema/resolver_spec.rb`。新增测试是内存 schema、固定字符串和断言；未见该改动引入下载执行、凭据读取、对外通信或持久化逻辑。此结论仅针对列明的差异，不扩展为整个依赖生态的安全认证。

## 修复与来源

使用 `Execution::Next` 的应用应升级到 `2.6.6` 或后续包含该修补的版本。发行时间为 2026-07-21；发现者长文发表于 2026-08-08，二者不是同一天披露事件。本篇核对日期：2026-10-03。

- [Bas Alberts：GHSL-2026-152](https://securitylab.github.com/advisories/GHSL-2026-152_graphql-ruby/)：调用链、执行器对照、报告时间线与原始演示
- [维护者公告 GHSA-j7xr-4g94-r9h3](https://github.com/rmosolgo/graphql-ruby/security/advisories/GHSA-j7xr-4g94-r9h3)：受影响范围、前提、修复版本和编号状态
- [固定修补提交](https://github.com/rmosolgo/graphql-ruby/commit/741e37959193b9afe2c6c578cea3ec431b5fda33)：最终逻辑及回归测试
- [2.6.6 固定版本 CHANGELOG](https://github.com/rmosolgo/graphql-ruby/blob/9548947bee01d88450280a30cd80fe8776b17947/CHANGELOG.md)：发行记录

保留原作者与原链接；没有转载完整 PoC 或原文截图，也没有修改其示例值。
