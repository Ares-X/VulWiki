---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Administrator Protection 安全边界绕过漏洞分析"
product: "Windows11 Administrator Protection / UAC"
record_type: "analysis"
document_type: "安全边界研究译文"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Windows11 25H2预览阶段功能启用；受限管理员关联shadow账户；竞争抢先device map创建；KB5067036修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/Administrator%20Protection%20%E5%AE%89%E5%85%A8%E8%BE%B9%E7%95%8C%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-01bf7d4a68ffee8ce23f75b4"
entity_id: "ve-01bf7d4a68ffee8ce23f75b4"
schema_version: "1"
---

# Administrator Protection 安全边界绕过漏洞分析

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows11 Administrator Protection / UAC
- 文献类型：安全边界研究译文
- 版本、权限及部署边界：Windows11 25H2预览阶段功能启用；受限管理员关联shadow账户；竞争抢先device map创建；KB5067036修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 九种发现为背景，本文只详解其中一种无CVE绕过，应单独实体关联系列，不编造九条复现
2. UAC传统绕过与Administrator Protection安全边界区别明确，保留登录会话/令牌条件而非泛称所有低权用户提权
3. 原PZ链接路径/日期形式疑需核对，问题跟踪器/视频/安全策略等多数链接仅纯文本已丢失
4. 伪C声明PUNICODE_STRING后取地址与函数用法不一致，应明确近似伪代码；完整PoC链接未实际保留
5. 功能暂禁用为截至2025-12-01状态，译文2026-02发布不可当现状；缺确切OSbuild/KB前后测试矩阵
6. 作者所有问题已修复应归作者报告，不等本次验证；保留修复无安全公告的说明

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://projectzero.google/2026/26/windows-administrator-protection.html>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

James Forshaw
                    James Forshaw  securitainment   2026-02-09 13:31  
  
<table><thead><tr style="border-top-width: 1px;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><th style="font-weight: bold;border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">原文链接</span></section></th><th style="font-weight: bold;border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">作者</span></section></th></tr></thead><tbody><tr style="border-top-width: 1px;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">https://projectzero.google/2026/26/windows-administrator-protection.html</span></section></td><td style="border: 1px solid rgb(204, 204, 204);text-align: left;margin: 0px;padding: 6px 13px;"><section><span leaf="">James Forshaw</span></section></td></tr></tbody></table>  
Windows 11 最新版本 25H2 推出了重要的新功能 Administrator Protection。该功能旨在取代用户账户控制（User Account Control, UAC），为系统建立一个更加稳健、可防御的安全边界，从而让本地用户仅在真正需要时才能获取管理员权限。  
  
本文首先概述该功能的工作原理及其与 UAC 的区别，然后描述我在 Windows 11 预览版阶段进行的安全研究。最后，我将详细介绍所发现的九个漏洞之一——通过该漏洞可以静默获取完整的管理员权限。我向 Microsoft 报告的所有问题都已得到修复，部分漏洞通过可选更新 KB5067036 在功能正式发布前修复，其余的则通过安全公告发布修复方案。  
  
注：截至 2025 年 12 月 1 日，Microsoft 已暂时禁用 Administrator Protection 功能，以处理应用程序兼容性问题。该问题很可能与本文描述的内容无关，因此分析结论保持不变。  
## Administrator Protection 试图解决的问题  
  
UAC 在 Windows Vista 时期推出，用于为用户临时授予管理员权限，同时让大多数进程以受限权限运行。然而，由于设计上的缺陷，人们很快便发现它并不是一道严格的安全边界，因此 Microsoft 将其降级为仅是一项安全功能。这一转变意义重大，因为它意味着修复允许受限进程静默获取管理员权限的 UAC 绕过漏洞不再是首要优先事项。  
  
UAC 设计上的根本问题在于，受限用户和管理员用户实际上是同一个账户，只是组集合和权限不同。这意味着他们共享用户文件夹和 注册表配置单元 等配置资源。此外，还可以打开并 模拟 管理员进程的访问令牌来获得管理员权限，因为模拟权限检查最初并未考虑访问令牌是否已经"提升"，而只关注用户身份和完整性级别。  
  
