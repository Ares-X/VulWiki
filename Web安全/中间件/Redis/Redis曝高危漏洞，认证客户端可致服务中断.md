---
cve: "CVE-2025-48367"
source: "gelusus/wxvl 公众号漏洞文库"
original_title: "Redis曝高危漏洞，认证客户端可致服务中断"
title: "Redis 连接接受错误导致拒绝服务（CVE-2025-48367）"
product: "Redis连接错误处理"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-48367"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "无需认证；网络连接接受路径异常导致服务不再接受后续连接，详见 Redis 官方公告"
fixed_versions: "8.0.3；7.4.5；7.2.10；6.2.19"
verification_source: "https://github.com/redis/redis/security/advisories/GHSA-4q32-c38c-pwgq; https://github.com/redis/redis/releases/tag/8.0.3"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-4db12024295d4c287a5b06ef"
entity_id: "ve-4db12024295d4c287a5b06ef"
schema_version: "1"
---

# Redis 连接接受错误导致拒绝服务（CVE-2025-48367）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

本文原报道混入另一类已认证用户滥用问题的机制和“不会修复”表述。CVE-2025-48367 的正确边界是无需认证的连接接受错误导致 DoS；官方已提供修复。后文错配段落逐段标为原报道争议材料，不能作为当前修复依据。

- 适用前提：无需认证；网络连接接受路径异常导致服务不再接受后续连接，详见 Redis 官方公告
- 证据范围：原厂48367是未认证连接重复协议错误导致client starvation，文章却写已认证multibulk滥用且不修复，明显混入其他公告。

### 已有来源支持的更正

- 官方确认未认证连接错误导致DoS、报告者julienperriercornet、四分支已修复，编号48367明确
- 8.0.3正式release Security fixes明确48367修复为接受连接报错时继续接受其他连接，绝非文章说不修复/可能常规稳定性更新；同时修复32023，但两者不可合并。

### 本次正文校订

- 修正题名；原文件路径保持不变，以保留已有链接和资源定位。
- 按官方发布说明修正补丁确定性和机制。
- 明确隔离与官方补丁记录冲突的“不修复”历史说法。
- 标记原报道认证引文与 CVE-2025-48367 不一致。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 认证要求错误：官方未认证，文章标题和正文均认证
- 报告者错误：官方julienperriercornet而文中Gabriele Digregorio
- 不修复说法与原厂Patches已修四分支矛盾，不能把8.0.3/7.4.5/7.2.10/6.2.19降为可能稳定性缓解
- CVSS7.0 v4与官方48367 7.5 v3混写需区分，根因不是正文信任已认证用户模型讨论
- 缺原始公告直链，只有securityonline站名，应隔离查明被混入CVE后重写

### 核验来源

- https://github.com/redis/redis/security/advisories/GHSA-4q32-c38c-pwgq
- https://github.com/redis/redis/releases/tag/8.0.3

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

看雪学苑  看雪学苑   2025-07-07 09:59  
  
2025年7月7日，安全研究人员发现热门内存数据存储系统Redis存在一个严重的拒绝服务（DoS）漏洞，该漏洞编号为CVE-2025-48367，在CVSSv4评分体系中达到了7.0分的高危级别。此漏洞的存在，使得已认证的客户端有可能对Redis服务进行干扰，进而导致服务中断。  
  
  
此次漏洞是由安全研究员Gabriele Digregorio负责披露的，之后经过Redis开发团队的验证。其问题根源在于已认证用户对Redis多批量协议命令的滥用。虽然Redis的核心安全理念是信任已认证用户，但这一漏洞若被利用，依然会对服务器的性能造成影响，甚至可能引发服务宕机。  
  
  
【未核实且与该 CVE 官方认证条件冲突的历史引文】Redis官方在安全公告中表示：“该问题的产生依赖于对Redis内置命令网络协议的滥用或误用，并且需要用户成功完成认证。从这方面来看，它并未违背Redis的安全模型……不过，仍然可能会对服务的可用性造成意想不到的影响。”  
  
  
【原报道错配段落，不适用于 CVE-2025-48367】值得关注的是，考虑到直接通过代码修复该漏洞可能会对Redis的正常功能和性能产生负面影响，Redis官方决定不采取这种方式。官方团队称：“我们经过评估认为，实施应用程序变更来防止这种情况的发生，会对Redis的合法功能和性能产生不利影响。因此，我们不打算针对这个问题进行修复，而是选择发布此安全公告。”  
  
  
尽管如此，Redis还是为四个活跃的版本分支发布了补丁，分别是8.0.3、7.4.5、7.2.10和6.2.19。这些版本的安全修复明确覆盖 CVE-2025-48367；8.0.3 发布说明写明在接受连接报错后继续接受其他连接，不能仅称可能相关的稳定性改进。  
  
  
鉴于该漏洞的特性，Redis官方给出了加强访问控制和身份验证的建议：  
  
-实施严格的身份认证措施，避免将Redis实例暴露在不可信的网络环境中；  
  
-将Redis的访问与企业的身份提供商进行集成，以实现更有效的访问控制；  
  
-相关人员应重新审视Redis的安全最佳实践，强化部署。  
  
  
  
资讯来源  
：  
securityonline.info  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibExiboJzOiafqGLvlOkrmU6NIr3qSr7ibpkIo2N5mhCTNXoMl37s2oRSIDw/640?wx_fmt=gif&from=appmsg "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
