---
cve: "CVE-2025-32444"
source: "gelusus/wxvl 公众号漏洞文库"
title: "vLLM 的 Mooncake 存在严重 RCE 漏洞（10)"
product: "vLLM Mooncake"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-32444"
referenced_identifiers: "CVE-2025-29783"
identifier_role: "primary"
verification_source: "https://github.com/vllm-project/vllm/security/advisories/GHSA-hj4w-hm2g-p6w5"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-bf3be9bf24c95c9a30f15d5d"
entity_id: "ve-bf3be9bf24c95c9a30f15d5d"
schema_version: "1"
---

# vLLM 的 Mooncake 存在严重 RCE 漏洞（10)

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 需Mooncake配置与KV端口可达
- 影响/修复范围应核实

### 核验来源

- https://github.com/vllm-project/vllm/security/advisories/GHSA-hj4w-hm2g-p6w5

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 独眼情报   2025-05-01 01:53  
  
![CVE-2025-29783 CVE-2025-32444 vLLM vulnerability](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KgxDGkACWnTkNyVdhiaKS1Xiciczy4uFLFtAhMdicSHCMuK2qIBlQymb0BSVRGf9EDD8zuJnPSIXibHzic8ol2CvgYyg/640?wx_fmt=other&from=appmsg "")  
  
CVE-2025-29783 CVE-2025-32444 vLLM vulnerability  
  
在 vLLM 中发现了一个关键的安全漏洞，vLLM 是一个流行的开源库，用于高性能推理和大型语言模型（LLM）的服务。该漏洞被追踪为 CVE-2025-32444  
，具有最高的 CVSS 评分 10.0  
，这意味着使用其 Mooncake 集成的部署存在严重的远程代码执行（RCE）风险。  
  
vLLM 在 GitHub 上拥有超过 46,000 个星标，是一个被广泛采用的 LLM 服务库，因其在学术、研究和企业级 AI 系统中的速度和灵活性而受到信赖。随着基于 LLM 的工具在各行各业的普及，模型服务堆栈中的安全至关重要。  
  
该漏洞在于 vLLM 的 Mooncake 集成如何通过网络处理序列化数据，它使用 Python 的 pickle 模块通过不安全的 ZeroMQ 套接字。  
  
该问题具体位于 vllm/vllm/distributed/kv_transfer/kv_pipe/mooncake_pipe.py  
 文件中的 recv_pyobj()  
 函数。此函数隐式使用 pickle.loads()  
 通过 ZeroMQ 套接字处理传入的数据。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnTkNyVdhiaKS1Xiciczy4uFLFtriaW20oH11e0kXD7AZ9fdzZMLdgCMticqmvgn11s4CM2oKeMakMAEL6g/640?wx_fmt=png&from=appmsg "")  
  
此漏洞影响所有积极使用 Mooncake 集成的 vLLM 实例，版本大于或等于 0.6.5。如果您的 vLLM 部署未使用 Mooncake 进行分布式 KV 传输，则您不会受到此特定漏洞的影响。  
  
vLLM 团队已迅速解决了此关键问题。修补后的版本 v0.8.5 现已可用。至关重要的是，所有受影响的 vLLM 部署都应立即升级到此版本，以降低远程代码执行的风险。  
  
详情：https://github.com/vllm-project/vllm/security/advisories/GHSA-hj4w-hm2g-p6w5  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