尽管如此，要在 Vista 上无声地获取管理员权限仍然并不容易，因为大多数途径都会向用户显示提示。不幸的是，Microsoft 决定减少用户在修改系统配置时看到的提升提示数量，于是在 Windows 7 中引入了"自动提升"机制。某些特定的 Microsoft 二进制文件可以被设置为自动提升。然而，这也意味着在某些情况下，这些二进制文件可以被利用来无声地获取管理员权限。UAC 虽然可以配置为始终显示提示，但默认设置（极少有人修改）允许自动提升。  
  
UACMe 工具很好地汇总了已知的绕过技术，目前列出了 81 种获取管理员权限的不同方法。这些无法无天技术中的一些已通过操作系统的主要更新得到修复，尽管 Microsoft 从未正式承认何时修复了 UAC 绕过漏洞。然而，仍然存在某些无声绕过，它们对最新版本的 Windows 11 仍然有效，且尚未得到修复。  
  
恶意软件经常使用已知的绕过技术来获取管理员权限，这正是 Administrator Protection 旨在解决的问题。如果能化解 UAC 的弱点，就可以将其建立成一道安全边界——这不仅需要付出更多工作才能突破，而且实现中的任何漏洞都可以作为安全问题来修复。  
  
事实上，UAC 已经支持一种更安全的机制，它不受所谓"管理员批准"提升带来的许多问题的困扰。当用户不是管理员组成员时，系统就会使用这种机制，称为"肩后"提升。该机制要求用户知道本地管理员的凭据，并必须在 UAC 提升提示中输入这些凭据。它比管理员批准提升更安全，原因如下：  
- 配置数据不再被共享，这防止了受限用户修改可能被提升的管理员进程使用的文件或注册表键。  
  
- 无法再获取管理员用户的访问令牌并进行模拟，因为受限用户无法模拟其他用户账户。  
  
- Microsoft 二进制文件不支持自动提升，所有提升请求都必须通过提示确认。  
  
遗憾的是，该机制在实践中难以安全使用，因为共享另一个本地管理员账户的凭据会带来很大风险。因此，它主要适用于技术支持场景，即系统管理员在用户肩后输入凭据。  
  
Administrator Protection 通过使用由 UAC 服务自动配置的独立影子管理员账户来改进"肩后"提升。它具备"肩后"提升的所有优势，再加上以下特性：  
- 用户无需知道影子管理员的凭据，因为根本不存在。相反，UAC 可以配置为提示输入受限用户的凭据，包括按需使用生物识别。  
  
- 不需要单独的本地管理员账户，只需将用户配置为管理员组成员即可，更易于部署。  
  
虽然 Microsoft 将 Administrator Protection 称为一项独立功能，但它实际上可以被视为第三种 UAC 机制，因为它使用相同的基础设施和代码来执行提升，只是做了一些调整。然而，该功能取代了管理员批准模式，因此无法同时使用"传统"模式和 Administrator Protection。如果想启用它，目前虽然没有图形界面，但可以 修改本地安全策略 来实现。  
  
关键问题是，这会使 UAC 成为一个可安全化的边界，从而使恶意软件不再畅行无阻吗？我想我们最好一探究竟。  
## 研究 Administrator Protection  
  
我通常倾向于避免在 Windows 新功能发布前对其进行研究。过去这样做是不划算的——在预览版阶段发现的安全问题常常是由临时代码导致的，最终被移除。另外，如果在预览版阶段修复了安全问题，不会发布安全公告，这使得追踪修复时间变得困难。因此，在功能正式发布前进行研究的动力很小，只有到那时我才能确信发现的缺陷是真正的安全问题，并能得到及时修复。  
  
这次情况有些不同。Microsoft 主动联系我，询问我是否愿意在预览版阶段帮助发现实现中的问题。他们联系我的部分原因无疑是我过去发现复杂的 UAC 逻辑绕过漏洞的经历。另外，我已经粗略查看过该功能，并注意到它仍然容易受到一些公开的、众所周知的绕过漏洞的影响，比如我对 Kerberos 环回的滥用。  
  
