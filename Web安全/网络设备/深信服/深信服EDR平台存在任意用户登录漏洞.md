---
source: "wy876 漏洞文库"
id: "vw-16f21a940b58235a385477d1"
entity_id: "ve-16f21a940b58235a385477d1"
schema_version: "1"
fofa_unverified: "<font style="
title: "深信服EDR平台存在任意用户登录漏洞"
product: "Sangfor EDR"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "版本未给，useradmin示例"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8DEDR%E5%B9%B3%E5%8F%B0%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/iz3fn97qincapxmq"
source_status: "recorded"
---

# 深信服EDR平台存在任意用户登录漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor EDR
- 本文讨论：ui/login.php user认证绕过
- 版本、权限与配置前提：版本未给，useradmin示例
- 资料类型：登录绕过URL摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- fofa元数据与正文font标签污染且双查询缺操作符
- 无响应/权限效果/修复，较339/342信息更少
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 具体版本及账号存在性待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
 深信服终端检测响应平台EDR,通过云网端联动协同、威胁情报共享、多层级响应机制,帮助用户快速处置终端安全问题,构建轻量级、智能化、响应快的下一代终端安全系统。该EDR系统存在任意用户登录漏洞，攻击者通过漏洞可以登录系统后台并获取服务器的敏感信息。

# 二、影响版本
+ 深信服EDR

# 三、资产测绘
+ fofa`<font style="color:rgba(0, 0, 0, 0.9);">app="SANGFOR-EDR"</font>``<font style="color:rgba(0, 0, 0, 0.9);">title="终端检测响应平台"</font>`


# 四、漏洞复现
```plain
/ui/login.php?user=admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/iz3fn97qincapxmq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
