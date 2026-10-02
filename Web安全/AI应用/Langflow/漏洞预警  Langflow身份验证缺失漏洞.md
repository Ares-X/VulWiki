---
cve: "CVE-2026-21445"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | Langflow身份验证缺失漏洞"
product: "Langflow"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-21445"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-6038c0bac2f713a12334328c"
entity_id: "ve-6038c0bac2f713a12334328c"
schema_version: "1"
---

# 漏洞预警 | Langflow身份验证缺失漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 只有POC已公开文字，无PoC链接、三个接口列表或完整验证方法
- 产品名混入形似Unicode字符，影响检索
- 空标题和星号Markdown损坏
- 正文影响<=1.7.0未进version字段，修复只有仓库首页
- 来源脚注声称原文见文首链接，但未提供逐篇原文URL

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2026-01-15 00:00  
  
**0x00 漏洞编号**  
- # CVE-2026-21445  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Lаnɡflоԝ是一款用于构建和部署AI驱动的代理和工作流的工具。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SWHPUpZmONDCibcFMW39mQNiaulRXCKTibMciaWtBw1yDKAkx71WnnxR63goPXFQVQMAyTUUu2pIgLQuA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2026-21445**  
  
**漏洞类型：**  
身份验证缺失  
  
**影响：**  
越权操作  
  
**简述：**  
Langflow存在身份验证缺失漏洞，由于src/backend/base/langflow/api/v1/monitor.py中的三个API接口缺少访问控制，攻击者可以在未提供身份验证信息的情况下访问这些接口，从而导致用户数据泄露、隐私侵犯及数据销毁风险。  
  
**0x04 影响版本**  
- Langflow <= 1.7.0  
  
**0x05 POC状态**  
- 已公开  
  
****  
**0x06****修复建议**  
  
******目前官方已发布漏洞修复版本，建议用户升级到安全版本****：******  
  
https://github.com/langflow-ai/langflow  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
