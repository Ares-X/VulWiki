---
cve: "CVE-2025-23166"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Node.js 异步加密错误处理不当漏洞(CVE-2025-23166)   
原创 聚焦网络安全情报  安全聚   2025-05-15 10:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Icw1mW4eH3fGjq28SHy79SEcdRGT7ZsCxicdkcJevVicIVGdZBR0dYjze8G3YwUEkcH9WgQ1KhficepoIpSk64Atw/640?wx_fmt=gif&from=appmsg "")  
  
  
**中**  
  
**危**  
  
**公**  
  
**告**  
  
  
  
近日，安全聚实验室监测到 Node.js 存在异步加密错误处理不当漏洞 ，编号为：CVE-2025-23166，CVSS:5.3  攻击者可以通过构造特定的异常输入，导致 Node.js 进程崩溃。  
  
  
**01 漏洞描述**  
  
  
  
**VULNERABILITY DESC.**  
  
  
  
  
Node.js是一个基于Chrome V8引擎的JavaScript运行时环境，用于构建快速、可扩展的网络应用程序。作为一个轻量级且高效的平台，Node.js使得使用JavaScript开发服务器端应用变得更加容易。Node.js的模块化架构和丰富的包管理系统（npm）也为开发人员提供了丰富的工具和库。该漏洞是由于后台线程中的 C++ 方法处理不受信任的输入时，未正确验证参数，导致未捕获的异常，进而使 Node.js 进程崩溃。由于此类加密操作常涉及外部输入，攻击者可构造恶意数据远程触发该漏洞，实现拒绝服务。  
  
  
**02 影响范围**  
  
  
  
**IMPACT SCOPE**  
  
  
  
  
Node.js < 20.19.2  
  
Node.js < 22.15.1  
  
Node.js < 23.11.1  
  
Node.js < 24.0.2  
  
**03 安全措施**  
  
  
  
**SECURITY MEASURES**  
  
  
  
  
目前厂商已发布可更新版本，建议用户尽快更新至   
Node.js 的修复版本或更高的版本：  
  
  
Node.js >= 20.19.2  
  
Node.js >= 22.15.1  
  
Node.js >= 23.11.1  
  
Node.js >= 24.0.2  
  
  
下载链接：  
  
https://nodejs.org/en/blog/release  
  
  
**04 参考链接**  
  
  
  
**REFERENCE LINK**  
  
  
  
  
1.  
https://nodejs.org/en/blog/vulnerability/may-2025-security-releases#improper-error-handling-in-async-cryptographic-operations-crashes-process-cve-2025-23166---high  
  
  
**05 技术支持**  
  
  
  
**TECHNICAL SUPPORT**  
  
  
  
  
长按识别二维码，关注 **"安全聚"**  
 公众号！如有任何问题或需要帮助，随时联系我们的技术支持团队。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Icw1mW4eH3fGjq28SHy79SEcdRGT7ZsCBTiaicF2ia4P7iaZMaM3OPbrLG64Lia2tjS9TrSyn4FOS5D2o1vIfCEf8Cw/640?wx_fmt=jpeg&from=appmsg "")  
  
**联系我们**  
  
微信号：SecGat  
  
关注安全聚，获取更多精彩文章。  
  
  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Icw1mW4eH3fGjq28SHy79SEcdRGT7ZsCRtb8nIoYiadnGwptIJHdeGVOEEFuibuXZBhMvw8OmlsMJB7kG0zuazgA/640?wx_fmt=gif&from=appmsg "")  
  
**END**  
  
  
  
  
**HISTORY**  
  
/  
  
**往期推荐**  
  
[【漏洞库支撑单位】成为CNNVD漏洞库支撑单位，助力网络安全！申请全流程解读，专业团队助您高效通过](https://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486661&idx=1&sn=bde83cb31639f48a4db14ef0d3d49291&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警 | 已复现】Vite 任意文件读取漏洞（CVE-2025-31486）](https://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486667&idx=1&sn=0aa6e0b666110b7eb82210b769e8e216&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警 | 已复现】Windows TCP/IP 远程执行代码漏洞（CVE-2024-38063）](https://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486614&idx=1&sn=dc1e21747d876cf3bf58ade5a6b64cab&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警 | 已复现】FOGPROJECT 文件名命令注入漏洞（CVE-2024-39914）](https://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486405&idx=1&sn=dfa7ce2bc783c81365d21815a76f39c7&scene=21#wechat_redirect)  
  
  
  
[【漏洞预警 | 已复现】Next.js Middleware权限绕过漏洞（CVE-2025-29927）](https://mp.weixin.qq.com/s?__biz=MzkyNzQzNDI5OQ==&mid=2247486651&idx=1&sn=debd2daa82821a0e5c0217ad2d5bfee2&scene=21#wechat_redirect)  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
