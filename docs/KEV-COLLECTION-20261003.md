# KEV 筛选清单与分批收录（2026-10-03）

## 范围及计数

本次清点用户指定的 [cve.imfht.com KEV 筛选](https://cve.imfht.com/search?q=&vendor=&product=&severity=&days=0&kev=1&epss_min=0&sort=newest&lang=en)，并与 [CISA 官方 KEV 固定快照](https://github.com/cisagov/kev-data/blob/7009facc2019306d41f6d6df6c8a057b99b4b468/known_exploited_vulnerabilities.json)交叉核对。

- 站点显示 1,727 行，87 页；全量翻页得到 1,726 个不同 CVE
- `CVE-2023-32409` 在第 31、32 页重复；通过 [Apple 厂商 KEV 筛选第 2 页](https://cve.imfht.com/search?q=&vendor=Apple&product=&severity=&days=0&kev=1&epss_min=0&sort=newest&lang=en&page=2)找回全局分页漏掉的 `CVE-2023-28204`，最终范围为 **1,727 个不同 CVE**
- 官方 catalogVersion 为 `2026.10.02`，dateReleased 为 `2026-10-02T15:19:38.2945Z`，包含 1,733 个不同 CVE；原 JSON 通过官方 schema 验证，下载字节的 Git blob SHA 与 GitHub 一致
- 站点范围中 1,726 项仍在该官方快照；`CVE-2026-69836` 已于 8 月 21 日加入后当日移除，证据见 [官方删除提交](https://github.com/cisagov/kev-data/commit/e7ad2b019b39b438c2a906fb86c7a7208e680d3f)。保留其站点候选身份，但不称为当前 KEV
- 官方另有 7 项较新条目尚未被站点标为 KEV：`CVE-2026-102489`、`CVE-2026-102490`、`CVE-2026-104286`、`CVE-2026-76504`、`CVE-2026-86950`、`CVE-2026-88771`、`CVE-2026-88772`。它们属于清单差异说明，不悄悄混入用户给定的 1,727 项统计

官方原始 JSON SHA-256：`d2c8c6cb23291b46ff2b086197641a6b1fa35e6b746bba714cc280a1778f9e48`。站点快照在 2026-10-03 UTC 读取；公开内容可能继续变化，本文件不是实时 KEV 镜像。

## 去重依据和进度边界

比较 master `cfb19294812b1435a57e866a87dd18e2ff3ebec3` 与未合并草稿 PR #10 `e102e1d2fb26e381e7c4d270629738d0f3f8654d`。该时点没有其他开放 PR。元数据初筛得到 553 项已有主编号、125 项仅候选/引用、1,049 项没有元数据编号命中；这三类都只是候选，正文产品/端点还需逐项判断。正文中编号命中也不自动等同实体覆盖。

**全量清点已完成，全文和技术来源审阅仍在进行。** 本文件不将下载成功、CNA 字段读取、搜索命中、AI 摘要或 KEV 标签计作完成 PoC 审阅。已完成的文章批次如下；其余在[完整机器台账](KEV-CANDIDATES-20261003.json)中明确记为 pending-substantive-review。后续批次持续补充，不以当前篇数作为全范围完成标志。

项目收录可参考的技术主体，包括源码/补丁分析、具体手工方法及来源失败实验，不要求维护者执行 PoC。KEV 说明已知在野利用，不自动证明公开完整 PoC。仅有新闻/预警且未找到技术主体的候选会记录实际材料缺口；未复现本身不是拒收理由。

## 当前完成文章

| CVE | 处置 | 文稿 |
|---|---|---|
| CVE-2026-49869 | 新增互补技术分析 | [Kestra configs后缀白名单与未认证工作流执行（CVE-2026-49869）](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/Kestra/Kestra%20configs%E5%90%8E%E7%BC%80%E7%99%BD%E5%90%8D%E5%8D%95%E4%B8%8E%E6%9C%AA%E8%AE%A4%E8%AF%81%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%89%A7%E8%A1%8C%EF%BC%88CVE-2026-49869%EF%BC%89.md) |
| CVE-2026-59822 | 新增互补技术分析 | [LiteLLM MCP认证失败回退为空用户的源码与修复边界（CVE-2026-59822）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/LiteLLM/LiteLLM%20MCP%E8%AE%A4%E8%AF%81%E5%A4%B1%E8%B4%A5%E5%9B%9E%E9%80%80%E4%B8%BA%E7%A9%BA%E7%94%A8%E6%88%B7%E7%9A%84%E6%BA%90%E7%A0%81%E4%B8%8E%E4%BF%AE%E5%A4%8D%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2026-59822%EF%BC%89.md) |
| CVE-2026-55255 | 新增互补技术分析 | [Langflow responses跨用户Flow执行与UUID分支授权缺口（CVE-2026-55255）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Langflow/Langflow%20responses%E8%B7%A8%E7%94%A8%E6%88%B7Flow%E6%89%A7%E8%A1%8C%E4%B8%8EUUID%E5%88%86%E6%94%AF%E6%8E%88%E6%9D%83%E7%BC%BA%E5%8F%A3%EF%BC%88CVE-2026-55255%EF%BC%89.md) |
| CVE-2026-48710 | 新增互补技术分析 | [Starlette BadHost路径重建与路由授权视图分裂（CVE-2026-48710）](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Starlette/Starlette%20BadHost%E8%B7%AF%E5%BE%84%E9%87%8D%E5%BB%BA%E4%B8%8E%E8%B7%AF%E7%94%B1%E6%8E%88%E6%9D%83%E8%A7%86%E5%9B%BE%E5%88%86%E8%A3%82%EF%BC%88CVE-2026-48710%EF%BC%89.md) |
| CVE-2026-39987 | 新增互补技术分析 | [marimo terminal WebSocket缺少认证与编辑模式前提（CVE-2026-39987）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Marimo/marimo%20terminal%20WebSocket%E7%BC%BA%E5%B0%91%E8%AE%A4%E8%AF%81%E4%B8%8E%E7%BC%96%E8%BE%91%E6%A8%A1%E5%BC%8F%E5%89%8D%E6%8F%90%EF%BC%88CVE-2026-39987%EF%BC%89.md) |
| CVE-2026-9586 | 新增互补技术分析 | [Switchvox pa端点PhoneIP SQL注入与公开模板判定（CVE-2026-9586）](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Sangoma/Switchvox%20pa%E7%AB%AF%E7%82%B9PhoneIP%20SQL%E6%B3%A8%E5%85%A5%E4%B8%8E%E5%85%AC%E5%BC%80%E6%A8%A1%E6%9D%BF%E5%88%A4%E5%AE%9A%EF%BC%88CVE-2026-9586%EF%BC%89.md) |
| CVE-2025-62593 | 新增互补技术分析 | [Ray 浏览器请求判定与 DNS 重绑定边界（CVE-2025-62593）](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/Ray/Ray%20%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AF%B7%E6%B1%82%E5%88%A4%E5%AE%9A%E4%B8%8E%20DNS%20%E9%87%8D%E7%BB%91%E5%AE%9A%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-62593%EF%BC%89.md) |
| CVE-2025-68461 | 新增互补技术分析 | [Roundcube SVG animate 命名空间属性过滤修复分析（CVE-2025-68461）](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/Roundcube/Roundcube%20SVG%20animate%20%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E5%B1%9E%E6%80%A7%E8%BF%87%E6%BB%A4%E4%BF%AE%E5%A4%8D%E5%88%86%E6%9E%90%EF%BC%88CVE-2025-68461%EF%BC%89.md) |
| CVE-2025-64328 | 新增互补技术分析 | [FreePBX filestore SSH 测试连接命令注入与权限差异（CVE-2025-64328）](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/FreePBX/FreePBX%20filestore%20SSH%20%E6%B5%8B%E8%AF%95%E8%BF%9E%E6%8E%A5%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E4%B8%8E%E6%9D%83%E9%99%90%E5%B7%AE%E5%BC%82%EF%BC%88CVE-2025-64328%EF%BC%89.md) |
| CVE-2025-10035 | 新增互补技术分析 | [GoAnywhere 许可证反序列化链与公开检测的能力边界（CVE-2025-10035）](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Fortra%20GoAnywhere/GoAnywhere%20%E8%AE%B8%E5%8F%AF%E8%AF%81%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E9%93%BE%E4%B8%8E%E5%85%AC%E5%BC%80%E6%A3%80%E6%B5%8B%E7%9A%84%E8%83%BD%E5%8A%9B%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-10035%EF%BC%89.md) |
| CVE-2025-48633 | 新增互补技术分析 | [Android Device Owner 账号可见性检查修复分析（CVE-2025-48633）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Android/Android%20Device%20Owner%20%E8%B4%A6%E5%8F%B7%E5%8F%AF%E8%A7%81%E6%80%A7%E6%A3%80%E6%9F%A5%E4%BF%AE%E5%A4%8D%E5%88%86%E6%9E%90%EF%BC%88CVE-2025-48633%EF%BC%89.md) |
| CVE-2025-48572 | 新增互补技术分析 | [Android 媒体按键能力传播与后台启动限制（CVE-2025-48572）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Android/Android%20%E5%AA%92%E4%BD%93%E6%8C%89%E9%94%AE%E8%83%BD%E5%8A%9B%E4%BC%A0%E6%92%AD%E4%B8%8E%E5%90%8E%E5%8F%B0%E5%90%AF%E5%8A%A8%E9%99%90%E5%88%B6%EF%BC%88CVE-2025-48572%EF%BC%89.md) |
| CVE-2025-48703 | 新增互补技术分析 | [CWP changePerm 权限参数命令注入与用户前提（CVE-2025-48703）](../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/Control%20Web%20Panel/CWP%20changePerm%20%E6%9D%83%E9%99%90%E5%8F%82%E6%95%B0%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E4%B8%8E%E7%94%A8%E6%88%B7%E5%89%8D%E6%8F%90%EF%BC%88CVE-2025-48703%EF%BC%89.md) |
| CVE-2025-29635 | 既有主文补证 | [（CVE-2025-29635）D-Link DIR-823X命令注入漏洞](../IOT%E5%AE%89%E5%85%A8/D-Link/%EF%BC%88CVE-2025-29635%EF%BC%89D-Link%20DIR-823X%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md) |
| CVE-2025-3248 | 既有主文补证 | [Langflow-code-API-未授权远程代码执行漏洞-CVE-2025-3248](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Langflow/Langflow-code-API-%E6%9C%AA%E6%8E%88%E6%9D%83%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2025-3248.md) |
| CVE-2025-34291 | 既有主文补证 | [Langflow-≤-1.6.9-CORS-配置错误导致令牌劫持和远程命令执行漏洞-CVE-2025-34291](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Langflow/Langflow-%E2%89%A4-1.6.9-CORS-%E9%85%8D%E7%BD%AE%E9%94%99%E8%AF%AF%E5%AF%BC%E8%87%B4%E4%BB%A4%E7%89%8C%E5%8A%AB%E6%8C%81%E5%92%8C%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2025-34291.md) |
| CVE-2025-68613 | 既有主文补证 | [n8n-表达式沙箱逃逸导致远程代码执行漏洞-CVE-2025-68613](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/n8n/n8n-%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B2%99%E7%AE%B1%E9%80%83%E9%80%B8%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2025-68613.md) |
| CVE-2026-94127 | 既有主文补证 | [（CVE-2026-94127）F5 BIG-IP APM OAuth授权服务器远程代码执行漏洞](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/F5%20BIG-IP/%EF%BC%88CVE-2026-94127%EF%BC%89F5%20BIG-IP%20APM%20OAuth%E6%8E%88%E6%9D%83%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md) |

## 维护和验证

所有源代码、引文与公开测试值均保持原值；本轮没有脱敏、执行 PoC、访问样例目标或安装利用依赖。中文稿为原始资料的多来源独立整理，具体原作者、固定提交、前提、版本分支、失败对照与副作用见各篇。未实际查看的图片不作为已验证证据。原有历史正文和资源保留，校订在原示例之外。

本批知识库测试、构建、基线差异和展示核验结果随 PR 记录；无新增质量债不等于全库无遗留警告，也不等于漏洞已复现。
