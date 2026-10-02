---
source: "wy876 漏洞文库"
id: "vw-fe0bf3fd6c3a5a88743bfb0f"
entity_id: "ve-fe0bf3fd6c3a5a88743bfb0f"
schema_version: "1"
title: "NetMizer 日志管理系统存在目录遍历漏洞"
product: "NetMizer日志管理系统"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给版本、鉴权或Web服务器配置"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/NetMizer/NetMizer%E6%97%A5%E5%BF%97%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hqxda6dxd5064rpt"
source_status: "recorded"
---

# NetMizer 日志管理系统存在目录遍历漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NetMizer日志管理系统
- 本文讨论：data目录列表暴露候选
- 版本、权限与配置前提：未给版本、鉴权或Web服务器配置
- 资料类型：目录暴露摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅/data/地址，无路径穿越序列或响应，正文不足支持目录遍历定性
- 缺泄露文件范围及修复资料

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 目录索引配置、可读文件及越界能力未证明
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
北京灵州网络技术有限公司NetMizer日志管理系统存在目录遍历漏洞，由于 /data 控制不严格，攻击者可利用该漏洞获取敏感信息。

### 二、影响版本
<font style="color:#000000;">NetMizer</font>

### 三、资产测绘
```plain
title="NetMizer 日志管理系统"
```


### 四、漏洞复现
```plain
/data/
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hqxda6dxd5064rpt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
