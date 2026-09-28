---
cve: "CVE-2025-31200"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  zero-day点击远程漏洞攻击链 - 可绕过 iOS 加密信任（已在 iOS 18.4.1 中修复）  
 Ots安全   2026-01-21 05:01  
  
**威胁简报**  
  
  
**恶意软件**  
  
  
**漏洞攻击**  
  
概括  
  
针对iOS 18.4 及更低版本的零日零点击漏洞利用链，通过 iMessage 发送恶意 MP4 音频文件，利用已知的发送者上下文绕过了 BlastDoor 和 Blackhole 的安全防护。该文件会触发 CoreAudio 堆损坏CVE-2025-31200，并通过 AppleBCMWLAN 驱动程序中 AMPDU 处理不当，最终导致内核执行CVE-2025-31201。攻击者获得内核访问权限后，即可CryptoTokenKit使用安全隔离区支持的密钥执行各种操作——所有操作均无需用户交互。  
  
注意：仅修复了iOS 18.4.1 的CVE-2025-31200漏洞；CVE-2025-31201下游对 CryptoTokenKit 和 Secure Enclave 密钥的滥用问题仍未得到解决。  
  
主要影响：绕过加密信任模型  
  
尽管加密密钥没有被导出，但攻击者利用安全隔离区支持的密钥对未经授权的数据进行签名，有效地破坏了苹果的身份和消息认证机制。  
  
这使得：  
- Apple 服务中的设备冒充  
  
- 伪造身份绑定令牌  
  
- 滥用端到端加密假设  
  
- 使用受信任密钥进行不受信任的签名操作  
  
这破坏了苹果公司加密信任模型的完整性；不是通过解密密文，而是通过盗用合法密钥进行未经授权的使用。  
  
受影响版本  
- iOS 版本：18.4 及以下  
  
- 已修复版本：iOS 18.4.1  
  
受影响的组成部分（直接影响与间接影响）  
  
直接利用/易受攻击  
- AudioConverterService（CoreAudio） — AAC 解码器堆损坏，格式错误inMagicCookie（CVE-2025-31200）。  
  
- AppleBCMWLAN.dext（Wi-Fi 驱动程序） — AMPDU 状态处理不当导致内核权限提升（CVE-2025-31201）。  
  
- CryptoTokenKit— 未经授权的签名操作在系统遭到入侵后，使用安全隔离区支持的密钥执行。  
  
抵押品/杠杆组件（观察到的活动或影响）  
- IMTransferAgent/imagent — 附件解密和物化（显示文件已到达本地解码器）。  
  
- identityservicesd/IDS — 与签名滥用相关的对等查找、令牌验证和密钥管理活动。  
  
- AWDL/ Apple Wireless Direct Link (com.apple.madrid) — 用于显示/验证令牌的对等发现/广告途径。  
  
- mediaplaybackd// AVFoundation—WebKit (WKWebView) HLS/变体切换和 WebKit GPU 解码路径与播放不稳定和 PME 触发有关。  
  
- audiomxd/ 音频子系统— PME 强制执行日志和 AP ↔ 协处理器连接尝试显示在此处。  
  
- AppleDCP/ GPU (AppleDCPDPTXController) — PME 事件期间的 ALPM/getLinkData 故障和 GPU 链路错误。  
  