我同意查看设计文档并提供反馈，而不进行完整的"渗透测试"。然而，如果我确实发现了问题，考虑到 Administrator Protection 的目标是成为一个可安全化的边界，我得到保证这些问题将通过安全公告修复，或至少在功能最终发布前得到修复。  
  
Microsoft 的文档提供了概述，但并非所有设计细节。例如，我确实有一个关于开发人员认为安全边界是什么的问题。鉴于移除了自动提升，我假设绕过边界将需要以下一项或多项条件：  
- 破坏影子管理员的配置，例如写入任意文件或注册表键。  
  
- 劫持以影子管理员身份运行的现有进程。  
  
- 在不显示提示的情况下让进程以管理员身份执行。  
  
提示作为安全边界非常重要。许多 UAC 绕过技术，例如依赖提升的 COM 对象的技术，在 Administrator Protection 中仍然有效。然而，由于不再允许自动提升，这些技术总会显示提示，因此不被视为绕过。当然，提示中显示的内容（如被提升的可执行文件）不一定与即将使用管理员权限执行的操作相关。  
  
文档中对某些相关的 UAC 功能（如 UI Access 进程，这将在本系列第 2 部分讨论）缺乏深入讨论，但即便如此，某些描述还是引起了我的注意。因此，我决定至少查看一下 Canary 版预览分支中的当前实现。这项研究混合了对 appinfo.dll  
中 UAC 服务代码的逆向工程以及行为分析。  
  
研究结束时，我发现了 9 种 绕过该功能并静默获取管理员权限的方法。其中一些绕过是长期存在的 UAC 问题，已有公开的概念验证存在。另一些是由于该功能本身的实现缺陷。但最有趣的漏洞类别是那些根本不存在缺陷的——直到操作系统的其他部分介入后才产生问题的漏洞。  
  
让我们深入研究我在研究过程中发现的最有趣的绕过。如果想跳过前面部分，可以在 问题跟踪器 上阅读完整详情。这个问题很有趣，不仅因为它允许我绕过保护，还因为它是一个我多年前就知道的潜在 UAC 绕过漏洞，但只有在该功能推出后才变得实际可利用。  
## 登录会话  
  
首先介绍一些背景知识以理解该漏洞。当用户成功向 Windows 系统认证时，会被分配一个唯一的 登录会话。该会话用来控制与该用户相关的信息，例如它保留用户凭据的副本以便用于网络认证。  
  
登录会话作为引用被添加到登录过程中创建的访问令牌中，以便在使用该令牌的任何内核操作期间可以轻松引用。您可以通过使用 NtQueryInformationToken  
系统调用查询令牌来找到会话的唯一 64 位认证 ID。在 UAC 中，受限和已链接的管理员访问令牌被分配了单独的登录会话，如以下脚本所示，您可以看到受限令牌和已链接令牌具有不同的认证 ID LUID 值：  
```
# 获取当前令牌的认证 ID
PS> Get-NtTokenId -Authentication
LUID
----
00000000-11457F17

# 查询已链接的管理员令牌并获取其认证 ID。
PS> $t = Get-NtToken -Linked
PS> Get-NtTokenId -Authentication -Token $t
LUID
----
00000000-11457E9E
```  
  
内核引用登录会话的一个重要场景是查找 DOS 驱动器号。从内核的角度看，驱动器号存储在一个特殊的对象目录 \??  
中。当内核查找此路径时，它会首先检查是否存在特定于登录会话的目录需要检查，该目录存储在路径 \Sessions\0\DosDevices\X-Y  
下，其中 X-Y 是登录会话认证 ID 的十六进制表示。如果驱动器号符号链接在该目录中未找到，内核会回退检查 \GLOBAL??  
目录。您可以通过使用 NtOpenDirectoryObject  
系统调用打开 \??  
对象目录来观察此行为：  
```
PS> $d = Get-NtDirectory "\??"
PS> $d.FullPath
\Sessions\0\DosDevices\00000000-11457f17
```  
  
众所周知，如果您可以向 DOS 设备对象目录写入符号链接，就可以劫持该登录会话中以该访问令牌运行的任何进程的 C:  
驱动器。即使 C:  
驱动器在全局对象目录中定义，特定于会话的目录也会被优先检查，因此可以被覆盖。  
  
