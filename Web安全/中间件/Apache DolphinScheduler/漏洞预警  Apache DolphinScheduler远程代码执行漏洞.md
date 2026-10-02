---
cve: "CVE-2023-49299"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | Apache DolphinScheduler远程代码执行漏洞"
product: "Apache DolphinScheduler"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-49299"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "已认证，具体角色/功能未给；文称<3.1.9"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-31fba4ba36ba9eab9ddb949f"
entity_id: "ve-31fba4ba36ba9eab9ddb949f"
schema_version: "1"
---

# 漏洞预警 | Apache DolphinScheduler远程代码执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：已认证，具体角色/功能未给；文称<3.1.9
- 证据范围：仅过滤不充分概述，没有入口、载荷、代码或结果，无法判断与合法任务执行边界

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 所有<3.1.9影响范围须核具体分支/起始版本
- 系统完全控制超出服务账户代码执行证据
- 需官方公告及具体认证功能边界，可保留公告但不当复现

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2024-01-06 08:04  
  
**0x00 漏洞编号**  
- # CVE-2023-49299  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache DolphinScheduler是一个分布式和可扩展的开源工作流编排平台，具有强大的DAG可视化界面，专注于解决数据流水线中的复杂任务依赖问题，并提供多种类型的任务可供"开箱即用"。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SXD4gT0JcKdQHScTiaP0Hm0kRewcOAkuzHIoEk08K1tIDDxqzo7iclRHflaJBiaxyQS3ichegBLibF5A9A/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-49299**  
  
**漏洞类型：**  
远程代码执行****  
  
**影响：**  
  
控制服务器  
  
****  
  
**简述：**  
Apache DolphinScheduler在3.1.9之前版本中存在远程代码执行漏洞，由于系统对代码过滤不充分，经过身份认证的攻击者可以在服务器上进行远程代码执行，从而控制服务器。  
###   
  
**0x04 影响版本**  
- Apache DolphinScheduler < 3.1.9  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://dolphinscheduler.apache.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
