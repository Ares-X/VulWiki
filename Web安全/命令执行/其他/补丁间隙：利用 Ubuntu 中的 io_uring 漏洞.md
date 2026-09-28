---
cve: "CVE-2024-0582"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  注意补丁间隙：利用 Ubuntu 中的 io_uring 漏洞   
 Ots安全   2024-04-26 10:47  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
**概述**  
  
本文讨论Linux 内核中io_uring 中的释放后使用漏洞 CVE-2024-0582  。尽管该漏洞于 2023 年 12 月在稳定内核中得到了修补，但它在两个多月后才被移植到 Ubuntu 内核中，这使其成为当时 Ubuntu 中的一个简单的 0day 向量。  
  
2024 年 1 月上旬，针对最近修复的释放后使用 (UAF) 漏洞 ( CVE-2024-0582 )的零项目问题被公开。很明显，该漏洞允许攻击者获得对许多先前释放的页面的读写访问权限。这似乎是一个非常强大的原语：通常 UAF 可以让您访问已释放的内核对象，而不是整个页面，甚至更好的是多个页面。正如零号项目问题所描述的那样，很明显，这个漏洞应该很容易被利用：如果攻击者拥有对空闲页面的完全访问权限，一旦这些页面返回到平板缓存以供重用，他们将能够修改任何内容这些页面中分配的任何对象。在更常见的情况下，攻击者只能修改某种类型的对象，并且可能只能修改某些偏移量或某些值。io_uring  
  
此外，这一事实还表明纯数据攻击应该是可能的。一般来说，此类漏洞利用不依赖于通过构建 ROP 链或使用类似技术来修改代码执行流程。相反，它专注于修改某些数据，最终授予攻击者根权限，例如使攻击者可以写入只读文件。这种方法使利用更加可靠、稳定，并且允许绕过一些利用缓解措施，例如控制流完整性（CFI），因为内核执行的指令不会以任何方式改变。  
  
最后，根据零号项目问题，该漏洞存在于从 6.4 开始到 6.7 之前的版本的 Linux 内核中。当时，Ubuntu 23.10 运行的是易受攻击的 6.5 版本（后来 Ubuntu 22.04 LTS 也运行了），因此这是利用补丁间隙的好机会，了解攻击者这样做是多么容易，并且他们可能拥有基于 Nday 的 0day 漏洞多久。  
  
更确切地说：  
- 该漏洞已于 2023 年 12 月 8 日在稳定版本 6.6.5中修复。  
  
- 一个月后，即 2024 年 1 月 8 日，“零计划”问题被公开。  
  
- 该问题已在 2024 年 2 月 22 日发布的Ubuntu 内核 6.5.0-21中针对Ubuntu 22.04 LTS Jammy和Ubuntu 23.10 Mantic进行了修补。  
  
这篇文章描述了我们实施的纯数据利用策略，允许非特权用户（并且不需要非特权用户命名空间）在受影响的系统上获得 root 权限。首先，给出该接口的总体概述 io_uring，以及与此漏洞相关的接口的一些更具体的细节。接下来，对漏洞进行分析。最后，提出了仅数据利用的策略。  
  
**Preliminaries**  
  
该io_uring接口是 Jens Axboe 创建的 Linux 异步 I/O API，并在 Linux 内核版本 5.1 中引入。其目标是提高具有大量 I/O 操作的应用程序的性能。它提供类似于read()  和 write()等函数的接口，但请求以异步方式满足，以避免阻塞系统调用引起的上下文切换开销。  
  
该io_uring接口一直是许多漏洞研究的重要目标；它在 ChromeOS、生产 Google 服务器中被禁用，并在 Android 中受到限制。因此，有许多博客文章对其进行了详细解释。一些相关参考文献如下：  
- 在其上放置一个 io_uring – 利用 Linux 内核，这是一篇针对提供与此处讨论的漏洞 ( )io_uring相同的功能 ( ) 的操作的漏洞利用的文章，并且还对该子系统进行了广泛的概述。IORING_OP_PROVIDE_BUFFERSIORING_REGISTER_PBUF_RING  
  