如果用户可以向另一个登录会话的 DOS 设备对象目录写入符号链接，他们就可以将任何文件访问重定向到系统驱动器。例如，您可以重定向系统 DLL 加载以强制在与该登录会话中运行的进程的上下文中执行任意代码。在 UAC 的情况下，这不是问题，因为单独的 DOS 设备对象目录具有不同的访问控制，因此受限用户无法劫持管理员进程的 C:  
驱动器。管理员 DOS 设备对象目录的访问控制如下所示：  
```
PS> Get-NtTokenSid
Name Sid
---- ---
DOMAIN\user S-1-5-21-5242245-89012345-3239842-1001

PS> $d = Get-NtDirectory "\??"
PS> Format-NtSecurityDescriptor $d -Summary
<Owner> : BUILTIN\Administrators
<Group> : DOMAIN\Domain Users
<DACL>
NT AUTHORITY\SYSTEM: (Allowed)(ObjectInherit, ContainerInherit)(Full Access)
BUILTIN\Administrators: (Allowed)(ObjectInherit, ContainerInherit)(Full Access)
BUILTIN\Administrators: (Allowed)(None)(Full Access)
CREATOR OWNER: (Allowed)(ObjectInherit, ContainerInherit, InheritOnly)(GenericAll)
```  
## 创建 DOS 设备对象目录  
  
您可能会问，谁创建了这个 DOS 设备对象目录？答案是内核在首次访问该目录时会按需创建它。创建代码在 SeGetTokenDeviceMap  
中，大致如下所示：  
```
NTSTATUS SeGetTokenDeviceMap(PTOKEN Token, PDEVICE_MAP *ppDeviceMap) {
 *ppDeviceMap = Token->LogonSession->pDeviceMap;
 if (*ppDeviceMap) {
 return STATUS_SUCCESS;
 }
 WCHAR path[64];
 swprintf_s(
 path,
 64,
 L"\\Sessions\\0\\DosDevices\\%08x-%08x",
 Token->AuthenticationId.HighPart,
 Token->AuthenticationId.LowPart);
 PUNICODE_STRING PathString;
 RtlInitUnicodeString(&PathString, path);
 OBJECT_ATTRIBUTES ObjectAttributes;
 InitializeObjectAttributes(&ObjectAttributes,
 &PathString,
 OBJ_CASE_INSENSITIVE |
 OBJ_OPENIF |
 OBJ_KERNEL_HANDLE |
 OBJ_PERMANENT, 0, NULL);
 HANDLE Handle;
 NTSTATUS status = ZwCreateDirectoryObject(&Handle,
 0xF000F,
 &ObjectAttributes);
 if (NT_ERROR(status)) {
 return status;
 }
 status = ObpSetDeviceMap(Token->LogonSession, Handle);
 if (NT_ERROR(status)) {
 return status;
 }
 *ppDeviceMap = Token->LogonSession->pDeviceMap;
 return STATUS_SUCCESS;
}
```  
  
您可能会注意到，对象目录是使用 ZwCreateDirectoryObject  
系统调用创建的。在内核中使用 Zw  
系统调用的一个重要安全细节是，它会禁用安全访问检查，除非在 OBJECT_ATTRIBUTES  
中设置了可选的 OBJ_FORCE_ACCESS_CHECK  
标志，而此处并未设置。  
  
绕过访问检查是此代码正常运行所必需的；让我们看看 \Sessions\0\DosDevices  
目录的访问控制。  
```
PS> Format-NtSecurityDescriptor -Path \Sessions\0\DosDevices -Summary
<Owner> : BUILTIN\Administrators
<Group> : NT AUTHORITY\SYSTEM
<DACL>
NT AUTHORITY\SYSTEM: (Allowed)(ObjectInherit, ContainerInherit)(Full Access)
BUILTIN\Administrators: (Allowed)(ObjectInherit, ContainerInherit)(Full Access)
CREATOR OWNER: (Allowed)(ObjectInherit, ContainerInherit, InheritOnly)(GenericAll)
```  
  
