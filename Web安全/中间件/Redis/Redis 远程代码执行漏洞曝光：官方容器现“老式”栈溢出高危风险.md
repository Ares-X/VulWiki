---
cve: "CVE-2025-62507"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Redis 远程代码执行漏洞曝光：官方容器现“老式”栈溢出高危风险"
product: "Redis8.2 XACKDEL"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-62507"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "能执行XACKDEL的Redis用户/连接、适用8.2.0–.2，实际RCE需匹配镜像/架构/防护与利用链"
affected_versions: "Redis 8.2.0–8.2.2；XACKDEL 命令路径"
fixed_versions: "8.2.3"
verification_source: "https://github.com/redis/redis/security/advisories/GHSA-jhjx-x4cf-4vm8"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e5cc4df4823162a161d708ea"
entity_id: "ve-e5cc4df4823162a161d708ea"
schema_version: "1"
---

# Redis 远程代码执行漏洞曝光：官方容器现“老式”栈溢出高危风险

<!-- vulwiki-editorial:start -->
## 校订与适用边界

官方确认 8.2.3 修复。能否触发还受网络绑定、protected-mode、认证/ACL 与 XACKDEL 命令权限约束；容器构建的防护属性不能泛化所有镜像。

- 适用前提：能执行XACKDEL的Redis用户/连接、适用8.2.0–.2，实际RCE需匹配镜像/架构/防护与利用链
- 证据范围：官方确认潜在RCE但默认无需认证泛称不当，Redis网络绑定/protected-mode/ACL影响可达性与命令权限。

### 已有来源支持的更正

- 官方明确8.2.3修复、XACKDEL ID数超过固定数组遗漏重分配，ACL限制命令可缓解；v4 PR:L

### 本次正文校订

- 按 Redis 原厂公告修正修复版本。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 未区分CVSS版本，文中8.8与当前原厂v4 7.7不是可直接冲突对比，应标版本/来源
- 官方容器无canary并非所有镜像/版本结论，缺JFrog原始研究与digest
- 3262暴露版本识别不代表都可无认证利用，Shodan数应标日期
- 没有原始公告/POC链接，只写securityonline站点；缺ACL禁XACKDEL缓解

### 核验来源

- https://github.com/redis/redis/security/advisories/GHSA-jhjx-x4cf-4vm8

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

看雪学苑
                    看雪学苑  看雪学苑   2026-01-21 09:59  
  
近日，JFrog安全研究团队公开披露了Redis数据库中一个高危漏洞的完整利用链，证实“老式”栈缓冲区溢出攻击在2026年仍具极大危害性。  
该漏洞编号为CVE-2025-62507，CVSS评分高达8.8，影响Redis 8.2.0至8.2.2版本，可被攻击者用于实现远程代码执行（RCE）。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8EWlibLrznGWdJ9oTiaYicmK0GCeaibwIBYLfbpibdBtiaGVmyrzAsMGN25bBHrIiaFo80qR8gOE06wsV57A/640?wx_fmt=png&from=appmsg "")  
  
  
漏洞根源在于Redis 8.2版本新增的XACKDEL命令。  
此命令用于优化流处理，支持在单个原子操作中确认并删除多条消息，但开发者未对用户输入的消息ID数量进行边界检查。当攻击者传入的ID数量超过函数栈上固定大小数组的容量时，数据会溢出并覆盖栈上的关键内存，包括函数返回地址。  
  
  
更令人担忧的是，JFrog团队发现官方Redis Docker镜像未启用栈金丝雀（stack canary）保护机制，这一安全疏漏让原本复杂的栈溢出攻击变得极易实现。攻击者可精准控制指令指针，通过面向返回编程（ROP）绕过NX（不可执行）保护，调用系统mprotect函数将栈标记为可执行，最终运行恶意Shellcode。研究人员已通过构造包含XGROUP CREATE和特制XACKDEL命令的攻击序列，成功触发反向Shell，完整验证了攻击链的可行性。  
  
  
根据Shodan扫描数据，全球约有3262台服务器运行受影响的Redis版本，其中美国、德国、中国的暴露数量位居前三。由于Redis默认不强制身份验证，该漏洞可被未经授权的远程攻击者直接利用，成为黑客的重点攻击目标。  
  
  
目前，Redis官方已在8.2.3版本中修复该漏洞。安全专家建议所有使用受影响版本的用户立即升级，并检查Redis实例的网络暴露情况，限制公网访问以降低被攻击风险。  
  
  
  
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
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
