# Chaitin 来源审查与搜索覆盖（2026-10-03）

## 第一阶段已完成

取得并分流16个域内正文页，4篇完成具体公开材料与一手证据审查后收录：ImageMagick44267、ProFTPD9273、ONLYOFFICE savefile、PHP-CGI4577互补分析。其余12篇逐项如下，另8条只检索到的线索未冒充全文审查。

|正文|处置|理由|
|---|---|---|
|[image44267](https://bbs.chaitin.cn/topic/335)|admit|新增独立主文；现库有 44268 文件读取而无 44267 主文。截图外链 403，改以实际可读的 Uptycs 文本 PoC、CVE 与补丁构成证据。|
|[proftpd](https://rivers.chaitin.cn/blog/cq951690lnechd244h50)|admit|新增主分析；补入 lockedbyte 两份固定 EXP，鉴权、mod_copy、写文件、回连、硬编码与版本回补边界。|
|[onlyoffice](https://rivers.chaitin.cn/blog/cq958510lnechd2450h0)|admit|新增独立 savefile 分析；不误挂 CVE-2021-3199；核实官方 Bug 46037 / 5.6.2；读取及数据解码检查原 Base64。|
|[php4577](https://rivers.chaitin.cn/blog/cq957f90lnechd244v10)|admit-complementary|原 Windows 主文不含 force_redirect/redirect_status_env；保留为 analysis_of，补失败条件、官方回归测试及后续 8926/8927 边界。|
|[nps](https://bbs.chaitin.cn/topic/409)|existing-coverage|已有两条 NPS auth_key 入口，同一 md5(timestamp)/client/list 机制；保留本次发现链接，不另写重复入门稿；原值未更改。|
|[hadoop](https://bbs.chaitin.cn/topic/381)|existing-coverage|Vulhub YARN new-application/apps 提交链与既有 YARN 主文覆盖相同；所读脚本会创建应用及执行回连，未执行。|
|[wso2](https://rivers.chaitin.cn/blog/cq94ks90lnechd243keg)|existing-coverage|PeiQi 的 toolsAny/ToolsAnyFileUploadExecutor 方法与既有 WSO2 fileupload 主文重叠；转载 HTTP 换行已损坏，不重复机械导入。|
|[nacos](https://rivers.chaitin.cn/blog/cqkc0up0lnec5jjug4ig)|hold-complementary-review|有 ayoundzw/nacos-poc 与未鉴权/鉴权对照，但已有 QVD-2024-26473 和历史分析。未继续下载其 Base64 JAR/审完整依赖，不能称通过防投毒或认定仅因已鉴权即安全。|
|[geoserver](https://rivers.chaitin.cn/blog/cq956n10lnechd244td0)|hold-complementary-review|正文有请求及 PropertyAccessor 调用链，现有 36401 主文；这次未完整追踪 GeoTools 补丁和依赖，留互补候选，不以同 CVE 直接删除。|
|[coldfusion](https://rivers.chaitin.cn/blog/cq9k4c10lnechd245jag)|hold-public-poc-gap|确有 Felix/C3P0/JGroups 独立链分析，非新闻。当前提取正文无完整可发送 WDDX 包或公开完整 EXP；商业 Goby 成功率声明不代替可核验代码，本轮 PoC 定向新增暂缓。|
|[camera](https://rivers.chaitin.cn/blog/cq94nn10lnechd243r1g)|hold-product-version-gap|有固件重打包方法与 QEMU 命令，但产品型号/固件版本未明确、后门代码片段仅开头、关键截图本次未视检；不虚构产品和补丁。|
|[kkfileview](https://rivers.chaitin.cn/blog/cq9411p0lnechd242lng)|hold-public-poc-gap|提供 Zip Slip 描述和官方 commit，但正文复现章节无可读请求/完整 PoC，截图未核；仅已复现/产品支持不满足本轮代码核验。|
|[workflow](https://bbs.chaitin.cn/topic/2460)|hold-uninspectable-rule|命令 xpoc -r 426 是真实验证入口，但读取固定 xpoc 仓库仅 6 项树和 README，规则通过云端同步；本次没有可静态审查的 426 规则。既有 WorkflowServiceXml 主文存在。|
|[tomcat50379](https://bbs.chaitin.cn/topic/3126)|hold-public-poc-gap|正文只声称 PoC 公开并展示截图；未提供可读 exploit 或具体发包；未把标题已复现当成功材料。|
|[vite](https://rivers.chaitin.cn/vuldb/0fb07f84-3053-4fce-a4d2-0ba508e06e8e)|hold-query-validation|有验证命令但现库已有30208及绕过分析；本次未核对其 /../../../../etc/passwd?raw?? 与官方 /@fs/ 条件、客户端规范化差异，不当作可靠验证包另导入。|
|[linuxroundup](https://rivers.chaitin.cn/blog/cqos28p0lnec5jjuga9g)|existing-and-hold-binary-review|OVS属父任务已排重范围；其余 Polkit/OverlayFS/DirtyPipe/eBPF已有主文。内嵌压缩 ELF 和 SUID覆盖片段未作完整机器码审计，不标成防投毒通过。|

## Google与Bing的实际追加检索（有界处置完成）

用户补充指定引擎后，已在云浏览器实际执行Google与Bing检索，不将通用搜索工具结果冒称为某引擎分页。Google首个`site:chaitin.cn 复现`结果页取得10条，包含此前未覆盖的Spring Gateway、OpenSSH6387、Next.js34351和FOG39914等文章。10条结果已逐项处置；公开一手材料支持FOG新增1篇、Next.js既有条目纠正1篇，其余未取得正文或完整证据的保持待核，10条结果不等于10篇全文审阅。

Google翻第二页出现unusual traffic，正常刷新一次仍阻断，已停止；Bing的复现查询无结果，PoC查询出现人机验证，经用户批准点击后又返回同一验证框，未进入结果。没有更换代理、指纹或规避限制。当前不能声称完成两个引擎全部分页；Google的PoC/漏洞分析/利用三个变体未执行，不计覆盖。FOG沿线索阅读官方GHSA及补丁，未冒称已读长亭全文。

初始分类页多为导航，百川云列表/站内搜索返回468，图片来源部分403；这些明确未完成，不算没有文章。

## 保真与材料审查

读取ProFTPD两份EXP、ONLYOFFICE相邻CVE代码和正文Base64（仅数据解码）、ImageMagick文本PoC与补丁、PHP固定补丁及完整PHPT；不执行文章代码、依赖、目标请求。未把截图链接当作已看像素，未给下载依赖或二进制安全保证。

ONLYOFFICE savefile属于5.6.2/Bug46037，和5.6.3的image upload/CVE-2021-3199分开；PHP新增以analysis_of指向既有主文，保留失败条件而不重复主入口。所有样例值保持原状，不脱敏、不替原作者修代码。

## 增量结论

FOG CVE-2024-39914：原研究公开完整请求和Python材料；1.5.10.33前后鉴权与命令转义分两次修复，不混称一个补丁。保留原始 `/dev/nul` 和 `json2b` 拼写，Python请求头无前导空格，网页文本提取的空格不当作原代码缺陷。该利用会写webshell，不是只读测试。

Next.js CVE-2024-34351：官方GHSA-fr5h-rqp8-mj6g针对Server Actions，旧文仅示例图片优化器回连。修改编号角色和记录类型，并新增独立说明；原正文不改。

## Google第一页10条结果逐项处置

以下是结果页线索，不等于已取得正文。原点击链接为Google不透明跳转，无法确认长亭落地URL时不猜造链接。

|排名|标题|处置|依据与边界|
|---|---|---|---|
|1|韩国科学技术院&#124; 探索基于LLM的Bug复现 - 长亭百川云|out-of-scope-title-triage|LLM软件缺陷复现研究；结果摘要无具体产品漏洞/PoC。未读取正文，不作内容否定。|
|2|SpringBoot-GateWay-RCE (CVE-2022-22947) 漏洞复现|hold-source-resolution|摘要含完整环境、命令执行及内存马章节；现库有对应主文，需读取该正文再判互补，不能仅同CVE排除。|
|3|CVE-2024-6387环境搭建和复现 - 长亭百川云|hold-source-resolution|摘要有Dockerfile/构建/验证；现库已有本轮深度regreSSHion主文，但未读到该新增来源，不能声称重复或PoC有效。|
|4|【已复现】CyberPanel upgrademysqlstatus 远程命令执行漏洞|hold-source-resolution|结果为bbs 2024-10-31通告；现库有upgrademysqlstatus/QVD-2024-44346及其他CyberPanel文；未读取正文，不新增已复现声明。|
|5|vulhub靶场DC-3 复现学习及细节解析 - 百川云|out-of-scope-title-triage|多阶段靶场演练，当前摘要未对应单一产品版本；保留线索，未读取正文。|
|6|CVE-2024-34351 漏洞复现poc (超大规模) - 长亭百川云|existing-title-and-identifier-correction|现库同名文已记录/_next/image与Server Actions编号疑似串配。此次读官方GHSA-fr5h-rqp8-mj6g，确认CVE前提为自托管+Server Actions+相对重定向，不以图片取图回连代证该编号。已通知父任务，不直接修改旧文。|
|7|IOT漏洞复现----RWCTF 6th - Let's party in the house &#124; 长亭百川云|hold-source-resolution|Google摘要包含synocam_param.cgi子进程调试；可能是互补设备研究，未核型号/固件/完整PoC，不猜造新条目。|
|8|【已复现】Apache Tomcat条件竞争致远程代码执行漏洞（CVE ...|prior-candidate|题目日期与前轮topic/3126一致；前轮已读正文，缺可读完整请求/EXP，维持待补材料。|
|9|【在野】CVE-2024-39914 漏洞复现poc exp - 长亭百川云|primary-source-followup|Google摘要可见qzjtyryy.php与kpvyggzrnonvuycaipvl测试值。长亭正文URL未能解析；沿编号核对FOG官方GHSA/补丁，新增稿只以实际读到的官方来源为证据，不冒称已读此长亭全文。|
|10|【已复现】ShowDoc item_id SQL注入漏洞&#124; 长亭百川云|hold-source-resolution|摘要为2024-06升级通告、token暴破主张；未读正文/请求，不能把标题已复现当公开PoC。|
