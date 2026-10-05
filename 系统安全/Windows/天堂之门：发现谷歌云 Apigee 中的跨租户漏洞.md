---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-13292"
identifier_role: "primary"
primary_identifiers: "CVE-2025-13292"
referenced_identifiers: ""
identifier_status: "unknown"
title: "天堂之门：发现谷歌云 Apigee 中的跨租户漏洞"
product: "GCP Apigee / Dataflow"
record_type: "analysis"
document_type: "云服务跨租户攻击链二次分析"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "需自身Apigee租户及API代理/AssignMessage策略修改能力、历史服务账户权限/网络可达/自动扩容条件；未说明厂商修复状态"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E5%A4%A9%E5%A0%82%E4%B9%8B%E9%97%A8%EF%BC%9A%E5%8F%91%E7%8E%B0%E8%B0%B7%E6%AD%8C%E4%BA%91%20Apigee%20%E4%B8%AD%E7%9A%84%E8%B7%A8%E7%A7%9F%E6%88%B7%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-518a53d6a411b1b3ceb7462c"
entity_id: "ve-518a53d6a411b1b3ceb7462c"
schema_version: "1"
---

# 天堂之门：发现谷歌云 Apigee 中的跨租户漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：GCP Apigee / Dataflow
- 文献类型：云服务跨租户攻击链二次分析
- 版本、权限及部署边界：需自身Apigee租户及API代理/AssignMessage策略修改能力、历史服务账户权限/网络可达/自动扩容条件；未说明厂商修复状态
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 放Windows目录完全错分类，主对象为GCP云服务，迁云平台并与同族研究关联
2. 从外部进入的表述漏自己租户配置权限起点，不应读成互联网无认证任意Apigee攻击
3. 从跨租户存储访问推全部租户每个请求/任何用户冒充过宽，取决于日志内容、令牌有效性/受众/权限，需限定原研究证据
4. 攻击者可能已经窃取为未经证实历史暗示，应改潜在影响，原文展示能力不等于真实受害事件
5. 只有omeramiad.com域名缺精确源文、Google公告/CVE及修复日期，必须优先核13292映射和披露范围
6. 文字在取令牌处缺动词，步骤列表全部1；截图承担输出和跨租户证据且未读，云链完整性须保留来源归属

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 SecureNexusLab   2026-02-10 01:44  
  
#   
  
本文深入解析了在Google Cloud Platform (GCP)核心API管理服务Apigee中发现的、代号为“GatewayToHeaven”（天堂之门）的重大安全漏洞。该漏洞被追踪为CVE-2025-13292。研究显示，攻击者可通过一系列攻击链，在完全托管的租户项目中实现横向移动，最终突破云环境的逻辑隔离边界，访问、窃取其他企业租户的敏感日志、分析数据乃至访问令牌，构成严重的跨租户数据泄露风险。  
## 关于Apigee  
> Apigee 提供了一个 API 代理层，位于您的后端服务与希望使用您的服务的内部或外部客户端之间。  
  
## 租户项目  
  
云服务商通常会构建复杂的逻辑隔离机制，确保不同客户的资源互不可见。在谷歌云中，Apigee作为一款全托管服务，为每个客户创建一个独立的 “租户项目” ，用于托管运行该服务的所有后台资源。  
  
“天堂之门”漏洞的发现，揭示了一条从外部渗透进入租户项目，最后访问到所有其他租户数据的完整攻击链。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2fc3ef6d7027c719ff29d672333d18134cbd714ed215918bf011df981b2a2df5.jpg "")  
## Apigee 访问权限  
  
目前对租户项目和理论上的跨租户目标的看法是这样的：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/54304ac9872c3855935db029261a802a82ef0b4cea9dd7c649e639dbf4949be1.jpg "")  
  
Apigee 允许它在云外部署，从而在租户项目之外。云部署和混合部署在某些方面有所不同，但在许多其他方面也很相似，探索有详细文档的混合版本可能会揭示云版本中组件的配置方式。  
  
这是 Apigee 混合部署的粗略示意图：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/df37777a075fd2aaacaa9cb2a719ed311cac06678eef789f935af04b244bfa35.jpg "")  
  
Apigee 的主要组件是消息处理器，在图中以黄色高亮显示。  
  
消息处理器是位于最终用户和后端服务之间的 API 代理所有通过 Apigee 的最终用户请求都由它处理。所有其他组件的存在都是为了使其按预期工作提供最新的配置，并将分析数据流回谷歌。  
  
Apigee 默认会为所有代理请求添加 X-Forwarded-For  
 ，导致元数据端点拒绝该请求，作为针对服务器端请求伪造的防御机制。可以使用 AssignMessage  
 Apigee 策略来绕过它，该策略可用于在请求发送到后端之前移除请求头。  
  
在消息处理器的元数据端点暴露后，可以与该工作负载关联的服务账户令牌：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/46ad97e2b162bf959b81366291b6d52c4afbf647c3c332ed51715b47ae5d3217.jpg "")  
## 租户项目探索  
  
gcpwn 是一个有用的权限枚举工具，可以迭代服务账户可能拥有的所有权限并检查它们是否存在。  
  
通过它发现的一些有用权限包括：  
- 对租户项目中计算磁盘和快照的完全访问权限。  
  
- 对所有存储桶的读写访问权限。  
  
- 对 PubSub 主题的写入权限。  
  
