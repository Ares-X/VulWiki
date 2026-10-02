---
source: "wy876 漏洞文库"
id: "vw-949779fc8a2ccf28f5753d26"
entity_id: "ve-949779fc8a2ccf28f5753d26"
schema_version: "1"
fofa_unverified: "body="
title: "深圳市锐明技术股份有限公司Crocus系统身份认证绕过漏洞"
product: "Streamax锐明Crocus"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "特定账户与直接改Passwd字段，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E9%94%90%E6%98%8E%E6%8A%80%E6%9C%AF/%E6%B7%B1%E5%9C%B3%E5%B8%82%E9%94%90%E6%98%8E%E6%8A%80%E6%9C%AF%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8Crocus%E7%B3%BB%E7%BB%9F%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xyb4kg8ahbop7p1h"
source_status: "recorded"
---

# 深圳市锐明技术股份有限公司Crocus系统身份认证绕过漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Streamax锐明Crocus
- 本文讨论：硬编码账户/Passwd认证
- 版本、权限与配置前提：特定账户与直接改Passwd字段，版本未知
- 资料类型：硬编码凭据登录线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 没有登录接口/请求响应，难以核对口令加密与硬编码语义
- 后台上传RCE仅一句推断，无上传入口/执行条件
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 硬编码跨部署通用性、版本和上传链待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐明技术作为一家专注于AI和视频技术的商用车智能物联（AIoT）解决方案提供商，Crocus系统是其核心产品之一。Crocus系统旨在利用人工智能、高清视频、大数据和自动驾驶技术，帮助商用车减少交通事故和货物丢失，提高企业或车队的运营效率。通过车载摄像头、毫米波雷达等传感器，实现对车辆周围环境的实时感知和监控，提高驾驶安全性。利用AI技术，系统能够识别车辆和行人的身份，并分析驾驶员的驾驶行为，及时提醒驾驶员注意潜在风险。Crocus系统能够实时监控货箱状态，包括货物是否丢失、货箱是否关闭等，并通过3D检测技术实现更精准的货物识别和管理。锐明技术Crocus系统 存在用户名密码硬编码漏洞，导致未授权的攻击者利用此漏洞绕过身份认证，直接接管后台，造成敏感信息泄露，且后台存在文件上传接口。深入利用可获取服务器权限，造成严重威胁。

# 二、影响版本
+ Crocus系统

# 三、资产测绘
+ fofa`body="/ThirdResource/respond/respond.min.js" && title="Crocus"`
+ 特征


# 四、漏洞复现
1. 输入用户名`streamax20020818`，密码任意抓包


2. 将Passwd 修改为：`20020818streamax` 放包即可登录后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xyb4kg8ahbop7p1h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
