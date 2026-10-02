---
cve: "CVE-2023-37924"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | Apache Submarine SQL注入漏洞"
product: "Apache Submarine"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-37924"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "0.7.0<=版本<0.8.0，受控参数进入MyBatis LIKE字符串拼接；具体接口/鉴权需公告核验"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-ea338134829b30ecc05a9327"
entity_id: "ve-ea338134829b30ecc05a9327"
schema_version: "1"
---

# 漏洞预警 | Apache Submarine SQL注入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：0.7.0<=版本<0.8.0，受控参数进入MyBatis LIKE字符串拼接；具体接口/鉴权需公告核验
- 证据范围：给出模板${}原理但没有具体SQL/参数、请求或结果，属于通告。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- MyBatis中防止注入使用${}措辞反向，应为直接文本替换引入注入风险
- 未授权断言没有API/认证证据，不能自动当PR:N
- 官网首页不能代替漏洞公告，缺0.8.0修复的明确引用
- 获取信息及任意操作能力需数据库权限限定，空标题/强调符号可清理

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2023-11-25 09:03  
  
**0x00 漏洞编号**  
- # CVE-2023-37924  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Apache Submarine是一个是云原生机器学习平台，允许创建端到端机器学习工作流程，通过Submarine可以完成ML模型生命周期的每个阶段，包括数据探索、数据管道创建、模型训练、服务和监控。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SUkgWHnZO6mDZiaWyGJ899SSflezfpFboDrU3mRBSAN6PQt5QQApia8XECqDZCvKw0So8JXjk3CIb3w/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-37924**  
  
**漏洞类型：**  
SQL注入  
  
**影响：**  
获取敏感信息****  
  
**简述：**  
Apache Submarine版本0.7.0-0.8.0之前存在SQL注入漏洞，由于Mybatis中模糊查询防止SQL注入时使用了${}，当使用like查询时可能存在漏洞，未授权威胁者可利用该漏洞执行恶意SQL语句，导致未授权访问或执行恶意操作。  
###   
  
**0x04 影响版本**  
- 0.7.0 <= Apache Submarine < 0.8.0  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://submarine.apache.org/  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
