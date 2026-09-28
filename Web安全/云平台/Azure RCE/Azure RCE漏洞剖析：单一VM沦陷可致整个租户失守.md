---
cve: "CVE-2026-20965"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Azure RCE漏洞剖析：单一VM沦陷可致整个租户失守  
Dubito
                    Dubito  云原生安全指北   2026-01-20 01:07  
  
   
  
> 注：本文翻译自Cymulate的文章  
《CVE-2026-20965: Cymulate Research Labs Discovers Token Validation Flaw that Leads to Tenant-Wide RCE in Azure Windows Admin Center》[1]  
，可点击文末“阅读原文”按钮查看英文原文。  
  
  
全文如下：  
## 一、引言  
  
当 Azure 身份令牌验证不当时，单个虚拟机与整个租户之间的边界可能崩溃。Cymulate 研究实验室在 Windows Admin Center 中发现了这一确切的缺陷，微软现已为其发布了补丁。  
  
Cymulate 研究实验室发现 Windows Admin Center (WAC) 的 Azure AD 单点登录 (SSO) 实现中存在一个高严重性漏洞。该漏洞允许攻击者仅凭对一台机器的本地管理员权限，就能提权、执行远程代码，并在同一租户内的 Azure 虚拟机和 Arc 连接系统中横向移动，**而无需有效的 Azure 凭据**  
。  
  
Cymulate 于 2025 年 8 月首次向微软报告了此问题。CVE-2026-20965  
 揭示了令牌验证和访问范围界定中的微妙失误如何会破坏云隔离保障。为了修复此问题，微软于 2026 年 1 月 13 日发布了 Windows Admin Center Azure 扩展版本 0.70.00  
。Cymulate 建议所有部署了 Windows Admin Center Azure 扩展的云环境尽快应用此更新。  
  
在微软披露的同一天，Cymulate Exposure Validation 已更新，增加了攻击场景 **Azure - 扫描 Windows Admin Center 令牌验证不当漏洞 CVE-2026-20965**  
，以帮助您在环境中测试此漏洞。  
## 二、漏洞摘要  
  
微软 Windows Admin Center (WAC) 的 Azure AD 单点登录 (SSO) 实现中存在一个漏洞，允许对 Windows 机器拥有本地管理员访问权限的攻击者绕过关键的身份验证和授权机制。  
  
这导致攻击者能够在**无需有效 Azure 凭据**  
的情况下，越权访问同一租户内其他任何同样安装了 WAC 的机器，包括 Azure 虚拟机 (VM) 和 Azure Arc 连接的机器。  
### 2.1 受影响对象  
  
所有安装了未打补丁的 Windows Admin Center Azure 扩展（版本**低于**0.70.00  
）的 Azure VM 和 Arc 接入机器均受此攻击影响。  
  
此外，本文还提供了检测指南，以帮助识别过去可能已发生的事件和正在进行的、基于身份的、跨越边界的 Windows Admin Center 访问。虽然目前尚未发现此漏洞在野被利用，但仍建议改进 WAC 的检测策略和规则概念，以便追溯性地发现滥用行为，并加强对跨租户和信任边界的未授权活动的监控。  
### 2.2 先决条件  
1. 1. 攻击者对一台安装了 WAC 的 Azure VM 或 Azure Arc 连接机器拥有本地管理员访问权限。  
  
1. 2. 等待特权用户从 Azure 门户通过 Windows Admin Center 向该机器发起连接。  
  
### 2.3 影响  
  
成功利用此漏洞可使攻击者提升权限、横向移动，并在租户内所有安装了 WAC 的机器上执行远程命令，从而破坏授权边界，可能导致整个环境被完全攻陷。  
## 三、深入分析前需要了解的关键概念  
  
在我们先前发现与   
本地特权提升[2]  
 和   
证明验证不当[3]  
 相关的漏洞后，我们注意到 Windows Admin Center 主要有两种实现方式：  
1. 1. 本地部署的 WAC 网关服务器  
  
1. • WAC 网关由用户管理，安装在本地服务器或云虚拟机上。只有网关服务器需要安装 WAC 软件。  
  
1. 2. 基于 Azure SSO 的实现  
  
1. • WAC 网关基于一个 SaaS Web 应用程序。每台被管理的设备都需要安装 WAC 软件。  
  
