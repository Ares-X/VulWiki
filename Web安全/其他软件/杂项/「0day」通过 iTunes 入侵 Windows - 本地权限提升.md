---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-44193"
identifier_role: "primary"
primary_identifiers: "CVE-2024-44193"
referenced_identifiers: ""
identifier_status: "unknown"
title: "「0day」通过 iTunes 入侵 Windows - 本地权限提升"
product: "Apple Mobile Device Support/iTunes Windows"
record_type: "analysis"
document_type: "本地提权链技术分析"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "测试iTunes12.13.2.3；低权可写Lockdown并触发安装修复重启SYSTEM服务，junction/oplock+MSI回滚链"
side_effects: "非特权触发修复需安装模式/WindowsInstaller/UAC策略实证，管理员ProcessHacker重启不能单独证明低权可触发；官方Apple链接和ZDI/ProjectZero工具来源较充分，但缺修复版号、Windowsbuild、完整环境；破坏Config.MSI/覆盖HID需要恢复说明，截图未视检"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%8C0day%E3%80%8D%E9%80%9A%E8%BF%87%20iTunes%20%E5%85%A5%E4%BE%B5%20Windows%20-%20%E6%9C%AC%E5%9C%B0%E6%9D%83%E9%99%90%E6%8F%90%E5%8D%87.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-df05089a37e219440afe00b3"
entity_id: "ve-df05089a37e219440afe00b3"
schema_version: "1"
---

# 「0day」通过 iTunes 入侵 Windows - 本地权限提升

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Apple Mobile Device Support/iTunes Windows
- 文献类型：本地提权链技术分析
- 版本、权限及部署边界：测试iTunes12.13.2.3；低权可写Lockdown并触发安装修复重启SYSTEM服务，junction/oplock+MSI回滚链
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题0day与文称2024-09-12已修、发布10-08不符，应历史漏洞；实际服务为AppleMobileDeviceService不是Windows本体漏洞
2. 早段任意删除等于SYSTEM执行跳步，后段才有MSI回滚/HID.DLL完整补充，需明确链接而非同一原语
3. 不属于该路径所有文件删除措辞不准确，正常递归内部文件与链接越界区分；NTFSjunction非所有种类symlink等价
4. 非特权触发修复需安装模式/WindowsInstaller/UAC策略实证，管理员ProcessHacker重启不能单独证明低权可触发
5. 路径长度限制未查明、改工具常量属实验限制应保留；FolderOrFileDeletionToSystem拼名与工具不同、cmd单引号路径行为需Shell标注
6. 官方Apple链接和ZDI/ProjectZero工具来源较充分，但缺修复版号、Windowsbuild、完整环境；破坏Config.MSI/覆盖HID需要恢复说明，截图未视检

### 操作风险

非特权触发修复需安装模式/WindowsInstaller/UAC策略实证，管理员ProcessHacker重启不能单独证明低权可触发；官方Apple链接和ZDI/ProjectZero工具来源较充分，但缺修复版号、Windowsbuild、完整环境；破坏Config.MSI/覆盖HID需要恢复说明，截图未视检

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://support.apple.com/en-us/121328>
- 原文参考链接（未重新核验）：<https://learn.microsoft.com/en-us/sysinternals/>
- 原文参考链接（未重新核验）：<https://github.com/thezdi/PoC/tree/main/FilesystemEoPs>
- 原文参考链接（未重新核验）：<https://github.com/googleprojectzero/symboliclink-testing-tools/tree/main/SetOpLock>
- 原文参考链接（未重新核验）：<https://www.zerodayinitiative.com/blog/2022/3/16/abusing-arbitrary-file-deletes-to-escalate-privilege-and-other-great-tricks>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 7coinSec  7coinSec   2024-10-08 23:54  
  
## 免责声明  
> 本文章仅用于信息安全防御技术分享，  
请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关  
，请严格遵循法律法规。  
> 如有侵权，请在本公众号后台联系本公众号管理员进行处理。  
> 未经作者允许，严禁转载。如有转载：请在公众号下留言  
  
  
## CVE-2024-44193 简介  
  
iTunes 版本 12.13.2.3 安装了 Apple 设备发现服务：  
  
