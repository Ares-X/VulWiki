---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  提权验证一键搞定：全面集成的内核漏洞测试工具 RootHawkX  
原创 s0cke3t
                        s0cke3t  警戒线安全   2026-06-30 07:36  
  
# 前言  
  
在执行授权渗透测试或红队评估时，提权 PoC 的碎片化往往让人头疼。手头的测试脚本五花八门，而且很多 C 语言编写的底层漏洞由于机制限制，必须在目标机器上现场编译。面对不同的系统，手动解决编译依赖会消耗大量时间。  
  
为了让提权验证更加顺畅，我们在原版 RootHawk 的基础上开发了 RootHawkX。在原工具的基础上我们重点补充了近期爆发的多个 Linux 高危提权漏洞(如 CVE-2026-46300(Fragnesia)、CVE-2026-43503(DirtyClone)、CVE-2026-46331(COW)、CVE-2026-43494(PinTheft)以及一个ssh信息泄露漏洞(CVE-2026-46333))，并将它们与经典的提权模块统一整合。![main](https://mmbiz.qpic.cn/sz_mmbiz_png/JCFOeHWnhFOSVeBUJyQFicQx7wXflHDGe0e807DOX18aEHS5pTa0EputVu540MBqQ8BZx8ibk8Klow1IjA6uPO726dQYrR2gb6l3OIb97GFgM/640?wx_fmt=png&from=appmsg "")  
  
## 模块清单  
  
目前我们在工具中统一集成了 11 个热门的 Linux 提权漏洞，覆盖了近几年的高频内核态与应用层缺陷。![modules](https://mmbiz.qpic.cn/sz_mmbiz_png/JCFOeHWnhFPWCLJlcRljzyt71bsa9ksicHFryqL15xEvvlmCmx5Vms0W4sxWHuDwXzAxgKCTDEuW5zN2SM0PYsVgx0rZY54o83vV9qS6r7R4/640?wx_fmt=png&from=appmsg "")  
  
  
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
![CVE-2026-46331](https://mmbiz.qpic.cn/mmbiz_png/JCFOeHWnhFPQU3eiceVaHGiaGoyMRCyZ4oGSCbge4eDwyuNbLFBtpM2nFKnhAdEXDa2XuL3QpYxEVTqbjMhfXnbfciaUCE4QTnzkfSS3Rj9iacg/640?wx_fmt=png&from=appmsg "")  
  
  
或者使用别名  
  
./roothawkx_linux_amd64 -e dirtyclone  
![Dirtyclone](https://mmbiz.qpic.cn/mmbiz_png/JCFOeHWnhFP4Eb1V5zo6DM0sPD9F3nIHutc4B2DS10D6jcCJWfmFksJI9dVQ07roCkviamb4MaZEBBLPyrU8k9HkwZiaWXhb3Via1jKVRHfdyc/640?wx_fmt=png&from=appmsg "")  
  
  
遇到不确定漏洞情况的盲测场景，可以直接附加 -any  
 参数。工具会按照内置的漏洞列表依次执行利用尝试。  
  
针对 ssh-keysign-pwn 漏洞，工具提供了 -target shadow  
（读取哈希）和 -target key  
（窃取私钥）两种运行模式，可以根据任务需求灵活切换。  
  
./roothawkx_linux_amd64 -e keysign  
![keysign](https://mmbiz.qpic.cn/sz_mmbiz_png/JCFOeHWnhFMhnogc40I3PaL04ypT4ptIJFRFmr6eiaUDHlnlfUghiaQJnS4SFdYpVr1ziayjqtg8Kj3wkl3KCIPl79fruiaqWdh3sTVRZrUKAT8/640?wx_fmt=png&from=appmsg "")  
  
  
./roothawkx_linux_amd64 -e keysign -target shadow  
![keysign shadow](https://mmbiz.qpic.cn/sz_mmbiz_png/JCFOeHWnhFO07UibTRehhmzyfrTks3RJ34QSibKJFMvViaic5lq1jVr3Jq9tWgHND7hMjia2EDdxZtVibKJstqEIcu2jGuhuribow36fJoYy4qNTr0/640?wx_fmt=png&from=appmsg "")  
  
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

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
