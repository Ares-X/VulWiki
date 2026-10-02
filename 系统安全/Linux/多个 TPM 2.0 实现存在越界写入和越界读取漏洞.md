---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2023-1017;CVE-2023-1018"
identifier_role: "primary"
primary_identifiers: "CVE-2023-1017;CVE-2023-1018"
referenced_identifiers: ""
identifier_status: "unknown"
title: "多个 TPM 2.0 实现存在越界写入和越界读取漏洞"
product: "TCG TPM2.0参考实现及vTPM/硬件TPM"
record_type: "roundup"
document_type: "多实现双漏洞研究译文"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "可发TPM命令的本地/VM来宾应用；OOB读写各2字节；列Hyper-V10.0.19041.1415、VMware16.2.4等具体测试实现"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/%E5%A4%9A%E4%B8%AA%20TPM%202.0%20%E5%AE%9E%E7%8E%B0%E5%AD%98%E5%9C%A8%E8%B6%8A%E7%95%8C%E5%86%99%E5%85%A5%E5%92%8C%E8%B6%8A%E7%95%8C%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-26345356a8fef8e32d4167a4"
entity_id: "ve-26345356a8fef8e32d4167a4"
schema_version: "1"
---

# 多个 TPM 2.0 实现存在越界写入和越界读取漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：TCG TPM2.0参考实现及vTPM/硬件TPM
- 文献类型：多实现双漏洞研究译文
- 版本、权限及部署边界：可发TPM命令的本地/VM来宾应用；OOB读写各2字节；列Hyper-V10.0.19041.1415、VMware16.2.4等具体测试实现
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter只1017；正文第二CVE出现2013-1018与203-1018两错号，后文2023-1018应统一核验
2. 不属Linux专属，实际TPM公共实现跨Windows/虚拟化/硬件；主实体与受影响集成产品分层
3. 完整区分不同缓冲布局/清零行为和硬件无法充分调试，云平台影响只是推测不得标已验证
4. 概念验证称.zip含Python/C但无下载URL，关键源码仅图；补丁commit纯值缺直链，Quarkslab原研究URL可恢复
5. BYTE_ARRAY_TO_UINT16/INT16、CryptXORObfuscation/Obfuscity、CreatePrimary名称不一致及翻译边界含混需校正
6. VMware预计4月修复是报道时点，不可当前状态；保留原研究证据差异而非按CVE全产品合并

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://blog.quarkslab.com/vulnerabilities-in-the-tpm-20-reference-implementation-code.html>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 关键基础设施安全应急响应中心   2023-04-18 15:09  
  
我们将在本文中详细讨论在可信平台模块(TPM) 2.0参考实现代码中发现的两个漏洞。这两个漏洞，即越界写入（CVE-2023-1017）和越界读取（CVE-2013-1018），影响了多个TPM 2.0软件实现（如虚拟化软件使用的软件）以及多个硬件TPM。  
# 介绍  
  
2021年10月，微软发布了Windows 11。其中一个突出的安装需求是需要可信平台模块(TPM) 2.0。这一需求的含义是，为了能够在虚拟机中运行Windows 11，虚拟化软件必须通过对主机上的硬件TPM进行传递或通过向其提供虚拟TPM来向VM提供TPM。  
  
我们发现这是一个有趣的漏洞研究主题，因为添加虚拟TPM意味着可以从客户内部访问虚拟化软件的扩展攻击面，因此它可能用于虚拟机逃逸。作为研究工作的结果，我们发现了两个安全问题：一个被标识为CVE-2023-1017的越界写入，另一个被识别为CVE-203-1018的越界读取。它们可以从用户模式应用程序通过发送带有加密参数的恶意TPM 2.0命令来触发。有趣的是，这两个漏洞的影响比我们最初想象的要大，鉴于它们源自Trusted Computing Group（简称TCG，发布和维护TPM规范的非营利组织）发布的参考实现代码，这些安全漏洞不仅影响到我们测试的每个虚拟化软件，也包括硬件实现。  
  
