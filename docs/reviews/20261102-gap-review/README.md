# 2026-11-02 热门披露补漏复核

本次从 master `b07631dfdfd6a36b2985cf6a45fbe8e2c19e1c65` 起步，重读仓库规则与 schema；01:52 与 02:04 UTC 两次开放 PR 列表均为空。对最近 7 天增量作重点补漏，向前追溯 14–30 天详细披露/实质更新；不能把数据库更新日期当首次披露。此前逐源覆盖和失败台账见[本周首轮](../20261102-weekly/README.md)，本次不覆盖该记录或推进未完整读取来源的成功游标。

## 准入与已有内容保护

10 篇新增原创中文技术整理，另给已有 Brotli 文追加 WordPress 特定镜像入口。本批选入条目均有实际公开触发输入、代码或请求；这是本批筛选范围，不改变 CONTRIBUTING.md 允许独立原理、源码分析、失败实验和带具体待核提醒材料保留入口的规则，也不要求维护者复现。无 PoC 执行、依赖安装或目标扫描。全部 6050 篇原正文逐一比较 SHA-256，仅 Brotli 有追加且原始字节为完整前缀；不改旧源码/示例、不整篇回滚，不删除或遮盖任何原始值。旧 PiFlow 与本次新增无关，保持原样。

|新增/更新|具体准入证据与静态审阅|日期/关键边界|
|---|---|---|
|node-forge119186|固定236845d96c71207259f91638d0138bba8e2fd624四文件修复差异、完整193行回归用例、GCM主体、截断逻辑、包/入口/webpack/工作流；独立复核通过|10月27公告，29日CNA；仅零值tagLength，默认128不受该路径影响|
|Linux timer98260|InfinityCore8509bf657cbcf7d2456fd365460ef27c430f745c完整Ubuntu C、README、Android占位声明、完整23项树|10月6CNA、16日公开timer；Ubuntu7.0.0-30目标，不把Android占位当代码；04755文件/root shell/停驻属显式危险副作用|
|Wasmtime115893|ab15235671d66328be3f38f973c47e3c0568ae6e完整36项树/30文件；28非图逐Git blob校验，2份WAT全部字节结构与生成器/汇编对应；两图未用|19日公告、27日PoC；ARM64/特定49.0.3；脚本删除marker、载荷替换宿主进程；不是root或容器逃逸|
|svg-hush/xml|旧820d3751d686a605a62a773b6f82ced1beed9efa与xml798543db49000767ff4dae131fd2a9ea5fe7310b源码、manifest/lock/测试/工作流；完整公开回归输入|28日研究、8月6补丁；xml1.3 Changelog与标签冲突，核实1.4含修复；不认证整个Cloudflare当前链|
|AEM48359|原作者完整手工XSD/DTD/HTTP；Apache2.2.3固定9df9c3614aaf87ce870abb4009eee4f00d8f0ed0相关read/parse方法、父/模块POM与417项树|7月14CVE、10月15详细研究；仅XXE，闭源组件与全依赖未审；另一XSS环节sandbox冲突未猜补|
|MLflow115886|官方完整PoC与四文件修复bac30b4148c4f40045b4d4db07ae60ab3838803f；Nuclei ca848f19b9ed1decd4b0ccfe6bc22304158f32fd完整三请求与两工作流|22日披露；需TruLens/LiteLLM可选依赖；自选canary不等于服务器密钥泄露|
|Flowise58434|新模块57b0c9bde0be31453524f410588e8c1343a022e8两文件全读；固定3.0.5/3.0.6服务、控制器、路由、sanitize；Gemfile/lock/入口/工作流|2025年漏洞、10月28新模块；证实3.0.5仍泄露，3.0.6移除；实际更改密码，不是只读检测|
|Linux TCP98432|offline-ant9d3559d96bc1f0c1080999497764f3e73f2a3954全部22文本文件/子模块指针；固定内核RCU修复|15日CNA、30日代码；仅KASAN UAF证据，nokaslr；补丁对照超时inconclusive而非完整验收|
|OAuthLib118669|官方完整内存请求PoC、修复c951a1d09f99f14e3240973fa83c4f4287d4753d；3.3.1固定a2779c65b3e961f1b49c05a2417c0ae819f3f8c4包/入口/依赖/工作流|24日披露、30日DB；4.0.0于9月28已发布；需低权限客户端凭据|
|imgproxy ICO|官方23字节生成器/请求、固定39fd9e844a8a46084161502e993d5a3c16ccf28d补丁与icoload.c|6日公告、30日DB；4.0.17于9月30修复；1字节样本测4.0.15，不能外推相同输入覆盖全部旧版|
|Brotli WordPress追加|caveeroo44bf548b43b966b259dc584f85d527cb099818a9全部9文件/1102行；3镜像digest与rootless固定实验|28日代码；特定镜像响应解码入口，非WordPress Core新内存漏洞；未审镜像内部供应链，成功仅作者主张|

各正文给出原作者、固定源码、许可证依据、完整来源及副作用。未明许可的长文与代码只写原创综述并链接，不整篇逐句翻译。没有将第三方Actions、全部依赖或未读图片冒充审计完成；静态检查不是安全认证。