当在 Azure 中设置虚拟机或使用 Azure Arc 服务加入现有的 Windows 服务器时，该机器的 Azure 门户页面会提供几种不同的管理连接方法。其中一种就是 **Windows Admin Center**  
。当用户首次访问该页面时，会看到一个选项，可以直接从门户自动安装管理软件：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ2orMZorzibKYlw4qOWGnKUajIGqibKBhf8ibWvStibHY8CDoWnOPFyexUA/640?from=appmsg "null")  
  
点击安装按钮后，Azure 会自动下载并在机器上部署 WAC 软件，从而允许通过门户直接连接：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQCgIVwnG2vZjTRygvg6vET95ib5ibohgxYhnxbFqxXzsMFFdibzuOpYfFA/640?from=appmsg "null")  
  
连接选项卡有一个先决条件检查。Azure 会验证用户是否拥有 **WAC管理员登录（Windows Admin Center Administrator Login）**  
 Azure 角色，通过 Just In Time (JIT) 机制打开 WAC API 端口（6516），并允许通过网关 URL <Unique DNS>.<location>.waconazure.com:6516  
 进行访问。但令我们惊讶的是，在 JIT 访问期间，该端口会同时通过 VNet IP 和外部 IP（如果已配置）地址直接暴露。  
  
此外，Azure 门户直接与该网关 URL 通信，并且该 URL 暴露在互联网上。  
  
基于这些观察，Ben 深入研究了每台被管理主机上 WAC 服务所使用的 SSO 机制，并提出了一个假设：如果攻击者已经对一台 WAC 管理的机器拥有本地管理员权限呢？ 是否可能从一个本地的非云用户滥用 Azure SSO，从而逃离虚拟机，并实现在整个租户内的横向移动或权限提升？  
## 四、了解 Windows Admin Center Azure SSO 的工作原理（及其失效之处）  
  
当连接到启用了 Azure SSO 身份验证的 Windows Admin Center (WAC) API 时，应用程序 API 软件（直接安装在 VM / Arc 接入的机器上）需要两个独立的访问令牌来授权用户并授予访问权限：  
1. 1. 用于 https://pas.portal.waconazure.com  
 的访问令牌  
  
此令牌包含 WAC.CheckAccess  
 作用域，是针对连接用户的用户主体名称 (UPN) 颁发的。WAC 服务应用程序使用此令牌来验证连接的管理员用户是否有权访问和管理目标机器（需具备 WAC管理员登录（Windows Admin Center Administrator Login）Azure 角色）。  
  
1. 2. 持有证明 (PoP，Proof of Possession) 绑定访问令牌  
  
这是一个 PoP 令牌，通过加密方式绑定到一个密钥 ID (KID)，该 KID 与用户浏览器中生成的一对密钥相关联。此令牌确保只有持有相应私钥（浏览器会话）的实体才能使用它，为请求身份验证增加了一层额外的安全保障。  
  
持有证明 (PoP) 令牌是微软的一项技术，旨在缓解访问令牌窃取和重放攻击。客户端浏览器生成一个非对称密钥对，并请求一个类型为 PoP  
 的访问令牌，同时提供所生成公钥的标识符 (KID)。颁发的访问令牌会嵌入此 KID，从而将其与密钥对绑定。  
  
然后，浏览器将访问令牌包装在一个新的 JWT 中，插入 PoP 令牌，并用私钥对其进行签名。为了进一步防止重放，签名的载荷包含了请求特定的细节，如 URL、HTTP 方法、时间戳、随机数和其他属性。  
  
**注意**  
：微软已宣布即将实施一项名为 TLS PoP 的技术，它建立在“持有证明模型”之上。与依赖对令牌数据签名的标准 PoP 不同，TLS PoP 还设计为对其加密。这种方法隐藏了令牌内容，防止篡改，并保留了 PoP 的重放攻击防护能力，同时增加了加密提供的额外安全保障。  
  
当通过 Azure 门户连接到 WAC 管理的设备时，客户端浏览器会构建一个令牌，该令牌包装了绑定的 PoP 类型访问令牌，并包含以下关键组件：  
- • 为授权而呈现的PoP 绑定访问令牌。  
  
- • URL 字段，指定为 WAC API 生成的网关地址。  
  
- • HTTP 方法字段，我们发现其始终设置为 POST（即使使用了 GET 等其他方法）。  
  
