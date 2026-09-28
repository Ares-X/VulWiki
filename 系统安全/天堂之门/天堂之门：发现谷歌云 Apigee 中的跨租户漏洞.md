---
cve: "CVE-2025-13292"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  天堂之门：发现谷歌云 Apigee 中的跨租户漏洞  
 SecureNexusLab   2026-02-10 01:44  
  
#   
  
本文深入解析了在Google Cloud Platform (GCP)核心API管理服务Apigee中发现的、代号为“GatewayToHeaven”（天堂之门）的重大安全漏洞。该漏洞被追踪为CVE-2025-13292。研究显示，攻击者可通过一系列攻击链，在完全托管的租户项目中实现横向移动，最终突破云环境的逻辑隔离边界，访问、窃取其他企业租户的敏感日志、分析数据乃至访问令牌，构成严重的跨租户数据泄露风险。  
## 关于Apigee  
> Apigee 提供了一个 API 代理层，位于您的后端服务与希望使用您的服务的内部或外部客户端之间。  
  
## 租户项目  
  
云服务商通常会构建复杂的逻辑隔离机制，确保不同客户的资源互不可见。在谷歌云中，Apigee作为一款全托管服务，为每个客户创建一个独立的 “租户项目” ，用于托管运行该服务的所有后台资源。  
  
“天堂之门”漏洞的发现，揭示了一条从外部渗透进入租户项目，最后访问到所有其他租户数据的完整攻击链。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicwhsPxwDWuj35JrFBiaAcMbYOAtG7kiaYQCL35tofibuqMfs4vSNqEnCk7k0MCEa6HLibmjibOGWQyRBKJSxWicGzsPDtbjxwXicq7efs/640?wx_fmt=other&from=appmsg "")  
## Apigee 访问权限  
  
目前对租户项目和理论上的跨租户目标的看法是这样的：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicwWWdqUGS4xO2EhIgx2wAeSkqQOhOeoKOuFoVuABxZuWESTRKBd6kjENlvQD3rELJm04eP4OEUpSrq4gsib9W45oNwEbTqlkHfA/640?wx_fmt=other&from=appmsg "")  
  
Apigee 允许它在云外部署，从而在租户项目之外。云部署和混合部署在某些方面有所不同，但在许多其他方面也很相似，探索有详细文档的混合版本可能会揭示云版本中组件的配置方式。  
  
这是 Apigee 混合部署的粗略示意图：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicyxjqx96FotJ7N3dSQHGwAPrXRBtq5X2RhDH4e2n2xZoRtrvxou6SEOHRuE647aNRoicssKVsAtd1zgz6wraZrPx60Nk1w2LSMU/640?wx_fmt=other&from=appmsg "")  
  
Apigee 的主要组件是消息处理器，在图中以黄色高亮显示。  
  
消息处理器是位于最终用户和后端服务之间的 API 代理所有通过 Apigee 的最终用户请求都由它处理。所有其他组件的存在都是为了使其按预期工作提供最新的配置，并将分析数据流回谷歌。  
  
Apigee 默认会为所有代理请求添加 X-Forwarded-For  
 ，导致元数据端点拒绝该请求，作为针对服务器端请求伪造的防御机制。可以使用 AssignMessage  
 Apigee 策略来绕过它，该策略可用于在请求发送到后端之前移除请求头。  
  
在消息处理器的元数据端点暴露后，可以与该工作负载关联的服务账户令牌：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicyicFKbHpianks1l597Xht4UntOvjWku2icu1rJo8EpW44HNZu44TDGzExc43GBLt437BZ0QtQYm1ZVxibpNFO0rxicZTkHp98ic9F14/640?wx_fmt=other&from=appmsg "")  
## 租户项目探索  
  
gcpwn 是一个有用的权限枚举工具，可以迭代服务账户可能拥有的所有权限并检查它们是否存在。  
  
通过它发现的一些有用权限包括：  
- 对租户项目中计算磁盘和快照的完全访问权限。  
  
- 对所有存储桶的读写访问权限。  
  
- 对 PubSub 主题的写入权限。  
  
权限可以列出和读取磁盘、快照等资源，并控制知道名称的存储桶的内容。这是使用 Apigee 服务账户令牌在租户项目上运行 gcloud compute disks list  
 命令的输出：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYiczWdqe5jlwb6DKXrkRr79NOSEqk6r98MkbFTiauuv2BKkNA3H3Hzm4VLzlLpJlQslHiaQJiciafmO44HwkenSVeP3iaUUkDzSXmCC4E/640?wx_fmt=other&from=appmsg "")  
  
转储磁盘的内容，需要执行以下操作：  
1. 创建磁盘的快照。  
  
1. 将其迁移到控制下的另一个项目。  
  
1. 在项目中从该快照重建一个新磁盘。  
  
1. 创建一个计算实例并将磁盘附加到它。  
  
1. 挂载磁盘并查看其内容。  
  
通过浏览转储文件中的所有日志和配置文件探索， boot-json.log  
 的文件，其中包含有关分析计算实例行为的日志：  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/PkfClzhSYiczXCE8MlYDNZ1esgicmicjAtL6ficEKb1JImDqiakhchRwS4WqViatpHNqlHRWZ27dWjOzZ4TJ6zaZUQbCwP50Igef3ajAAy9OW4zSo/640?wx_fmt=other&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicwBGHREZX84QSXOMia3YNf6wCkJNyaO3vqibicwe5vG0kJ2hIf6ZggUP7B0wkX2YUGAqkmjicpgg0SuVCfQjv4oCnVXv8zMbGcGPUE/640?wx_fmt=other&from=appmsg "")  
