---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-46300;CVE-2026-43503;CVE-2026-46331;CVE-2026-43494;CVE-2026-46333;CVE-2026-31431;CVE-2026-43284;CVE-2021-4034;CVE-2021-3560;CVE-2022-0847"
identifier_role: "primary"
primary_identifiers: "CVE-2026-46300;CVE-2026-43503;CVE-2026-46331;CVE-2026-43494;CVE-2026-46333;CVE-2026-31431;CVE-2026-43284;CVE-2021-4034;CVE-2021-3560;CVE-2022-0847"
referenced_identifiers: ""
identifier_status: "unknown"
title: "提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX"
product: "RootHawkX / Linux内核与Polkit"
record_type: "roundup"
document_type: "Linux多漏洞工具推广与模块目录"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Linux amd64二进制及内核/模块/namespace/权限条件均逐模块不同；无兼容矩阵或源码可访问链接"
side_effects: "介绍一键验证/盲测-any实际执行多个写pagecache/SUID和读取秘密的利用，不能当无损检测，需明确破坏性与范围"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E6%8F%90%E6%9D%83%E9%AA%8C%E8%AF%81%E4%B8%80%E9%94%AE%E6%90%9E%E5%AE%9A%EF%BC%9A%E5%85%A8%E9%9D%A2%E9%9B%86%E6%88%90%E7%9A%84%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9E%E6%B5%8B%E8%AF%95%E5%B7%A5%E5%85%B7%20RootHawkX.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-2174239f4ea3308a3f990f86"
entity_id: "ve-2174239f4ea3308a3f990f86"
schema_version: "1"
---

# 提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：RootHawkX / Linux内核与Polkit
- 文献类型：Linux多漏洞工具推广与模块目录
- 版本、权限及部署边界：Linux amd64二进制及内核/模块/namespace/权限条件均逐模块不同；无兼容矩阵或源码可访问链接
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. Windows目录错误，纯Linux工具文章；它是11模块目录非11条本篇独立已验证漏洞，DirtyPipe也不应列应用层
2. 介绍一键验证/盲测-any实际执行多个写pagecache/SUID和读取秘密的利用，不能当无损检测，需明确破坏性与范围
3. ssh-keysign-pwn是内核竞态利用场景而非SSH协议漏洞；DirtyPipe任意只读文件忽略偏移/页边界等约束
4. PinTheft/RDS与io_uring链、DirtyFrag编号等需对原研究逐模块核映射；当前缺版本/修复信息，不能凭集合名称统一归类
5. 首个示例/roothawkx路径与其余./相对路径不一致；源码地址需公众号口令获取，致谢仅名称无URL，无法审查打包二进制
6. 截图未视检，移工具目录并保留来源引用，不运行/下载该工具

### 操作风险

介绍一键验证/盲测-any实际执行多个写pagecache/SUID和读取秘密的利用，不能当无损检测，需明确破坏性与范围

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 s0cke3t
                        s0cke3t  警戒线安全   2026-06-30 07:36  
  
# 前言  
  
在执行授权渗透测试或红队评估时，提权 PoC 的碎片化往往让人头疼。手头的测试脚本五花八门，而且很多 C 语言编写的底层漏洞由于机制限制，必须在目标机器上现场编译。面对不同的系统，手动解决编译依赖会消耗大量时间。  
  
为了让提权验证更加顺畅，我们在原版 RootHawk 的基础上开发了 RootHawkX。在原工具的基础上我们重点补充了近期爆发的多个 Linux 高危提权漏洞(如 CVE-2026-46300(Fragnesia)、CVE-2026-43503(DirtyClone)、CVE-2026-46331(COW)、CVE-2026-43494(PinTheft)以及一个ssh信息泄露漏洞(CVE-2026-46333))，并将它们与经典的提权模块统一整合。![main](../../Web%E5%AE%89%E5%85%A8/.resource/remote/d472f8eb82f437ccf9428543a598bfab9047bb854d047054dd928493f15a12ad.png "")  
  
## 模块清单  
  
目前我们在工具中统一集成了 11 个热门的 Linux 提权漏洞，覆盖了近几年的高频内核态与应用层缺陷。![modules](../../Web%E5%AE%89%E5%85%A8/.resource/remote/818892396ce1eab38c832080808135ebf2965b5d97be0f685ea319878dccf851.png "")  
  
  
**内核提权模块：**  
- **Copy Fail (CVE-2026-31431)**  
：该漏洞涉及 crypto 子系统中 AF_ALG 与 algif_aead 的逻辑缺陷。利用此缺陷，本地普通用户可以非法提升权限。  
  
- **Dirty Frag (CVE-2026-43284)**  
：主要利用了内核网络数据包处理路径中的缺陷，包括 xfrm/esp 模块以及 shared skb frags 的处理问题。  
  
