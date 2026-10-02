---
source: "wy876 漏洞文库"
product: "Grafana/匿名访问与metrics暴露"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Grafana存在未授权访问漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：未说明版本、匿名角色或metrics配置"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8512ed9bff137bc0eba3001a"
entity_id: "ve-8512ed9bff137bc0eba3001a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未说明版本、匿名角色或metrics配置

代码与实验材料：只列/?orgId=1与/metrics，没有响应或认证对照

来源证据范围：wy876及语雀

- **适用与权限边界（1）**：路径存在不能证明认证绕过；依据：仪表板匿名策略和metrics暴露是两个不同权限面，未说明受保护资源、预期拒绝与实际允许；笼统称绕过前端认证。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Grafana存在未授权访问漏洞

# 一、漏洞描述
Grafana是一个开源的可视化和分析平台，一个通用的可视化工具。‘通用’意味着Grafana不仅仅适用于展示Prometheus下的监控数据，也同样适用于一些其他的数据可视化需求。Grafana存在未授权访问漏洞，未经身份验证的用户可以绕过前端安全认证，未授权访问通过登录页面访问系统仪表板区域。

# 二、影响版本
Grafana

# 三、资产测绘
```plain
app="Grafana"
```


# 三、漏洞复现
```plain
/?orgId=1
```


```plain
/metrics
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/iwh76cslo7q2l2wy>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
