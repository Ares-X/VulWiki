---
cve: "CVE-2026-31957"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  满分漏洞实录：一个缺失的配置项，如何让 Linux 服务器向所有人敞开大门  
原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-03-13 00:00  
  
# 满分漏洞实录：一个缺失的配置项，如何让 Linux 服务器向所有人敞开大门  
  
2026年3月11日，一个编号为 CVE-2026-31957 的漏洞被正式公开，CVSS 评分10.0，满分。  
  
这不是什么复杂的缓冲区溢出，也不是精心构造的链式利用。它的根源只是一行没有填写的配置。  
## 这是一个什么产品的漏洞  
  
Himmelblau 是一款开源的 Linux 身份认证互操作套件，专为企业混合云环境设计，让 Linux 主机能够接入 Microsoft Azure Entra ID（原 Azure Active Directory）和 Intune 进行统一身份管理。  
  
简单说，它做的事情是：让你用公司的微软账户登录 Linux 服务器。  
  
这在企业环境里是一个真实需求。Windows 域环境下的 Linux 主机、需要统一身份管理的混合云场景，Himmelblau 填补了这一空白。项目托管于 GitHub，主要维护者是知名 Samba 贡献者 David Mulder。  
## 漏洞怎么来的  
  
2026年3月2日，Himmelblau 发布了 3.0.0 稳定版，这是一个重大里程碑版本，核心新特性是引入了完整的 OpenID Connect（OIDC）支持。  
  
为了降低部署门槛，开发团队设计了一个"无配置启动"模式：即使管理员还没有填写完整的配置，服务也可以正常启动，并在用户首次登录时动态完成租户注册。设计初衷是简化本地初始化流程，合理且常见。  
  
问题在于，这个"无配置"状态没有区分本地场景和远程网络场景。  
  
Himmelblau 的配置文件 /etc/himmelblau/himmelblau.conf  
 中，[global]  
 段有一个关键字段：  
```
[global]
domain = your-org.onmicrosoft.com

```  
  
这一行的作用是告诉系统：只接受来自这个 Entra ID 租户的认证请求。  
  
当这一行缺失时，系统的行为变成了：接受来自任何 Entra ID 租户的认证请求。  
## 攻击者需要什么  
  
理解这个漏洞的可怕之处，需要先理解攻击条件：  
  
攻击者需要的全部资产，是一个普通的 Azure Entra ID 账户。  
  
这个账户不需要属于目标组织，可以是攻击者自己注册的个人微软账户所创建的租户，可以是任意免费租户。  
  
攻击者不需要：  
- 目标系统上已有的任何账户  
  
- 任何特殊工具或漏洞利用代码  
  
- 对目标组织 Entra ID 环境的任何访问权限  
  
## 攻击是怎么发生的  
  
当一台运行 Himmelblau 3.0.x 且未配置 domain  
 字段的 Linux 主机开放了 SSH 远程访问，攻击过程如下：  
  
攻击者以自己控制的 Entra ID 账户发起 SSH 登录：  
```
ssh attacker@attacker.onmicrosoft.com@target-host

```  
  
Himmelblau 的认证守护进程 himmelblaud  
 收到请求后，从用户名中提取域名 attacker.onmicrosoft.com  
，向微软的 OIDC 发现端点发起查询，获取这个租户的认证元数据，然后在运行时将这个租户动态注册为合法的认证提供者，随后完成 OAuth2 认证流程。  
  
微软的 OIDC 端点响应是完全合法的，整个认证协议的流转也没有任何异常。问题就在于 Himmelblau 自身：它从未验证这个租户是否是管理员预期的那个。  
  
认证通过，攻击者获得了目标主机的 Shell。  
  
这个过程还有一个隐蔽之处：成功注册的攻击者租户信息会被缓存到 /var/cache/himmelblaud/himmelblau.conf  
。即使管理员事后补充了正确的 domain  
 配置，这份缓存不会自动清除，攻击者的租户可能仍然有效，需要手动审计和删除。  
## 还可以更严重  
  
如果目标系统配置了基于 Entra ID 组名的权限映射，比如将名为 LinuxAdmins  
 的组映射为本地管理员，攻击者只需要在自己控制的租户里创建一个同名组并将自己加入，就可以在认证成功后满足组成员验证条件，直接获得管理员权限。  
  
