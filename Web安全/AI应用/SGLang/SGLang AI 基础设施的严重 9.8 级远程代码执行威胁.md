---
cve: "CVE-2026-5760"
source: "gelusus/wxvl 公众号漏洞文库"
title: "SGLang AI 基础设施的严重 9.8 级远程代码执行威胁"
product: "SGLang"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-5760"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-5be0d9e6ffb8a05c0248bc53"
entity_id: "ve-5be0d9e6ffb8a05c0248bc53"
schema_version: "1"
---

# SGLang AI 基础设施的严重 9.8 级远程代码执行威胁

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 必须先加载恶意GGUF模型
- GGUF术语误译
- 缺影响版本/验证资料
- 补丁未发布是历史状态需标时间

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

sec随谈
                    sec随谈  sec随谈   2026-04-22 00:49  
  
SGLang 是一个流行的开源框架，用于运行 DeepSeek 和 Mistral 等高级模型，但该框架中发现了一个严重的远程代码执行 (RCE)**漏洞**。该漏洞的官方编号为CVE-2026-5760，CVSS 评分为 9.8，表明其对人工智能基础设施构成“严重”风险。  
  
该漏洞具体存在于 SGLang 的重新排序端点 (/v1/rerank) 中，该端点旨在根据文档与搜索查询的相关性对其进行排序。  
  
攻击链始于攻击者创建“恶意 GPT 生成的统一格式 (GGUF) 模型文件”。攻击者通过精心构造一个名为 tokenizer.chat_template 的特定元数据字段（该字段定义了文本在处理前的结构），可以嵌入 Jinja2 服务器端模板注入 (SSTI) 有效载荷。  
  
根据漏洞说明，“受害者随后下载并加载 SGLang 模型，当请求到达 /v1/rerank 端点时，恶意模板将被渲染，从而在服务器上执行攻击者的任意 Python 代码”。  
  
从技术层面来看，问题可以追溯到一个名为 get_jinja_env() 的函数。该函数负责设置渲染聊天模板的环境。  
  
安全漏洞的出现是因为该框架在未采取任何沙箱措施的情况下使用了 `jinja2.Environment()`。由于它“未能限制任意 Python 代码的执行”，任何加载到服务中的恶意模型都可以有效地完全控制底层主机。  
  
成功利用此远程代码执行 (RCE) 原语可能造成的后果非常严重。攻击者可以利用此 RCE 原语进行以下操作：  
- 主机入侵：获得对运行 AI 服务的服务器的完全访问权限。  
- 横向移动：利用被攻陷的服务器作为滩头阵地，攻击网络中的其他系统。  
- 数据泄露：窃取敏感权重、训练数据或用户查询。  
- 拒绝服务攻击（DoS）：关闭关键人工智能基础设施。  
令社区感到不安的是，该公告指出“在协调过程中没有收到项目维护者的回应”，这意味着正式补丁尚未通过官方渠道发布。  
  
在官方更新发布之前，安全研究人员建议自行托管 SGLang 的用户手动修复此问题。核心建议是“使用 ImmutableSandboxedEnvironment 而不是 jinja2.Environment() 来渲染聊天模板”。此更改会创建一个受限的执行环境，防止渲染引擎运行任意 Python 命令。  
  
参考链接：  
  
https://kb.cert.org/vuls/id/915947  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
