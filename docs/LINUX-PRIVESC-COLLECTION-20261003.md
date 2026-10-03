# Linux / sudo 提权资料覆盖核查（2026-10-03）

有界候选：44个CVE与1个GHSA，含CrackArmor的11个补丁编号（对应9类问题），不是45个独立可用EXP。最终新增7篇技术稿、11篇现有最小补核；4项未取得完整公开触发材料而暂缓；11项已有候选仍有明确未核点，10项为CrackArmor关联编号仅作引用。不是全体Linux CVE全覆盖。

日期、分支和条件的完整结构见LINUX-PRIVESC-COLLECTION-20261003.json，kernel-late四项已合并。

|编号|披露/材料日期|已有主入口|处置与准确性|公开材料|
|---|---|---|---|---|
|CVE-2016-5195|2016-10披露；CNA2016-11-10|Web安全/服务器软件/Docker/技术干货   Docker 容器逃逸案例汇集.md [needs-review]<br>系统安全/Linux/Linux本地提权漏洞/（CVE-2016-5195）脏牛Linux 本地提权.md [needs-review]|existing-correct-with-amendment：保留Linux/Android实验，纠正已root准备不是完整零起点root证明|https://dirtycow.ninja/|
|CVE-2021-3156|2021-01-26 Qualys|系统安全/Linux/Linux sudo 权限提升漏洞（CVE-2021-3156）复现.md [needs-review]<br>系统安全/Linux/Linux-sudo-权限提升漏洞-CVE-2021-3156.md [needs-review]|existing-correct-with-amendment：已有完整代码与独立复现文；补1.9分支与修复1.9.5p2|https://github.com/blasty/CVE-2021-3156|
|CVE-2021-4034|2022-01-25 Qualys；编号年份为2021|系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]<br>系统安全/Linux/Linux-Polkit-权限提升漏洞-CVE-2021-4034.md [needs-review]|existing-correct-with-amendment：把2009版本误用纠正为引入年份，补commit；不把CVE年份当披露年|https://www.qualys.com/2022/01/25/cve-2021-4034/pwnkit.txt|
|CVE-2022-0847|2022-03-07 Max Kellermann|系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]<br>系统安全/Linux/Linux-DirtyPipe-权限提升漏洞-CVE-2022-0847.md [needs-review]|existing-correct-with-amendment：补三个固定分支版本与覆盖限制，避免5.8以后全版本误判|https://dirtypipe.cm4all.com/|
|CVE-2023-0386|CNA2023-03-22；独立研究发布日期未本轮确认|系统安全/Linux/Linux内核提权漏洞(CVE-2023-0386)在野利用：从技术原理到业务风险与防御策略.md [needs-review]|existing-needs-review：已有风险分析，未提供本轮已审计完整PoC；UID映射原理仍待最小修正|本轮未确认可用原始材料|
|CVE-2023-2640|2023-07-26 Canonical|系统安全/Linux/Ubuntu曝出两个Linux漏洞-近40%用户受到影响.md [needs-review]|existing-needs-review：已有双漏洞新闻，不等同完整可用材料；不能按所有Linux受影响|本轮未确认可用原始材料|
|CVE-2023-32629|2023-07-26 Canonical|系统安全/Linux/Ubuntu曝出两个Linux漏洞-近40%用户受到影响.md [needs-review]|existing-needs-review：已有双漏洞新闻，保留；本轮未审计第三方PoC或给出全分支包表|本轮未确认可用原始材料|
|CVE-2023-4911|2023-10-03 Qualys|系统安全/Linux/原创 Paper  glibc 提权漏洞（CVE-2023-4911）分析.md [needs-review]|existing-needs-review：已有深度中文分析；缺源与构建特定限制仍在审阅提示中，本輪未逐行审计全文|https://www.qualys.com/2023/10/03/cve-2023-4911/looney-tunables-local-privilege-escalation-glibc-ld-so.txt|
|CVE-2024-1086|2024-03原研究/公开代码；CNA2024-01-31|系统安全/Linux/Old Linux Kernel flaw CVE-2024-1086 resurfaces in ransomware attacks.md [quarantined]|new-qualified-draft：旧英文新闻隔离；补完整C资料，明确预编译.a未重建审计和panic风险|https://github.com/Notselwyn/CVE-2024-1086/tree/90615e07b3a6d69c841a5b2686918e7ac22cc1b3|
|CVE-2025-27591|2025-03-12 SUSE研究；CNA03-11|系统安全/Linux/Linux提权漏洞CVE-2025-27591.md [needs-review]|existing-correct-with-amendment：原假设PoC遗漏root服务触发；补实际0666权限修改因果，保留原代码|https://security.opensuse.org/2025/03/12/below-world-writable-log-dir.html|
|CVE-2025-32462|2025-06-30|Web安全/其他软件/杂项/CVE-2025-32462&CVE-2025-32463.md [needs-review]|existing-correct-with-amendment：已有跨目录合篇；校对主机规则前提与修复，不重复新增，不归入2026|https://www.openwall.com/lists/oss-security/2025/06/30/2|
|CVE-2025-32463|2025-06-30|Web安全/其他软件/杂项/CVE-2025-32462&CVE-2025-32463.md [needs-review]<br>系统安全/Linux/不容小觑的威胁： Linux提权漏洞，轻松利用却要修复 CVE-2025-32463.md [needs-review]|existing-correct-with-amendment：两篇已有；补1.9.17p1边界、NSS根因、check非只读与privileged容器风险|https://www.stratascale.com/resource/cve-2025-32463-sudo-chroot-elevation-of-privilege/|
|CVE-2025-6018|2025-06-17研究；CNA记录07-23不等于披露|系统安全/Linux/【已复现】Linux 本地提权漏洞CVE-2025-6018、CVE-2025-6019.md [needs-review]<br>系统安全/从 allow_active 到 root 的本地提权/CVE-2025-6019 从 allow_active 到 root 的本地提权漏洞 (LPE).md [needs-review]|existing-correct-with-amendment：该段仅升allow_active；不能单独称root；补官方可用步骤|https://cdn2.qualys.com/2025/06/17/suse15-pam-udisks-lpe.txt|
|CVE-2025-6019|2025-06-17研究；CNA06-19|系统安全/Linux/【已复现】Linux 本地提权漏洞CVE-2025-6018、CVE-2025-6019.md [needs-review]<br>系统安全/从 allow_active 到 root 的本地提权/CVE-2025-6019 从 allow_active 到 root 的本地提权漏洞 (LPE).md [needs-review]|existing-correct-with-amendment：补镜像/loop/挂载/持久文件副作用与主线、回补区分|https://cdn2.qualys.com/2025/06/17/suse15-pam-udisks-lpe.txt|
|CVE-2026-23111|2026-04-16 FuzzingLabs触发；2026-06-08 Exodus分析；CNA更早|系统安全/Linux/CVE-2026-23111_ Linux nf_tables Flaw Enables Root Exploits.md [quarantined]|new-qualified-draft：旧条目仅截断新闻且隔离；补完整Bash UAF触发及独立分析，明确不是完整通用root EXP|https://fuzzinglabs.com/repro-cve-2026-23111/|
|CVE-2026-23268|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|new-qualified-draft：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23269|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23403|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23404|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23405|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23406|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23407|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23408|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23409|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23410|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-23411|2026-03-12 CrackArmor研究；CNA日期另列|无主条目|reference-only-crackarmor：23268公开完整shell链；其余十编号保留为相关补丁引用，不宣称各自独立完整root PoC|https://cdn2.qualys.com/advisory/2026/03/10/crack-armor.txt|
|CVE-2026-31431|2026-04-29 原作者PoC；CNA更早公开|系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]<br>系统安全/Linux/Linux-Copy-Fail-本地提权漏洞-CVE-2026-31431.md [needs-review]|existing-correct-with-amendment：已核原作者脚本；补分支修复、缓存副作用及容器宿主边界|https://github.com/theori-io/copy-fail-CVE-2026-31431/tree/09e97bd8f1aa3868b720a7a12a60b1c365798e06|
|CVE-2026-31635|DirtyDecrypt公开材料日期待本轮完整回源；CNA先于5月新闻|系统安全/Linux/DirtyDecrypt Linux内核漏洞PoC利用代码公开.md [needs-review]|existing-needs-review：原文章只有发布新闻；CNA映射已核，公开利用材料未完成审计，不新增重复|本轮未确认可用原始材料|
|CVE-2026-31694|CNA 2026-05-01；原作者PoC首日未确认|系统安全/Linux/【已复现】Linux FUSE page cache 本地权限提升漏洞CVE-2026-31694安全风险通告.md [needs-review]|existing-needs-review：已有FUSE通告，版本与CNA主要边界吻合；没有完整PoC审计，不视为已充分收录|本轮未确认可用原始材料|
|CVE-2026-3888|2026-03-17 Qualys|无主条目|deferred-missing-helper：原公告调用firefox_24.04等辅助程序而未给完整源码；不把root输出当可运行公开PoC|https://cdn2.qualys.com/advisory/2026/03/17/snap-confine-systemd-tmpfiles.txt|
|CVE-2026-43284|2026-05-07 原作者公开路径；CNA 05-08|系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]<br>系统安全/Linux/Dirty Frag的双漏洞组合.md [needs-review]<br>系统安全/Linux/Linux-kernel-xfrm-ESP-Dirty-Frag-本地提权漏洞-CVE-2026-43284.md [needs-review]|existing-correct-with-amendment：双CVE不同分支修复；静态核了exp.c关键分支，不能一刀切默认可用|https://github.com/V4bel/dirtyfrag/tree/aab16fcada27142dd8ce8704906cf6736cf213b8|
|CVE-2026-43456|原研究披露日待精确回源|系统安全/Linux/【CVE-2026-43456】潜伏19年的Linux内核0day漏洞，最终收获超 8 万美元奖励.md [needs-review]|existing-needs-review：已有深度译文；本轮CNA核对到2.6.24引入及多分支修复，代码未另审计|https://gmo-cybersecurity.com/blog/19-years-hidden-80000-rewarded-reporting-a-linux-kernel-zero-day-for-google-kernelctf/|
|CVE-2026-43499|原研究披露日尚未完整回源；CNA日期另列|系统安全/Linux/【已复现】隐藏15年的 Linux Kernel 提权漏洞 GhostLockCVE-2026-43499.md [needs-review]|existing-needs-review：已有GhostLock通告及补丁，不视作缺失；本轮CNA复核不等于完整EXP审计|本轮未确认可用原始材料|
|CVE-2026-43500|2026-05-07 同一DirtyFrag材料；CNA 05-11|系统安全/Linux/Dirty Frag的双漏洞组合.md [needs-review]<br>系统安全/Linux/Linux-kernel-xfrm-ESP-Dirty-Frag-本地提权漏洞-CVE-2026-43284.md [needs-review]|existing-correct-with-amendment：并非ESP同一缺陷，原文合篇允许保留；补副作用|https://github.com/V4bel/dirtyfrag/tree/aab16fcada27142dd8ce8704906cf6736cf213b8|
|CVE-2026-43503|2026-06-25 DirtyClone研究；独立研究尚待完整回源|系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]<br>系统安全/Linux/【高危漏洞预警】Linux内核高危本地提权漏洞CVE-2026-43503DirtyClone.md [needs-review]|existing-needs-review：原条目称完整PoC，但静态正文缺ESP写入原语；只核CNA身份/分支，尚未审计原研究代码，不能宣布正确收录|本轮未确认可用原始材料|
|CVE-2026-46331|原PoC和CNA日期需分别记录，本轮未精确确认PoC首日|系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]<br>系统安全/Linux/【成功复现】Linux内核act_pedit本地权限提升漏洞CVE-2026-46331.md [needs-review]|existing-needs-review：原文章拼入ptrace说明；其代码主线为pedit，46333应只作引用；旧提醒已标出但尚未完整修复正文|https://github.com/sgkdev/packet_edit_meme|
|CVE-2026-46333|2026-05-15预披露；2026-05-20完整Qualys公告|Web安全/服务器软件/Linux/Linux ssh-keysign-pwn漏洞在K8s中的影响.md [needs-review]<br>系统安全/Windows/提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX.md [needs-review]|existing-needs-review：已有K8s/ssh-keysign研究；泄露私钥不等于每种路线直接root；未完整审计所有公开EXP|https://cdn2.qualys.com/advisory/2026/05/20/cve-2026-46333-ptrace.txt|
|CVE-2026-52924|见kernel-late SOURCE-AUDIT和新稿的补丁/公开材料时间；CNA时间单列|无主条目|new-qualified-draft：新增原创中文源码审阅；Ubuntu/Arch两种专用EXP；两平台内核helper/特权数据读取链；Ubuntu另有崩溃触发模式|https://github.com/NebuSec/CyberMeowfia/tree/b257d16183d367db7f8f57d65c1a9a8a09ee6b4f/security-research/Linux-CVE-2026-52924-ubuntu-7.0.0-28|
|CVE-2026-53264|见kernel-late SOURCE-AUDIT和新稿的补丁/公开材料时间；CNA时间单列|无主条目|new-qualified-draft：新增原创中文源码审阅；完整但平台特定的公开EXP；平台特定完整root shell EXP；固定ROP与KASLR路径|https://github.com/star-sg/CVE/tree/5226265a18027859c7efbf66bd9a662c1459ac6f/CVE-2026-53264|
|CVE-2026-53266|见kernel-late SOURCE-AUDIT和新稿的补丁/公开材料时间；CNA时间单列|系统安全/Linux/【热点安全风险】9月21日 Linux 内核三漏洞确认已遭在野利用，攻击者可借其本地提权并横向渗透内网服务器.md [needs-review]<br>系统安全/Linux/CISA：三个Linux 内核漏洞已遭活跃利用.md [needs-review]|deferred-no-public-trigger：本轮不新增实用PoC条目；保留现有新闻并记材料缺口；已核两热门仓库为追踪网站与防御工程；不能据聚合标签声称有公开EXP|https://github.com/torvalds/linux/commit/67ba971ae02514d85818fe0c32549ab4bfa3bf49|
|CVE-2026-64600|2026-07-22研究URL；CNA07-23；官方索引与URL日期不同不假作同日|系统安全/Linux/【成功复现】Linux Kernel XFS Reflink本地权限提升漏洞CVE-2026-64600.md [needs-review]|existing-correct-with-amendment：补磁盘持久写入与跨重启风险，原公告已有入口；未运行任何竞态|https://cdn2.qualys.com/advisory/2026/07/22/RefluXFS.txt|
|CVE-2026-72137|见kernel-late SOURCE-AUDIT和新稿的补丁/公开材料时间；CNA时间单列|无主条目|new-qualified-draft：新增原创中文源码审阅；Ubuntu专用EXP；平台特定ROP凭据修改/flag读取链；不是通用root shell|https://github.com/NebuSec/CyberMeowfia/tree/a1304a44d123ef417b909b10fde23e66174d050c/security-research/Linux-CVE-2026-72137-ubuntu-7.0.0-28|
|CVE-2026-82474|CNA2026-08-29；上游修复提交2026-03-20|无主条目|deferred-no-public-trigger：检索到CNA、源码和补丁，无完整公开触发材料；不能仅凭CVE新增可用PoC条目|https://github.com/sudo-project/sudo/commit/71fbe42dcd5a1c8f799540583a2dfb2ae6221edf|
|CVE-2026-8933|2026-07-21 Qualys|无主条目|deferred-missing-helper：公告中的./exploit无完整源文件；身份与影响已确认但暂不作合格EXP收录|https://cdn2.qualys.com/advisory/2026/07/21/snap-confine-set-capabilities.txt|
|GHSA-f42v-x7gq-phc8|2026-08-31 official GHSA; Ubuntu fix2026-09-01|无主条目|new-qualified-draft：official concrete manual trigger; not standalone exploit script; no CVE assigned in source|https://github.com/trifectatechfoundation/sudo-rs/security/advisories/GHSA-f42v-x7gq-phc8|