- CVE-2022-29582 io_uring 漏洞，其中描述了跨缓存利用。虽然我们的博客文章中描述的漏洞严格来说不是跨缓存，但两种漏洞利用策略之间存在一些相似之处。它还提供了与我们的利用策略相关的slab缓存和页面分配器的解释。  
  
- 使用仅数据利用来逃逸 Google kCTF 容器io_uring，其中描述了仅数据利用漏洞的不同策略。  
  
- 通过 io_uring 征服内存 – CVE-2023-2598 的分析，这是一个漏洞的撰写，该漏洞产生了与我们的漏洞利用原语非常相似的漏洞。然而，在这种情况下，利用策略依赖于操纵与套接字关联的结构，而不是操纵文件结构。  
  
在接下来的小节中，我们将概述该io_uring界面。我们特别关注 Provided Buffer Ring 功能，该功能与本文讨论的漏洞相关。读者还可以查看《io_uring是什么？ ”，以及上述关于该子系统的替代概述的参考文献。  
  
io_uring 接口  
  
其基础io_uring是一组两个环形缓冲区，用于用户和内核空间之间的通信。这些都是：  
- 提交队列( SQ)，包含描述 I/O 操作请求的提交队列条目 (SQE)，例如读取或写入文件等。  
  
- 完成队列（CQ），包含与已处理并完成的SQE相对应的完成队列条目（CQE）。  
  
该模型允许使用单个系统调用异步执行多个 I/O 请求，而以同步方式，每个请求通常对应于单个系统调用。这减少了阻塞系统调用带来的开销，从而提高了性能。此外，共享缓冲区的使用还减少了开销，因为用户和内核空间之间无需传输数据。  
  
APIio_uring由三个系统调用组成：  
- io_uring_setup()  
  
- io_uring_register()  
  
- io_uring_enter()  
  
io_uring_setup() 系统调用  
  
该io_uring_setup()系统调用为实例设置一个上下文io_uring，即一个提交队列和一个完成队列，每个队列都有指定数量的条目。其原型如下：  
  
```

```  
  
  
其论点是：  
- entries：它决定了SQ和CQ至少必须有多少个元素。  
  
- params：应用程序可以使用它来将选项传递给内核，内核也可以使用它来将有关环形缓冲区的信息传递给应用程序。  
  
成功时，此系统调用的返回值是一个文件描述符，稍后可用于对实例执行操作io_uring。  
  
io_uring_register() 系统调用  
  
系统io_uring_register()调用允许注册资源，例如用户缓冲区、文件等，以供实例使用io_uring。注册此类资源使内核映射它们，避免将来与用户空间进行复制，从而提高性能。其原型如下：  
  
```

```  
  
  
其论点是：  
- fd：系统调用io_uring返回的文件文件描述符io_uring_setup()。  
  
- opcode：要执行的具体操作。它可以具有某些值，例如IORING_REGISTER_BUFFERS，用于注册用户缓冲区，或IORING_UNREGISTER_BUFFERS，用于释放先前注册的缓冲区。  
  
- arg：传递给正在执行的操作的参数。它们的类型取决于opcode传递的具体内容。  
  
- nr_argsarg：传递的参数数量。  
  
成功时，此系统调用的返回值为零或正值，具体取决于所opcode使用的。  
  
提供缓冲环  
  
应用程序可能需要为不同的 I/O 请求拥有不同类型的注册缓冲区。从内核版本 5.7 开始，为了便于管理这些不同的缓冲区集，io_uring允许应用程序注册由组 ID 标识的缓冲区池。这是使用系统调用IORING_REGISTER_PBUF_RING中的操作码来完成的io_uring_register()。  
  
