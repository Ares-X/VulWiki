# 2026-10-03 公开来源增量更新与取舍

## 结果及口径

本轮从 `master` 的 `8f2a9e14575928bb5f086902c786da66f4a65aa9` 开始，已包含 PR #6、#7 的修订；开始时没有开放 PR。新增 **6 篇原创技术分析**，未修改任何既有正文、资源或质量基线，未复制整篇不明许可资料，也未合并或删除旧文章。

- 窗口内新披露：3 篇，NetScaler CVE-2026-88771、CVE-2026-88772，WordPress Visual Composer CVE-2026-12227
- 历史补缺：3 篇，PowerJob CVE-2026-75429、Tiptap GHSA-j95f-988m-3j2f、Nodemailer GHSA-2x7j-588g-ccc2；窗口内出现新索引/分析不等于新披露
- 状态：3 篇 `active`、3 篇 `needs-review`；全部 `text-reviewed`、`not-reproduced`
- 不增加“已复现”数量，不将源码静态审阅、原作者测量或模板的 `verified` 标记当作本库实验

检索窗口为 **2026-09-19 00:00 UTC 至 2026-10-03 本次实际观察时刻**。各源观察时间约为 02:38–02:59 UTC；部分 API 查询的 `until` 写至当日末，只表示请求上界，不代表覆盖尚未发生的时段。提交数包括自动更新、合并、重命名和删除，不能当成漏洞数。

## 新稿、前后差异与重要发现

| 新增入口 | 前后差异/依据 | 仍未完成的验证 |
|---|---|---|
| [NetScaler 日志链](../Web安全/网络设备/Citrix%20NetScaler/NetScaler%20日志污染到延迟命令执行分析（CVE-2026-88771）.md) | 旧库无同根因入口；新增 CNA、厂商与 watchTowr 固定脚本交叉分析。公开代码仅投递日志，README 的 force pickup 未实现，发送提示不证明成功 | 未固件复现；公开脚本不是只读检测器；并非只有一个可污染日志的入口 |
| [NetScaler DTLS](../Web安全/网络设备/Citrix%20NetScaler/NetScaler%20DTLS%20越界复制与公开PoC危险副作用（CVE-2026-88772）.md) | 旧库无同实体；新稿突出固定 PoC 在写文件后生成 `chmod(/bin/sh,06555)` 与 `ud2`，并用 FreeBSD 官方定义独立核实；不推荐为安全检测器 | 实际权限修改/崩溃未运行验证；偏移仅声称适配14.1-73.30，依赖未审计 |
| [Visual Composer](../Web安全/CMS内容/WordPress/Visual%20Composer%20模板文件包含与版本边界核对（CVE-2026-12227）.md) | 与现有 SAP 同名组件不同。新增修补前模板调用链、7月补丁及官方 GitHub/SVN 两版本相同文件证据，明确公告范围与源码冲突 | 45.16.0/45.16.1 的实际发行包、报告环境与另一可达路径待核；不宣布编号无效 |
| [PowerJob](../Web安全/开发框架/PowerJob/PowerJob%20friend-process%20未认证反射调用链分析（CVE-2026-75429）.md) | 不同于已有2023信息泄露。新增 HTTP→S4S FriendActor→Bean反射→Groovy链；按官方常量纠正上游的Worker↔Server概称 | 4.x完整范围、实际运行环境及修复版本待核；5.1.7四关键文件未变不等于整个新版已实测可利用 |
| [Tiptap](../Web安全/开发框架/Tiptap/Tiptap%20Markdown%20属性解析二次复杂度拒绝服务（GHSA-j95f-988m-3j2f）.md) | 新增块/行内不同正则路径、公开对照实验的证据界限；核心共享tokenizer与Mention边界修复分开说明 | 未执行计时/测试；宿主应用入口、权限与自定义解析器须另核 |
| [Nodemailer](../Web安全/邮件系统/Nodemailer/Nodemailer%20地址解析与收件人去重二次复杂度拒绝服务（GHSA-2x7j-588g-ccc2）.md) | 新增累加、显示名、不同收件人和跨头去重的区别；重复相同地址PoC不覆盖全部路径；上限报错不是截断，且不是解析前检查 | 未执行负载/SMTP测试；库无独立网络端点，具体应用可达性不能由安装情况推断 |

这是新增分析资料，不是改写既有归档示例。所有已有内容保留；没有脱敏、星号覆盖、删值、替换公开测试值或批量正则改正文。每篇保留准确原始来源链接，原有占位符不猜测补全。没有发现须暂停发布的实际有效秘密。

