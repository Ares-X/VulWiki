---
source: "wy876 漏洞文库"
id: "vw-43211220cd69ff4de04acdc3"
entity_id: "ve-43211220cd69ff4de04acdc3"
schema_version: "1"
title: "Kyan 网络监控设备密码泄露漏洞"
product: "Kyan网络监控平台"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无版本或认证具体证明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/Kyan/Kyan%E7%BD%91%E7%BB%9C%E7%9B%91%E6%8E%A7%E8%AE%BE%E5%A4%87%E5%AF%86%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ph8dyaez8p98x1ah"
source_status: "recorded"
previous_fofa_unverified: "app.name=="
hunter: "app.name==\"Kyan 网络监控设备\""
---

# Kyan 网络监控设备密码泄露漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Kyan网络监控平台
- 本文讨论：hosts公开账户密码
- 版本、权限与配置前提：无版本或认证具体证明
- 资料类型：凭据文件泄露短摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只URL，无响应或凭据形式；fofa误录Hunter残缺字段
- 与431/跨分类同文无独立技术增量
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 真实版本/凭据暴露与修复待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# <font style="color:rgb(23, 46, 77);">一、漏洞简介</font>
Kyan网络监控设备存在账号密码泄露漏洞，该漏洞是由于开发人员将记录账户密码的文件放到网站目录，攻击者可通过访问目录获取Kyan网络监控设备账号密码，进入控制后台。

# 二、影响版本
+ Kyan 网络监控设备

# 三、资产测绘
+ hunter`app.name=="Kyan 网络监控设备"`
+ 特征


# 四、漏洞复现
```plain
/hosts
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ph8dyaez8p98x1ah>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
