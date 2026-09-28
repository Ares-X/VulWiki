---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Windows BitLocker漏洞允许攻击者远程执行恶意代码  
Rhinoer
                    Rhinoer  犀牛安全   2026-09-16 16:00  
  
![](https://mmbiz.qpic.cn/mmbiz_png/vO1zY1O9p8KP0hlNp6rqFcicVUmChYYTDwXgVL8ORFbIicc5chJJ8gTicqpSZKS0XtPtmq3O1g5TRzyw9WYa7O9ibiapg5vo3yWmz4du8aQEh7cQ/640?wx_fmt=png&from=appmsg "")  
  
微软披露了Windows BitLocker（操作系统内置的磁盘加密功能）中一个新的安全漏洞，该漏洞可能允许攻击者在易受攻击的设备上执行恶意代码。  
  
该漏洞被追踪为 CVE-2026-69449，于 2026 年 9 月 8 日发布，源于 BitLocker 代码中的基于堆的缓冲区溢出，其严重性被评为“重要”，微软担任分配的 CNA。  
## Windows BitLocker漏洞  
  
根据微软的公告，利用此漏洞的授权攻击者可以在本地执行任意代码；该公司的常见问题解答指出，网络内部的攻击者也可以通过调用任意端点来利用此漏洞，从而将风险扩大到纯粹的本地攻击面之外。  
  
尽管存在代码执行风险，但微软的漏洞利用指数目前将 CVE-2026-69449 评为“利用可能性较低”。该漏洞在此安全公告发布前并未公开披露，截至 9 月 8 日发布之日，也未发现任何实际利用该漏洞的案例。  
  
微软赞扬了香港理工大学的 Thanatos Tian、wgg 以及与 Diffract 合作的 @2st__ 等安全研究人员，还有华中科技大学的彭志强，他们通过协调披露的方式负责任地报告了这一漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/vO1zY1O9p8LQ7qjwUNmich345SianiaiaEBiamDE30L8QnPP7Vkd0VH7RTCSby1dTQ0eOrria2jtjQcL4hJ6KsjXeqWujaH8zRl3B9a6UIj8LQSLc/640?wx_fmt=png&from=appmsg "")  
  
受影响的系统包括：Windows 10 版本 1607、1809、21H2 和 22H2（x64 和 32 位版本）；Windows 11版本 23H2、24H2、25H2 和更新的 26H1（x64 和 ARM64 架构）；以及 Windows Server 2012 和 2012 R2 到 Server 2016、2019、2022 和最新的 Server 2025 版本，包括它们的 Server Core 安装变体。  
  
作为2026 年 9 月“补丁星期二”计划的一部分，微软已经发布了针对每个受影响版本的累积安全更新。  
  
根据平台的不同，修复程序通过不同的 KB 程序包分发，例如 Windows 11 26H1 系统的 KB5124012、Windows Server 2025 的 KB5122871、Windows Server 2022 的 KB5122882、Windows Server 2019 的 KB5122876 以及涵盖 Windows Server 2016 和旧版 Windows 10 1607 版本的 KB5123099 等，这些程序包列于官方更新目录中。  
  
鉴于 BitLocker 在保护企业机群、笔记本电脑和服务器上的敏感数据方面发挥着重要作用，IT 管理员应优先部署相关的 2026 年 9 月累积更新，不得拖延。  
  
  
信息来源：C  
yberSecurityNews  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
