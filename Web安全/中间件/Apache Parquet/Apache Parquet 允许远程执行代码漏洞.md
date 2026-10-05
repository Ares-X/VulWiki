---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache Parquet 允许远程执行代码漏洞"
product: "Apache Parquet Java parquet-avro"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-30065"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2025-30065"
prerequisites: "1.8.0–1.15.0，读取不可信带Avro元数据的Parquet，具体模型/gadget条件未给"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-4ca66b607cbcfaf2c8621137"
entity_id: "ve-4ca66b607cbcfaf2c8621137"
schema_version: "1"
---

# Apache Parquet 允许远程执行代码漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：1.8.0–1.15.0，读取不可信带Avro元数据的Parquet，具体模型/gadget条件未给
- 证据范围：版本与历史修复建议是新闻摘要，没有复现；与46762应作连续修复关联。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 段落称1.15.0之前与表1.15.0包含边界不一致
- CVSS10缺评分来源/向量；完全控制系统需限定服务进程权限
- 缺specific/reflect等实际利用前提，不是所有处理Parquet框架默认受影响
- 1.15.1是初始历史修复，需关联46762后续1.15.2而非作当前完整安全保证
- 在野利用状态仅2025年4月快照

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2025-04-06 19:25  
  
   
   
![图片](../../.resource/remote/4d24b38930491ca2a7a5a7aba996cc1ac21441afebc7e242b4b5624b46328ebe.png "")  
  
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
  
![图片](../../.resource/remote/cc9dd7fb5b24fc27ce16bb1e9985b3b85c989e00551dbfad66f86d1e7499d3f3.webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
