---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Grist-Core Pyodide 24002公式沙箱逃逸"
product: "Grist-Core Pyodide"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-24002"
referenced_identifiers: "CVE-2025-68668"
identifier_status: "unknown"
affected_scope: "1.7.9修复；仅pyodide，gvisor不受影响声明"
prerequisites: "可写公式或诱使打开恶意文档"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Grist/Grist-Core%20%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E9%80%9A%E8%BF%87%E7%94%B5%E5%AD%90%E8%A1%A8%E6%A0%BC%E5%85%AC%E5%BC%8F%E8%BF%9B%E8%A1%8C%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%94%BB%E5%87%BB.md"
id: "vw-14670dacccfa6a6c9865e52f"
entity_id: "ve-14670dacccfa6a6c9865e52f"
schema_version: "1"
---

# Grist-Core Pyodide 24002公式沙箱逃逸

## 条目说明

- 对象与具体问题：Grist-Core Pyodide；24002公式沙箱逃逸
- 版本、配置及部署条件：1.7.9修复；仅pyodide，gvisor不受影响声明
- 认证与权限前提：可写公式或诱使打开恶意文档
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 保留GRIST_SANDBOX_FLAVOR与SKIP_DENO=1关键条件，不能只凭版本判受影响
- 没有研究/官方通告链接或PoC，只新闻引语；68668为n8n对比引用
- 主机运行时权限/容器与物理宿主边界未说明，别自动升为宿主root

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 Ravie Lakshmanan
                    Ravie Lakshmanan  暗镜   2026-01-29 03:00  
  
Grist-Core（Grist 关系电子表格数据库的开源自托管版本）中披露了一个严重的安全漏洞，该漏洞可能导致远程代码执行。  
  
该漏洞编号为**CVE-2026-24002** （CVSS 评分：9.1），由 Cyera Research Labs命名为**Cellbreak 。**  
  
发现该漏洞的安全研究员弗拉基米尔·托卡列夫表示： “一个恶意公式就能将电子表格变成远程代码执行 (RCE) 的滩头阵地。这种沙箱逃逸机制允许公式编写者执行操作系统命令或运行主机运行时 JavaScript，从而模糊了‘单元格逻辑’和主机执行之间的界限。”  
  
Cellbreak 被归类为Pyodide沙箱逃逸漏洞，与近期影响 n8n（ CVE-2025-68668 ，CVSS 评分：9.9，又名 N8scape）的漏洞属于同一类型。该漏洞已在 2026 年 1 月 9 日发布的 1.7.9 版本中修复。  
  
项目维护者表示： “安全审查发现 Grist 中提供的 'pyodide' 沙箱方法存在漏洞。您可以在实例的管理面板的沙箱部分查看是否受到影响。如果显示 'gvisor'，则表示您不受影响。如果显示 'pyodide'，则务必更新到此 Grist 版本或更高版本。”  
  
简而言之，问题根源在于 Grist 的 Python 公式执行，它允许在 Pyodide 中运行不受信任的公式。Pyodide 是一个 Python 发行版，它允许在 WebAssembly ( WASM ) 沙箱的限制内，直接在 Web 浏览器中执行常规 Python 代码。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/mibm5daOCSt9S9F3EWmsZysfbCfyfpup56x0icm4u6cztxMV0iagL9XHxFsAicbZ7JACVaLpan6cxpMhicCroZRu1Qg/640?wx_fmt=png&from=appmsg "")  
  
虽然这种思路的目的是确保 Python 公式代码在隔离的环境中运行，但 Grist 使用类似黑名单的方法，使得程序有可能逃逸沙箱，最终在底层主机上执行命令。  
  
Tokarev解释说：“沙箱的设计允许遍历Python的类层次结构，并保留ctypes，这使得用户可以访问原本不应该从公式单元格访问的Emscripten运行时函数。这种组合使得可以在主机运行时执行主机命令和JavaScript，从而导致文件系统访问和机密信息泄露等实际后果。”  
  
据 Grist 称，当用户将GRIST_SANDBOX_FLAVOR设置为 Pyodide 并打开恶意文档时，该文档可能被用于在托管 Grist 的服务器上运行任意进程。攻击者可以利用这种通过公式执行命令或 JavaScript 的能力，访问数据库凭据和 API 密钥、读取敏感文件，并进行横向移动。  
  
  
Grist 已通过默认将 Pyodide 公式的执行迁移到Deno JavaScript 运行时来解决此问题。但是，值得注意的是，如果操作员显式地将 GRIST_PYODIDE_SKIP_DENO 设置为值“1”，则风险会再次出现。在可能运行不受信任或半信任公式的场景中，应避免使用此设置。  
  
为降低潜在风险，建议用户尽快更新至最新版本。为暂时缓解此问题，建议将 GRIST_SANDBOX_FLAVOR 环境变量设置为“gvisor”。  
  
托卡列夫表示：“这反映了其他自动化平台中存在的系统性风险：具有特权访问权限的单一执行界面，一旦其沙箱出现故障，就可能导致组织信任边界崩溃。”  
  
“当公式执行依赖于宽松的沙箱时，一次逃逸就可能将‘数据逻辑’转化为‘主机执行’。Grist-Core 的研究结果表明，沙箱机制需要基于能力并采用纵深防御，而不是脆弱的黑名单。失败的代价不仅仅是漏洞——而是数据平面遭到入侵。”  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