请注意，这篇文章中的大多数评估(例如关于可利用性、影响或受影响的平台)都是基于我们对基于软件的虚拟TPM的分析，因为我们可以用一种简单的方式调试它们来执行动态分析，因为调试Hyper-V的虚拟TPM更难，因为它作为一个IUM进程运行。相反，在没有调试接口的单独芯片中运行的TPM固件中，了解运行时发生的事情是一个完全不同的问题。事实证明，即使对硬件TPM的固件进行静态分析也很困难，因为我们试图分析的少数TPM固件更新碰巧是加密的。因此，缺乏对硬件TPM的具体评估并不意味着它们不受影响，而是由于缺乏可观察性，我们无法评估它们中的大多数是如何受到影响的。但是，使用本文中发布的概念验证代码，至少会验证一些TPM芯片是易受攻击的。在尝试OOB写入后，芯片将停止响应（即不再识别命令），并需要重新启动计算机才能再次运行，从而确认其易受攻击状态。  
# 受影响的平台  
  
以下是受影响的软件和硬件平台的简单列表。其中列出的产品，是我们可以借助本文中提供的PoC证明存在漏洞的产品，但其他TPM（无论是虚拟的还是物理的）也很可能存在漏洞。  
  
在我们进行研究时，易受攻击的代码存在于TPM 2.0参考实现的最新可用版本：Trusted Platform Module Library Specification, Family "2.0", Level 00, Revision 01.59 – November 2019；  
  
Windows 10上的Microsoft Hyper-V(受影响模块:TPMEngUM.dll版本10.0.19041.1415);  
  
VMware Workstation 版本 16.2.4 构建-20089737(受影响模块:tpm2emu.exe -可执行文件中没有版本信息)；  
  
Qemu和VirtualBox使用的Libtpms/SWTPM (从主分支编译，提交520a2fa27d27a4ab18f4cf1c597662c6a468565f);  
  
Nuvoton硬件TPM(固件版本：1.3.0.1);  
  
通常，所有固件基于可信计算组参考实现代码的TPM 2.0都会受到影响。  
# 对云计算的威胁  
  
当前几乎所有主要的云计算提供商都提供带有虚拟TPM的实例，这使得攻击者可能试图利用虚拟TPM中的这些漏洞，以绕过虚拟机并破坏主机系统。  
  
亚马逊AWS已配备了NitroTPM，Nitro TPM：Trusted Platform Module (TPM) 2.0，是一项安全性和兼容性功能，可让客户更轻松地在其EC2实例中使用依赖于TPM的应用程序和操作系统功能。它符合TPM 2.0规范，可以轻松将使用TPM功能的现有本地工作负载迁移到EC2；  
  
Microsoft Azure提供虚拟TPM作为可信启动的一部分；  
  
谷歌云提供虚拟TPM作为屏蔽虚拟机的部分功能；  
  
Oracle Cloud Infrastructure提供虚拟TPM作为屏蔽实例的一部分。  
  
那些使用基于TCG参考实现的虚拟TPM的提供商预计很容易受到攻击。以Google Cloud为例，他们的虚拟TPM的核心来自IBM发布的代码，该代码自动从TPM 2.0规范的完整源代码中提取，CryptParameterDecryption函数中的漏洞存在于其中。以微软Azure为例，他们的虚拟TPM“符合TPM 2.0规范”，我们已经验证了Windows 10上可用的Hyper-V版本中包含的虚拟TPM确实非常易受攻击。  
  
关于亚马逊AWS和Oracle云基础设施，除了知道“符合TPM 2.0规范”并链接到TCG网站外，我们没有太多关于他们的信息。  
# 修复  
  
参考实例(Reference Implementation)  
  
可信计算组织（Trusted Computing Group，TCG）发布了TCG可信平台模块库的勘误表1.4版，并对这两个漏洞提出了修复建议。  
  
