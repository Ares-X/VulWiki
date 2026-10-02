---
source: "wy876 漏洞文库"
id: "vw-e5d4cbcdd115667ed73c1926"
entity_id: "ve-e5d4cbcdd115667ed73c1926"
schema_version: "1"
title: "深圳亮钻科技有限公司iDS联网数字标牌管理系统存在弱口令漏洞"
product: "亮钻iDS联网数字标牌管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "密码未改，型号/版本未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E4%BA%AE%E9%92%BB/%E6%B7%B1%E5%9C%B3%E4%BA%AE%E9%92%BB%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8iDS%E8%81%94%E7%BD%91%E6%95%B0%E5%AD%97%E6%A0%87%E7%89%8C%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E5%BC%B1%E5%8F%A3%E4%BB%A4%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zgvdqs8w7f6uaekw"
source_status: "recorded"
---

# 深圳亮钻科技有限公司iDS联网数字标牌管理系统存在弱口令漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：亮钻iDS联网数字标牌管理系统
- 本文讨论：admin/admin默认或弱口令配置
- 版本、权限与配置前提：密码未改，型号/版本未给
- 资料类型：默认口令线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 安全设备分类错误，应智能标牌平台
- 无登录地址/响应或官方默认口令资料，不能泛指所有部署
- FOFA标签用product语法需标正确引擎

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 默认还是个例弱口令、版本及强制改密流程待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
深圳亮钻科技有限公司是一家专注于面对行业的嵌入式ARM板卡和主机解决方案的高新技术公司。亮钻科技集设计、研发、生产、销售及服务于一体，产品涉及嵌入式ARM板卡、嵌入式主机、通信模块等。深圳亮钻科技有限公司iDS联网数字标牌管理系统存在弱口令漏洞。

# 二、影响版本
+ 深圳亮钻科技有限公司iDS联网数字标牌管理系统

# 三、资产测绘
+ fofa `product="亮钻科技-iDS联网数字标牌管理系统"`
+ 特征


# 四、漏洞复现
```plain
admin/admin
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zgvdqs8w7f6uaekw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
