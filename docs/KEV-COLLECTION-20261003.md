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

**全量清点已完成，全文和技术来源审阅仍在进行。** 本文件不将下载成功、CNA 字段读取、搜索命中、AI 摘要或 KEV 标签计作完成 PoC 审阅。已完成的文章批次如下；其余在[完整机器台账](KEV-CANDIDATES-20261003.json)中分别记录待审、范围内暂缓、阻断等状态。后续批次持续补充，不以当前篇数作为全范围完成标志。

本轮收录要求公开且具体的 PoC、EXP 或实际验证材料；仅补丁原理、事件描述、推测、版本指纹或 KEV 标签不能通过。可读的具体原始请求、完整公开代码或带明确输入与预期结果的真实回归测试分别注明证据范围。不要求维护者执行这些材料；未执行与缺少公开具体材料是不同问题。

## 具体公开验证材料与纠正

初版将部分补丁/事件分析及编号映射不明的材料过早列入稿件，现按公开具体 PoC/EXP/实际验证方式门槛重新检查全部93篇。独立复核后保留53篇（34篇新稿、19篇旧文补充）；撤回33篇本轮新稿及7处本轮追加。原 master 正文、代码、示例、资源与既有标识保留。

保留材料对应58个通过本轮具体资料门槛的候选编号，不等于新增独立漏洞数，也不表示运行复现成功。SimpleHelp只计57727，ScreenConnect只计1709；其余原有编号仅作背景。完整逐篇公开来源、触发位置、范围与退回原因见[门槛复核台账](KEV-MATERIAL-GATE-20261003.json)。无完整具体触发的纯补丁、事件、理论和仅版本探针，不因analysis标签而收录。

## 当前累计文稿

累计86篇（50新增、36既有补证），涉及95个经独立材料审核的候选CVE。本次增加2024年的16篇/17编号，落实9条具体来源、版本或结果判据说明并通过最终字节复核。保留原文代码、公开值与历史正文，未执行PoC。通过材料门槛的编号数不等于新增漏洞数、主CVE导航条目数或运行复现次数。