软件产品  
  
微软在2023年3月的安全更新中修复了Hyper-V中的漏洞。他们对TPM 2.0在Azure的Pluton/HCL/Overlake/Manticore标准服务器上的OOB写入影响的评估很低，因为只有2个字节覆盖，目前该团队还没有一种易于实现的方法来获得仅2个字节的EoP或RCE。  
  
微软还通过提交9bdd9f0aaba5e54b3c314cfff02cf532281a067e修复了他们的开源参考实现。  
  
VMware预计将于2023年4月发布这些漏洞的修复程序。  
  
Libtpms修复了提交324dbb4c27ae789c73b69dbf4611242267919dd4中的漏洞。  
  
Chromium OS修复了提交3b87ed233acb4c76c27872e1ac0b74dc032199f1漏洞。  
  
IBM在提交102893a5f45dbb0b0ecc0eb52a8dd4defe559f92中修复了他们的开源实现。  
  
硬件产品  
  
Nuvoton为其NPCT65x TPM芯片发布了安全咨询SA-003。  
  
联想发布了关于使用上述Nuvoton TPM的受影响产品的安全咨询LEN-118320。  
  
查看计算机制造商的网站以获取TPM固件更新。  
# 技术细节  
  
关于TPM加密参数的入门教程  
  
如Trusted Platform Module Library Specification，Family 2.0，Part 1：Architecture 第21节“基于会话的加密”中所描述的那样，一些TPM 2.0命令具有可能需要加密的参数，这些参数可能需要去往TPM或通过TPM进行加密。可以使用基于会话的加密来确保这些参数的机密性。引用规范如下：  
  
并非所有命令都支持参数加密。如果允许基于会话的加密，只有请求或响应的参数区域中的第一个参数可以被加密。参数必须有明显的大小字段。只有参数的数据部分被加密。TPM应该支持使用XOR模糊处理的基于会话的加密。对使用CFB模式的分组密码的支持是特定于平台的。这两种加密方法（XOR和CFB）不需要填充数据进行加密，因此加密数据大小和纯文本数据大小相同。  
  
基于会话的加密使用会话启动时建立的算法参数以及从特定于会话的sessionKey派生的值。  
  
如果sessionAttributes.decrypt在命令的会话中为SET，并且该命令的第一个参数是一个大小为缓冲区的参数，则使用会话的加密参数对该参数进行加密。  
  
带有加密参数的TPM 2.0命令由基本命令标头、handleArea和sessionArea组成，最后是加密的参数parameterArea。结构如下：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28DibcyN5ZcepcwaRHibZd9JZ4w3NfjcJDQrtLq8w55jOiaXc4t9ebshCYaBwI6aOmh56nf8lIF6Mib7g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
如下图所示，在TPM 2.0参考实现中，ExecCommand.c中的ExecuteCommand函数检查sessionArea的authorizationSize字段是否至少为9（[1]）。之后，在[2]中，它计算parameterArea的开始（位于sessionArea之后），并将其保存到parmBufferStart变量中。在[3]中，它计算parameterArea的大小，并将其保存到parmBufferSize变量中。然后它调用ParseSessionBuffer() ([3])，传递parmBufferStart和parmBufferSize作为参数([5], [6])。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28DibcyN5ZcepcwaRHibZd9JZJPpmjqRuyQxyMxMXjia8iby0ibRiaDyHzHr4uwyVA7QVhLWx2AHMruicE7g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
SessionProcess.c中的函数ParseSessionBuffer解析命令的sessionArea。如果会话具有Decrypt属性集（[1]），并且命令代码允许参数加密，则ParseSessionBuffer调用CryptParameterDecryption()([2])，传播parmBufferSize([3])和parmBufferStart([4])参数:  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28DibcyN5ZcepcwaRHibZd9JZ6jVBibUsSONuJhefGo5o4sNhAbGCMeqRV83fsoXaXy3xOSjNHbiac6mg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
CryptParameterDecryption函数中存在的漏洞  
  
