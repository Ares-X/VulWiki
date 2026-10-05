---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Git submodule/BundleURI/wincred"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-48384; CVE-2025-48385; CVE-2025-48386"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Git项目修复三大漏洞：远程代码执行、任意文件写入与缓冲区溢出"
prerequisites: "来源所述条件，未列明部分仍待核：Blanket all<=2.50.0 plus branch fixes; platforms/features differ and introduction ranges not separated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3136ecee16fdfe1277220520"
entity_id: "ve-3136ecee16fdfe1277220520"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Blanket all&lt;=2.50.0 plus branch fixes; platforms/features differ and introduction ranges not separated

代码与实验材料：No PoC;48384 symlink/hook conditions,48385BundleURI,48386wincred explanations

来源证据范围：SecurityOnline only; quoted Git advisories unlinked

- **事实待核（1）**：Universal all-version applicability ignores per-feature introduction/platform and backported patches。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：bundle.heuristic mitigation and Windows defaultwincred assertions need primary verification;48384CVSS8.1 differs1098.0。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Git项目修复三大漏洞：远程代码执行、任意文件写入与缓冲区溢出  
 FreeBuf   2025-07-09 11:01  
  
![](../../.resource/remote/a292ac9cc234e46f20d8114e58408ccfc661566640b7fb44ab2686d5eeb8dc3a.gif "")  
  
  
![](../../.resource/remote/382e55b9c6eff74173937337d8d57fa33d688a070d339e1d1d15353446eaf711.jpg "")  
  
  
**Part01**  
## 漏洞概述  
  
  
Git项目近日发布更新，修复了影响Git v2.50.0及之前版本的三个重大漏洞，包括：  
  
  
1. 仓库克隆过程中可能引发远程代码执行（RCE）的漏洞  
  
2. 允许任意文件写入的漏洞  
  
3. Windows凭据处理中的缓冲区溢出漏洞  
  
  
这些漏洞编号为CVE-2025-48384、CVE-2025-48385和CVE-2025-48386，已在v2.50.1及v2.43.7至v2.49.1等长期支持版本中修复。  
  
  
**Part02**  
## 漏洞详情  
  
  
CVE-2025-48384：配置引号处理不当导致的任意代码执行（CVSS 8.1）  
  
  
该漏洞源于Git在写入配置值时对回车符（CR）的错误处理。攻击者若在子模块路径末尾添加回车符，Git会错误解析修改后的路径，并在检出后执行恶意钩子脚本。  
  
  
安全公告指出："如果存在符号链接将修改后的路径指向子模块钩子目录，且该子模块包含可执行的post-checkout钩子，该脚本可能会在检出后被意外执行。"  
  
  
此漏洞可在递归克隆不受信任仓库的子模块时被利用，对使用含嵌套依赖的开源项目的开发者构成高风险。  
  
  
缓解措施：  
升级至已修复版本，或避免从未知来源递归克隆子模块。  
  
  
CVE-2025-48385：Bundle-URI参数注入导致的任意文件写入（CVSS 8.6）  
  
  
该漏洞影响Git的bundle URI功能（该功能通过CDN托管预打包文件加速克隆）。由于Git客户端对URI验证不足，远程服务器可注入恶意协议命令，将文件写入目标目录之外的位置。  
  
  
Git公告称："这种协议注入会导致客户端将获取的bundle写入攻击者控制的位置...最坏情况下可导致任意代码执行。"  
  
  
虽然bundle URI功能默认关闭，但当用户或项目显式启用该功能，或递归克隆攻击者控制的子模块时，仍可能被利用。  
  
  
缓解措施：  
禁用bundle.heuristic配置，避免递归克隆不受信任仓库。  
  
  
CVE-2025-48386：wincred凭据助手的缓冲区溢出（CVSS 6.3）  
  
  
该漏洞是Windows平台wincred助手的典型缓冲区溢出问题。由于wcsncat()函数缺乏边界检查，攻击者可通过溢出用于凭据比较和存储的静态缓冲区触发内存损坏。  
  
  
公告说明："该凭据助手在追加内容前未正确检查缓冲区剩余空间...可能导致缓冲区溢出。"  
  
  
虽然攻击复杂度较高，但在默认启用wincred的Windows系统上仍存在风险。  
  
  
缓解措施：  
升级Git版本，若无法立即升级则禁用wincred助手。  
  
  
**Part03**  
## 受影响版本及修复方案  
  
  
所有v2.50.0及之前版本均受影响，以下分支已包含修复：  
  
- v2.50.1  
  
- v2.49.1  
  
- v2.48.2  
  
- v2.47.3  
  
- v2.46.4  
  
- v2.45.4  
  
- v2.44.4  
  
- v2.43.7  
  
强烈建议开发者与DevOps团队立即更新，特别是在自动化CI/CD流水线中使用Git，或经常克隆外部仓库的环境。  
  
  
**参考来源：**  
  
Git Project Patches 3 Flaws: RCE, Arbitrary File Writes & Buffer Overflow  
  
https://securityonline.info/git-project-patches-3-flaws-rce-arbitrary-file-writes-buffer-overflow/  
  
  
###   
###   
###   
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651324554&idx=1&sn=bdeb8779451111167a89a91cea7654df&scene=21#wechat_redirect)  
  
### 电台讨论  
  
****  
  
  
  
![图片](../../.resource/remote/9e6a809b9fdf5ef44cf7cd86b8e001b4411ee0bfd0f43b726a7d5f1d85e9c9a1.gif "")  
  
   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
