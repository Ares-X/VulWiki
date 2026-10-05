---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "停用UEFI安全启动，宏碁多款电脑存在严重安全漏洞"
product: "Acer UEFI HQSwSmiDxe"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "无需用户交互不等于无需本地高权限，应补NVRAM写权限条件；五机型缺各BIOS修复版本与Acer/ESET原始链接"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%81%9C%E7%94%A8UEFI%E5%AE%89%E5%85%A8%E5%90%AF%E5%8A%A8%EF%BC%8C%E5%AE%8F%E7%A2%81%E5%A4%9A%E6%AC%BE%E7%94%B5%E8%84%91%E5%AD%98%E5%9C%A8%E4%B8%A5%E9%87%8D%E5%AE%89%E5%85%A8%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-8ab154bc55acc5cc1282eaa3"
entity_id: "ve-8ab154bc55acc5cc1282eaa3"
schema_version: "1"
---

# 停用UEFI安全启动，宏碁多款电脑存在严重安全漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Acer UEFI HQSwSmiDxe
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：无需用户交互不等于无需本地高权限，应补NVRAM写权限条件；五机型缺各BIOS修复版本与Acer/ESET原始链接
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 4020缺元数据
2. 无需用户交互不等于无需本地高权限，应补NVRAM写权限条件
3. 五机型缺各BIOS修复版本与Acer/ESET原始链接
4. SecureBoot不保证绝对无恶意代码
5. 联想背景另关联不混产品
6. 清投稿联系方式与宣传

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 网络安全应急技术国家工程中心   2022-12-01 16:00  
  
11月29日消息，ESET恶意软件研究员Martin Smolar报告，宏碁某些笔记本电脑设备的驱动程序存在高危漏洞，可停用UEFI安全启动功能，导致攻击者在启动过程中部署恶意软件。  
  
受影响的宏碁笔记本电脑型号共计有五款，包括宏碁Aspire A315-22、A115-21、A315-22G、Extensa EX215-21和EX215-21G。  
  
Martin指出，宏碁笔记本设备上的HQSwSmiDxe DXE驱动程序中发现了安全漏洞（CVE-2022-4020）。攻击者不需要用户交互即可更改 UEFI 安全启动设置，方法是修改 BootOrderSecureBootDisable NVRAM变量以禁用安全启动。  
  
UEFI是统一可扩展固件接口（Unified Extensible Firmware Interface）的缩写，用于在加载操作系统之前启动计算机硬件。UEFI安全启动功能确保在设备启动过程中不加载恶意代码。  
  
![](../../.resource/remote/645471ee13447e2c71478a9fd103655118c6894c3ceab058ae0d844eb5028629.jpg "")  
  
宏碁回应称，该漏洞确实存在，目前已修复该漏洞，并提醒用户及时更新固件。用户可在官网下载BIOS更新，并在系统中手动部署。  
  
联想笔记本电脑早些时候也出现过类似问题，研究人员发现，ThinkBook、IdeaPad和Yoga多款笔记本电脑型号中存在类似错误，可能导致停用UEFI Secure Boot。  
  
今年早些时候，ESET还发现超过70款联想笔记本设备安装了易受攻击的UEFI固件。UEFI固件中的缓冲区溢出漏洞允许攻击者进行任意代码执行（ACE）攻击，并禁用基本的安全功能。  
  
**参考链接：**  
  
https://cybernews.com/news/acer-flaw-malware-boot-process/  
  
  
  
原文来  
源：FreeBuf  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](../../.resource/remote/f3ab05c36341863ed9d85136ffb4fb0121c50bb24dd77865ada8e50ae835d232.jpg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
