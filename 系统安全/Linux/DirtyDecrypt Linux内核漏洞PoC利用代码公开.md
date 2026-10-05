---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-31635"
identifier_role: "primary"
primary_identifiers: "CVE-2026-31635"
referenced_identifiers: ""
identifier_status: "unknown"
title: "DirtyDecrypt Linux内核漏洞PoC利用代码公开"
product: "Linux RxGK / RxRPC"
record_type: "advisory"
document_type: "漏洞发布新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "CONFIG_RXGK=y/m；本地非特权，声称滚动发行版易受影响、稳定发行版默认禁用"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/DirtyDecrypt%20Linux%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9EPoC%E5%88%A9%E7%94%A8%E4%BB%A3%E7%A0%81%E5%85%AC%E5%BC%80.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-c1f882de446c7db4e844d578"
entity_id: "ve-c1f882de446c7db4e844d578"
schema_version: "1"
---

# DirtyDecrypt Linux内核漏洞PoC利用代码公开

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Linux RxGK / RxRPC
- 文献类型：漏洞发布新闻
- 版本、权限及部署边界：CONFIG_RXGK=y/m；本地非特权，声称滚动发行版易受影响、稳定发行版默认禁用
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter漏正文主CVE；DirtyDecrypt/DirtyCBC别名需与DirtyFrag RxRPC编号区分，不同函数不同漏洞不能只按Dirty合并
2. 标题PoC公开但正文只链媒体，没有PoC或上游修复commit；4月25日仅日期不能确定已修复各分支
3. 发行版默认配置表述需按版本核验；/proc/config.gz并非所有系统都有，缺失不代表禁用
4. 黑名单对内建=y无效且esp4/esp6与主RxGK漏洞不同，需解释跨家族缓解范围；allowPrivilegeEscalation:false不能独立阻止内核漏洞逃逸
5. 完整宿主root/所有密钥是环境依赖的链式后果；新闻可保留但不能声称本地已验证

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://cybersecuritynews.com/dirtydecrypt-linux-kernel-vulnerability/>
- 原文参考链接（未重新核验）：<https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651337950&idx=1&sn=12d64571335d50c1b93389447dfb8ef1&scene=21#wechat_redirect>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 FreeBuf   2026-05-20 10:00  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a292ac9cc234e46f20d8114e58408ccfc661566640b7fb44ab2686d5eeb8dc3a.gif "")  
  
##   
  
  
针对一个被命名为DirtyDecrypt（亦被追踪为DirtyCBC）的高危Linux内核本地提权漏洞的概念验证（PoC）利用代码已公开。该漏洞允许本地攻击者在受影响系统上获取完整的root权限。安全分析师Will Dormann将该漏洞归因为CVE-2026-31635，其补丁已于2026年4月25日悄然合并至上游代码。  
  
  
**Part01**  
## 漏洞技术分析  
  
  
DirtyDecrypt漏洞存在于Linux内核RxGK子系统的rxgk_decrypt_skb()函数中。该子系统是基于GSS-API的安全层，用于Andrew文件系统（AFS）客户端所使用的RxRPC网络传输协议。研究人员Moselwal指出，漏洞根源在于缺少写时复制（COW）保护机制：当解密传入的套接字缓冲区（sk_buff）时，内核会直接写入共享的页缓存页面，而未事先创建私有副本。  
  
  
这种无保护的写入操作可能影响特权进程的内存空间，或影响特权文件（如/etc/shadow、/etc/sudoers或SUID二进制文件）的页缓存，使得本地非特权用户能够破坏并最终覆写这些页面，从而实现提权。V12研究团队将其发现描述为“由于rxgk_decrypt_skb中缺少COW保护导致的rxgk页缓存写入”，并于2026年5月9日向内核维护者报告，但被告知该漏洞与已修复的内部问题重复。  
  
  
**Part02**  
## 受影响发行版  
  
  
漏洞利用需要Linux内核编译时启用CONFIG_RXGK=y或CONFIG_RXGK=m配置选项。实际受影响的主要是紧密跟踪上游内核开发的滚动更新发行版：  
- Fedora（包括Rawhide和Workstation版本，补丁前）  
  
- Arch Linux（执行pacman -Syu前）  
  
- openSUSE Tumbleweed（执行zypper dup前）  
  
- 使用主线内核PPA或RHEL/CentOS Stream上ELRepo kernel-ml的系统  
  
稳定的企业级发行版（如Debian Stable、RHEL 8/9和Ubuntu LTS）默认禁用RxGK功能，通常不受影响。管理员可通过以下命令验证系统暴露情况：  
```
zcat /proc/config.gz | grep RXGK
```  
  
  
**Part03**  
## 容器环境风险加剧  
  
  
Moselwal特别指出，在容器环境中操作时威胁显著升级。在运行滚动更新内核的Kubernetes工作节点上，成功利用DirtyDecrypt漏洞可实现完整的容器逃逸：获取宿主机root权限意味着可访问该节点上的所有Pod、所有容器运行时套接字以及挂载的所有Kubernetes密钥。企业环境中风险最高的目标是Fedora或Arch开发工作站，这些设备通常存有活跃的kubectl上下文、AWS生产环境凭证和SSH密钥。  
  
  
值得注意的是，DirtyDecrypt是三周内XFRM/ESP/rxgk攻击面上出现的第四个Linux内核本地提权漏洞，与当前被积极利用的CopyFail漏洞家族属于同一漏洞类别。  
  
  
**Part04**  
## 缓解措施  
  
  
主要修复方案是更新包含4月25日上游补丁的内核版本：  
```
# Fedora
sudo dnf upgrade --refresh kernel kernel-core kernel-modules && sudo systemctl reboot
# Arch Linux
sudo pacman -Syu linux linux-headers && sudo systemctl reboot
# openSUSE Tumbleweed
sudo zypper dup && sudo systemctl reboot
```  
  
对于无法立即打补丁的系统，可通过黑名单禁用rxrpc、esp4和esp6内核模块作为临时解决方案，但这会导致IPsec VPN连接和AFS挂载功能中断。Kubernetes运维人员应使用已修复内核重建工作节点镜像，并在集群范围内强制实施Pod安全标准（restricted配置），确保所有工作负载默认设置allowPrivilegeEscalation: false。  
  
  
鉴于公开PoC代码的可用性以及与CopyFail漏洞高度相似的利用先例，Fedora、Arch和openSUSE Tumbleweed用户应将此漏洞修复视为当务之急。  
  
  
**参考来源：**  
  
DirtyDecrypt Linux Kernel Vulnerability PoC Exploit Code Released  
  
https://cybersecuritynews.com/dirtydecrypt-linux-kernel-vulnerability/  
  
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651337950&idx=1&sn=12d64571335d50c1b93389447dfb8ef1&scene=21#wechat_redirect)  
  
  
### 电报讨论  
  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/5ee7de92bc0c776a4967a39efb837ad629a64be64a8ffdaeb241583ae8b1cb7b.png "")  
  
****  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
