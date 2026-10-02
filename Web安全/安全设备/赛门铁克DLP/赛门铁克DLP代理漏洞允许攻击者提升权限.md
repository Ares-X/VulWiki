---
cve: "CVE-2026-3991"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-043a17d362faf4a74ba9865f"
entity_id: "ve-043a17d362faf4a74ba9865f"
schema_version: "1"
title: "赛门铁克DLP代理漏洞允许攻击者提升权限"
product: "Symantec DLP Windows Agent/OpenSSL"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-3991"
referenced_identifiers: ""
prerequisites: "本地低权可建C盘目标目录，edpa SYSTEM且重启/初始化；多16.x/25.1修复分支"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E8%B5%9B%E9%97%A8%E9%93%81%E5%85%8BDLP/%E8%B5%9B%E9%97%A8%E9%93%81%E5%85%8BDLP%E4%BB%A3%E7%90%86%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E6%8F%90%E5%8D%87%E6%9D%83%E9%99%90.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  赛门铁克DLP代理漏洞允许攻击者提升权限  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Symantec DLP Windows Agent/OpenSSL
- 本文讨论：CVE-2026-3991硬编码配置路径加载引擎DLL
- 版本、权限与配置前提：本地低权可建C盘目标目录，edpa SYSTEM且重启/初始化；多16.x/25.1修复分支
- 资料类型：DLP本地提权公告分析；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 完全规避系统遥测是无证据绝对化，受信任进程不等于无检测
- 根目录写入ACL与OpenSSL初始化触发需按部署，不可所有默认无条件
- 影响范围按16.1MP2/25.1MP1简单比较不覆盖列出的16.0多个hotfix分支
- 未给Broadcom/Infoguard直接链接

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本矩阵、ACL与原研究加载机制待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-04-02 11:12  
  
Symantec数据丢失防护 (DLP) Windows 代理程序中发现了一个高危安全漏洞。  
  
该漏洞编号为 CVE-2026-3991，允许低权限的本地攻击者将其系统权限提升到最高级别。  
  
安全研究员曼努埃尔·费费尔发现了这个漏洞，博通公司最近发布了补丁来解决这个问题。  
  
该漏洞的 CVSS 评分为 7.8。利用该漏洞无需任何特殊配置，这意味着使用默认设置运行的代理程序完全暴露。  
## 赛门铁克 DLP 代理漏洞  
  
核心问题源于 OpenSSL 库的编译方式以及将其集成到 Symantec DLP Agent 中的方式。  
  
该库的构建过程中使用了硬编码的配置路径，指向一个特定的开发目录，而该目录在标准的 Windows 安装中并不存在。  
  
由于 Windows 通常默认授予已认证用户在根目录级别创建缺失文件夹的权限，因此任何低权限用户都可以重现此开发路径。易受攻击的进程 edpa.exe以 SYSTEM 权限运行。  
  
当此过程开始时，它会在攻击者控制的硬编码位置搜索其OpenSSL 配置文件(openssl.cnf)。  
  
要成功利用 CVE-2026-3991，具有基本本地访问权限的威胁行为者必须遵循一条简单的攻击路径。  
- 攻击者在 C:\VontuDev\workDir\openssl\output\x64\Release\SSL\ 创建缺失的目录结构。  
- 他们将恶意 OpenSSL.cnf 文件和有效载荷 DLL 放入这个新创建的文件夹中。  
- 精心构造的配置文件使用标准的 OpenSSL 指令 dynamic_path 直接指向攻击者的 DLL。  
- 当 Symantec DLP Agent 服务重新启动或触发 OpenSSL 初始化时，它会读取恶意配置文件。  
- 系统将攻击者的DLL 作为动态引擎加载，并立即以 SYSTEM 权限执行它。  
由于恶意代码直接在受信任的 DLP 代理进程中执行，因此该攻击对企业网络尤其危险。  
  
威胁行为者可以利用这种技术绕过终端安全保护，并完全规避系统遥测。  
  
此外，攻击者可以利用这种被入侵的进程，在主机上保持深度、持久的访问权限，同时对安全监控工具而言，这看起来完全合法。  
## 受影响版本和已修复版本  
  
博通公司于 2025 年 11 月首次获悉该问题，并于 2026 年 3 月 30 日发布了正式的安全公告和修复程序。  
  
依赖赛门铁克数据防泄漏 (DLP) 的组织应立即更新其Windows 端点代理，以缓解此威胁。  
  
该漏洞会影响 16.1 MP2 或 25.1 MP1 之前的 Symantec DLP 代理。  
  
强烈建议系统管理员升级到以下数据丢失防护 (DLP) 的修复版本：DLP 25.1 MP1、DLP 16.1 MP2、DLP 16.0 RU2 HF9、DLP 16.0 RU1 MP1 HF12 和 DLP 16.0 MP2 HF15，如Infoguard Labs 公告中所述。  
  
管理员应优先考虑这些补丁，尤其是在内部威胁、本地权限提升或横向移动是重大安全问题的环境中。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
