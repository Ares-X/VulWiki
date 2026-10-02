---
source: "MrWQ/vulnerability-paper"
product: "VMware multi-product Log4Shell advisory"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "VMware 多个产品 Log4j2 RCE"
prerequisites: "来源所述条件，未列明部分仍待核：Lists36 product families without release/build ranges; historical temporary mitigation status undated"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/ThSxC22JsrRE50N21WR24Q"
id: "vw-c040025a5fcffa461bdbea60"
entity_id: "ve-c040025a5fcffa461bdbea60"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Lists36 product families without release/build ranges; historical temporary mitigation status undated

代码与实验材料：Request entirely screenshot; only DNSLOG observation described, not code execution

来源证据范围：WeChat original and VMware advisory link

- **适用与权限边界（1）**：Observed DNS lookup does not establish RCE across all listed products；依据：未授权...远程命令执行 versus DNSLOG收到回显。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：No date/affected-build matrix; 暂时只有漏洞缓解措施 is stale-prone。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# VMware 多个产品 Log4j2 RCE

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/ThSxC22JsrRE50N21WR24Q)

**点击蓝字 ·  关注我们**

**01**

漏洞简述

Apache  Log4j2 是一款 Apache 软件基金会的开源基础框架, 用于 Java 日志记录的工具。日志记录主要用来监视代码中变量的变化情况，周期性的记录到文件中供其他应用进行统计分析工作；跟踪代码运行时轨迹，作为日后审计的依据；担当集成开发环境中的调试器的作用，向文件或控制台打印代码的调试信息。其在 JAVA 生态环境中应用极其广泛, 影响巨大。

VMware 众多产品受此漏洞影响，VM 可在未授权的情况下达到远程命令执行的效果。

**02**

受影响产品

  

```
VMware Horizon
VMware vCenter Server
VMware HCX
VMware NSX-T Data Center
VMware Unified Access Gateway
VMware WorkspaceOne Access
VMware Identity Manager`
VMware vRealize Operations
VMware vRealize Operations Cloud Proxy
VMware vRealize Log Insight
VMware vRealize Automation
VMware vRealize Lifecycle Manager
VMware Telco Cloud Automation
VMware Site Recovery Manager
VMware Carbon Black Cloud Workload Appliance
VMware Carbon Black EDR Server
VMware Tanzu GemFire
VMware Tanzu Greenplum
VMware Tanzu Operations Manager
VMware Tanzu Application Service for VMs
VMware Tanzu Kubernetes Grid Integrated Edition
VMware Tanzu Observability by Wavefront Nozzle
Healthwatch for Tanzu Application Service
Spring Cloud Services for VMware Tanzu
Spring Cloud Gateway for VMware Tanzu
Spring Cloud Gateway for Kubernetes
API Portal for VMware Tanzu
Single Sign-On for VMware Tanzu Application Service
App Metrics
VMware vCenter Cloud Gateway
VMware Tanzu SQL with MySQL for VMs
VMware vRealize Orchestrator
VMware Cloud Foundation
VMware Workspace ONE Access Connector
VMware Horizon DaaS
VMware Horizon Cloud Connector
(Additional products will be added)
```

**03**

漏洞证明

找到一个 VM 服务，发送 payload

![图片](https://mmbiz.qpic.cn/mmbiz_png/rJALXSMzgenMe36pZKCxSwwbibbrgVN1YribgMRItpveyGhuOF7NevQWoicOOzj9K5LZwWFib2oF5Rg2nPWDDnA0yA/640?wx_fmt=png)

![图片](https://mmbiz.qpic.cn/mmbiz_png/rJALXSMzgenMe36pZKCxSwwbibbrgVN1YlIOeFqRAtfaYrDIM6icibNTCwwYrzrXrKSK7jvO1UrCTvedaOVicaklZg/640?wx_fmt=png)

DNSLOG 收到回显

**04**

漏洞修复

VM 官方针对不同产品给力对应的补丁，暂时只有漏洞缓解措施，还请继续关注其补丁更新。

```
https://www.vmware.com/security/advisories/VMSA-2021-0028.html
```

**EDI 安全**

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/rJALXSMzgenMe36pZKCxSwwbibbrgVN1YK8ictr3oIeIVT9wUwjW9PdzS7dWDDaHBdQTeI73skSZJ5Vao8SF47Pg/640?wx_fmt=jpeg)

**扫二维码｜关注我们**

一个专注渗透实战经验分享的公众号

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