非管理员用户无法向该目录写入，但由于此代码是在用户的安全上下文中调用的，因此需要禁用访问检查来创建目录，因为它无法确定用户是否是管理员。重要的是，该目录的访问控制对特殊的 CREATOR OWNER  
组有一条可继承的规则，授予完全访问权限。这会在对象创建期间自动替换为所用访问令牌的分配所有者。  
  
因此，即使访问检查已被禁用，最终创建的目录仍可由调用者访问。这解释了 UAC 管理员 DOS 设备对象目录如何阻止受限用户的访问。管理员令牌的创建将本地管理员组设置为其所有者，因此 CREATOR OWNER  
被替换为该组。然而，受限用户只能将自己的 SID 设置为所有者，因此只授予对用户本身的访问权限。  
  
这有什么用？我很久以前就注意到，这种行为是一种潜在的 UAC 绕过，实际上它是一种潜在的权限提升（Elevation of Privilege, EoP），但最可能的结果还是 UAC 绕过。具体来说，可以通过使用 TokenLinkedToken  
信息类调用 NtQueryInformationToken  
来获取管理员用户的访问令牌句柄。出于安全原因，此令牌被限制为 SecurityIdentification  
模拟级别，因此无法用于授予对任何资源的访问权限。  
  
然而，如果您模拟该令牌并打开 \??  
目录，内核将使用识别令牌调用 SeGetTokenDeviceMap  
，如果目录尚未创建，它将使用 ZwCreateDirectoryObject  
创建 DOS 设备对象目录。由于访问检查被禁用，创建仍会成功，但一旦创建完成，内核将对目录本身进行访问检查，并且会因正在模拟识别令牌而失败。  
  
这看起来似乎没有多大用处，虽然目录被创建了，但它会使用来自识别令牌的所有者，即本地管理员组。但我们可以在模拟之前将令牌的所有者 SID 更改为用户的 SID，因为那是允许的操作。现在最终的 DOS 设备对象目录将由用户拥有并可以写入。由于 UAC 的管理员端只使用单个登录会话，因此任何提升的进程现在都可以被劫持其 C:  
目录。  
  
作为 UAC 绕过，这只有一个问题，我从未找到一个场景，让受限用户在创建任何管理员进程之前就获得代码执行。一旦进程被创建并运行，几乎可以肯定某些代码会打开文件并因此访问 \??  
目录。当受限用户获得控制权时，DOS 设备对象目录已经创建并分配了预期的访问控制。尽管如此，由于 UAC 不是安全边界，报告它毫无意义，所以我将这一行为存档以备日后可能相关时使用。  
## 绕过 Administrator Protection  
  
快进到今日，Administrator Protection 问世。出于兼容性原因，Microsoft 保留了对 NtQueryInformationToken  
使用 TokenLinkedToken  
信息类调用仍返回管理员令牌的识别句柄。但在此情况下，它是影子管理员的令牌，而不是用户的令牌的管理员版本。但一个关键的区别是，虽然对于 UAC 此令牌每次都是相同的，但在 Administrator Protection 中，内核会调用 LSA 并认证影子管理员的新实例。这导致从 TokenLinkedToken  
返回的每个令牌都具有唯一的登录会话，因此当前尚未创建 DOS 设备对象目录，如下所示：  
```
PS> $t = Get-NtToken -Linked
PS> $auth_id = Get-NtTokenId -Authentication -Token $t
PS> $auth_id
LUID
----
00000000-01C23BB3

PS> Get-NtDirectory "\Sessions\0\DosDevices\$auth_id"
Get-NtDirectory : (0xC0000034) - Object Name not found.
```  
  
虽然理论上我们现在可以强制创建 DOS 设备对象目录，但遗憾的是这对我们帮助不大。由于 UAC 服务也使用 TokenLinkedToken  
来获取用于创建新进程的令牌，这意味着每个当前运行或将来运行的管理员进程都不共享登录会话，因此不共享相同的 DOS 设备对象目录，我们无法使用我们在自己进程中查询的令牌来劫持它们的 C:  
驱动器。  
  
要利用这一点，我们需要使用实际运行进程的令牌。这是可能的，因为创建提升的进程时可以将其启动为挂起状态。有了这个挂起进程，我们可以打开进程令牌进行读取，将其复制为识别令牌，然后在模拟它时创建 DOS 设备对象目录。然后可以恢复该进程，使其 C:  
驱动器被劫持。  
  
