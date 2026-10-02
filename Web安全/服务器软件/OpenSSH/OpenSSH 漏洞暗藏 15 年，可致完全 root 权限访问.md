---
cve: "CVE-2026-35414"
source: "gelusus/wxvl 公众号漏洞文库"
title: "OpenSSH 漏洞暗藏 15 年，可致完全 root 权限访问"
product: "OpenSSH SSH证书授权"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-35414"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "可信CA签发含特殊逗号principal证书、目标账号authorized_keys principals限制及相关配置；文称10.3修复"
source_status: "unknown"
side_effects: "含计划任务、启动项或 SSH 授权文件写入：会改变后续执行或登录行为。测试前备份原文件，结束后恢复原内容、权限与属主，不覆盖生产文件。"
id: "vw-4c31966cb6f843851239c17b"
entity_id: "ve-4c31966cb6f843851239c17b"
schema_version: "1"
---

# OpenSSH 漏洞暗藏 15 年，可致完全 root 权限访问

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：可信CA签发含特殊逗号principal证书、目标账号authorized_keys principals限制及相关配置；文称10.3修复
- 证据范围：不能由任一可信CA有效证书推导所有主机root，目标账号/限制匹配必须清楚；无PoC或源码正文

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 日志不记录认证失败不等于无法检测，成功登录/证书标识仍可能可查
- authorized_keys principals不是存储服务器信任密钥本身，术语混乱
- 过去15年/所有受影响协议/全服务器root叙述缺精确配置与版本矩阵
- 推测e为明显抓取/编辑噪声

### 操作风险与资料使用

- 含计划任务、启动项或 SSH 授权文件写入：会改变后续执行或登录行为。测试前备份原文件，结束后恢复原内容、权限与属主，不覆盖生产文件。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

HackerNews
                    HackerNews  安全威胁纵横   2026-04-28 08:49  
  
高危漏洞    
  
紧急修复指南    
  
RCE Patch    
  
数据安全公司 Cyera 表示，  
过去 15 年发布的 OpenSSH 版本存在一个漏洞，该漏洞可导致攻击者获取完全的 root shell 访问权限，且基于日志的检测方式无法发现此类攻击。  
  
推测e  
  
该漏洞编号为 CVE-2026-35414，严重程度评分（CVSS）为 8.1。在某些涉及使用逗号字符的证书颁发机构（CA）的场景中，此漏洞表现为对 authorized_keys principals 选项的处理不当。  
  
   
  
据 Cyera 称，由于这个漏洞，SSH 证书主体名称中的逗号会导致 OpenSSH 访问控制被绕过。只要用户拥有受信任 CA 颁发的有效证书，就可以在存在漏洞的服务器上以 root 身份进行身份验证。  
  
   
  
Cyera 向 SecurityWeek 表示：  
“该漏洞源于代码复用错误，意外地使解析器将证书主体中的一个普通逗号解释为列表分隔符，从而将低权限身份转变为 root 凭证。”  
  
   
  
它还补充道：“服务器会认为这种身份验证是合法的，这意味着此类攻击不会在日志中记录身份验证失败，使得基于日志的检测极不可靠。”  
  
   
  
这家网络安全公司解释称，CVE-2026-35414 涉及 principals 列表（包含证书持有者可用于身份验证的用户名）以及 authorized_keys principals（包含服务器用于信任证书的密钥）。  
  
   
  
问题在于，一个处理密码和密钥交换列表协商的函数，在密钥交换期间会比较以逗号分隔的密码列表，并按逗号进行拆分。如果其中任何一个片段与主体的值匹配，就会允许身份验证。  
  
   
  
由于该漏洞，如果一个证书包含主体 “deploy,root”，OpenSSH 会拆分逗号并授予完全的 root 访问权限。  
  
   
  
另一个同样用于检查授权的函数会将相同的主体视为单个字符串并拒绝访问。然而，如果字符串匹配，接下来运行的选项会导致完全跳过主体验证。  
  
   
  
Cyera 称：“我们编写了一个在主体字段中带有普通逗号的测试证书，并将其指向测试服务器，然后就获取了 root 权限。从发现‘看起来不对劲’到成功利用该漏洞，整个过程大约花了 20 分钟。”  
  
   
  
该公司表示，**如果组织内的服务器运行了存在漏洞的协议，成功利用此漏洞可能使攻击者获得对所有这些服务器的 root 访问权限。**  
  
   
  
CVE-2026-35414 已于 4 月初在 OpenSSH 10.3 版本中得到修复。建议各组织对自身环境进行审计，并尽快更新到已修复版本。  
  
  
  
  
  
转载请注明出处@安全威胁纵横，封面来源于网络；  
  
消息来源：https://www.securityweek.com/openssh-flaw-allowing-full-root-shell-access-lurked-for-15-years/  
  
  
  
  
  
  
更多网络安全视频，请关注视频号“知道创宇404实验室”  
  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