- • 资源 ID 字段，包含目标虚拟机的完整 Azure Resource Manager (ARM) 路径（例如，/subscriptions/<订阅ID>/resourceGroups/<资源组名称>/providers/Microsoft.Compute/virtualMachines/<机器名称>  
）。  
  
- • CNF 字段，包含用于验证绑定到令牌的签名密钥的公钥参数。  
  
- • 使用其浏览器生成的私钥对令牌进行的签名（证明完整性）。  
  
发送到 WAC API 的每个 HTTP 请求都同时包含访问令牌和 PoP 绑定令牌，它们共同作为身份验证和授权机制。  
  
值得注意的是，在 WAC 的实现中，**这两个令牌在整个会话期间（直到过期）都保持不变，并在所有请求中重复使用**  
，无论 HTTP 方法（GET、POST 等）、访问的 API 端点、随机数或时间戳值如何。  
  
这种行为意味着令牌不是按请求或按资源动态限定作用域或重新生成的，从而降低了持有证明机制的有效性：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQhspKeibgkCS74KqUKaqO4gFevbqrHzZlvqIiasy2icDYWhDTwtddUPicCw/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQaicMmA2RdvcURQ0rTScaG3YFjxEo6YR9LwldHUNxDd6FCS5KZz5sK9w/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQQFGk5icDOIMt4GAyS1ciaicIqyymfSWDlA9KX7b5lPtpWVdSAN21ZIRHw/640?from=appmsg "null")  
1. 1. API 服务器使用WAC.CheckAccess  
 令牌来验证用户是否有权访问该资源。如果用户无权访问该机器，访问将被拒绝。  
  
1. 2. WAC.CheckAccess  
 令牌并未限定于特定的 VM/机器。它授予连接用户有权访问的租户内任何 WAC 管理的机器的访问权限。  
  
1. 3. PoP 令牌用于将请求绑定到特定资源（很可能是基于资源 ID 属性）。几乎其他所有属性都被忽略了。  
  
1. 4. WAC-SESSION Cookie 似乎对授权没有影响。只要两个访问令牌存在且有效，即使请求中省略该 Cookie，也不会阻止访问。  
  
**最关键的是，Windows Admin Center 服务器不会验证两个令牌中的用户主体名称 (UPN) 是否相同。**  
 这允许攻击者混合使用来自不同用户的令牌。例如，可以窃取自特权用户的 WAC.CheckAccess  
 令牌与攻击者自己的 PoP 令牌结合使用，从而导致未授权访问和权限提升。  
  
**甚至连来自不同租户的 PoP 令牌也会被接受**  
。唯一被验证的字段——机器 ID（Machine ID）——是由客户端的浏览器控制的，并且可以被修改并有效签名（使用与 PoP 令牌的 KID 匹配的生成私钥）：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQQ1MAyhOtIvGr4mgC0p8o42a0Tp5ibvqPmYKOEWPdn7zIcpNwcY6iclOQ/640?from=appmsg "null")  
  
VM 上的 Windows Admin Center 服务器应用程序在授予对所有 API 端点和操作（包括本地管理员级别的远程命令执行）的完全访问权限之前，仅验证以下属性：  
1. 1. 请求中的资源 ID 路径与 VM 的实际对象标识符匹配。  
  
1. 2. PoP 令牌使用与该访问令牌绑定的密钥 ID (KID) 对应的私钥正确签名。  
  
1. 3. PoP 令牌内的 URL 字段与 HTTP 请求的 Host 头部匹配。  
  
1. 4. WAC.CheckAccess  
 令牌有效，并且属于有权访问该 VM 上 Windows Admin Center 的身份。  
  
应用程序会验证包装令牌中的 URL 字段是否与请求的 Host 头部匹配。如前所述，当 WAC 启用时，该端口可通过 LAN 和外部 IP（如果已配置）访问。这使得攻击者可以使用服务器的 IP 地址（放在 URL 字段中）来伪造一个有效的包装 PoP 令牌，从而绕过预期的网关 DNS，直接访问服务。  
  
如果机器有外部 IP 地址，JIT (Just-In-Time) 机制将允许外部连接直接访问该机器的 IP 地址：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQg5LNMlVz0IViaPPwTZhBVjfyHzRSApNJXnvWUDbkzzmEvurp60lCJ7w/640?from=appmsg "null")  
  
能够直接访问机器的 WAC API 端口，再加上 PoP 令牌中的 URL 属性并未强制使用网关 DNS，这两点使得攻击者能够在**无需发现 DNS 地址**  
的情况下，伪造一个有效的 PoP 令牌包装器。  
  