| 本次具体验证范围 | 处置 | 文稿 |
|---|---|---|
| CVE-2026-49869 | 新增资料 | [Kestra configs后缀白名单与未认证工作流执行（CVE-2026-49869）](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/Kestra/Kestra%20configs%E5%90%8E%E7%BC%80%E7%99%BD%E5%90%8D%E5%8D%95%E4%B8%8E%E6%9C%AA%E8%AE%A4%E8%AF%81%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%89%A7%E8%A1%8C%EF%BC%88CVE-2026-49869%EF%BC%89.md) |
| CVE-2026-55255 | 新增资料 | [Langflow responses跨用户Flow执行与UUID分支授权缺口（CVE-2026-55255）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Langflow/Langflow%20responses%E8%B7%A8%E7%94%A8%E6%88%B7Flow%E6%89%A7%E8%A1%8C%E4%B8%8EUUID%E5%88%86%E6%94%AF%E6%8E%88%E6%9D%83%E7%BC%BA%E5%8F%A3%EF%BC%88CVE-2026-55255%EF%BC%89.md) |
| CVE-2026-48710 | 新增资料 | [Starlette BadHost路径重建与路由授权视图分裂（CVE-2026-48710）](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Starlette/Starlette%20BadHost%E8%B7%AF%E5%BE%84%E9%87%8D%E5%BB%BA%E4%B8%8E%E8%B7%AF%E7%94%B1%E6%8E%88%E6%9D%83%E8%A7%86%E5%9B%BE%E5%88%86%E8%A3%82%EF%BC%88CVE-2026-48710%EF%BC%89.md) |
| CVE-2026-39987 | 新增资料 | [marimo terminal WebSocket缺少认证与编辑模式前提（CVE-2026-39987）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Marimo/marimo%20terminal%20WebSocket%E7%BC%BA%E5%B0%91%E8%AE%A4%E8%AF%81%E4%B8%8E%E7%BC%96%E8%BE%91%E6%A8%A1%E5%BC%8F%E5%89%8D%E6%8F%90%EF%BC%88CVE-2026-39987%EF%BC%89.md) |
| CVE-2026-48939 | 新增资料 | [iCagenda附件上传PoC的版本差异与批量写入风险（CVE-2026-48939）](../Web%E5%AE%89%E5%85%A8/CMS%E5%86%85%E5%AE%B9/Joomla/iCagenda%E9%99%84%E4%BB%B6%E4%B8%8A%E4%BC%A0PoC%E7%9A%84%E7%89%88%E6%9C%AC%E5%B7%AE%E5%BC%82%E4%B8%8E%E6%89%B9%E9%87%8F%E5%86%99%E5%85%A5%E9%A3%8E%E9%99%A9%EF%BC%88CVE-2026-48939%EF%BC%89.md) |
| CVE-2026-20253 | 新增资料 | [Splunk Sidecar任意文件截断到数据库恢复写入链（CVE-2026-20253）](../Web%E5%AE%89%E5%85%A8/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BD%AF%E4%BB%B6/Splunk/Splunk%20Sidecar%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E6%88%AA%E6%96%AD%E5%88%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E6%81%A2%E5%A4%8D%E5%86%99%E5%85%A5%E9%93%BE%EF%BC%88CVE-2026-20253%EF%BC%89.md) |
| CVE-2026-3055 | 新增资料 | [NetScaler SAML IdP内存越读与会话泄露检测边界（CVE-2026-3055）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Citrix%20NetScaler/NetScaler%20SAML%20IdP%E5%86%85%E5%AD%98%E8%B6%8A%E8%AF%BB%E4%B8%8E%E4%BC%9A%E8%AF%9D%E6%B3%84%E9%9C%B2%E6%A3%80%E6%B5%8B%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2026-3055%EF%BC%89.md) |
| CVE-2026-55040 | 新增资料 | [SharePoint JWT actor token验证缺失与模板假阳性边界（CVE-2026-55040）](../Web%E5%AE%89%E5%85%A8/%E4%BA%91%E5%B9%B3%E5%8F%B0/Microsoft%20SharePoint/SharePoint%20JWT%20actor%20token%E9%AA%8C%E8%AF%81%E7%BC%BA%E5%A4%B1%E4%B8%8E%E6%A8%A1%E6%9D%BF%E5%81%87%E9%98%B3%E6%80%A7%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2026-55040%EF%BC%89.md) |
| CVE-2026-63077 | 新增资料 | [TeamCity agent polling反序列化链与公开模块残留边界（CVE-2026-63077）](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/JetBrains/TeamCity%20agent%20polling%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E9%93%BE%E4%B8%8E%E5%85%AC%E5%BC%80%E6%A8%A1%E5%9D%97%E6%AE%8B%E7%95%99%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2026-63077%EF%BC%89.md) |
| CVE-2025-62593 | 新增资料 | [Ray 浏览器请求判定与 DNS 重绑定边界（CVE-2025-62593）](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/Ray/Ray%20%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AF%B7%E6%B1%82%E5%88%A4%E5%AE%9A%E4%B8%8E%20DNS%20%E9%87%8D%E7%BB%91%E5%AE%9A%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-62593%EF%BC%89.md) |
| CVE-2025-68461 | 新增资料 | [Roundcube SVG animate 命名空间属性过滤修复分析（CVE-2025-68461）](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/Roundcube/Roundcube%20SVG%20animate%20%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E5%B1%9E%E6%80%A7%E8%BF%87%E6%BB%A4%E4%BF%AE%E5%A4%8D%E5%88%86%E6%9E%90%EF%BC%88CVE-2025-68461%EF%BC%89.md) |
| CVE-2025-64328 | 新增资料 | [FreePBX filestore SSH 测试连接命令注入与权限差异（CVE-2025-64328）](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/FreePBX/FreePBX%20filestore%20SSH%20%E6%B5%8B%E8%AF%95%E8%BF%9E%E6%8E%A5%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E4%B8%8E%E6%9D%83%E9%99%90%E5%B7%AE%E5%BC%82%EF%BC%88CVE-2025-64328%EF%BC%89.md) |
| CVE-2025-48703 | 新增资料 | [CWP changePerm 权限参数命令注入与用户前提（CVE-2025-48703）](../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/Control%20Web%20Panel/CWP%20changePerm%20%E6%9D%83%E9%99%90%E5%8F%82%E6%95%B0%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E4%B8%8E%E7%94%A8%E6%88%B7%E5%89%8D%E6%8F%90%EF%BC%88CVE-2025-48703%EF%BC%89.md) |
| CVE-2025-6205; CVE-2025-6204 | 新增资料 | [DELMIA Apriso 账号创建与上传路径穿越链（CVE-2025-6205、6204）](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/DELMIA%20Apriso/DELMIA%20Apriso%20%E8%B4%A6%E5%8F%B7%E5%88%9B%E5%BB%BA%E4%B8%8E%E4%B8%8A%E4%BC%A0%E8%B7%AF%E5%BE%84%E7%A9%BF%E8%B6%8A%E9%93%BE%EF%BC%88CVE-2025-6205%E3%80%816204%EF%BC%89.md) |
| CVE-2025-34026 | 新增资料 | [Versa Concerto 逐跳请求头与 Actuator 认证边界（CVE-2025-34026）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Versa/Versa%20Concerto%20%E9%80%90%E8%B7%B3%E8%AF%B7%E6%B1%82%E5%A4%B4%E4%B8%8E%20Actuator%20%E8%AE%A4%E8%AF%81%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-34026%EF%BC%89.md) |
| CVE-2025-31125 | 新增资料 | [raw 文件访问校验的上游补丁对照（CVE-2025-31125）](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Vite/Vite%20inline/raw%20%E6%96%87%E4%BB%B6%E8%AE%BF%E9%97%AE%E6%A0%A1%E9%AA%8C%E7%9A%84%E4%B8%8A%E6%B8%B8%E8%A1%A5%E4%B8%81%E5%AF%B9%E7%85%A7%EF%BC%88CVE-2025-31125%EF%BC%89.md) |
| CVE-2025-11371 | 新增资料 | [CentreStack 与 TrioFox 临时下载路径穿越及版本检查误差（CVE-2025-11371）](../Web%E5%AE%89%E5%85%A8/%E4%BA%91%E5%B9%B3%E5%8F%B0/CentreStack/CentreStack%20%E4%B8%8E%20TrioFox%20%E4%B8%B4%E6%97%B6%E4%B8%8B%E8%BD%BD%E8%B7%AF%E5%BE%84%E7%A9%BF%E8%B6%8A%E5%8F%8A%E7%89%88%E6%9C%AC%E6%A3%80%E6%9F%A5%E8%AF%AF%E5%B7%AE%EF%BC%88CVE-2025-11371%EF%BC%89.md) |
| CVE-2025-41244 | 新增资料 | [VMware 服务发现执行非受信二进制导致本地提权（CVE-2025-41244）](../Web%E5%AE%89%E5%85%A8/%E4%BA%91%E5%B9%B3%E5%8F%B0/VMware/VMware%20%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0%E6%89%A7%E8%A1%8C%E9%9D%9E%E5%8F%97%E4%BF%A1%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%AF%BC%E8%87%B4%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%EF%BC%88CVE-2025-41244%EF%BC%89.md) |
| CVE-2025-48543 | 新增资料 | [Android ART JNI 可实例化检查与序列化回归测试（CVE-2025-48543）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Android/Android%20ART%20JNI%20%E5%8F%AF%E5%AE%9E%E4%BE%8B%E5%8C%96%E6%A3%80%E6%9F%A5%E4%B8%8E%E5%BA%8F%E5%88%97%E5%8C%96%E5%9B%9E%E5%BD%92%E6%B5%8B%E8%AF%95%EF%BC%88CVE-2025-48543%EF%BC%89.md) |
| CVE-2024-13159 | 新增资料 | [Ivanti EPM GetHashForWildcardRecursive 凭据强制认证资料（CVE-2024-13159）](../Web%E5%AE%89%E5%85%A8/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BD%AF%E4%BB%B6/Ivanti/Ivanti%20EPM%20GetHashForWildcardRecursive%20%E5%87%AD%E6%8D%AE%E5%BC%BA%E5%88%B6%E8%AE%A4%E8%AF%81%E8%B5%84%E6%96%99%EF%BC%88CVE-2024-13159%EF%BC%89.md) |
| CVE-2024-13160 | 新增资料 | [Ivanti EPM GetHashForWildcard 凭据强制认证资料（CVE-2024-13160）](../Web%E5%AE%89%E5%85%A8/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BD%AF%E4%BB%B6/Ivanti/Ivanti%20EPM%20GetHashForWildcard%20%E5%87%AD%E6%8D%AE%E5%BC%BA%E5%88%B6%E8%AE%A4%E8%AF%81%E8%B5%84%E6%96%99%EF%BC%88CVE-2024-13160%EF%BC%89.md) |
| CVE-2024-13161 | 新增资料 | [Ivanti EPM GetHashForSingleFile 凭据强制认证资料（CVE-2024-13161）](../Web%E5%AE%89%E5%85%A8/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BD%AF%E4%BB%B6/Ivanti/Ivanti%20EPM%20GetHashForSingleFile%20%E5%87%AD%E6%8D%AE%E5%BC%BA%E5%88%B6%E8%AE%A4%E8%AF%81%E8%B5%84%E6%96%99%EF%BC%88CVE-2024-13161%EF%BC%89.md) |
| CVE-2024-7593 | 新增资料 | [Ivanti vTM 本地管理员创建鉴权绕过（CVE-2024-7593）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/Ivanti%20vTM%20%E6%9C%AC%E5%9C%B0%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E9%89%B4%E6%9D%83%E7%BB%95%E8%BF%87%EF%BC%88CVE-2024-7593%EF%BC%89.md) |
| CVE-2024-41713; CVE-2024-55550 | 既有主文补证 | [Mitel MiCollab 企业协作平台 任意文件读取漏洞(CVE-2024-41713)](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Mitel%20MiCollab%20%E4%BC%81%E4%B8%9A%E5%8D%8F%E4%BD%9C%E5%B9%B3%E5%8F%B0/Mitel%20MiCollab%20%E4%BC%81%E4%B8%9A%E5%8D%8F%E4%BD%9C%E5%B9%B3%E5%8F%B0%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%28CVE-2024-41713%29.md) |
| CVE-2024-9463 | 既有主文补证 | [Palo Alto Networks Expedition 远程命令执行漏洞(CVE-2024-9463)](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/Palo%20Alto%20Networks%20Expedition%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%28CVE-2024-9463%29.md) |
| CVE-2024-3272; CVE-2024-3273 | 既有主文补证 | [D-Link NAS 未授权RCE漏洞(CVE-2024-3273)](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/D-Link/D-Link%20NAS%20%E6%9C%AA%E6%8E%88%E6%9D%83RCE%E6%BC%8F%E6%B4%9E%28CVE-2024-3273%29.md) |
| CVE-2024-48248 | 既有主文补证 | [NAKIVO Backup & Replication任意文件读取漏洞(CVE-2024-48248)](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/NAKIVO%20Backup%20%26%20Replication%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E%28CVE-2024-48248%29.md) |
| CVE-2024-28987 | 既有主文补证 | [【PoC】SolarWinds Web Help Desk (CVE-2024-28987)严重漏洞的 PoC 已发布](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%90PoC%E3%80%91SolarWinds%20Web%20Help%20Desk%20%28CVE-2024-28987%29%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E7%9A%84%20PoC%20%E5%B7%B2%E5%8F%91%E5%B8%83.md) |
| CVE-2024-1709 | 既有主文补证 | [CVE-2024-1709](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVE-2024-1709.md) |
| CVE-2024-57727 | 既有主文补证 | [关键的 SimpleHelp 缺陷允许文件盗窃、权限提升和 RCE 攻击](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/SimpleHelp/%E5%85%B3%E9%94%AE%E7%9A%84%20SimpleHelp%20%E7%BC%BA%E9%99%B7%E5%85%81%E8%AE%B8%E6%96%87%E4%BB%B6%E7%9B%97%E7%AA%83%E3%80%81%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E5%92%8C%20RCE%20%E6%94%BB%E5%87%BB.md) |
| CVE-2026-94127 | 既有主文补证 | [（CVE-2026-94127）F5 BIG-IP APM OAuth授权服务器远程代码执行漏洞](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/F5%20BIG-IP/%EF%BC%88CVE-2026-94127%EF%BC%89F5%20BIG-IP%20APM%20OAuth%E6%8E%88%E6%9D%83%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md) |
| CVE-2026-86060 | 既有主文补证 | [CVE-2026-67276  RouterOS SSH公钥认证绕过漏洞（POC）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/MikroTik%20RouterOS/CVE-2026-67276%20%20RouterOS%20SSH%E5%85%AC%E9%92%A5%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E%EF%BC%88POC%EF%BC%89.md) |
| CVE-2026-82329 | 既有主文补证 | [（CVE-2026-82329）JFrog Artifactory空join key认证绕过漏洞](../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/JFrog/%EF%BC%88CVE-2026-82329%EF%BC%89JFrog%20Artifactory%E7%A9%BAjoin%20key%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md) |
| CVE-2026-8037 | 既有主文补证 | [【已支持检测】预认证即可利用！Kemp LoadMaster 堆内存缺陷导致命令注入远程代码执行漏洞CVE-2026-](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%90%E5%B7%B2%E6%94%AF%E6%8C%81%E6%A3%80%E6%B5%8B%E3%80%91%E9%A2%84%E8%AE%A4%E8%AF%81%E5%8D%B3%E5%8F%AF%E5%88%A9%E7%94%A8%EF%BC%81Kemp%20LoadMaster%20%E5%A0%86%E5%86%85%E5%AD%98%E7%BC%BA%E9%99%B7%E5%AF%BC%E8%87%B4%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9ECVE-2026-.md) |
| CVE-2026-42208 | 既有主文补证 | [AI大模型网关存在SQL注入漏洞、附 POC 复现、影响版本LiteLLM 1.81.16~1.83.7（CVE-2026-42208）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/AI%E7%BB%BC%E5%90%88/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B%E7%BD%91%E5%85%B3%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%E3%80%81%E9%99%84%20POC%20%E5%A4%8D%E7%8E%B0%E3%80%81%E5%BD%B1%E5%93%8D%E7%89%88%E6%9C%ACLiteLLM%201.81.16~1.83.7%EF%BC%88CVE-2026-42208%EF%BC%89.md) |
| CVE-2026-34486 | 既有主文补证 | [Apache-Tomcat-Tribes-EncryptInterceptor-绕过远程代码执行漏洞-CVE-2026-34486](../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Apache%20Tomcat/Apache-Tomcat-Tribes-EncryptInterceptor-%E7%BB%95%E8%BF%87%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2026-34486.md) |
| CVE-2026-33017 | 既有主文补证 | [AI用户务必关注，Langflow未授权RCE分析（CVE-2026-33017）](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/AI%E7%BB%BC%E5%90%88/AI%E7%94%A8%E6%88%B7%E5%8A%A1%E5%BF%85%E5%85%B3%E6%B3%A8%EF%BC%8CLangflow%E6%9C%AA%E6%8E%88%E6%9D%83RCE%E5%88%86%E6%9E%90%EF%BC%88CVE-2026-33017%EF%BC%89.md) |
| CVE-2026-23760 | 既有主文补证 | [CVE-2026-23760](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/SmarterMail/CVE-2026-23760.md) |
| CVE-2026-81578; CVE-2026-82078 | 新增资料 | [PaperCut-Tapestry配置绕过与外部用户查询代码执行链-CVE-2026-81578-82078](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/PaperCut/PaperCut-Tapestry%E9%85%8D%E7%BD%AE%E7%BB%95%E8%BF%87%E4%B8%8E%E5%A4%96%E9%83%A8%E7%94%A8%E6%88%B7%E6%9F%A5%E8%AF%A2%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E9%93%BE-CVE-2026-81578-82078.md) |
| CVE-2026-83548; CVE-2026-83549 | 新增资料 | [SMA1000-OPTIONS-CouchDB-SNMP链-CVE-2026-83548-83549](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/SonicWall/SMA1000-OPTIONS-CouchDB-SNMP%E9%93%BE-CVE-2026-83548-83549.md) |
| CVE-2026-60004 | 新增资料 | [Gitea-diffpatch双次补丁Git-hook执行-CVE-2026-60004](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Gitea/Gitea-diffpatch%E5%8F%8C%E6%AC%A1%E8%A1%A5%E4%B8%81Git-hook%E6%89%A7%E8%A1%8C-CVE-2026-60004.md) |
| CVE-2026-64849 | 新增资料 | [MLflow-Webhook重定向DNS重绑定SSRF-CVE-2026-64849](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/MLflow/MLflow-Webhook%E9%87%8D%E5%AE%9A%E5%90%91DNS%E9%87%8D%E7%BB%91%E5%AE%9ASSRF-CVE-2026-64849.md) |
| CVE-2026-71362 | 新增资料 | [Magento客户会话身份切换-CVE-2026-71362](../Web%E5%AE%89%E5%85%A8/CMS%E5%86%85%E5%AE%B9/Magento/Magento%E5%AE%A2%E6%88%B7%E4%BC%9A%E8%AF%9D%E8%BA%AB%E4%BB%BD%E5%88%87%E6%8D%A2-CVE-2026-71362.md) |
| CVE-2026-19490 | 新增资料 | [NetScaler-SAML-RelayState错误码混淆-CVE-2026-19490](../Web%E5%AE%89%E5%85%A8/%E4%BA%91%E5%B9%B3%E5%8F%B0/Citrix/NetScaler-SAML-RelayState%E9%94%99%E8%AF%AF%E7%A0%81%E6%B7%B7%E6%B7%86-CVE-2026-19490.md) |
| CVE-2026-67279 | 新增资料 | [RouterOS预认证rekey与SSH策略链分析-CVE-2026-67279](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/MikroTik%20RouterOS/RouterOS%E9%A2%84%E8%AE%A4%E8%AF%81rekey%E4%B8%8ESSH%E7%AD%96%E7%95%A5%E9%93%BE%E5%88%86%E6%9E%90-CVE-2026-67279.md) |
| CVE-2026-73570 | 新增资料 | [Zimbra-SMTP日志Swatchdog命令注入-CVE-2026-73570](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/Zimbra/Zimbra-SMTP%E6%97%A5%E5%BF%97Swatchdog%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5-CVE-2026-73570.md) |
| CVE-2025-29635 | 既有主文补证 | [（CVE-2025-29635）D-Link DIR-823X命令注入漏洞](../IOT%E5%AE%89%E5%85%A8/D-Link/%EF%BC%88CVE-2025-29635%EF%BC%89D-Link%20DIR-823X%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md) |
| CVE-2025-3248 | 既有主文补证 | [Langflow-code-API-未授权远程代码执行漏洞-CVE-2025-3248](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Langflow/Langflow-code-API-%E6%9C%AA%E6%8E%88%E6%9D%83%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2025-3248.md) |
| CVE-2025-34291 | 既有主文补证 | [Langflow-≤-1.6.9-CORS-配置错误导致令牌劫持和远程命令执行漏洞-CVE-2025-34291](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/Langflow/Langflow-%E2%89%A4-1.6.9-CORS-%E9%85%8D%E7%BD%AE%E9%94%99%E8%AF%AF%E5%AF%BC%E8%87%B4%E4%BB%A4%E7%89%8C%E5%8A%AB%E6%8C%81%E5%92%8C%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2025-34291.md) |
| CVE-2025-68613 | 既有主文补证 | [n8n-表达式沙箱逃逸导致远程代码执行漏洞-CVE-2025-68613](../Web%E5%AE%89%E5%85%A8/AI%E5%BA%94%E7%94%A8/n8n/n8n-%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B2%99%E7%AE%B1%E9%80%83%E9%80%B8%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2025-68613.md) |
| CVE-2009-1151 | 新增资料 | [phpMyAdmin setup配置保存注入与后续漏洞分界（CVE-2009-1151）](../Web%E5%AE%89%E5%85%A8/%E6%95%B0%E6%8D%AE%E5%BA%93/Phpmyadmin/phpMyAdmin%20setup%E9%85%8D%E7%BD%AE%E4%BF%9D%E5%AD%98%E6%B3%A8%E5%85%A5%E4%B8%8E%E5%90%8E%E7%BB%AD%E6%BC%8F%E6%B4%9E%E5%88%86%E7%95%8C%EF%BC%88CVE-2009-1151%EF%BC%89.md) |
| CVE-2007-3010 | 新增资料 | [OmniPCX masterCGI ping命令拼接与单次执行限制（CVE-2007-3010）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Alcatel-Lucent/OmniPCX%20masterCGI%20ping%E5%91%BD%E4%BB%A4%E6%8B%BC%E6%8E%A5%E4%B8%8E%E5%8D%95%E6%AC%A1%E6%89%A7%E8%A1%8C%E9%99%90%E5%88%B6%EF%BC%88CVE-2007-3010%EF%BC%89.md) |
| CVE-2005-2773 | 新增资料 | [HP OpenView connectedNodes命令注入与回显差异（CVE-2005-2773）](../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/HP%20OpenView/HP%20OpenView%20connectedNodes%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E4%B8%8E%E5%9B%9E%E6%98%BE%E5%B7%AE%E5%BC%82%EF%BC%88CVE-2005-2773%EF%BC%89.md) |
| CVE-2025-24085 | 新增资料 | [Apple CoreMedia Remaker 轨道对象释放与公开崩溃 PoC（CVE-2025-24085）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/iOS/Apple%20CoreMedia%20Remaker%20%E8%BD%A8%E9%81%93%E5%AF%B9%E8%B1%A1%E9%87%8A%E6%94%BE%E4%B8%8E%E5%85%AC%E5%BC%80%E5%B4%A9%E6%BA%83%20PoC%EF%BC%88CVE-2025-24085%EF%BC%89.md) |
| CVE-2025-24985 | 新增资料 | [Windows FastFAT 簇计数溢出与 BSOD 证据边界（CVE-2025-24985）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/Windows%20FastFAT%20%E7%B0%87%E8%AE%A1%E6%95%B0%E6%BA%A2%E5%87%BA%E4%B8%8E%20BSOD%20%E8%AF%81%E6%8D%AE%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-24985%EF%BC%89.md) |
| CVE-2025-25181 | 新增资料 | [VeraCore timeoutWarning SQL 注入的公开请求与错误回显（CVE-2025-25181）](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Advantive%20VeraCore/VeraCore%20timeoutWarning%20SQL%20%E6%B3%A8%E5%85%A5%E7%9A%84%E5%85%AC%E5%BC%80%E8%AF%B7%E6%B1%82%E4%B8%8E%E9%94%99%E8%AF%AF%E5%9B%9E%E6%98%BE%EF%BC%88CVE-2025-25181%EF%BC%89.md) |
| CVE-2025-31200 | 新增资料 | [Apple APAC 声道映射长度失配与公开音频崩溃验证（CVE-2025-31200）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/macOS/Apple%20APAC%20%E5%A3%B0%E9%81%93%E6%98%A0%E5%B0%84%E9%95%BF%E5%BA%A6%E5%A4%B1%E9%85%8D%E4%B8%8E%E5%85%AC%E5%BC%80%E9%9F%B3%E9%A2%91%E5%B4%A9%E6%BA%83%E9%AA%8C%E8%AF%81%EF%BC%88CVE-2025-31200%EF%BC%89.md) |
| CVE-2025-32756 | 新增资料 | [FortiMail APSCOOKIE AuthHash 溢出的公开触发与错误 PoC 归属（CVE-2025-32756）](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/Fortinet%20FortiMail/FortiMail%20APSCOOKIE%20AuthHash%20%E6%BA%A2%E5%87%BA%E7%9A%84%E5%85%AC%E5%BC%80%E8%A7%A6%E5%8F%91%E4%B8%8E%E9%94%99%E8%AF%AF%20PoC%20%E5%BD%92%E5%B1%9E%EF%BC%88CVE-2025-32756%EF%BC%89.md) |
| CVE-2025-47827 | 新增资料 | [IGEL OS 10 未验证 SquashFS 启动链与公开镜像构造 PoC（CVE-2025-47827）](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/IGEL%20OS/IGEL%20OS%2010%20%E6%9C%AA%E9%AA%8C%E8%AF%81%20SquashFS%20%E5%90%AF%E5%8A%A8%E9%93%BE%E4%B8%8E%E5%85%AC%E5%BC%80%E9%95%9C%E5%83%8F%E6%9E%84%E9%80%A0%20PoC%EF%BC%88CVE-2025-47827%EF%BC%89.md) |
| CVE-2025-48927; CVE-2025-48928 | 新增资料 | [TeleMessage heapdump 暴露与内存凭据的公开手工验证材料（CVE-2025-48927、48928）](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/TeleMessage/TeleMessage%20heapdump%20%E6%9A%B4%E9%9C%B2%E4%B8%8E%E5%86%85%E5%AD%98%E5%87%AD%E6%8D%AE%E7%9A%84%E5%85%AC%E5%BC%80%E6%89%8B%E5%B7%A5%E9%AA%8C%E8%AF%81%E6%9D%90%E6%96%99%EF%BC%88CVE-2025-48927%E3%80%8148928%EF%BC%89.md) |
| CVE-2025-49704; CVE-2025-49706 | 新增资料 | [SharePoint ToolPane 公开利用代码与两代补丁边界（CVE-2025-49704、49706）](../Web%E5%AE%89%E5%85%A8/%E4%BA%91%E5%B9%B3%E5%8F%B0/Microsoft%20SharePoint/SharePoint%20ToolPane%20%E5%85%AC%E5%BC%80%E5%88%A9%E7%94%A8%E4%BB%A3%E7%A0%81%E4%B8%8E%E4%B8%A4%E4%BB%A3%E8%A1%A5%E4%B8%81%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-49704%E3%80%8149706%EF%BC%89.md) |
| CVE-2025-68686 | 新增资料 | [FortiOS 符号链接持久化补丁的路径规范化绕过（CVE-2025-68686）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/FortiOS%20%E7%AC%A6%E5%8F%B7%E9%93%BE%E6%8E%A5%E6%8C%81%E4%B9%85%E5%8C%96%E8%A1%A5%E4%B8%81%E7%9A%84%E8%B7%AF%E5%BE%84%E8%A7%84%E8%8C%83%E5%8C%96%E7%BB%95%E8%BF%87%EF%BC%88CVE-2025-68686%EF%BC%89.md) |
| CVE-2025-9242 | 新增资料 | [WatchGuard Fireware IKEv2 越界写公开验证与探针边界（CVE-2025-9242）](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/WatchGuard/WatchGuard%20Fireware%20IKEv2%20%E8%B6%8A%E7%95%8C%E5%86%99%E5%85%AC%E5%BC%80%E9%AA%8C%E8%AF%81%E4%B8%8E%E6%8E%A2%E9%92%88%E8%BE%B9%E7%95%8C%EF%BC%88CVE-2025-9242%EF%BC%89.md) |
| CVE-2026-0257 | 既有主文补证 | [CVE-2026-0257 _ Palo Alto Networks PAN-OS GlobalProtect Authentication](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Palo%20Alto/CVE-2026-0257%20_%20Palo%20Alto%20Networks%20PAN-OS%20GlobalProtect%20Authentication.md) |
| CVE-2026-24061 | 既有主文补证 | [CVE-2026-24061：GNU InetUtils Telnetd 身份验证绕过漏洞](../Web%E5%AE%89%E5%85%A8/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BD%AF%E4%BB%B6/GNU/CVE-2026-24061%EF%BC%9AGNU%20InetUtils%20Telnetd%20%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md) |
| CVE-2025-40536; CVE-2025-40551 | 既有主文补证 | [【CVE-2025-40551】：Solarwinds Web Help Desk又一处反序列化漏洞](../Web%E5%AE%89%E5%85%A8/%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%BD%AF%E4%BB%B6/SolarWinds/%E3%80%90CVE-2025-40551%E3%80%91%EF%BC%9ASolarwinds%20Web%20Help%20Desk%E5%8F%88%E4%B8%80%E5%A4%84%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E6%BC%8F%E6%B4%9E.md) |
| CVE-2026-10520 | 既有主文补证 | [CVE-2026-10520 _ Ivanti Sentry Pre-Authenticated OS Command Injection](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/CVE-2026-10520%20_%20Ivanti%20Sentry%20Pre-Authenticated%20OS%20Command%20Injection.md) |
| CVE-2026-41940 | 既有主文补证 | [CVE-2026-41940 cPanel-WHM 认证绕过漏洞复现](../Web%E5%AE%89%E5%85%A8/%E8%BF%90%E7%BB%B4%E9%9D%A2%E6%9D%BF/LiteSpeed%20cPanel/CVE-2026-41940%20cPanel-WHM%20%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md) |
| CVE-2026-9586 | 新增资料 | [Switchvox pa端点PhoneIP SQL注入与公开模板判定（CVE-2026-9586）](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Sangoma/Switchvox%20pa%E7%AB%AF%E7%82%B9PhoneIP%20SQL%E6%B3%A8%E5%85%A5%E4%B8%8E%E5%85%AC%E5%BC%80%E6%A8%A1%E6%9D%BF%E5%88%A4%E5%AE%9A%EF%BC%88CVE-2026-9586%EF%BC%89.md) |
| CVE-2010-2861 | 既有主文补证 | [（CVE-2010-2861）Adobe ColdFusion 文件读取漏洞](../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Adobe%20ColdFusion/%EF%BC%88CVE-2010-2861%EF%BC%89Adobe%20ColdFusion%20%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md) |
| CVE-2024-0769 | 新增资料 | [D-Link DIR-859 hedwig.cgi 路径穿越与凭据泄露 CVE-2024-0769](../IOT%E5%AE%89%E5%85%A8/D-Link/D-Link%20DIR-859%20hedwig.cgi%20%E8%B7%AF%E5%BE%84%E7%A9%BF%E8%B6%8A%E4%B8%8E%E5%87%AD%E6%8D%AE%E6%B3%84%E9%9C%B2%20CVE-2024-0769.md) |
| CVE-2024-41710 | 新增资料 | [Mitel SIP 电话配置换行注入 CVE-2024-41710](../IOT%E5%AE%89%E5%85%A8/Mitel/Mitel%20SIP%20%E7%94%B5%E8%AF%9D%E9%85%8D%E7%BD%AE%E6%8D%A2%E8%A1%8C%E6%B3%A8%E5%85%A5%20CVE-2024-41710.md) |
| CVE-2024-27348 | 既有主文补证 | [Apache-HugeGraph-远程代码执行漏洞-CVE-2024-27348](../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Apache%20HugeGraph/Apache-HugeGraph-%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E-CVE-2024-27348.md) |
| CVE-2024-23897 | 既有主文补证 | [Jenkins-CLI-接口任意文件读取漏洞-CVE-2024-23897](../Web%E5%AE%89%E5%85%A8/%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6/Jenkins/Jenkins-CLI-%E6%8E%A5%E5%8F%A3%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E-CVE-2024-23897.md) |
| CVE-2024-1212 | 既有主文补证 | [CVE-2024-1212](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVE-2024-1212.md) |
| CVE-2024-20767 | 既有主文补证 | [CVE-2024-20767](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVE-2024-20767.md) |
| CVE-2024-37383 | 既有主文补证 | [CVE-2024-37383](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVE-2024-37383.md) |
| CVE-2024-11680 | 既有主文补证 | [【漏洞复现】CVE-2024-11680](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%90%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%E3%80%91CVE-2024-11680.md) |
| CVE-2024-32113 | 既有主文补证 | [Apache OfBiz CVE-2024-32113和CVE-2024-36104 漏洞 POC](../Web%E5%AE%89%E5%85%A8/%E4%B8%AD%E9%97%B4%E4%BB%B6/Apache%20OFBiz/Apache%20OfBiz%20CVE-2024-32113%E5%92%8CCVE-2024-36104%20%E6%BC%8F%E6%B4%9E%20POC.md) |
| CVE-2024-21893 | 既有主文补证 | [CVE-2024-21893影响Ivanti产品](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Ivanti/CVE-2024-21893%E5%BD%B1%E5%93%8DIvanti%E4%BA%A7%E5%93%81.md) |
| CVE-2024-12356 | 既有主文补证 | [（CVE-2024-12356）BeyondTrust PRA-RS未授权命令注入漏洞](../Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/BeyondTrust%20PAM/%EF%BC%88CVE-2024-12356%EF%BC%89BeyondTrust%20PRA-RS%E6%9C%AA%E6%8E%88%E6%9D%83%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md) |
| CVE-2024-55956 | 既有主文补证 | [（CVE-2024-55956）Cleo Harmony VLTrader LexiCom未认证文件写入远程代码执行漏洞](../Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Cleo/%EF%BC%88CVE-2024-55956%EF%BC%89Cleo%20Harmony%20VLTrader%20LexiCom%E6%9C%AA%E8%AE%A4%E8%AF%81%E6%96%87%E4%BB%B6%E5%86%99%E5%85%A5%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md) |
| CVE-2024-8963; CVE-2024-8190 | 既有主文补证 | [【漏洞复现】CVE-2024-8963、CVE-2024-8190](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%90%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0%E3%80%91CVE-2024-8963%E3%80%81CVE-2024-8190.md) |
| CVE-2024-12987 | 新增资料 | [DrayTek apmcfgupload session 命令注入 CVE-2024-12987](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/DrayTek/DrayTek%20apmcfgupload%20session%20%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%20CVE-2024-12987.md) |
| CVE-2024-20439 | 新增资料 | [Cisco Smart Licensing Utility 静态管理凭据 CVE-2024-20439](../Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cisco/Cisco%20Smart%20Licensing%20Utility%20%E9%9D%99%E6%80%81%E7%AE%A1%E7%90%86%E5%87%AD%E6%8D%AE%20CVE-2024-20439.md) |
| CVE-2024-45519 | 新增资料 | [Zimbra postjournal SMTP 命令注入 CVE-2024-45519](../Web%E5%AE%89%E5%85%A8/%E9%82%AE%E4%BB%B6%E7%B3%BB%E7%BB%9F/Zimbra/Zimbra%20postjournal%20SMTP%20%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%20CVE-2024-45519.md) |

