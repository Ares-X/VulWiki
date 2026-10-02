---
cve: "CVE-2023-36408; CVE-2025-24048; CVE-2025-24050"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Hyper-v虚拟磁盘驱动vhdmp.sys漏洞汇总分析"
product: "Windows Hyper-V vhdmp.sys"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-36408; CVE-2025-24048; CVE-2025-24050"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-4e8c20dcd63a49fcb9099bd4"
entity_id: "ve-4e8c20dcd63a49fcb9099bd4"
schema_version: "1"
---

# Hyper-v虚拟磁盘驱动vhdmp.sys漏洞汇总分析

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据仅36408漏24048/24050
- 复现系统列表未对应每个CVE及补丁构建
- 末尾SMB QUIC项目和三个致谢只有文字链接全部丢失
- 原作者不提供完整PoC，C#/C片段不可编译如return =、构造函数只定义局部变量、未定义DefaultDiskSize
- OffsetTableize>>a与/400混十六进制和十进制，页0x400与后文0x1000也需核
- 需本地虚拟磁盘操作权限/可控SMB后端，非普遍跨VM远程逃逸
- 明示BSOD/磁盘修改和关闭证书验证副作用
- 源码偏移及PreviousMode利用为版本相关潜在方案非已验证稳定提权

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

王cb  看雪学苑   2025-03-21 17:59  
  
这篇文章的目的是介绍hyper-v虚拟磁盘驱动vhdmp.sys相关的漏洞CVE-2023-36408，CVE-2025-24048和CVE-2025-24050汇总分析。  
  
  
文章结合了逆向代码和调试结果分析了hyper-v虚拟磁盘驱动vhdmp.sys相关的漏洞的利用过程和漏洞成因。  
  
## 复现环境  
  
Windows 11 24h2 canary preview Built by:   27764 .1000  支持smb quic模式  
  
Windows 10 22h2  
  
## CVE-2023-36408漏洞分析  
  
```
struct Rct::Header
{

 __int64 OffsetTableize_0;
  __int64 field_8;
  char NewRctId_10;
  char field_11[7];
  Rct::Format::BranchHistoryEntry *rawbuf_18;
  int headerlen_20;
  Rct::RctId rctid_24;
  Rct::RctId RctId_3c;
  __int64 field_54;
  _OWORD rctguid_5c;
  int field_6c;
  __int64 field_70;  
};
void __fastcall Rct::Header::GenerateFormattedHeader(Rct::Header *this, struct Rct::Format::Header *a2)
{
//
memmove((char *)a2 + 0x1000, (const void *)this->rawbuf_18, 24i64 * (unsigned int)this->headerlen_20);
}

__int64 __fastcall Rct::Header::InitializeFromFormattedFullHeader(Rct::Header *this, struct Rct::Format::FullHeader *a2, enum Rct::Format::FailureReason *a3, unsigned int a4)
{
 __int64 rawbuf_18 = Rct::AllocateBranchHistory(
            (Rct *)*(unsigned __int16 *)((char *)a2 + v11 + 4164),
            (char *)a2 + v11 + 0x2000,
            (struct Rct::Format::BranchHistoryEntry *)*(unsigned __int16 *)((char *)a2 + v11 +0x1044);
//memory pool allocation is alloced with user controled length Rct::Header->headerlen_20 from test.vhdx.rct file with offset 0x1044 
this->headerlen_20 = *(unsigned __int16 *)((char *)a2 + v11 + 0x1044);			
this->rawbuf_18 = (__int64)rawbuf_18;
}

```  
  
  
  
