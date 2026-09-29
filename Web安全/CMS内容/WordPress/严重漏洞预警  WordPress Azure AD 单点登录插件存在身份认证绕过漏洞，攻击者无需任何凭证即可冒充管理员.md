---
cve: "CVE-2026-2628"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  严重漏洞预警 | WordPress Azure AD 单点登录插件存在身份认证绕过漏洞，攻击者无需任何凭证即可冒充管理员  
原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-03-08 00:00  
  
# 严重漏洞预警 | WordPress Azure AD 单点登录插件存在身份认证绕过漏洞，攻击者无需任何凭证即可冒充管理员  
  
**CVE-2026-2628 | CVSS 9.8 | 影响版本：login-with-azure <= 2.2.5**  
## 漏洞概述  
  
2026 年 3 月 2 日，一个影响 WordPress 企业级单点登录插件的严重身份认证绕过漏洞正式公开披露，编号 CVE-2026-2628，CVSS v3.1 基础评分 9.8（满分 10 分）。  
  
受影响插件为 **All-in-One Microsoft 365 & Entra ID / Azure AD SSO Login**  
（WordPress.org 插件 slug：login-with-azure），由 miniOrange 开发，用于将 WordPress 站点与 Microsoft Azure Active Directory（Entra ID）进行单点登录集成。该插件支持 OAuth 2.0、OpenID Connect 和 SAML 2.0 协议，同时集成 SharePoint、Power BI、Outlook、Teams、Dynamics 365 等 Microsoft 365 企业服务。  
  
漏洞影响该插件所有版本直至 2.2.5。**官方修复版本 2.2.6 已于 2026 年 2 月 19 日发布，早于公开披露。**  
## 这个漏洞有多严重  
  
先看 CVSS 评分拆解：  
- 攻击向量：网络（可远程利用，无需内网访问）  
  
- 攻击复杂度：低（无需特殊条件或前置准备）  
  
- 所需权限：无（无需任何账号）  
  
- 用户交互：无（无需受害者配合）  
  
- 机密性/完整性/可用性影响：均为高  
  
翻译成白话：**任何人，只要能访问目标网站的 HTTP 服务，就可以在不提供任何密码、不触发任何用户操作的情况下，以管理员身份登录目标 WordPress 站点。**  
  
满分评分结构下唯一没得满分的指标是"影响范围"——该项被评为"不变"，意指漏洞的直接影响仍局限于 WordPress 站点本身。但考虑到该插件深度集成了 Microsoft 365 服务，实际的潜在扩散范围远不止于此。  
## 漏洞成因  
  
这是一个经典的 CWE-288 类型漏洞：**通过替代路径或信道绕过身份验证**  
。  
  
正常的 OAuth 2.0 / OpenID Connect 单点登录流程有严格的验证步骤：用户点击"使用 Microsoft 账号登录"后，插件会生成一个随机 state 参数（防 CSRF 的 nonce），将用户重定向至 Microsoft 身份端点完成认证；Microsoft 将用户带回插件的回调地址，插件必须：  
1. 验证 state 参数与会话中存储的值严格匹配；  
  
1. 使用 Microsoft 公钥校验 id_token 签名；  
  
1. 验证 audience、token 绑定等声明；  
  
1. 确认身份信息后，才调用 WordPress 登录函数完成认证。  
  
CVE-2026-2628 的问题在于：该插件存在一条替代的认证触发路径，这条路径**跳过了上述全部或部分验证步骤**  
，使攻击者可以直接触发 WordPress 登录逻辑，无需经过真实的 Microsoft 身份认证。  
  
这一模式并非首次出现。2023 年的 CVE-2023-3128（Grafana Azure AD 认证绕过）和 2025 年的 CVE-2025-7444（LoginPress Pro 认证绕过）均属于同一类型的 OAuth 实现缺陷——SSO 插件的认证回调逻辑一旦存在"捷径"，便可能沦为攻击者的直接入口。  
## 攻击者能做什么  
  
成功利用漏洞后，攻击者将以目标用户（包括管理员）的身份建立合法的 WordPress Session。取得管理员权限后，可进一步：  
- 通过插件/主题编辑器上传 PHP Webshell，在服务器端执行任意代码；  
  
- 导出全站用户数据、内容、配置信息；  
  
- 借助该插件已获得的 Microsoft Graph API 授权，访问关联的 SharePoint 文档、Outlook 邮件、Teams 消息、Dynamics 365 数据；  
  
- 篡改网站内容或植入恶意代码用于下一步钓鱼攻击；  
  
- 以被攻陷的 WordPress 服务器为跳板，向企业内网或 Azure AD 租户进行横向渗透。  
  
对于将该插件部署在企业门户、政务平台或高校系统的组织而言，入侵影响已不局限于 WordPress 站点本身，而是直接威胁整个 Microsoft 365 企业环境。  
## 谁在受影响  
  
根据 WordPress.org 官方数据，该插件累计下载量约 27,894 次，活跃安装量约 600 个站点。数字看起来不大，但需要注意的是：  
  
**这 600 个站点，绝大多数不是个人博客。**  
  
