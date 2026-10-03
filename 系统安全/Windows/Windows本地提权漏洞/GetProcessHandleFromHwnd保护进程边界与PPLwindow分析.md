---
schema_version: "1"
id: "VW-20261003-NATIVE-03"
title: "Windows GetProcessHandleFromHwnd 保护进程边界与 PPLwindow 本地演示"
product: "Microsoft Windows win32kfull.sys / GetProcessHandleFromHwnd"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: "CVE-2023-41772"
identifier_status: "unknown"
version: "PPLwindow 作者声明 Windows 10 1809 至 Windows 11 23H2；逐版本、架构及策略组合未由本库验证"
fixed_version: "研究者确认 Windows 11 24H2 加入保护级别检查；25H2 另有特性标志路径差异；不是对每个配置的保证"
prerequisites: "本地代码执行；目标保护进程产生可定位窗口且位于可访问桌面；旧版 UIPI 条件满足；演示使用 WerFaultSecure.exe、oplock 时序和 x64 payload"
side_effects: "创建并挂起保护进程、锁住系统 DLL 读取、分配和改写远程内存及线程栈、弹框；失败路径可能终止新建进程或辅助线程"
source: "James Forshaw / Google Project Zero；Sascha Mayer / R41N3RZUF477"
source_status: "recorded"
source_url: "https://projectzero.google/2026/02/gphfh-deep-dive.html"
verification_source: "https://github.com/R41N3RZUF477/PPLwindow/tree/351d5230d0b219fe28f96a2b3b88a2992701c3bc"
---

# GetProcessHandleFromHwnd 的保护进程边界

2026-10-03 已阅读研究正文、固定提交的 C 源码、项目文件和演示截图，没有编译或执行。此项具备公开源码级 PoC，但属于本地保护边界突破，不能称为远程 RCE，也不能新分配或误复用 CVE-2023-41772。

## 机制与范围

Project Zero 的 API 历史分析指出：进入内核实现后，旧路径在通过桌面/UIPI 检查时以 `KernelMode` 打开目标进程，绕过常规进程对象访问检查。保护进程若建立窗口也可能成为目标。CVE-2023-41772 对 UIAccess 分支的修复没有同时消除所有相同/更高完整性级别路径；它在本文仅为历史关联编号。

PPLwindow README 声明适用 Windows 10 1809 至 Windows 11 23H2，并称其演示无需管理员权限。这个范围是作者声明，不能从项目中列有 Win32 配置推导已支持每个架构。源码携带 x64 指令载荷，实测截图也是 AMD64。Windows 10 1809 / Server 2019 的作者说明还要求另行提供 Windows 10 21H2 / Server 2022 的 WerFaultSecure.exe 与 wer.dll；本次没有下载或验证这些系统二进制。

## 两份公开材料的能力不同

[Project Zero 的研究](https://projectzero.google/2026/02/gphfh-deep-dive.html) 给出启动保护进程、寻找窗口和取得句柄的路径，最终内存执行留给读者；因此不能仅凭该段把完整利用标为公开。

但[固定提交的 PPLwindow.c](https://github.com/R41N3RZUF477/PPLwindow/blob/351d5230d0b219fe28f96a2b3b88a2992701c3bc/PPLwindow/PPLwindow.c) 确实继续实现了本地演示：

1. 创建挂起的 WerFaultSecure.exe，利用 windows.storage.dll 的 oplock 扩大窗口定位时间
2. 找到 `WerFaultWndClass` 后调用 `GetProcessHandleFromHwnd`
3. `PlacePayload` 分配远程内存；`OverwriteBaseThreadInitPointer` 读取线程栈并改写目标指针；写入 MessageBoxA 演示载荷后恢复进程

所以该仓库应归类为“公开本地代码执行演示”，不只是句柄获取。其[原始截图](https://github.com/R41N3RZUF477/PPLwindow/blob/351d5230d0b219fe28f96a2b3b88a2992701c3bc/pplwindow.png) 已查看：显示 Windows 10.0.22631.6199、`Shellcode delivered!`、`!PPLwindow PoC!` 弹框及 `Full (WinTcb)` 属性。这是作者图像证据，不是本库实测。

## 静态依赖及副作用

已读 `PPLwindow.c`、`OpLock.c`、`OpLock.h`、`.slnx`、`.vcxproj` 和 filters。[项目文件](https://github.com/R41N3RZUF477/PPLwindow/blob/351d5230d0b219fe28f96a2b3b88a2992701c3bc/PPLwindow/PPLwindow.vcxproj) 指定 Windows SDK 10.0、工具集 v145，导入本机 MSBuild C++ 配置；未发现该项目内下载依赖或自定义构建执行事件，但这不是对本机工具链的信任背书。

源代码未见网络连接或持久化安装逻辑；其进程、内存、oplock 和线程操作有状态且可能失败。代码为新建子进程指定 CET shadow-stack 关闭策略，不能误说它只调用一个只读查询 API。某些错误路径会终止新建进程，oplock 辅助线程超时也会被终止。源码中的若干错误检查和栈布局假设未做运行验证；不能保证弹框成功率或无崩溃。

若以后获得隔离测试授权，证据应分别记录句柄访问权、保护级别、载荷实际执行及修复版对照，并用快照恢复残留进程状态。本次未进行这些测试，也不把重新配置系统安全策略作为常规验证前提。

## 修复边界与来源

[James Forshaw，2026-02-26](https://projectzero.google/2026/02/gphfh-deep-dive.html) 说明 Windows 11 24H2 加入目标保护级别检查，更新路径还受 `UIPIAlwaysOn`、`ResponsiblePid` 特性标志影响；其 25H2 观察不是所有机器的统一配置保证。Windows 10 的确切后续补丁覆盖需另查实际分支，本次未取得完整厂商回补矩阵。

[Sascha Mayer 的公开仓库](https://github.com/R41N3RZUF477/PPLwindow/tree/351d5230d0b219fe28f96a2b3b88a2992701c3bc) 支持 PoC、版本声明、构建要求及图片证据。固定提交未见许可证文件，本文仅提供原创分析、少量标识符与源码链接，没有复制完整工程。