作为绕过，这只有两个问题：首先，创建挂起的提升进程需要点击通过提升提示。对于具有自动提升的 UAC，这不是问题，但对于 Administrator Protection，它总会提示，而显示提示不被视为跨越安全边界。有办法绕过这一点，例如 UAC 服务公开了 RAiProcessRunOnce  
API，它会静默运行提升的二进制文件。唯一的问题是进程不是挂起的，因此您必须在进程中的任何代码运行之前赢得竞争条件来打开进程并执行绕过。这应该是可以做到的，比如通过调整线程优先级来阻止新进程主线程的调度。  
  
第二个问题似乎更具决定性。设置访问令牌的所有者时，只允许设置令牌的 user SID 或设置了 SE_GROUP_OWNER  
标志的成员组。唯一具有所有者标志的组是本地管理员组，当然影子管理员的 SID 与受限用户的不同。因此，将这两个 SID 中的任何一个设置为所有者都对我们访问创建后的目录没有帮助。  
  
事实证明这不是问题，因为我并没有说出所有者分配过程的全部真相。为新对象构建访问控制时，如果线程在识别级别模拟令牌，内核不会信任模拟令牌。这是出于良好的安全原因，识别令牌本不应用于做出访问控制决策，因此在创建对象时分配其所有者没有意义。相反，内核使用进程的主令牌来做出该决策，因此分配的所有者是受限用户的 SID。事实上，为 UAC 绕过设置所有者 SID 从来都不是必需的，它从未被使用。您可以通过创建无名称的对象来验证此行为，这样可以在模拟识别令牌时创建它，并检查分配的所有者 SID：  
```
PS> $t = Get-NtToken -Anonymous
# 模拟匿名令牌并创建目录
PS> $d = Invoke-NtToken $t { New-NtDirectory }
PS> $d.SecurityDescriptor.Owner.Sid.Name
NT AUTHORITY\ANONYMOUS LOGON
# 在识别级别模拟
PS> $d = Invoke-NtToken $t -ImpersonationLevel Identification {
 New-NtDirectory
}
PS> $d.SecurityDescriptor.Owner.Sid.Name
DOMAIN\user
```  
  
您可能会问的最后一个问题是，为什么使用影子管理员令牌创建进程最终不会以该用户身份访问某个 DOS 驱动器的文件资源，从而导致 DOS 设备对象目录被创建？CreateProcessAsUser  
API 的实现会在调用者的安全上下文中运行其所有代码，无论分配了什么访问令牌，因此默认情况下它永远不会在新登录会话下打开文件。  
  
然而，如果您了解如何在系统服务中安全地创建进程，您可能会认为应该在调用 CreateProcessAsUser  
时模拟新令牌，以确保不允许用户为其无法访问的可执行文件创建进程。UAC 服务正确地这样做了，因此它肯定已经访问了驱动器来创建进程，DOS 设备对象目录应该已经被创建了，为什么没有呢？  
  
颇具讽刺意味的是，发生的情况是 UAC 服务被一个最近引入的安全缓解措施所绊倒，该措施旨在防止在系统服务中模拟低特权用户时劫持 C:  
驱动器。如果系统调用的调用者是 SYSTEM  
用户并且它试图访问 C:  
驱动器，此缓解措施就会启动。这是 Microsoft 为响应清单文件解析中的多个漏洞而添加的，如果您想获得概述，可以观看我和 Maddie Stone 在 OffensiveCon 23 上做的 演讲视频，其中描述了一些攻击面。  
  
碰巧的是，UAC 服务以 SYSTEM  
身份运行，只要被提升的可执行文件在 C:  
驱动器上 ( 这很有可能 )，该缓解措施就会完全忽略被模拟令牌的 DOS 设备对象目录。因此 SeGetTokenDeviceMap  
从未被调用，所以登录会话下首次访问文件是在进程启动并运行之后。只要我们能在新进程触及文件之前执行漏洞利用，我们就可以创建 DOS 设备对象目录并重定向进程的 C:  
驱动器。  
  
