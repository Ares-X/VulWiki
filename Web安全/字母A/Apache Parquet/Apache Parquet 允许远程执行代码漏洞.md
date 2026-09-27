---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Apache Parquet 允许远程执行代码漏洞   
 网安百色   2025-04-06 19:25  
  
   
   
![图片](https://mmbiz.qpic.cn/mmbiz_png/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vK9ZGS15PBzhF8gRBMk6V7TXMVsSxyqn3vpLuXTg82nHzLRYicg7QtVJQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
点击上方  
蓝字  
关注我们吧~  
  
已在 Apache Parquet Java 库中发现了一个严重漏洞，特别是在其 parquet-avro 模块中。  
  
此漏洞被跟踪为 CVE-2025-30065，使系统面临潜在的远程代码执行 （RCE） 攻击。  
  
它被评为严重，CVSS 评分为 10.0，表示严重性最高。根本原因被归类为不受信任数据的反序列化 （CWE-502）。  
  
此漏洞会影响处理或导入 Parquet 文件的系统，尤其是从不受信任或外部来源获取的文件。  
  
受影响的产品  
  
根据 Openwall 报告，Apache Parquet Java 库版本 1.15.0 及更早版本中存在此问题。它是在 1.8.0 版本中引入的，使 1.15.0 之前的所有后续版本都容易受到攻击。  
  
流行的大数据和分析框架以及利用 Parquet 库的自定义应用程序都会受到影响。以下是受影响版本和可用缓解措施的摘要：  
  
产品/组件	受影响的版本	固定版本  
  
Apache Parquet Java （parquet-avro）	1.8.0 到 1.15.0	1.15.1  
  
使用集成 Parquet 进行数据处理的框架（如 Apache Hadoop、Spark 或 Flink）的组织应优先尽快升级到修补后的版本。  
  
漏洞详情和潜在影响  
  
该漏洞源于 Parquet 文件中 Avro 架构元数据的解析不当。  
  
具体来说，构建的 Parquet 文件可以利用 parquet-avro 模块的反序列化过程，允许攻击者在目标系统上执行任意代码。  
  
风险：  
  
远程代码执行 （RCE）：攻击者可以完全控制易受攻击的系统。  
  
数据泄露和篡改：敏感信息可能被访问、修改或窃取。  
  
恶意软件部署：系统可能受到勒索软件、加密挖矿程序或其他恶意软件的威胁。  
  
服务中断：利用此漏洞可能导致拒绝服务 （DoS） 或系统损坏。  
  
受影响的系统可能会完全危及机密性、完整性和可用性，因此缓解是重中之重。  
  
截至 2025 年 4 月，尚未报告该漏洞被积极利用。  
  
但是，此漏洞的披露意味着攻击者可能随时开发漏洞。组织必须主动采取行动来保护其系统。  
  
缓解措施和建议  
  
为了解决此漏洞，强烈建议用户：  
  
将库升级到版本 1.15.1，其中包含官方修复。  
  
在应用更新之前，请避免处理不受信任的 Parquet 文件。  
  
为了提供额外的预防措施，请实施沙盒或输入验证机制，以限制潜在恶意文件带来的风险。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