## README 上游：实际覆盖

GitHub 基础方法：读取仓库元数据、默认分支 HEAD、窗口 commits；活跃中文两源逐个读取提交文件变化；选中候选再读取固定 SHA 的树和具体文件。镜像不当独立漏洞来源计数，外链许可不继承汇编仓库许可。

| 来源 | 观察 HEAD | 本轮实际结果及边界 |
|---|---|---|
| [wy876/POC](https://github.com/wy876/POC) | 未取得 | repo/head/窗口接口均404；不能推断删除、改名或私有，也不能写成无更新 |
| [DMW11525708/wiki](https://github.com/DMW11525708/wiki) | `2e97a3a15827b8daa45b4fa9f437bcf13cbc41fc` | 窗口0提交，末次2025-02-26；读树/根级许可，未审全部历史正文 |
| [cvi-Qing/poc](https://github.com/cvi-Qing/poc) | `8f7611d46a8e90cb69b40671f55ee6f7336b557d` | 窗口0提交，末次2025-08-20；同上 |
| [SourByte05/Vulnerability-Wiki-PoC](https://github.com/SourByte05/Vulnerability-Wiki-PoC) | `fb9be5bbf7d13301ba47904be2f68ead8d7a034e` | 窗口8提交，逐提交取文件清单；Visual Composer迁移不重复计数；重点文稿静态审阅，未全库审计 |
| [Threekiii/Vulnerability-Wiki](https://github.com/Threekiii/Vulnerability-Wiki) | `b32b83c01eabac4d6b4b334852be9cff76ba67ee` | 窗口0提交，末次2026-05-11；没有重搬历史汇编 |
| [Threekiii/Awesome-POC](https://github.com/Threekiii/Awesome-POC) | `0f9e22b660cb1ea12c1c3668f9128d93e08da412` | 窗口0提交，末次2026-05-11 |
| [BaizeSec/bylibrary](https://github.com/BaizeSec/bylibrary) | `dee1fbaa831df860c6905f80de8700211ba63098` | 窗口0提交，末次2023-10-12；子目录许可证不当全库许可 |
| [Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC) | `cd9cc4ee83bd3b3efe9bf6da86532b2d28e95eb4` | 窗口8提交，逐提交文件审阅；PowerJob索引回溯CNA/发现者/厂商。根Apache-2.0不向外链传递 |
| [MrWQ/vulnerability-paper](https://github.com/MrWQ/vulnerability-paper) | `fcbdb421b62aef6ccac59a1887d94687f4faf9d6` | 窗口0提交，末次2026-04-01 |
| [lal0ne/vulnerability](https://github.com/lal0ne/vulnerability) | `5b9f397c1970203b1764fb7a66a0ffac39bef4cc` | 窗口0提交，末次2025-07-27 |
| [vulhub/vulhub](https://github.com/vulhub/vulhub) | `8fd63916f7a8711e2e01dda0d27237e4d6175d38` | 窗口0提交；9/18 Gotenberg环境在窗口前，只看提交说明/文件清单，没有启动容器 |
| [gelusus/wxvl](https://github.com/gelusus/wxvl) | `e7bb2278fb67b3741d2ac1f322a5cd14c5d3d86b` | 窗口29提交；与前窗末提交的compare达到300文件上限，未声称遍历全差异。HEAD递归树完整，按候选题名检索 |
| [wiki.0-sec.org](https://wiki.0-sec.org/) | 不适用 | 首页不可读/GET 502，搜索无有效结果；属于未覆盖，不是无更新 |
| [先知社区](https://xz.aliyun.com/news) | 不适用 | 首页/Atom可读，至少18条窗口记录；Tiptap、Nodemailer、OpenTelemetry三篇正文返回挑战。仅确认标题/作者/时间/摘要，事实来自独立官方证据 |
| [跳跳糖](https://tttang.com/) | 不适用 | GET 502，网页直开失败；缓存首页旧日期不能证明窗口无新文 |
| [Seebug Paper](https://paper.seebug.org/) | 不适用 | GET 502，直读失败，窗口搜索无命中；不可核查 |
| [安全客](https://www.anquanke.com/index.html) | 不适用 | 首页可读，窗口有新闻/行业/AI文章；未深读全部，不称全站无技术分析 |
| [Y4er](https://y4er.com/) | 不适用 | 首页最新可见2023-10-26；窗口检索未发现新文，不把页脚年份当发布日期 |

## 补充国际来源与权威依据

| 来源 | 观察 HEAD/快照 | 本轮实际结果及边界 |
|---|---|---|
| [nomi-sec/PoC-in-GitHub](https://github.com/nomi-sec/PoC-in-GitHub) | `60c696a2b014ebc3a9971fb021f5028e6ee902b3` | 分页114个窗口提交；固定索引读取88771/88772/94127，分别10/3/2仓库，回溯原作者而非依stars背书 |
| [trickest/cve](https://github.com/trickest/cve) | `0a11ab945b81964bf0f31210f21587ee380b7cef` | 分页14提交；根与2026路径检查，候选文件查询404，未据此判漏洞不存在；未逐篇审全库 |
| [projectdiscovery/nuclei-templates](https://github.com/projectdiscovery/nuclei-templates) | `791888a161ce6726fb1195a4294a44c3006d87ce` | 分页333提交；15318项完整树，按三候选编号未见文件名；抽读Gotenberg模板，未运行 |
| [rapid7/metasploit-framework](https://github.com/rapid7/metasploit-framework) | `5e598d5233bebecef2a44904a286769d83d31d12` | 分页75提交；17737项完整树；抽读LiteLLM模块，识别为历史漏洞新模块，不搬代码 |
| [Exploit-DB GitLab主库](https://gitlab.com/exploit-database/exploitdb) | `12879ca774a9d7543907d24a7bc1cebb47959afe` | REST窗口2提交，下一页为空；读diff/CSV，10个新EDB条目，未逐项完成厂商验证 |
| [Exploit-DB旧GitHub镜像](https://github.com/offensive-security/exploitdb) | `f36dd3d4d512ecd7197e079d87eb69ee7cd9d6b0` | 窗口0提交；README迁移信息促使另查GitLab，不拿停更镜像冒充2026覆盖 |
| [watchTowr Labs](https://labs.watchtowr.com/) | 各原始PoC固定SHA见新稿 | 实读首页、9/23 F5、9/28及9/29两篇NetScaler；两NetScaler完整两文件树已审，博客/代码没有明确再许可，原创归纳 |
| [PortSwigger Research](https://portswigger.net/research/http3-in-burp-suite) | 2026-09-23文章 | 实读HTTP/3 in Burp Suite工具/方法更新，不把方法文章编造成新产品漏洞 |
| X公开线索 | 无可核具体帖 | 搜索watchTowr/SinSinology与两编号；主页403，无可核帖子，未声称X全文覆盖 |
| [Citrix CTX697096](https://support.citrix.com/external/article/CTX697096) | 2026-09-27首发公告 | 官方external路径可读，support-home只加载；核对产品、前提、分支修复、在野声明 |
| [CVEProject/cvelistV5](https://github.com/CVEProject/cvelistV5) | 每篇使用固定SHA | 核对NetScaler、WordPress、PowerJob原始CNA，区别结构化版本与描述文字；没有只依赖二手互引 |
| NVD | 未获有效正文 | 三项NetScaler/F5详情返回空页，不写“NVD独立已核” |
| GitHub Security Advisories | 固定公告/补丁见各篇 | Tiptap/Nodemailer同时读仓库与全局记录，日期分层；NetScaler/F5全局记录为unreviewed，不称GitHub人工已审核 |
| [CISA官方kev-data](https://github.com/cisagov/kev-data/tree/7009facc2019306d41f6d6df6c8a057b99b4b468) | catalogVersion `2026.10.02` | 网站403，读取官方数据仓库；NetScaler9/27加入。88771行CWE/notes与CNA存在错配，保留并说明，不静默校正原源 |
| Wordfence / WordPress / 厂商代码 | 固定链接见Visual Composer与PowerJob篇 | 直接校对公告、源码、发行说明与可读SVN文件；SVN changeset全文403，不能称已审该diff |

以上“完整分页”只指提交清单；“完整树”只指文件目录没有API截断，均不代表每篇正文、每个依赖或每个二进制已审。公开资料未提供访问能力的部分不绕过挑战、登录或限制。

## 未入选与后置材料

### 已有或不能当独立新增

- F5 CVE-2026-94127：当前库有两篇，同产品、OAuth Authorization Server前提与数据平面根因已覆盖。本轮发现[原作者一手分析](https://labs.watchtowr.com/is-this-a-joke-in-the-auth-header-f5-big-ip-unauth-heap-overflow-to-rce-cve-2026-94127/)可补证，但未改旧正文，不新增第三篇。厂商网页加载错误，CNA可读；“唯一公开仓库”不能作为持续有效现状
- LiteLLM CVE-2026-42271：已有主文；SourByte及Metasploit的窗口新增是转载/模块新增，原披露为4/21。需要有效API key且角色校验不足，不能写成无条件未认证
- Windows CVE-2026-42980、macOS CVE-2026-43783：当前库已有相应条目，本轮不重复新增
- SourByte Visual Composer的新增、移位和旧目录删除是同一份来源；飞鱼星源文删除原因未知，不擅自恢复为当前上游内容
- Mr-xn两篇奇安信转载是方法研究，不以篇数计为两个新漏洞；外部文章的版权不随根库Apache许可自动开放
- PortSwigger HTTP/3是方法/工具内容，未据此制造CVE或产品漏洞实体

### 有价值但本轮后置，并非判为低质量

- Docmost CVE-2025-57231：原作者2026-01-15文记载2025年发现/修复，汇编9/22新增；官方0.22.0发行说明与补丁有价值。CNA的POST与原文GET不一致；不得与0.80.0、UUID basename仍受限的CVE-2026-48072粗暴归并。需单独完成两条路径关系的核对
- GEO my WP CVE-2026-85200：9/11披露、9/12 CVE，9/22汇编新增；[固定补丁](https://github.com/Fitoussi/geo-my-wp/commit/5a768bf1c6e44ded83a65be8789f3587515665ac)涉及真实路径、可读/PHP文件、模板目录和可信表单。已有初步依据，未扩写入本轮六篇
- OpenTelemetry-Go CVE-2026-81871：官方模块`otlploggrpc <0.21.0`环境TLS配置未应用，不能写成完全无TLS；[补丁](https://github.com/open-telemetry/opentelemetry-go/commit/c65d435b43e5e6b82310e6b18dd4cdcb8ac63a0c)可用，附件zip尚未审查，不背书附件
- Gotenberg CVE-2026-40281：Vulhub环境和Nuclei模板有线索，但本轮只抽查模板/链接，没有完整完成CNA、代码副作用与去重核验
- Exploit-DB EDB 52683–52692：已确认10条新增CSV记录；主题包括路由、CRM、工控、WordPress等，未完成逐项一手补证，不直接推荐。另5项旧DoS作者字段变化没有误计新增漏洞
- 其他活跃源文章只完成提交文件层筛选，未进入六篇深入核对，不因为未选中就断言材料错误

## 静态安全、许可与保真

1. 全程没有运行PoC、候选依赖安装、扫描器、目标请求、回连、PHP/HTML示例、容器或原作者实验。仓库质量工具先读入口，只运行已有离线文档检查
2. 候选检查按具体固定文件和差异限定范围，检查无关窃密外传、下载执行、持久化、破坏、混淆、工作流/依赖/二进制；不凭stars或集合背书
3. 对88772权限修改明确披露，不推测主观恶意，不作无害代码推荐；对其他命令执行、文件包含、CPU阻塞同样写具体副作用
4. 对无明确再许可的PoC、汇编、截图保留准确固定链接，使用原创归纳。Tiptap MIT、Nodemailer MIT-0、PowerJob Apache-2.0与VisualComposer GPLv3按实际许可文件核对，不仅依API标签
5. 不改变原始示例、测试值、URL或代码标识符；没有对旧文、索引诊断或来源数据作脱敏。HTML/HTTP例子未执行；新增正文的代码显示与复制文本离线核对

## 验证与交付

具体结果见[验证清单](reviews/20261003-source-update/validation.json)。验证覆盖新增文稿元数据、现有52项回归测试、质量基线差异、确定性索引、离线渲染与可复制代码；不代表漏洞复现或全库语义审计。

6篇已通过Pandoc静态HTML渲染及围栏代码复制文本对照，无活动HTML元素；另尝试的浏览器像素检查在页面加载前因环境的 `socket() Operation not permitted` 启动失败，因此不声称完成浏览器截图视觉验收。

基点有 **5196条历史警告，0 error/fatal**。基线不修改；目标是没有新增质量债。全库严格检查仍会因历史警告返回非零，不把带baseline检查成功写为“全库质量通过”。远端head和CI结果以草稿PR同一提交的实际检查为准；本轮不自动合并。