C:\Program Files\Common Files\Apple\Mobile Device Support\AppleMobileDeviceService.exe  
，该服务容易受到本地特权提升攻击。  
  
由于对   
C:\ProgramData\Apple\*  
 路径中的用户权限管理不善，因此启用了此漏洞。  
  
这允许本地组“用户”的成员在该路径中写入任意文件。当   
AppleMobileDeviceService.exe  
 服务重新启动时（可由非特权用户触发），可以启用任意文件夹/文件删除，以使用 SYSTEM 权限在系统上执行任意代码。  
  
Apple 于 2024 年 9 月 12 日对其进行了修补。  
  
  
  
Apple 安全公告链接：  
https://support.apple.com/en-us/121328  
  
## AppleMobileDeviceService.exe 简介  
  
iTunes 安装后，还会安装一个以 SYSTEM 权限运行的服务：  
AppleMobileDeviceService.exe  
。  
  
当我使用 Windows Sysinternals 进程监视器 (Procmon) 调查该服务时，发现了一些令人担忧的行为。  
  
该服务将递归遍历   
C:\ProgramData\Apple\Lockdown\*  
 路径中的所有文件，并删除不属于该路径的所有文件夹和文件。  
  
对于本地测试，使用 ProcessHacker2 强制重启该服务以检查程序行为。  
  
观察到的行为是，以 SYSTEM 身份运行的服务将查询目录及其中的所有子目录，然后它将运行启用了   
Delete On Close  
 选项的   
CreateFile  
 操作，这意味着 SYSTEM 服务将查询   
C:\ProgramData\Apple\Lockdown\*  
 路径并递归查询该目录中的子文件夹和文件并删除它们。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKbbbJiaTNO3Gg1Gciav8YJ6HoY75D5jILy4EQnicWzkTibna3Wqq5bzJ9ibA/640?wx_fmt=png&from=appmsg "")  
  
## 路径C:\ProgramData\Apple\ *中的用户权限有问题  
  
Windows Sysinternals   
  
https://learn.microsoft.com/en-us/sysinternals/   
accesschk64.exe 可用于检查特定文件夹的访问权限。  
  
本地组“用户”的成员在“C:\ProgramData\Apple\Lockdown\”文件夹中拥有写入权限，这使得低权限用户可以写入文件夹中的任意文件。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKlZ3Ih0vXkQd8TWyoxxo1YOW3InVUm6m7UxFPfwdiaEbVrpI7SImXYBA/640?wx_fmt=png&from=appmsg "")  
  
## 任意文件/文件夹删除  
  
因为我们可以在 Lockdown 路径中写入任意文件，并且 SYSTEM 进程将在服务重新启动时删除它们，所以可以实现任意文件/文件夹删除。  
  
为了说明这一点，在 Lockdown 文件夹中创建了两个子文件夹。  
  
子文件夹 a，以及子文件夹 a 内的子文件夹 b。  
  
这将如下所示：  
C:\ProgramData\Apple\Lockdown\a\b  
  
在子文件夹   
a  
 中有一个名为   
aa.txt  
 的文本文件，在子文件夹   
b  
 中有一个名为   
bb.txt  
 的文本文件  
  
C:\ProgramData\Apple\Lockdown\a\aa.txt  
  
C:\ProgramData\Apple\Lockdown\a\b\bb.txt  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKoykiclMRAQrhS5LhkdpskUXO9EhRibT42PLXutBfahSzaiaBDCnza6ia2A/640?wx_fmt=png&from=appmsg "")  
  
如上图所示，在 aa.txt 上运行“CreateFile”操作并使用“关闭时删除”选项将其删除。  
  
当 SYSTEM 进程在“aa.txt”和“bb.txt”上运行操作“CreateFile”时，在文件上运行选项“关闭时删除”，SYSTEM 进程“AppleMobileDeviceService.exe”将删除这些文件。  
  
现在我们可以在 Lockdown 文件夹中创建任意文件，然后删除它们，这将引出下一个巧妙的技巧。  
### NTFS 连接  
  
在 Windows 中，可以使用 NTFS 连接将文件夹定向到其他位置。在某种程度上，这类似于 Linux 中的符号链接。  
  
