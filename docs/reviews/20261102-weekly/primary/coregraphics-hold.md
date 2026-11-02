# CoreGraphics Type 5 / CMap 候选复核（HOLD）

核对时间：2026-11-02。候选由 gelusus/wxvl 的本轮第15篇指向 Ping-2o/CVE-2026-112611-cg-shading。

## 固定来源与覆盖

固定提交：`ef20b59a9793147f82d0d13541a46ca34866cbf1`，2026-10-27T09:46:21Z。递归Git tree 12项、truncated=false，其中9个文件全部读取：README、.gitignore、4篇analysis、2个PoC生成器、1个IPS解析器。没有工作流、安装脚本、外部依赖manifest、预制PDF或其他二进制。没有LICENSE文件；用途声明不等于转载许可证，不整篇翻译或重新发布生成器。

原仓库：https://github.com/Ping-2o/CVE-2026-112611-cg-shading/tree/ef20b59a9793147f82d0d13541a46ca34866cbf1

## 真实具体材料

`poc/make_poc_shading.py`（blob8d4bb9573176b5cd2eb3211817861b0288121bed）确实提供完整PDF结构、xref和顶点流生成逻辑，不是空仓或只提供补丁。它把DeviceGray的1维输出与FunctionType2的136维Range组合，并生成1维对照。作者报告在iPhone16e / iOS27.0 RC 24A435的Preview两次出现同一EXC_BAD_ACCESS，地址0x3ff000000000001c；对照正常。修复侧27.2 RC 24B115仅由作者静态核对，不是设备双侧实验。原始IPS由作者未公开，本库没有删除或遮盖它。

`poc/make_poc_cmap.py`（blob37a4f6f1f263603cffadae859e54f725aa89c69b）生成嵌入CMap的32/8/128长度样本及2字节对照。作者正文同时明确：所试嵌入CMap载体不触发推定CVE递归路径，另外的csr128也没有在测试设备崩溃，可达性未证明。不能将它标为已成立的112610利用，也不能把静态“残留第三处”推断说成当前版本已确认0day。

材料存在两个不应静默改写的小冲突：README称7-object PDF，但shading生成器objects字典仅1..6六个对象；内容流字面量b" /Sh1 sh"为7字节而字典写Length8。这些是静态观察，不执行生成器、更不猜改原代码或否认来源崩溃记录。

## Apple 官方核对与主要阻塞

已读Apple原公告 https://support.apple.com/en-us/149230 ：2026-10-26发布的iOS/iPadOS27.2，CoreGraphics条目将CVE-2026-112611及112610合列为处理恶意PDF导致内存破坏，越界写通过边界检查修复。公告没有分别指定Type5与CMap函数。

已读Apple CNA记录：

- https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/112xxx/CVE-2026-112611.json
- https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/112xxx/CVE-2026-112610.json

二者均列出iOS/iPadOS26.7.2、27.2及macOS Sequoia15.8.2、Tahoe26.7.2修复；具体PoC只对应作者的24A435实验，不能扩展宣称全部这些平台成功。两份CNA同样没有Type5/CMap一对一归属证据。

最关键的是原作者README明确写归属只是probable/ranking，静态不能确定哪一处对应哪一编号。因此不能把Type5→112611和CMap→112610正式录入主编号索引。本轮按指定严格映射门槛保留HOLD台账；缺的是准确编号—代码路径对应证据，不是缺生成器，也不是要求本项目执行复现。若后续原作者或Apple提供对应关系，可重新审阅；不以analysis/needs-review绕过门槛。

## 静态反投毒与副作用

三个Python文件逐行读取，生成器仅用标准库os在脚本所在目录创建/覆盖指定PDF并回读自校验，IPS解析器仅用json/sys读取用户传入文件并输出。未见网络库、远端下载、shell/subprocess、eval/exec、操作者凭据遍历、持久化或隐蔽外传。IPS解析器本身对输出字符串做[:300]/[:400]/[:22]和线程8帧上限；这是上游现有显示行为，不将它引入本库诊断/脱敏工具，不修改原代码。

明显副作用是生成器写磁盘并可能覆盖已有同名样本；打开生成的恶意PDF可使渲染进程崩溃、丢失会话状态。控制值造成故障地址并不证明任意代码执行、sandbox escape或PAC绕过，不升级为RCE。没有安装依赖、执行生成器/IPS工具、生成/预览PDF或运行漏洞。