权限可以列出和读取磁盘、快照等资源，并控制知道名称的存储桶的内容。这是使用 Apigee 服务账户令牌在租户项目上运行 gcloud compute disks list  
 命令的输出：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/0c8a7cd799fda3b0de703e45590e54b55dc181726c15fb34a835cb2e4d6fee17.jpg "")  
  
转储磁盘的内容，需要执行以下操作：  
1. 创建磁盘的快照。  
  
1. 将其迁移到控制下的另一个项目。  
  
1. 在项目中从该快照重建一个新磁盘。  
  
1. 创建一个计算实例并将磁盘附加到它。  
  
1. 挂载磁盘并查看其内容。  
  
通过浏览转储文件中的所有日志和配置文件探索， boot-json.log  
 的文件，其中包含有关分析计算实例行为的日志：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a50ccee2739e1a367b326898d2c502d4db05bf55c1e6038bd8e3a72b4ab2c697.jpg "")  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e75f561393c41c7475e2c258478b344cae1bdaf20e6b7e20a08f872a0ae67e12.jpg "")  
1. 租户项目配置了 Dataflow，并且此磁盘属于其某个计算实例。Dataflow是一个谷歌云服务，提供统一的大规模流和批量数据处理。  
  
1. 初始化时，Dataflow 管道访问一个存储桶，下载 JAR 文件，并在执行时将它们用作依赖项。  
  
下载 JAR 文件的存储桶位于租户项目中，Apigee 服务账户拥有对其的读写权限。利用这些权限，用恶意代码修补其中一个 JAR 文件，从而在 Dataflow 计算实例上实现远程代码执行。  
  
转储文件中的另一个文件 pipeline_options.json  
 显示，Dataflow 管道由另一个服务账户执行：apigee-analytics@TENANT-PROJECT.iam.gserviceaccount.com  
：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/19321519c8465c120eebc66220a518dbcbe3367eaf0eaaa7e90ad6124dc05d0a.jpg "")  
  
这个账户可能拥有一些跨租户权限。同一个文件还有以下配置值：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/eefd6f0c63d71886be362bb14daf17004e48e3c6fd150ce26c2ea7f225106cef.jpg "")  
  
其中指定的元数据存储桶的名称没有任何随机后缀，暗示它可能包含跨租户的元数据。  
## Dataflow 的权限  
  
Apigee 服务账户拥有对存储 Dataflow 管道执行的 JAR 文件的存储桶的写入权限。  
  
将权限提升到 Dataflow 服务账户，该存储桶下载 Dataflow JAR 文件，使用诸如 Recaf  
 之类的 Java 修补程序对它们进行修补。恶意实现将简单地访问 Dataflow 计算实例的元数据端点，检索 Dataflow 服务账户的令牌，并将其上传到控制的远程服务器。  
  
修补 JAR 文件后，我们可以使用 Apigee 服务账户覆盖存储桶中现有的文件：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/0cce2761e23fd80d5698aa56621fef602c6a46e54d1193e3281b60b1bd207cdb.jpg "")  
## 影响  
  
令牌可以访问跨租户的元数据存储桶，在存储桶的 tenantToTenantGroup  
 文件夹下的缓存目录中，许多不相关的 GCP 项目名称 + Apigee 环境名称，被分组在一起：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/1ed7a8e9abcfa228e387bef9c6bb3adca260fbb648d6ec08c425590a856c5773.jpg "")  
  
在 customFields  
 文件夹下，所有不同 Apigee 租户的所有自定义分析字段都是可访问的。这是其中一个租户的自定义分析字段示例：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/92a77643d84252988e058ce05f8e6dbae5401c6f6e9c1478b44f60143f62a730.jpg "")  
  
存储桶也可以使用 Dataflow 服务账户访问。彻底检查后，**这些存储桶包含了所有 Apigee 租户的每个请求的分析数据。**  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/d6e7342e6f3075f003d9f02f2b6b2c2ee867aca1f0c49bcfdc31ab0c42d51331.jpg "")  
  
访问令牌是攻击者可能从这些日志中提取的最严重的信息。攻击者可能已经将它们窃取出来，并用它们来验证身份，并以任何 Apigee 租户的任何最终用户的身份发出请求。  
## 结论  
  
完整的攻击路径如下：  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/9d8fea5af52d4f86c403acf1f422a837c3f226243bcf397a04e702900e523b66.jpg "")  
1. 攻击者将 Apigee 指向 GKE 元数据端点，获取其自身租户项目中消息处理器的服务账户令牌。  
  
1. 攻击者利用 Apigee 服务账户的权限转储租户项目中的磁盘，发现了 Dataflow 暂存桶的名称。  
  
1. 攻击者将恶意 JAR 文件上传到 Dataflow 暂存桶。  
  
1. 然后向 PubSub 主题发送垃圾信息以给现有的 Dataflow 实例施加压力，诱导自动扩缩并配置新的 Dataflow 实例，这些新实例会拉取并执行恶意 JAR。  
  
1. 恶意 JAR 从元数据端点获取 Dataflow 服务账户的令牌，并将其上传到攻击者控制的 GCS 存储桶，从而绕过 Dataflow 的网络限制。  
  
1. 攻击者使用 Dataflow 服务账户的令牌访问跨租户存储桶，检索所有 Apigee 租户的分析信息，包括高度敏感的 OAuth 令牌，从而赋予他们冒充用户的能力。  
  
原文地址 omeramiad.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