1. 租户项目配置了 Dataflow，并且此磁盘属于其某个计算实例。Dataflow是一个谷歌云服务，提供统一的大规模流和批量数据处理。  
  
1. 初始化时，Dataflow 管道访问一个存储桶，下载 JAR 文件，并在执行时将它们用作依赖项。  
  
下载 JAR 文件的存储桶位于租户项目中，Apigee 服务账户拥有对其的读写权限。利用这些权限，用恶意代码修补其中一个 JAR 文件，从而在 Dataflow 计算实例上实现远程代码执行。  
  
转储文件中的另一个文件 pipeline_options.json  
 显示，Dataflow 管道由另一个服务账户执行：apigee-analytics@TENANT-PROJECT.iam.gserviceaccount.com  
：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicyI9lvRkucZXvOVPjia52fQ22os2G7kEnQiareqv8KZSibibnry48W6nShy5J1n0vfGkAR1AicD2IWUkh2CiaDJR0HGQOiaLoYH08euEM/640?wx_fmt=other&from=appmsg "")  
  
这个账户可能拥有一些跨租户权限。同一个文件还有以下配置值：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYiczvjC44UF9k3aaSeaye3W3m1Gmch61Bib3xTSUrhGjhr5rzQAiamNhpS6eXF7Yh95ksxZAKAuoQA19G6OVTgGuKiaE2ABYPGlR1Qw/640?wx_fmt=other&from=appmsg "")  
  
其中指定的元数据存储桶的名称没有任何随机后缀，暗示它可能包含跨租户的元数据。  
## Dataflow 的权限  
  
Apigee 服务账户拥有对存储 Dataflow 管道执行的 JAR 文件的存储桶的写入权限。  
  
将权限提升到 Dataflow 服务账户，该存储桶下载 Dataflow JAR 文件，使用诸如 Recaf  
 之类的 Java 修补程序对它们进行修补。恶意实现将简单地访问 Dataflow 计算实例的元数据端点，检索 Dataflow 服务账户的令牌，并将其上传到控制的远程服务器。  
  
修补 JAR 文件后，我们可以使用 Apigee 服务账户覆盖存储桶中现有的文件：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicwOnvjSEibDa7tiaASMOdZWlVURmM8Yvkd0icS12icQEsibOvbPWcohicL2IuKbeKuPGNYYlHJmooib5Zeu4289tB8HEjSJsq6ibayw2ZY/640?wx_fmt=other&from=appmsg "")  
## 影响  
  
令牌可以访问跨租户的元数据存储桶，在存储桶的 tenantToTenantGroup  
 文件夹下的缓存目录中，许多不相关的 GCP 项目名称 + Apigee 环境名称，被分组在一起：  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/PkfClzhSYicxwzL3KeEYoRdprIicxdd08rTW1pHmjqq8mNRVnn6wVIDZgcM4EKVhvr5pfVeoxYQlc04WRR0M6jM0FCIVthDZwT4KvNvONdgrY/640?wx_fmt=other&from=appmsg "")  
  
在 customFields  
 文件夹下，所有不同 Apigee 租户的所有自定义分析字段都是可访问的。这是其中一个租户的自定义分析字段示例：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicxDZmsdHrTLsnvrJEMo7xuHGtcU2QCqm6M9E2iaU7pb50PklwXsNvQUCKCIFME4G2ZiceDYb5oZCYBDqmFxRgByUrpo5XMX0zM5w/640?wx_fmt=other&from=appmsg "")  
  
存储桶也可以使用 Dataflow 服务账户访问。彻底检查后，**这些存储桶包含了所有 Apigee 租户的每个请求的分析数据。**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/PkfClzhSYicwhcxU1ujIOTGbyR2EfOjLeNnKQovXoLB197CYpKhLg3V9KLmn5rwsj4sucFFLtTFKxK6dgaZoRRCicI9QtvKic0RUxGHvE4Z1Co/640?wx_fmt=other&from=appmsg "")  
  
访问令牌是攻击者可能从这些日志中提取的最严重的信息。攻击者可能已经将它们窃取出来，并用它们来验证身份，并以任何 Apigee 租户的任何最终用户的身份发出请求。  
## 结论  
  
完整的攻击路径如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/PkfClzhSYicwzLSccYPebfoX1MPF7OQbaaAibFoArpLRPGmzAX67pmPYCbfGmtzBfogyr33XvVvQvWa6U4s4G7TiaZQOTRkOVxbJmJCZkr4Kzk/640?wx_fmt=other&from=appmsg "")  
1. 攻击者将 Apigee 指向 GKE 元数据端点，获取其自身租户项目中消息处理器的服务账户令牌。  
  
1. 攻击者利用 Apigee 服务账户的权限转储租户项目中的磁盘，发现了 Dataflow 暂存桶的名称。  
  
1. 攻击者将恶意 JAR 文件上传到 Dataflow 暂存桶。  
  
1. 然后向 PubSub 主题发送垃圾信息以给现有的 Dataflow 实例施加压力，诱导自动扩缩并配置新的 Dataflow 实例，这些新实例会拉取并执行恶意 JAR。  
  
1. 恶意 JAR 从元数据端点获取 Dataflow 服务账户的令牌，并将其上传到攻击者控制的 GCS 存储桶，从而绕过 Dataflow 的网络限制。  
  
1. 攻击者使用 Dataflow 服务账户的令牌访问跨租户存储桶，检索所有 Apigee 租户的分析信息，包括高度敏感的 OAuth 令牌，从而赋予他们冒充用户的能力。  
  
原文地址 omeramiad.com  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