为了说明这一点，可以在   
C:\ProgramData\Apple\Lockdown  
 文件夹中创建一个指向桌面上文件夹的 NTFS 连接（符号链接）。  
  
您可以使用 PowerShell   
New-Item -Type Junction -Path whatever -Target "C:\Users\user\Desktop\AAyes"  
 自行实现此操作，或者只需使用 ZDI 提供的工具集：  
  
FilesystemEoPs：  
https://github.com/thezdi/PoC/tree/main/FilesystemEoPs  
  
运行以下命令将 Lockdown 文件夹中的 NTFS 连接指向桌面上的“目标”。  
  
```
.\FolderContentsDeleteToFolderDelete.exe /target "C:\Users\user\Desktop\AAyes" /initial "C:\ProgramData\Apple\Lockdown"
```  
  
  
  
当服务重新启动时，新创建的 NTFS 连接将指向位于桌面上的“AAyes”。  
  
由于服务以 SYSTEM 身份运行带有“Delete On Close”选项的“CreateFile”操作，因此文件将被删除。  
  
由于该操作以 SYSTEM 权限运行，因此我们实现任意文件夹或文件删除，这意味着我们可以以 SYSTEM 身份在主机上执行代码。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKEtoP9BODgJniamgmDgd3iayYX2icIKSRnicnQN3RslicXaI089sebAdlTmw/640?wx_fmt=png&from=appmsg "")  
  
**注意：**  
  
由于文件名/文件夹名称限制，必须在 FolderContentsDeleteToFolderDelete 项目中进行某些源代码编辑。文件名/文件夹名称必须非常短才能进行删除。这背后的原因尚不清楚，而且尚未调查，因为短名称以可靠的方式解决了这个问题。  
#### FolderContentsDeleteToFolderDelete 源代码编辑：  
```
const wchar_t folder2path[] = L"C:\\d";
const wchar_t exploitFileName[] = L"e.txt";

// 需要缩短两个常量：“folder2path”和“exploitFileName”
// 它们被改为：L"C:\\d" 和 L"e.txt"，因为文件和文件夹名称的长度似乎对漏洞利用功能有重大影响。

[...]

// 我们还需要将“folder1path”值编辑为 L”c”，以缩短它。
folder1path += L"c";
```  
### 漏洞利用论点  
  
由于该服务将递归跟踪任何连接点（符号链接），因此论点是，可以使用易受攻击的 Apple 服务（将跟踪 NTFS 连接点）以 SYSTEM 身份任意删除系统上的文件。由于易受攻击的服务允许非特权用户使用 Windows GUI 的（“应用程序 -> 已安装的应用程序 -> Apple 移动设备支持 -> 修改 -> 修复”）技巧重新启动服务，因此可以随意触发漏洞。服务重新启动后，它将遵循 NTFS 连接，并且确定的程序行为指示服务将删除用户选择指向的文件或文件夹。  
  
换句话说，用户决定服务将删除哪些文件或文件夹。  
  
由于它以 SYSTEM 身份运行，我们可以删除系统上的  
几乎  
任何文件（不是需要 TrustedInstaller 权限的文件）。  
  
这意味着我们可以精心设计一系列事件来执行以下操作：  
1. 准备 oplock 以在方便我们准备利用步骤的时间停止进程  
  
1. 重新启动服务，触发 oplock 并停止进程  
  
1. 使用 FolderOrFileDeleteToSystem.exe 准备我们的 MSI 回滚技巧  
  
1. 准备我们的 NTFS 连接以指向使用 FolderContentsDeleteToFolderDelete.exe 执行 MSI 回滚技巧步骤准备的 Config.MSI 文件删除原语  
  
1. 释放 oplock  
  
## 工具  
- Oplock  
  
SetOpLock：  
https://github.com/googleprojectzero/symboliclink-testing-tools/tree/main/SetOpLock  
  
Oplock 工具是一种在 Windows 中使用“机会锁”的工具。该工具允许我们通过锁定文件直到满足某些要求来“停止”进程，但它也可以用于“停止”进程以用于恶意目的，例如为我们的漏洞利用负载获得足够的运行时间。  
- FolderContentsDeleteToFolderDelete  
  
