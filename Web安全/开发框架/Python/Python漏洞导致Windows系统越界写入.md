---
source: "gelusus/wxvl 公众号漏洞文库"
product: "CPython/Windows asyncio"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-3298"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Python漏洞导致Windows系统越界写入"
prerequisites: "来源所述条件，未列明部分仍待核：未列任何受影响/修复版本；Windows3.8默认Proactor不等于该API从3.8均受影响"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-347d7da0fc13f7deb4dc078a"
entity_id: "ve-347d7da0fc13f7deb4dc078a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未列任何受影响/修复版本；Windows3.8默认Proactor不等于该API从3.8均受影响

代码与实验材料：nbytes与buffer边界概述，没有调用、样本或崩溃证据

来源证据范围：声称官方邮件公告，只有CVE地址文本无公告链接

- **适用与权限边界（1）**：边界检查描述方向易错；依据：根因是nbytes可能大于真实buffer，结尾却称不超过nbytes定义的缓冲区大小，需区分两者。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（2）**：影响被泛化为所有Windows网络服务；依据：实际要调用sock_recvfrom_into并给不安全nbytes，默认事件循环并不能证明可达。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Python漏洞导致Windows系统越界写入  
 网安百色   2026-04-27 11:06  
  
![](../../.resource/remote/db57bd5417d0c8f88cca505267112fece1b5d8b6cb5f096b2b343ac2b5f9a16b.png "")  
  
在Python的asyncio模块中发现了一个高危安全漏洞，该漏洞存在于Windows系统上，可能允许攻击者向已分配内存缓冲区的边界之外写入数据。  
  
该漏洞被追踪为CVE-2026-3298，由Python安全开发者Seth Larson于2026年4月21日通过官方Python安全公告邮件列表公开披露。  
  
该漏洞存在于asyncio.ProactorEventLoop的sock_recvfrom_into()方法中，这是一个Windows特定的事件循环实现，用于异步I/O操作。  
  
根本原因是当使用可选的nbytes参数时，数据缓冲区缺少边界检查。  
  
当网络响应超过预分配的缓冲区大小时，Python无法强制执行大小限制，导致多余数据覆盖相邻的内存区域。  
  
这类被称为越界（OOB）写入的漏洞特别危险，因为它可能导致内存损坏、应用程序崩溃，或根据被覆盖的内存内容潜在地执行任意代码。  
  
**此漏洞仅影响Windows系统**  
。Linux、macOS和其他基于Unix的平台使用不同的事件循环后端（SelectorEventLoop），完全不受影响。  
  
运行依赖基于asyncio网络功能的Python应用程序的Windows用户，特别是那些在sock_recvfrom_into()中使用nbytes参数的用户，面临风险。  
  
该漏洞尤其与以下场景相关：  
- 由Windows托管的Python Web服务器和API后端  
- 使用UDP套接字操作的异步网络应用程序  
- 任何将可变长度网络数据接收至固定大小缓冲区的服务  
Python安全团队将此漏洞评为**高危**  
级别。越界写入漏洞经常在内存损坏攻击中被利用，它们出现在像asyncio这样被广泛使用的标准库组件中，显著提高了生产环境中Windows部署的风险等级。  
  
修复程序已通过GitHub拉取请求148809提交至CPython代码仓库。该补丁引入了缺失的边界检查，确保接收到的数据不能超过由nbytes参数定义的缓冲区大小。  
  
Windows上的Python用户应：  
- 在cve.org/CVERecord?id=CVE-2026-3298监控官方CVE记录以获取修补版本详情  
- 在更新版Python发布后立即应用  
- 在修补之前，暂时避免在不受信任的网络环境中使用带有nbytes参数的sock_recvfrom_into()  
自Python 3.8起，asyncio.ProactorEventLoop已成为Windows上的默认事件循环，这使得该漏洞在广泛的现代Python部署中都具有相关性。  
  
建议在Windows上构建面向网络应用程序的开发人员优先应用此补丁。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](../../.resource/remote/cc9dd7fb5b24fc27ce16bb1e9985b3b85c989e00551dbfad66f86d1e7499d3f3.webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
