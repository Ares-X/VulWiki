---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2015-3636"
identifier_role: "primary"
primary_identifiers: "CVE-2015-3636"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Android系统内核漏洞利用技术入门"
product: "Linux ping socket / Android"
record_type: "vulnerability"
document_type: "内核漏洞利用教学"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "正文称Android4.4–5.1/Linux3.4–4.1；本地可创建ICMP ping socket；区分PAN/PXN及32/64位"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Android/Android%E7%B3%BB%E7%BB%9F%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9E%E5%88%A9%E7%94%A8%E6%8A%80%E6%9C%AF%E5%85%A5%E9%97%A8.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-987c4a95c1e338375d4078df"
entity_id: "ve-987c4a95c1e338375d4078df"
schema_version: "1"
---

# Android系统内核漏洞利用技术入门

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Linux ping socket / Android
- 文献类型：内核漏洞利用教学
- 版本、权限及部署边界：正文称Android4.4–5.1/Linux3.4–4.1；本地可创建ICMP ping socket；区分PAN/PXN及32/64位
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 所有代码块为空，触发PoC、内核源码、JOP gadget全部缺失，叙述多次引用不存在的上述代码
2. addr_limit写0取得任意读写的说法需核对；Linux受影响范围/PC不能创建ping socket过度概括，应列配置条件
3. ppriv/LIST_POSION2拼写不一致；参考[2]URL断行；重复编号与断行影响阅读
4. BlackHat/USENIX等参考可追溯，适合保留ret2dir教学，不应按新漏洞或完整PoC收录

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.blackhat.com/docs/us-15/materials/us-15-Xu-Ah-Universal-Android-Rooting-Is-Back-wp.pdf>
- 原文参考链接（未重新核验）：<https://en.wikipedia.org/wiki/Android_version_history>
- 原文参考链接（未重新核验）：<https://hack-big.tech/2021/10/07/PXN>
- 原文参考链接（未重新核验）：<https://www.unix.com/man-page/linux/9/KMEM_CACHE_CREATE/>
- 原文参考链接（未重新核验）：<https://www.usenix.org/system/files/conference/usenixsecurity14/sec14-paper-kemerlis.pdf>
- 原文参考链接（未重新核验）：<https://www.jianshu.com/p/3c662b6163a7>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

NEURON  SAINTSEC   2025-06-25 05:57  
  
本文主要介绍Android内核利用入门，分析经典漏洞CVE-2015-3636   
[0]  
 ，主要介绍ret2dir利用思路。  
  
  
**漏洞分析**  
  
CVE-2015-3636是一个Linux 内核中的UAF漏洞，最初由fuzz工具Trinity发现，可利用此漏洞在安卓设备上提升权限，主要影响Android 4.4～5.1的设备，对应Linux上游内核版本3.4～4.1   
[1]  
。  
  
当socket(AF_INET, SOCK_DGRAM, IPPROTO_ICMP)  
创建socket之后，使用connect  
系统调用将会触发inet_dgram_connect  
函数处理用户请求：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
上述代码中，如果uaddr->sa_family == AF_UNSPEC  
，则调用sk->sk_prot->disconnect  
断开连接。对于ping的ICMP协议，disconnect函数指针为udp_disconnect  
函数：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
在上述代码中，如果sk->sk_userlocks & SOCK_BINDPORT_LOCK  
为0，则调用sk->sk_prot->unhash(sk)  
，对于ping的ICMP协议，unhash函数指针为ping_unhash  
：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
如ping_unhash  
代码所示，当参数sk  
，也就是ICMP的套接字被哈希时，会进入if判断，调用hlist_nulls_del  
。而hlist_nulls_del  
函数会将n->ppriv  
的值变为LIST_POSION2  
：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
LIST_POISON2  
为宏定义的常量，在32位与64位都是0x200200。所以可以简单的理解为：hlist_nulls_del  
函数将ppriv的值写为0x200200，而且这个地址是我们可以从用户态映射的地址。  
  
在第一次调用connect整体逻辑看起来都没问题，但在第二次调用connect时就出现了问题。在之前hlist_nulls_del  
函数删除掉套接字对象后，它仍然保持散列的状态，因为它是否处于散列状态取决于sk->sk  
节点，这个节点在第一次连接期间不会改变。所以会再次进入if判断调用hlist_nulls_del  
函数。而这一次执行 *ppriv = next  
 时将会导致内核崩溃，因为此时ppriv值为0x200200，如果这个地址没有被映射，那么就会出现严重的页错误导致内核崩溃。  
  
在ping_unhash  
函数中，每次进入if分支，sock_put  
都会将对象的引用计数减一。另外，它还会检查引用计数是否为0，如果为0，sock对象将会被释放，而在第二次进入ping_unhash  
的if分支时，使用的就是被释放后的sock对象，因此是一个典型的UAF漏洞。sock_put  
函数逻辑如下：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
  
**利用思路**  
  
通过漏洞分析，得知可以使用两次connect  
来触发内核崩溃，因此可得如下PoC：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
上述代码中，首先使用了AF_INET  
使sock对象在内核中进行hash，否则无法访问对象。在安卓设备上，普通用户可以创建PING套接字，而在PC则没有权限创建，因此这个PoC只适用于安卓设备，并且此PoC代码只能达到拒绝服务的攻击效果，我们能做的不止于此。  
  