以上漏洞代码显示，vhdmp.sys驱动在初始化虚拟磁盘相关对象时,会调用为Rct:：Head->rawbuf_18内存池分配由test.vhdx.Rct文件定义的长度大小的内存区域，这个长度由用户通过文件内容控制，rct文件存在2个冗余的Rct:：Headr结构体每个长度为0x4000,第一个起始位置在文件偏移量0x1000,每个结构体长度字段所在偏移量为0x1044。  
  
  
当其中一个验证无效时采用备用结构体替代,这个结构体内存池长度字段可以是用户控制的Uint16任意值,但是最终写入目标缓冲区的也是默认Rct:：Headr的长度只有0x4000字节。  
  
  
存在越界写入,覆盖此缓冲区将导致下一个内存池头损坏，访问此缓冲区时会在后续io操作写入不可预测的位置。  
  
  
触发漏洞需要使用使用VirtDisk.dll的api创建具有预定义磁盘大小的.vhdx文件调用CreateVirtualDisk函数，并使用SetVirtualDiskInformation和参数SetVirtualDiskInfo设置ChangeTrackingEnabled设置为true。  
  
  
启用Hyper-V虚拟磁盘的弹性更改跟踪Resilient Change Tracking功能,创建关联的.rct文件.配置完成后,关闭相关虚拟磁盘对象.之后操作打开rct文件修改数据偏移量在0x1044。  
  
  
将rct:：Header->headerlen_20更改为大于默认值的值。  
  
  
最后，打开虚拟磁盘文件,调用设置较大磁盘大小的ExpandVirtualDisk扩展磁盘函数,将触发Rct:：HeaderUpdateOperation:：WriteHeader更新写入这个结构体漏洞函数,进行的内存拷贝操作会导致越界写入。  
  
  
在调试过程中，操作系统内核崩溃显示了以下分析结果。可见篡改后的拷贝内存池长度0xffff大于目标内存池大小。  
  
  
```
8: kd> bp vhdmp!Rct::Header::GenerateFormattedHeader
4: kd> r
rax=ffffc986cb6edb30 rbx=0000000000000001 rcx=ffffc986cb6edb30
rdx=ffffc986cb6f2000 rsi=ffffad867a6af430 rdi=ffffc986cb6eda88
rip=fffff80148642380 rsp=ffffad867a6af2d8 rbp=ffffad867a6af430
 r8=0000000000000000  r9=0000000000000800 r10=ffffa70000000028
r11=0000007ffffffff8 r12=ffffc986cb6edb30 r13=0000000000000000
r14=ffffad867a6af470 r15=ffffc986cb6ed790
iopl=0         nv up ei pl nz na pe nc
cs=0010  ss=0018  ds=002b  es=002b  fs=0053  gs=002b             efl=00040202
vhdmp!Rct::Header::GenerateFormattedHeader:
fffff801`48642380 48895c2408      mov     qword ptr [rsp+8],rbx ss:0018:ffffad86`7a6af2e0=ffffc98600000000
4: kd> dq rcx
ffffc986`cb6edb30  00000000`00001900 00000000`00000002ffffc986`cb6edb40  000038a8`ffff0001 ffffc986`c08e0000
//Rct::Header->headerlen_20 is set to 0xffff
ffffc986`cb6edb50  a613ae4c`0000ffff 6d79c69c`4c7489a1ffffc986`cb6edb60  00000000`6feb42b7 64ccccbf`00000000
ffffc986`cb6edb70  bed8ec9d`47f453e2 00000000`8d25f7c2ffffc986`cb6edb80  00000000`00000000 6d0a30e0`00000000
ffffc986`cb6edb90  10570d84`455d901c 00000001`dd6d5130ffffc986`cb6edba0  00000000`00000000 6d0a30e0`00000000
4: kd> kv
 # Child-SP          RetAddr               : Args to Child                                                           : Call Site
00 ffffad86`7a6af2d8 fffff801`48642fb9     : ffffc986`00000000 8a000001`6c6009e3 00000000`00000000 fffff164`c365b7b0 : vhdmp!Rct::Header::GenerateFormattedHeader
01 ffffad86`7a6af2e0 fffff801`486421ed     : 00000000`00000103 ffffad86`7a6af3c8 ffffad86`7a6af3c8 ffffc986`cb6eda88 : vhdmp!Rct::HeaderUpdateOperation::WriteHeader+0x29
02 ffffad86`7a6af310 fffff801`486324e6     : ffffc986`cb6eda88 ffffad86`7a6af450 ffffc986`cb6eda10 ffffc986`cb6ed0d0 : vhdmp!Rct::HeaderUpdateOperation::Execute+0xbd
03 ffffad86`7a6af350 fffff801`48633d8a     : 00000000`00000000 00000000`00001940 ffffc986`cb6ed0d0 ffffc986`cb6edb30 : vhdmp!VhdmpiUpdateRctHeader+0xb2
04 ffffad86`7a6af560 fffff801`486986d6     : 00000202`002bda80 00000000`00000000 ffffc986`cafa88f0 00000000`00000000 : vhdmp!VhdmpiResizeRctFile+0x106
05 ffffad86`7a6af750 fffff801`4869759a     : ffffc986`cc061080 ffffc986`cc3d8300 ffffc986`cc061080 ffffb500`b46ce000 : vhdmp!VhdmpiVhd2ResizeBackingStoreInternal+0xde
06 ffffad86`7a6afa70 fffff801`48674249     : ffffc986`cc061080 ffffc986`cc3d8300 ffffc986`cacbfa90 ffffc986`cafa8890 : vhdmp!VhdmpiVhd2ExpandThread+0x14a
07 ffffad86`7a6afad0 fffff801`2a5268f5     : ffffc986`cc061080 00000000`00000080 fffff801`486741f0 00000000`00000000 : vhdmp!VhdmpiAsyncOpThread+0x59
08 ffffad86`7a6afb10 fffff801`2a604c68     : ffffb500`b46c0180 ffffc986`cc061080 fffff801`2a5268a0 00000000`00000000 : nt!PspSystemThreadStartup+0x55
09 ffffad86`7a6afb60 00000000`00000000     : ffffad86`7a6b0000 ffffad86`7a6a9000 00000000`00000000 00000000`00000000 : nt!KiStartSystemThread+0x28

the write destination buffer is only have 0x4000 bytes legth,overwrite this buf will cause corrupt next pool header
4: kd> !pool rdx
Pool page ffffc986cb6f2000 region is Nonpaged pool
*ffffc986cb6f2000 : large page allocation, tag is V2lg, size is 0x4000 bytes
        Pooltag V2lg : VHD2 core large allocation, Binary : vhdmp.sys

```  
  
  
  