综上所述，此漏洞源于两个关键的实现缺陷：  
1. 1. **Windows Admin Center 服务器未正确验证提供的令牌**  
。它未能强制实施 PoP 令牌与 WAC.CheckAccess  
 令牌用户身份 (UPN) 之间的绑定，允许在 URL 字段中使用非网关 DNS 值，并接受重复使用的随机数和任意 HTTP 方法。这使得攻击者能够将一个窃取的有效 WAC.CheckAccess  
 令牌与一个完全不同的用户的伪造 PoP 令牌组合使用，从而有效绕过身份检查并提升权限。  
  
1. 2. **Just-In-Time (JIT) 访问配置通过临时 NSG 规则将 WAC API 端口 (6516) 向所有源 IP 开放**  
，而不仅仅是 Azure 门户生成的网关 DNS。这使得可以直接访问 WAC 实例，从而在无需知晓网关 DNS 的情况下，使令牌伪造和重用成为可能。  
  
这些缺陷叠加在一起，使得对一台 WAC 管理的机器拥有本地管理员访问权限的攻击者能够：冒充 WAC 服务，劫持连接管理员的有效 WAC.CheckAccess  
 令牌，并利用它来冒充连接用户，从而有效提升权限，并在整个租户内横向移动，获得对连接用户有权访问的**任何其他已启用 WAC 的机器**  
的远程代码执行权限。  
## 五、利用示例  
### 5.1 先决条件  
1. 1. 攻击者在一台安装了 WAC 的虚拟机（或 Arc 连接机器）内拥有本地管理员权限（例如，利用前一章的 LPE 漏洞或其他任何方法）。  
  
1. 2. 一位管理用户通过 Azure 门户中的 Windows Admin Center 功能连接到该机器。  
  
### 5.2 步骤  
  
**步骤 1**  
：作为准备工作并为了有效冒充服务，攻击者从机器的证书存储中转储 WAC API 服务器的证书：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ35etfJV6ecaA7sYpgXPccjnjW8ibm19OLpkDcYrsFBxh2SCGWG3yNbg/640?from=appmsg "null")  
  
**步骤 2**  
：攻击者停止 Windows Admin Center 服务，并使用转储的证书运行一个冒充合法 API 的恶意应用程序服务器。  
  
**步骤 3**  
：当特权用户通过 Azure 门户的 Windows Admin Center 访问该机器时，被入侵的（恶意）服务器可以模拟服务器端的合法连接流程，最终作为 Azure SSO 过程的一部分，接收到一个已认证的请求。  
  
连接用户的 WAC.CheckAccess  
 令牌（该令牌未进行 PoP 绑定）随后可以被窃取：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQnvFWCDDxkDMticzwYVGo80R1Ev0wawic1yxtFe6RqAfpq75KfEZGSeFA/640?from=appmsg "null")  
  
该令牌具有 WAC.CheckAccess  
 作用域，并包含一个管理员用户的 UPN：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQlichNG3XcfdkIrbP4PP1VYwrrcRSG9wgogvNVJpHnY9wb9M63pe6WZA/640?from=appmsg "null")  
  
在流程中接收到的另一个令牌（PoP 令牌），或从机器可访问的实例元数据，可以泄露额外的上下文信息，例如与目标虚拟机关联的订阅 ID 和资源组：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQdiamFtgZxOAUQ3uCibZEd4sM7Jicy4LEPU5flrByT696ibZGLNxvicaOvuQ/640?from=appmsg "null")  
  
攻击者现在可以通过利用网络或基于云的枚举技术，将租户内的另一台 WAC 管理的机器作为目标。在示例场景中，攻击者识别出另一台由 WAC 控制的虚拟机，并成功枚举了其主机名，为攻击的下一阶段铺平了道路（此步骤可能因组织的基础设施而异）：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ5h3OsOaCT4CFPXPSAYmQ8q3icMoLAUibo22o94Sy7813QVktDlRhClDA/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQBxCDWyLcIA1ANe6vfbe0by9M1Z9REyGBTdZUWIa3bGjoibmETkTAsYQ/640?from=appmsg "null")  
  
