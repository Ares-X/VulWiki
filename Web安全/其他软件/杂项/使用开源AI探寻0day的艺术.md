---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "使用开源AI探寻0day的艺术"
product: "CodeAstra7B辅助审计方法"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "原文未给出可确认的版本、认证及部署边界；保留待核"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E4%BD%BF%E7%94%A8%E5%BC%80%E6%BA%90AI%E6%8E%A2%E5%AF%BB0day%E7%9A%84%E8%89%BA%E6%9C%AF.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-f2256872faed7c78074960bd"
entity_id: "ve-f2256872faed7c78074960bd"
schema_version: "1"
---

# 使用开源AI探寻0day的艺术

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：CodeAstra7B辅助审计方法
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：原文未给出可确认的版本、认证及部署边界；保留待核
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 多处上面例子但所有代码/输出/图缺失，无法支撑效果
2. 已知CVE识别不证明发现0day，需训练泄漏/OOS/误报评估
3. 模型无仓库/权重/提示词/环境
4. Semgrep不能发现业务逻辑而AI轻松能过度绝对
5. Airflow编号长破折号
6. 多CVE只案例不得全部建成该文已验证漏洞，保留为待补证概念文章

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 破天KK  KK安全说   2024-08-03 16:55  
  
将分享如何使用经过微调的用于查找漏洞的开源 AI 模型  
codeastra-7B  
来识别各种开源项目（如 apache pulsar、apache airflow、apache cocoon、tensorflow、imagemagik 等）中的零日漏洞，以及如何构建一个结合静态分析工具（如 semgrep）和基于开源模型（如 CodeAstra-7B）构建的 AI 代理的框架，以有效地查找 0 日和 n 日漏洞。  
  
  
在 Apache Pulsar 中  
查找  
CVE-2023-51437定时攻击  
  
  
  
  
在上面的例子中！我将 Apache Pulsar 项目的代码片段（易受 CVE-2023-51437 攻击）输入到 CodeAstra 模型中，并且 CodeAstra 模型已成功识别漏洞  
  
总的来说！大多数使用基于规则引擎的静态分析工具都很难找到基于时间的漏洞  
  
Apache cooccon 项目中发现  
CVE-2022-45135  
 SQL 注入攻击  
  
  
  
  
在上面的例子中！我将 Apache Cocoon 项目中存在 SQL 注入漏洞的代码片段输入到 CodeAstra 模型中，并且 CodeAstra 模型已成功识别漏洞  
  
  
Apache Pulsar 项目中  
发现  
CVE-2024-27317文件覆盖漏洞  
  
  
  
  
在上面的例子中！我将 Apache Pulsar 项目的文件覆盖漏洞代码片段输入到 CodeAstra 模型中，尽管 CodeAstra 模型没有识别出确切的漏洞，但它已经识别出了潜在的攻击面  
  
发现 Apache Air Flow 项目中的 CVE-2021–45229 XSS 漏洞  
  
  
  
  
在上面的例子中！我将 Apache Airflow 项目中存在 XSS 漏洞的代码片段输入到 CodeAstra 模型中，并且 CodeAstra 模型已成功识别 XSS 漏洞。  
  
发现 CVE-2021-37678 不安全的 yaml 反序列化漏洞，导致   
TensorFlow 项目中出现 RCE  
  
  
  
  
在上面的例子中！我将 Tensorflow 项目中 yaml 反序列化不安全的代码片段漏洞输入到 CodeAstra 模型中，并且 CodeAstra 模型已成功识别漏洞  
  
在 Imagemagick 库中查找  
CVE-2019-17541  
堆缓冲区溢出漏洞  
  
  
  
  
在上面的例子中！我将存在堆缓冲区溢出漏洞的代码片段输入到 CodeAstra 模型中，并且 CodeAstra 模型已成功识别漏洞  
  
在 Apache Trafficops 中查找 CVE-2021-43350 LDAP 注入  
  
  
  
  
在上面的例子中！我将 go 代码片段 LDAP 注入漏洞输入到 CodeAstra 模型中，并且 CodeAstra 模型已成功识别漏洞  
  
观察与分析  
  
当我使用单次提示来触发CodeAstra-7B  
模型时，与业务逻辑漏洞相比，它能够轻松找到常见漏洞，例如 SQL 注入、XSS 等。  
  
当我使用少量提示时，它往往比单次提示更准确地发现漏洞  
  
注意  
：如果你使用 GPT-4 或任何 LLM 来查找漏洞，请始终使用一些带有示例的提示来提高准确性  
  
与 Semgrep 和其他静态分析工具的比较  
  
Semgrep 和其他静态分析使用一些基于规则的引擎来检测易受攻击的模式。它们可以非常快速地检测已知代码模式中出现的常见漏洞，但无法检测基于时间的漏洞、otp 绕过类型的业务逻辑漏洞。要查找业务逻辑漏洞（如 OTP 绕过、特权提升、IDOR 等），我们需要了解代码的上下文。因此，AI 模型可以轻松理解此代码并找到业务逻辑漏洞，但与基于规则引擎的静态分析工具相比，它们的速度会更慢  
  
既然 GPT4 可以更好地进行代码审查，为什么还要开源 AI 模型？  
  
大多数公司都有一项政策，不允许员工将源代码等敏感信息发送给托管封闭式 AI 模型的公司的第三方 API，除非他们与这些公司有合作关系，例如 OpenAI Enterprise Subscription，他们不会使用用户数据训练 ML 模型。在这种情况下，我们需要一个可以在我们控制的环境中部署的开源 AI 模型。  
  
如何使用静态分析工具和AI模型构建一个能够更有效地发现漏洞的工具。  
  
  
  
  
我们需要使用静态分析工具来查找基于常见模式的漏洞、低悬置错误、硬编码凭据等，并使用基于 codeastra 的 LLM 代理来理解代码并查找需要有关代码实现上下文的复杂错误，例如 OTP 绕过、权限提升、时间相关漏洞等，这将帮助安全人员减少攻击面并在几个小时内更快地在具有较大代码库的软件中识别 n 天漏洞。  
  
LLM 基本上非常擅长识别代码中的潜在攻击面，并且人类可以将报告和潜在攻击面关联起来，以找到 AI 可能错过的漏洞并快速修补它们。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