- **DirtyClone (CVE-2026-43503)**  
：通过 net/skbuff 的共享分片克隆机制缺陷来实现提权。  
  
- **Fragnesia (CVE-2026-46300)**  
：针对 XFRM ESP-in-TCP 子系统中的逻辑 Bug 进行利用。代码会通过 page cache 直接覆写 /usr/bin/su  
 等文件来获取 Root 权限。  
  
- **COW / Pedit (CVE-2026-46331)**  
：利用 net/sched 下 act_pedit 模块的缺陷，覆写内核中的脏数据。  
  
- **PinTheft (CVE-2026-43494)**  
：结合了 RDS 协议的零拷贝 double-free 缺陷，以及 io_uring 的 page cache overwrite 技术，直接篡改目标系统的 SUID 二进制文件。  
  
- **DirtyDecrypt (dirtydecrypt)**  
：利用 rxgk_decrypt_skb() 函数缺少 COW (Copy-On-Write) 保护的问题，导致 page cache 被恶意写入。  
  
**信息泄露与应用层模块：**  
- **ssh-keysign-pwn (CVE-2026-46333)**  
：内核在进程退出路径中存在竞态条件，从而引发敏感信息泄露。  
  
- **PwnKit (CVE-2021-4034)**  
：Polkit 的 pkexec 工具在处理命令行参数时存在越界写入缺陷。利用此缺陷，攻击者可通过特定环境变量将恶意代码注入执行流，直接获取最高权限。  
  
- **Polkit 权限绕过 (CVE-2021-3560)**  
：漏洞源于 Polkit 处理 D-Bus 请求时的逻辑缺陷。攻击者可以在请求中途主动断开连接，利用系统的错误处理机制绕过身份验证。  
  
- **Dirty Pipe (CVE-2022-0847)**  
：Linux 内核管道（Pipe）机制在处理页面缓存（Page Cache）标志时存在校验漏洞。普通用户可借此跨越权限边界，向系统中的任意只读文件（例如 /etc/passwd）写入数据。  
  
## 示例  
  
将二进制文件传到目标机器后，直接使用 -list  
 命令即可查看支持的漏洞清单。  
  
如果已经确定目标系统的内核版本及对应漏洞，用 -e  
 参数指定 CVE 编号或漏洞别名即可触发。例如：  
/roothawkx_linux_amd64 -e CVE-2026-46331  
![CVE-2026-46331](../../Web%E5%AE%89%E5%85%A8/.resource/remote/d525d4f8ce90fd00ba1e55b0a4317fdf541669645b1a49218fbc9229eb64fb2a.png "")  
  
  
或者使用别名  
  
./roothawkx_linux_amd64 -e dirtyclone  
![Dirtyclone](../../Web%E5%AE%89%E5%85%A8/.resource/remote/4ece1375edbc444a9441c78001d18b23cafb3dfb91433530fc0a69b86cfc6f9e.png "")  
  
  
遇到不确定漏洞情况的盲测场景，可以直接附加 -any  
 参数。工具会按照内置的漏洞列表依次执行利用尝试。  
  
针对 ssh-keysign-pwn 漏洞，工具提供了 -target shadow  
（读取哈希）和 -target key  
（窃取私钥）两种运行模式，可以根据任务需求灵活切换。  
  
./roothawkx_linux_amd64 -e keysign  
![keysign](../../Web%E5%AE%89%E5%85%A8/.resource/remote/ef01732936ffc4cb22e338479a59486ca75b5731559204150689ddb35556d41d.png "")  
  
  
./roothawkx_linux_amd64 -e keysign -target shadow  
![keysign shadow](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2b66ccf0fc6f6e286707701dbb999444eaf6791c1fb189a11d7762648b8a0b10.png "")  
  
## 致谢  
  
RootHawkX 并非从零构建，它的诞生离不开开源社区里许多白帽子的无私分享。以下是我们在开发过程中重点借鉴的开源项目和漏洞 PoC 来源：  
- **RootHawk (RoadBicycle-C)**  
：这是本项目最初始的基础框架，为后续模块的接入打下了底子。  
  
- **v12-security**  
：该团队开源的 PoC 仓库为我们提供了 Fragnesia、PinTheft 以及 DirtyDecrypt 等漏洞的核心利用代码。  
  
- **0xBlackash**  
：公开分享了 CVE-2026-46331 (COW)、CVE-2026-43503 (DirtyClone) 以及 CVE-2026-46333 (ssh-keysign-pwn) 的分析与利用代码。  
  
### 下载  
  
关注公众号警戒线安全  
后台回复20260630  
获取仓库地址  
  
如果你在使用中遇到了问题亦或是有新的想法欢迎提交issue  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
