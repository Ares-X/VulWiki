---
source: "wy876 漏洞文库"
id: "vw-adadc49d33e37d096bb77bed"
entity_id: "ve-adadc49d33e37d096bb77bed"
schema_version: "1"
title: "海康威视iSecure Center综合安防管理平台 config.properties信息泄漏漏洞"
product: "Hikvision iSecure Center"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "只有路径，认证/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86iSecureCenter%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0config.properties%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/uwdr74gfask18f9t"
source_status: "recorded"
previous_fofa_unverified: "查询语法：**"
hunter: "app.name==\"Hikvision 海康威视 iSecure Center\""
---

# 海康威视iSecure Center综合安防管理平台 config.properties信息泄漏漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iSecure Center
- 本文讨论：portal/conf/config.properties公开配置
- 版本、权限与配置前提：只有路径，认证/版本未知
- 资料类型：配置泄露线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 正文获取等敏感信息缺具体字段，配置可访问不自动证明高敏泄露
- 无响应/修复/版本，元数据为查询语法占位
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 返回内容敏感性/真实产品版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
HIKVISION 综合安防管理平台存在信息泄漏漏洞，攻击者通过漏洞可以获取等敏感信息进一步攻击。

# 二、影响版本
+ HIKVISION 综合安防管理平台

# 三、<font style="color:rgb(0, 0, 0);">资产测绘</font>
**hunter查询语法：**

`app.name=="Hikvision 海康威视 iSecure Center"`


+ 登录页面


# 四、漏洞复现
```plain
/portal/conf/config.properties
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uwdr74gfask18f9t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