## 维护和验证

所有源代码、引文与公开测试值均保持原值；本轮没有脱敏、执行 PoC、访问样例目标或安装利用依赖。中文稿为原始资料的多来源独立整理，具体原作者、固定提交、前提、版本分支、失败对照与副作用见各篇。未实际查看的图片不作为已验证证据。原有历史正文和资源保留，校订在原示例之外。

本批知识库测试、构建、基线差异和展示核验结果随 PR 记录；无新增质量债不等于全库无遗留警告，也不等于漏洞已复现。

## 合并最新主分支后的复核

2026-10-03，PR10 已合并。本批同步主分支 `dbf87349c84e537c233b4231a1164e60fa52eca3`，保留其全库排版修正及公开资料；六个派生文件冲突由 `scripts/wiki.py build` 重新生成。相对这个新基线仍只有本批 53 篇（34 新增、19 补证），不把主分支新合入的文件计入本批。

最新静态检查：71 项测试通过；构建和重建检查一致；0 errors、0 fatal、0 new issues，5080 项历史警告，未修改 baseline。公开材料门槛的原有决定不因合并或 CI 通过而改变；全量 1727 项的技术审查仍未完成。

使用官方 npm 包 Marked 4.3.0 运行 21 项渲染工具测试，全部通过。全库 5743 篇机器解析有 8 处待判读提示、0 结构性阻断；这 8 处均与新 master 字节相同，不属于本批新增或补证文件，不冒称为全库全文审阅。另对本批 53 篇作 Pandoc 静态渲染，57 块围栏代码文本保持原值。