CryptUtil.c中的函数CryptParameterDecryption对加密的命令参数执行就地解密。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28DibcyN5ZcepcwaRHibZd9JZKgMr2QsYb3mqxj7LNSuJBPuU8kytjYrwanSDnpc76eVJQqZ9xXtRBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
此函数中出现的两个安全漏洞  
  
漏洞1：OOB read (CVE-2023-1018): 在[1]中，函数使用BYTE_ARRAY_TO_UINT16宏从parmBufferStart指向的缓冲区中读取16位字段(cipherSize)，而不检查是否有任何参数数据超过会话区域。之前在函数ExecuteCommand中执行了唯一的长度检查，但该检查只验证了命令的sessionArea至少有9个字节。因此，如果格式错误的命令不包含越过sessionArea的parameterArea，它将触发越界内存读取，使TPM在命令结束后访问内存。  
  
请注意，BYTE_ARRAY_TO_INT16宏不执行任何边界检查：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/wpkib3J60o28DibcyN5ZcepcwaRHibZd9JZRpmkzJCBqmtySemI7euvjkx0m8nxVod2YRA2p6kYwA5eqffajDJHFw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
应该使用UINT16_Unmarshal函数来代替，它在从给定的缓冲区读取之前执行适当的大小检查。  
  
漏洞2：OOB写入(CVE-2023-1017):如果提供了适当的parameterArea(避免出现漏洞1)，则parameterArea的前两个字节将被解释为要解密的数据的大小（[1]处的cipherSize变量）。在读取了cipherSize之后，在[2]处，缓冲区指针向前移动2。在[3]中有一个健全性检查，如果cipherSize值大于实际缓冲区大小，那么它将被释放，但这里有一个问题，在读取cipherSize 16位字段并将缓冲区指针向前移动2之后，函数会忘记从bufferSize减去2，忽略已经处理的两个字节。因此，使用比剩余数据实际大小大2的cipherSize值成功地通过[3]的完整性检查是可能的。这样，当调用CryptXORObfuscation()或ParmDecryptSym()函数(分别在[4]和[5]处)来实际解密cipherSize字段后面的parameterArea中的数据时，TPM最终会在缓冲区末尾写入2个字节，从而导致越界写入。  
  
一个只有2个字节的OOB写入一开始可能看起来不是一个非常强大的原语，但去年已有研究人员通过一个值为0x01的单字节OOB写入，成功地在谷歌Titan M芯片上执行了代码。  
# 影响  
  
1.OOB读取：CryptUtil.c中的函数CryptParameterDecryption可以读取接收到的TPM命令结束后的2个字节。如果受影响的TPM没有将接收到的命令之间的命令缓冲区清零，则可能导致受影响的函数读取先前命令中已经存在的任意16位值。这取决于实现过程：例如，VMware不会清除请求之间的命令缓冲区，因此OOB读取可以访问上一个命令中已经存在的任何值，相反，Hyper-V的虚拟TPM在每次接收到请求时都会用零填充命令缓冲区中未使用的字节，因此OOB访问最终只读取零  
  
2.OOB写入：CryptUtil.c中的函数CryptXORObfuscity/ParmDecryptSym（从CryptParameterDecryption调用）可以在命令缓冲区结束后写入2个字节，从而导致内存损坏。  
  
第二个漏洞无疑是最有趣的一个。能够覆盖有用内容的可能性取决于每个实现如何分配接收TPM命令的缓冲区。例如：  
  
VMware使用大小为0x10000的超大缓冲区，远远大于通常的最大TPM命令大小0x1000字节；  
  
Hyper-V使用一个大小为0x1000的静态变量作为命令缓冲区;  
  
SWTPM使用malloc()分配大小为0x1008的命令缓冲区(8字节用于发送命令前缀，可用于修改位置，加上0x1000字节用于最大TPM命令大小)。  
  