更进一步，CVE-2026-31957 在同一天还有一个伴随漏洞被披露：CVE-2026-31979，评分 8.8，是 Himmelblau 的本地提权漏洞。攻击者通过 CVE-2026-31957 获得普通用户 Shell 之后，可以利用 CVE-2026-31979 中 himmelblaud-tasks  
 守护进程对 /tmp  
 目录写入时缺乏符号链接保护的缺陷，将可控路径通过符号链接重定向，触发以 root 权限运行的进程执行 chown 操作，最终获得系统最高权限。  
  
两个漏洞组合，形成了一条从外部网络到完整系统控制的攻击链，全程无需已知账户，无需任何特殊工具。  
## 从披露到补丁只有 9 天  
  
漏洞窗口期是 3.0.0 稳定版发布（3月2日）到 3.1.0 修复版发布（3月11日），共 9 天。  
  
安全研究员 @khronosd  
 通过负责任披露方式报告了这两个漏洞。维护团队响应及时，9 天内完成了代码修复、版本发布和安全公告，并附带了官方的缓存检测 Python 脚本，用于识别漏洞利用窗口期内是否有未授权租户被注入。  
  
修复的核心逻辑非常直接，提交描述为：fix(auth): require configured provider; revert config-less startup  
。  
  
新版本在处理任何认证请求前，首先检查 [global] domain  
 或 [global] oidc_issuer_url  
 是否已配置，若均未设置，则拒绝认证，不再进入动态注册流程。  
  
动态 OIDC 提供者注册这个特性本身被保留了，只是现在被约束在显式配置的范围内。  
## 这个漏洞说明了什么  
  
CVE-2026-31957 的 CVSS 评分之所以达到满分，在于它的每一个维度都是最差情况：网络可达、低复杂度、无需权限、无需用户交互、影响范围跨组件、机密性完整性可用性全部高危。  
  
但它的根因是软件工程中一个反复出现的老问题：便利性和安全性之间的取舍，在错误的地方做了错误的决定。  
  
"无配置启动"作为一个 bootstrap 特性，在本地初始化场景下是合理的用户体验设计。但这个特性被无差别地暴露在了面向网络的认证路径上，而没有任何"当关键安全配置缺失时应当拒绝服务"的保护逻辑。  
  
安全领域对这类问题有一个原则叫 Fail-Safe Defaults：当系统处于不确定或未配置状态时，默认行为应当是拒绝，而不是放行。这个原则被违反了，漏洞就诞生了。  
## 排查建议  
  
如果你所在的组织有 Linux 主机部署了 Himmelblau，以下几步是现在应当做的事：  
  
**第一步，确认版本：**  
```
himmelblaud --version

```  
  
3.0.0 至 3.0.x 的所有版本均受影响，应立即升级至 3.1.0。  
  
**第二步，检查配置：**  
```
grep -E "^\s*domain\s*=" /etc/himmelblau/himmelblau.conf

```  
  
若无输出，说明 domain  
 未配置，无论是否已升级都需要立即补充。  
  
**第三步，审计缓存：**  
```
cat /var/cache/himmelblaud/himmelblau.conf

```  
  
将其中的租户域名与组织预期的租户进行对比，若存在不属于本组织的条目，需要清理缓存并审查对应时间段的认证日志。  
  
**第四步，审查日志：**  
  
检查 3.0.0 部署后至修复应用前这段时间内，是否存在来自非预期租户的认证成功记录：  
```
journalctl -u himmelblaud --since "2026-03-02" | grep -i "success"

```  
## 参考资料  
- CVE-2026-31957 NVD 条目：https://nvd.nist.gov/vuln/detail/CVE-2026-31957  
  
- GitHub Security Advisory GHSA-q746-m2wv-qh4v：https://github.com/himmelblau-idm/himmelblau/security/advisories/GHSA-q746-m2wv-qh4v  
  
- CVE-2026-31979 关联漏洞 Advisory：https://github.com/himmelblau-idm/himmelblau/security/advisories/GHSA-44wm-q286-ghq3  
  
- Himmelblau 3.1.0 发布页面：https://github.com/himmelblau-idm/himmelblau/releases  
  
- 漏洞分析报告：https://www.thehackerwire.com/himmelblau-critical-auth-misconfiguration-cve-2026-31957/  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
