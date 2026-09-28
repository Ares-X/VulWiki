---
cve: "CVE-2026-24002"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Grist-Core 严重漏洞允许通过电子表格公式进行远程代码执行攻击  
原创 Ravie Lakshmanan
                    Ravie Lakshmanan  暗镜   2026-01-29 03:00  
  
Grist-Core（Grist 关系电子表格数据库的开源自托管版本）中披露了一个严重的安全漏洞，该漏洞可能导致远程代码执行。  
  
该漏洞编号为**CVE-2026-24002** （CVSS 评分：9.1），由 Cyera Research Labs命名为**Cellbreak 。**  
  
发现该漏洞的安全研究员弗拉基米尔·托卡列夫表示： “一个恶意公式就能将电子表格变成远程代码执行 (RCE) 的滩头阵地。这种沙箱逃逸机制允许公式编写者执行操作系统命令或运行主机运行时 JavaScript，从而模糊了‘单元格逻辑’和主机执行之间的界限。”  
  
Cellbreak 被归类为Pyodide沙箱逃逸漏洞，与近期影响 n8n（ CVE-2025-68668 ，CVSS 评分：9.9，又名 N8scape）的漏洞属于同一类型。该漏洞已在 2026 年 1 月 9 日发布的 1.7.9 版本中修复。  
  
项目维护者表示： “安全审查发现 Grist 中提供的 'pyodide' 沙箱方法存在漏洞。您可以在实例的管理面板的沙箱部分查看是否受到影响。如果显示 'gvisor'，则表示您不受影响。如果显示 'pyodide'，则务必更新到此 Grist 版本或更高版本。”  
  
简而言之，问题根源在于 Grist 的 Python 公式执行，它允许在 Pyodide 中运行不受信任的公式。Pyodide 是一个 Python 发行版，它允许在 WebAssembly ( WASM ) 沙箱的限制内，直接在 Web 浏览器中执行常规 Python 代码。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/mibm5daOCSt9S9F3EWmsZysfbCfyfpup56x0icm4u6cztxMV0iagL9XHxFsAicbZ7JACVaLpan6cxpMhicCroZRu1Qg/640?wx_fmt=png&from=appmsg "")  
  
虽然这种思路的目的是确保 Python 公式代码在隔离的环境中运行，但 Grist 使用类似黑名单的方法，使得程序有可能逃逸沙箱，最终在底层主机上执行命令。  
  
Tokarev解释说：“沙箱的设计允许遍历Python的类层次结构，并保留ctypes，这使得用户可以访问原本不应该从公式单元格访问的Emscripten运行时函数。这种组合使得可以在主机运行时执行主机命令和JavaScript，从而导致文件系统访问和机密信息泄露等实际后果。”  
  
据 Grist 称，当用户将GRIST_SANDBOX_FLAVOR设置为 Pyodide 并打开恶意文档时，该文档可能被用于在托管 Grist 的服务器上运行任意进程。攻击者可以利用这种通过公式执行命令或 JavaScript 的能力，访问数据库凭据和 API 密钥、读取敏感文件，并进行横向移动。  
  
  
Grist 已通过默认将 Pyodide 公式的执行迁移到Deno JavaScript 运行时来解决此问题。但是，值得注意的是，如果操作员显式地将 GRIST_PYODIDE_SKIP_DENO 设置为值“1”，则风险会再次出现。在可能运行不受信任或半信任公式的场景中，应避免使用此设置。  
  
为降低潜在风险，建议用户尽快更新至最新版本。为暂时缓解此问题，建议将 GRIST_SANDBOX_FLAVOR 环境变量设置为“gvisor”。  
  
托卡列夫表示：“这反映了其他自动化平台中存在的系统性风险：具有特权访问权限的单一执行界面，一旦其沙箱出现故障，就可能导致组织信任边界崩溃。”  
  
“当公式执行依赖于宽松的沙箱时，一次逃逸就可能将‘数据逻辑’转化为‘主机执行’。Grist-Core 的研究结果表明，沙箱机制需要基于能力并采用纵深防御，而不是脆弱的黑名单。失败的代价不仅仅是漏洞——而是数据平面遭到入侵。”  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