该插件的典型用户是使用 Microsoft 365 统一身份管理的企业、高校和机构。这类站点持有的数据敏感度、系统重要性以及与 M365 企业环境的深度集成程度，使得每一个受影响站点被攻破的实际损失，都远高于普通 WordPress 站点。  
  
版本历史也值得关注：2.2.4 版本标注了"Security fixes"，2.1.4 版本修复了 XSS 漏洞，现在 2.2.6 再次修复安全问题。该插件在 2.x 系列中存在持续性安全改进需求，使用者有必要保持对更新的持续关注。  
## 漏洞时间线  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">时间</span></section></th><th style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;"><section><span leaf="">事件</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-02-05</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">安全研究员 Nabil Irawan 发现漏洞</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-02-17</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">Wordfence 完成 CVE 编号注册，厂商收到通知</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-02-19</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">miniOrange 发布修复版本 2.2.6</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-02</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">漏洞公开披露</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">2026-03-03</span></section></td><td style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;"><section><span leaf="">NVD 完成收录</span></section></td></tr></tbody></table>  
厂商从收到通知到发出修复补丁仅用 2 天，并在公开披露前约 11 天完成修复，是负责任披露流程的典型案例。  
  
漏洞由来自印度尼西亚的安全研究员 Nabil Irawan 发现，他在 Patchstack 平台排名第 28 位，累计提交超过 636 份漏洞报告，是 WordPress 生态安全领域的活跃贡献者。  
## 关于流传的"PoC"  
  
截至本文发布，GitHub 上出现了一个名为 b1gchoi/CVE-2026-2628-PoC 的仓库，声称提供该漏洞的利用代码。  
  
**请勿下载或执行该仓库中的任何文件。**  
  
该仓库呈现出与已知 Webrat 恶意软件投放活动高度吻合的特征：账号新建无历史、exploit 文件通过外部短链接分发而非直接托管在仓库内。Webrat 活动专门针对安全研究人员，通过伪造的 PoC 仓库分发包含键盘记录、凭证窃取、后门植入功能的恶意程序。  
  
Wordfence 官方披露文档未引用任何公开 PoC。目前尚无经过验证的合法公开利用代码。  
## 应对措施  
  
**立即升级（最高优先级）**  
  
将 login-with-azure 插件升级至 2.2.6 或最新版本：  
  
登录 WordPress 后台 -> 插件 -> 已安装插件 -> 找到该插件 -> 立即更新  
  
官方页面：https://wordpress.org/plugins/login-with-azure/  
  
**若暂时无法升级**  
- 临时停用该插件，改用密码登录或其他 SSO 方案；  
  
- 通过 Nginx/Apache 配置或 WAF 规则，对 /wp-login.php 及 SSO 回调路径实施 IP 白名单访问控制；  
  
- 在 Azure AD 侧为所有相关账号强制启用多因素认证（MFA）。  
  
**升级后的排查建议**  
  
升级完成后，不要只是升级了事。建议同时：  
- 审查 WordPress 用户列表，确认是否存在 2026-03-02 公开披露后被异常添加的账号；  
  
- 比对 Microsoft Entra ID 登录日志与 WordPress 登录日志，排查 WordPress 登录成功但 Entra ID 侧无对应认证记录的异常条目；  
  
- 检查服务器 /wp-content/uploads/ 等可写目录是否存在可疑 PHP 文件。  
  
**检测特征（供 WAF / IDS 规则参考）**  
  
重点关注以下流量模式：  
```
请求路径匹配 /?code=* 或 /?azure_sso=* 或 /wp-login.php?action=azure*
且响应为 HTTP 302 跳转至 /wp-admin/
且该会话中未出现来自 login.microsoftonline.com 的前置跳转请求

```  
  
若发现上述特征组合，应判定为疑似认证绕过攻击，需立即介入排查。  
## 写在最后  
  
CVE-2026-2628 是一个在数字上看起来影响范围不宽、但实际风险密度极高的漏洞。它的目标不是随机的个人博客，而是那些将 WordPress 与 Microsoft 365 企业环境深度绑定的机构和组织。  
  
它也再次提醒我们：SSO 集成不是"配置一次就万事大吉"的功能。OAuth / OpenID Connect 的实现复杂，任何一个校验步骤的缺失，都可能将整个认证体系的努力清零。CVE-2023-3128、CVE-2025-7444、CVE-2026-2628，每一个都是同样的故事。  
  
修补很简单，一键升级。真正需要花时间的，是排查在修复之前是否已经有人走过那条"捷径"。  
  
**参考来源**  
- NVD 官方条目：https://nvd.nist.gov/vuln/detail/CVE-2026-2628  
  
- Wordfence 威胁情报：https://www.wordfence.com/threat-intel/vulnerabilities/id/5e15e36e-55f9-4095-a0ba-48ef9434606a?source=cve  
  
- CIRCL Vulnerability-Lookup：https://vulnerability.circl.lu/vuln/cve-2026-2628  
  
- WordPress 插件页面：https://wordpress.org/plugins/login-with-azure/  
  
- CWE-288 定义：https://cwe.mitre.org/data/definitions/288.html  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
