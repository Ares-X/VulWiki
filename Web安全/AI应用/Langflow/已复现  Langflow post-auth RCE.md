---
cve: "CVE-2026-17633"
source: "gelusus/wxvl 公众号漏洞文库"
title: "已复现 | Langflow post-auth RCE"
product: "Langflow"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-17633"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-38ccbc0f9e8e44ba11d9dacf"
entity_id: "ve-38ccbc0f9e8e44ba11d9dacf"
schema_version: "1"
---

# 已复现 | Langflow post-auth RCE

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 标题已复现是作者声明，未提供可读请求只截图
- 版本1.0.0<=v<1.11.0在HTML表未提取
- XVE应独立标识字段
- 已认证自定义代码功能与安全边界缺细节需核实公告
- 修复仅releases列表无特定版本补丁
- 大量格式碎片和产品广告

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 微步情报局
                    微步情报局  微步在线研究响应中心   2026-09-16 09:31  
  
漏洞概况  
  
  
Langflow 是 IBM 维护的开源低代码 AI 应用构建平台（Langflow OSS），通过可视化流程编排与自定义 Python 组件搭建大模型应用。  
  
近日，微步情报局监测到互联网披露了Langflow 认证后远程代码执行漏洞（CVE-2026-17633）。  
微步情  
报局  
已成  
功复现该  
漏  
洞  
。  
经分析，  
由于自定义组件提交接口缺失对组件源码的内容安全检查，已认证用户可提交任意 Python 组件代码；  
持有凭据的攻击  
者可通  
过一条请求在 Langflow 后端进程上下文中  
执  
行  
任意代码  
，并读  
取 LLM API key  
、数据库凭据或 vector store token 等敏感凭据用于横向移动  
。  
  
（完整漏洞情报请查阅https://x.threatbook.com/v5/vul/XVE-2026-45745）  
  
该漏洞技术  
细  
节  
已  
在互联网公开，攻击者可据  
此快速复现  
并实施攻击，风险较高，建议受影响用户尽快修复。  
  
漏洞处置优先级(VPT)  
  
  
**综合处置优先级：**  
高风险  
<table><tbody><tr><td rowspan="3" style="border: 1px solid rgb(221, 221, 221);padding: 12px;text-align: left;vertical-align: top;font-weight: bold;background-color: rgb(248, 249, 250);"><section><span leaf="">基本信息</span></section></td><td style="border: 1px solid rgb(221, 221, 221);padding: 12px;text-align: left;vertical-align: top;"><section><span leaf="">微步编号</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">XVE-2026-45745</span></section></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">CVE编号</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">CVE-2026-17633</span></section></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">漏洞类型</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">远程代码执行</span></section></td></tr><tr><td rowspan="5" style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;font-weight:bold;background-color:#f8f9fa;"><section><span leaf="">利用条件评估</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">利用漏洞的网络条件</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">远程</span></section></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">是否需要绕过安全机制</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">否</span></section></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">对被攻击系统的要求</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">无特殊要求</span></section></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">利用漏洞的权限要求</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><p><span leaf="">需</span><span leaf="">认证凭据</span></p></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">是否需要受害者配合</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">否</span></section></td></tr><tr><td rowspan="2" style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;font-weight:bold;background-color:#f8f9fa;"><section><span leaf="">利用情报</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">是否有POC</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><span style="color:#d93025;font-weight:bold;"><span leaf="">是</span></span></td></tr><tr><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">已知利用行为</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">暂无</span></section></td></tr></tbody></table>  


漏洞影响范围  
  
<table><tbody><tr><td style="border: 1px solid rgb(221, 221, 221);padding: 12px;text-align: left;vertical-align: top;font-weight: bold;background-color: rgb(248, 249, 250);"><section><span leaf="">产品名称</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">Langflow</span></section></td></tr><tr><td style="border: 1px solid rgb(221, 221, 221);padding: 12px;text-align: left;vertical-align: top;font-weight: bold;background-color: rgb(248, 249, 250);"><section><span leaf="">受影响版本</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">1.0.0&lt;=version&lt;1.11.0</span></section></td></tr><tr><td style="border: 1px solid rgb(221, 221, 221);padding: 12px;text-align: left;vertical-align: top;font-weight: bold;background-color: rgb(248, 249, 250);"><section><span leaf="">有无修复补丁</span></section></td><td style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;"><section><span leaf="">有</span></section></td></tr></tbody></table>  


漏洞复现  
  
  
获取token后，执行POC发送请求，实现以Langflow 后端进程权限执行任意代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/T4OSm0sXdEOfuWO9X6FDR2sRzicf4QMj9onRXm08ia72zyemRvZysMGxF2JDFsa96hyOTJCd8bGAoJXORwVurgxBwjCzPv4PTUQnJsZfzDPFQ/640?wx_fmt=png&from=appmsg "")  
  
修复方案  
  
### 官方修复方案  
  
官方已发布修复方案，请访问链接下载：  
  
https://github.com/langflow-ai/langflow/releases  
### 临时缓解措施  
  
1、若业务可暂时不使用自定义组件，将环境变量 LANGFLOW_ALLOW_CUSTOM_COMPONENTS 设为 false，阻止新建/修改自定义组件代码。  
  
 2、收紧可登录并创建自定义组件的账号面：仅保留业务所需账号，回收不再使用的账号与 API token。  
  
微步产品支撑  
  
  
微步漏洞情报于  
2026-08-05  
收录该漏洞。  
  
微步下一代威胁情报平台NGTIP及X情报中心已于漏洞收录时向漏洞订阅用户推送该漏洞情报，并将持续推送后续更新；对于已经录入资产的用户，支持实时自动化排查受影响资产。  
  
微步威胁感知平台TDP已于  
20260916  
支持  
检  
测，检测ID：  
S3100184607  
，  
模型/规则高于：  
20260916000000   
可检出。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/T4OSm0sXdEP701aR24F7wr2XHzgEJLxnlrh2dcbibAwqD9VmrJko1qNEbPhQuCF47LicXMGNaaRzqYRXp0IO9D4x29dG790UEFLfNNpymCuO0/640?wx_fmt=png&from=appmsg "")  
  
  
微步威胁防御  
系统OneSIG已支持防  
护规则ID为：  
3100  
184607  
  
微步云原生应用安全平台 OneCloud 已于   
2026-09-16  
 支持检测该漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/T4OSm0sXdEOxyFcYTNRQkiaIqcSib4jrYovhRgboqJ2tqPj1djg9xx3BicwfoqZ57In17Bm11dhtf0mo7nIefHXvhheAdFoaGkMfjVTFEXxQYM/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