因此，在命令缓冲区附近有一些有用的东西(我们可以用OOB写入来覆盖)的可能性实际上取决于实现。上面提到的三个虚拟TPM都使用完全不同的方法来分配命令缓冲区。类似地，在给定硬件TPM的固件的命令缓冲区之后覆盖一些有用内容的可能性完全取决于特定硬件供应商如何分配用于保存传入命令的缓冲区。  
# 触发漏洞  
  
为了再现上述2个漏洞中的一个，有必要向目标TPM发送2个命令。在这两种情况下，第一个命令必须是TPM2_StartAuthSession命令，以启动授权会话。为简单起见，我们可以指定TPM_ALG_XOR作为要使用的对称算法。结果，我们得到一个包含会话句柄的TPM响应。  
  
之后，我们需要发送一个支持参数加密的命令。我们使用了tpm2_creatprimary，尽管其他一些命令可能也能运行。我们在tpm2_creatprimary命令的sessionArea中传递上一步中获得的会话句柄，并在sessionAttributes字段中设置Decrypt标志。然后:  
  
1.为了再现漏洞1 (OOB读取)，我们发送具有最小有效sessionArea的TPM2_CreatePrimary命令，之后没有数据，即缺少parameterArea。  
  
2.为了再现漏洞2 (OOB写入)，我们发送tpm2_creatprimary命令，其总大小等于支持的最大TPM命令大小(0x1000字节)。在本例中，我们确实包含了一个parameterArea，其中cipherSize字段设置为0xfe5 (0x1000 - sizeof(command_base_header) - sizeof(handleArea) - sizeof(sessionArea))，后面跟着0xfe3字节的任意值(填充加密参数的位置)，以完成整个tpm2_creatprimary命令的0x1000字节。  
# 概念验证  
  
.zip文件包含PoC的Python版本(用于在Linux系统上运行)和C版本(用于在Windows机器上运行)。  
# 总结  
  
在TPM 2.0参考实现的代码中发现了两个安全漏洞：越界读取和越界写入。因此，其固件基于可信计算组发布的参考代码的每个TPM(软件或硬件实现)都将受到影响。  
  
有趣的是，尽管所有受影响的TPM共享完全相同的易受攻击的功能，但成功利用的可能性取决于命令缓冲区的实现方式，这部分取决于每个实现。从上述示例可以看到，每个人似乎都以不同的方式处理它：一些人在接收到的请求之间清除命令缓冲区，但另一些人不会；有些通过malloc()在堆中分配命令缓冲区，而另一些则使用全局变量。  
  
本文已经验证这些漏洞存在于主要桌面虚拟化解决方案(如VMware Workstation、Microsoft Hyper-V和Qemu)中包含的软件TPM中。最大的云计算提供商提供的虚拟TPM也可能受到影响。例如，Google Cloud使用IBM发布的代码自动从TCG参考实现中提取，并且IBM提供的代码中存在的漏洞也被验证了。以微软Azure为例，我们已经提到Windows 10上的Hyper-V受到了影响，由于Azure虚拟机监控程序是基于Hyper-V的，我们预计这两个漏洞也会出现在Microsoft的云平台上。  
  
我们预计大多数TPM硬件供应商也会受到影响。由于缺乏调试设置来查看TPM固件在运行时发生的情况，因此很难确认物理芯片中是否存在漏洞。静态分析可以作为评估硬件TPM是否易受攻击的替代方法，但在我们设法获得的少数TPM固件更新中，这些更新是加密的。  
  
**参考及来源：**  
  
https://blog.quarkslab.com/vulnerabilities-in-the-tpm-20-reference-implementation-code.html  
  
  
  
原文来源：嘶吼专业版  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaz5iaQYxGogucKMiatGyfBHlfj74r3CyPxEBrV0oOOuHICibgHwtoIGayOIcmJCIsAn02z2yibtfQylib07asMqYAEw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
