---
source: "gelusus/wxvl 公众号漏洞文库"
product: "vm2 / WebAssembly异常边界"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-26956"
referenced_identifiers: "CVE-2026-22709; CVE-2023-30547; CVE-2023-29017; CVE-2022-36067"
identifier_role: "primary"
identifier_status: "unknown"
title: "vm2 沙箱严重漏洞可导致在宿主机执行代码"
prerequisites: "来源所述条件，未列明部分仍待核：确认3.10.4，修复3.10.5；明确Node25及Wasm异常/JSTag、Node25.6.1实测；此前版本仅可能"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2c887e6ccfb1e5e7cbf81674"
entity_id: "ve-2c887e6ccfb1e5e7cbf81674"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：确认3.10.4，修复3.10.5；明确Node25及Wasm异常/JSTag、Node25.6.1实测；此前版本仅可能

代码与实验材料：机制文字完整，无PoC代码或官方链接

来源证据范围：BleepingComputer原文，维护者公告转述

- **事实待核（1）**：编号元数据遗漏且旧版范围不确定；依据：frontmatter仅source，应主编号26956；“此前可能”不能自动扩为全部旧版。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：PoC公开不等于本文验证；依据：只说公告含PoC，未链接具体advisory或代码，须保留未核验。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：Node条件是关键增量；依据：合并636摘要时不可丢Node25/JSTag前提。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  vm2 沙箱严重漏洞可导致在宿主机执行代码  
Bill Toulas
                    Bill Toulas  代码卫士   2026-05-07 10:17  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**流行的 Node.js 沙箱库 vm2 中存在一个严重漏洞 (CVE-2026-26956)，可导致攻击者逃逸沙箱并在宿主系统上执行任意代码。该漏洞已确认影响 vm2 版本3.10.4，不过此前版本也可能易受攻击。该漏洞的概念验证代码已公开。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该库的维护人员在安全公告中提到，该漏洞仅影响启用了 WebAssembly 异常处理和 JSTag 支持的Node.js 25的环境（已在Node.js 25.6.1上得到确认）。  
  
vm2 是一个开源的 Node.js 库，用于在受限的沙箱环境中运行不受信任的 JavaScript 代码。该库常被需要执行用户提供脚本的在线编程平台、自动化工具和SaaS 应用所使用。该库试图将沙箱代码与宿主系统隔离，并阻止其访问敏感的 Node.js API 如进程和文件系统的访问权限。  
  
vm2 使用广泛，在 Node.js 的默认命令行包管理器 npm 上的每周下载量超过130万次。CVE-2026-26956源于该库在处理沙箱环境和宿主之间的跨越边界的异常时出错。安全公告解释称，vm2 在正常情况下依赖 JavaScript 层面的防护机制来防御宿主环境抛出的错误和并以来“桥接代理”来包装跨上下文对象，这两种机制完全运行在 JavaScript 层面。然而，WebAssembly 的异常处理机制能够在谷歌 V8 引擎的更底层拦截 JavaScript 错误，从而绕过 vm2 基于 JavaScript 构建的安全防御。  
  
攻击者通过利用Symbol-to-string 转换触发精心构造的 TypeError，能够使宿主端的错误对象泄露未经 vm2 完全清理就直接泄露回沙盒中。由于泄露的对象源自宿主环境，攻击者可以利用其构造函数链重新获取 Node.js 内部对象（如 process 对象）的访问权限，最终在宿主机上实现任意命令执行。  
  
安全公告中还包含一个概念验证（PoC）漏洞利用代码，展示如何在宿主机上实现远程代码执行。建议 vm2 的使用者尽快升级到 3.10.5 或更高版本（最新版本为 3.11.2），以降低 CVE-2026-26956 漏洞利用带来的风险。  
  
今年年初，vm2 被指受另一个严重的沙箱逃逸漏洞（CVE-2026-22709）影响，可导致攻击者在底层宿主机系统上执行任意代码。此前影响该库的沙箱逃逸漏洞还包括 CVE-2023-30547、CVE-2023-29017 和 CVE-2022-36067，凸显了在 JavaScript 沙箱环境中安全隔离不受信任代码所面临的挑战。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[热门 NodeJS 库 vm2中存在严重的沙箱逃逸漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524984&idx=2&sn=e5fceae455445bc2b4660ccfb24127dd&scene=21#wechat_redirect)  
  
  
[速修复！VM2 库中又出现严重的沙箱逃逸漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516269&idx=1&sn=02f92ed155ba727f4c05720d3c0cd9c4&scene=21#wechat_redirect)  
  
  
[Palo Alto 提醒注意严重的 PAN-OS RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525932&idx=2&sn=a1f8acec7865ec3eec445777c4ad6251&scene=21#wechat_redirect)  
  
  
[仅凭一条 git push 命令，即可在 GitHub 实现RCE 并访问数百万仓库](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525909&idx=1&sn=3a1d88cd8e20887b0792cd899f1b843e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/security/critical-vm2-sandbox-bug-lets-attackers-execute-code-on-hosts/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