更准确地说，应用程序首先分配一组它想要注册的缓冲区。然后，它使用io_uring_register()opcode 进行系统调用IORING_REGISTER_PBUF_RING，指定这些缓冲区应关联的组 ID、缓冲区的起始地址、每个缓冲区的长度、缓冲区的数量以及起始缓冲区 ID。可以对多组缓冲区执行此操作，每组缓冲区具有不同的组 ID。  
  
最后，当提交请求时，应用程序可以使用该IOSQE_BUFFER_SELECT标志并提供所需的组 ID 来指示应使用相应组中提供的缓冲环。当操作完成时，用于操作的缓冲区的缓冲区ID通过相应的CQE传递给应用程序。  
  
提供的缓冲区环可以io_uring_register()使用操作码通过系统调用取消注册IORING_UNREGISTER_PBUF_RING。  
  
用户映射提供的缓冲环  
  
除了应用程序分配的缓冲区之外，从内核版本 6.4 开始，io_uring还允许用户将所提供的缓冲区环的分配委托给内核。这是使用IOU_PBUF_RING_MMAP作为参数传递给 的标志来完成的io_uring_register()。在这种情况下，应用程序不需要预先分配这些缓冲区，因此不必将缓冲区的起始地址传递给系统调用。然后，在io_uring_register()返回后，应用程序可以将mmap()缓冲区放入用户空间，并将偏移量设置为：  
  
```

```  
  
  
其中bgid是对应的组 ID。这些偏移量以及用于数据的其他偏移量mmap()在io_uring中定义include/uapi/linux/io_uring.h：  
  
```

```  
  
  
处理此类调用的函数mmap()是io_uring_mmap()：  
  
```

```  
  
  
请注意，remap_pfn_range()最终会创建带有标志集的映射VM_PFNMAP，这意味着 MM 子系统会将基页视为原始页帧号映射，而无需关联的page结构。特别是，核心内核不会保留这些页面的引用计数，并且跟踪它是调用代码（在本例中为子系统io_uring）的责任。  
  
**io_uring_enter() 系统调用**  
  
系统io_uring_enter()调用用于使用先前通过io_uring_setup()系统调用设置的SQ和CQ来发起和完成I/O。其原型如下：  
  
```

```  
  
  
其论点是：  
- fd：系统调用io_uring返回的文件描述符io_uring_setup()。  
  
- to_submit：指定从 SQ 提交的 I/O 数量。  
  
- flags：允许指定某些选项的位掩码值，例如IORING_ENTER_GETEVENTS、IORING_ENTER_SQ_WAKEUP、IORING_ENTER_SQ_WAIT等。  
  
sig：指向信号掩码的指针。如果不是NULL，系统调用将用 指向的信号替换当前信号掩码sig，并且当事件在 CQ 中可用时恢复原始信号掩码。  
  
**漏洞**  
  
当应用程序使用该IOU_PBUF_RING_MMAP标志注册提供的缓冲区环时，可能会触发该漏洞。在这种情况下，内核为提供的缓冲区环分配内存，而不是由应用程序完成。要访问缓冲区，应用程序必须mmap()获得虚拟映射。如果应用程序稍后使用操作码取消注册提供的缓冲区环IORING_UNREGISTER_PBUF_RING，则内核会释放该内存并将其返回给页面分配器。但是，它没有任何机制来检查内存是否先前已在用户空间中取消映射。如果尚未完成此操作，则应用程序将具有到已释放页面的有效内存映射，内核可以将其重新分配用于其他目的。从此时起，读取或写入这些页面将触发释放后使用。  
  
以下代码块显示了与此漏洞相关的功能的受影响部分。代码片段由 表示的参考标记来划分[N]。与此漏洞无关的行被标记替换[Truncated]。该代码对应Linux内核版本6.5.3，对应Ubuntu内核中使用的版本6.5.0-15-generic。  
  
**注册用户映射提供的缓冲环**  
  
IORING_REGISTER_PBUF_RING系统调用的操作码的处理程序io_uring_register()是io_register_pbuf_ring()函数，如下面的清单所示。  
  
