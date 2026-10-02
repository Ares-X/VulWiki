---
cve: "CVE-2024-56334"
source: "gelusus/wxvl 公众号漏洞文库"
product: "systeminformation npm包/Windows"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-56334"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "命令注入漏洞使数百万Node.js系统面临攻击"
prerequisites: "来源所述条件，未列明部分仍待核：文称<=5.23.6，5.23.7修复；Windows调用网络信息且恶意SSID进入处理链"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-f9393af0ce006e19d3856283"
entity_id: "ve-f9393af0ce006e19d3856283"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：文称&lt;=5.23.6，5.23.7修复；Windows调用网络信息且恶意SSID进入处理链

代码与实验材料：给SSID样例和networkInterfaces调用，演示特权依宿主服务身份

来源证据范围：无研究或官方公告链接，仅作者归档来源

- **结论使用边界（1）**：安装数量与运行时暴露混淆；依据：标题数百万Node.js系统，下载量不能证明存在Windows受影响调用。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：RCE和提权需要明确环境前提；依据：恶意热点/SSID可见性或连接方式、服务权限与函数调用条件未锁定；不会自动获得比进程更高权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  命令注入漏洞使数百万Node.js系统面临攻击   
HackSee安全团队  HackSee   2024-12-24 08:10  
  
在广泛使用的Node.js系统信息包中发现了一个严重的命令注入漏洞（CVE-2024-56334），该信息包每月下载量超过800万次，总下载量达到惊人的3.3亿次。此漏洞可能允许攻击者执行任意操作系统命令，可能导致远程代码执行（RCE）或特权升级，具体取决于软件包的使用情况。  
  
该漏洞源于getWindowsIEEE8021x函数中的命令注入漏洞，该函数用于检索网络SSID信息。在将SSID作为参数传递给cmd.exe之前，此函数无法正确消毒SSID。因此，攻击者可以在Wi-Fi网络的SSID中嵌入恶意命令，然后在调用getWindowsIEEE8021x函数时在易受攻击的系统上执行这些命令。  
  
安全研究人员xAiluros发现了CVE-2024-56334漏洞，并通过在Windows服务中升级特权来展示其潜在影响。攻击者可以通过创建带有恶意SSID的Wi-Fi热点来利用此漏洞。当一个易受攻击的系统连接到这个网络时，可以执行嵌入在SSID中的攻击者的命令，从而可能导致远程代码执行或特权升级。  
  
两个有效载荷示例展示了利用的潜力：  
  
SSID: a " | ping /t 127.0.0.1 &  
  
SSID: a " | %SystemDrive%\a\a.exe &  
  
一旦连接到恶意Wi-Fi网络，使用该软件包在应用程序中执行易受攻击的功能，例如：  
```
const si = require('systeminformation');
si.networkInterfaces((net) => { console.log(net) });
```  
  
可以触发攻击，在受害者的机器上运行有效载荷。  
  
“systeminformation”的5.23.6及以下版本受此漏洞影响。维护者已经发布了5.23.7版本，解决了这个问题。强烈建议此软件包的所有用户立即更新到最新版本。  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