总之，利用此绕过的步骤如下：  
1. 通过 RAiProcessRunOnce  
生成影子管理员进程，它将从 C:  
驱动器运行 runonce.exe  
。  
  
1. 在新进程访问文件资源之前打开它，并查询主令牌。  
  
1. 将令牌复制为识别令牌。  
  
1. 在模拟影子管理员令牌时强制创建 DOS 设备对象目录。这可以通过调用 NtOpenDirectoryObject  
打开 \??  
来完成。  
  
1. 在新的 DOS 设备目录中创建 C: 驱动器符号链接以劫持系统驱动器。  
  
1. 让进程恢复并等待重定向的 DLL 被加载。  
  
## 总结思考  
  
这个绕过很有趣，因为很难指出导致它的具体缺陷是什么。该漏洞是 5 个独立的操作系统行为共同作用的结果：  
- Administrator Protection 功能对 TokenLinkedToken  
查询的更改会为每个影子管理员令牌生成新的登录会话。  
  
- 每个令牌对应的 DOS 设备目录针对每个新登录会话进行延迟初始化，意味着当链接令牌首次创建时该目录尚不存在。  
  
- 内核在访问 DOS 设备目录时使用 Zw  
函数创建该目录，这会禁用访问检查。这允许受限用户在识别级别模拟影子管理员令牌并通过打开 \??  
来创建目录。  
  
- 如果线程在识别级别模拟令牌，任何安全描述符分配都会从主令牌而非模拟令牌获取所有者 SID。这导致受限用户被授予对影子管理员令牌 DOS 设备对象目录的完全访问权限。  
  
- 由于安全缓解措施在 SYSTEM  
进程中打开 C:  
驱动器时会禁用被模拟的 DOS 设备对象目录，因此低权限用户在获取进程令牌访问权时，DOS 设备对象目录尚未创建。  
  
我并不一定责怪 Microsoft 在测试期间没有发现这个问题。这是一个具有许多变动部件的复杂漏洞。很可能只有我发现了它，因为我知道创建 DOS 设备对象目录时的奇怪行为。  
  
Microsoft 实施的修复方案是阻止在识别级别模拟影子管理员令牌时创建 DOS 设备对象目录。由于此修复作为可选更新 KB5067036 的一部分添加到最终发布版本中，因此没有相关的安全公告。我要感谢 Administrator Protection 团队和 MSRC 对所有问题的快速响应，并证明该功能将被认真对待作为一个安全边界。我还要感谢他们提供设计文档等额外信息，这对研究工作很有帮助。  
  
至于我对 Administrator Protection 作为一个功能的看法，我觉得 Microsoft 本可以更大胆一些。对 UAC 进行小的调整导致了近 20 年未修复的绕过漏洞被带入该功能，表现为安全漏洞。我更希望看到的是更具可配置性和可控性的东西，也许是类似 sudo 或 Linux capabilities 的适当版本，让用户可以被授予特定任务的特定额外访问权限。  
  
我想应用程序兼容性最终是这里的问题所在，Windows 并非为如此激进的改变而设计。我还希望这作为一个独立的可配置模式，而不是完全取代管理员批准。这样系统管理员可以选择人们何时选择加入新模型，而不是要求每个人都使用它。  
  
我确信如果默认启用，它比管理员批准 UAC 提高了安全性。它呈现了一个更重要的安全边界，除非发现更严重的设计问题，否则应该是可防御的。我预计恶意软件仍然能够获取管理员权限，即使那只是通过强迫用户接受提升提示，但它们可能使用的任何静默绕过都应该得到修复，这将是对当前情况的重大改进。无论如何，使用 Windows 最安全的方式是永远不以管理员身份运行，使用任何版本的 UAC 都是如此。理想情况下，首先避免让恶意软件进入您的机器。  
  
---  
> 免责声明：本博客文章仅用于教育和研究目的。提供的所有技术和代码示例旨在帮助防御者理解攻击手法并提高安全态势。请勿使用此信息访问或干扰您不拥有或没有明确测试权限的系统。未经授权的使用可能违反法律和道德准则。作者对因应用所讨论概念而导致的任何误用或损害不承担任何责任。      
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