```

```  
  
  
该函数首先将提供的参数复制到io_uring_buf_reg结构中reg[1]。然后，它检查所需的条目数是否为 2 的幂且严格小于 65536 [2]。请注意，这意味着允许的最大条目数为 32768。  
  
接下来，它检查所提供的具有指定组 ID 的缓冲区列表是否reg.bgid存在，如果不存在，则io_buffer_list分配一个结构并将其地址存储在变量bl[3] 中。最后，如果提供的参数设置了标志IOU_PBUF_RING_MMAP，则io_alloc_pbuf_ring()调用该函数[4]，传入结构的地址reg，其中包含传递给系统调用的参数，以及指向分配的缓冲区列表结构的指针bl。  
  
```

```  
  
  
该io_alloc_pbuf_ring()函数采用 中指定的环条目数，并通过将其乘以结构 [5] 的大小（16 字节）来reg->ring_entries计算结果大小。然后，它通过调用[6] 从页面分配器请求适合此大小的页面数。请注意，对于允许的环条目的最大数量 32768，为 524288，因此可以检索的 4096 字节页面的最大数量为 128。然后第一页的地址存储在结构中，更准确地说存储在[7 ]。另外，和均设置为 1。ring_sizeio_uring_buf_ring__get_free_pages()ring_sizeio_buffer_listbl->buf_ringbl->is_mappedbl->is_mmap  
  
**取消注册提供的缓冲环**  
  
IORING_UNREGISTER_PBUF_RING系统调用的操作码的处理程序io_uring_register()是io_unregister_pbuf_ring()函数，如下面的清单所示。  
  
```

```  
  
  
同样，该函数首先将提供的参数复制到结构中io_uring_buf_reg[ reg8]。然后，它检索与指定的组 ID 相对应的提供的缓冲区列表，reg.bgid并将其地址存储在变量bl[9] 中。最后，它传递bl给函数__io_remove_buffers()[10]。  
  
```

```  
  
  
如果缓冲区列表结构设置了is_mapped和is_mmap标志，即缓冲区环使用标志IOU_PBUF_RING_MMAP[7] 注册时的情况，则函数到达 [11]。然后，得到page缓冲环虚拟地址对应的头页的结构。bl->buf_ring最后，在[12]处释放形成带头的复合页的所有页page，从而将它们返回到页分配器。  
  
请注意，如果提供的缓冲区环设置为IOU_PBUF_RING_MMAP，即它是由内核而不是应用程序分配的，则用户空间应用程序预计会预先mmap()分配此内存。此外，请记住，由于内存映射是使用标志创建的，因此在此操作期间不会修改结构VM_PFNMAP的引用计数。page换句话说，在上面的代码中，内核无法在通过调用释放内存之前知道应用程序是否已取消映射内存free_compound_page()。如果没有发生这种情况，应用程序只需读取或写入该内存即可触发释放后使用。  
  
**开发**  
  
本文中介绍的利用机制依赖于 Linux 上内存分配的工作方式，因此读者应该对其有一定的熟悉。作为回顾，我们强调以下事实：  
  
页分配器负责管理内存页，通常为 4096 字节。它保留 n 阶空闲页面的列表，即页面大小乘以 2^n 的内存块。这些页面按照先进先出的原则提供。  
  
平板分配器位于伙伴分配器之上，并保留常用对象（专用缓存）或固定大小对象（通用缓存）的缓存（称为平板缓存），可用于在内核中进行分配。 slab 分配器有多种实现，但就本文而言，只有 SLUB 分配器（现代版本内核中的默认分配器）是相关的。  
  
板高速缓存由多个板组成，这些板是一个或多个连续内存页的集合。当slab缓存用完空闲slab时（如果在一段时间内分配了大量相同类型或大小的对象但没有释放，就会发生这种情况），操作系统通过向页面请求空闲页来分配新的slab分配器。  
  
此类缓存板之一是filp，它包含file结构。file下一个清单中显示的结构代表一个打开的文件。  
  