在关闭一个套接字时，可以使用close  
系统调用。在ICMP协议中，最终会调用inet_release  
函数来执行关闭操作：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
在上述代码中，实际上最后会调用sk->sk_prot->close  
函数来关闭sock对象。这个close函数指针正好在sock->sk  
中，因此，如果我们在close之前，将此sock对象覆盖，那么就能够控制sk->sk_prot->close  
，如果内核中没有应用PAN   
[2]  
 保护机制，那么就可以通过此函数指针控制PC寄存器。实际上在此漏洞公布时，市面上还没有任何Android设备采用这种保护机制。  
  
综合以上结论，需要处理两个关键的问题：  
1. 如何在Android内核大量的内存申请过程中，准确的申请到之前释放过的对象位置？  
  
1. 如何在close之前伪造sock对象进而控制PC指针？  
  
针对于第一个问题的描述，PING sock对象使用的是kmem_cache_create  
[3]  
 创建的SLAB缓存对象，对象大小为576，这种对象不会在分配常规的内存时进行分配。也就是说，sock对象与一般大小的SLAB是相互隔离的，没办法直接通过堆喷的方式去占用已释放的对象。另外由于内核多线程的影响，内核中的多个任务产生的内存申请，可能会导致没办法及时占用到之前释放过的内存。不同的内核版本PING sock大小是不相同的，为了找到一种适用于所有安卓设备的通用解决方案，那么就不应该依赖于这些设备的PING sock的大小。因此，这里提出了使用physmap   
[4]  
 , ret2dir   
[5]  
 的利用方法。  
  
具体原理：physmap是内核空间中的一大块内存   
[6]  
 ，将用户空间的内存直接映射到内核空间，以提升系统性能。用户可以通过在用户态空间大量mmap，其中大部分数据将会直接出现在内核空间。那么就可以通过physmap来覆盖释放的sock对象。  
  
在利用过程中存在一个问题，如何得知已经覆盖到了physmap的位置？答案是在喷射过程中，除了一些关键的字节用于保证内核不发生崩溃，在其他的位置可以填充一些我们自己的标识内容，然后可以调用 ioctl(sockfd, SIOCGSTAMPNS, (struct timespec*))  
 来读取这些标识内容。这一操作将会调用sock_get_timestampns  
函数：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
如上述代码所示，此函数最终调用copy_to_user  
读取出了sk  
的sk_stamp  
，因此可以通过这种方式泄露出固定偏移位置的内容，然后与之前填写的标识内容相比较，就可以得知覆盖是否完成。当得知覆盖完成时，就可以调用sk->sk_prot->close  
函数指针，以此控制PC指针。  
  
控制了PC寄存器之后，下一步就是将thread_info结构的addr_limit  
成员改写为0。addr_limit是用于限制一个线程虚拟地址访问范围的字段，它表示一个线程可以访问的地址空间的上界。改写addr_limit的目的是为了能够在内核空间中实现任意读写   
[7]  
 。  
  
对于没有启用PXN   
[8]  
 保护机制的设备，可以直接在physmap放置一段shellcode来改写addr_limit的值。而对于启用了PXN保护机制的设备，内核空间不再能直接执行用户空间代码，类似于x86架构的SMEP，则需要进行ROP修改addr_limit来实现任意地址读写。为了更稳定的利用效果，可以选择JOP来替代ROP，最主要的原因是ROP需要从内核stack pivot到用户态空间，这时会破坏SP指针，由于SP指针在整个利用过程中非常重要，因此随意更改SP指针不是一个明智的选择。在构造JOP时有两个重要的目标：  
1. 从内核中泄露SP值，通过SP来获取当前task的结构体。可以通过如下gadget完成：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
在第一段汇编指令中，x0寄存器为用户空间地址，那么就可以将x1寄存器的值写入到用户空间，即泄露了内核空间的地址，可以用于泄露内核SP值以及当前task地址。  
  
在第二段与第三段汇编指令，如果x2寄存器为用户空间地址，则可以通过x2寄存器从内核空间返回到用户空间。  
  
对于64位Android设备，x29寄存器通常存储SP值，因此可以通过如下gadget完成泄露：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
1. 重写当前task结构体的addr_limit，从而完成任意地址读写。有两种方式可以完成：  
  
1. 直接重写：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
1. 间接重写：  
> 原文此处代码块为空，内容未归档；无法从空块证明或复现所述结果。
  
**参考**  
  
[0]   
https://www.blackhat.com/docs/us-15/materials/us-15-Xu-Ah-Universal-Android-Rooting-Is-Back-wp.pdf  
  
[1]   
https://en.wikipedia.org/wiki/Android_version_history  
  
[2]   
https://hack-big.tech/2021/10/07/PXN  
与PAN机制攻防/  
  
[3]   
https://www.unix.com/man-page/linux/9/KMEM_CACHE_CREATE/  
  
[4]   
https://www.usenix.org/system/files/conference/usenixsecurity14/sec14-paper-kemerlis.pdf  
  
[5]   
https://www.jianshu.com/p/3c662b6163a7  
  
[6]   
https://www.kernel.org/doc/html/v5.8/x86/x86_64/mm.html  
  
[7]   
https://cloudfuzz.github.io/android-kernel-exploitation/chapters/exploitation.html#primitive  
  
[8]   
https://developer.arm.com/documentation/107565/0101/Memory-protection/Significance-of-XN-and-PXN-bits  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