## 11篇既有文章的修正依据

只调整有来源支持的元数据并插入独立补核段；不删除、改写原正文/代码。

### [不容小觑的威胁： Linux提权漏洞，轻松利用却要修复 CVE-2025-32463](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E4%B8%8D%E5%AE%B9%E5%B0%8F%E8%A7%91%E7%9A%84%E5%A8%81%E8%83%81%EF%BC%9A%20Linux%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E%EF%BC%8C%E8%BD%BB%E6%9D%BE%E5%88%A9%E7%94%A8%E5%8D%B4%E8%A6%81%E4%BF%AE%E5%A4%8D%20CVE-2025-32463.md)

[sudo维护者2025-06-30公告](https://www.openwall.com/lists/oss-security/2025/06/30/3)确认1.9.14–1.9.17受影响、1.9.17p1修复，原文“所有p修订”不成立。触发入口为sudo自身的 `-R/--chroot`，在策略评估时进入用户目录，NSS加载该目录的配置和共享库，不是一般的环境变量绕过或普通chroot命令。用户不必已有sudoers规则。

[Rich Mirch原始研究与完整PoC](https://www.stratascale.com/resource/cve-2025-32463-sudo-chroot-elevation-of-privilege/)已公开，不需以公众号回复替代材料。[原文链接仓库固定快照](https://github.com/pr0v3rbs/CVE-2025-32463_chwoot/tree/5c36150c6b4e64961ca133e618da1a48d1444d22)的脚本将传入参数当命令执行，因此 `check` 不是已证实的只读模式；run.sh会以 `--privileged` 启动容器，Dockerfile会联网装包、获取sudo源码并安装易受影响版本。本库只静态阅读，没运行这些步骤。

变更字段：version、fixed_version、prerequisites、verification_source、side_effects。原正文/围栏代码保留校验通过。

### [CVE-2025-32462&CVE-2025-32463](../Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVE-2025-32462%26CVE-2025-32463.md)

两者均于2025-06-30公开，不能列作今年首次披露。维护者的[32462公告](https://www.openwall.com/lists/oss-security/2025/06/30/2)和[32463公告](https://www.openwall.com/lists/oss-security/2025/06/30/3)给出的前提不同：前者利用已有的另一主机授权规则，传任意主机字符串不能凭空创建授权；后者可在sudoers许可判断完成前通过用户chroot中的NSS配置进入root执行路径。原文失败记录保留，但 `-R` 未支持、发行版已回补和用户无授权是不同现象，内核版本不能代替sudo版本判断。

两者上游修复为1.9.17p1。原文下载脚本后执行 `check` 的步骤会进入利用脚本，不能命名成只读检测；脚本公开源和操作副作用见[Rich Mirch原研究](https://www.stratascale.com/resource/cve-2025-32463-sudo-chroot-elevation-of-privilege/)。

变更字段：version、fixed_version、prerequisites、verification_source。原正文/围栏代码保留校验通过。

### [Linux-DirtyPipe-权限提升漏洞-CVE-2022-0847](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux-DirtyPipe-%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E6%BC%8F%E6%B4%9E-CVE-2022-0847.md)

[Max Kellermann原始公告](https://dirtypipe.cm4all.com/)于2022-03-07公开，确认修复版为5.10.102、5.15.25和5.16.11。“5.8及之后”必须排除这些已修复分支及发行版回补。任意文件覆盖的表述还须受目标可读、页边界和不可扩展长度的约束。

原公告给出的是文件页缓存覆盖原语，本文内嵌x86_64 ELF属于进一步的SUID提权变体。二者都不是只读检查；页缓存破坏可能影响其他进程，不能将退出程序视为恢复。本文保留原C代码，不以未运行的静态阅读认定其在所有发行版可用。

变更字段：version、fixed_version、prerequisites、verification_source。原正文/围栏代码保留校验通过。

### [Linux-Polkit-权限提升漏洞-CVE-2021-4034](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux-Polkit-%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E6%BC%8F%E6%B4%9E-CVE-2021-4034.md)

[Qualys PwnKit公告](https://www.qualys.com/2022/01/25/cve-2021-4034/pwnkit.txt)的公开日期是2022-01-25，尽管编号为CVE-2021-4034。其2009表述指pkexec代码引入时间，不是可比较的版本号。根因涉及argc为零时argv与环境数组越界交互；漏洞成立不要求polkit守护进程运行。

[上游修复](https://gitlab.freedesktop.org/polkit/polkit/-/commit/a2bf5c9c83b6ae46cbd5c779d3055bff81ded683)及发行版回补应独立核对。本文保留的Python含编码共享库，调用pkexec并写测试目录/文件；未反汇编完整内嵌机器码，不能断言其供应链安全或跨架构通用。移除pkexec的SUID只能作为临时缓解，会改变合法提权功能。

变更字段：version、fixed_version、prerequisites、verification_source。原正文/围栏代码保留校验通过。

### [Linux-sudo-权限提升漏洞-CVE-2021-3156](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux-sudo-%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E6%BC%8F%E6%B4%9E-CVE-2021-3156.md)

[Qualys原始公告](https://www.openwall.com/lists/oss-security/2021/01/26/3)于2021-01-26发布，确认1.8.2–1.8.31p2和1.9.0–1.9.5p1受影响，1.9.5p2修复。已登录的普通用户不必属于sudoers，也不需root密码。

本篇保留的blasty代码针对三个明确sudo/libc组合，不等于所有易受影响构建都能直接使用这组参数；Makefile会生成并加载本地共享库，成功路线启动特权shell，失败可能崩溃/留下文件。[公开源](https://github.com/blasty/CVE-2021-3156)与另一独立复现稿都保留，不因同CVE删除实验。

变更字段：version、fixed_version、verification_source。原正文/围栏代码保留校验通过。

### [（CVE-2016-5195）脏牛Linux 本地提权](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E/%EF%BC%88CVE-2016-5195%EF%BC%89%E8%84%8F%E7%89%9BLinux%20%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83.md)

[Dirty COW原始资料](https://dirtycow.ninja/)与[内核补丁](https://github.com/torvalds/linux/commit/19be0eaffa3ac7d8eb6784ad9bdbc7d67ed8e619)支持只读映射的COW竞态写入。公开披露在2016年10月，CVE记录后续发布时间不能当作第一次公开。4.8分支修复为4.8.3；旧稳定分支、Android厂商补丁不能只比较这一数字。

本文Linux写文件演示与Android实验准备不同。Android段已经root/remount的步骤是环境准备，不能用后续写入证明“从未root手机直接得到root”。竞态会改目标内容，可能破坏账号文件/程序并造成崩溃；只恢复编译产物不足以清理修改，需保留目标原副本或恢复快照。

变更字段：version、fixed_version、verification_source。原正文/围栏代码保留校验通过。

### [Linux提权漏洞CVE-2025-27591](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9ECVE-2025-27591.md)

[SUSE研究者2025-03-12报告](https://security.opensuse.org/2025/03/12/below-world-writable-log-dir.html)核对的是Below0.8.1：root服务处理 `/var/log/below/error_root.log` 时会设置0666权限；可写日志目录允许换成符号链接，从而把权限改变施加到链接目标。原文普通shell执行 `2>/var/log/below/attack.log` 本身不提供这一root服务触发，不能当作完整EXP。

修复已包含于Below0.9.0。发行版初始sticky-bit状态存在差异，服务又可能重设目录权限，因此只搜索字面量777不充分。触发将改变目标权限/内容，服务重启亦可能影响监控，恢复不能只删除符号链接。此补核保留原错误片段作为归档证据，并在其外说明缺失的因果。

变更字段：version、fixed_version、prerequisites、verification_source。原正文/围栏代码保留校验通过。

### [【已复现】Linux 本地提权漏洞CVE-2025-6018、CVE-2025-6019](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E3%80%90%E5%B7%B2%E5%A4%8D%E7%8E%B0%E3%80%91Linux%20%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9ECVE-2025-6018%E3%80%81CVE-2025-6019.md)

[Qualys 2025-06-17原始公告](https://cdn2.qualys.com/2025/06/17/suse15-pam-udisks-lpe.txt)公开了两段具体PoC。6018把SUSE15的已有低权限登录提升为polkit的allow_active身份；6019另需allow_active、udisks/libblockdev与XFS resize路径，才可通过缺少nosuid/nodev的临时挂载转为root。不能泛化为任何远程匿名用户，也不能把6018单独写成root。

原始6019示例在攻击者自己的机器上以root准备文件系统镜像，目标上从低权会话经授权的udisks动作触发；准备权限不等于目标已root。材料使用本地D-Bus、镜像/loop/挂载和SUID文件，包含真实状态修改。CNA列主线3.3.1修复及发行版低版本回补，原文“3.x>=3.2.2/其他>=3.3.1”不能不分维护分支机械比较。

变更字段：version、fixed_version、verification_source、side_effects。原正文/围栏代码保留校验通过。

### [Linux-Copy-Fail-本地提权漏洞-CVE-2026-31431](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux-Copy-Fail-%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E-CVE-2026-31431.md)

[Linux CNA记录](https://www.cve.org/CVERecord?id=CVE-2026-31431)于2026-04-22发布；[Theori公开PoC固定提交](https://github.com/theori-io/copy-fail-CVE-2026-31431/tree/09e97bd8f1aa3868b720a7a12a60b1c365798e06)为2026-04-29。两种日期不应混写。

已静态读取 `copy_fail_exp.py`：依赖Python标准库os/zlib/socket，使用AF_ALG与splice，把内嵌压缩ELF写入 `/usr/bin/su` 对应页缓存后运行 `su`，没有外部下载URL或独立恢复步骤；压缩ELF未在本库完整反汇编。这里的socket用于内核密码API，不是远程漏洞。容器测试使用宿主内核，镜像版本不能替代宿主版本或隔离证明。模块未加载不代表不可自动加载，缓解还须区分内建组件与模块。

变更字段：version、fixed_version、verification_source、side_effects。原正文/围栏代码保留校验通过。

### [Linux-kernel-xfrm-ESP-Dirty-Frag-本地提权漏洞-CVE-2026-43284](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Linux-kernel-xfrm-ESP-Dirty-Frag-%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E-CVE-2026-43284.md)

[V4bel原作者代码](https://github.com/V4bel/dirtyfrag/tree/aab16fcada27142dd8ce8704906cf6736cf213b8)固定提交已静态阅读。ESP与RxRPC是两个分别有条件的入口，两个CVE也有不同修复批次，修复一个不能推断另一已修。CNA记录：[43284](https://www.cve.org/CVERecord?id=CVE-2026-43284)、[43500](https://www.cve.org/CVERecord?id=CVE-2026-43500)。

当前 `exp.c` 的ESP路线使用loopback/XFRM，需要相应命名空间能力；RxRPC尝试自动加载模块，依赖可用算法与PAM nullok等条件，其代码可执行读取 `/etc/shadow` 的命令。两者均不属于只读自检。删除临时程序、drop_caches或rmmod失败后继续都不能证明已修复；对内建组件，简单modprobe黑名单并不生效。

变更字段：fixed_version、verification_source、side_effects。原正文/围栏代码保留校验通过。

### [【成功复现】Linux Kernel XFS Reflink本地权限提升漏洞CVE-2026-64600](../%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E3%80%90%E6%88%90%E5%8A%9F%E5%A4%8D%E7%8E%B0%E3%80%91Linux%20Kernel%20XFS%20Reflink%E6%9C%AC%E5%9C%B0%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87%E6%BC%8F%E6%B4%9ECVE-2026-64600.md)

[Qualys RefluXFS原始公告](https://cdn2.qualys.com/advisory/2026/07/22/RefluXFS.txt)明确：该漏洞的关键副作用是**写入原文件的磁盘内容，重启后仍保留**，与只改页缓存的同类宣传不能混淆。需要同一启用reflink的XFS上有可读目标和用户可写的暂存目录；不是任意文件系统都受同样路径影响。

[Linux CNA](https://www.cve.org/CVERecord?id=CVE-2026-64600)列出各稳定分支修复；没有合入修复的4.11以后代码才在该历史范围内。原作者宣称成功和本库静态补核分别记录；本库没有执行O_DIRECT竞态、修改SUID程序或验证清理，退出/重启都不能作为文件恢复办法。

变更字段：prerequisites、fixed_version、verification_source、side_effects。原正文/围栏代码保留校验通过。
