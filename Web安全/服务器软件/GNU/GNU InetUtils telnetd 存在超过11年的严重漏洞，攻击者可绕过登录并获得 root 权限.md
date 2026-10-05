---
source: "gelusus/wxvl 公众号漏洞文库"
title: "GNU InetUtils telnetd 存在超过11年的严重漏洞，攻击者可绕过登录并获得 root 权限"
product: "GNU Inetutils telnetd"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-24061"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2026-24061"
prerequisites: "1.9.3至2.7和实际telnetd服务可达；具体login参数行为"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-e2852c38658ad56633f69f7d"
entity_id: "ve-e2852c38658ad56633f69f7d"
schema_version: "1"
---

# GNU InetUtils telnetd 存在超过11年的严重漏洞，攻击者可绕过登录并获得 root 权限

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：1.9.3至2.7和实际telnetd服务可达；具体login参数行为
- 证据范围：保留发现者、引入/报告时间与扫描观察，属于历史新闻；与源码/实验文章价值不同

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 主CVE缺元数据
- 21个IP属于发布前24小时的扫描/利用尝试，不能作为当前数量或已入侵实例
- 自定义login缓解应链接原始支持建议

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

会杀毒的单反狗
                    会杀毒的单反狗  军哥网络安全读报   2026-01-23 01:01  
  
**导****读**  
  
  
  
GNU InetUtils telnet 守护进程 ( telnetd )中存在一个严重安全漏洞，该漏洞存在近 11 年未被发现。  
  
![](../../.resource/remote/aba1a2fd5d5e9b7978cfeda529a9ff826be6827477a4cedeb41fbcd9e5670137.png "")  
  
  
该漏洞编号为CVE-2026-24061，在 CVSS 评分系统中得分为 9.8 分（满分 10 分）。它影响 GNU InetUtils 的所有版本，从 1.9.3 版本到 2.7 版本（包括 2.7 版本）。  
  
  
根据 NIST 国家漏洞数据库 (NVD) 中对该漏洞的描述，“GNU Inetutils 2.7 及更早版本中的 Telnetd 允许通过 USER 环境变量的“-f root”值绕过远程身份验证”。  
  
  
GNU 贡献者 Simon Josefsson 在 oss-security 邮件列表中发帖称，该漏洞可被利用来获取目标系统的 root 权限：  
  
  
telnetd 服务器调用 /usr/bin/login（通常以 root 用户身份运行），并将从客户端收到的 USER 环境变量的值作为最后一个参数传递。  
  
  
如果客户端提供精心构造的 USER 环境值，即字符串“-f root”，并通过 telnet(1) -a 或 --login 参数将此 USER 环境发送到服务器，则客户端将自动以 root 用户身份登录，绕过正常的身份验证过程。  
  
  
这是因为 telnetd 服务器在将 USER 环境变量传递给 login(1) 之前没有对其进行清理，而 login(1) 使用 -f 参数绕过正常的身份验证。  
  
  
Josefsson 还指出，该漏洞是在 2015 年 3 月 19 日提交的源代码中引入的，最终包含在 2015 年 5 月 12 日发布的 1.9.3 版本中。  
  
  
安全研究员 Kyu Neushwaistein（又名 Carlos Cortes Alvarez）于 2026 年 1 月 19 日发现了该漏洞并进行了报告。  
  
  
作为缓解措施，建议应用最新补丁并将对 telnet 端口的网络访问限制在受信任的客户端。  
  
  
Josefsson 补充道，作为临时解决方案，用户可以禁用 telnetd 服务器，或者让 InetUtils telnetd 使用不允许使用“-f”参数的自定义登录工具。  
  
  
威胁情报公司 GreyNoise 收集的数据显示，过去 24 小时内，有21 个不同的 IP 地址试图利用该漏洞执行远程身份验证绕过攻击，所有这些 IP 地址均已被标记为恶意地址。  
  
  
法国计算机应急响应小组（CERT）周三发布公告称， “许多Telnet服务可以通过互联网访问，这违反了良好做法。因此，CERT-FR建议停用所有Telnet服务。”  
  
  
加拿大和比利时的国家网络安全机构也提出了同样的建议，警告称成功利用该漏洞的风险巨大，并敦促弃用telnetd。  
  
  
新闻链接：  
  
https://thehackernews.com/2026/01/critical-gnu-inetutils-telnetd-flaw.html  
  
![](../../.resource/remote/3e3d8ac7aa21737801e6da1cde8fe2f97e6acf7ec5b9af655b5c65fddc7d7d98.jpg "")  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
