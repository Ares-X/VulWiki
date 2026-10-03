---
source: "gelusus/wxvl 公众号漏洞文库"
title: "NVIDIA NeMo曝安全漏洞，系统面临命令注入攻击风险"
product: "NVIDIA NeMo"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e9b0b36badb2d99f950f7257"
entity_id: "ve-e9b0b36badb2d99f950f7257"
schema_version: "1"
---

# NVIDIA NeMo曝安全漏洞，系统面临命令注入攻击风险

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 三CVE缺metadata
- 开头24252所有平台与后文仅Linux冲突
- 远程RCE叙述与AV:L本地权限冲突
- 2.7.2/2.7.3需公告
- 无具体验证方法和原始公告
- 庞大HTML表格和宣传

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2026-06-17 10:44  
  
![](https://mmbiz.qpic.cn/mmbiz_png/WibvcdjxgJntOzcDykIw1C0I1ic6gRtQD8eq5AWibSGUYjkRkRng9uViaXVOmuGn1aQCju2xyClbre0zuaxCyja6BEhZZjbMbtK5nuSubPKAYq4/640?wx_fmt=png&from=appmsg "")  
  
NVIDIA披露NeMo框架存在多个高危漏洞，含可致远程代码执行的关键命令注入缺陷  
  
NVIDIA在2026年6月安全公告中披露，其NeMo框架存在多个高危漏洞，其中最严重的命令注入漏洞（CVE-2026-24252）可能使攻击者在受影响系统上执行任意代码。该问题影响所有平台中2.7.2及更早版本的NeMo，成功利用将导致权限提升、数据篡改及敏感信息泄露。  
  
核心漏洞风险分析  
  
Linux系统命令注入（CVE-2026-24252）  
  
仅影响Linux部署环境，因对用户输入处理不当，低权限攻击者无需交互即可执行任意系统命令。  
  
考虑到NeMo广泛应用于AI模型开发及自动化部署流程，该漏洞在企业级研发环境中风险尤为突出——模型编排常涉及系统级操作脚本，攻击者可能借此突破权限边界。  
  
跨平台代码注入漏洞（CVE-2026-24155）  
  
归类为CWE-94类漏洞，攻击者可操控应用行为并执行恶意代码，同样导致数据篡改与信息泄露。  
  
不安全反序列化缺陷（CVE-2026-24228）  
  
涉及CWE-502风险，通过构造恶意数据包可能触发远程代码执行或权限提升。  
  
关键风险特征  
  
三项漏洞CVSS v3.1基础评分均为7.8（高危），攻击向量需本地访问权限且仅需低权限，但无需用户交互。  
  
尽管要求本地攻击条件，但在多用户系统、共享计算环境及AI流水线中风险仍显著——此类场景通常已放宽访问控制策略，攻击者易获取初始立足点。  
  
修复与应对建议  
  
NVIDIA已发布NeMo 2.7.3版本修复漏洞，用户需立即从官方GitHub仓库升级。  
  
企业应根据实际部署环境评估风险：  
  
重点检查生产环境与共享集群的访问控制策略  
  
审计自动化脚本中对用户输入的校验机制  
  
对涉及系统级操作的模型编排流程实施权限最小化原则  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i4.39f22988ejNk2R" style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE编号</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞类型</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">核心风险</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS评分</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-24155</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">代码注入（CWE-94）</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">恶意代码执行、权限提升、数据篡改、信息泄露</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.8（高）</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-24252</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">系统命令注入（CWE-78）</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Linux系统任意命令执行</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.8（高）</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-24228</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">不可信数据反序列化（CWE-502）</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">代码执行、系统沦陷</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">7.8（高）</span></span></td></tr></tbody></table>  


本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
