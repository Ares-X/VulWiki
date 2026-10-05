# 2026-10-05 公开来源每周维护

## 范围与口径

本次从 master `6b8d16259ecba975c4b6fd00e3aea187caa1fa2e` 开始，开放 PR 为零。先读取当前维护规则、内容字段说明、README 上游及 2026-10-03 的增量/英文补档记录。按各源已记录 HEAD 比较真正新增，同时保留 2026-09-28 00:00 UTC 至 2026-10-05 约 00:50 UTC 的七日重叠清点。提交量不是文章量、漏洞量或审读量；网页覆盖为可访问列表/原文的有界检查。

## GitHub 逐源覆盖

|来源|固定 HEAD|七日提交|前次 HEAD 后提交|结果|
|---|---|---:|---:|---|
|[wy876/POC](https://github.com/wy876/POC)|未取得|未知|未知|HTTP 404；不能判断删除、私有或改名|
|[DMW11525708/wiki](https://github.com/DMW11525708/wiki)|2e97a3a15827b8daa45b4fa9f437bcf13cbc41fc|0|0|相同HEAD；不重复搬运历史内容|
|[cvi-Qing/poc](https://github.com/cvi-Qing/poc)|8f7611d46a8e90cb69b40671f55ee6f7336b557d|0|0|相同HEAD；不重复搬运历史内容|
|[SourByte05/Vulnerability-Wiki-PoC](https://github.com/SourByte05/Vulnerability-Wiki-PoC)|fb9be5bbf7d13301ba47904be2f68ead8d7a034e|6|0|相同HEAD；不重复搬运历史内容|
|[Threekiii/Vulnerability-Wiki](https://github.com/Threekiii/Vulnerability-Wiki)|b32b83c01eabac4d6b4b334852be9cff76ba67ee|0|0|相同HEAD；不重复搬运历史内容|
|[Threekiii/Awesome-POC](https://github.com/Threekiii/Awesome-POC)|0f9e22b660cb1ea12c1c3668f9128d93e08da412|0|0|相同HEAD；不重复搬运历史内容|
|[BaizeSec/bylibrary](https://github.com/BaizeSec/bylibrary)|dee1fbaa831df860c6905f80de8700211ba63098|0|0|相同HEAD；不重复搬运历史内容|
|[Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC)|88e9e1690e20a324722e99493b7e984ac7779693|3|1|已读增量清单；具体取舍见下|
|[MrWQ/vulnerability-paper](https://github.com/MrWQ/vulnerability-paper)|fcbdb421b62aef6ccac59a1887d94687f4faf9d6|0|0|相同HEAD；不重复搬运历史内容|
|[lal0ne/vulnerability](https://github.com/lal0ne/vulnerability)|5b9f397c1970203b1764fb7a66a0ffac39bef4cc|0|0|相同HEAD；不重复搬运历史内容|
|[vulhub/vulhub](https://github.com/vulhub/vulhub)|8fd63916f7a8711e2e01dda0d27237e4d6175d38|0|0|相同HEAD；不重复搬运历史内容|
|[gelusus/wxvl](https://github.com/gelusus/wxvl)|a046fd64156650ea0157352c7c60b9d373871d8c|14|1|已读增量清单；具体取舍见下|
|[nomi-sec/PoC-in-GitHub](https://github.com/nomi-sec/PoC-in-GitHub)|616237c4ab4b6ef08bfff24d105bb0de26c55caf|56|14|已读增量清单；具体取舍见下|
|[trickest/cve](https://github.com/trickest/cve)|4a2278d3f35e8452c94f02e816801516ab5d8929|7|2|已读增量清单；具体取舍见下|
|[projectdiscovery/nuclei-templates](https://github.com/projectdiscovery/nuclei-templates)|f1c5c9ccf555a6abb06adb7983cd65f94aa1e1a1|105|10|compare 文件列表到达300上限；提交清点与3份新模板补丁已读，完整路径覆盖有缺口|
|[rapid7/metasploit-framework](https://github.com/rapid7/metasploit-framework)|5e598d5233bebecef2a44904a286769d83d31d12|29|0|相同HEAD；不重复搬运历史内容|

七日共清点220个GitHub提交，另官方Exploit-DB GitLab 2个；GitHub较已核HEAD共28个提交。15个可读GitHub源，不含404的wy876；镜像沿来源链去重。

## 纠错、撤回与暂缓

- SourByte 的 Visual Composer 路径迁移前后 blob 相同，不算新文章；两篇飞鱼星删除是既有变化，无删除理由，不能断言漏洞被撤回
- Mr-xn 新索引 APIProxyHandler SSRF：原站返回挑战，公开首页说明正文加密。未取得触发材料/版本/修复依据，暂缓；不把无法读取说成没有PoC
- wxvl 新增 DragonForce 事件解读，未当新漏洞正文
- nomi 新增20个编号索引、51个仓库链接，删除13个链接；删除原因未知。CVE-2026-12345索引所指描述为64638，90970所指仓库描述为通用DevOps指南，不能当真实对应PoC
- trickest 读取10项实质描述/版本修订，其中仅MLflow编号命中既有两篇；主技术文已经记录>=3.3.0,<3.15.0，未重复更改。其他9项仅列待核线索，未完成原作者触发与防投毒审查
- Nuclei 3个新增文件暴露模板涉及Terraform状态/CLI凭据/Serverless配置；没有把一般暴露检测模板当作新的具体产品漏洞正文。其余新增提交以EPSS/KEV标记及签名/校验更新为主
- Nuclei补充树/提交页及EDB补充历史diff读取批次被审核取消，已停止，未改道重试；成功取得的EDB响应x-next-page为空，现HEAD与前次相同

## 质量与保真

基点5844篇。已审阅可信文档检查入口；81项Python单测通过。基线检查0新增问题、0错误/fatal，4097条既有warning仍在；基点索引一致。资源采取稀疏工作树，不把未下载的2.49GB资源说成完成本次图片字节审计。既有文章不改，未做脱敏或批量正文替换。后续最终检查记录见 validation.json。

## 公开研究站点逐源覆盖

|来源|可访问性|实读与限制|
|---|---|---|
|[wiki.0-sec.org](https://wiki.0-sec.org/)|unavailable|Web原站两次不可读；标准只读GET返回HTTP502；限定日期site查询未返回有效结果；无法核查周窗内容；不是无更新|
|[先知社区](https://xz.aliyun.com/news)|readable_via_cloud_browser_and_atom|Web首页可见导航/热门，具体两篇样本返回挑战式文本，未执行该文本；云端浏览器正常呈现精选/社区全部及92896/92894/92735/92897技术主体；Atom只读GET成功，65446字节，直接读25条近期条目；浏览器社区全部不含AI专栏；Atom补出ZCode。图片未逐张查看；未下载附件。updated不是已验证实质修订|
|[跳跳糖](https://tttang.com/)|unavailable|Web两次超时；标准GET返回HTTP502；限定日期site查询未返回有效结果；不可核查；不能使用旧缓存宣称无更新|
|[Seebug Paper](https://paper.seebug.org/)|unavailable|Web两次not accessible；标准GET返回HTTP521；限定日期site查询未返回有效结果；不可核查；没有绕过限制|
|[安全客](https://www.anquanke.com/index.html)|readable_partial|根URL Web超时；index.html Web可读但缓存停在9/10；原站GET200 live列表最新为9/29两篇，已解析标题/日期/链接；316193正文成功；316190正文Web cache miss；首页范围，无全站遍历；316193事件解释无具体漏洞触发，316190只确认列表元数据，均未准入|
|[Y4er Blog](https://y4er.com/)|readable|首页和文章归档第一页直接阅读；RSS点击提取失败；可见最新发布日期在窗口前；未逐篇比较210篇历史文章，页脚2026不代表新文|
|[PortSwigger Research](https://portswigger.net/research)|readable|首页与All Articles直接读取；RSS提取失败；最新HTTP/3工具/方法研究已在10/3报告；没有新列出周窗文章，不排除未标示旧文修订|
|[watchTowr Labs](https://labs.watchtowr.com/)|readable|首页、9/28与9/29原始研究直接读取；两篇原始PoC仓库提交列表各3条读取，最新SHA均与库内固定SHA一致；两篇均已收录，不重复新增；博客无本次可验证的修订历史，不能声称逐字未改|
|[公开X/Twitter](https://x.com/PortSwiggerRes)|limited_unverified|x.com/PortSwiggerRes直接403；x.com/SinSinology与twitter.com/albinowax直接读取失败；按日期公开X/Twitter检索及SinSinology+88771精确检索无可核具体研究帖；无可靠可回溯帖子；不把噪声结果或营销重定向当线索，不宣称总量覆盖|
|[Sonar](https://www.sonarsource.com/blog/)|readable_partial|原站首页直接读取最新六项，主要产品/AI工程内容；针对官方域名的10月漏洞研究补充检索未定位新研究，只出现产品/社区问答；没有完成动态Vulnerability research分类的所有分页，不能写全站无更新|
|[GitHub Security Lab](https://securitylab.github.com/advisories/)|readable|原始公告索引及10/1七篇公告直接读取；共享语料HEAD正文/候选账本去重；均属重叠期，无证据是10/3后改稿；五条语料缺口、101已有正文、109已有后置候选，详见ghsl-overlap-ledger.json|
|[Assetnote/Searchlight Cyber](https://www.slcyber.io/research)|readable|直接原站research列表（尾斜杠重定向）；Goja研究已收录；未对历史文章进行逐字比较|
|[Doyensec](https://blog.doyensec.com/)|readable|首页直接读取最新文章及日期；最新Chrome iOS/Shortcuts方法文在目标增量窗前；当前列表未见10/2后新文，不代表旧文无静默更正|
|[Trail of Bits](https://blog.trailofbits.com/)|readable|原站首页及10/2 SequenceHash全文技术章节直接读取；SequenceHash是密码构造/软件发布，含用法代码但不是具体产品漏洞触发；不准入漏洞稿|
|[Project Zero](https://projectzero.google/)|readable|直接首页读取最新条目；Dangling COM已在既有库；未检索所有公开issue或比较历史正文|
|[Synacktiv](https://www.synacktiv.com/en/publications)|readable|直接Publications英文首页读取；仅该语言最新列表，未比较全部旧文|
|[Zero Day Initiative](https://www.zerodayinitiative.com/blog/)|readable|直接Blog首页读取；Canon CVE-2024-0244为2024漏洞的9/23研究，已在上轮后置记录；非周窗新文|
|[Rapid7](https://www.rapid7.com/blog/)|readable_partial|直接首页及最新漏洞栏目；CVE-2026-76504原站文章与Updates直接读取；含IoC路径片段，没有完整请求/原始PoC；候选而非准入。未读全站威胁情报文章；未读取或恢复KEV任务|

官方Exploit-DB GitLab HEAD `12879ca774a9d7543907d24a7bc1cebb47959afe`，七日2提交，较10/03无增量；未逐篇重新审读历史EDB。

## 本轮收录

新增4篇、更新既有文章0篇。Phproject、image-downloader、Loom为近期公开具体材料；http4s是9/8漏洞公告及9/28后续研究的历史缺口，不算10/5新披露。四篇由另一审阅者独立核对固定材料、官方映射、版本、前提、许可和具体触发代码/步骤，通过有界静态准入；其余清点不可冒充审读。

- [Phproject REST API 对象级授权缺失（CVE-2026-104991）](../../../Web安全/其他软件/Phproject/Phproject%20REST%20API%20对象级授权缺失（CVE-2026-104991）.md)
- [http4s Ember HTTP2 帧长检查滞后（CVE-2026-88975）](../../../Web安全/开发框架/http4s/http4s%20Ember%20HTTP2%20帧长检查滞后（CVE-2026-88975）.md)
- [image-downloader URL 文件名解码路径穿越（CVE-2026-103648）](../../../Web安全/开发框架/image-downloader/image-downloader%20URL%20文件名解码路径穿越（CVE-2026-103648）.md)
- [Loom 无身份提供方时认证绕过（CVE-2026-103956）](../../../Web安全/AI应用/Loom/Loom%20无身份提供方时认证绕过（CVE-2026-103956）.md)

关键纠偏：Phproject网页对照缺登录Cookie且多余curl参数；image-downloader成功判断可能命中旧本地文件、容器路径与回环示例不等价；Loom总体SUCCESS不证明凭据字段导出；http4s客户端影响为官方共享代码推断，社区附件未用于准入依据。http4s构建工作流还具有删除Actions制品和发布功能，不能当只读测试。

每篇为原创中文整理并链接原作者及许可。具体版本冲突、完整输入、写文件/写库/清理等副作用和未审动态依赖已在正文逐项标明。

## 其余待查范围

先知Go ServeMux、IFUNC及ZCode材料未完成原作者/固定代码和安装依赖工作流核对，未入正文。GHSL七条10/1重叠期披露中1篇已收录、1项已有待查，5项新发现历史缺口仍缺具体版本/修复或完整工具依赖审阅；没有因标题或官方标签自动准入。Nomi其余新索引不等于已审候选，不称全量审读完成。

## 本地验收结果

- 5848篇离线机器扫描；81项单测通过
- 基线比较0新增质量债、0错误/fatal；4097既有warning不变，未改baseline
- 索引生成后build --check一致
- 新增4篇Pandoc离线渲染，170个代码元素中的165个行内段与5个围栏文本核对一致，无活动脚本元素；未进行浏览器像素验收
- 原有5844篇的SHA-256逐项未变；资源引用没有新增，本次未重新下载全部图片做字节审计
- 远端最终提交、草稿PR及其CI以交付时实查记录为准；不自动合并
