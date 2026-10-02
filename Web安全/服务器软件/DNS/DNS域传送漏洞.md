---
source: "Threekiii/Awesome-POC"
title: "DNS域传送漏洞"
product: "DNS AXFR；实验BIND9"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "权威DNS允许未经授权来源AXFR且TCP53可达；掌握区域名"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8e8d31eba2738c4f85a40be7"
entity_id: "ve-8e8d31eba2738c4f85a40be7"
schema_version: "1"
---

# DNS域传送漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：权威DNS允许未经授权来源AXFR且TCP53可达；掌握区域名
- 证据范围：清楚表明非BIND专属；属于配置错误，不应分配泛化产品CVE

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- DNS支持TCP/UDP不代表AXFR同时走UDP，应明确AXFR传送TCP
- 所有子域名记录应限定本区域可传送记录，不含未知委派区域全部内容
- 预期结果图位置空白，compose环境路径缺失

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

DNS协议支持使用axfr类型的记录进行区域传送，用来解决主从同步的问题。如果管理员在配置DNS服务器的时候没有限制允许获取记录的来源，将会导致DNS域传送漏洞。

axfr：DNS Zone Transfer Protocol (AXFR)，dns的全量更新协议，dns主从架构更新，从向主获取zone的全量数据，由主返回axfr消息，全量刷新该zone的slave信息。

参考链接：

- https://www.acunetix.com/blog/articles/dns-zone-transfers-axfr/
- https://nmap.org/nsedoc/scripts/dns-zone-transfer.html

## 环境搭建

Vulhub使用[Bind9](https://wiki.debian.org/Bind9)来搭建dns服务器，但不代表只有Bind9支持AXFR记录。运行DNS服务器：

```shell
docker-compose up -d
```

环境运行后，将会监听TCP和UDP的53端口，DNS协议同时支持从这两个端口进行数据传输。

## 漏洞复现

在Linux下，我们可以使用dig命令来发送dns请求。比如，我们可以用`dig @your-ip www.vulhub.org`获取域名`www.vulhub.org`在目标dns服务器上的A记录：



发送axfr类型的dns请求：`dig @your-ip -t axfr vulhub.org`



可见，获取到了`vulhub.org`的所有子域名记录，这里存在DNS域传送漏洞。

也可以用nmap script来扫描该漏洞：`nmap --script dns-zone-transfer.nse --script-args "dns-zone-transfer.domain=vulhub.org" -Pn -p 53 your-ip`


---

> 来源：Threekiii/Awesome-POC
