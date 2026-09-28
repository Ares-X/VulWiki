---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Google Project Zero 研究人员发现针对三星设备的零点击漏洞   
会杀毒的单反狗  军哥网络安全读报   2025-01-11 01:03  
  
**导****读**  
  
  
  
网络安全研究人员详细介绍了目前已修补的安全漏洞，该漏洞影响三星智能手机上的Monkey Audio (APE) 解码器，可能导致代码执行。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/AnRWZJZfVaEI5fQDUTBdhSm4rsfmjj8Yhw2rDTcJw5vXCdiaM7ypTrqvWBeLh9gPQfYOlmU7iaictZwGvrH0F96cw/640?wx_fmt=png&from=appmsg "")  
  
该漏洞编号为CVE-2024-49415，CVSS 评分：8.1，影响运行 Android 12、13 和 14 版本的三星设备。  
  
  
三星在 2024 年 12 月作为其每月安全更新的一部分发布的针对该漏洞的公告中表示： “SMR Dec-2024 Release 1 之前的 libsaped.so 中的越界写入允许远程攻击者执行任意代码。”“该补丁添加了正确的输入验证。”  
  
  
发现并报告该缺陷的 Google Project Zero 研究员 Natalie Silvanovich 将其描述为无需用户交互即可触发（即零点击）并且在特定条件下是一个“有趣的新攻击面”。  
  
  
三星 S24 上的 Monkey's Audio (APE) 解码器中存在越界写入。libsaped.so 中的 saped_rec 函数写入由 C2 媒体服务分配的 dmabuf，该 dmabuf 的大小似乎始终为 0x120000。虽然 libsapedextractor 提取的最大块/帧值也限制为 0x120000，但如果输入的每个样本的字节数为 24，saped_rec 最多可以写入 3 * 块/帧字节。  
  
  
“这意味着块/帧大小较大的 APE 文件可能会严重溢出此缓冲区。” Silvanovich 写道。“请注意，如果 Google Messages 配置为 RCS（此设备上的默认配置），那么这是三星 S24 上的一个完全远程（0 次点击）错误，因为转录服务会在用户与消息交互以进行转录之前解码传入的音频。”  
  
  
攻击者可以通过 Google Messages 向启用了 RCS 的设备发送特制的音频消息来利用此漏洞，从而导致设备的媒体编解码器进程（“samsung.software.media.c2”）崩溃。  
  
  
研究人员指出，该漏洞会导致 DMA 缓冲区溢出，但其可利用性尚不清楚，因为非 DMA 数据似乎分配在相邻的缓冲区中。  
  
  
三星 2024 年 12 月的补丁还解决了 SmartSwitch 中的另一个高严重漏洞 ( CVE-2024-49413，CVSS 评分：7.1)，该漏洞可能允许本地攻击者利用不正确的加密签名验证来安装恶意应用程序。  
  
  
2024 年 10 月，谷歌威胁分析小组 (TAG)警告称，三星  
0day   
漏洞 CVE-2024-44068  
    
（CVSS 评分为 8.1），已被野外利用。  
  
  
该漏洞是一个释放后使用问题，攻击者可以利用该漏洞在易受攻击的 Android 设备上提升权限。  
  
  
该漏洞存在于三星移动处理器中，据专家称，该漏洞与其他漏洞相结合，可在易受攻击的设备上实现任意代码执行。  
  
  
三星于 2024 年 10 月发布安全更新解决了该漏洞。  
  
  
谷歌Project Zero漏洞披露：  
  
https://project-zero.issues.chromium.org/issues/368695689  
  
  
三星官方安全公告  
:  
  
https://security.samsungmobile.com/securityUpdate.smsb  
  
  
新闻链接：  
  
https://thehackernews.com/2025/01/google-project-zero-researcher-uncovers.html  
  
https://securityaffairs.com/172909/hacking/samsung-zero-click-flaw.html  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/AnRWZJZfVaGC3gsJClsh4Fia0icylyBEnBywibdbkrLLzmpibfdnf5wNYzEUq2GpzfedMKUjlLJQ4uwxAFWLzHhPFQ/640?wx_fmt=jpeg "")  
  
扫码关注  
  
军哥网络安全读报  
  
**讲述普通人能听懂的安全故事**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
