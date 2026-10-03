# 2026-10-03 公开 PoC 资料扩展收录与逐项取舍

## 当前草稿范围

本 PR 从 master `8f2a9e14575928bb5f086902c786da66f4a65aa9` 独立建立，保留既有修复，不修改 PR #8/#9，不合并主分支。当前已整理 **35 篇新增中文正文、2 篇既有文章仅追加补证**。imfht限定候选批次已完成，长亭Google/Bing增量和用户新指定Linux/sudo专题继续审查，会追加至同一草稿 PR。本段描述的是中间交付，不是全网检索完成。

收录门槛是公开可取得的具体 PoC、EXP、请求、回归测试或可用验证材料，不能只靠“作者成功”“AI 生成”“已复现”标题或探测器编号。部分链和完整利用分开，资料整理不承担漏洞复现。新增文章均含来源、权限/配置前提、副作用、版本/补丁及具体缺口。

## 新增正文与依据

每行对应新增文档；差异为新建全文，不修改既有归档。新增为原创中文分析与必要短引用，技术值、URL及占位符保持原样。

|新增文档|主编号|收录状态|直接来源|
|---|---|---|---|
|[Eyeplus ONVIF GetUsers 未认证明文口令返回：后续登录尚未证实](../IOT安全/摄像头/Eyeplus/Eyeplus-GetUsers-凭据信息泄露-CVE-2026-100906.md)|CVE-2026-100906|needs-review / not-reproduced|[原文](https://github.com/devjanger/iot-advisories/blob/3e8ea257b091a9ef322457862560aa09c27e544c/EYEPLUS-GetUsers-Unauth-Plaintext-Password.md)|
|[EDDI ZIP导入路径穿越与延迟类加载利用链（CVE-2025-32779）](../Web安全/AI应用/EDDI/EDDI%20ZIP导入路径穿越与延迟类加载利用链%20CVE-2025-32779.md)|CVE-2025-32779; GHSA-9v34-frgq-63mv|needs-review / source-claimed|[原文](https://www.sonarsource.com/blog/code-security-for-conversational-ai-uncovering-a-zip-slip-in-eddi/)|
|[OpenCode 升级接口跨站请求与任意包安装（GHSA-632h-h47v-g4x4）](../Web安全/AI应用/OpenCode/OpenCode%20升级接口跨站请求与任意包安装（GHSA-632h-h47v-g4x4）.md)|GHSA-632h-h47v-g4x4|needs-review / source-claimed|[原文](https://securitylabs.datadoghq.com/articles/opencode-upgrade-remote-code-execution/)|
|[SSMS SQL Copilot 只读绕过与数据库元数据提权（CVE-2026-65669）](../Web安全/AI应用/SQL%20Copilot/SSMS%20SQL%20Copilot%20只读绕过与数据库元数据提权（CVE-2026-65669）.md)|CVE-2026-65669|needs-review / source-claimed|[原文](https://embracethered.com/blog/posts/2026/from-select-to-sysadmin-sql-copilot-bluehat-asia/)|
|[n8n GSuiteAdmin 原型污染与 Git 命令执行链（CVE-2026-33696）](../Web安全/AI应用/n8n/n8n%20GSuiteAdmin%20原型污染与%20Git%20命令执行链（CVE-2026-33696）.md)|CVE-2026-33696; GHSA-mxrg-77hm-89hv|needs-review / source-claimed|[原文](https://simonkoeck.com/writeups/n8n-gsuiteadmin-prototype-pollution-rce)|
|[Cockpit CMS Space Storage 路径遍历：PHP 内置服务器与路径存在条件](../Web安全/CMS内容/Cockpit/Cockpit-CMS-Space-Storage-路径遍历-CVE-2026-58467.md)|CVE-2026-58467|needs-review / not-reproduced|[原文](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-58467.yaml)|
|[AIWU AI Copilot getCurrentTaskResults 未授权任务数据读取](../Web安全/CMS内容/WordPress/AIWU-getCurrentTaskResults-任务数据泄露-CVE-2026-6639.md)|CVE-2026-6639|needs-review / not-reproduced|[原文](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-6639.yaml)|
|[Hippoo REST 路由权限哨兵混用：本地对照 PoC 与管理员密码覆盖](../Web安全/CMS内容/WordPress/Hippoo-REST权限绕过-管理员密码覆盖-CVE-2026-49060.md)|CVE-2026-49060|needs-review / not-reproduced|[原文](https://github.com/rootdirective-sec/CVE-2026-49060-Lab/blob/db51f07bdfa8961c291f53fabdde53a65041012b/README.md)|
|[Newfold WordPress 插件空 Hiive 密钥认证绕过：模板与修复边界](../Web安全/CMS内容/WordPress/Newfold-空Hiive密钥认证绕过-CVE-2026-80099.md)|CVE-2026-80099|needs-review / not-reproduced|[原文](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-80099.yaml)|
|[用友财务云 A++V8 selectMaUser orgCode SQL 注入](../Web安全/ERP企业/用友政务财务云/用友财务云A++V8%20selectMaUser%20orgCode%20SQL注入.md)|无新增主编号|needs-review / source-claimed|[原文](https://security.yonyou.com/#/patchInfo?identifier=309233a5451d4d349c3bc47937fd4f4e)|
|[金和 OA C6 AjaxForCenterBudgetDecompose SQL 注入](../Web安全/OA办公/金和OA/金和OA%20C6%20AjaxForCenterBudgetDecompose%20SQL注入.md)|无新增主编号|needs-review / source-claimed|[原文](https://mrxn.net/jswz/jhsoft-AjaxForCenterBudgetDecompose-sqli.html)|
|[MemoryUserDatabaseFactory 路径混用的 JNDI 文件写入与 JSP 链](../Web安全/中间件/Apache%20Tomcat/MemoryUserDatabaseFactory路径混用JNDI链分析.md)|无新增主编号|needs-review / not-reproduced|[原文](https://srcincite.io/blog/2024/07/21/jndi-injection-rce-via-path-manipulation-in-memoryuserdatabasefactory.html)|
|[Argo CD repo-server构建选项与Helm网络边界公开验证（GHSA-47m3-95c7-g2g8）](../Web安全/云平台/Argo%20CD/Argo%20CD%20repo-server构建选项与Helm网络边界公开验证（GHSA-47m3-95c7-g2g8）.md)|GHSA-47m3-95c7-g2g8|active / not-reproduced|[原文](https://www.synacktiv.com/en/publications/caught-in-the-octopus-trap-unauthenticated-rce-in-argo-cd-with-codeql)|
|[Eleveo Quality Management 问卷导出响应泄露服务器路径](../Web安全/商业软件/Eleveo/Eleveo-Quality-Management-QMBODownload-路径泄露-CVE-2026-101143.md)|CVE-2026-101143|needs-review / not-reproduced|[原文](https://drive.google.com/file/d/1qKulZLn6xxT3ePlV__Q-0MKLhlWmRI_U/view?usp=sharing)|
|[Krayin CRM 安装器 AJAX 绕过导致管理员账户覆盖](../Web安全/商业软件/Krayin/Krayin-Installer-未认证账户覆盖-CVE-2026-100885.md)|CVE-2026-100885|needs-review / not-reproduced|[原文](https://github.com/carlosalbertotuma/advisory/blob/e5d131d8dac4840ac4308b29de3dc1aa5f721b64/advisory-07-Unauthenticated-InstallerBypass.md)|
|[ONLYOFFICE savefile 路径穿越与 docbuilder 利用条件分析](../Web安全/商业软件/ONLYOFFICE/ONLYOFFICE%20savefile%20路径穿越与%20docbuilder%20利用条件分析.md)|无新增主编号|needs-review / not-reproduced|[原文](https://rivers.chaitin.cn/blog/cq958510lnechd2450h0)|
|[student-management-system 管理处理器缺少会话检查：信息读取与改写须区分](../Web安全/商业软件/student-management-system/student-management-system-管理处理器未授权-CVE-2026-97646.md)|CVE-2026-97646|needs-review / not-reproduced|[原文](https://github.com/ningzichun/student-management-system/issues/9)|
|[天锐数据泄露防护系统 findSingConfigPage 排序参数 SQL 注入（CVE-2025-11314）](../Web安全/安全设备/天锐数据泄露防护系统/天锐%20findSingConfigPage%20排序参数SQL注入%20CVE-2025-11314.md)|CVE-2025-11314|needs-review / source-claimed|[原文](https://github.com/FightingLzn9/vul/blob/1a9d896a999e22b319fe7d464a96fd4f04a101d0/天锐数据泄露防护系统-6.md)|
|[CFITSIO 扩展文件名的复制、SSRF 与外传原语及 4.7.0 加固](../Web安全/开发框架/CFITSIO/CFITSIO%20扩展文件名原语及4.7.0加固分析.md)|无新增主编号|needs-review / not-reproduced|[原文](https://blog.doyensec.com/2026/05/19/cfitsio-weaponized-filenames.html)|
|[PHP CGI 参数注入的 XAMPP 失败条件与官方回归测试（CVE-2024-4577）](../Web安全/开发框架/PHP/PHP%20CGI%20参数注入的%20XAMPP%20失败条件与官方回归测试%20CVE-2024-4577.md)|CVE-2024-4577|needs-review / not-reproduced|[原文](https://rivers.chaitin.cn/blog/cq957f90lnechd244v10)|
|[Provenance marker陈旧供应量授权绕过与两阶段回归验证](../Web安全/开发框架/Provenance/Provenance%20marker陈旧供应量授权绕过与两阶段回归验证.md)|无新增主编号|active / not-reproduced|[原文](https://blog.trailofbits.com/2026/08/25/state-divergence-enables-unauthorized-access/)|
|[ruby-saml 规范化空串与解析器差异及XSW公开验证工具（CVE-2025-66567、CVE-2025-66568）](../Web安全/开发框架/Ruby/ruby-saml%20规范化空串与解析器差异及XSW公开验证工具（CVE-2025-66567、CVE-2025-66568）.md)|CVE-2025-66567; CVE-2025-66568|active / not-reproduced|[原文](https://portswigger.net/research/the-fragile-lock)|
|[libheif Grid 色度平面越界写与 Next.js 实验链（CVE-2026-32740）](../Web安全/开发框架/libheif/libheif%20Grid%20色度平面越界写与%20Next.js%20实验链（CVE-2026-32740）.md)|CVE-2026-32740; GHSA-frfr-f3vg-2g6j|needs-review / source-claimed|[原文](https://fortbridge.co.uk/research/cve-2026-32740-nextjs-sharp-libheif-rce/)|
|[N-central 路径与Forwarded解析差异及公开SOAP验证边界（CVE-2026-86206）](../Web安全/服务器软件/N-able%20N-central/N-central%20路径与Forwarded解析差异及公开SOAP验证边界（CVE-2026-86206）.md)|CVE-2026-86206|active / not-reproduced|[原文](https://www.rapid7.com/blog/post/ve-cve-2026-86206-cve-2026-86207-n-able-n-central-authentication-bypass-fixed/)|
|[ProFTPD 数据通道 UAF 与公开 EXP 静态核验（CVE-2020-9273）](../Web安全/服务器软件/ProFTPD/ProFTPD%20数据通道%20UAF%20与公开%20EXP%20静态核验%20CVE-2020-9273.md)|CVE-2020-9273|needs-review / not-reproduced|[原文](https://rivers.chaitin.cn/blog/cq951690lnechd244h50)|
|[ZendTo dropoff 路径穿越与文件移走（CVE-2025-34508）](../Web安全/服务器软件/ZendTo/ZendTo%20dropoff%20路径穿越与文件移走（CVE-2025-34508）.md)|CVE-2025-34508|needs-review / not-reproduced|[原文](https://horizon3.ai/attack-research/attack-blogs/cve-2025-34508-another-file-sharing-application-another-path-traversal/)|
|[Chrome 146 Sanitizer API：SVG 名称解析与表单 URL 重解析绕过](../Web安全/桌面软件/Chrome/Chrome%20146%20Sanitizer%20API%20SVG%20与表单%20URL%20重解析绕过.md)|无新增主编号|active / source-claimed|[原文](https://www.slcyber.io/research/two-bypasses-for-chromes-sanitizer-api)|
|[Chrome for iOS 经 Shortcuts 回调绕过应用启动确认（CVE-2026-13795）](../Web安全/桌面软件/Chrome/Chrome%20iOS%20Shortcuts%20回调确认绕过（CVE-2026-13795）.md)|CVE-2026-13795|active / source-claimed|[原文](https://blog.doyensec.com/2026/09/24/chrome-ios-policy-bypass.html)|
|[ImageMagick PNG profile 标准输入等待型拒绝服务（CVE-2022-44267）](../Web安全/桌面软件/ImageMagick/ImageMagick%20PNG%20profile%20标准输入等待型拒绝服务%20CVE-2022-44267.md)|CVE-2022-44267|needs-review / not-reproduced|[原文](https://bbs.chaitin.cn/topic/335)|
|[Wikipedia Android 深链接主机校验与会话泄露（CVE-2026-65993）](../Web安全/桌面软件/Wikipedia/Wikipedia%20Android%20深链接主机校验与会话泄露（CVE-2026-65993）.md)|CVE-2026-65993|needs-review / source-claimed|[原文](https://securitylab.github.com/advisories/GHSL-2026-101_apps-android-wikipedia/)|
|[YTDLnis Intent COMMAND 参数注入与 Python 运行时文件写入](../Web安全/桌面软件/YTDLnis/YTDLnis%20Intent%20COMMAND%20参数注入与%20Python%20运行时文件写入.md)|无新增主编号|needs-review / source-claimed|[原文](https://www.sonarsource.com/blog/ytdlnis-argument-injection-rce/)|
|[Netcore NR289-GE boa Basic Auth 栈溢出：崩溃和 PC 控制的证据边界](../Web安全/网络设备/Netcore/Netcore-NR289-GE-boa-栈溢出-CVE-2026-101074.md)|CVE-2026-101074|needs-review / not-reproduced|[原文](https://github.com/senxitoyshuyi-ui/HACKALL/blob/53039d907a48e41955938cad73598b7e5de1eff9/netcore_NR289-GE_V1.4.5102%2C2018.06.1418_44%20Router/Netcore_NR289-GE_boa_stack_overflow.md)|
|[TOTOLINK A3002MU formWsc localPin 命令注入：telnet 服务写入副作用](../Web安全/网络设备/TOTOLink/TOTOLINK-A3002MU-formWsc-命令注入-CVE-2026-93742.md)|CVE-2026-93742|needs-review / not-reproduced|[原文](https://github.com/SunnyYANGyaya/cuicuishark-sheep-fishIOT/blob/8cb416b9d6041fec5600a20bd845d083da7934dd/ToTolink/A3002MU/rce-formWsc.md)|
|[Ziroom ZHOME A0101 firstLogin 认证后命令注入：配置覆盖与回连副作用](../Web安全/网络设备/Ziroom/Ziroom-ZHOME-A0101-firstLogin-命令注入-CVE-2026-101260.md)|CVE-2026-101260|needs-review / not-reproduced|[原文](https://github.com/waltz-sketch/Ziroom/blob/6513d083108f7a859eaeffc7500c33e131b0228a/firstlogin_command_injection.md)|
|[Windows GetProcessHandleFromHwnd 保护进程边界与 PPLwindow 本地演示](../系统安全/Windows/Windows本地提权漏洞/GetProcessHandleFromHwnd保护进程边界与PPLwindow分析.md)|无新增主编号|needs-review / not-reproduced|[原文](https://projectzero.google/2026/02/gphfh-deep-dive.html)|

## 决定收录的关键证据与纠正

- OpenCode：公开包/HTML/请求；保留公告旧上界1.18.16与研究演示1.18.21的差异，正式修复1.18.22
- n8n：手动三节点+HTTP材料，补入凭据校验和失败后继续执行条件；2025作者时间线与2026官方披露冲突保留说明
- SQL Copilot：公开查询、提示和演讲证据；影响对象为SSMS22而不是所有SQL Server引擎
- libheif：公开完整实验仓库及精确profile；Grid补丁是23903961，不以另一个整数溢出补丁替代；不泛化为所有Next.js应用
- Wikipedia/YTDLnis：公开触发材料可得，未公开完整服务端或最终载荷的限制明确写出；保留原有占位符
- Chrome Sanitizer：两组公开样例和上游测试，区分发现归属；iOS：公开回调链，不能说必然静默拨通电话
- ZendTo：已查看请求/结果原图；文件会被移走，并可能发送通知，绝非无损只读下载
- CFITSIO：公开4.6.3实验及接收器；追加4.7.0中的六月加固，纠正“仍全部未修复”的过时结论
- Windows/PPLwindow：公开源码含本地MessageBoxA执行链，不只取得句柄；与Project Zero正文能力、24H2检查分开
- MemoryUserDatabaseFactory：两次JNDI调用材料公开；Tomcat9.0.63已改变forceString，不能照抄版本无关说法
- EDDI：补找到KalmarCTF公开Java类、构造脚本和ZIP样本；区分Netty与OpenAPI类加载路线、生产权限与比赛SUID程序
- 用友/天锐/金和Center：补入厂商公告、原作者代码/截图及固定请求；两种路径或不同Content-Length不擅自改成一致
- N-central：模板验证86206接口边界，不是86207管理员认证；当前HF4还处理独立86218
- ruby-saml：两项后续CVE、XSW完整样例与源码；保留过期时间、目标签名和响应差异的误判限制
- Provenance：维护者回归测试公开；v1.28.0零值缓解与v1.29.0实时供应量修复分开
- Argo CD：原文请求对象和公开五文件载荷；REDIS_PASSWORD外传不称反向交互shell，Helm10.0.0与应用版本分开

## 已读但暂缓的明确候选

|候选|公开资料与具体缺口|恢复收录所需证据|
|---|---|---|
|[OsmAnd CVE-2026-65995](https://securitylab.github.com/advisories/GHSL-2026-109_osmand/)|有操作表和结果，但完整PoC App须申请|公开完整App/独立绑定调用程序，不靠按钮名猜实现|
|[CFITSIO fuzzing](https://blog.doyensec.com/2026/04/20/cfitsio-fuzzing.html)|公告有harness和命令，所需编号崩溃输入与另发归档未找到|公开触发输入或完整可重建方法；不把潜在内存破坏直接写成RCE|
|[Titan Quest](https://www.synacktiv.com/en/publications/exploiting-titan-quest)|有逆向分析/视频声明，缺完整生成器、恶意地图或足够完整重建过程|公开关键利用构造材料；不称全网不存在PoC|
|[Canon CVE-2024-0244](https://www.zerodayinitiative.com/blog/2026/9/23/cve-2024-0244-a-heap-buffer-overflow-in-the-canon-mf753cdw-printer)|英文后置队列未取得完整传真样本/生成器；具体原文见扩展来源记录|对应原研究的完整输入、可验证版本和关键堆/载荷材料|
|[金和 Set](https://mrxn.net/jswz/jhsoft-AjaxForSetDecompose-sqli.html)|源码年度为数值拼接，汇编以单引号开头；作者8秒和汇编4秒也不同|与实际代码路径匹配的原作者完整请求/结果；不代作者修payload|
|[金和 Company](https://mrxn.net/jswz/jhsoft-AjaxForCompanyBudgetDecompose-sqli.html)|原文一参数调用与后续四参数方法不自洽，不能借Center调用链替代|完整一致的处理器/方法证据及对应公开触发|

## 覆盖量与未完成范围

1. 旧21候选加5个英文后置主题共26项已逐项处置，当前20收录、6暂缓。EDDI此前缺材料的判断已因找到公开主办方solution而更新
2. README上游窗口：2026-09-19T00:00:00Z至2026-10-03T05:43:00Z，12仓库查询、11可读、1个404；47提交、496文件变动事件只是清单层统计
3. SourByte窗口25份不同正文已读，另读1份helper；2份已有覆盖、2份随后上游删除不恢复、21份继续待补原始证据。逐项表在下节
4. wxvl续接窄窗03:18:11Z–05:43:00Z的4份正文已读：DevKit Pro与GitLab AI Gateway缺实际公开材料；Next.js94545已有主入口；一周新闻不作为独立漏洞新增。广窗385路径中其余381篇未逐文深读，不列为排除
5. Mr-xn窄窗新增APIProxyHandler索引链接已核，原文访问失败；八个其他可读仓库窗口无提交不等于历史正文已全部审完
6. 新指定imfht：103项/4页完成清单，深读近期9项与首页7个CVE模板；16候选为11新收、2既有补证、3暂缓，另13检测不当漏洞。详见[逐项报告](IMFHT-COLLECTION-20261003.md)
7. 新指定Chaitin：第一阶段16正文、4收录、12其他处置；Google实际第一页另得10条，翻页与Bing验证受阻，已得材料继续核对。详见[覆盖与取舍](CHAITIN-COLLECTION-20261003.md)。后续Linux/sudo专题不计入已完成数量
8. 上游扩展核对有67个实际阅读内容对象，包含全文、补丁差异或限定段落，不能改称67篇研究/67个网站。代码文件、目录清单、正文数量分别记录

受阻入口：wy876仓库、0-sec、跳跳糖、Seebug、Mr-xn新文章、Argo另一个关联公告；没有绕过登录/付费/访问限制，也未对示例目标发请求。

## SourByte已读正文逐项处置

|来源正文|当前处置|理由|
|---|---|---|
|[Wp_VisualComposer-CVE-2026-12227任意文件读取.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/a198d2f3d3ed07d2aec4b61356d9f6d526047c35/2026/09/Wp_VisualComposer-CVE-2026-12227任意文件读取/Wp_VisualComposer-CVE-2026-12227任意文件读取.md)|PR8已有覆盖|Prior draft has source/patch discrepancy analysis; relocated source not new entity|
|[LiteLLM MCP 接口命令注入漏洞(CVE-2026-42271).md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/7f2f8ff756d74923e3c93a1da0eb090db18262f4/2026/09/LiteLLM MCP 接口命令注入漏洞(CVE-2026-42271)/LiteLLM MCP 接口命令注入漏洞(CVE-2026-42271).md)|现库已有同实体|Same MCP endpoint and CVE already present; no complementary original evidence added by this compilation|
|[山东启恒信息科技有限公司数智化平台 CommonHandler 存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/7f2f8ff756d74923e3c93a1da0eb090db18262f4/2026/09/山东启恒信息科技有限公司数智化平台 CommonHandler 存在SQL注入漏洞/山东启恒信息科技有限公司数智化平台 CommonHandler 存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[用友NC mtapptimelinedoApply 存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/7f2f8ff756d74923e3c93a1da0eb090db18262f4/2026/09/用友NC mtapptimelinedoApply 存在SQL注入漏洞/用友NC mtapptimelinedoApply 存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[用友YonBIP execute 接口存在Spel表达式注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/7f2f8ff756d74923e3c93a1da0eb090db18262f4/2026/09/用友YonBIP execute 接口存在Spel表达式注入漏洞/用友YonBIP execute 接口存在Spel表达式注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[鼎游票务系统CheckPicShow存在任意文件读取漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/7f2f8ff756d74923e3c93a1da0eb090db18262f4/2026/09/鼎游票务系统CheckPicShow存在任意文件读取漏洞/鼎游票务系统CheckPicShow存在任意文件读取漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[企业信息发送平台-getLicenceDetail-文件读取.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/802828a38617903dc32dba844990d0f90ac20bea/2026/09/企业信息发送平台-getLicenceDetail-文件读取/企业信息发送平台-getLicenceDetail-文件读取.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[友加畅捷-UploadFormImg-文件上传.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/802828a38617903dc32dba844990d0f90ac20bea/2026/09/友加畅捷-UploadFormImg-文件上传/友加畅捷-UploadFormImg-文件上传.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[飞鱼星VW2100  MB3W202 系列无线路由器命令执行.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/802828a38617903dc32dba844990d0f90ac20bea/2026/09/飞鱼星VW2100  MB3W202 系列无线路由器命令执行/飞鱼星VW2100  MB3W202 系列无线路由器命令执行.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[飞鱼星VW2100  MB3W202 系列无线路由器未授权数据写入.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/802828a38617903dc32dba844990d0f90ac20bea/2026/09/飞鱼星VW2100  MB3W202 系列无线路由器未授权数据写入/飞鱼星VW2100  MB3W202 系列无线路由器未授权数据写入.md)|upstream_removed|Read historic added diff, subsequently removed upstream; reason unknown, no restore|
|[飞鱼星VW2100  MB3W202 系列无线路由器未授权访问.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/802828a38617903dc32dba844990d0f90ac20bea/2026/09/飞鱼星VW2100  MB3W202 系列无线路由器未授权访问/飞鱼星VW2100  MB3W202 系列无线路由器未授权访问.md)|upstream_removed|Read historic added diff, subsequently removed upstream; reason unknown, no restore|
|[AJ-ReportBI平台存在Nashorn JS引擎命令执行.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/AJ-ReportBI平台存在Nashorn JS引擎命令执行/AJ-ReportBI平台存在Nashorn JS引擎命令执行.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; title says Nashorn but payload executes Groovy javaBean constructor; body <=1.7.1 versus some Snort <=1.4.2; no version normalization performed|
|[AJ-ReportBI平台存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/AJ-ReportBI平台存在SQL注入漏洞/AJ-ReportBI平台存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; body <=1.7.1 versus some Snort <=1.4.2; no version normalization performed|
|[AJ-ReportBI平台存在testTransform 单请求执行RCE.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/AJ-ReportBI平台存在testTransform 单请求执行RCE/AJ-ReportBI平台存在testTransform 单请求执行RCE.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; body <=1.7.1 versus some Snort <=1.4.2; no version normalization performed|
|[AJ-ReportBI平台存在逻辑缺陷漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/AJ-ReportBI平台存在逻辑缺陷漏洞/AJ-ReportBI平台存在逻辑缺陷漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; body <=1.7.1 versus some Snort <=1.4.2; no version normalization performed|
|[ATM企源系统 AMTTokenAction 存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/ATM企源系统 AMTTokenAction 存在SQL注入漏洞/ATM企源系统 AMTTokenAction 存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[Apache_Cocoon-信息泄露.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/Apache_Cocoon-信息泄露/Apache_Cocoon-信息泄露.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[Docmost-img_avatar-任意文件读取.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/Docmost-img_avatar-任意文件读取/Docmost-img_avatar-任意文件读取.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; distinguish 2025-57231 versus 2026-48072, GET/POST source mismatch pending|
|[Wp_GEOmyWP-CVE-2026-85200-本地文件包含.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/Wp_GEOmyWP-CVE-2026-85200-本地文件包含/Wp_GEOmyWP-CVE-2026-85200-本地文件包含.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; fixed upstream commit 5a768bf1c6e44ded83a65be8789f3587515665ac known, independent full review pending|
|[中药煎药查询系统 IndexNew 存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/中药煎药查询系统 IndexNew 存在SQL注入漏洞/中药煎药查询系统 IndexNew 存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete; FOFA app=apache-cocoon mismatches named product|
|[厦门四信通信科技有限公司水利信息化平台 stluserLogin.do 存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/厦门四信通信科技有限公司水利信息化平台 stluserLogin.do 存在SQL注入漏洞/厦门四信通信科技有限公司水利信息化平台 stluserLogin.do 存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[山东聚恒网络技术有限公司聚恒中台listdata存在敏感信息泄露.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/山东聚恒网络技术有限公司聚恒中台listdata存在敏感信息泄露/山东聚恒网络技术有限公司聚恒中台listdata存在敏感信息泄露.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[用友-时空KSOA add_user.jsp classid 存在SQL注入漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/用友-时空KSOA add_user.jsp classid 存在SQL注入漏洞/用友-时空KSOA add_user.jsp classid 存在SQL注入漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[金叶物联网大数据管理平台download存在任意文件读取漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/金叶物联网大数据管理平台download存在任意文件读取漏洞/金叶物联网大数据管理平台download存在任意文件读取漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|
|[鼎游票务系统saleVersionUpdate.jsp存在任意文件读取漏洞.md](https://github.com/SourByte05/Vulnerability-Wiki-PoC/blob/487e5658136041e29ae10ef3bec6057e4d7eb89b/2026/09/鼎游票务系统saleVersionUpdate.jsp存在任意文件读取漏洞/鼎游票务系统saleVersionUpdate.jsp存在任意文件读取漏洞.md)|待补一手证据|Concrete request exists, but exact release boundary / primary origin / response-image verification / patch chain remains incomplete|

## 验证与保真记录

- 集成前基线：52项仓库单测通过；5654份正文，5196项历史警告、0 errors/fatal
- 20篇另行独立文字审稿：未发现材料门槛/版本映射的阻断问题；不是全来源逐字事实认证或漏洞复现
- Markdown经Pandoc生成HTML，逐字符核对代码节点与原始围栏；检查活动HTML、围栏及字符串frontmatter。不执行文章代码、不访问示例目标
- 首批20篇在提交803404d的实际GitHub Preview均已打开；15个围栏的渲染文本与复制控件值对照通过，仅GitHub末尾换行处理不同；5篇代表文的6张截图无实质问题。操作系统剪贴板工具为空，未声称端到端剪贴板验证。新追加部分尚待同等远端核对；不执行显示为代码的HTML样例
- 旧WordPress/MongoDB两文仅末尾追加固定模板补证，原字节为新文完整前缀；其他旧正文与baseline不变。派生索引由既有scripts/wiki.py生成，未手工改索引或加入新质量债
- 当前35篇新增和2篇追加集成后：52项单测通过；5689份正文、5196项历史警告、0新增质量债、0 errors/fatal；索引build及build --check通过，different_files为空。后续Linux/长亭追加仍须重跑检查与远端CI；当前为草稿，无自动合并。机器记录见[验证清单](POC-COLLECTION-VALIDATION-20261003.json)
