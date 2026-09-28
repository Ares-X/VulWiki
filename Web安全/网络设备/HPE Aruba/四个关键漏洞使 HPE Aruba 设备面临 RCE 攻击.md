---
cve: "CVE-2024-26304"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  四个关键漏洞使 HPE Aruba 设备面临 RCE 攻击   
 船山信安   2024-05-06 00:00  
  
HPE Aruba Networking（以前称为 Aruba Networks）已发布安全更新，以解决影响 ArubaOS 的严重缺陷，这些缺陷可能导致受影响系统上的远程代码执行 （RCE）。  
  
在 10 个安全缺陷中，有 4 个严重程度被评为严重性严重 -  
- CVE-2024-26304（CVSS 评分：9.8） - 通过 PAPI 协议访问的 L2/L3 管理服务中未经身份验证的缓冲区溢出漏洞  
  
- CVE-2024-26305（CVSS 评分：9.8） - 通过 PAPI 协议访问的实用程序守护程序中未经身份验证的缓冲区溢出漏洞  
  
- CVE-2024-33511（CVSS 评分：9.8） - 通过 PAPI 协议访问的自动报告服务中存在未经身份验证的缓冲区溢出漏洞  
  
- CVE-2024-33512（CVSS 评分：9.8） - 通过 PAPI 协议访问的本地用户身份验证数据库中未经身份验证的缓冲区溢出漏洞  
  
威胁参与者可以通过发送发往进程应用程序编程接口 （PAPI） UDP 端口 （8211） 的特制数据包来利用上述缓冲区溢出错误，从而获得在底层操作系统上以特权用户身份执行任意代码的能力。  
  
这些漏洞会影响 Mobility Conductor（以前称为 Mobility Master）、Mobility Controllers 以及由 Aruba Central 管理的 WLAN 网关和 SD-WAN 网关，这些漏洞存在于以下软件版本中：  
- ArubaOS 10.5.1.0 及更低版本  
  
- ArubaOS 10.4.1.0 及更低版本  
  
- ArubaOS 8.11.2.1 及更低版本，以及  
  
- ArubaOS 8.10.0.10 及更低版本  
  
它们还会影响已达到维护结束状态的 ArubaOS 和 SD-WAN 软件版本 -  
- ArubaOS 10.3.x.x  
  
- ArubaOS 8.9.x.x 操作系统  
  
- ArubaOS 8.8.x.x 操作系统  
  
- ArubaOS 8.7.x.x  
  
- ArubaOS 8.6.x.x  
  
- ArubaOS 6.5.4.x  
  
- SD-WAN 8.7.0.0-2.3.0.x 和  
  
- SD-广域网 8.6.0.4-2.2.x.x  
  
一位名叫 Chancen 的安全研究人员发现并报告了 10 个问题中的 7 个，包括 4 个关键的缓冲区溢出漏洞。  
  
建议用户应用最新的修复程序来缓解潜在威胁。作为 ArubaOS 8.x 的临时解决方法，该公司建议用户使用非默认密钥启用增强型 PAPI 安全功能。  
  
来源：【黑客新闻】  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