补丁后修复代码  
  
  
```
__int64 __fastcall Rct::ValidateHeader(_DWORD *a1)
{
//Rct::Header->headerlen_20 偏移量为0x1044 加了验证 0xffff
 entrylen = *(buf + 0x44);
  if ( (entrylen - 1) <= 0x1FEu
    && (v6 = *(buf + 0x30),
        LOBYTE(v3) = *(buf + 0x46) != 0,
        v7.idxlow_10 = *(buf + 0x40),
        v7.Low_0 = v6,
        Rct::ValidateBranchHistory((buf + 0x1000), entrylen, &v7, v3)) )
  {
      return  = 0i64;
  }
  return  = 6i64;  
}

```  
  
  
  
补丁后修复可见对偏移量为0x1044的Uint16结构体长度多了判断 (entrylen - 1) <= 0x1FE超过目标长度就返回错误从而导致对应的结构体未通过完整性验证,采用备用结构体替代。  
  
## CVE-2025-24050 漏洞分析  
  
VirtDisk.dll的api创建CreateVirtualDisk创建vhdx虚拟磁盘存在4个版本的不同类型,v1和v2是微软文档化的,v1仅支持固定大小的虚拟磁盘,v2支持基于父虚拟磁盘的差异磁盘。  
  
  
从v3开始支持基于差异磁盘的追踪控制ResiliencySourceLimit查询功能的磁盘创建，这种类型并未微软文档化但是结构体已经公开，笔者通过逆向找到了成功创建的方法。  
  
```
[StructLayout(LayoutKind.Sequential, Pack = 1)]
public struct RCTID
{
    public RCTID(bool newobj, Guid Lowval, uint Highval)
    {

      Guid  Low_0 = Lowval;
      uint High_10 = Highval;
      uint  Limit_14 = 0;
    }
}
public static SafeFileHandle CreateVHDChain(string vhd_path_child, string vhd_path_parent, string vhd_path_source, bool parentdisk, ulong DefaultDiskSizeNext, RCTID newrctid)
{
    VIRTUAL_STORAGE_TYPE vhd_type = new VIRTUAL_STORAGE_TYPE();
    vhd_type.DeviceId = StorageDeviceType.Vhdx;
    vhd_type.VendorId = VIRTUAL_STORAGE_TYPE_VENDOR_MICROSOFT;
    CreateVirtualDiskParameters ps = new CreateVirtualDiskParameters();
    ps.SectorSizeInBytes = 512;           
    ps.MaximumSize = DefaultDiskSize;           
    CreateVirtualDiskFlag  Flags = CreateVirtualDiskFlag.UseChangeTrackingSourceLimit;           
    ps.Version = CreateVirtualDiskVersion.Version3;
    ps.ParentPath = vhd_path_parent;
    ps.SourcePath = vhd_path_source;
    string SourceLimitPath = newrctid.ToString();              
    ps.SourceLimitPath = SourceLimitPath;               
    ps.UniqueId = Guid.NewGuid();         
    int error = CreateVirtualDisk(ref vhd_type, vhd_path_child, VirtualDiskAccessMask.None, null,
        Flags, 0, ref ps, IntPtr.Zero, out IntPtr hDisk);
    return new SafeFileHandle(hDisk, true);   
}
void __fastcall Rct::SequenceTable::ReadCompleteForQuery(struct AE_ENVIRON *a1, RctQueryRecursiveOperation *opref, struct AE_TODO *a3)
{
 while ( startidx < diff3fdminuscalc )
    {
      pagbufvalptr = pagebuf + 4 * startidx + 4 * startoffrefless3FD;
      currentoffsetbase0x1 = 1;
      for ( j = *(pagbufvalptr + 3); currentoffsetbase0x1 < diff3fdminuscalc - startidx; ++currentoffsetbase0x1 )
      {
        if ( *&pagbufvalptr[4 * currentoffsetbase0x1 + 0xC] != j )
          break;
      }
      ActiveSequenceNumberref = seqtbl->ActiveSequenceNumber_140;
      if ( j <= ActiveSequenceNumberref )
        ActiveSequenceNumberref = j;
      // fffff805`5038cb90 48895c2410      mov     qword ptr [rsp+10h],rbx
      // 2: kd> k
      //  # Child-SP          RetAddr               Call Site
      // 00 fffff609`b9e0e878 fffff805`5039c31a     vhdmp!VhdmpiRctQueryRecursiveCallback
      // 01 fffff609`b9e0e880 fffff805`5034a6ed     vhdmp!Rct::SequenceTable::ReadCompleteForQuery+0x2ba
      // 02 fffff609`b9e0e910 fffff805`5038caee     vhdmp!AeProcessTodo+0x7d
      // 03 fffff609`b9e0e970 fffff805`5038e30a     vhdmp!VhdmpiRctQueryRecursive+0x10a
      // 04 fffff609`b9e0ea50 fffff805`503ed0ca     vhdmp!VhdmpiQueryChangesSinceRctId+0x1c2
      // 05 fffff609`b9e0ec40 fffff805`503ed3bf     vhdmp!VhdmpiReadChangedData+0x8e
      // 06 fffff609`b9e0ee80 fffff805`503ed2bb     vhdmp!VhdmpiReadFromSource+0x47
      // 07 fffff609`b9e0eec0 fffff805`503fde09     vhdmp!VhdmpiPopulateVirtualDiskFromSource+0x11b
      // 08 fffff609`b9e0f060 fffff805`5042b0ed     vhdmp!VhdmpiVhd2FinalizeNewBackingStoreFile+0xd9
      // 09 fffff609`b9e0f160 fffff805`504249fb     vhdmp!VhdmpiCreateNewVhd+0xfc5
      // 0a fffff609`b9e0f3d0 fffff805`50426d18     vhdmp!VhdmpiCreateThread+0x19b
      // 0b fffff609`b9e0f470 fffff805`a3a5666a     vhdmp!VhdmpiAsyncOpThread+0x58
      // 0c fffff609`b9e0f4b0 fffff805`a3c74de4     nt!PspSystemThreadStartup+0x5a
      // 0d fffff609`b9e0f500 00000000`00000000     nt!KiStartSystemThread+0x34
      if ( !(opref->RctQueryRecursiveCallback_78)(
              opref,
              startidx + *startoffsetptr,
              currentoffsetbase0x1,
              ActiveSequenceNumberref) )
      {       
        break;
      }  
    }   
    Rct::SequenceTable::ContinueQuery(seqtbl, opref, a3);
}