**步骤 4**  
：攻击者开始伪造 PoP 令牌。这可以通过利用**一个攻击者控制的租户**  
来实现：攻击者在该租户内创建一个用户并提取刷新令牌，然后该令牌可用于获取面向 sso.portal.waconazure.com  
 受众的访问令牌。由于 PoP 令牌内的许多字段（包括 PoP 访问令牌本身）都未经过验证，因此**即使该令牌源自不同的租户也会被接受**  
。该令牌随后被用于未授权请求链中：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQnE5VJX4fQJtv5d6s0NhZdtHbhcfRmMiaUd5FKgcdXaOgecpXibKvzM0Q/640?from=appmsg "null")  
  
**步骤 5**  
：攻击者接着生成一个密钥对，模仿合法浏览器会话的行为：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQMicWzDUnHvIN0xmooVTMYzpaZGbeQETpibRViceOAia3sdUncAvkgTxgJw/640?from=appmsg "null")  
  
接下来，攻击者计算对应的密钥 ID (KID)，并使用之前从**攻击者控制的租户**  
获得的刷新令牌来请求一个绑定到所生成密钥的访问令牌。这样就产生了一个与攻击者自己的密钥 ID 加密绑定的 PoP 绑定令牌，使攻击者能够在下一阶段发起伪造请求：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQWNHROcxAnmMrEHmJIibYvbfxNrjcUfXuIIT3hfMUWQcHia3YibkhNVzCw/640?from=appmsg "null")  
  
**步骤 6**  
：攻击者伪造一个虚假的 PoP 令牌，其中插入以下属性：  
1. 1. 一个虚假用户（在受害者租户中不存在）接收到的访问令牌，且该令牌源自攻击者控制的租户。  
  
1. 2. 当前时间戳。  
  
1. 3. 新目标机器的资源 ID（被盗访问令牌的用户有权通过 WAC 管理的任意租户内机器，均适用）。  
  
1. 4. URL 属性应与host头相同（本例中为：20.46.269.55  
）。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQicXD8QFMpEH2S8wKoBJqxHCib6QaicFwicD67MaLSG0gdGY1icxDJcAElgg/640?from=appmsg "null")  
  
**步骤 7**  
：攻击者将伪造的 PoP 令牌与合法窃取的 WAC.CheckAccess  
 访问令牌组合起来，发送一个 InvokeCommand  
 API 请求，从而在目标机器上实现具有本地管理员权限的远程命令执行：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQUU6GTicXI4AEyFQ5G59icd8NbbpgI7w6Rqlbplu9icxSQVWAc0eSYLALA/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQoJcWJpBEUH4ic2rzJHopo5pcXUVOO7ica7dIwcQRpjQiclibSrF9bUp78g/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQjMQRyNn1C5AF9M0bev9RvhdUicXiavwmIQSMDj64qN391chf5k3buQOA/640?from=appmsg "null")  
  
攻击者现在可以滥用被盗访问令牌的权限，访问该用户拥有 WAC 权限的任何机器。从每台新攻陷的机器上，攻击者可以重复该攻击，继续滥用其他管理用户的权限，从而在整个环境中扩大访问范围。  
  
此外，由于伪造的请求源自一个与受害者租户中不存在的用户绑定的访问令牌，这可能会显著降低可追溯性，并使检测工作复杂化，从而使攻击者以较低的被识别风险进行操作。  
  
这使得攻击者能够实现：  
- • 在 WAC 管理的机器间横向移动  
  
- • 通过冒充管理用户实现权限提升  
  
- • 从被攻陷的机器上窃取附加的托管身份凭据  
  
- • 访问敏感系统和服务（包括受基于身份的控制措施保护的那些）  
  
- • 跨界攻击，允许攻击者通过串联被冒充的特权用户访问权限，突破孤立范围（如单个 VM、资源组甚至订阅）  
  
- • 阻碍检测能力  
  
## 六、WAC 基于身份的攻击发现  
  
为了加强对针对 WAC 攻击的防护，防御者应注意恶意活动可能不易被察觉。通过 Windows Admin Center 执行的操作通常类似于合法的管理行为：频繁执行脚本、大量使用 InvokeCommand  
 API 以及受信任的执行上下文（Windows Admin Center 应用程序），这些都可能降低安全控制的审查力度。  
### 6.1 检测 CVE-2026-20965 漏洞利用的迹象  
  
   
  
一个关键的入侵迹象是，除了 WAC_  
 前缀外，还会使用认证身份的 **UPN 格式**  
 创建 **虚拟账户和对应的用户配置文件目录**  
