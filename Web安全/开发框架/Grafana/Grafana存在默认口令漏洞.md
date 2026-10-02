---
source: "wy876 漏洞文库"
product: "Grafana/部署弱口令风险"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Grafana存在默认口令漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：无版本边界；仅初始默认凭据未修改等配置状态"
side_effects: "未执行；本文需注意的操作影响：把默认初始化凭据标成全产品漏洞；影响版本仅Grafana，没有未修改口令前提、是否强制首次修改或认证配置"
source_status: "unknown"
id: "vw-73b944c93919bbb6e5524522"
entity_id: "ve-73b944c93919bbb6e5524522"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本边界；仅初始默认凭据未修改等配置状态

代码与实验材料：只有admin/admin，没有登录请求/响应或默认密码修改流程

来源证据范围：wy876及语雀

- **凭据与会话边界（1）**：把默认初始化凭据标成全产品漏洞；依据：影响版本仅Grafana，没有未修改口令前提、是否强制首次修改或认证配置。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Grafana存在默认口令漏洞

# 一、漏洞描述
Grafana是一个开源的可视化和分析平台，一个通用的可视化工具。‘通用’意味着Grafana不仅仅适用于展示Prometheus下的监控数据，也同样适用于一些其他的数据可视化需求。Grafana存在默认口令漏洞

# 二、影响版本
Grafana

# 三、资产测绘
```plain
app="Grafana"
```


# 三、漏洞复现
```plain
admin/admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/frrsz6mukggncnm8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