```

```  
  
  
与此漏洞利用最相关的字段如下：  
- f_mode：确定文件是否可读或可写。  
  
- f_pos：确定当前读取或写入位置。  
  
- f_op：与文件相关的操作。它确定在文件上发出某些系统调用（例如read()、等）时要执行的函数。write()对于文件系统中的文件ext4，这等于ext4_file_operations变量。  
  
**仅数据利用策略**  
  
该漏洞利用原语为攻击者提供了对已返回到页面分配器的一定数量的空闲页面的读写访问权限。通过多次打开文件，攻击者可以强制耗尽缓存中的所有slab filp，从而向页面分配器请求空闲页面以在此缓存中创建新的slab。在这种情况下，结构的进一步分配file将发生在攻击者具有读写访问权限的页面中，从而能够修改它们。特别是，例如，通过修改该f_mode字段，攻击者可以使以只读权限打开的文件变得可写。  
  
实施此策略是为了成功利用以下 Ubuntu 版本：  
- Ubuntu 22.04 Jammy Jellyfish LTS 带内核6.5.0-15-generic。  
  
- Ubuntu 22.04 Jammy Jellyfish LTS 带内核6.5.0-17-generic。  
  
- Ubuntu 23.10 Mantic Minotaur 内核6.5.0-15-generic。  
  
- Ubuntu 23.10 Mantic Minotaur 内核6.5.0-17-generic。  
  
下一小节将详细介绍如何实施该策略。  
  
**触发漏洞**  
  
该策略首先触发漏洞以获得对已释放页面的读写访问权限。这可以通过执行以下步骤来完成：  
- 进行io_uring_setup()系统调用来设置io_uring实例。  
  
- 使用操作码和标志进行io_uring_register()系统调用，以便内核本身为提供的缓冲区环分配内存。IORING_REGISTER_PBUF_RINGIOU_PBUF_RING_MMAP  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taedn38pjy2DDSDpXRYcowIGfXPoEr8Ay4wCh23jSIExC1u2uhbNb3HDiaVlibCf8BZ48gGF8XxFMcZA/640?wx_fmt=png&from=appmsg "")  
  
注册提供的缓冲环  
  
mmap()io_uring使用文件描述符和偏移量对所提供的缓冲区环的内存进行读写权限IORING_OFF_PBUF_RING。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taedn38pjy2DDSDpXRYcowIGz1P3X10gMhEjIiaXRelYtxETgtu7ueZLhTPfm7oiaVVQC0uG6We8xPhw/640?wx_fmt=png&from=appmsg "")  
  
MMap 缓冲环  
  
io_uring_register()通过使用 opcode进行系统调用来取消注册提供的缓冲区环IORING_UNREGISTER_PBUF_RING。   
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taedn38pjy2DDSDpXRYcowIGpjMk2f243gk1sDDia0ltXbfPYWeh1HgI0odKu9lMEAjH48g6FQs4mYQ/640?wx_fmt=png&from=appmsg "")  
  
取消注册缓冲环  
  
此时，与所提供的缓冲区环对应的页面已返回给页面分配器，而攻击者仍然拥有对它们的有效引用。  
  
**喷涂文件结构**  
  
下一步是生成大量子进程，每个子进程/etc/passwd以只读权限多次打开文件。这会强制file在内核中分配相应的结构。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taedn38pjy2DDSDpXRYcowIGJp08C066gza2JJ8JZEcO9F2X3yBJbOvU5VkWZ93pBxpicGswU8uNdIQ/640?wx_fmt=png&from=appmsg "")  
  
喷涂文件结构  
  
通过打开大量文件，攻击者可以强制耗尽filp缓存中的slab。之后，将通过向页面分配器请求空闲页面来分配新的slab。在某些时候，页面分配器将返回先前与所提供的缓冲区环相对应且攻击者仍具有读写访问权限的页面。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taedn38pjy2DDSDpXRYcowIGY4jqDy5mVnZw8ZJHbU8Qefkic50u1tZzxgMhLfkUpNopGxuZkelicURA/640?wx_fmt=png&from=appmsg "")  
  
