---
cve: "CVE-2023-6709"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | MLFlow远程代码执行漏洞"
product: "MLflow"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-6709"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-0789393445ab2d9bf0507cf1"
entity_id: "ve-0789393445ab2d9bf0507cf1"
schema_version: "1"
---

# 漏洞预警 | MLFlow远程代码执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 有具体huntr报告链接，不应按无利用资料删除
- 缺请求/受影响组件及前提摘要；正文模板渲染成因需原文复核
- 空标题、断词和星号损坏
- 正文<2.9.2未进metadata，修复链接为主页

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2023-12-16 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-6709  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
MLflow是一个简化机器学习开发的平台，包括跟踪实验、将代码打包成可重现的运行，以及共享和部署模型。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/7stTqD182SWp47HSOuYhlXtZAxx6hxsWxNf3I8bRCDiap7kxqibf6Aia4Xct7MmeqoEVmicgjFAoSmEjgUhPWpo7qg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-6709**  
  
**漏洞类型：**  
远程代码执行****  
  
**影响：**  
执  
行任意代码  
  
**简述：**  
MLflow在2.9.2之前版本中存在远程代码执行漏洞，由于框架没有对用户输入的内容进行有效过滤，导致攻击者能够利用服务器端模板渲染，进行远程代码执行利用，从而控制服务器。  
###   
  
**0x04 影响版本**  
- MLflow < 2.9.2  
  
**0x05 POC**  
  
****  
**https://huntr.com/bounties/9e4cc07b-6fff-421b-89bd-9445ef61d34d/**  
  
**仅供安全研究与学习之用，若将工具做其他用途，由使用者承担全部法律及连带责任，作者及发布****者**  
**不承担任何法律及连带责任。**  
  
****  
**0x06 修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://mlflow.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