## 严格门槛续批与范围

本次新增12个2025候选编号及6个补证编号，都有可定位的具体公开输入。SolarWinds仅确认具体对象参数/请求材料可审阅，不把完整RCE、全部载荷辅助实现或40537计入本次通过范围。Sentry有原始HTTP输入和命令输出依据。WatchGuard补全配置条件，SharePoint与IGEL补读专用生成辅助源。全部15篇均经独立最终字节复核；先前33篇撤稿和7处撤补不变。

Edimax1316尚缺已审下游载荷和独立验证结果；UniFi原研究未清楚划分34908/34909，而独立CNA不能把具体请求映射至34908，故二者不因宽松分析标签通过。

完整1727项技术审阅仍在继续。2023年165项及2024年桌面/浏览器50项因平台审阅阻断停止，未重试或转交；阻断不代表没有公开材料。其他已审来源集的暂缓也不代表全网不存在PoC。机器清点、库文阅读、技术来源全文阅读和图片检查分别记录。

续批最终静态验收：71项知识库测试通过，0errors、0fatal、0newissues，5080项历史警告；68篇Pandoc渲染及103块围栏代码文本保真。Marked4.3.0扫描5753篇、0结构阻断，8处提示仍逐字等同新master；机器扫描不冒称全库全文审阅。baseline不变。

