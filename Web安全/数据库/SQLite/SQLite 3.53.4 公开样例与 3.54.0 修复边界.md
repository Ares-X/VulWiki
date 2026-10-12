---
schema_version: "1"
id: "VW-20261012-sqlite-3534-3540-review"
title: "SQLite 3.53.4 公开样例与 3.54.0 修复边界"
product: "SQLite"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: ""
identifier_status: "unknown"
version: "公开样例固定 3.53.4；不推定全部更早版本"
fixed_version: "3.54.0 包含本文列出的修复；CLI .recover 不在本文收录范围"
prerequisites: "按各节区分不可信 SQL、数据库/WAL、changeset、可选扩展、应用 authorizer 或 sqlite3_rsync 操作"
side_effects: "样例会崩溃进程、改写测试数据库、创建标记文件并清理 Docker 项目或工作文件；部分依赖与基础镜像未锁定摘要"
source_status: "recorded"
source_url: "https://sqlite.org/releaselog/3_54_0.html"
---

# SQLite 3.53.4 公开样例与 3.54.0 修复边界

2026 年 10 月汇总材料把这些问题描述为尚未公开的零日，但其样例包含早至 5 月的上游修复引用。[SQLite 3.54.0](https://sqlite.org/releaselog/3_54_0.html)已于 10 月 9 日发布；本页按 10 月 12 日可核对的代码修正版本状态。上游报告或补丁日期不等于本次样例的首次发现日期。

样例统一使用 [3.53.4 固定源码](https://github.com/sqlite/sqlite/tree/b09c88c14082339b66c7b7158d609a771e64ca69)。下面列出的修复均可在 [3.54.0 固定源码](https://github.com/sqlite/sqlite/tree/6932c59ee5c280599dfae9e7b431698a7cab9687)中定位。部分修复也回移至 3.53 开发分支，但不能把分支 VERSION 中的 3.53.5 当成已发布版本。更早受影响版本下界未逐一建立。

## 命令行同步工具

- **sqlite3_rsync 远端文件名**：[完整样例](https://github.com/abraxas/sqlite-rsync-ssh/tree/502b38669b30c184d7adc9b889189ce06913ba23)模拟 SSH 拼接参数后的远端 shell 解释，观察标记文件。受害者必须运行同步工具并使用攻击者控制的远端路径，影响为 SSH 远端账户权限；不是单纯打开 SQLite 数据库即可触发。样例使用 fake_ssh.py，没有验证真实 sshd 端到端链。[10 月 7 日补丁](https://github.com/sqlite/sqlite/commit/b0db2db98870acc7917329bc904ee1265e906bf6)将需转交的文件名编码为 A–P 十六进制字符，并让对端解码；部署时应同步更新两端工具。

## 应用授权回调

这两项要求应用自行安装 sqlite3_set_authorizer 回调；[官方接口说明](https://sqlite.org/c3ref/set_authorizer.html)明确其默认关闭，不能从 SQLite 版本直接推导任意应用可远程越权。

- **FULL JOIN USING**：[样例](https://github.com/abraxas/sqlite-fj-using-auth/tree/133c920ef745bc9dc7d6809394c76f25c331b988)对右表列设置 DENY/IGNORE，比较普通读取与 FULL JOIN USING 生成的 coalesce 表达式。3.53.4 的该表达式路径漏掉列读取回调。7 月 5 日初次修复重复检查第一个元素，[7 月 24 日后续补丁](https://github.com/sqlite/sqlite/commit/5694c3bb2a6a40770ecd2f65910eea756734dfd8)才遍历每个实际元素；不能仅凭初次补丁认定修复完整。
- **INSERT SELECT 快速复制**：[样例](https://github.com/abraxas/sqlite-xfer-auth/tree/2d5397ccfdb870c4d5ddedae5244af67987a8440)允许向兼容目标表 INSERT，但拒绝源表 SELECT/READ。旧 xferOptimization 直接复制记录，源表回调未触发。[5 月 21 日上游增强](https://github.com/sqlite/sqlite/commit/6ae99493992cd05bcbae9734d6974d2405070593)增加 SELECT 与逐列读取授权；回归测试还覆盖 IGNORE 转为 NULL。这是应用授权边界的加固，不能写成默认数据库的网络提权。

## 可选扩展和损坏数据

- **FTS3/4 snippet**：启用 FTS3/4 及所需查询语法后，OR/NEAR 查询的求值重启可使 snippet 保存的位置列表指针失效。完整样例含正常查询对照；上游增加双遍历和对应回归，修复日期为 8 月 17 日。 [完整样例](https://github.com/abraxas/sqlite-fts3-snippet/tree/65c1528608899c464e7551eee8d37e6b05b7dcb8)；[厂商补丁与测试](https://github.com/sqlite/sqlite/commit/a87bd2471a9c0606e78d3c3678bcd9cecaa0e731)
- **RTree 节点编号为零**：需要 RTree 扩展和受控影子表触发器等异常结构；重新打开数据库后，节点插入被忽略，last_insert_rowid 保持零，随后分裂与访问触发悬空指针。9 月 24 日补丁在编号为零时返回损坏错误，避免把无效节点放入哈希表。 [完整样例](https://github.com/abraxas/sqlite-rtree-rowid0/tree/f8ccc8a4b014daab04eed76aeb895148a96ca6ac)；[厂商补丁与测试](https://github.com/sqlite/sqlite/commit/d21bd37c7cfc1b85b17a6703555f0926b6236e04)
- **Session changeset 列数变化**：要求 Session/Preupdate 功能及应用传入不可信二进制 changeset。样例先声明同名表有两列，再声明 64 列，旧缓存没有重新初始化；8 月 17 日补丁改为按新表头重置上下文。普通 SQL 或仅打开数据库不等价于该入口。 [完整样例](https://github.com/abraxas/sqlite-session-ncol/tree/4852c718493170b61dd940a258ad4c97b682aba9)；[厂商补丁与测试](https://github.com/sqlite/sqlite/commit/64459c87cc702d600704fb77ee40ca1782398a52)
- **数据库与 WAL 页大小不一致**：样例构造 4096 字节数据库页与 512 字节 WAL 帧，并预置自身标记到页缓存，观察短读后的旧尾部。8 月 16 日补丁把不足部分清零。其备用成功条件接受非零尾部，故不能仅凭 SUCCESS 推定真实敏感数据泄露。 [完整样例](https://github.com/abraxas/sqlite-wal-pagesize/tree/eb12ab0cd20354068dfc11b27441b78160ed8baf)；[厂商补丁与测试](https://github.com/sqlite/sqlite/commit/e5bf119821f25be1d7f10ef0a2edbe175289166e)
- **FTS5 前缀查询列表合并**：要求 FTS5 detail=none，索引内含极小负 rowid 与正 rowid。前缀查询合并列表时编码后的差值可能比输入占用更多字节；8 月 4 日补丁增加九字节余量并使用无符号差值。该路径不是 FTS5 的 merge 维护命令。 [完整样例](https://github.com/abraxas/sqlite-fts5-rowidmerge/tree/af7b95eda558706f1e9e18cbe0eca83ee5ff67a7)；[厂商补丁与测试](https://github.com/sqlite/sqlite/commit/e1c9934f9f11a499029abb020ea715a08970da80)
- **FTS5 secure-delete**：要求表级 secure-delete 开启、损坏索引和实际 DELETE/更新写回；该选项默认关闭，不能与 PRAGMA secure_delete 混同。样例含完整 5120 字节数据库十六进制夹具；8 月 11 日补丁保留原页大小、扩大偏移累加器并检查越界。 [完整样例](https://github.com/abraxas/sqlite-fts5-securedel/tree/e405408657157a1fb6f524b9bc700978c471c84c)；[厂商补丁与测试](https://github.com/sqlite/sqlite/commit/d9de6eedbe918c074c7556400fa21df5960704d9)

内存错误样例主要以 ASan 报告或崩溃为证据，没有建立通用代码执行链；WAL 修复提交本身不附新增测试，信息泄露表现来自另行链接的样例。

## 表达式及查询深度

- **连续 COLLATE**：[样例](https://github.com/abraxas/sqlite-collate-depth/tree/5aab28547e20a67ebe2a83c3db7b3d006c26aa9b)用正常短链作对照，长链超出预期表达式深度但旧代码未累计高度。[10 月 4 日补丁](https://github.com/sqlite/sqlite/commit/d54522a5b832422ab893a1e9fa7a99ab314ea4e2)递增 nHeight 并检查限制。
- **依赖 CTE 链**：[样例](https://github.com/abraxas/sqlite-cte-nest/tree/aa759437edf6e26cb2124f94eb61390bd8c8f6e3)比较普通嵌套视图、嵌套 FROM 与长 CTE 链。[10 月 5 日修复](https://github.com/sqlite/sqlite/commit/e6ff280c839fdfc7418fd5add12e8f32702a17fb)在 CTE 解析时累计 nNestSel；[后续补丁](https://github.com/sqlite/sqlite/commit/996ded6c48574b478210032275e4057ca08e6b68)补充游标数量限制。相关高度限制依赖非零 SQLITE_MAX_EXPR_DEPTH。
- **VALUES 与 count-of-view 优化**：[样例](https://github.com/abraxas/sqlite-values-union/tree/be6f35da7320ad001e52e2a36633cf4ee76b95d5)用 WITH 使大 VALUES 列表进入复合查询，再由 count(*) 优化生成加法表达式链；错误清理可耗尽 C 栈。[10 月 5 日实际补丁](https://github.com/sqlite/sqlite/commit/eff50a067c55f972909e7780e506e91382d08de2)在已有解析错误时释放并清空累计表达式，**不是原 README 所称的统一 VALUES 行数上限**。

这些样例依赖应用准备攻击者可控 SQL，或处理可达相同路径的恶意结构。ASan、编译选项和栈大小影响崩溃阈值，文中不把实验行数当成通用边界，也不采纳缺少应用威胁模型的网络评分。

## 材料完整性与静态审阅范围

上述固定样例的 README、全部程序、Dockerfile、Compose、启动与清理脚本，以及 secure-delete 十六进制夹具均已读；逐项对照厂商补丁和发布源码。此处为静态审阅，没有执行样例或安装依赖。容器端 HTTP 常监听所有接口，Compose 仅向宿主回环地址发布；脚本可能删除工作文件或项目卷，部分异常退出缺少清理 trap。Debian 标签、apt 包及多数源码下载未锁定摘要，少数脚本虽校验源码 SHA3，也不代表全部传递依赖已审计。fake_ssh 仅设置工作目录，不构成文件系统隔离。

样例仓库声明 AGPL-3.0；本文使用原创中文归纳及固定链接，不复制完整程序。未确认 CVE 分配，因此不给这些仓库自拟名称赋予正式漏洞编号。CLI go/slash 的默认脚本行为及尚未解决厂商修复状态的 .recover 材料分别留在审阅台账，不计入本页技术问题。
