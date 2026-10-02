---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-d57d37691431c5670b6be7c9"
entity_id: "ve-d57d37691431c5670b6be7c9"
schema_version: "1"
title: "TP-Link DHCP 拒绝服务 PoC（代码执行影响待核）"
product: "TP-Link VN020-F3v(T)"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2024-11237"
referenced_identifiers: ""
prerequisites: "TT_V6.2.1021；无认证但须DHCP服务可达，本地/中继边界未明确"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/TP-Link/%E3%80%90poc%E3%80%91TP-Link%20%E4%B8%AD%E7%9A%84%20DHCP%20%E6%BC%8F%E6%B4%9E%E5%8F%AF%E8%AE%A9%E6%94%BB%E5%87%BB%E8%80%85%E8%BF%9C%E7%A8%8B%E6%8E%A5%E7%AE%A1%E8%B7%AF%E7%94%B1%E5%99%A8%20-%20PoC%20%E5%8F%91%E5%B8%83.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# TP-Link DHCP 拒绝服务 PoC（代码执行影响待核）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TP-Link VN020-F3v(T)
- 本文讨论：CVE-2024-11237 DHCP处理
- 版本、权限与配置前提：TT_V6.2.1021；无认证但须DHCP服务可达，本地/中继边界未明确
- 资料类型：黑盒DoS研究新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题远程接管与正文仅确认DoS、RCE可能不一致
- 声明无固件代码却画确定64字节/EBP布局，图应标示意假设不能当实测栈证据
- 其他国家固件受影响未给型号版本或来源
- 已落实的文本修订：标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- PoC真实结果、CWE定性和官方补丁状态需来源确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

 独眼情报   2024-11-18 08:20  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KgxDGkACWnRgwGibBzMGHIzX1hyt9P2m6Eotqw3tQdxTbyQtheRfl2lEPLftJjtSravocdQUxmXXReaGGugiaNGg/640?wx_fmt=jpeg&from=appmsg "")  
  
TP-Link VN020-F3v(T)路由器固件版本为 TT_V6.2.1021，发现一个严重的安全漏洞，攻击者可以远程接管设备，导致 DoS 攻击甚至 RCE 攻击。  
  
该漏洞被编号为**CVE-2024-11237**  
 ，允许攻击者通过发送特制的**DHCP DISCOVER**  
数据包来利用**基于堆栈的缓冲区溢出**   
，这可能导致路由器崩溃并无响应。  
  
有进一步确认的报告显示阿尔及利亚和摩洛哥客户使用的版本也存在类似漏洞，突尼斯电信和 Topnet ISP 对部署受影响的路由器负有主要责任。  
  
有问题的固件是专有的，因此无法获得内部实现细节。不过，通过观察行为和黑盒测试，安全研究人员已经能够识别出该漏洞的影响。  
## 漏洞技术分析  
  
该漏洞被标识为 CVE-2024-11237，是一个基于堆栈的缓冲区溢出 (CWE-121)，可以通过 DHCP DISCOVER 数据包远程利用。  
  
它会影响在 UDP 端口 67 上运行的 DHCP 服务器，并且无需身份验证即可利用。此漏洞的影响包括确认的拒绝服务 (DoS)，并可能存在远程代码执行 (RCE)。攻击复杂度较低，使其成为攻击者破坏或控制受影响系统的可访问目标。  
  
该漏洞源于路由器处理 DHCP 主机名和供应商特定选项的方式存在缺陷。具体而言，路由器无法正确处理过大或格式错误的输入，从而导致缓冲区溢出。  
  
  
具体来说，攻击者可以发送一个包含过长主机名或操纵的供应商特定选项的特制 DHCP DISCOVER 数据包，直接触发溢出。  
  
研究人员已经  
确定了  
几种潜在的攻击媒介和触发溢出的方法。  
  
攻击者可以通过各种技术利用路由器 DHCP 处理中的漏洞。一种方法是发送带有过长主机名（超过 127 个字符）的 DHCP 请求，这可能导致缓冲区溢出。此溢出可能会覆盖关键内存位置，从而可能导致设备崩溃。  
  
另一种技术针对 DHCP 数据包中供应商特定选项的操纵。通过精心设计这些选项并造成选项数据声称的长度与实际长度不匹配，攻击者可以利用此漏洞破坏路由器的运行。  
  
  
此外，还可以利用声称的数据包长度与实际数据包长度之间的差异，导致内存损坏并进一步破坏设备稳定性。这些方法凸显了 PoC 中 DHCP 处理中未修补漏洞的潜在  
风险  
。  
## 潜在的内存损坏  
  
尽管内部固件代码仍然无法访问，但观察到的症状表明路由器的内存可能在攻击期间被破坏，从而导致**堆栈溢出**  
。  
```
Stack Layout (Normal Case)
+------------------------+ Higher addresses
|     Previous Frame     |
+------------------------+
|   Return Address (4)   |
+------------------------+
|    Saved EBP (4)       |
+------------------------+
|                        |
|   Hostname Buffer      |
|      (64 bytes)        |
|                        |
+------------------------+ Lower addresses
|    Other Variables     |
+------------------------+
```  
  
这可能允许攻击者覆盖路由器的返回地址和其他关键内存位置，从而导致不稳定甚至允许远程代码执行。  
```
Stack Layout (Overflow Case)
+------------------------+ Higher addresses
|     Previous Frame     |
+------------------------+
|   Overwritten Return   | 
+------------------------+
|   Overwritten EBP      | <- Unknown state corruption
+------------------------+
|     Overflow Data      | <- 127 bytes of 'A'
|         ...            |
+------------------------+ Lower addresses
|    Other Variables     | <- Potentially corrupted
+------------------------+
```  
  
利用这些漏洞可能会对网络功能造成严重影响。一旦受到攻击，路由器可能会失去响应，导致互联网连接完全中断。  
  
依赖路由器的 DHCP 服务获取 IP 地址的设备可能无法连接到网络，从而进一步加剧中断。  
  
在许多情况下，路由器在崩溃后会尝试自动重新启动；但是，仍可能需要手动干预才能恢复功能。  
  
这可能会导致网络停机时间延长，尤其是在多个设备依赖路由器的 DHCP 服务的环境中，从而导致广泛的用户不便。  
## 缓解措施和建议  
  
目前，TP-Link尚未发布官方补丁修复该漏洞，在此期间，建议用户采取以下缓解措施降低漏洞利用风险：  
- **禁用 DHCP 服务器**  
：如果不需要 DHCP 服务，用户可以在路由器设置中禁用它，以防止攻击。  
  
- **实施 DHCP 流量过滤**  
：网络管理员可以在网络边缘过滤 DHCP 流量以阻止恶意数据包。  
  
- **考虑替代路由器**  
：如果可能，请考虑切换到不受此漏洞影响的替代路由器型号。  
  
**PoC:**  
> https://github.com/Zephkek/TP-Thumper  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
