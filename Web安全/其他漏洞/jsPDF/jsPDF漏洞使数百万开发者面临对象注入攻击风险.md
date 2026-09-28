---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  jsPDF漏洞使数百万开发者面临对象注入攻击风险  
 网安百色   2026-02-24 10:56  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/WibvcdjxgJnszZfauuonsb8pjIoJEsz1gHtjEIlG9UhUJHdYmmw32LicLZRZQQFRh46t0bFRNfGqqq3tQy6ZzW5QhmiaZSs5F0bx96S3iazvbE0/640?wx_fmt=jpeg&from=appmsg "")  
  
流行jsPDF库中最新披露的安全漏洞使数百万Web开发者面临PDF对象注入攻击风险，允许远程攻击者将任意对象和操作嵌入生成的PDF文档中。  
  
该漏洞被追踪为CVE-2026-25755，影响用于在PDF文件中嵌入JavaScript代码的addJS方法。  
  
问题源于jsPDF中javascript.js文件对用户输入的不当过滤。具体而言，问题行使用以下语法将未经过滤的输入直接连接到PDF流中：  
  
this.internal.out("/JS (" + text + ")");  
  
此逻辑未能转义作为PDF规范中字符串分隔符的右括号。通过注入诸如) >> /Action …  
的有效载荷，攻击者可以提前终止/JS字符串并注入任意PDF结构，从而完全控制嵌入对象。  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i11.96a07551gPA0mT" style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE ID</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS分数</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">描述</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-25755</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">8.8（高）</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">jsPDF的addJS方法中的PDF对象注入漏洞允许在生成的PDF中注入任意对象并执行操作。</span></span></td></tr></tbody></table>  
与典型的基于JavaScript的XSS攻击不同，此漏洞直接操纵PDF对象层次结构，使恶意行为者能够在查看器禁用JavaScript时执行操作或修改文档结构。  
  
**关键影响包括：**  
- **JS禁用执行**  
：注入的PDF操作（例如/OpenAction）可以自动触发，绕过JavaScript限制。  
- **文档操纵**  
：攻击者可以注入、加密或修改/Annots或/Signatures部分，以修改元数据、进行网络钓鱼或改变PDF外观。  
- **跨查看器风险**  
：轻量级PDF查看器，尤其是移动或嵌入式查看器，可能由于严格遵守PDF对象解析规则而执行注入的操作。  
发现此问题的安全研究员ZeroXJacks演示了一个概念验证，使用精心设计的addJS有效载荷在文档打开时触发自定义PDF操作。  
  
这突显了从用户输入动态生成PDF的应用程序的严重风险。根本原因在于缺少根据PDF规范进行的输入验证和转义。  
  
**开发者强烈建议**  
更新至jsPDF 4.1.0或更高版本，其中通过转义括号和反斜杠正确过滤了输入。  
  
在修补之前，用户应避免使用addJS或相关方法嵌入不可信或用户生成的内容，并对任何客户端PDF创建工作流程实施严格的输入验证。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