FilesystemEoPs：  
https://github.com/thezdi/PoC/tree/main/FilesystemEoPs  
  
FolderContentsDeleteToFolderDelete 工具的工作原理是自动创建一个包含文件的文件夹。然后在文件上设置 oplock 以停止该进程。当进程停止时，文件将移出文件夹。然后删除该文件夹，并将其重新创建为到目标目的地的 NTFS 连接点。  
  
当 oplock 被取消并且该过程继续时，文件/文件夹删除将遵循新创建的到目标目的地的 NTFS 连接点，并在继续执行之前删除该文件。  
- FolderOrFileDeleteToSystem  
  
FilesystemEoPs：  
https://github.com/thezdi/PoC/tree/main/FilesystemEoPs  
  
Zero Day Initiative 可能对此工具的解释最好，因此这里有一个直接来自他们的解释链接：  
  
滥用任意文件删除来提升权限和其他绝妙技巧(  
https://www.zerodayinitiative.com/blog/2022/3/16/abusing-arbitrary-file-deletes-to-escalate-privilege-and-other-great-tricks  
)  
## 漏洞验证  
  
漏洞验证包括 5 个步骤。  
1. 在 C:\ProgramData\Apple\Lockdown\ 上设置 Oplock  
  
```
.\SetOpLock.exe C:\ProgramData\Apple\Lockdown\
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKE0PAWjFVDeXPgCuhR5G95jBPgN9UWnCIzsibYDbWUXg6d6ySHKHtOXw/640?wx_fmt=png&from=appmsg "")  
1. 触发服务重启  
  
应用 -> 已安装的应用 -> Apple Mobile Device Support -> 修改 -> 修复  
  
1. 准备 MSI 回滚技巧  
  
```
.\FolderOrFileDeleteToSystem.exe
```  
1. 准备 Windows Junction（符号链接）步骤，将服务任意文件夹/文件删除原语指向 MSI 安装程序  
  
```
.\FolderContentsDeleteToFolderDelete.exe /target 'C:\Config.Msi' /initial "C:\ProgramData\Apple\Lockdown"
```  
  
1. 释放 Oplock  
  
当在第五步释放 Oplock 时，我们监控 FolderContentsDeleteToFolderDelete 进程以验证是否遵循了 NTFS 连接，以及位于 C:\ 中的 Config.MSI 是否被正确删除。然后，我们监控 FolderOrFileDeletionToSystem.exe 进程以验证我们是否赢得了竞争条件，以及是否写入了带有修改后的回滚脚本的“恶意”Config.MSI 文件夹。如果一切顺利，我们可以按 CTRL+ALT+DELETE，打开右下角的辅助功能菜单并打开屏幕键盘。由于我们已经使用恶意回滚脚本覆盖了 C:\Program Files\Common Files\microsoft shared\ink\HID.DLL 中的 HID.DLL，因此 CMD shell 将以 SYSTEM 身份弹出，完成我们的漏洞利用。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKZgjmffrXzBa3zN5ouE197QcF5ExY80dWGrgiblr69hEfp7cdXC3mfSA/640?wx_fmt=png&from=appmsg "")  
  
执行和监视 FolderContentsDeleteToFolderDelete.exe  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKvdCHlbsq8OqwQq9ljhCMhgiaRmMTurUtPSWjGEIjA2DWKBRESvQBtdw/640?wx_fmt=png&from=appmsg "")  
  
执行和监视 FolderOrFileDeleteToSystem.exe  
  
![](https://mmbiz.qpic.cn/mmbiz_png/p863n88MewoGicPNjfjyhxJLUfrJMQMmKb1zYjCiciaia47wR7DrDgaQ05kJsznggoUKrRocRDLBuPH0EV1rwHL5Aw/640?wx_fmt=png&from=appmsg "")  
  
**弹出 SYSTEM shell**  
  
## 关注我们获取更多漏洞  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/p863n88MewrrZDHj38ibIOLPsYibtuWjyicoPwia4bq3iaDOribz04XYR5GzWAt61lWzp8MVSXicSZiciblkosoASKUiaNfQ/640?wx_fmt=jpeg "")  
  
**扫码关注**  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