### 随后主分支同步

发表续批前，主分支更新为 `b176eecef836688c637e60c94284ccec1f1427c5`。本分支保留其23个文件改动；本批68篇与这些正文改动没有交集，全部已审SHA-256不变。两处派生JSON冲突由生成器重建。

新主分支为渲染检查新增空图片/空链接规则，因此重新运行：71项Python测试、22项渲染工具测试通过；5753篇机器扫描有178处提示，0结构阻断。全部178处按路径、规则、完整原文及出现次数，与新master解析结果逐项比较相同，没有本批新增提示。178不等于178篇，也不把规则新增发现误写为本批回归。0errors、0fatal、0newissues，5080项历史警告；baseline未改。

## 全量逐编号进度核对

已按1727个不同CVE逐项核算，阅读与资格分别统计，见[逐项阅读与处置](KEV-REVIEW-PROGRESS-20261003.json)。本次冻结阅读检查点：315完整技术正文、45技术选段、85仅既有文章正文、142限定公告/检索、215旧阻断范围的阅读限制、887待读及38阅读回执尚未到，合计1727。已有阅读/检索记录587项；38项不等于确认没有阅读。完整主文件阅读不代表所有helper、二进制或依赖已审，也不等于准入。

平台阻断工作范围独立计256项：2023年165、2024桌面/浏览器50、新增2014–2015来源缺口41。新增41项保留阻断前3项选段、4项库文、34项有界检索事实；没有将这些事实删除或改成未读，也没有重试、转交或绕行。故256不能加进上述阅读分区再求和。

叠加本轮出版后的处置：95已纳入Draft分支、59待同行复核或必要修订、16已有充分覆盖、318限定来源集内暂缓、256平台阻断、983待研究，共1727。暂缓不表示全网没有PoC；清点完成也不表示技术审阅全部完成。此检查点之后的旧年阅读和作者提案等待下一份逐ID合并，不提前记为准入。

ProjectSend11680及Ivanti8963/8190的旧frontmatter仍保留原有空主编号/unknown角色；本次补充未无记录地改写这些元数据，材料关联编号不等于它们已经进入主CVE导航。原始93篇纠正记录、撤回33新稿和7处本轮追加的历史保持不变。
