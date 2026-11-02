# 独立交叉复核：Flyimg / FreeSWITCH

时间：2026-11-02。只读源码及文章，无候选执行或目标请求。Flyimg 是本人原稿，仅交叉检查已集成正文请求和官方补丁；FreeSWITCH 是其他代理稿，独立新眼阅读完整 PoC、官方 GHSA、固定修复前后 MESSAGE 函数及 api_chat_send。

## Flyimg — PASS_WITH_SCOPE_LIMITS

- 当前集成文件 GET 行、Host 与原归档提取字符完全相同，SHA256 证明仍适用。
- `6e75b63080818ca501d4768fb95274a67448921b` 补丁确实对 webp-method 转整数、范围 0–6、shell 引用；`f9ee323e3b458d51b88e46676f9ff3367cbb0c05` 对时间格式校验、输出路径与 identify 路径引用，并有静态测试材料。正文未把作者建议伪写为官方修复代码。
- 非零退出提前异常与第二 sink 不一定到达的边界保留正确。外部依赖/镜像/actions 未审的限制仍适用。

## FreeSWITCH — 需补充脚本可达范围，然后 PASS_WITH_SCOPE_LIMITS

- 独立打开官方 GHSA-mg63-h38w-8p9p，编号、受影响 <=1.11.2、修复 >=1.11.3、公告日期、认证前提与正文一致。
- 固定旧版 `3f13ad1b1d323e435757fc43a2bb829d4ea5b9a8` 的 api_chat_send 将地址 URL decode 后调用 switch_api_execute；`api+status` 在选定 api 协议后具体将 status 作为地址传递。TCP 分支已 connect，完整报文具备实际 API 调用触发材料，不只是版本匹配；正文 qc 不控制命令。
- fixed `ef32e205295e29f034f1453ad245ba5efb07b94a` 中 PFLAG_AUTH_MESSAGES 在 PFLAG_ENABLE_CHAT_API_PROTO 检查前；401/407 的所谓漏洞判断不成立。enable-chat=false 也 goto end 返回 200/202，进一步支持正文“不以响应码证明执行”的警示。
- 脚本 UDP 未连接而 send；可选 REGISTER 总是走相同未连接 UDP 分支。它意图设置 Expires:30 的注册状态，不能统称只读，但不能误写成已成功修改了任何注册。
- **应补正文范围：build_message 没有 Authorization/Proxy-Authorization，也未实现 MESSAGE 认证挑战重试；MESSAGE 在可选 REGISTER 之前，且 REGISTER 成功不替 MESSAGE 建立认证头。故现成 TCP 探针具体可达范围限于不要求 MESSAGE 认证并接受该报文的配置；不能声称已实现公告中“持账号的认证利用”流程。** 该边界不否定公开具体触发材料本身，不需修正或运行原脚本。
- 完整目标脚本未见凭据搜集、隐蔽外传、下载执行、持久化；其他 CVE 目录与全量产品源码不是本次认证范围。

官方来源：https://github.com/signalwire/freeswitch/security/advisories/GHSA-mg63-h38w-8p9p 。已向父代理提出以上一项补充，仓库文件未修改。