```  
  
  
  
创建v3的虚拟磁盘api需要使用到一个称为RCTID的一共0x18字节大小结构体用于表示虚拟磁盘的差异追踪信息,当子磁盘创建时会去递归查找父虚拟磁盘的差异信息。  
  
  
需要把在v3结构体定义的字符串化的SourceLimitPath也是RCTID字段作为差异查找结束位置,成功操作后会把找到的匹配差异信息对应的磁盘数据从父磁盘拷贝的子磁盘。  
  
  
差异查找的具体实现逻辑在VhdmpiRctQueryRecursive函数中,首先比较Rct::Header的RctId是否与SourceLimitPath匹配,而差异的具体信息存在于.rct文件的Rct::SequenceTable结构体中通过一个SequenceNumber表示差异索引。  
  
  
Rct::SequenceTable在rct文件的偏移量0xa000开始分配,每个页面为0x400大小内容为4个字节的SequenceNumber头部和Rct::Header一样存在crc校验。  
  
  
且存在一个转换函数Rct::Header::RctIdToSequenceNumber将SequenceNumber转换为RctId。  
  
  
最终将小于目标SourceLimitPath的RctId值的SequenceNumber对应的实际数据在虚拟磁盘偏移位置和长度作为查找结果,完成后拷贝数据.通过对vhdmp.sys的逆向发现。  
  
  
这个漏洞的成因来源于一个类似于RctId查找实现MirrorVirtualDisk也是调用VhdmpiRctQueryRecursive查找2个虚拟磁盘相同位置差异追踪信息,用于拷贝镜像磁盘文件。  
  
  
这个虚拟磁盘api MirrorVirtualDisk需要用于两个相同预定义大小的虚拟磁盘的进行镜像操作。  
  
  
可以在镜像前使用参数SetVirtualDiskInfo的api创建与虚拟磁盘关联的.rct文件。  
  
  
镜像操作将同样同步两个相同大小的虚拟磁盘内容和弹性差异追踪信息。  
  
  
如果.rct文存在镜像操作通过调用VhdmpiPopulateRctFiles函数直接读取主虚拟磁盘rct文件。  
  
  
但是这里并不使用第二个虚拟磁盘rct信息而是调用truncate重置rct文件并将用主rct文件内容重写为相同内容。  
  
  
此时两个rct标头结构都是相同的rct:：header内容，分配的相关目标结构体缓冲区大小都是相同的,而且第二个虚拟磁盘rct是由内核以独占方式打开的,用户层无法篡改。  
  
  
但是这里存在一个例外情况,vhdx虚拟磁盘允许以smb共享文件路径创建,而文件的内容是完全由smb共享提供者控制的,即使文件以独占访问打开,smb共享提供者仍然可以篡改文件及其内容。  
  
  
在win11及以后的操作系统允许以smb quic的协议方式绑定本地smb文件共享端口,可以使用net.exe use \\yourip\vhdx /TRANSPORT:QUIC /SKIPCERTCHECK这样的命令创建一个smb挂载路径。  
  
  
然后从这个挂载路径创建虚拟磁盘对象,笔者开源了smb quic模式文件存储后端实现工程,使用这个工具为我们提供了一个新的攻击面,在不需要借助远程计算机创建smb共享的方式下就可以实现本地重放所有vhdx虚拟磁盘操作的所有数据包,并控制内容.第二个rct文件在truncate操作被写入主rct文件相同的数据,但之后的读取操作可以通过smb quic模式进行篡改，一旦对第二个rct文件调用Vhdmp内核函数PopulateRcTFiles。  
  
  
漏洞代码显示rct:∶SequenceTable->OffsetTableBuf_40=ExAllocatePool2（0x40i64，filesizecalc，'ms2V'）内存池分配使用第二个rct文件用户控制的Rct::Header->OffsetTableize_0长度进行分配。  
  
  
计算公式为rct:：header->OffsetTableize_0/0x3FD*8，这个rct:：header来自第二个test.rct文件，偏移量为0x1028，原始值与主rct文件中的值相同。  
  
  
但是这个值可以被篡改为一个非常小的值来创建较小的内存池分配，如果大小与主.rct文件值不匹配，镜像操作中并没有检查。  
  
  
VhdmpiPopulateRctFiles函数用于从主.Rct文件中读取OffsetTable开始偏移量0x9000后大小为0x1000的每个Rct:：OffsetEntry。  
  
  
如果Rct:∶OffsetEntry标头不为空且有效，则偏移量0xc的值作为4字节长度，bit的31位将确定是否为SequenceTable。  
  
  
如果该位已设置或为空SequenceTable页，则每个SequenceTable页条目将保存在Rct::SequenceTable->OffsetTableBuf_40缓冲区中，如果该位未设置则不保存。在之后的镜像操作VhdmpiCopyRctInformation函数将搜索的SequenceTable条目是否为空页，否则同步每个页所在io Segment数据偏移量和大小的数据段,并通过拷贝io镜像磁盘数据。  
  
  
在这里MirrorVirtualDisk会调用刚才说的VhdmpiCopyRctInformation函数也是从另一种回调实现VhdmpiRctQueryForCopyCallback调用VhdmpiRctQueryRecursive查找2个虚拟磁盘相同位置差异追踪信息。  
  
  
如果在查找之前目标Rct::SequenceTable时不存在符合验证的页面,调用Rct:：SequenceTable:：ContinueQuery函数。  
  
  
将使用默认的rct元数据的Rct::Header->ActiveSequenceNumber作为内容填充整个SequenceTable页面，当然这个SequenceNumber是符合要求的。  
  
  
这个过程将在回调返回一个Rct::SequenceTable::Range，其中包含io Segment也就是所在磁盘文件偏移量和大小。以便后续调用Rcts::SequenceTables::Update.这里如果OffsetTableize未被篡改，则Rct:的SequenceTable->OffsetTableBuf_40中的OffsetTable条目中存在符合条件要更新的io Segment。  
  
  
有足够的条目用于搜索SequenceTable；但是如果内存池分配被篡改的则分配的大小非常小。这将导致完成搜索后在Rct:：SequenceTable:：IsUpdatePresentInOffsetTable函数中。  
  
  
在这里引用超出边界的数据尝试获取包含一个LIST_ENTRY链接结构体,并判断是否为有效的内存引用取消链接这个链接结构体。  
  
  
如果超出边界的条目的内存池分配无效,或者不包含符合条件的链接结构体，则产生内存破坏导致操作系统内核崩溃。  
  
  
调试过程中复现以下分析结果。如果超出边界位置这个链接结构体使用堆喷由用户控制，则链接结构体值可能会被取消链接，从而导致可能的特权提升漏洞。但实际利用条件比较苛刻。  
  
  
```
char __fastcall Rct::SequenceTable::IsUpdatePresentInOffsetTable(Rct::SequenceTable *this, unsigned __int64 offset, __int64 len, int seq)
{
v4 = offset + len;
  idxlow = offset / 0x3FD;
  idxhigh = (offset + len - 1) / 0x3FD + 1;
  while ( idxlow < idxhigh )
  {
    fid = *&this->OffsetTableBuf_40[2 * idxlow].value_0;
    if ( __CFSHR__(fid, 2) )
      fidcfshr = fid >> 32;
    else
      LODWORD(fidcfshr) = -HIDWORD(fid[1].Blink);
    if ( fidcfshr != seq )
    {
      v11 = 0i64;
      LODWORD(v12) = 1021;
      if ( __CFSHR__(fid, 2) )
        return 0;
      if ( !fid )
        return 0;
      v13 = fid->Flink;     
      // out of  out of boundary write link entry
      if ( v13->Blink != fid
        || (v14 = fid->Blink, v14->Flink != fid)
        || (v14->Flink = v13,
            v13->Blink = v14,
            v15 = this->PageCachelinklist_80,
            v15->Flink != &this->PageCachelinklist_78) )
      {
        __fastfail(3u);
      }    
}
__int64 __fastcall Rct::SequenceTable::ConsumeOffsetTable(Rct::SequenceTable *this, __int64 OffsetTableize, struct Rct::Format::SequenceOffsetTablePage *rawbuf, ULONG a4, unsigned int ActiveSequenceNumber)
{
           //OffsetTableize in testchild.vhdx.rct  with offset 0x1028, is very small 
       int   filesizetrim =OffsetTableize / 0x3FD
        int   filesizecalc = 8i64 * filesizetrim;  
        //    OffsetTableBuf_40 will be  very small tampered by smb 
      this->OffsetTableBuf_40 =ExAllocatePool2(0x40i64, filesizecalc, 'ms2V');        
}
void __fastcall Rct::SequenceTable::ContinueQuery(Rct::SequenceTable *this, RctQueryRecursiveOperation *op, struct AE_TODO *a3)
{
   __int64 startoffset = op->startoffsetshr4page_68;
      cacheidx = startoffset / 0x3FD;    
    cahcheentry = *&this->OffsetTableBuf_40[2 * cacheidx].value_0;
    if ( (cahcheentry & 1) != 0 )
    {
      v12 = this->pagerawbuf_20;
      v13 = 0x3FDi64;
      ACTSEQ = HIDWORD(cahcheentry);  
      v16 = v12 + 3;
      while ( v13 )
      {
        *v16++ = ActiveSequenceNumber;
        --v13;
      }
      *v12 = cacheidx;     
      op->completerouting_10 = Rct::SequenceTable::ReadCompleteForQuery;
      void __fastcall Rct::SequenceTable::ReadCompleteForQuery(struct AE_ENVIRON *a1, RctQueryRecursiveOperation *opref, struct AE_TODO *a3)
     {
      AeUseAndPushCompletion(this->UseCompletiontimer_0, a3, op);
      //call VhdmpiRctQueryForCopyCallback
         if ( !(opref->RctQueryRecursiveCallback_78)(
              opref,
              startidx + *opref->startoffsetshr4page_68,
              fidlen,
              ActiveSequenceNumberref) )
         }
       char __fastcall VhdmpiRctQueryForCopyCallback(struct VHD_RCT_STATE *a1, struct RctQueryRecursiveOperation *a2, __int64 nextoffset, unsigned int len, unsigned int actseq)
      {
       struct Rct::SequenceTable::Range *rng;
       rng->rangebuf[idx].offset_8 = nextoffset;
        rng->rangebuf[idx].len_10 = fidlen;
      }
       v12 = Rct::SequenceTable::Update(&mmiorrct->seqtbl_a88, v25, rng, opcount, 0, v22, v16);
       Rct::SequenceTable::IsUpdatePresentInOffsetTable(
            this,
            rng[idxfrom0].offset_8,
            rng[idxfrom0].len_10,
            rng[idxfrom0].rctidseq_0)
    }
}

```  
  
##   
## CVE-2025-24048 漏洞分析  
  
```
__int64 __fastcall Rct::OffsetEntry::FilePage(Rct::PageCacheEntry *offsettableentry)
{
  __int64 result; // rax

  if ( (offsettableentry & 2) != 0 )
    result = -offsettableentry->high4;
  else
    result =  -offsettableentry->next1c;;
  return result;
}
__int64 __fastcall Rct::SequenceTable::ConsumeOffsetTable(Rct::SequenceTable *this, __int64 OffsetTableize, struct Rct::Format::SequenceOffsetTablePage *rawbuf, ULONG a4, unsigned int ActiveSequenceNumber)
{
      int  offsettableidx=0;
      byte*  rawbufplus8 = (rawbuf + 8);
      // *(rawbufplus8 - 2) != 0x7066666F in file.rct
      while ( *(rawbufplus8 - 2) != 0x7066666F
           || *rawbufplus8 != offsettableidx
           || *(rawbufplus8 - 1) != AeComputeCrc32C(0i64, rawbufplus8, 0xFF8i64) )
      {
      rawbuf+=0x1000;
      offsettableidx++;
      }
       __int64 filesizetrim =OffsetTableize>>a=OffsetTableize/400;
        _int64 RctFreeSpacesize=filesizetrim/8=filesizetrim as bits
       int  result = Rct::FreeSpace::Initialize(&this->FreeSpace_188, v16, RctFreeSpacesize, v18);
       //rawbufref is from .rct file offset 9000
       int offsettableidx=7;
        Rct::OffsetEntry offsettableentry;
        rawbufref is from .rctfile offset 9000 
       offsettableentry_high4   = *(rawbufref + offsettableidx *0x1000 +0xc);
       int offsettableval = ~*(offsettableentry_high4);             
       offsettableentry_low0= (offsettableval >> 31) | 2;
        *&Rct::SequenceTable *this->OffsetTableBuf_40[SequenceTableidx].value_0 = offsettableentry;
        if ( (offsettableentry->low0 & 1) == 0 )
        {         .   
           int     negoffsettableentry_high4 = Rct::OffsetEntry::FilePage(&this->OffsetTableBuf_40[OffsetTableidx]);
           FreeSpaceAfter = *this->FreeSpaceAfter_198;
        if ( negoffsettableentry_high4 < FreeSpaceAfter
                 //_bittest64 FreeSpaceBitSearchFilePage out of  out of boundary Bitmap Buffer this->FreeSpace_188.Buffer
        || (FreeSpaceBitSearchFilePage = negoffsettableentry_high4 - FreeSpaceAfter, !_bittest64(this->FreeSpace_188.Buffer, FreeSpaceBitSearchFilePage)) )
        {
        goto  exit;
        }
            //_bittestandreset  out of  out of boundary
            _bittestandreset(this->FreeSpace_188.Buffer, FreeSpaceBitSearchFilePage);
      }
}

```  
  
  
  
这个漏洞相对比较简单,以上漏洞代码显示，vhdmp.sys驱动在处理rct文件的SequenceTable时,调用 Rct::FreeSpace::Initialize初始化剩余空间BitMap缓冲区内存池分配。  
  
  
内存池大小计算公式为OffsetTableize>>a=OffsetTableize/400/8个bit位,其中Rct:∶Header->OffsetTableize_0偏移量为0x1028在rct文件。  
  
  
可以在偏移量0x7000（offsettableidx*0x1000）+0x9000（OffsetTable开始偏移量）处插入一个rct:：OffsetEntry,这个条件需要.rct文件实际文件大小必须大于（0xa+rct:：Header->OffsetTableize/0x100000）*0x1000。  
  
  
如果.rct文件已通过头部和大小验证,则调用VhdmpiPopulateRctFiles函数读取偏移0x9000后0x1000大小的每个rct:∶OffsetEntry表从.rct文件。  
  
  
如果Rct:∶OffsetEntry标头不为空且有效，则偏移量0xc的值作为4字节长度，bit的31位将确定是否为SequenceTable,和上面一节描述的相同。  
  
  
如果设置了Rct:：OffsetEntry的31位，则该条目是负值的Rct::OffsetEntry::FilePage，保存在this->OffsetTableBuf_40[SequenceTableidx].value_0。  
  
  
这种类型的条目会在后续的Rct::OffsetEntry::FilePage调用中读取这个条目的高4位,也就是取反的在rct文件中的Rct:∶OffsetEntry高4位的值,这个值可以被设置为大于BitMap缓冲区位图大小的任意值。  
  
  
这将调用_bittest64测试超出这个BitMap越界测试位图的位是否被设置,如果满足bittest越界测试位置的位设置为1的条件，则下一条指令_bittestadreset将该位重置为零,从而触发触发越界写入。  
  
  
否则控制流将不会进入越界写入分支.可以将这个值设置位很大的0x7ffff5,这个将导致越界bittest不存在的内存区域导致操作系统内核崩溃,也可以使用将0x7ff5作为这个条目较小的值,如果满足越界测试条件。  
  
  
则该内存位置位重置为零,可以使用windbg命令观察内存变化:bp vhdmp!Rct::SequenceTable::ConsumeOffsetTable+0x27c "dq r10+(rdx/8)",在调试中可见地址ffffab89'3fe60b9e中的内容的第5位将从fffffff'ffffffffFFF'变为fffffff'ffffff df，  
越界写入后不会导致操作系统内核崩溃。  
  
  
```
8: kd> r
rax=0000000000000009 rbx=ffffab893aef6a88 rcx=000000000007fff5
rdx=000000000007fff5 rsi=0000000000000009 rdi=ffffab8937bc5008
rip=fffff8001ab9a475 rsp=fffffe0ab31177f0 rbp=0000000000002019
 r8=ffffab8941a20f58  r9=0000000000000000 r10=ffffab893fe50ba0
r11=0000000000001beb r12=0000000000000000 r13=0000000000001c00
r14=0000000056df8af7 r15=0000000000000007
iopl=0         nv up ei pl nz na po nc
cs=0010  ss=0018  ds=002b  es=002b  fs=0053  gs=002b             efl=00040206
vhdmp!Rct::SequenceTable::ConsumeOffsetTable+0x271:
fffff800`1ab9a475 490fa30a        bt      qword ptr [r10],rcx ds:002b:ffffab89`3fe50ba0=fffffffffffffe00
8: kd> ?000000000007fff5/8
Evaluate expression: 65534 = 00000000`0000fffe
// r10=ffffab893fe50ba0
8: kd> ?ffffab893fe50ba0+0000fffe
Evaluate expression: -92869005800546 = ffffab89`3fe60b9e
8: kd> dq  ffffab89`3fe60b9e    //same as  dq r10+(rdx/8)
ffffab89`3fe60b9e  ffffffff`ffffffff ffffffff`ffffffff
8: kd> p
vhdmp!Rct::SequenceTable::ConsumeOffsetTable+0x27c:
fffff800`1ab9a480 410fb312        btr     dword ptr [r10],edx
8: kd> dq  ffffab89`3fe60b9e //same as  dq r10+(rdx/8)
ffffab89`3fe60b9e  ffffffff`ffffffdf ffffffff`ffffffff

```  
  
  
  
如果在用户模式下使用堆喷将当前_KTHREAD地址的PreviousMode位的偏移量作为位测试写入位置，则该位值为用户模式UserMode=1。满足越界写入的条件。  
  
  
PrevousMode位可以重置为KernelMode=0，从而导致可能的特权提升漏洞。但实际情况堆喷稳定性的成功率较低利用条件比较苛刻。  
  
## 漏洞复现  
  
笔者漏洞poc采用.net程序复现,出于安全原因笔者不能提供完整的poc代码，下图是笔者在的Win11 24h2物理机上成功复现了CVE的利用效果。  
  
  
![pic](https://mmbiz.qpic.cn/sz_mmbiz_jpg/1UG7KPNHN8GFNYQwyWra9j7Tjys29yn4Ga6UDI8NYSwVY4Y9Fr8tGYt5ZiceF4YoL2yRIPsHrGrAf4ZDx1PjPqg/640?wx_fmt=other&from=appmsg "")  
##   
## 结论  
  
分析了hyper-v虚拟磁盘驱动vhdmp.sys相关的漏洞重现了篡改虚拟磁盘相关文件导致操作系统内核崩溃bsod或特权提升的利用过程。  
  
## 相关引用  
  
Smb Quic重放工具  
  
Smb Quic重放工具项目  
  
CVE-2025-24048致谢  
  
CVE-2025-24050致谢  
  
CVE-2023-36408致谢  
  
  
  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/1UG7KPNHN8GFNYQwyWra9j7Tjys29yn4LU84MzMiadMIKFlZSFB73Fy7kBAqfRGUpHjAGxoDKjibEyEROaMxY5RQ/640?wx_fmt=png&from=appmsg "")  
  
  
看雪ID：王cb  
  
https://bbs.kanxue.com/user-home-609565.htm  
  
*本文为看雪论坛精华文章，由 王cb 原创，转载请注明来自看雪社区  
  
  
  
# 往期推荐  
  
1、[一种基于unicorn的寄存器间接跳转混淆去除方式](https://mp.weixin.qq.com/s?__biz=MjM5NTc2MDYxMw==&mid=2458590669&idx=1&sn=347a710061251090dc435a48bdd6fb9f&scene=21#wechat_redirect)  
  
  
2、[白盒SM4的DFA方案](https://mp.weixin.qq.com/s?__biz=MjM5NTc2MDYxMw==&mid=2458590658&idx=1&sn=11669207623d692b44ee642f202caddf&scene=21#wechat_redirect)  
  
  
3、[VNCTF-2025-赛后复现](https://mp.weixin.qq.com/s?__biz=MjM5NTc2MDYxMw==&mid=2458590589&idx=1&sn=9a4e01c36963a74c187f2be20cbc75a8&scene=21#wechat_redirect)  
  
  
4、[IDA Pro 9 SP1 安装和插件配置](https://mp.weixin.qq.com/s?__biz=MjM5NTc2MDYxMw==&mid=2458590590&idx=1&sn=a486a8746e896216e849a748351a8ea9&scene=21#wechat_redirect)  
  
  
5、[初探 android crc 检测及绕过](https://mp.weixin.qq.com/s?__biz=MjM5NTc2MDYxMw==&mid=2458590565&idx=1&sn=755a5d7753e8ae9721c994111c34d6ce&scene=21#wechat_redirect)  
  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8GFNYQwyWra9j7Tjys29yn4J1HoOVGGBVaicCribicylsF2PCqgdicp3xqhRNQGGE0fcibicjkGesdA1QzQ/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8GFNYQwyWra9j7Tjys29yn4J1HoOVGGBVaicCribicylsF2PCqgdicp3xqhRNQGGE0fcibicjkGesdA1QzQ/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8GFNYQwyWra9j7Tjys29yn4J1HoOVGGBVaicCribicylsF2PCqgdicp3xqhRNQGGE0fcibicjkGesdA1QzQ/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8GFNYQwyWra9j7Tjys29yn40XKIGUKog2EZ8UTMepiaoicOYhXlQUH9ajrGDQzugmY6w66HgrZ7mhFg/640?wx_fmt=gif&from=appmsg "")  
  
点击阅读原文查看更多  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