- powerd/ PME / 电源管理跟踪` — 电源状态转换和执行失败。  
  
- launchd//system supervisor ReportMemoryException SoC 停顿症状表明系统受到影响。  
  
- keychaind/ secd/ CloudKeychainProxy(关键服务) — 受下游签名/令牌滥用影响。  
  
- IO80211ControllerMonitor/ IO80211interfaces — 与 AMPDU 异常相关的驱动程序/内核接口日志。  
  
注意：该漏洞虽然直接影响一小部分组件，但随着故障的传播，会影响许多子系统。  
  
漏洞利用概述  
  
1. 通过已知发件人绕过 iMessage 保护  
  
恶意音频文件来自一个已知的联系人，在已观察到的案例中，这导致 iMessage 过滤和沙箱机制被绕过（BlastDoor/Blackhole 防护措施未生效）。这使得附件能够被自动处理（无需点击），并交给系统服务进行解码。  
  
日志：  
  
```
IDSDaemon    BlastDoor: Disabled for framing messagesSpamFilter Blackhole disabled; user has disabled filtering unknown senders.
```  
  
  
观察到的行为：设备锁定时处理了消息（无需用户交互）。  
  
2. CoreAudio 中的堆损坏 ( CVE-2025-31200)  
  
格式错误的 MP4 音频文件会通过提供无效的解码器参数（inMagicCookie）和格式错误的编解码器元数据，触发 CoreAudio 的 AAC 解码器内部的堆/内存损坏。日志显示解码器接收到标准的 AAC 输入格式，但inMagicCookie大小无效，这是导致损坏的直接原因，随后会引发内核权限提升，并且在观察到的案例中，还会导致 PME 强制执行失败。  
  
日志：  
  
```
AudioConverterService ACMP4AACBaseDecoder.cpp: Input format:2 ch, 44100 Hz, aacAudioConverterService ACMP4AACBaseDecoder.cpp: inMagicCookie=0x0, inMagicCookieByteSize=39
```  
  
  
重要性：  
  
该inMagicCookie字段包含 AAC 解码器使用的编解码器配置数据；无效的大小或格式错误的内容会导致不安全的解析和堆损坏。确认输入格式（声道数/采样率/编解码器）有助于响应者在不暴露漏洞利用原语的情况下重现解码器状态。  
  
2.a PME 执行失败——硬件互连和电源管理的影响  
  
播放格式错误的 MP4 文件触发了电源管理实体 (PME) 强制执行失败，阻止了应用程序处理器和协处理器（例如 Wi-Fi、蓝牙、GPU）之间的正确互连，导致变体切换循环、GPU/驱动程序错误，并最终导致设备范围停顿。  
  
日志：  
  
```
audiomxd: Connection between ports Application Processor and <CO-PROC_PORT> not allowed due to property inclusion policy Require PME Enabledkernel: DCPAV[PID] AppleDCPDPTXController::getLinkDataGated getALPMEnabled failedmediaplaybackd: FigAlternate/HLS variant switching loop detectedmediaplaybackd: Repeated playback switch -> stalllaunchd: ReportMemoryException -> power state collapse / SoC stall
```  
  
  
这件事的重要性：  
- PME 日志显示系统拒绝了 AP <-> 协处理器连接，因为 PME 未启用，这表明在媒体解码期间发生了不正确的电源状态转换。  
  
- GPU/DCP 和媒体播放错误证实了解码失败后变体切换不稳定和死锁行为。  
  
- launchd 内存异常和 SoC 停顿表明，其影响范围远超进程崩溃——硬件/电源协调崩溃，需要供应商审查固件/PME。  
  
3. IMTransferAgent 解密并呈现音频附件  
  
CoreAudio 开始处理后，IMTransferAgent 会解密音频文件并将其写入磁盘以进行进一步处理——这证明附件已到达本地解码器和系统处理管道。  
  
日志：  
  
```
IMTransferAgent Succeeded decrypting input URL: file:///var/mobile/tmp/com.apple.messages/<GUID_REDACTED>/.../<FILE_REDACTED>.m4a
```  
  
  
4. 通过 AppleBCMWLAN 进行内核权限提升 ( CVE-2025-31201)  
  
CoreAudio 的内存损坏是通过错误的 AMPDU 状态处理链接到 AppleBCMWLAN Wi-Fi 驱动程序的。该驱动程序无法处理意外的 AMPDU 状态类型，导致内存损坏转化为内核代码执行，最终造成系统完全瘫痪。  
  
日志：      
  
```
IO80211ControllerMonitor::setAMPDUstat unhandled kAMPDUStat_ type14IO80211ControllerMonitor::setAMPDUstat unhandled kAMPDUStat_ type13
```  
  
  
4.a 观察到无线对等体操纵（AWDL /   
madrid  
）  
  
根据内核级异常情况，identityservicesd 日志显示，无线对等节点发现和令牌状态被用于识别或验证设备身份。这种行为可能促进了下游密钥操作和 CryptoTokenKit 签名活动。  
  
```
IDSDaemon identityservicesd: Noting peer token {shouldNoteToken: YES, token: <TOKEN_REDACTED>, service: com.apple.madrid, fromIdentifier: <ID_REDACTED>}PeerLookup_DBCache identityservicesd: DB Cache Hit { service: com.apple.madrid, fromURI: <URI_REDACTED>, toURI: <URI_REDACTED> }PeerLookup_SwiftData identityservicesd: Checking peer token: <TOKEN_REDACTED>for URI: <URI_REDACTED> (Tokens:<REDACTED>)PeerLookup_SwiftData identityservicesd: => Good togo, we have it
```  
  
  
这件事的重要性：  
- 这表明攻击者如何利用对等发现和缓存令牌来验证或操纵设备身份。  
  
- 这建立了无线/驱动程序异常与后续身份和签名操作之间的联系。  
  
5. 通过 CryptoTokenKit 未经授权使用安全隔离区密钥  
  
攻击者利用内核控制，identityservicesd通过 CryptoTokenKit 使用安全隔离区支持的密钥，冒充用户并调用加密签名操作。虽然没有导出任何密钥材料，但签名请求无需用户授权即可执行，从而可以伪造身份令牌并冒充设备。  
  
```
identityservicesd Decrypting message <GUID_REDACTED> of encryption type"pair-tetra"identityservicesd begins key management operations (sending/receiving decryption keys)identityservicesd Query for encryption with IDs of remote/local devicesCryptoTokenKit operation:2 algo:algid:sign:ECDSA:digest-X962:SHA256CryptoTokenKit <sepk:p256(d) kid=<KID_REDACTED>> parsed for identityservicesd
```  
  
  
这些条目证实了未经授权的签名活动（算法和操作），并将内核转移与滥用安全隔离区支持的密钥直接联系起来，从而在不提取密钥的情况下破坏了服务级身份验证。  
  
影响概要  
- 加密隔离被破解：不受信任的代码调用了安全隔离区支持的密钥来执行签名操作，而没有用户授权（密钥没有导出，但其权限被滥用）。  
  
- 设备冒充和令牌伪造：合法的身份令牌和签名可能被伪造，从而可以在 Apple 服务中进行冒充。  
  
- 服务级认证遭到破坏：身份、消息传递和认证服务所使用的信任假设遭到破坏，降低了系统级完整性。  
  
- 零点击远程入侵：无需用户交互即可远程触发整个入侵链，从而增加入侵规模和运营风险。  
  
- 系统稳定性/硬件影响：在观察到的案例中，畸形介质还会引发 PME 强制执行失败和 GPU/介质路径死锁，从而导致 SoC 停滞或设备范围冻结（拒绝服务类影响）。  
  
建议  
  
对 CryptoTokenKit 强制执行内核后认证。即使是特权调用者，在调用密钥绑定操作之前也应该进行验证。  
  
对所有邮件应用 BlastDoor 和 Blackhole 保护。不要根据发件人状态绕过检查。  
  
对编解码器输入进行清理。必须严格验证解码器参数（例如，inMagicCookie）的输入。  
  
确保内核暴露的驱动程序接口安全。即使在内存损坏后，也能强化无线和 AMPDU 处理，防止格式错误的输入。  
  
通过运行时完整性强制措施隔离签名操作。即使调用者上下文遭到破坏，加密签名 API 也应验证进程完整性和权限。  
  
参考：  
  
https://github.com/JGoyd/iOS-Attack-Chain-CVE-2025-31200-CVE-2025-31201/tree/main  
  
**END**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/rWGOWg48taeC4M3pg4ia9BBKA0IFToyFwawK9Iw1G5Q8uOGRXicMG6xzicYyoZPTibLe0STN3uatwAgibYxjEaBCEnw/640?wx_fmt=jpeg&from=appmsg "")  
  
  
公众号内容都来自国外平台-所有文章可通过点击阅读原文到达原文地址或参考地址  
  
排版 编辑 | Ots 小安   
  
采集 翻译 | Ots Ai牛马  
  
公众号 |   
AnQuan7 (Ots安全)  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