，例如：WAC_benzamir@<tenant>.onmicrosoft.com  
。如果存在与**未知或外部租户域**  
关联的虚拟账户，则可能表明存在通过 WAC 进行的未授权访问和命令执行。   
  
**KQL：检测可疑的虚拟账户使用**  
```
DeviceLogonEvents | where Timestamp > ago(30d) | where AccountName has "@" | where not(AccountName has "<your tenant address>") | project Timestamp, DeviceName, AccountName, ActionType, LogonType | order by Timestamp desc 
```  
### 6.2 检测未授权或异常的 WAC 活动  
  
由于 WAC 会生成上述身份凭证工件，监控虚拟账户活动也可以发现相对于正常组织工作流的**异常管理行为**  
。例如：  
- • 身份认证到其通常不管理的系统  
  
- • 由之前从未访问过目标系统，或不具备所需管理权限的身份，执行管理操作  
  
这些检测应被视为**基于身份的异常**  
，并与管理意图、范围和历史使用情况相关联，以减少误报并突出潜在的滥用行为。  
## 七、WAC 中令牌验证不当的影响  
  
此项研究展示了不当的令牌验证如何使本地用户能够转换为云身份，从而导致云级别的权限提升并破坏 Azure 的隔离保障。通过利用此弱点，攻击者可以跨越逻辑云边界，访问位于不同资源组的 Azure 已启用 WAC 的虚拟机或 Arc 连接设备，从而有效绕过组织的分段控制。实际上，这允许在不同环境（例如从测试环境提升到生产环境）之间横向移动。  
  
Cymulate 通过持续调查新出现的风险和最新发现的弱点，然后将这些知识转化为清晰的验证和真实的模拟，以此来支持客户。这使得安全团队能够了解其当前的安全状况，在需要时予以加强，并确认其环境仍受到保护。  
  
在下一章中，我们将研究一个允许未经身份验证的对手通过利用一系列漏洞获得远程代码执行能力的弱点。早期的发现已经展示了攻击者在拥有本地管理员访问权限、低权限用户权限甚至能够跨租户冒充虚拟机的情况下可以走多远。我们将更进一步，展示一个完整的攻击链。  
## 八、Cymulate Exposure Validation 如何测试 CVE-2026-20965 的可利用性  
  
2026年1月14日，我们在 Cymulate Exposure Validation 中引入了一个新的攻击场景，该场景执行订阅范围的扫描，以快速识别实际存在漏洞的运行中机器。  
  
虽然扫描涵盖整个 Azure 订阅，但**风险暴露程度是按每台 VM 确定的**  
，因为只有安装了受影响的 Windows Admin Center 扩展的机器才会受到影响。  
  
Cymulate 客户可以通过运行场景 “Azure – 扫描 Azure Windows Admin Center 令牌验证不当漏洞 (CVE-2026-20965)” 来验证其是否受此 CVE 影响。该场景能快速区分**易受攻击与非易受攻击的设备**  
，从而使团队能够在真正关键的地方优先进行修复。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQ3ic9JUfywRL8Nay7VFtiaZ0tPqSKsXtkfxELYUEYiaRytdhkTQDhXIOJw/640?from=appmsg "null")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQDorJXSpwon0PzmhtpBTe52ibc34mGXl5bfwBkkmhn9D9UCTYkSGUknA/640?from=appmsg "null")  
#### 引用链接  
  
[1]  
 《CVE-2026-20965: Cymulate Research Labs Discovers Token Validation Flaw that Leads to Tenant-Wide RCE in Azure Windows Admin Center》: https://cymulate.com/blog/cve-2026-20965-azure-windows-admin-center-tenant-wide-rce/  
[2]  
 本地特权提升: https://cymulate.com/blog/cve-2025-64669-windows-admin-center/  
[3]  
 证明验证不当: https://cymulate.com/blog/improper-attestation-validation-windows-admin-center/  
  
   
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQmxyKn5K5iaoicneo6AeolKtqFELBOnmvMLhwdibBDLBKsoAK9XVJmLBEg/640?wx_fmt=gif&from=appmsg "")  
  
  
  
**交流群**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/d7OsfYudM4bIRwkkEmouqvgEol7BkXrQJH7oybackjFVKYtmbrhicE6V505KU56vjwA3j6FKuCvRLAuTaqjzCKQ/640?wx_fmt=png&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
