---
cve: "CVE-2026-42238"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Nginx UI的未授权远程代码执行"
product: "Nginx UI (0xJacky/nginx-ui)"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-42238"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "First10minutes after everyprocessstart;reachable restore endpoint;malicious backup configuration;host compromise needs privilegedcontainer/mounts"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-417355816992ba429f7e3263"
entity_id: "ve-417355816992ba429f7e3263"
schema_version: "1"
---

# Nginx UI的未授权远程代码执行

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：First10minutes after everyprocessstart;reachable restore endpoint;malicious backup configuration;host compromise needs privilegedcontainer/mounts
- 证据范围：Time-gated restore authorization flaw to configcommand execution;distinct product from nginxWebUI Java

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0 wrong product directory: Nginx UI and nginxWebUI are different projects
- No affected/fixed release or direct advisory/commit
- Claims hostaccess should remain conditional on container deployment
- Broken translation, app。ini and9。0 punctuation;normalize identifiers
- Restart caution alone inadequate mitigation;state accessrestriction whileunpatched

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

sec随谈
                    sec随谈  sec随谈   2026-04-29 01:05  
  
新披露的 **脆弱性**  
, 追踪为   
CVE-2026-42238  
, 在流行的基于 Web 的管理器 Nginx UI 中,旨在通过 AI 辅助和一键部署简化 Nginx 集群,允许未经身份验证的攻击者实现远程代码执行（RCE）,CVSS 得分为 9。0。  
  
的 **缺陷**  
 利用应用程序备份和恢复逻辑中的 “与时间的赛跑” 设计选择,可能将完整的服务器控制权移交给任何有互联网连接的人。  
  
该漏洞以备份恢复端点（POST/api/restore）为中心。为了方便初始设置,Nginx UI 在流程开始后的前 10 分钟内完全未对该端点进行身份验证。  
  
虽然该逻辑适用于新安装,但它包含一个致命的疏忽。每次进程重新启动时,10 分钟的未经身份验证的窗口都会重置。无论是容器重启、升级还是健康检查触发器,“门”都会再次完全打开。攻击者可以上传恶意备份档案,覆盖应用程序的核心配置文件（app。ini）及其 SQLite 数据库。  
  
通过控制恢复的 app。ini,攻击者可以向 TestConfigCmd 等设置注入任意操作系统命令。一旦应用程序自动重新启动以应用这些“恢复的”设置,单个后续请求就会执行攻击者的命令。  
  
由于 Nginx UI 的典型部署方式,此缺陷的后果尤其严重。  
  
1、在 Docker 环境中—主要分发方法—,Nginx UI 通常以 root 身份运行。如果容器使用特权模式或主机挂载,这将为攻击者提供完全的主机访问权限。  
  
2、攻击者可以获得对数据库中存储的所有 Nginx 配置、TLS 私钥和机密的完整读取访问权限。  
  
3、攻击者可以停止或永久错误配置 Nginx 和 UI,导致托管服务完全中断。  
  
开发团队有   
发布  
 一个从基于时间的安全性转向无条件身份验证的补丁。  
  
如果您无法立即升级,请非常谨慎地重新启动 Nginx UI 容器。系统启动后立即监控网络日志中是否有任何 POST 请求到/api/restore。  
  
参考链接：  
  
https://github.com/0xJacky/nginx-ui/releases  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