从页面分配器请求空闲页面  
  
因此，在此之后创建的所有file结构都将分配在攻击者控制的内存区域中，使他们有可能修改结构。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taedn38pjy2DDSDpXRYcowIGHqkmNSAz27kEZLg53aXhlDbSMT8E3UotY9zaGHObqT4m0YsQoQDZ8g/640?wx_fmt=png&from=appmsg "")  
  
在受控页面内分配文件结构  
  
请注意，这些子进程必须等到指示继续进行利用的最后阶段，以便文件保持打开状态并且不会释放其相应的结构。  
  
**定位内存中的文件结构**  
  
尽管攻击者可能可以访问属于filp缓存的某些分片，但他们不知道它们在内存区域内的位置。然而，为了识别这些板，攻击者可以在结构内字段ext4_file_operations的偏移处搜索地址。当找到一个文件时，可以安全地假设它对应于先前打开的文件的一个实例的结构。file.f_opfilefile/etc/passwd  
  
请注意，即使启用了内核地址空间布局随机化 (KASLR)，为了识别ext4_file_operations内存中的地址，只需要知道该符号相对于该_text符号的偏移量，因此不需要绕过 KASLR。事实上，给定在内存中相应偏移处找到的无符号整数值，我们可以安全地假设它是ifval的地址：ext4_file_operations  
- (val >> 32 & 0xffffffff) == 0xffffffff，即32个最高位全部为1。  
  
- (val & 0xfffff) == (ext4_fops_offset & 0xfffff)val，即和的 20 个最低有效位，相对于ext4_fops_offset的偏移量是相同的。ext4_file_operations_text  
  
更改文件权限并添加后门帐户  
  
一旦文件file对应的结构/etc/passwd位于攻击者可访问的内存区域中，就可以随意修改它。特别是，在找到的结构的字段中设置FMODE_WRITE和FMODE_CAN_WRITE标志file.f_mode将使/etc/passwd文件在使用相应的文件描述符时可写。  
  
此外，将file.f_pos找到的file结构的字段设置为文件的当前大小/etc/passwd/，攻击者可以确保写入其中的任何数据都附加在文件末尾。  
  
最后，攻击者可以向第二阶段生成的所有子进程发出信号，以尝试写入打开的/etc/passwd文件。虽然大多数此类尝试都会失败，因为文件是以只读权限打开的，但与修改后的file结构相对应的文件（由于字段的修改而启用了写入权限file->f_mode）将会成功。  
  
**结论**  
  
综上所述，在这篇文章中，我们描述了最近在io_uringLinux 内核子系统中披露的释放后使用漏洞，并提出了仅数据利用策略。事实证明，这一策略实施起来非常简单。在我们的测试中，它被证明是非常可靠的，当它出现故障时，也不会影响系统的稳定性。这一策略使我们能够在大约两个月的补丁间隙窗口内利用最新版本的 Ubuntu。  
  
  
原文翻译自：  
  
https://blog.exodusintel.com/2024/03/27/mind-the-patch-gap-exploiting-an-io_uring-vulnerability-in-ubuntu/  
  
  
  
感谢您抽出  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycNnFvFYVgXoExRy0gqCkqvrAghf8KPXnwQaYq77HMsjcVka7kPcBDQw/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycd5KMTutPwNWA97H5MPISWXLTXp0ibK5LXCBAXX388gY0ibXhWOxoEKBA/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycU99fZEhvngeeAhFOvhTibttSplYbBpeeLZGgZt41El4icmrBibojkvLNw/640?wx_fmt=gif "")  
  
来阅读本文  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWge7Mibiad1tV0iaF8zSD5gzicbxDmfZCEL7vuOevN97CwUoUM5MLeKWibWlibSMwbpJ28lVg1yj1rQflyQ/640?wx_fmt=gif "")  
  
**点它，分享点赞在看都在这里**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