## 具体证据冲突与待查（不进入正文）

- **Orange Edge五漏洞链**：10月28原文和固定slides8ed6c4e66691b8e8b20f23543cfe55a89a84b423可读，有具体步骤；精确受影响构建/五环对应未定。MSRC45492/45494/45495共同致谢Orange且均列148.0.3967.70，但官方FAQ所述VBS/域名前缀欺骗与原文不能直接一一对应。不得只凭同作者/日期硬套编号；58608是旁述打印机问题，不是浏览器链编号。来源：https://blog.orange.tw/posts/2026-10-the-last-proof-of-human-craft-browser-full-chain/ 、https://msrc.microsoft.com/csaf/advisories/2026/msrc_cve-2026-45495.json 、https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnotes-security 。Slides只抽取文本和关键词检查，未逐页视觉核验。
- **CoreGraphics**：先前固定ef20b59来源未出现解决Type5/CMap编号对应的新材料，仍待查。
- **Cisco SEG**：Rapid7307953cdb29dcd8234cec97931d4c6d60ec9c62a的350行模块、193行说明与SMTPDeliver已读，有真实触发链；76443仅候选、76461仅引用，厂商分组公告未证明该模块对应在野编号。暂不新增正文，避免准确性缺口；不是因没有PoC。
- **Synology13639/13684**：https://www.synology.com/en-global/security/advisory/Synology_SA_26_13 于9月18发布；本次找到SHIFox8/synology-dsm-vuln-scanner仅版本/接口探测，未找到实际触发材料，不把聚合站PoC标签当证明。
- **mcp-chrome102878**：原作者issue384实际9月4，PR383仍开放；模板GET/ping仅证明相关CORS行为，不能证明全MCP控制或“最新版已修复”。
- **AEM完整链**：原文DownloadServlet源码已设CSP sandbox、所示HTTP未说明为何消失；Adobe2024提交18694ef650f936970720ffc370db7497a20ac7d9确有头与测试。仅收有独立对应的48359；48252/48263在公告限Cloud、CNA范围更广的冲突不猜补。

## 去重、覆盖失败与未读边界

- 对10项主编号/产品词逐篇检索当前6050正文，均无同项；Brotli已收，采用原文末尾互补追加。Ahsay、PHP2Shell、Collabora110447、Zammad102489、OpenEMR24898、HFS97359、Comment2Shell93485、Traefik85595、Discourse10月7研究均已收，不重复。
- Ahsay原作者head仍3f3f2f8b28f5e1af9a8e8c41aae0ef7ca0315652，两文件无新增；现正文已有9.15.2.70/10.3.4.45补丁边界。Nuclei较旧描述不覆盖已完成修正。
- nomi此前枚举36数据提交，本轮定向111497/76461/110447路径新增名称；111497为75个不同full_name，不是75份已审利用。CompleTech-Security/CompleTetech-Security/CompleteTech-Security近似名称仅需来源链核对，未读其代码，不能判恶意或推荐。
- Nuclei321增量路径完整枚举沿用首轮；本轮定向精读MLflow、Collabora、Zammad、OpenEMR、Transmission、mcp-chrome，并非4386路径全读。nomi1550路径同样未全读，明确保留积压。Transmission修复PR8938六月已合并，不以模板更新充作近期新披露。
- Mr-xn README新增6篇外链全部实际HTTP403，网页工具另为Cache miss；公开博客索引显示部分文章加密，需要阅读权限。六篇为wordpress-StagedInstaller-rce、youjiasoft-Report-Upload-UploadFormImg-rce-2、Api-Default-GetApiParams-data-leak、HttpUploadHandler-rce、VIPCard-GetVIPCodeByKey-sqli、VIPCard-GetVIPCardCode-sqli；完整URL清单沿用首轮原始台账，不把标题当正文。此前24篇旧增量也未宣称已读。
- Adobe英文KA-51054直链404，繁中官方页可读但标AI翻译；编号交叉英文搜索缓存、APSB26-74、CNA；意大利文Cache miss，不重复重试。错误旧helpx路径不能代替实际adobe.com公告。
- Wasmtime1MB WAT连接器过大拒绝，使用当前环境只读原始公开URL成功下载并匹配Git blob；属于已完成替代读取，不是PoC执行。Forge release/tag API404，但Git tag/package/修复源码已核，不能说修复不存在。
- CyberStrikeAI/io_uring本轮未完成深审；其他初始上游可访问性、失效、无变化和截断沿用首轮逐源台账，不冒称本轮又全读。公开X/Twitter仅搜索线索，无全量接入。
- 首轮暂停的WordPress真实日志重置材料仍暂停、不出版其附件或原始值；独立正文继续，未修改原来源。

## 检查

草稿阶段检查结果与原正文前缀收据见同目录 checks.md、changed-articles.json、copy-fidelity.json。集成复核、正式完整工作目录的资源验收及补充说明见 [integration-review.md](integration-review.md)；最终精确 head 与 CI 在 PR 另记，不能把本地检查等同远端结果。
